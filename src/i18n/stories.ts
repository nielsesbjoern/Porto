import type { Locale } from "./types";

/** Short history / backstory under every stop */
export const stories: Record<Locale, Record<string, string>> = {
  en: {
    "m1-breakfast":
      "Porto's breakfast culture was never hotel buffets — it grew out of workers' cafés near the markets, where bakers opened early for fishermen and shopkeepers. Side-street spots like this still keep that habit: quiet courtyards, serious coffee, no performance.",
    "m1-santa-catarina":
      "Rua de Santa Catarina became Porto's shopping artery in the late 1800s. Capela das Almas got its famous blue azulejos in 1929, covering an older chapel; Majestic opened in 1921 as a Belle Époque salon for writers and flâneurs. Pérola do Bolhão has been selling bacalhau and spices under that Art Nouveau facade for over a century.",
    "m1-sao-bento":
      "São Bento station opened in 1916 on the site of a Benedictine monastery. Jorge Colaço spent years painting the azulejo panels: battles, rural life, the arrival of the railway. The Sé above it is Romanesque at heart — Porto's cathedral since the 12th century — while Largo da Pena Ventosa is one of the city's oldest surviving squares, still barely on the postcard route.",
    "m1-miradouro":
      "Ribeira was Porto's working riverfront for centuries — salt cod, wine barrels, sailors. The Dom Luís I bridge (1886), designed by a disciple of Eiffel, stacked two decks so rail and road could cross the Douro without killing the port traffic below. Rua das Aldas stayed a local secret: rooftops first, tourists later.",
    "m1-sao-francisco":
      "The Gothic church of São Francisco was stripped and gilded in the 17th–18th centuries until almost every surface shone — so much gold that 19th-century liberals mocked it as decadent. Beneath it, the catacombs hold Franciscan brothers; the glass floor over the ossuary is a later, darker twist on that burial tradition. Next door, the Palácio da Bolsa (1842) was the merchants' palace of a city built on trade.",
    "m1-lello":
      "Livraria Lello opened in 1906 in a neo-Gothic jewel box of wood and stained glass — later mythologized as a Harry Potter inspiration, which both saved and overcrowded it. Rua das Flores was once the florists' and artisans' street climbing from the river. Igreja do Carmo (1768) wears one of Porto's great azulejo side walls; the Manifesto Library's banned-book wall is a new chapter in the same building's story about what gets said and what gets silenced.",
    "m1-lunch":
      "The lanes behind Clérigos and Flores were always where locals ate when tourists stayed on the riverfront. Small rooms, handwritten menus, octopus and rice — the Porto lunch that ends a morning loop. Pastéis de nata arrived from Lisbon's convent kitchens, but Manteigaria made the habit local: sugar, cinnamon, then home for a nap.",
    "e1-metro":
      "Porto's metro is young by European standards (2002), but Line A follows the logic of an older city: connect the granite centre to the fishing coast. Matosinhos was never a suburb invented for tourists — it was where the catch came in, and the metro simply made the old coastal dinner possible without a car.",
    "e1-beach":
      "Matosinhos beach faces the open Atlantic, not the sheltered Douro. For decades it was the city's working seaside: canneries, shipyards, surfers who arrived before the boardwalk cafés. Sunset here is the same light that once guided fishing boats home — gold on wet sand, wind off the ocean.",
    "e1-dinner":
      "Grilled fish is Matosinhos religion. Places like Lage Senhor do Padrão grew from the simple logic of the port: buy what landed that morning, cook it over coals, serve huge portions to people who work nearby. No white tablecloth theatre — just smoke, lemon, and a queue that forms because the food is right.",
    "e1-gelado":
      "Closing a Portuguese night with ice cream is a quiet ritual — something cold after salt and grill, then the metro humming back under the city. Bolhão at that hour feels like the neighbourhood again, not a destination.",
    "m2-breakfast":
      "Bolhão mornings start with the market's rhythm: shutters up, fish on ice, coffee before bargaining. Breakfast spots around Rua da Alegria exist for that early crowd — people who want eggs and juice before the tiles and tour groups wake up.",
    "m2-bolhao":
      "Mercado do Bolhão opened in 1914 as Porto's central food market, a Beaux-Arts iron-and-stone hall where the city's kitchen still shops. After years of renovation it returned as both market and monument: the same fishwives' calls, the same €3 wine at the stall, now under cleaner glass.",
    "m2-bridge":
      "Crossing Dom Luís I on the upper deck is the postcard Porto invented for itself. Jardim do Morro and Serra do Pilar sit on the Gaia cliff that once watched over the river trade; the monastery’s circular cloister and the viewpoint below it are why every album cover looks the same — and why mornings here still feel empty.",
    "m2-lodges":
      "Port wine was aged in Vila Nova de Gaia because the cooler, more humid caves across the river kept the barrels happier than Porto's side. British and Portuguese houses built empires of lodges along the waterfront; WOW occupies restored warehouses from that world. Choosing a small quinta tasting is a way back to the craft behind the big names.",
    "m2-lunch":
      "Cais de Gaia used to be barrels and rabelo boats. Today the same quay holds restaurants facing the Ribeira skyline — a view merchants once measured in shipments, now measured in lunch. Sushi with that backdrop is a modern Porto joke that somehow works.",
    "m2-guindalense":
      "Guindalense is a neighbourhood football club whose kiosk under the bridge became a local legend: cheap beer, river wind, zero polish. It sits where Porto's working waterfront meets the postcard — the best seat in the city if you don't need a menu in four languages.",
    "e2-metro":
      "Norte Shopping sits on the metro line that stitches Porto's granite centre to the northern suburbs — a shopping mall as transfer point, not a destination. From Bolhão it's a short ride that locals use for errands; tonight it's the cleanest path to Brazilian fire.",
    "e2-fogo":
      "Fogo de Chão is Brazilian churrasco transplanted to Portugal: meat on skewers, rodízio rhythm, salad bar as ritual. The Norte Shopping branch keeps you on the metro axis back to Bolhão — dinner as spectacle without stranding you at Mar Shopping.",
    "e2-virtudes":
      "Passeio and Jardim das Virtudes open the Miragaia cliff to the Douro — evening light painters chased before the kiosk beer. A pause, not a programme: roofs, river haze, then a few steps to the jazz rooftop.",
    "e2-mirajazz":
      "Mirajazz grew out of Grupo Musical de Miragaia — jazz and bossa on a terrace above the Escadas do Caminho Novo. Wine, petiscos, Douro below: Porto's softest late-night flex after a heavy dinner.",
  },
  de: {
    "m1-breakfast":
      "Portos Frühstückskultur kam nie aus Hotelbuffets — sie wuchs aus Arbeitercafés an den Märkten, wo Bäcker früh für Fischer und Ladenbesitzer öffneten. Seitengassen-Spots wie dieser halten den Habitus: stille Höfe, ernster Kaffee, keine Show.",
    "m1-santa-catarina":
      "Die Rua de Santa Catarina wurde Ende des 19. Jahrhunderts zur Einkaufsachse Portos. Die Capela das Almas bekam 1929 ihre berühmten blauen Azulejos über einer älteren Kapelle; das Majestic öffnete 1921 als Belle-Époque-Salon für Literaten. Die Pérola do Bolhão verkauft seit über hundert Jahren Stockfisch und Gewürze hinter der Jugendstilfassade.",
    "m1-sao-bento":
      "Der Bahnhof São Bento öffnete 1916 an der Stelle eines Benediktinerklosters. Jorge Colaço malte jahrelang die Azulejo-Paneele: Schlachten, Landleben, die Ankunft der Eisenbahn. Die Sé darüber ist im Kern romanisch — Kathedrale seit dem 12. Jahrhundert — und der Largo da Pena Ventosa einer der ältesten Plätze, immer noch kaum auf der Postkarte.",
    "m1-miradouro":
      "Die Ribeira war jahrhundertelang Portos Arbeitsufer — Stockfisch, Weinfässer, Seeleute. Die Dom-Luís-I-Brücke (1886), von einem Eiffel-Schüler, stapelte zwei Decks, damit Bahn und Straße den Douro queren konnten. Die Rua das Aldas blieb lokal: erst Dächer, dann Touristen.",
    "m1-sao-francisco":
      "Die gotische Kirche São Francisco wurde im 17.–18. Jahrhundert so stark vergoldet, dass Liberale sie später als dekadent verspotteten. Darunter liegen Franziskaner in den Katakomben; der Glasboden über dem Beinhaus ist die dunklere Pointe. Daneben steht der Palácio da Bolsa (1842), der Kaufmannspalast einer Handelsstadt.",
    "m1-lello":
      "Die Livraria Lello öffnete 1906 als neo-gotisches Schmuckkästchen — später als Harry-Potter-Inspiration mythologisiert, was sie rettete und überfüllte. Die Rua das Flores war die Straße der Blumenhändler und Handwerker vom Fluss hinauf. Die Igreja do Carmo (1768) trägt eine der großen Azulejo-Wände; die Manifesto Library schreibt im selben Haus die Geschichte weiter, was gesagt und was zensiert wird.",
    "m1-lunch":
      "Die Gassen hinter Clérigos und Flores waren immer dort, wo Locals aßen, während Touristen am Ufer blieben. Kleine Räume, Oktopus und Reis — das Porto-Mittagessen am Ende einer Vormittagsschleife. Pastéis de nata kamen aus Lissabonner Klosterküchen; Manteigaria machte die Gewohnheit lokal: Zucker, Zimt, dann heim zur Siesta.",
    "e1-metro":
      "Portos Metro ist jung (2002), aber Linie A folgt alter Logik: Granitzentrum an die Fischerküste anbinden. Matosinhos war nie nur Vorort — hier kam der Fang an. Die Metro macht das alte Küstenabendessen ohne Auto möglich.",
    "e1-beach":
      "Der Strand von Matosinhos zeigt zum offenen Atlantik, nicht zum geschützten Douro. Jahrzehntelang Arbeitsküste: Konservenfabriken, Werften, Surfer vor den Cafés. Sonnenuntergang hier ist dasselbe Licht, das einst Fischerboote heimbrachte.",
    "e1-dinner":
      "Gegrillter Fisch ist Religion in Matosinhos. Lokale wie Lage Senhor do Padrão folgen der Hafenlogik: morgens gekauft, über Glut gegrillt, riesige Portionen. Kein Tischdecken-Theater — Rauch, Zitrone, Schlange, weil es stimmt.",
    "e1-gelado":
      "Eine portugiesische Nacht mit Eis zu schließen ist ein stilles Ritual — etwas Kaltes nach Salz und Grill, dann die Metro zurück. Bolhão um die Stunde fühlt sich wieder nach Viertel an, nicht nach Destination.",
    "m2-breakfast":
      "Bolhão-Morgen folgen dem Marktrhythmus: Rollläden hoch, Fisch auf Eis, Kaffee vor dem Feilschen. Frühstück an der Rua da Alegria gibt es für genau diese Frühen.",
    "m2-bolhao":
      "Der Mercado do Bolhão öffnete 1914 als zentraler Lebensmittelmarkt — Eisen, Stein, Portos Küche. Nach der Sanierung ist er Denkmal und Markt zugleich: dieselben Rufe, derselbe Wein für €3 am Stand.",
    "m2-bridge":
      "Das obere Deck der Dom-Luís-I-Brücke ist die Postkarte, die Porto für sich erfand. Jardim do Morro und Serra do Pilar sitzen auf dem Gaia-Felsen über dem alten Flusshandel — deshalb sehen alle Cover gleich aus, und deshalb ist es morgens noch leer.",
    "m2-lodges":
      "Portwein reifte in Vila Nova de Gaia, weil die kühleren Lodges jenseits des Flusses besser waren. Britische und portugiesische Häuser bauten Imperien am Ufer; WOW nutzt restaurierte Lager. Eine kleine Quinta-Verkostung führt hinter die großen Namen zurück zum Handwerk.",
    "m2-lunch":
      "Der Cais de Gaia war Fässer und Rabelo-Boote. Heute stehen Restaurants mit Blick auf die Ribeira — früher in Schiffsladungen gemessen, heute in Mittagessen. Sushi vor dieser Kulisse ist ein moderner Porto-Witz, der funktioniert.",
    "m2-guindalense":
      "Guindalense ist ein Viertelverein, dessen Kiosk unter der Brücke Legende wurde: billiges Bier, Flusswind, null Politur. Bester Platz der Stadt, wenn du keine Speisekarte in vier Sprachen brauchst.",
    "e2-metro":
      "Das Norte Shopping sitzt an der Metro, die Portos Granitzentrum an die nördlichen Vororte bindet — Einkaufszentrum als Umstieg, nicht als Ziel. Vom Bolhão ist es eine kurze Fahrt; heute der sauberste Weg zum brasilianischen Grill.",
    "e2-fogo":
      "Fogo de Chão ist brasilianisches Churrasco in Portugal: Fleisch am Spieß, Rodízio-Rhythmus, Salatbar als Ritual. Die Filiale im Norte Shopping hält euch auf der Metro-Achse zurück zum Bolhão — Dinner als Spektakel, ohne euch am Mar Shopping zu stranden.",
    "e2-virtudes":
      "Passeio und Jardim das Virtudes öffnen die Miragaia-Klippe zum Douro — Abendlicht, das Maler jagten, lange vor dem Kiosk-Bier. Pause, kein Programm: Dächer, Flussschleier, dann wenige Schritte zum Jazz-Rooftop.",
    "e2-mirajazz":
      "Mirajazz kam aus dem Grupo Musical de Miragaia — Jazz und Bossa auf einer Terrasse über den Escadas do Caminho Novo. Wein, Petiscos, Douro unten: Portos weichster Spätabend nach einem schweren Dinner.",
  },
  pt: {
    "m1-breakfast":
      "O pequeno-almoço no Porto nunca foi buffet de hotel — nasceu dos cafés de trabalhadores junto aos mercados, onde os padeiros abriam cedo para pescadores e lojistas. Sítios em travessas como este mantêm o hábito: pátios quietos, café a sério, sem espetáculo.",
    "m1-santa-catarina":
      "A Rua de Santa Catarina tornou-se a artéria comercial do Porto no fim do século XIX. A Capela das Almas ganhou os azulejos azuis famosos em 1929; o Majestic abriu em 1921 como salão Belle Époque. A Pérola do Bolhão vende bacalhau e especiarias atrás da fachada Art Nouveau há mais de um século.",
    "m1-sao-bento":
      "A estação de São Bento abriu em 1916 no lugar de um mosteiro beneditino. Jorge Colaço passou anos a pintar os painéis de azulejo: batalhas, vida rural, a chegada do comboio. A Sé acima é românica no âmago — catedral desde o século XII — e o Largo da Pena Ventosa é uma das praças mais antigas, ainda quase fora do postal.",
    "m1-miradouro":
      "A Ribeira foi durante séculos a margem de trabalho do Porto — bacalhau, pipas, marinheiros. A ponte Dom Luís I (1886), de um discípulo de Eiffel, empilhou dois tabuleiros para o comboio e a estrada atravessarem o Douro. A Rua das Aldas ficou segredo local: primeiro telhados, depois turistas.",
    "m1-sao-francisco":
      "A igreja gótica de São Francisco foi dourada nos séculos XVII–XVIII até brilhar quase tudo — tanto ouro que liberais do século XIX a acusaram de decadência. Por baixo, as catacumbas guardam frades; o chão de vidro sobre o ossuário é o twist mais sombrio. Ao lado, o Palácio da Bolsa (1842) foi o palácio dos mercadores.",
    "m1-lello":
      "A Livraria Lello abriu em 1906 num estojo neogótico de madeira e vitrais — depois mitificada como inspiração de Harry Potter, o que a salvou e a encheu demais. A Rua das Flores foi a rua dos floristas e artesãos a subir do rio. A Igreja do Carmo (1768) tem uma das grandes paredes de azulejo; a Manifesto Library continua, no mesmo edifício, a história do que se diz e do que se cala.",
    "m1-lunch":
      "As ruelas atrás dos Clérigos e das Flores foram sempre onde os locais comiam enquanto os turistas ficavam na Ribeira. Salas pequenas, polvo e arroz — o almoço do Porto no fim de um circuito de manhã. Os pastéis de nata vieram dos conventos de Lisboa; a Manteigaria tornou o hábito local: açúcar, canela, depois casa e sesta.",
    "e1-metro":
      "O metro do Porto é jovem (2002), mas a Linha A segue uma lógica antiga: ligar o centro de granito à costa de pesca. Matosinhos nunca foi só subúrbio — era onde chegava o peixe. O metro tornou o jantar à beira-mar possível sem carro.",
    "e1-beach":
      "A praia de Matosinhos olha para o Atlântico aberto, não para o Douro abrigado. Durante décadas foi a costa de trabalho: conserveiras, estaleiros, surfistas antes dos cafés. O pôr do sol aqui é a mesma luz que guiava os barcos a casa.",
    "e1-dinner":
      "Peixe grelhado é religião em Matosinhos. Sítios como o Lage Senhor do Padrão nascem da lógica do porto: comprar o que chegou de manhã, grelhar, servir porções enormes. Sem teatro de toalha branca — fumo, limão e fila porque está certo.",
    "e1-gelado":
      "Fechar a noite portuguesa com gelado é um ritual quieto — algo frio depois do sal e da grelha, depois o metro de volta. O Bolhão a essa hora volta a ser bairro, não destino.",
    "m2-breakfast":
      "As manhãs do Bolhão seguem o ritmo do mercado: portas a abrir, peixe no gelo, café antes da pechincha. Os cafés da Rua da Alegria existem para essa hora cedo.",
    "m2-bolhao":
      "O Mercado do Bolhão abriu em 1914 como mercado central de alimentos — ferro, pedra, a cozinha da cidade. Depois da obra é monumento e mercado: os mesmos pregões, o mesmo vinho a €3 na banca.",
    "m2-bridge":
      "Atravessar a Dom Luís I no tabuleiro superior é o postal que o Porto inventou de si. O Jardim do Morro e a Serra do Pilar sentam-se no penhasco de Gaia sobre o antigo comércio fluvial — por isso todas as capas parecem iguais, e por isso de manhã ainda está vazio.",
    "m2-lodges":
      "O vinho do Porto envelhecia em Vila Nova de Gaia porque as caves mais frescas do outro lado do rio tratavam melhor as pipas. Casas britânicas e portuguesas construíram impérios de armazéns; o WOW ocupa esses edifícios. Uma prova numa quinta pequena volta ao ofício por trás dos grandes nomes.",
    "m2-lunch":
      "O Cais de Gaia foram pipas e rabelos. Hoje o mesmo cais tem restaurantes de frente para a Ribeira — vista que antes se media em cargas e agora se mede em almoços. Sushi com esse cenário é uma piada moderna do Porto que resulta.",
    "m2-guindalense":
      "O Guindalense é um clube de bairro cujo quiosque debaixo da ponte virou lenda: cerveja barata, vento do rio, zero verniz. O melhor lugar da cidade se não precisarem de ementa em quatro línguas.",
    "e2-metro":
      "O Norte Shopping assenta na linha de metro que liga o granito do centro aos subúrbios a norte — centro comercial como transferência, não destino. Do Bolhão é um salto curto; esta noite é o caminho limpo até ao fogo brasileiro.",
    "e2-fogo":
      "O Fogo de Chão é churrasco brasileiro em Portugal: carne no espeto, ritmo de rodízio, salad bar como ritual. A filial do Norte Shopping mantém-vos no eixo do metro de volta ao Bolhão — jantar-espetáculo sem ficar encalhados no Mar Shopping.",
    "e2-virtudes":
      "O Passeio e o Jardim das Virtudes abrem a falésia de Miragaia ao Douro — luz da noite que os pintores caçavam antes da cerveja do quiosque. Pausa, não programa: telhados, névoa do rio, depois poucos passos até ao rooftop de jazz.",
    "e2-mirajazz":
      "O Mirajazz nasceu do Grupo Musical de Miragaia — jazz e bossa num terraço sobre as Escadas do Caminho Novo. Vinho, petiscos, Douro em baixo: o fecho mais suave do Porto depois de um jantar pesado.",
  },
};
