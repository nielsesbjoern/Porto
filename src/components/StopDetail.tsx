import type { Stop } from "../data/itinerary";
import { useI18n } from "../i18n";
import { stopDirectionsUrl, stopMapsUrl } from "../utils/maps";
import { StopPhotos } from "./StopPhotos";

interface StopDetailProps {
  stop: Stop;
  index: number;
  total: number;
  isDone: boolean;
  onBack: () => void;
  onDone: () => void;
  onNext?: () => void;
  hasNext: boolean;
}

export function StopDetail({
  stop,
  index,
  total,
  isDone,
  onBack,
  onDone,
  onNext,
  hasNext,
}: StopDetailProps) {
  const { t, format } = useI18n();

  return (
    <article className="panel-glass animate-fade-up p-4 sm:p-5">
      <button
        type="button"
        onClick={onBack}
        className="meta-mono inline-flex min-h-11 items-center text-[color:var(--color-blue)] transition hover:underline"
      >
        {t.ui.backToList}
      </button>

      <div className="mt-5 flex items-baseline gap-3">
        <span className="stop-icon text-[2rem] leading-none" aria-hidden>
          {stop.icon}
        </span>
        <div>
          <p className="meta-mono text-[color:var(--color-blue)]">
            {format(t.ui.stopOf, { current: index + 1, total })}
            {isDone ? ` · ${t.ui.done}` : ""}
          </p>
          <p className="meta-mono mt-1 text-[color:var(--color-burgundy)]">
            {stop.tag}
          </p>
        </div>
      </div>

      <h3 className="display mt-3 text-2xl leading-snug text-[color:var(--color-ink)]">
        {stop.title}
      </h3>

      <p className="mt-4 text-[1rem] leading-relaxed text-[color:var(--color-muted)]">
        {stop.body}
      </p>

      {stop.story && (
        <div className="mt-6 border-t border-[color:var(--color-line)] pt-5">
          <p className="meta-mono text-[color:var(--color-burgundy)]">
            {t.ui.storyLabel}
          </p>
          <p className="mt-2 text-[0.98rem] leading-relaxed text-[color:var(--color-muted)]">
            {stop.story}
          </p>
        </div>
      )}

      <p className="meta-mono mt-5 border-l-2 border-[color:var(--color-gold)] pl-3 text-[color:var(--color-blue)]">
        {stop.meta}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <a
          href={stopMapsUrl(stop)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost meta-mono inline-flex min-h-11 items-center px-3.5 py-2.5"
        >
          {t.ui.openMaps}
        </a>
        <a
          href={stopDirectionsUrl(stop)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost meta-mono inline-flex min-h-11 items-center px-3.5 py-2.5"
        >
          {t.ui.walkingRoute}
        </a>
      </div>

      <StopPhotos stopId={stop.id} />

      <div className="mt-8 flex flex-col gap-2 border-t border-[color:var(--color-line)] pt-5 sm:flex-row">
        {!isDone ? (
          <button
            type="button"
            onClick={onDone}
            className="btn-ink meta-mono min-h-12 flex-1 px-4 py-3"
          >
            {hasNext ? t.ui.doneNext : t.ui.markDone}
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={onDone}
              className="meta-mono min-h-12 flex-1 border border-[color:var(--color-line)] px-4 py-3 text-[color:var(--color-muted)]"
            >
              {t.ui.undoDone}
            </button>
            {hasNext && onNext && (
              <button
                type="button"
                onClick={onNext}
                className="btn-ink meta-mono min-h-12 flex-1 px-4 py-3"
              >
                {t.ui.nextStop}
              </button>
            )}
          </>
        )}
      </div>
    </article>
  );
}
