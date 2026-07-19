import type { Stop } from "../data/itinerary";

export const GOOGLE_MAPS_MAX_STOPS = 25;
export const GOOGLE_MAPS_RELIABLE_STOPS = 10;

export interface TourLeg {
  label: string;
  url: string;
}

export function googleMapsSearchUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}

export function googleMapsQueryUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function googleMapsDirectionsUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=walking`;
}

export function stopMapsUrl(stop: Stop): string {
  if (stop.mapsQuery) return googleMapsQueryUrl(stop.mapsQuery);
  return googleMapsSearchUrl(stop.lat, stop.lng);
}

export function stopDirectionsUrl(stop: Stop): string {
  if (stop.mapsQuery) {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(stop.mapsQuery)}&travelmode=walking`;
  }
  return googleMapsDirectionsUrl(stop.lat, stop.lng);
}

export function chunkStopsForDirections(
  stops: Stop[],
  maxStops = GOOGLE_MAPS_RELIABLE_STOPS,
): Stop[][] {
  if (stops.length === 0) return [];
  if (maxStops < 2) return stops.map((s) => [s]);
  if (stops.length <= maxStops) return [stops];

  const chunks: Stop[][] = [];
  let start = 0;

  while (start < stops.length) {
    const remaining = stops.length - start;
    if (remaining <= maxStops) {
      chunks.push(stops.slice(start));
      break;
    }
    const end = start + maxStops;
    chunks.push(stops.slice(start, end));
    start = end - 1;
  }

  return chunks;
}

export function buildWalkingDirectionsUrl(routeStops: Stop[]): string {
  if (routeStops.length === 0) return "";
  if (routeStops.length > GOOGLE_MAPS_MAX_STOPS) {
    return buildWalkingDirectionsUrl(routeStops.slice(0, GOOGLE_MAPS_MAX_STOPS));
  }
  if (routeStops.length === 1) {
    return stopDirectionsUrl(routeStops[0]);
  }

  const path = routeStops.map((s) => `${s.lat},${s.lng}`).join("/");
  return `https://www.google.com/maps/dir/${path}/data=!4m2!4m1!3e2`;
}

export function buildTourDirectionLegs(
  ordered: Stop[],
  labels: {
    single: string;
    complete: string;
    stage: (index: number, from: number, to: number) => string;
  },
): TourLeg[] {
  if (ordered.length === 0) return [];

  const completeUrl = buildWalkingDirectionsUrl(ordered);
  const chunks = chunkStopsForDirections(ordered);

  if (chunks.length === 1) {
    return [{ label: labels.single, url: completeUrl }];
  }

  return [
    {
      label: labels.complete,
      url: completeUrl,
    },
    ...chunks.map((chunk, index) => {
      const from = ordered.findIndex((s) => s.id === chunk[0].id) + 1;
      const to =
        ordered.findIndex((s) => s.id === chunk[chunk.length - 1].id) + 1;
      return {
        label: labels.stage(index + 1, from, to),
        url: buildWalkingDirectionsUrl(chunk),
      };
    }),
  ];
}
