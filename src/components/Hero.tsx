import { BASE } from "../data/itinerary";
import { useI18n } from "../i18n";
import { googleMapsQueryUrl } from "../utils/maps";
import { LangSwitch } from "./LangSwitch";

interface HeroProps {
  onStart: () => void;
}

export function Hero({ onStart }: HeroProps) {
  const { t } = useI18n();

  return (
    <header className="hero-river relative px-4 pb-10 pt-[max(2.5rem,env(safe-area-inset-top))] text-center animate-fade-up sm:px-6 sm:pb-12 sm:pt-12">
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

        <div className="mx-auto mt-7 flex w-full max-w-md flex-col gap-3 sm:mt-8">
          <a
            href={googleMapsQueryUrl(BASE.mapsQuery)}
            target="_blank"
            rel="noopener noreferrer"
            className="ticket-box meta-mono inline-block w-full px-4 py-3.5 text-[color:var(--color-blue)] transition hover:bg-white/80"
          >
            {t.hero.baseLabel}
          </a>

          <button
            type="button"
            onClick={onStart}
            className="btn-ink meta-mono inline-flex w-full items-center justify-center gap-2 px-5 py-3.5"
          >
            {t.hero.startCta}
          </button>
        </div>
      </div>
    </header>
  );
}
