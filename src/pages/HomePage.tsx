import { Link } from "react-router-dom";
import { BASE, daysBase } from "../data/itinerary";
import { useI18n } from "../i18n";
import { isAppleTouchDevice } from "../utils/device";
import { googleMapsQueryUrl } from "../utils/maps";
import { LangSwitch } from "../components/LangSwitch";

function baseMapsUrl() {
  if (isAppleTouchDevice()) {
    return `https://maps.apple.com/?q=${encodeURIComponent(BASE.mapsQuery)}`;
  }
  return googleMapsQueryUrl(BASE.mapsQuery);
}

export function HomePage() {
  const { t } = useI18n();

  return (
    <div className="site-shell pb-safe-bar">
      <header className="hero-river relative px-4 pb-10 pt-[max(2.5rem,env(safe-area-inset-top))] text-center animate-fade-up sm:px-6 sm:pb-12 sm:pt-[max(3rem,env(safe-area-inset-top))]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_at_top,color-mix(in_srgb,var(--color-blue)_18%,transparent),transparent_70%)]" />

        <div className="relative mx-auto max-w-xl">
          <div className="mb-6 flex items-center justify-between sm:mb-8">
            <span className="azulejo-corner" aria-hidden />
            <LangSwitch />
            <span className="azulejo-corner" aria-hidden />
          </div>

          <p className="meta-mono text-[color:var(--color-burgundy)]">
            {t.hero.overline}
          </p>

          <h1 className="display mt-3 break-words text-[clamp(2.15rem,9vw,3.75rem)] leading-[0.95] text-[color:var(--color-ink)] sm:mt-4">
            {t.hero.city}
          </h1>

          <p className="display mt-1 text-[clamp(1.65rem,7vw,2.9rem)] font-normal italic leading-tight text-[color:var(--color-blue)]">
            {t.hero.subtitle}
          </p>

          <div className="mx-auto mt-6 h-px w-16 bg-[color:var(--color-gold)]/70 sm:mt-7" />

          <p className="mx-auto mt-6 max-w-md text-[0.95rem] leading-relaxed text-[color:var(--color-muted)] sm:mt-7 sm:text-[1rem]">
            {t.hero.intro}
          </p>

          <a
            href={baseMapsUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="ticket-box meta-mono mt-7 inline-block w-full max-w-md px-4 py-3.5 text-[color:var(--color-blue)] transition hover:bg-white/80 sm:mt-8"
          >
            {t.hero.baseLabel}
          </a>
        </div>
      </header>

      <div className="azulejo-band" />

      <main className="mx-auto max-w-xl px-4 py-10 sm:px-6">
        <ul className="flex flex-col gap-4">
          {daysBase.map((day) => {
            const copy = t.days[day.id];
            return (
              <li key={day.id}>
                <Link
                  to={`/day/${day.id}/morning`}
                  className="panel-glass block p-5 text-left transition active:scale-[0.99] hover:border-[color:var(--color-blue)] sm:p-6"
                >
                  <p className="meta-mono text-[color:var(--color-burgundy)]">
                    {copy.navLabel}
                  </p>
                  <h2 className="display mt-2 text-2xl leading-tight text-[color:var(--color-ink)]">
                    {copy.title}
                  </h2>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-[color:var(--color-muted)]">
                    {copy.blurb}
                  </p>
                  <p className="meta-mono mt-5 text-[color:var(--color-blue)]">
                    {t.ui.openDay}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </main>

      <footer className="relative mx-auto max-w-xl px-4 py-12 text-center sm:px-6">
        <div className="azulejo-band mx-auto mb-8 max-w-xs" />
        <p className="text-[0.92rem] leading-relaxed text-[color:var(--color-muted)] sm:text-[0.98rem]">
          {t.hero.weekdayNote}
        </p>
        <p className="display mt-7 text-[1.75rem] italic text-[color:var(--color-blue)] sm:mt-8 sm:text-3xl">
          {t.hero.signOff}
        </p>
        <p className="meta-mono mt-3 text-[color:var(--color-muted)]">
          {t.hero.closing}
        </p>
        <div className="mt-8 flex justify-center">
          <LangSwitch />
        </div>
        <img
          src="/avatars/couple.png"
          alt=""
          width={96}
          height={96}
          className="footer-avatar mx-auto mt-10"
        />
      </footer>
    </div>
  );
}
