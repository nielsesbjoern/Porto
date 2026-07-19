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
      padding: [36, 36],
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

export function ScrollWheelZoomHandler() {
  const map = useMap();

  useEffect(() => {
    const container = map.getContainer();
    container.setAttribute("tabindex", "0");
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
      map.off("focus", enable);
      map.off("blur", disable);
      container.removeEventListener("click", focus);
      window.removeEventListener("pointerdown", onPointerDown);
      disable();
    };
  }, [map]);

  return null;
}
