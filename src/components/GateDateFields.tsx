import { useRef, type KeyboardEvent } from "react";

export type DateTriplet = { day: string; month: string; year: string };

export function parseDateField(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const n = Number.parseInt(trimmed, 10);
  return Number.isFinite(n) ? n : null;
}

export function GateDateFields({
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
