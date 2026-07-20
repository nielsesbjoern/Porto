import { useState } from "react";
import { Link } from "react-router-dom";
import { LangSwitch } from "../components/LangSwitch";
import { StopPhotos } from "../components/StopPhotos";
import {
  daysBase,
  type DayId,
  type DaySlot,
  type SectionId,
} from "../data/itinerary";
import { useI18n } from "../i18n";

const SLOTS: DaySlot[] = ["morning", "evening"];

export function AlbumPage() {
  const { t, format, getSection } = useI18n();
  const [bookOpen, setBookOpen] = useState(false);
  const [openDay, setOpenDay] = useState<DayId | null>(null);
  const [openSection, setOpenSection] = useState<SectionId | null>(null);
  const [openStop, setOpenStop] = useState<string | null>(null);

  function toggleDay(dayId: DayId) {
    setOpenDay((prev) => (prev === dayId ? null : dayId));
    setOpenSection(null);
    setOpenStop(null);
  }

  function toggleSection(sectionId: SectionId) {
    setOpenSection((prev) => (prev === sectionId ? null : sectionId));
    setOpenStop(null);
  }

  function toggleStop(stopId: string) {
    setOpenStop((prev) => (prev === stopId ? null : stopId));
  }

  function closeBook() {
    setBookOpen(false);
    setOpenDay(null);
    setOpenSection(null);
    setOpenStop(null);
  }

  return (
    <div className="site-shell photo-book-shell pb-safe-bar">
      <div className="mx-auto flex max-w-xl items-center justify-between px-4 pt-[max(1.25rem,env(safe-area-inset-top))] sm:px-6">
        <Link
          to="/"
          className="meta-mono text-[color:var(--color-blue)] transition hover:underline"
        >
          {t.ui.backHome}
        </Link>
        <LangSwitch />
      </div>

      <main className="mx-auto max-w-xl px-4 py-8 sm:px-6 sm:py-10">
        <div
          className={`photo-book ${bookOpen ? "photo-book--open" : ""}`}
        >
          {/* Cover */}
          <button
            type="button"
            className="photo-book__cover"
            onClick={() => setBookOpen(true)}
            aria-expanded={bookOpen}
            aria-hidden={bookOpen}
            tabIndex={bookOpen ? -1 : 0}
          >
            <span className="photo-book__spine" aria-hidden />
            <span className="photo-book__cover-inner">
              <span className="azulejo-corner photo-book__corner photo-book__corner--tl" />
              <span className="azulejo-corner photo-book__corner photo-book__corner--tr" />
              <span className="azulejo-corner photo-book__corner photo-book__corner--bl" />
              <span className="azulejo-corner photo-book__corner photo-book__corner--br" />

              <p className="meta-mono text-white/65">{t.album.overline}</p>
              <h1 className="display mt-4 text-[clamp(2.1rem,9vw,3.4rem)] leading-[0.95] text-white">
                {t.album.title}
              </h1>
              <div className="photo-book__gold-rule mx-auto mt-6" />
              <p className="mx-auto mt-6 max-w-[16rem] text-[0.92rem] leading-relaxed text-white/75">
                {t.album.intro}
              </p>
              <p className="meta-mono mt-10 text-white">{t.album.openBook}</p>
            </span>
          </button>

          {/* Pages */}
          <div
            className="photo-book__pages"
            aria-hidden={!bookOpen}
            inert={!bookOpen ? true : undefined}
          >
            <div className="photo-book__page">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="meta-mono text-[color:var(--color-burgundy)]">
                    {t.album.contents}
                  </p>
                  <h2 className="display mt-2 text-3xl leading-tight text-[color:var(--color-ink)]">
                    {t.album.title}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={closeBook}
                  className="meta-mono shrink-0 text-[color:var(--color-blue)] transition hover:underline"
                >
                  {t.album.closeBook}
                </button>
              </div>

              <div className="photo-book__gold-rule mt-6" />

              <div className="mt-8 flex flex-col gap-4">
                {daysBase.map((day, dayIndex) => {
                  const dayCopy = t.days[day.id];
                  const dayIsOpen = openDay === day.id;

                  return (
                    <div
                      key={day.id}
                      className={`photo-book__chapter ${dayIsOpen ? "photo-book__chapter--open" : ""}`}
                    >
                      <button
                        type="button"
                        className="photo-book__chapter-tab"
                        onClick={() => toggleDay(day.id)}
                        aria-expanded={dayIsOpen}
                      >
                        <span className="meta-mono text-[color:var(--color-gold)]">
                          {String(dayIndex + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0 flex-1 text-left">
                          <span className="meta-mono block text-[color:var(--color-burgundy)]">
                            {dayCopy.navLabel}
                          </span>
                          <span className="display mt-1 block text-xl leading-snug text-[color:var(--color-ink)] sm:text-2xl">
                            {dayCopy.title}
                          </span>
                        </span>
                        <span
                          className="photo-book__fold-mark meta-mono text-[color:var(--color-blue)]"
                          aria-hidden
                        >
                          {dayIsOpen ? "−" : "+"}
                        </span>
                      </button>

                      {dayIsOpen && (
                        <div className="photo-book__chapter-body">
                          {SLOTS.map((slot) => {
                            const sectionId =
                              slot === "morning" ? day.morning : day.evening;
                            const section = getSection(sectionId);
                            const sectionIsOpen = openSection === sectionId;
                            const slotLabel =
                              slot === "morning"
                                ? t.ui.morningSlot
                                : t.ui.eveningSlot;

                            return (
                              <div
                                key={sectionId}
                                className={`photo-book__section ${sectionIsOpen ? "photo-book__section--open" : ""}`}
                              >
                                <button
                                  type="button"
                                  className="photo-book__section-tab"
                                  onClick={() => toggleSection(sectionId)}
                                  aria-expanded={sectionIsOpen}
                                >
                                  <span className="display text-lg italic text-[color:var(--color-blue)] sm:text-xl">
                                    {slotLabel}
                                  </span>
                                  <span className="meta-mono text-[color:var(--color-muted)]">
                                    {section.stops.length} ·{" "}
                                    {sectionIsOpen
                                      ? t.album.foldIn
                                      : t.album.foldOut}
                                  </span>
                                </button>

                                {sectionIsOpen && (
                                  <div className="photo-book__section-body">
                                    {section.stops.map((stop, stopIndex) => {
                                      const stopIsOpen = openStop === stop.id;
                                      return (
                                        <article
                                          key={stop.id}
                                          className={`photo-book__leaf ${stopIsOpen ? "photo-book__leaf--open" : ""}`}
                                        >
                                          <button
                                            type="button"
                                            className="photo-book__leaf-tab"
                                            onClick={() =>
                                              toggleStop(stop.id)
                                            }
                                            aria-expanded={stopIsOpen}
                                          >
                                            <span
                                              className="stop-icon text-[1.5rem] leading-none"
                                              aria-hidden
                                            >
                                              {stop.icon}
                                            </span>
                                            <span className="min-w-0 flex-1 text-left">
                                              <span className="meta-mono text-[color:var(--color-muted)]">
                                                {format(t.album.placeOf, {
                                                  current: stopIndex + 1,
                                                  total: section.stops.length,
                                                })}
                                              </span>
                                              <span className="display mt-0.5 block text-[1.2rem] leading-snug text-[color:var(--color-ink)] sm:text-xl">
                                                {stop.title}
                                              </span>
                                              <span className="meta-mono mt-1 block text-[color:var(--color-blue)]">
                                                {stop.tag}
                                              </span>
                                            </span>
                                            <span
                                              className="photo-book__fold-mark meta-mono text-[color:var(--color-blue)]"
                                              aria-hidden
                                            >
                                              {stopIsOpen ? "−" : "+"}
                                            </span>
                                          </button>

                                          {stopIsOpen && (
                                            <div className="photo-book__leaf-body">
                                              <StopPhotos
                                                stopId={stop.id}
                                                layout="book"
                                              />
                                            </div>
                                          )}
                                        </article>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <p className="display mt-12 text-center text-2xl italic text-[color:var(--color-blue)]">
                {t.hero.signOff}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
