import type { SectionId } from "../data/itinerary";

export type Locale = "en" | "de" | "pt";

export interface StopCopy {
  title: string;
  tag: string;
  body: string;
  meta: string;
}

export interface SectionCopy {
  navLabel: string;
  title: string;
  intro: string;
  tip: string;
  stops: Record<string, StopCopy>;
}

export interface Dictionary {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    overline: string;
    city: string;
    subtitle: string;
    intro: string;
    baseLabel: string;
    startCta: string;
    closing: string;
    weekdayNote: string;
    signOff: string;
  };
  ui: {
    endTour: string;
    backHome: string;
    dayOf: string;
    openDay: string;
    morningSlot: string;
    eveningSlot: string;
    doneCount: string;
    pickFreely: string;
    stopsTap: string;
    backToList: string;
    stopOf: string;
    done: string;
    openMaps: string;
    walkingRoute: string;
    doneNext: string;
    markDone: string;
    undoDone: string;
    nextStop: string;
    myLocation: string;
    myLocationShort: string;
    locating: string;
    geoUnsupported: string;
    geoDenied: string;
    geoFailed: string;
    tourInMaps: string;
    tourInMapsShort: string;
    completeTour: string;
    completeTourShort: string;
    stage: string;
    stageShort: string;
    openMapsShort: string;
    langLabel: string;
    storyLabel: string;
  };
  days: Record<
    "1" | "2",
    {
      navLabel: string;
      title: string;
      blurb: string;
    }
  >;
  sections: Record<SectionId, SectionCopy>;
}
