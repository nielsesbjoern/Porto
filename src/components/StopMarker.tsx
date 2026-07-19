import { useMemo } from "react";
import { DivIcon } from "leaflet";
import type { Stop } from "../data/itinerary";

export function createStopIcon(
  stop: Stop,
  isActive: boolean,
  isDone: boolean,
): DivIcon {
  const classes = [
    "stop-marker",
    isActive ? "stop-marker--active" : "",
    isDone ? "stop-marker--done" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return new DivIcon({
    className: "",
    html: `<div class="${classes}"><span aria-hidden="true">${stop.icon}</span></div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -20],
  });
}

export function createUserIcon(): DivIcon {
  return new DivIcon({
    className: "",
    html: `<div class="user-marker"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });
}

export function useStopIcons(
  stops: Stop[],
  activeStopId: string | null,
  doneIds: Set<string>,
) {
  return useMemo(() => {
    const icons = new Map<string, DivIcon>();
    stops.forEach((stop) => {
      icons.set(
        stop.id,
        createStopIcon(
          stop,
          stop.id === activeStopId,
          doneIds.has(stop.id),
        ),
      );
    });
    return icons;
  }, [stops, activeStopId, doneIds]);
}
