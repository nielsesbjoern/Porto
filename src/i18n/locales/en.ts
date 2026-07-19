import type { Dictionary } from "../types";

export const en: Dictionary = {
  meta: {
    title: "Andrade-Schade in Porto",
    description: "Andrade-Schade in Porto — two mornings on the Douro.",
  },
  hero: {
    overline: "Two mornings on the Douro",
    city: "Andrade-Schade",
    subtitle: "in Porto",
    intro:
      "No themes, just geography. Each morning is a single loop from the flat that ends at lunch — then nap. Each evening is its own fixed plan too, so you always know where you're headed.",
    baseLabel:
      "BASE · Rua do Dr. Ricardo Jorge 96 — 5 min walk from Bolhão",
    startCta: "Open Monday →",
    closing: "Two days, fixed plans — morning, nap, evening.",
    weekdayNote:
      "Weekday check: Bolhão closed Sundays, Mercado Porto Belo only Saturdays, Lage Senhor do Padrão closed Mondays and Sundays. Book Fogo; check Mirajazz hours. If one of your days lands on a Sunday, reshuffle.",
    signOff: "Bom porto.",
  },
  gate: {
    overline: "For Miriam & Niels",
    title: "Since when have Miriam and Niels been together?",
    prompt: "Enter the date — then your Porto plan opens.",
    day: "Day",
    month: "Month",
    year: "Year",
    submit: "Enter →",
    error: "That’s not it — try again.",
  },
  ui: {
    endTour: "End tour",
    backHome: "← Back to home",
    dayOf: "Day {n}",
    openDay: "Open day →",
    morningSlot: "Morning",
    eveningSlot: "Evening",
    doneCount: "{done}/{total} done",
    pickFreely: "Pick freely · tap a stop",
    stopsTap: "{count} stops · tap to open",
    backToList: "← Back to list",
    stopOf: "Stop {current} of {total}",
    done: "done",
    openMaps: "Open in Maps",
    openMapsShort: "Maps",
    walkingRoute: "Walking route",
    doneNext: "Done → next",
    markDone: "Mark done",
    undoDone: "Undo done",
    nextStop: "Next stop →",
    myLocation: "My location",
    myLocationShort: "Locate",
    locating: "Locating…",
    geoUnsupported: "Geolocation not supported",
    geoDenied: "Location denied",
    geoFailed: "Location failed",
    tourInMaps: "Tour in Maps",
    tourInMapsShort: "Tour → Maps",
    completeTour: "Complete tour ({count} stops)",
    completeTourShort: "All ({count})",
    stage: "Stage {index} · stops {from}–{to}",
    stageShort: "Stage {index}",
    langLabel: "Language",
    storyLabel: "The story",
    offlineMode: "Offline · itinerary & cached map ready",
    offlineInstalling: "Preparing offline mode…",
    offlinePrepare: "Save for offline (map + pages)",
    offlinePreparing: "Saving for offline…",
    offlineReady: "Saved for offline ✓",
    iosAddHome:
      "Add to Home Screen: Share → “Add to Home Screen” — then Porto works like an app, even offline.",
    iosAddHomeDismiss: "Got it",
  },
  days: {
    "1": {
      navLabel: "Monday",
      title: "Monday — Old Town & Matosinhos",
      blurb:
        "Morning: one loop through the old town ending at lunch. Evening: beach and fish in Matosinhos.",
    },
    "2": {
      navLabel: "Tuesday",
      title: "Tuesday — Gaia & rodízio",
      blurb:
        "Morning: Bolhão, the bridge and port wine in Gaia. Evening: Fogo de Chão, Virtudes, Mirajazz.",
    },
  },
  sections: {
    morning1: {
      navLabel: "Morning",
      title: "Morning — Old Town Core",
      intro:
        "One line, no backtracking: down through Santa Catarina from the flat, past the Sé and hidden viewpoints to the river, through the gilded church, and up Rua das Flores to Lello. Ends at lunch.",
      tip: "BOOK LELLO FOR THE LATEST MORNING SLOT · ~4.5 KM",
      stops: {
        "m1-breakfast": {
          title: "Breakfast — the start",
          tag: "the grow",
          body: "Three minutes from the flat, tucked into a quiet side alley (Travessa de Alferes Malheiro 83) — small courtyard, generous breakfast plates, genuinely good cappuccino, no queue for photos. Open from 8:30am. Alternative right on the way down: Eatery 119 (Rua de Rodrigues Sampaio, from 9am) for excellent Turkish eggs.",
          meta: "3 min from the flat — then straight into Santa Catarina",
        },
        "m1-santa-catarina": {
          title:
            "Rua de Santa Catarina: Pérola do Bolhão, Majestic, Santo Ildefonso, Capela das Almas",
          tag: "Nice, not famous",
          body: "Your own street already has four stops: A Pérola do Bolhão, the 100-year-old grocer with an Art Nouveau facade, tinned sardines and salted cod in the window. The Majestic Café — Belle Époque, a look through the door costs nothing. Further down, the azulejo facades of Santo Ildefonso church and the Capela das Almas. All within 800 meters downhill.",
          meta: "Straight from the flat, all on the way",
        },
        "m1-sao-bento": {
          title: "São Bento via the Aliados → Sé → Largo da Pena Ventosa",
          tag: "Essential Porto",
          body: "From the Capela das Almas, swing onto Avenida dos Aliados — Porto's grand boulevard with the city hall at its head, one straight walk down, zero detour. Below, the São Bento station hall with its 20,000 azulejo tiles, then up to the cathedral for the first view over the rooftops — and directly behind it, the Largo da Pena Ventosa, one of the oldest squares in town, barely visited. Today's first hidden moment.",
          meta: "5 min from the Capela das Almas, Aliados is on the way",
        },
        "m1-miradouro": {
          title: "Miradouro da Rua das Aldas → Ribeira → Bridge",
          tag: "Off the route",
          body: "On the way down from the Sé, the tiny, almost unknown viewpoint on Rua das Aldas — rooftops down to the river, usually all to yourselves. Then through the alleys down to the Ribeira and briefly onto the lower deck of the bridge for the view toward Gaia. That's tomorrow's territory — today just a look.",
          meta: "8 min downhill",
        },
        "m1-sao-francisco": {
          title: "Igreja de São Francisco + catacombs",
          tag: "Non-negotiable",
          body: "The gilded church: the entire interior covered in gold-leaf woodcarving — and in the crypt, the catacombs with an ossuary under glass flooring. The darkest and best crime-novel stop in the city, right along the Ribeira stretch. The Palácio da Bolsa with its Arab Hall is next door if you want the 45-minute tour.",
          meta: "3 min from the riverfront",
        },
        "m1-lello": {
          title: "Rua das Flores → Livraria Lello + Manifesto Library + Carmo",
          tag: "For both of you",
          body: "Rua das Flores takes you uphill past ceramics, paper and workshop stores. At the top, Lello — and inside the new Siza-designed auditorium, the Manifesto Library: Dua Lipa's Service95 book club permanently displays 100 banned and censored books (Power, Control, Voice, Memory). Book tickets online in advance; the fee is credited against a book purchase. Next door, the azulejo facade of Igreja do Carmo. On Saturdays, 3 min further: Mercado Porto Belo, a small vintage, vinyl and book market on Praça Carlos Alberto.",
          meta: "Flores starts at the riverfront, Lello is 6 min further",
        },
        "m1-lunch": {
          title: "Lunch",
          tag: "Jardim do Trás",
          body: "Three minutes from Lello, hidden down an alley on Rua de Trás 224 — tiny place run by two people who actually care. Octopus carpaccio, tiger shrimp risotto, Argentine steak, every plate feels thought out. Real restaurant, not a snack counter. Closed Tuesdays. If Tuesday is your day: The Door (Rua das Taipas, nearby, 4.8 stars, small fusion menu) or Cozinha dos Lóios (Rua dos Caldeireiros, mid-route, octopus and meat, always open). On the way back, pastéis de nata at Manteigaria. Then 15 min home. Nap.",
          meta: "Craft, not casual",
        },
      },
    },
    evening1: {
      navLabel: "Evening",
      title: "Evening — Matosinhos: Beach & Fish",
      intro:
        "A fixed plan for tonight, not a menu of options — you're freshest on evening one, so this is the night for the extra trip out to the coast.",
      tip: "GO EARLY — BEFORE THE LAGE SENHOR DO PADRÃO QUEUE FORMS · CLOSED MON & SUN",
      stops: {
        "e1-metro": {
          title: "Metro to Matosinhos",
          tag: "Blue Line (A)",
          body: "Blue Line (A) from Trindade or Bolhão, direction Senhora da Hora, change if needed to reach Matosinhos Sul — about 25 minutes door to door. Leave with enough daylight left for the beach.",
          meta: "~25 min from the flat via metro",
        },
        "e1-beach": {
          title: "Beach walk at sunset",
          tag: "Praia de Matosinhos",
          body: "Praia de Matosinhos — wide Atlantic beach, surfers, none of the Ribeira crowds. Walk the boardwalk toward the lighthouse as the light turns gold.",
          meta: "Right by the metro stop",
        },
        "e1-dinner": {
          title: "Dinner",
          tag: "Restaurante Lage Senhor do Padrão",
          body: "Grilled fish and seafood done properly — 4.7 stars from over 6,000 reviews, huge portions, around €11 a dish. No reservations, so arrive before 7pm or expect a wait. Grilled octopus salad and the seafood rice are the standouts.",
          meta: "10 min walk from the beach · Locals, not tourists",
        },
        "e1-gelado": {
          title: "Gelado, then metro home",
          tag: "Close the night",
          body: "A scoop somewhere nearby to close the night, then the metro back to Bolhão — about 25 minutes, straight to the door.",
          meta: "Metro back to the flat",
        },
      },
    },
    morning2: {
      navLabel: "Morning",
      title: "Morning — River & Gaia",
      intro:
        "Market right outside your door, then over the bridge: the view from above first, the wine from below second. Lunch at the water in Gaia before heading home.",
      tip: "BOOK THE TASTING SLOT FOR THE MORNING · CABLE CAR OR ON FOOT — BOTH WORK",
      stops: {
        "m2-breakfast": {
          title: "Breakfast — the start",
          tag: "Breakfast Lovers Bolhão",
          body: "Five minutes from the flat on Rua da Alegria 87 — a small, carefully run breakfast spot with mini portions so you can try a bit of everything, open from 8am. If you'd rather just grab coffee and eat at the market: My Coffee Porto at Bolhão (Fernandes Tomás 646) is right on the way.",
          meta: "5 min from the flat, the market is around the corner",
        },
        "m2-bolhao": {
          title: "Mercado do Bolhão",
          tag: "Nice, not famous",
          body: "Your closest neighbor. Go early — fish, cheese, fruit, a glass of wine for €3 at the fish stalls. After breakfast this is just for browsing and tasting. Closed Sundays.",
          meta: "5 min from the flat · Ingredients & provenance",
        },
        "m2-bridge": {
          title: "Upper bridge deck → Jardim do Morro + Serra do Pilar",
          tag: "Essential Porto",
          body: "This time the upper deck of the Dom Luís I bridge — on foot, the whole city beneath you. On the other side, immediately left, the Jardim do Morro and above it the Serra do Pilar monastery: the postcard view of Porto that's on every cover. Nearly empty in the morning.",
          meta: "20 min from Bolhão — or 2 metro stops to Jardim do Morro",
        },
        "m2-lodges": {
          title: "Down to the lodges: small Quinta + WOW",
          tag: "Craft over mass-market",
          body: "Cable car or on foot down to the Gaia riverfront. Tasting at a smaller, family-run lodge instead of Graham's/Taylor's tour-group pace — a small group, time for real questions about aging and vintages. Afterward, a short wander through the WOW district: restored wine warehouses, courtyards, the view back at the old town.",
          meta: "Cable car 5 min or 10 min walk downhill",
        },
        "m2-lunch": {
          title: "Lunch",
          tag: "Dragon Palace",
          body: "Right on the Cais de Gaia, a few minutes from the lodges — all-you-can-eat sushi with one of the best views in the city, straight across at the Ribeira. Good food, but arrive early or expect a line; ordering is via tablet at the table.",
          meta: "3 min from the lodges, on the Gaia waterfront · Great view, real food",
        },
        "m2-guindalense": {
          title: "Guindalense — beer under the bridge, then home",
          tag: "Locals, not tourists",
          body: "Back over the lower deck, and right at the foot of the bridge on the Porto side: the kiosk of football club Guindalense. Cheapest beer in the city, best view, locals only — a short stop before the walk home. Then 15–20 min back to the flat. Nap.",
          meta: "On the way back over the bridge",
        },
      },
    },
    evening2: {
      navLabel: "Evening",
      title: "Evening — Rodízio & jazz on the Douro",
      intro:
        "A fixed plan: Brazilian rodízio at Fogo de Chão (Norte Shopping), back toward the flat, a short Douro pause at Passeio das Virtudes, then Mirajazz rooftop to close.",
      tip: "BOOK FOGO · QUICK-CHECK MIRAJAZZ LIVE SET",
      stops: {
        "e2-metro": {
          title: "Metro to Norte Shopping",
          tag: "From Bolhão",
          body: "From Bolhão or Trindade toward Senhora da Hora to NorteShopping / Sete Bicas — about 15 minutes. Skip Mar Shopping: it's farther out and makes the night unnecessarily long.",
          meta: "~15 min metro from the flat",
        },
        "e2-fogo": {
          title: "Dinner — Fogo de Chão",
          tag: "Norte Shopping",
          body: "Brazilian rodízio: meat from the spit, salad bar, no decision fatigue. The Norte Shopping branch is the right one — next to the metro, easy ride back into town. Book ahead.",
          meta: "Right at the mall · book ahead",
        },
        "e2-virtudes": {
          title: "Passeio das Virtudes",
          tag: "Short Douro stop",
          body: "Metro back to Bolhão, then 15–20 min downhill into Miragaia. Pause at Jardim / Passeio das Virtudes — evening light on the Douro, locals, no extra programme. Optional next door: Miradouro da Vitória.",
          meta: "On the way to Mirajazz",
        },
        "e2-mirajazz": {
          title: "Mirajazz",
          tag: "Rooftop · jazz",
          body: "Escadas do Caminho Novo 11 — rooftop over the Douro, jazz, Portuguese wines and petiscos. The right close after rodízio: no second dinner, no bar crawl. Check live set and hours; often closes early.",
          meta: "A few minutes from Virtudes · then home",
        },
      },
    },
  },
};
