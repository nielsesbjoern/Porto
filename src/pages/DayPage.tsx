import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import type { Stop } from "../data/itinerary";
import {
  isDayId,
  isDaySlot,
  sectionForDaySlot,
  type DayId,
  type DaySlot,
} from "../data/itinerary";
import { useI18n } from "../i18n";
import { LangSwitch } from "../components/LangSwitch";
import { StopDetail } from "../components/StopDetail";
import { StopList } from "../components/StopList";
import TourMap from "../components/TourMap";

const STORAGE_KEY = "andrade-schade-porto:done";

function loadDone(): Record<string, string[]> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, string[]>;
  } catch {
    return {};
  }
}

function resolveRoute(
  dayParam: string | undefined,
  slotParam: string | undefined,
): { dayId: DayId; slot: DaySlot } | { redirect: string } {
  if (!dayParam || !isDayId(dayParam)) return { redirect: "/" };
  if (!slotParam) return { redirect: `/day/${dayParam}/morning` };
  if (!isDaySlot(slotParam)) return { redirect: `/day/${dayParam}/morning` };
  return { dayId: dayParam, slot: slotParam };
}

export function DayPage() {
  const { dayId: dayParam, slot: slotParam } = useParams();
  const navigate = useNavigate();
  const { t, format, getSection } = useI18n();
  const route = resolveRoute(dayParam, slotParam);

  const dayId = "dayId" in route ? route.dayId : "1";
  const slot = "slot" in route ? route.slot : "morning";
  const sectionId = sectionForDaySlot(dayId, slot);
  const section = getSection(sectionId);
  const dayCopy = t.days[dayId];

  const [activeStopId, setActiveStopId] = useState<string | null>(null);
  const [flyToStop, setFlyToStop] = useState<Stop | null>(null);
  const [doneBySection, setDoneBySection] = useState(loadDone);
  const [walkNonce, setWalkNonce] = useState(0);

  const doneIds = useMemo(
    () => new Set(doneBySection[sectionId] ?? []),
    [doneBySection, sectionId],
  );

  const activeStop = useMemo(
    () => section.stops.find((s) => s.id === activeStopId) ?? null,
    [section.stops, activeStopId],
  );

  const activeIndex = activeStop
    ? section.stops.findIndex((s) => s.id === activeStop.id)
    : -1;

  const walkerTargetId = useMemo(() => {
    if (activeStopId) return activeStopId;
    const firstOpen = section.stops.find((s) => !doneIds.has(s.id));
    return firstOpen?.id ?? section.stops[section.stops.length - 1]?.id ?? null;
  }, [activeStopId, section.stops, doneIds]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(doneBySection));
  }, [doneBySection]);

  useEffect(() => {
    setActiveStopId(null);
    setFlyToStop(null);
    setWalkNonce((n) => n + 1);
    window.scrollTo({ top: 0 });
  }, [sectionId]);

  const walkTo = useCallback((stop: Stop) => {
    setActiveStopId(stop.id);
    setFlyToStop(stop);
    setWalkNonce((n) => n + 1);
  }, []);

  const selectSlot = useCallback(
    (next: DaySlot) => {
      navigate(`/day/${dayId}/${next}`);
    },
    [dayId, navigate],
  );

  const toggleDone = useCallback(
    (stopId: string) => {
      setDoneBySection((prev) => {
        const current = new Set(prev[sectionId] ?? []);
        const wasDone = current.has(stopId);
        if (wasDone) current.delete(stopId);
        else current.add(stopId);

        const next = { ...prev, [sectionId]: [...current] };

        if (!wasDone) {
          const idx = section.stops.findIndex((s) => s.id === stopId);
          const nextStop = section.stops[idx + 1];
          if (nextStop) {
            queueMicrotask(() => walkTo(nextStop));
          }
        }

        return next;
      });
    },
    [section.stops, sectionId, walkTo],
  );

  const goNext = useCallback(() => {
    if (activeIndex < 0) return;
    const next = section.stops[activeIndex + 1];
    if (!next) return;
    walkTo(next);
  }, [activeIndex, section.stops, walkTo]);

  if ("redirect" in route) {
    return <Navigate to={route.redirect} replace />;
  }

  const doneCount = doneIds.size;
  const progress =
    section.stops.length === 0
      ? 0
      : Math.round((doneCount / section.stops.length) * 100);

  return (
    <div className="site-shell pb-safe-bar">
      {/* One sticky unit — Morning/Evening never slides under the Dynamic Island */}
      <div className="day-chrome sticky top-0 z-[1100]">
        <div className="tour-chrome border-b border-[color:var(--color-line)] px-4 pb-3">
          <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <Link
                to="/"
                className="meta-mono inline-flex min-h-11 items-center text-[color:var(--color-blue)] hover:underline"
              >
                {t.ui.backHome}
              </Link>
              <p className="display mt-1 text-lg leading-tight text-[color:var(--color-ink)] sm:text-xl">
                {dayCopy.title}
              </p>
              <p className="meta-mono mt-0.5 text-[color:var(--color-muted)]">
                {section.navLabel} ·{" "}
                {format(t.ui.doneCount, {
                  done: doneCount,
                  total: section.stops.length,
                })}
              </p>
            </div>
            <div className="flex shrink-0 items-center justify-end gap-4">
              <LangSwitch />
            </div>
          </div>
          <div className="progress-track mx-auto mt-3 max-w-5xl">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="border-b border-[color:var(--color-line)] bg-[color:var(--color-paper)]/95 backdrop-blur-md">
          <div className="azulejo-band" />
          <nav aria-label={dayCopy.navLabel}>
            <ul className="mx-auto flex w-full max-w-3xl items-stretch">
              {(
                [
                  { id: "morning" as const, label: t.ui.morningSlot },
                  { id: "evening" as const, label: t.ui.eveningSlot },
                ] as const
              ).map((item) => {
                const isActive = slot === item.id;
                return (
                  <li
                    key={item.id}
                    className="flex min-w-0 flex-1 border-r border-[color:var(--color-line)] last:border-r-0"
                  >
                    <button
                      type="button"
                      onClick={() => selectSlot(item.id)}
                      className={`meta-mono relative min-h-12 w-full px-2 py-3.5 text-center transition ${
                        isActive
                          ? "bg-[color:var(--color-blue)] text-[color:var(--color-paper)]"
                          : "text-[color:var(--color-ink)] hover:bg-[color:var(--color-blue)]/8 hover:text-[color:var(--color-blue)]"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>

      <main id="tour" className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-6 animate-fade-up sm:mb-8">
          {section.number && (
            <div className="flex flex-wrap items-end gap-2.5 sm:gap-3">
              <span className="display text-4xl italic leading-none text-[color:var(--color-burgundy)] sm:text-6xl">
                {section.number}
              </span>
              <h2 className="display min-w-0 flex-1 pb-0.5 text-[1.35rem] leading-tight text-[color:var(--color-ink)] sm:pb-1 sm:text-3xl">
                {section.title}
              </h2>
            </div>
          )}
          <p className="mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-[color:var(--color-muted)] sm:mt-5 sm:text-[1rem]">
            {section.intro}
          </p>
          <p className="meta-mono mt-4 block border-l-2 border-[color:var(--color-gold)] pl-3 text-[color:var(--color-blue)] sm:inline-block">
            {section.tip}
          </p>
        </div>

        <div className="grid gap-6 md:gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="h-[min(52dvh,440px)] min-h-[280px] md:h-[min(52vh,480px)] lg:col-span-7 lg:h-[min(70vh,640px)]">
            <TourMap
              stops={section.stops}
              activeStopId={activeStopId}
              doneIds={doneIds}
              onStopSelect={walkTo}
              flyToStop={flyToStop}
              fitKey={sectionId}
              showRoute={!section.freePick}
              walkerTargetId={walkerTargetId}
              walkNonce={walkNonce}
            />
          </div>

          <div className="min-w-0 lg:col-span-5">
            {activeStop ? (
              <StopDetail
                stop={activeStop}
                index={activeIndex}
                total={section.stops.length}
                isDone={doneIds.has(activeStop.id)}
                onBack={() => setActiveStopId(null)}
                onDone={() => toggleDone(activeStop.id)}
                onNext={goNext}
                hasNext={activeIndex < section.stops.length - 1}
              />
            ) : (
              <div className="panel-glass animate-fade-up p-3.5 sm:p-5">
                <p className="meta-mono mb-2 text-[color:var(--color-muted)]">
                  {section.freePick
                    ? t.ui.pickFreely
                    : format(t.ui.stopsTap, {
                        count: section.stops.length,
                      })}
                </p>
                <StopList
                  stops={section.stops}
                  doneIds={doneIds}
                  activeStopId={activeStopId}
                  onSelect={walkTo}
                  freePick={section.freePick}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="mx-auto max-w-xl px-4 pb-6 pt-10 text-center">
        <img
          src="/avatars/couple.png"
          alt=""
          width={80}
          height={80}
          className="footer-avatar mx-auto"
        />
      </footer>
    </div>
  );
}
