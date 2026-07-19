import { useEffect, useMemo, useRef, useState } from "react";
import { Marker } from "react-leaflet";
import { DivIcon, type Marker as LeafletMarker } from "leaflet";
import type { Stop } from "../data/itinerary";

type LatLng = [number, number];

interface CoupleWalkerProps {
  stops: Stop[];
  targetStopId: string | null;
  walkNonce: number;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function interpolate(from: LatLng, to: LatLng, t: number): LatLng {
  return [lerp(from[0], to[0], t), lerp(from[1], to[1], t)];
}

/** Smoothstep³ — softer start/stop than quadratic ease. */
function smootherstep(t: number) {
  const x = Math.min(1, Math.max(0, t));
  return x * x * x * (x * (x * 6 - 15) + 10);
}

function distanceMeters(a: LatLng, b: LatLng) {
  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b[0] - a[0]);
  const dLng = toRad(b[1] - a[1]);
  const lat1 = toRad(a[0]);
  const lat2 = toRad(b[0]);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

function nearestStopIndex(point: LatLng, stops: Stop[]) {
  let best = 0;
  let bestDist = Infinity;
  stops.forEach((stop, i) => {
    const d = distanceMeters(point, [stop.lat, stop.lng]);
    if (d < bestDist) {
      bestDist = d;
      best = i;
    }
  });
  return best;
}

/**
 * Build a walk path from current position to the target stop,
 * following the itinerary order through intermediate stops.
 */
function buildPath(
  from: LatLng,
  targetIndex: number,
  stops: Stop[],
): LatLng[] {
  const startIndex = nearestStopIndex(from, stops);
  const path: LatLng[] = [from];

  if (startIndex === targetIndex) {
    path.push([stops[targetIndex].lat, stops[targetIndex].lng]);
    return path;
  }

  const step = startIndex < targetIndex ? 1 : -1;
  for (let i = startIndex; i !== targetIndex; i += step) {
    const next = stops[i + step];
    path.push([next.lat, next.lng]);
  }

  // Always end exactly on the target.
  const target: LatLng = [stops[targetIndex].lat, stops[targetIndex].lng];
  const last = path[path.length - 1];
  if (last[0] !== target[0] || last[1] !== target[1]) {
    path.push(target);
  }

  return path;
}

/** Flatten a polyline into cumulative distances for constant-speed sampling. */
function pathMetrics(path: LatLng[]) {
  const segLens: number[] = [0];
  let total = 0;
  for (let i = 1; i < path.length; i++) {
    total += distanceMeters(path[i - 1], path[i]);
    segLens.push(total);
  }
  return { segLens, total };
}

function pointAlongPath(
  path: LatLng[],
  segLens: number[],
  total: number,
  t: number,
): LatLng {
  if (path.length === 1 || total < 0.01) return path[path.length - 1];
  const dist = total * Math.min(1, Math.max(0, t));

  for (let i = 1; i < path.length; i++) {
    if (dist <= segLens[i] || i === path.length - 1) {
      const segStart = segLens[i - 1];
      const segEnd = segLens[i];
      const segLen = Math.max(segEnd - segStart, 0.0001);
      const local = (dist - segStart) / segLen;
      return interpolate(path[i - 1], path[i], local);
    }
  }
  return path[path.length - 1];
}

function createCoupleIcon(walking: boolean): DivIcon {
  return new DivIcon({
    className: "couple-walker-icon",
    html: `
      <div class="couple-walker ${walking ? "couple-walker--walking" : ""}" aria-hidden="true">
        <div class="couple-walker__shadow"></div>
        <img class="couple-walker__portrait" src="/avatars/couple.png?v=1" alt="" />
      </div>
    `,
    iconSize: [64, 64],
    iconAnchor: [32, 58],
  });
}

export function CoupleWalker({
  stops,
  targetStopId,
  walkNonce,
}: CoupleWalkerProps) {
  const sectionKey = stops.map((s) => s.id).join("|");
  const first = stops[0];
  const [position, setPosition] = useState<LatLng>(
    first ? [first.lat, first.lng] : [41.145, -8.612],
  );
  const [walking, setWalking] = useState(false);
  const positionRef = useRef(position);
  const rafRef = useRef<number | null>(null);
  const sectionKeyRef = useRef(sectionKey);
  const markerRef = useRef<LeafletMarker | null>(null);

  const walkingIcon = useMemo(() => createCoupleIcon(true), []);
  const idleIcon = useMemo(() => createCoupleIcon(false), []);

  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  // New section → snap to first stop (or current target if set).
  useEffect(() => {
    if (sectionKeyRef.current === sectionKey) return;
    sectionKeyRef.current = sectionKey;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const target =
      (targetStopId && stops.find((s) => s.id === targetStopId)) || first;
    if (!target) return;

    const start: LatLng = [target.lat, target.lng];
    setPosition(start);
    positionRef.current = start;
    markerRef.current?.setLatLng(start);
    setWalking(false);
  }, [sectionKey, first, targetStopId, stops]);

  useEffect(() => {
    if (!targetStopId || stops.length === 0) return;

    const targetIndex = stops.findIndex((s) => s.id === targetStopId);
    if (targetIndex < 0) return;

    const from = positionRef.current;
    const path = buildPath(from, targetIndex, stops);
    const { segLens, total } = pathMetrics(path);

    if (total < 8) {
      const end = path[path.length - 1];
      setPosition(end);
      positionRef.current = end;
      markerRef.current?.setLatLng(end);
      setWalking(false);
      return;
    }

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      const end = path[path.length - 1];
      setPosition(end);
      positionRef.current = end;
      markerRef.current?.setLatLng(end);
      setWalking(false);
      return;
    }

    // ~1.35 m/s map pace, soft clamps for short/long hops
    const duration = Math.min(7800, Math.max(1200, total * 22));
    const start = performance.now();
    setWalking(true);

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const tick = (now: number) => {
      const raw = Math.min(1, (now - start) / duration);
      const eased = smootherstep(raw);
      const next = pointAlongPath(path, segLens, total, eased);

      // Imperative Leaflet update — no React re-render per frame
      markerRef.current?.setLatLng(next);
      positionRef.current = next;

      if (raw < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        const end = path[path.length - 1];
        markerRef.current?.setLatLng(end);
        positionRef.current = end;
        setPosition(end);
        setWalking(false);
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [targetStopId, walkNonce, stops]);

  if (stops.length === 0) return null;

  return (
    <Marker
      ref={markerRef}
      position={position}
      icon={walking ? walkingIcon : idleIcon}
      zIndexOffset={1000}
      interactive={false}
    />
  );
}
