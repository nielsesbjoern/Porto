import type { SectionId } from "../data/itinerary";
import { useI18n } from "../i18n";

interface SectionNavProps {
  active: SectionId;
  onSelect: (id: SectionId) => void;
  withSafeArea?: boolean;
}

export function SectionNav({
  active,
  onSelect,
  withSafeArea = false,
}: SectionNavProps) {
  const { sections } = useI18n();

  return (
    <div className={`nav-sticky${withSafeArea ? " nav-sticky--safe" : ""}`}>
      <div className="azulejo-band" />
      <nav aria-label="Itinerary sections" className="section-nav-scroll">
        <ul className="mx-auto flex w-max min-w-full max-w-3xl items-stretch sm:w-full">
          {sections.map((section) => {
            const isActive = section.id === active;
            return (
              <li
                key={section.id}
                className="flex shrink-0 border-r border-[color:var(--color-line)] last:border-r-0 sm:min-w-0 sm:flex-1"
              >
                <button
                  type="button"
                  onClick={() => onSelect(section.id)}
                  className={`meta-mono relative whitespace-nowrap px-3.5 py-3.5 text-center transition sm:w-full sm:whitespace-normal sm:px-2 ${
                    isActive
                      ? "bg-[color:var(--color-blue)] text-[color:var(--color-paper)]"
                      : "text-[color:var(--color-ink)] hover:bg-[color:var(--color-blue)]/8 hover:text-[color:var(--color-blue)]"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {section.navLabel}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
