import {
  useId,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { useI18n } from "../i18n";
import {
  matchesAnniversary,
  matchesClaraBirthday,
  persistUnlock,
} from "../utils/unlock";
import { BurritoSquatIntro } from "./BurritoSquatIntro";
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

type DateTriplet = { day: string; month: string; year: string };

function DateFields({
  values,
  onChange,
  error,
  dayLabel,
  monthLabel,
  yearLabel,
  legend,
  autoFocus,
}: {
  values: DateTriplet;
  onChange: (next: DateTriplet) => void;
  error: boolean;
  dayLabel: string;
  monthLabel: string;
  yearLabel: string;
  legend: string;
  autoFocus?: boolean;
}) {
  const dayRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

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
    if (event.key === "Backspace" && values.month === "") {
      dayRef.current?.focus();
    }
  }

  function onYearKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && values.year === "") {
      monthRef.current?.focus();
    }
  }

  return (
    <fieldset className="border-0 p-0">
      <legend className="sr-only">{legend}</legend>
      <div className="flex items-end justify-center gap-2 sm:gap-3">
        <label className="flex min-w-0 flex-1 flex-col gap-2">
          <span className="meta-mono text-center text-[color:var(--color-muted)]">
            {dayLabel}
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
            autoFocus={autoFocus}
            value={values.day}
            onChange={(e) => {
              const next = e.target.value.replace(/\D/g, "").slice(0, 2);
              onChange({ ...values, day: next });
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
            {monthLabel}
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
            value={values.month}
            onChange={(e) => {
              const next = e.target.value.replace(/\D/g, "").slice(0, 2);
              onChange({ ...values, month: next });
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
            {yearLabel}
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
            value={values.year}
            onChange={(e) => {
              const next = e.target.value.replace(/\D/g, "").slice(0, 4);
              onChange({ ...values, year: next });
            }}
            onKeyDown={onYearKeyDown}
            className="gate-input"
          />
        </label>
      </div>
    </fieldset>
  );
}

export function DateGate({ onUnlock }: DateGateProps) {
  const { t } = useI18n();
  const formId = useId();
  const [anniversary, setAnniversary] = useState<DateTriplet>({
    day: "",
    month: "",
    year: "",
  });
  const [clara, setClara] = useState<DateTriplet>({
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
    const ad = parseField(anniversary.day);
    const am = parseField(anniversary.month);
    const ay = parseField(anniversary.year);
    const cd = parseField(clara.day);
    const cm = parseField(clara.month);
    const cy = parseField(clara.year);
    if (
      ad == null ||
      am == null ||
      ay == null ||
      cd == null ||
      cm == null ||
      cy == null
    ) {
      fail();
      return;
    }
    if (!matchesAnniversary(ad, am, ay) || !matchesClaraBirthday(cd, cm, cy)) {
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
              <DateFields
                values={anniversary}
                onChange={(next) => {
                  setAnniversary(next);
                  setError(false);
                }}
                error={error}
                dayLabel={t.gate.day}
                monthLabel={t.gate.month}
                yearLabel={t.gate.year}
                legend={t.gate.prompt}
                autoFocus
              />

              <div className="mt-10">
                <p className="meta-mono text-center text-[color:var(--color-burgundy)]">
                  {t.gate.claraLabel}
                </p>
                <p className="mx-auto mt-3 max-w-xs text-center text-[0.92rem] leading-relaxed text-[color:var(--color-muted)]">
                  {t.gate.claraPrompt}
                </p>
                <div className="mt-5">
                  <DateFields
                    values={clara}
                    onChange={(next) => {
                      setClara(next);
                      setError(false);
                    }}
                    error={error}
                    dayLabel={t.gate.day}
                    monthLabel={t.gate.month}
                    yearLabel={t.gate.year}
                    legend={t.gate.claraPrompt}
                  />
                </div>
              </div>

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
