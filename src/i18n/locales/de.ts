import type { Dictionary } from "../types";

export const de: Dictionary = {
  meta: {
    title: "Andrade-Schade in Porto",
    description: "Andrade-Schade in Porto — zwei Vormittage am Douro.",
  },
  hero: {
    overline: "Zwei Vormittage am Douro",
    city: "Andrade-Schade",
    subtitle: "in Porto",
    intro:
      "Keine Themen, nur Geografie. Jeder Vormittag ist eine einzige Schleife von der Wohnung bis zum Mittagessen — dann Siesta. Jeder Abend hat ebenfalls einen festen Plan, damit ihr immer wisst, wohin es geht.",
    baseLabel:
      "BASE · Rua do Dr. Ricardo Jorge 96 — 5 Min. zu Fuß vom Bolhão",
    startCta: "Tag 1 öffnen →",
    closing:
      "Zwei Tage, feste Pläne — Vormittag, Siesta, Abend.",
    weekdayNote:
      "Wochentags-Check: Bolhão sonntags zu, Feira da Vandoma nur samstags 8–13 Uhr, Mercado Porto Belo nur samstags, Lage Senhor do Padrão montags und sonntags zu. Fogo reservieren; Mirajazz-Zeiten checken. Falls ein Tag auf Sonntag fällt: umplanen.",
    signOff: "Bom porto.",
  },
  ui: {
    endTour: "Tour beenden",
    backHome: "← Zur Hauptseite",
    dayOf: "Tag {n}",
    openDay: "Tag öffnen →",
    morningSlot: "Vormittag",
    eveningSlot: "Abend",
    doneCount: "{done}/{total} erledigt",
    pickFreely: "Frei wählen · Stop antippen",
    stopsTap: "{count} Stops · antippen zum Öffnen",
    backToList: "← Zurück zur Liste",
    stopOf: "Stop {current} von {total}",
    done: "erledigt",
    openMaps: "In Google Maps öffnen",
    openMapsShort: "Maps öffnen",
    walkingRoute: "Fußweg",
    doneNext: "Erledigt → weiter",
    markDone: "Als erledigt markieren",
    undoDone: "Erledigt rückgängig",
    nextStop: "Nächster Stop →",
    myLocation: "Mein Standort",
    myLocationShort: "Standort",
    locating: "Orte…",
    geoUnsupported: "Standort nicht unterstützt",
    geoDenied: "Standort verweigert",
    geoFailed: "Standort fehlgeschlagen",
    tourInMaps: "Tour in Google Maps",
    tourInMapsShort: "Tour → Maps",
    completeTour: "Gesamte Tour ({count} Stops)",
    completeTourShort: "Gesamt ({count})",
    stage: "Etappe {index} · Stops {from}–{to}",
    stageShort: "Etappe {index}",
    langLabel: "Sprache",
    storyLabel: "Die Geschichte",
  },
  days: {
    "1": {
      navLabel: "Tag 1",
      title: "Tag 1 — Altstadt & Matosinhos",
      blurb:
        "Vormittag: eine Schleife durch die Altstadt bis zum Mittagessen. Abend: Strand und Fisch in Matosinhos.",
    },
    "2": {
      navLabel: "Tag 2",
      title: "Tag 2 — Gaia & Rodízio",
      blurb:
        "Vormittag: Bolhão, Brücke und Portwein in Gaia. Abend: Fogo de Chão, Virtudes, Mirajazz.",
    },
  },
  sections: {
    morning1: {
      navLabel: "Vormittag 1",
      title: "Vormittag — Altstadt-Kern",
      intro:
        "Eine Linie, kein Zurücklaufen: von der Wohnung die Santa Catarina hinunter, vorbei an der Sé und versteckten Aussichten zum Fluss, durch die vergoldete Kirche und die Rua das Flores hoch zu Lello. Endet beim Mittagessen.",
      tip: "LELLO FÜR DEN SPÄTESTEN VORMITTAGS-SLOT BUCHEN · ~4,5 KM",
      stops: {
        "m1-breakfast": {
          title: "Frühstück — der Start",
          tag: "the grow",
          body: "Drei Minuten von der Wohnung, in einer ruhigen Seitenstraße (Travessa de Alferes Malheiro 83) — kleiner Innenhof, großzügige Frühstücksteller, richtig guter Cappuccino, keine Foto-Schlange. Ab 8:30 Uhr. Alternative direkt auf dem Weg: Eatery 119 (Rua de Rodrigues Sampaio, ab 9 Uhr) mit exzellenten türkischen Eiern.",
          meta: "3 Min. von der Wohnung — dann geradewegs in die Santa Catarina",
        },
        "m1-santa-catarina": {
          title:
            "Rua de Santa Catarina: Pérola do Bolhão, Majestic, Santo Ildefonso, Capela das Almas",
          tag: "Schön, nicht berühmt",
          body: "Eure eigene Straße hat schon vier Stops: A Pérola do Bolhão, der 100 Jahre alte Feinkostladen mit Jugendstil-Fassade, Sardinen und Stockfisch im Schaufenster. Das Majestic Café — Belle Époque, ein Blick durch die Tür kostet nichts. Weiter unten die Azulejo-Fassaden von Santo Ildefonso und der Capela das Almas. Alles innerhalb von 800 Metern bergab.",
          meta: "Direkt von der Wohnung, alles auf dem Weg",
        },
        "m1-sao-bento": {
          title: "São Bento über die Aliados → Sé → Largo da Pena Ventosa",
          tag: "Essenzielles Porto",
          body: "Von der Capela das Almas auf die Avenida dos Aliados — Portos große Boulevard-Achse mit dem Rathaus am Kopf, ein gerader Weg hinunter, null Umweg. Unten die Bahnhofshalle São Bento mit 20.000 Azulejo-Kacheln, dann hoch zur Kathedrale für den ersten Blick über die Dächer — und direkt dahinter der Largo da Pena Ventosa, einer der ältesten Plätze der Stadt, kaum besucht. Der erste versteckte Moment des Tages.",
          meta: "5 Min. von der Capela das Almas, Aliados liegt auf dem Weg",
        },
        "m1-miradouro": {
          title: "Miradouro da Rua das Aldas → Ribeira → Brücke",
          tag: "Abseits der Route",
          body: "Auf dem Weg von der Sé hinunter der winzige, fast unbekannte Aussichtspunkt an der Rua das Aldas — Dächer bis zum Fluss, meist ganz für euch. Dann durch die Gassen zur Ribeira und kurz auf das untere Brückendeck für den Blick nach Gaia. Das ist morgiges Terrain — heute nur ein Blick.",
          meta: "8 Min. bergab",
        },
        "m1-sao-francisco": {
          title: "Igreja de São Francisco + Katakomben",
          tag: "Nicht verhandelbar",
          body: "Die vergoldete Kirche: das gesamte Innere mit Blattgold-Holzschnitzerei — und in der Krypta die Katakomben mit einem Beinhaus unter Glasboden. Der dunkelste und beste Krimi-Stop der Stadt, direkt an der Ribeira. Der Palácio da Bolsa mit dem Arabischen Saal liegt nebenan, falls ihr die 45-Minuten-Tour wollt.",
          meta: "3 Min. vom Flussufer",
        },
        "m1-lello": {
          title: "Rua das Flores → Livraria Lello + Manifesto Library + Carmo",
          tag: "Für euch beide",
          body: "Die Rua das Flores führt bergauf vorbei an Keramik-, Papier- und Werkstätten. Oben Lello — und im neuen Siza-Auditorium die Manifesto Library: Dua Lipas Service95-Buchclub zeigt dauerhaft 100 verbotene und zensierte Bücher (Power, Control, Voice, Memory). Tickets online im Voraus; die Gebühr wird auf einen Buchkauf angerechnet. Daneben die Azulejo-Fassade der Igreja do Carmo. Samstags 3 Min. weiter: Mercado Porto Belo, ein kleiner Vintage-, Vinyl- und Büchermarkt auf dem Praça Carlos Alberto.",
          meta: "Flores beginnt am Fluss, Lello ist 6 Min. weiter",
        },
        "m1-lunch": {
          title: "Mittagessen — dann Feierabend",
          tag: "Jardim do Trás",
          body: "Drei Minuten von Lello, versteckt in einer Gasse an der Rua de Trás 224 — winziges Lokal, zwei Leute, die es ernst meinen. Tintenfisch-Carpaccio, Tiger-Garnelen-Risotto, argentinisches Steak, jeder Teller durchdacht. Echtes Restaurant, kein Snack-Counter. Dienstags zu. Falls Dienstag: The Door (Rua das Taipas, in der Nähe, 4,8 Sterne, kleines Fusion-Menü) oder Cozinha dos Lóios (Rua dos Caldeireiros, mittendrin, Tintenfisch und Fleisch, immer offen). Auf dem Rückweg Pastéis de Nata bei Manteigaria. Dann 15 Min. nach Hause. Siesta.",
          meta: "Handwerk, nicht beiläufig",
        },
      },
    },
    evening1: {
      navLabel: "Abend 1",
      title: "Abend 1 — Matosinhos: Strand & Fisch",
      intro:
        "Ein fester Plan für heute Abend, kein Optionsmenü — am ersten Abend seid ihr am frischesten, also ist das der Abend für den Extra-Trip an die Küste.",
      tip: "FRÜH LOS — BEVOR SICH DIE SCHLANGE BEI LAGE SENHOR DO PADRÃO BILDET · MO & SO GESCHLOSSEN",
      stops: {
        "e1-metro": {
          title: "Metro nach Matosinhos",
          tag: "Blaue Linie (A)",
          body: "Blaue Linie (A) ab Trindade oder Bolhão, Richtung Senhora da Hora, ggf. umsteigen bis Matosinhos Sul — ca. 25 Minuten Tür zu Tür. Mit genug Tageslicht für den Strand losfahren.",
          meta: "~25 Min. von der Wohnung mit der Metro",
        },
        "e1-beach": {
          title: "Strandspaziergang bei Sonnenuntergang",
          tag: "Praia de Matosinhos",
          body: "Praia de Matosinhos — breiter Atlantikstrand, Surfer, keine Ribeira-Mengen. Den Boardwalk Richtung Leuchtturm entlang, während das Licht goldgelb wird.",
          meta: "Direkt an der Metro-Station",
        },
        "e1-dinner": {
          title: "Abendessen",
          tag: "Restaurante Lage Senhor do Padrão",
          body: "Gegrillter Fisch und Meeresfrüchte richtig gemacht — 4,7 Sterne aus über 6.000 Bewertungen, riesige Portionen, ca. €11 pro Gericht. Keine Reservierung, also vor 19 Uhr da sein oder warten. Gegrillter Oktopus-Salat und der Meeresfrüchte-Reis sind die Highlights.",
          meta: "10 Min. Fußweg vom Strand · Locals, keine Touristen",
        },
        "e1-gelado": {
          title: "Eis, dann Metro nach Hause",
          tag: "Den Abend schließen",
          body: "Eine Kugel in der Nähe zum Abschluss, dann Metro zurück zum Bolhão — ca. 25 Minuten, direkt vor die Tür.",
          meta: "Metro zurück zur Wohnung",
        },
      },
    },
    morning2: {
      navLabel: "Vormittag 2",
      title: "Vormittag — Fluss & Gaia",
      intro:
        "Markt direkt vor der Tür, dann über die Brücke: zuerst die Aussicht von oben, dann der Wein von unten. Mittagessen am Wasser in Gaia, bevor es nach Hause geht.",
      tip: "VERKOSTUNGS-SLOT FÜR DEN VORMITTAG BUCHEN · SEILBAHN ODER ZU FUSS — BEIDES GEHT",
      stops: {
        "m2-breakfast": {
          title: "Frühstück — der Start",
          tag: "Breakfast Lovers Bolhão",
          body: "Fünf Minuten von der Wohnung an der Rua da Alegria 87 — kleines, sorgfältig geführtes Frühstückscafé mit Mini-Portionen zum Probieren, ab 8 Uhr. Lieber nur Kaffee und am Markt essen: My Coffee Porto am Bolhão (Fernandes Tomás 646) liegt auf dem Weg.",
          meta: "5 Min. von der Wohnung, der Markt ist um die Ecke",
        },
        "m2-bolhao": {
          title: "Mercado do Bolhão",
          tag: "Schön, nicht berühmt",
          body: "Euer nächster Nachbar. Früh hin — Fisch, Käse, Obst, ein Glas Wein für €3 an den Fischständen. Nach dem Frühstück nur zum Stöbern und Probieren. Sonntags zu.",
          meta: "5 Min. von der Wohnung · Zutaten & Herkunft",
        },
        "m2-bridge": {
          title: "Oberes Brückendeck → Jardim do Morro + Serra do Pilar",
          tag: "Essenzielles Porto",
          body: "Diesmal das obere Deck der Dom-Luís-I-Brücke — zu Fuß, die ganze Stadt unter euch. Auf der anderen Seite sofort links: Jardim do Morro und darüber das Kloster Serra do Pilar — die Postkartenansicht Portos. Morgens fast leer.",
          meta: "20 Min. vom Bolhão — oder 2 Metro-Stops zum Jardim do Morro",
        },
        "m2-lodges": {
          title: "Runter zu den Lodges: kleine Quinta + WOW",
          tag: "Handwerk statt Massenware",
          body: "Seilbahn oder zu Fuß runter zum Gaia-Ufer. Verkostung in einer kleineren, familiengeführten Lodge statt Graham’s/Taylor’s Touristen-Tempo — kleine Gruppe, Zeit für echte Fragen zu Alterung und Jahrgängen. Danach kurz durch den WOW-Bezirk: restaurierte Weinkeller, Höfe, Blick zurück auf die Altstadt.",
          meta: "Seilbahn 5 Min. oder 10 Min. zu Fuß bergab",
        },
        "m2-lunch": {
          title: "Mittagessen — dann Feierabend",
          tag: "Dragon Palace",
          body: "Direkt am Cais de Gaia, wenige Minuten von den Lodges — All-you-can-eat-Sushi mit einer der besten Aussichten der Stadt, geradeaus auf die Ribeira. Gutes Essen, aber früh kommen oder Schlange erwarten; Bestellung per Tablet am Tisch.",
          meta: "3 Min. von den Lodges, am Gaia-Ufer · Tolle Aussicht, echtes Essen",
        },
        "m2-guindalense": {
          title: "Guindalense — Bier unter der Brücke, dann heim",
          tag: "Locals, keine Touristen",
          body: "Zurück über das untere Deck, und direkt am Brückenfuß auf der Porto-Seite: der Kiosk des Fußballclubs Guindalense. Billigstes Bier der Stadt, beste Aussicht, nur Locals — kurzer Stop vor dem Heimweg. Dann 15–20 Min. zur Wohnung. Siesta.",
          meta: "Auf dem Rückweg über die Brücke",
        },
        "m2-vandoma": {
          title: "Falls Samstag: Feira da Vandoma",
          tag: "Antiquarisches Flair",
          body: "Portos Flohmarkt — alte Bücher, Münzen, das Sortiment, das ein Krimi-Antiquar verkaufen würde. Nur samstags, 8–13 Uhr, etwas abseits (Metro über Campanhã). Falls euer Tag darauf fällt: an den Anfang und die Verkostung später.",
          meta: "Samstags 8–13 Uhr",
        },
      },
    },
    evening2: {
      navLabel: "Abend 2",
      title: "Abend 2 — Rodízio & Jazz am Douro",
      intro:
        "Fester Plan: brasilianisches Rodízio bei Fogo de Chão (Norte Shopping), zurück Richtung Wohnung, kurz Douro-Licht am Passeio das Virtudes, Abschluss auf dem Mirajazz-Rooftop.",
      tip: "FOGO RESERVIEREN · MIRAJAZZ LIVE-SET KURZ CHECKEN",
      stops: {
        "e2-metro": {
          title: "Metro zum Norte Shopping",
          tag: "Ab Bolhão",
          body: "Ab Bolhão oder Trindade Richtung Senhora da Hora bis NorteShopping / Sete Bicas — ca. 15 Minuten. Nicht Mar Shopping: das ist weiter draußen und macht den Abend unnötig lang.",
          meta: "~15 Min. Metro von der Wohnung",
        },
        "e2-fogo": {
          title: "Abendessen — Fogo de Chão",
          tag: "Norte Shopping",
          body: "Brasilianisches Rodízio: Fleisch vom Spieß, Salatbar, kein Optionsmenü. Die Filiale im Norte Shopping ist die richtige für euch — nah an der Metro, einfacher Rückweg in die Stadt. Vorher reservieren.",
          meta: "Direkt am Shopping · vorher reservieren",
        },
        "e2-virtudes": {
          title: "Passeio das Virtudes",
          tag: "Kurzer Douro-Stop",
          body: "Metro zurück nach Bolhão, dann 15–20 Min. bergab nach Miragaia. Am Jardim / Passeio das Virtudes kurz stehen bleiben — Abendlicht über dem Douro, Locals, kein Extra-Programm. Optional daneben: Miradouro da Vitória.",
          meta: "Auf dem Weg zum Mirajazz",
        },
        "e2-mirajazz": {
          title: "Mirajazz",
          tag: "Rooftop · Jazz",
          body: "Escadas do Caminho Novo 11 — Rooftop mit Douro-Blick, Jazz, portugiesische Weine und Petiscos. Der richtige Abschluss nach dem Rodízio: kein zweites Dinner, kein Bar-Crawl. Live-Set und Öffnungszeiten kurz checken; oft früh zu.",
          meta: "Wenige Minuten von Virtudes · dann heim zur Wohnung",
        },
      },
    },
  },
};
