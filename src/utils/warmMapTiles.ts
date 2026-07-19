/**
 * Prefetch CARTO tiles around every itinerary stop so the map works offline
 * after one online visit (or an explicit “Save for offline”).
 */
import { BASE, sectionsBase } from "../data/itinerary";

const SUBS = ["a", "b", "c", "d"] as const;

type Point = { lat: number; lng: number };

function lon2tile(lon: number, zoom: number) {
  return Math.floor(((lon + 180) / 360) * 2 ** zoom);
}

function lat2tile(lat: number, zoom: number) {
  const rad = (lat * Math.PI) / 180;
  return Math.floor(
    ((1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2) *
      2 ** zoom,
  );
}

/** Leaflet `{r}` is `@2x` on retina — cache both so phones work offline. */
function tileUrls(lat: number, lng: number, zoom: number, radius: number) {
  const x0 = lon2tile(lng, zoom);
  const y0 = lat2tile(lat, zoom);
  const urls: string[] = [];
  for (let dx = -radius; dx <= radius; dx++) {
    for (let dy = -radius; dy <= radius; dy++) {
      const x = x0 + dx;
      const y = y0 + dy;
      const s = SUBS[(Math.abs(x + y) + zoom) % 4];
      for (const layer of ["light_nolabels", "light_only_labels"] as const) {
        const base = `https://${s}.basemaps.cartocdn.com/${layer}/${zoom}/${x}/${y}`;
        urls.push(`${base}.png`);
        urls.push(`${base}@2x.png`);
      }
    }
  }
  return urls;
}

function allItineraryPoints(): Point[] {
  const seen = new Set<string>();
  const points: Point[] = [];
  const push = (p: Point) => {
    const key = `${p.lat.toFixed(4)},${p.lng.toFixed(4)}`;
    if (seen.has(key)) return;
    seen.add(key);
    points.push(p);
  };

  push(BASE);
  for (const section of sectionsBase) {
    for (const stop of section.stops) {
      push(stop);
    }
  }
  return points;
}

/** Overview hubs: centre, Matosinhos, NorteShopping / Sete Bicas */
const HUBS: Point[] = [
  { lat: 41.145, lng: -8.612 },
  { lat: 41.182, lng: -8.689 },
  { lat: 41.1837, lng: -8.655 },
];

let warmed = false;
let warming: Promise<void> | null = null;

export async function warmMapTiles(options?: { force?: boolean }) {
  if (typeof window === "undefined" || !navigator.onLine) return;
  if (warmed && !options?.force) return;
  if (warming) return warming;

  warming = (async () => {
    const urls = new Set<string>();
    const points = allItineraryPoints();

    for (const stop of points) {
      for (const z of [14, 15]) {
        for (const url of tileUrls(stop.lat, stop.lng, z, 1)) {
          urls.add(url);
        }
      }
    }

    for (const hub of HUBS) {
      for (const z of [12, 13]) {
        for (const url of tileUrls(hub.lat, hub.lng, z, 2)) {
          urls.add(url);
        }
      }
    }

    const list = [...urls];
    const batch = 10;
    for (let i = 0; i < list.length; i += batch) {
      const slice = list.slice(i, i + batch);
      await Promise.all(
        slice.map((url) =>
          fetch(url, { mode: "cors", credentials: "omit" }).catch(() => null),
        ),
      );
    }

    warmed = true;
  })().finally(() => {
    warming = null;
  });

  return warming;
}
