import {
  useId,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { useI18n } from "../i18n";
import { matchesAnniversary, persistUnlock } from "../utils/unlock";
import { LangSwitch } from "./LangSwitch";

interface DateGateProps {
  onUnlock: () => void;
}

function parseField(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const n = Number.parseInt(trimmed, 10);
  return Number.isFinite(n) ? n : null;
}

export function DateGate({ onUnlock }: DateGateProps) {
  const { t } = useI18n();
  const formId = useId();
  const dayRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  function fail() {
    setError(true);
    setShake(true);
    window.setTimeout(() => setShake(false), 420);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const d = parseField(day);
    const m = parseField(month);
    const y = parseField(year);
    if (d == null || m == null || y == null) {
      fail();
      return;
    }
    if (!matchesAnniversary(d, m, y)) {
      fail();
      return;
    }
    persistUnlock();
    onUnlock();
  }

  function advanceOnDigits(
    value: string,
    maxLen: number,
    next: HTMLInputElement | null,
  ) {
    if (value.replace(/\D/g, "").length >= maxLen) {
      next?.focus();
      next?.select();
    }
  }

  function onDayKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      monthRef.current?.focus();
    }
  }

  function onMonthKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      yearRef.current?.focus();
    }
    if (event.key === "Backspace" && month === "") {
      dayRef.current?.focus();
    }
  }

  function onYearKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && year === "") {
      monthRef.current?.focus();
    }
  }

  return (
    <div className="site-shell flex min-h-dvh flex-col pb-[max(1.5rem,env(safe-area-inset-bottom))]">
      <div className="flex flex-1 flex-col px-4 pt-[max(2.5rem,env(safe-area-inset-top))] sm:px-6">
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col">
          <div className="mb-8 flex items-center justify-between sm:mb-10">
            <span className="azulejo-corner" aria-hidden />
            <LangSwitch />
            <span className="azulejo-corner" aria-hidden />
          </div>

          <div
            className={`animate-fade-up flex flex-1 flex-col justify-center pb-16 ${
              shake ? "gate-shake" : ""
            }`}
          >
            <p className="meta-mono text-center text-[color:var(--color-burgundy)]">
              {t.gate.overline}
            </p>

            <h1 className="display mt-4 text-center text-[clamp(2.4rem,10vw,3.5rem)] leading-[0.95] text-[color:var(--color-ink)]">
              {t.gate.title}
            </h1>

            <div className="mx-auto mt-6 h-px w-14 bg-[color:var(--color-gold)]/70" />

            <p className="mx-auto mt-6 max-w-sm text-center text-[0.98rem] leading-relaxed text-[color:var(--color-muted)]">
              {t.gate.prompt}
            </p>

            <form
              id={formId}
              onSubmit={handleSubmit}
              className="mt-10"
              noValidate
            >
              <fieldset className="border-0 p-0">
                <legend className="sr-only">{t.gate.prompt}</legend>
                <div className="flex items-end justify-center gap-2 sm:gap-3">
                  <label className="flex min-w-0 flex-1 flex-col gap-2">
                    <span className="meta-mono text-center text-[color:var(--color-muted)]">
                      {t.gate.day}
                    </span>
                    <input
                      ref={dayRef}
                      type="text"
                      inputMode="numeric"
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck={false}
                      maxLength={2}
                      placeholder="··"
                      aria-invalid={error}
                      value={day}
                      onChange={(e) => {
                        const next = e.target.value.replace(/\D/g, "").slice(0, 2);
                        setDay(next);
                        setError(false);
                        advanceOnDigits(next, 2, monthRef.current);
                      }}
                      onKeyDown={onDayKeyDown}
                      className="gate-input"
                    />
                  </label>

                  <span
                    className="display mb-3 text-2xl text-[color:var(--color-gold)]"
                    aria-hidden
                  >
                    ·
                  </span>

                  <label className="flex min-w-0 flex-1 flex-col gap-2">
                    <span className="meta-mono text-center text-[color:var(--color-muted)]">
                      {t.gate.month}
                    </span>
                    <input
                      ref={monthRef}
                      type="text"
                      inputMode="numeric"
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck={false}
                      maxLength={2}
                      placeholder="··"
                      aria-invalid={error}
                      value={month}
                      onChange={(e) => {
                        const next = e.target.value.replace(/\D/g, "").slice(0, 2);
                        setMonth(next);
                        setError(false);
                        advanceOnDigits(next, 2, yearRef.current);
                      }}
                      onKeyDown={onMonthKeyDown}
                      className="gate-input"
                    />
                  </label>

                  <span
                    className="display mb-3 text-2xl text-[color:var(--color-gold)]"
                    aria-hidden
                  >
                    ·
                  </span>

                  <label className="flex min-w-0 flex-[1.35] flex-col gap-2">
                    <span className="meta-mono text-center text-[color:var(--color-muted)]">
                      {t.gate.year}
                    </span>
                    <input
                      ref={yearRef}
                      type="text"
                      inputMode="numeric"
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck={false}
                      maxLength={4}
                      placeholder="····"
                      aria-invalid={error}
                      value={year}
                      onChange={(e) => {
                        const next = e.target.value.replace(/\D/g, "").slice(0, 4);
                        setYear(next);
                        setError(false);
                      }}
                      onKeyDown={onYearKeyDown}
                      className="gate-input"
                    />
                  </label>
                </div>
              </fieldset>

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
