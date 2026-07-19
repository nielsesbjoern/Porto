import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Section, SectionId, Stop } from "../data/itinerary";
import { getSectionBase, sectionsBase } from "../data/itinerary";
import { de } from "./locales/de";
import { en } from "./locales/en";
import { pt } from "./locales/pt";
import { stories } from "./stories";
import type { Dictionary, Locale } from "./types";

const LOCALES: Record<Locale, Dictionary> = { en, de, pt };

const STORAGE_KEY = "andrade-schade-porto:lang";

function detectLocale(): Locale {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "de" || saved === "pt") return saved;
  } catch {
    /* ignore */
  }
  const nav = navigator.language.toLowerCase();
  if (nav.startsWith("de")) return "de";
  if (nav.startsWith("pt")) return "pt";
  return "en";
}

function fill(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    String(vars[key] ?? ""),
  );
}

function buildSection(locale: Locale, id: SectionId): Section {
  const base = getSectionBase(id);
  const copy = LOCALES[locale].sections[id];
  return {
    ...base,
    navLabel: copy.navLabel,
    title: copy.title,
    intro: copy.intro,
    tip: copy.tip,
    stops: base.stops.map((stop) => {
      const stopCopy = copy.stops[stop.id];
      return {
        ...stop,
        title: stopCopy.title,
        tag: stopCopy.tag,
        body: stopCopy.body,
        meta: stopCopy.meta,
        story: stories[locale][stop.id] ?? "",
      } satisfies Stop;
    }),
  };
}

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
  format: (template: string, vars: Record<string, string | number>) => string;
  getSection: (id: SectionId) => Section;
  sections: Section[];
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() =>
    typeof window === "undefined" ? "en" : detectLocale(),
  );

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const t = LOCALES[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = t.meta.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t.meta.description);
  }, [locale, t.meta.title, t.meta.description]);

  const sections = useMemo(
    () => sectionsBase.map((s) => buildSection(locale, s.id)),
    [locale],
  );

  const getSection = useCallback(
    (id: SectionId) => buildSection(locale, id),
    [locale],
  );

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t,
      format: fill,
      getSection,
      sections,
    }),
    [locale, setLocale, t, getSection, sections],
  );

  return (
    <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

export type { Locale };
