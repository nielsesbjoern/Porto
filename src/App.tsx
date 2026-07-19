import { useCallback, useEffect, useMemo, useState } from "react";
import type { SectionId, Stop } from "./data/itinerary";
import { useI18n } from "./i18n";
import { Hero } from "./components/Hero";
import { LangSwitch } from "./components/LangSwitch";
import { SectionNav } from "./components/SectionNav";
import { StopDetail } from "./components/StopDetail";
import { StopList } from "./components/StopList";
import TourMap from "./components/TourMap";

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

export default function App() {
  const { t, format, getSection, sections } = useI18n();
  const [sectionId, setSectionId] = useState<SectionId>("morning1");
  const [activeStopId, setActiveStopId] = useState<string | null>(null);
  const [flyToStop, setFlyToStop] = useState<Stop | null>(null);
  const [doneBySection, setDoneBySection] = useState<Record<string, string[]>>(
    loadDone,
  );
  const [tourStarted, setTourStarted] = useState(false);
  const [walkNonce, setWalkNonce] = useState(0);

  const section = getSection(sectionId);
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

  const walkTo = useCallback((stop: Stop) => {
    setActiveStopId(stop.id);
    setFlyToStop(stop);
    setWalkNonce((n) => n + 1);
    setTourStarted(true);
  }, []);

  const selectSection = useCallback((id: SectionId) => {
    setSectionId(id);
    setActiveStopId(null);
    setFlyToStop(null);
    setWalkNonce((n) => n + 1);
    setTourStarted(true);
  }, []);

  const selectStop = useCallback(
    (stop: Stop) => {
      walkTo(stop);
    },
    [walkTo],
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

  const startMorning1 = () => {
    setSectionId("morning1");
    setTourStarted(true);
    setWalkNonce((n) => n + 1);
    document.getElementById("tour")?.scrollIntoView({ behavior: "smooth" });
  };

  const doneCount = doneIds.size;
  const progress =
    section.stops.length === 0
      ? 0
      : Math.round((doneCount / section.stops.length) * 100);

  return (
    <div className="site-shell">
      {!tourStarted && <Hero onStart={startMorning1} />}

      {tourStarted && (
        <div className="tour-chrome border-b border-[color:var(--color-line)] px-4 pb-3">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
            <div>
              <p className="display text-xl leading-tight text-[color:var(--color-ink)]">
                <span className="block sm:inline">{t.hero.city}</span>{" "}
                <span className="font-normal italic text-[color:var(--color-blue)]">
                  {t.hero.subtitle}
                </span>
              </p>
              <p className="meta-mono mt-0.5 text-[color:var(--color-muted)]">
                {section.navLabel} ·{" "}
                {format(t.ui.doneCount, {
                  done: doneCount,
                  total: section.stops.length,
                })}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <LangSwitch />
              <button
                type="button"
                onClick={() => {
                  setTourStarted(false);
                  setActiveStopId(null);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="meta-mono text-[color:var(--color-blue)] hover:underline"
              >
                {t.ui.endTour}
              </button>
            </div>
          </div>
          <div className="progress-track mx-auto mt-3 max-w-5xl">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <SectionNav
        active={sectionId}
        onSelect={selectSection}
        withSafeArea={!tourStarted}
      />

      <main id="tour" className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="mb-8 animate-fade-up">
          {section.number && (
            <div className="flex flex-wrap items-end gap-3">
              <span className="display text-5xl italic leading-none text-[color:var(--color-burgundy)] sm:text-6xl">
                {section.number}
              </span>
              <h2 className="display pb-1 text-2xl leading-tight text-[color:var(--color-ink)] sm:text-3xl">
                {section.title}
              </h2>
            </div>
          )}
          <p className="mt-5 max-w-2xl text-[1rem] leading-relaxed text-[color:var(--color-muted)]">
            {section.intro}
          </p>
          <p className="meta-mono mt-4 inline-block border-l-2 border-[color:var(--color-gold)] pl-3 text-[color:var(--color-blue)]">
            {section.tip}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="h-[42vh] min-h-[260px] lg:col-span-7 lg:h-[min(70vh,640px)]">
            <TourMap
              stops={section.stops}
              activeStopId={activeStopId}
              doneIds={doneIds}
              onStopSelect={selectStop}
              flyToStop={flyToStop}
              fitKey={sectionId}
              showRoute={!section.freePick}
              walkerTargetId={walkerTargetId}
              walkNonce={walkNonce}
            />
          </div>

          <div className="lg:col-span-5">
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
              <div className="panel-glass animate-fade-up p-4 sm:p-5">
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
                  onSelect={selectStop}
                  freePick={section.freePick}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="relative mx-auto max-w-xl px-6 py-16 text-center">
        <div className="azulejo-band mx-auto mb-10 max-w-xs" />
        <p className="text-[0.98rem] leading-relaxed text-[color:var(--color-muted)]">
          {t.hero.weekdayNote}
        </p>
        <p className="display mt-8 text-3xl italic text-[color:var(--color-blue)]">
          {t.hero.signOff}
        </p>
        <p className="meta-mono mt-3 text-[color:var(--color-muted)]">
          {t.hero.closing}
        </p>
        <div className="mt-8 flex justify-center">
          <LangSwitch />
        </div>
        <nav className="meta-mono mt-10 flex flex-wrap justify-center gap-x-4 gap-y-2 text-[color:var(--color-blue)]">
          {sections.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => selectSection(s.id)}
              className="hover:underline"
            >
              {s.navLabel}
            </button>
          ))}
        </nav>
      </footer>
    </div>
  );
}
