import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { latLngBounds } from "leaflet";
import type { Stop } from "../data/itinerary";

interface MapControllerProps {
  stops: Stop[];
  flyToStop: Stop | null;
  fitKey: string;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function MapController({ stops, flyToStop, fitKey }: MapControllerProps) {
  const map = useMap();

  useEffect(() => {
    if (stops.length === 0) return;
    const bounds = latLngBounds(stops.map((s) => [s.lat, s.lng]));
    map.fitBounds(bounds, {
      padding: [40, 40],
      maxZoom: 15,
      animate: !prefersReducedMotion(),
    });
  }, [map, fitKey, stops]);

  useEffect(() => {
    if (!flyToStop) return;
    map.flyTo([flyToStop.lat, flyToStop.lng], 16, {
      duration: prefersReducedMotion() ? 0 : 0.7,
    });
  }, [map, flyToStop]);

  return null;
}

/**
 * Desktop: zoom only while map is focused.
 * Touch (iPhone): keep pinch-zoom on; lock page scroll while dragging the map.
 */
export function MapInteractionHandler() {
  const map = useMap();

  useEffect(() => {
    const container = map.getContainer();
    container.setAttribute("tabindex", "0");

    const coarse =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches;

    // iOS Safari often lays out the map before the flex height settles
    const invalidate = () => {
      map.invalidateSize({ animate: false });
    };
    invalidate();
    const t1 = window.setTimeout(invalidate, 120);
    const t2 = window.setTimeout(invalidate, 450);
    window.addEventListener("orientationchange", invalidate);
    window.addEventListener("resize", invalidate);
    const vv = window.visualViewport;
    vv?.addEventListener("resize", invalidate);

    if (coarse) {
      map.scrollWheelZoom.disable();
      map.touchZoom.enable();
      map.dragging.enable();

      const lockScroll = () => {
        document.documentElement.classList.add("map-touch-lock");
      };
      const unlockScroll = () => {
        document.documentElement.classList.remove("map-touch-lock");
      };

      map.on("dragstart", lockScroll);
      map.on("zoomstart", lockScroll);
      map.on("dragend", unlockScroll);
      map.on("zoomend", unlockScroll);
      container.addEventListener("touchend", unlockScroll);
      container.addEventListener("touchcancel", unlockScroll);

      return () => {
        window.clearTimeout(t1);
        window.clearTimeout(t2);
        window.removeEventListener("orientationchange", invalidate);
        window.removeEventListener("resize", invalidate);
        vv?.removeEventListener("resize", invalidate);
        map.off("dragstart", lockScroll);
        map.off("zoomstart", lockScroll);
        map.off("dragend", unlockScroll);
        map.off("zoomend", unlockScroll);
        container.removeEventListener("touchend", unlockScroll);
        container.removeEventListener("touchcancel", unlockScroll);
        unlockScroll();
      };
    }

    map.scrollWheelZoom.disable();
    const enable = () => map.scrollWheelZoom.enable();
    const disable = () => map.scrollWheelZoom.disable();
    const focus = () => container.focus();

    const onPointerDown = (event: PointerEvent) => {
      if (!container.contains(event.target as Node)) container.blur();
    };

    map.on("focus", enable);
    map.on("blur", disable);
    container.addEventListener("click", focus);
    window.addEventListener("pointerdown", onPointerDown);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("orientationchange", invalidate);
      window.removeEventListener("resize", invalidate);
      vv?.removeEventListener("resize", invalidate);
      map.off("focus", enable);
      map.off("blur", disable);
      container.removeEventListener("click", focus);
      window.removeEventListener("pointerdown", onPointerDown);
      disable();
    };
  }, [map]);

  return null;
}

/** @deprecated use MapInteractionHandler */
export const ScrollWheelZoomHandler = MapInteractionHandler;
