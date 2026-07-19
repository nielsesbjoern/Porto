import type { Stop } from "../data/itinerary";

interface StopListProps {
  stops: Stop[];
  doneIds: Set<string>;
  activeStopId: string | null;
  onSelect: (stop: Stop) => void;
  freePick?: boolean;
}

export function StopList({
  stops,
  doneIds,
  activeStopId,
  onSelect,
  freePick,
}: StopListProps) {
  return (
    <ul className="divide-y divide-[color:var(--color-line)]">
      {stops.map((stop, index) => {
        const done = doneIds.has(stop.id);
        const active = stop.id === activeStopId;
        return (
          <li key={stop.id}>
            <button
              type="button"
              onClick={() => onSelect(stop)}
              className={`flex w-full gap-4 px-1 py-4 text-left transition active:bg-black/[0.04] hover:bg-black/[0.02] ${
                active ? "bg-black/[0.03]" : ""
              }`}
            >
              <span
                className={`stop-icon mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center text-[1.35rem] leading-none ${
                  done ? "opacity-70" : ""
                }`}
                aria-hidden
              >
                {stop.icon}
              </span>
              <span className="min-w-0 flex-1">
                <span className="meta-mono text-[color:var(--color-blue)]">
                  {freePick ? stop.tag : `${index + 1} · ${stop.tag}`}
                  {done ? " · ✓" : ""}
                </span>
                <span className="mt-1 block display text-lg leading-snug text-[color:var(--color-ink)]">
                  {stop.title}
                </span>
                <span className="meta-mono mt-2 block normal-case tracking-normal text-[color:var(--color-muted)]">
                  {stop.meta}
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
