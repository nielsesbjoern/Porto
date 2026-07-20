import { useId, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../i18n";
import { matchesClaraBirthday, persistUnlock } from "../utils/unlock";
import { BurritoSquatIntro } from "./BurritoSquatIntro";
import {
  GateDateFields,
  parseDateField,
  type DateTriplet,
} from "./GateDateFields";
import { LangSwitch } from "./LangSwitch";

interface ClaraGateProps {
  onUnlock: () => void;
}

export function ClaraGate({ onUnlock }: ClaraGateProps) {
  const { t } = useI18n();
  const formId = useId();
  const [date, setDate] = useState<DateTriplet>({
    day: "",
    month: "",
    year: "",
  });
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const [showIntro, setShowIntro] = useState(false);

  function fail() {
    setError(true);
    setShake(true);
    window.setTimeout(() => setShake(false), 420);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const d = parseDateField(date.day);
    const m = parseDateField(date.month);
    const y = parseDateField(date.year);
    if (d == null || m == null || y == null) {
      fail();
      return;
    }
    if (!matchesClaraBirthday(d, m, y)) {
      fail();
      return;
    }
    persistUnlock();
    setShowIntro(true);
  }

  if (showIntro) {
    return <BurritoSquatIntro onDone={onUnlock} />;
  }

  return (
    <div className="site-shell flex min-h-dvh flex-col pb-[max(1.5rem,env(safe-area-inset-bottom))]">
      <div className="flex flex-1 flex-col px-4 pt-[max(2.5rem,env(safe-area-inset-top))] sm:px-6">
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col">
          <div className="mb-8 flex items-center justify-between sm:mb-10">
            <Link
              to="/"
              className="meta-mono text-[color:var(--color-muted)] transition hover:text-[color:var(--color-ink)]"
            >
              {t.gate.claraBack}
            </Link>
            <LangSwitch />
            <span className="azulejo-corner" aria-hidden />
          </div>

          <div
            className={`animate-fade-up flex flex-1 flex-col justify-center pb-16 ${
              shake ? "gate-shake" : ""
            }`}
          >
            <p className="meta-mono text-center text-[color:var(--color-burgundy)]">
              {t.gate.claraLabel}
            </p>

            <h1 className="display mt-4 text-center text-[clamp(2.4rem,10vw,3.5rem)] leading-[0.95] text-[color:var(--color-ink)]">
              {t.gate.claraTitle}
            </h1>

            <div className="mx-auto mt-6 h-px w-14 bg-[color:var(--color-gold)]/70" />

            <p className="mx-auto mt-6 max-w-sm text-center text-[0.98rem] leading-relaxed text-[color:var(--color-muted)]">
              {t.gate.claraPrompt}
            </p>

            <form
              id={formId}
              onSubmit={handleSubmit}
              className="mt-10"
              noValidate
            >
              <GateDateFields
                values={date}
                onChange={(next) => {
                  setDate(next);
                  setError(false);
                }}
                error={error}
                dayLabel={t.gate.day}
                monthLabel={t.gate.month}
                yearLabel={t.gate.year}
                legend={t.gate.claraPrompt}
                autoFocus
              />

              <p
                className={`mt-5 min-h-[1.4em] text-center text-[0.9rem] text-[color:var(--color-wine)] transition-opacity ${
                  error ? "opacity-100" : "opacity-0"
                }`}
                role="alert"
                aria-live="polite"
              >
                {t.gate.error}
              </p>

              <button
                type="submit"
                className="btn-ink meta-mono mt-4 w-full px-4 py-3.5 tracking-[0.08em]"
              >
                {t.gate.submit}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="azulejo-band" />
    </div>
  );
}
