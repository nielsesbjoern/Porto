export const UNLOCK_STORAGE_KEY = "andrade-schade-porto:unlocked";

/** Anniversary — day they got together (28 June 2025). */
export const ANNIVERSARY = { day: 28, month: 6, year: 2025 } as const;

/** Clara’s birthday — second gate field (25 December 2006). */
export const CLARA_BIRTHDAY = { day: 25, month: 12, year: 2006 } as const;

export function isUnlocked(): boolean {
  try {
    return localStorage.getItem(UNLOCK_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function persistUnlock(): void {
  try {
    localStorage.setItem(UNLOCK_STORAGE_KEY, "1");
  } catch {
    /* ignore */
  }
}

export function matchesAnniversary(
  day: number,
  month: number,
  year: number,
): boolean {
  return (
    day === ANNIVERSARY.day &&
    month === ANNIVERSARY.month &&
    year === ANNIVERSARY.year
  );
}

export function matchesClaraBirthday(
  day: number,
  month: number,
  year: number,
): boolean {
  return (
    day === CLARA_BIRTHDAY.day &&
    month === CLARA_BIRTHDAY.month &&
    year === CLARA_BIRTHDAY.year
  );
}
