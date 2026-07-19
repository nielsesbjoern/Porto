export type SectionId =
  | "morning1"
  | "evening1"
  | "morning2"
  | "evening2";

export type DayId = "1" | "2";

export type DaySlot = "morning" | "evening";

export interface DayBase {
  id: DayId;
  morning: SectionId;
  evening: SectionId;
}

export interface StopBase {
  id: string;
  /** Map/list symbol for the place (emoji) */
  icon: string;
  lat: number;
  lng: number;
  mapsQuery?: string;
}

export interface SectionBase {
  id: SectionId;
  number?: string;
  freePick?: boolean;
  stops: StopBase[];
}

/** Localized stop = structure + translated copy */
export interface Stop extends StopBase {
  title: string;
  tag: string;
  body: string;
  meta: string;
  story: string;
}

export interface Section extends Omit<SectionBase, "stops"> {
  navLabel: string;
  title: string;
  intro: string;
  tip: string;
  stops: Stop[];
}

export const BASE = {
  lat: 41.14955,
  lng: -8.60685,
  mapsQuery: "Rua do Dr. Ricardo Jorge 96, Porto",
};

export const sectionOrder: SectionId[] = [
  "morning1",
  "evening1",
  "morning2",
  "evening2",
];

export const daysBase: DayBase[] = [
  { id: "1", morning: "morning1", evening: "evening1" },
  { id: "2", morning: "morning2", evening: "evening2" },
];

export function getDayBase(id: DayId): DayBase {
  return daysBase.find((d) => d.id === id)!;
}

export function sectionForDaySlot(dayId: DayId, slot: DaySlot): SectionId {
  const day = getDayBase(dayId);
  return slot === "morning" ? day.morning : day.evening;
}

export function daySlotForSection(
  sectionId: SectionId,
): { dayId: DayId; slot: DaySlot } | null {
  for (const day of daysBase) {
    if (day.morning === sectionId) return { dayId: day.id, slot: "morning" };
    if (day.evening === sectionId) return { dayId: day.id, slot: "evening" };
  }
  return null;
}

export function isDayId(value: string): value is DayId {
  return value === "1" || value === "2";
}

export function isDaySlot(value: string): value is DaySlot {
  return value === "morning" || value === "evening";
}

export const sectionsBase: SectionBase[] = [
  {
    id: "morning1",
    number: "01",
    stops: [
      {
        id: "m1-breakfast",
        icon: "☕",
        lat: 41.15015,
        lng: -8.6084,
        mapsQuery: "the grow, Travessa de Alferes Malheiro 83, Porto",
      },
      {
        id: "m1-santa-catarina",
        icon: "⛪",
        lat: 41.1468,
        lng: -8.6062,
        mapsQuery: "Capela das Almas, Porto",
      },
      {
        id: "m1-sao-bento",
        icon: "🚉",
        lat: 41.14555,
        lng: -8.61045,
        mapsQuery: "São Bento Station, Porto",
      },
      {
        id: "m1-miradouro",
        icon: "🌄",
        lat: 41.1416,
        lng: -8.6129,
        mapsQuery: "Miradouro da Rua das Aldas, Porto",
      },
      {
        id: "m1-sao-francisco",
        icon: "✝️",
        lat: 41.14105,
        lng: -8.61555,
        mapsQuery: "Igreja de São Francisco, Porto",
      },
      {
        id: "m1-lello",
        icon: "📚",
        lat: 41.14685,
        lng: -8.6147,
        mapsQuery: "Livraria Lello, Porto",
      },
      {
        id: "m1-lunch",
        icon: "🍽️",
        lat: 41.14755,
        lng: -8.6154,
        mapsQuery: "Jardim do Trás, Rua de Trás 224, Porto",
      },
    ],
  },
  {
    id: "evening1",
    number: "▸1",
    stops: [
      {
        id: "e1-metro",
        icon: "🚇",
        lat: 41.1852,
        lng: -8.6849,
        mapsQuery: "Matosinhos Sul Metro, Porto",
      },
      {
        id: "e1-beach",
        icon: "🏖️",
        lat: 41.1782,
        lng: -8.6905,
        mapsQuery: "Praia de Matosinhos",
      },
      {
        id: "e1-dinner",
        icon: "🐟",
        lat: 41.1824,
        lng: -8.6918,
        mapsQuery: "Lage Senhor do Padrão, Matosinhos",
      },
      {
        id: "e1-gelado",
        icon: "🍦",
        lat: 41.1852,
        lng: -8.6849,
        mapsQuery: "Matosinhos Sul Metro, Porto",
      },
    ],
  },
  {
    id: "morning2",
    number: "02",
    stops: [
      {
        id: "m2-breakfast",
        icon: "☕",
        lat: 41.14935,
        lng: -8.6049,
        mapsQuery: "Breakfast Lovers, Rua da Alegria 87, Porto",
      },
      {
        id: "m2-bolhao",
        icon: "🧺",
        lat: 41.14955,
        lng: -8.6065,
        mapsQuery: "Mercado do Bolhão, Porto",
      },
      {
        id: "m2-bridge",
        icon: "🌉",
        lat: 41.1384,
        lng: -8.60935,
        mapsQuery: "Jardim do Morro, Vila Nova de Gaia",
      },
      {
        id: "m2-lodges",
        icon: "🍷",
        lat: 41.1379,
        lng: -8.6128,
        mapsQuery: "WOW Porto, Vila Nova de Gaia",
      },
      {
        id: "m2-lunch",
        icon: "🍽️",
        lat: 41.13845,
        lng: -8.6142,
        mapsQuery: "Dragon Palace, Cais de Gaia",
      },
      {
        id: "m2-guindalense",
        icon: "🍺",
        lat: 41.14015,
        lng: -8.60955,
        mapsQuery: "Guindalense Futebol Clube, Porto",
      },
      {
        id: "m2-vandoma",
        icon: "🏷️",
        lat: 41.1482,
        lng: -8.5785,
        mapsQuery: "Feira da Vandoma, Porto",
      },
    ],
  },
  {
    id: "evening2",
    number: "▸2",
    stops: [
      {
        id: "e2-metro",
        icon: "🚇",
        lat: 41.1835,
        lng: -8.6552,
        mapsQuery: "NorteShopping I Sete Bicas metro, Porto",
      },
      {
        id: "e2-fogo",
        icon: "🥩",
        lat: 41.1839,
        lng: -8.6548,
        mapsQuery: "Fogo de Chão Norte Shopping, Rua Sara Afonso, Porto",
      },
      {
        id: "e2-virtudes",
        icon: "🌄",
        lat: 41.1432,
        lng: -8.6185,
        mapsQuery: "Jardim das Virtudes, Porto",
      },
      {
        id: "e2-mirajazz",
        icon: "🎷",
        lat: 41.1439,
        lng: -8.6178,
        mapsQuery: "Mirajazz, Escadas do Caminho Novo 11, Porto",
      },
    ],
  },
];

export function getSectionBase(id: SectionId): SectionBase {
  return sectionsBase.find((s) => s.id === id)!;
}
