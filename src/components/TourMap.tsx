import { useCallback, useMemo, useState } from "react";
import { MapContainer, Marker, Polyline, ZoomControl } from "react-leaflet";
import type { Stop } from "../data/itinerary";
import { useI18n } from "../i18n";
import { buildTourDirectionLegs } from "../utils/maps";
import { CoupleWalker } from "./CoupleWalker";
import { MapController, ScrollWheelZoomHandler } from "./MapController";
import { MinimalBasemap } from "./MinimalBasemap";
import { createUserIcon, useStopIcons } from "./StopMarker";

interface TourMapProps {
  stops: Stop[];
  activeStopId: string | null;
  doneIds: Set<string>;
  onStopSelect: (stop: Stop) => void;
  flyToStop: Stop | null;
  fitKey: string;
  showRoute?: boolean;
  center?: [number, number];
  walkerTargetId: string | null;
  walkNonce: number;
}

export default function TourMap({
  stops,
  activeStopId,
  doneIds,
  onStopSelect,
  flyToStop,
  fitKey,
  showRoute = true,
  center = [41.145, -8.612],
  walkerTargetId,
  walkNonce,
}: TourMapProps) {
  const { t, format } = useI18n();
  const [userPosition, setUserPosition] = useState<[number, number] | null>(
    null,
  );
  const [geoError, setGeoError] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);

  const icons = useStopIcons(stops, activeStopId, doneIds);
  const userIcon = useMemo(() => createUserIcon(), []);

  const polyline = useMemo(
    () => stops.map((s) => [s.lat, s.lng] as [number, number]),
    [stops],
  );

  const legs = useMemo(
    () =>
      showRoute
        ? buildTourDirectionLegs(stops, {
            single: t.ui.tourInMaps,
            complete: format(t.ui.completeTour, { count: stops.length }),
            stage: (index, from, to) =>
              format(t.ui.stage, { index, from, to }),
          })
        : [],
    [showRoute, stops, t.ui, format],
  );

  const locate = useCallback(() => {
    if (!navigator.geolocation) {
      setGeoError(t.ui.geoUnsupported);
      return;
    }
    setLocating(true);
    setGeoError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPosition([pos.coords.latitude, pos.coords.longitude]);
        setLocating(false);
      },
      (err) => {
        setGeoError(err.code === 1 ? t.ui.geoDenied : t.ui.geoFailed);
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }, [t.ui]);

  return (
    <div className="map-frame h-full w-full">
      <MapContainer
        center={center}
        zoom={14}
        className="h-full w-full"
        zoomControl={false}
        attributionControl
      >
        <MinimalBasemap />
        <ZoomControl position="bottomright" />
        <ScrollWheelZoomHandler />
        <MapController stops={stops} flyToStop={flyToStop} fitKey={fitKey} />

        {showRoute && polyline.length > 1 && (
          <>
            <Polyline
              positions={polyline}
              pathOptions={{
                color: "#FAF8F3",
                weight: 8,
                opacity: 0.95,
                lineCap: "round",
                lineJoin: "round",
              }}
            />
            <Polyline
              positions={polyline}
              pathOptions={{
                color: "#0A4D5A",
                weight: 3,
                opacity: 0.9,
                dashArray: "8 10",
                lineCap: "round",
                lineJoin: "round",
              }}
            />
          </>
        )}

        {stops.map((stop) => (
          <Marker
            key={stop.id}
            position={[stop.lat, stop.lng]}
            icon={icons.get(stop.id)}
            eventHandlers={{ click: () => onStopSelect(stop) }}
          />
        ))}

        <CoupleWalker
          stops={stops}
          targetStopId={walkerTargetId}
          walkNonce={walkNonce}
        />

        {userPosition && (
          <Marker position={userPosition} icon={userIcon} />
        )}
      </MapContainer>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[500] flex flex-col gap-2 p-3">
        <div className="pointer-events-auto flex flex-wrap gap-2">
          <button
            type="button"
            onClick={locate}
            className="btn-ghost meta-mono px-3 py-2 shadow-none"
          >
            {locating ? t.ui.locating : t.ui.myLocation}
          </button>
          {legs.map((leg) => (
            <a
              key={leg.label}
              href={leg.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost meta-mono px-3 py-2 shadow-none"
            >
              {leg.label}
            </a>
          ))}
        </div>
        {geoError && (
          <p className="meta-mono rounded bg-white/95 px-2 py-1 text-[color:var(--color-burgundy)]">
            {geoError}
          </p>
        )}
      </div>
    </div>
  );
}
