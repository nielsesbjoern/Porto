import { useI18n, type Locale } from "../i18n";

const OPTIONS: { id: Locale; label: string }[] = [
  { id: "en", label: "EN" },
  { id: "de", label: "DE" },
  { id: "pt", label: "PT" },
];

export function LangSwitch() {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      className="inline-flex items-center gap-1"
      role="group"
      aria-label={t.ui.langLabel}
    >
      {OPTIONS.map((opt, index) => (
        <span key={opt.id} className="inline-flex items-center gap-1">
          {index > 0 && (
            <span className="text-[color:var(--color-line)]" aria-hidden>
              ·
            </span>
          )}
          <button
            type="button"
            onClick={() => setLocale(opt.id)}
            className={`meta-mono min-h-11 min-w-11 px-2 py-2 transition ${
              locale === opt.id
                ? "text-[color:var(--color-burgundy)]"
                : "text-[color:var(--color-muted)] hover:text-[color:var(--color-blue)]"
            }`}
            aria-pressed={locale === opt.id}
          >
            {opt.label}
          </button>
        </span>
      ))}
    </div>
  );
}
