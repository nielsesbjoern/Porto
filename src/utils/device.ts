/** iOS / iPhone helpers for maps links and display mode */

export function isAppleTouchDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/i.test(ua)) return true;
  // iPadOS 13+ reports as Mac
  return navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
}

/** Home Screen / standalone PWA (Safari “Add to Home Screen”) */
export function isStandaloneDisplay(): boolean {
  if (typeof window === "undefined") return false;
  const nav = window.navigator as Navigator & { standalone?: boolean };
  if (nav.standalone) return true;
  return window.matchMedia("(display-mode: standalone)").matches;
}
