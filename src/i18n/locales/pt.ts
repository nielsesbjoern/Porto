import type { Dictionary } from "../types";

export const pt: Dictionary = {
  meta: {
    title: "Andrade-Schade in Porto",
    description: "Andrade-Schade in Porto — duas manhãs no Douro.",
  },
  hero: {
    overline: "Duas manhãs no Douro",
    city: "Andrade-Schade",
    subtitle: "in Porto",
    intro:
      "Sem temas, só geografia. Cada manhã é um único circuito a partir do apartamento que termina no almoço — depois sesta. Cada noite também tem um plano fixo, para saberem sempre para onde vão.",
    baseLabel:
      "BASE · Rua do Dr. Ricardo Jorge 96 — 5 min a pé do Bolhão",
    startCta: "Abrir Segunda →",
    closing:
      "Dois dias, planos fixos — manhã, sesta, noite.",
    weekdayNote:
      "Verificação de dias: Bolhão fechado ao domingo, Mercado Porto Belo só aos sábados, Lage Senhor do Padrão fechado à segunda e ao domingo. Reservem o Fogo; confirmem o horário do Mirajazz. Se um dos dias cair a domingo, reorganizem.",
    signOff: "Bom porto.",
  },
  gate: {
    overline: "Para Miriam & Niels",
    title: "Desde quando estão Miriam e Niels juntos?",
    prompt: "Introduzam a data — depois abre o vosso plano do Porto.",
    day: "Dia",
    month: "Mês",
    year: "Ano",
    submit: "Entrar →",
    error: "Não é isso — tentem outra vez.",
  },
  ui: {
    endTour: "Terminar tour",
    backHome: "← Voltar ao início",
    dayOf: "Dia {n}",
    openDay: "Abrir dia →",
    morningSlot: "Manhã",
    eveningSlot: "Noite",
    doneCount: "{done}/{total} feitos",
    pickFreely: "Escolham à vontade · toquem num ponto",
    stopsTap: "{count} paragens · toquem para abrir",
    backToList: "← Voltar à lista",
    stopOf: "Paragem {current} de {total}",
    done: "feito",
    openMaps: "Abrir no Maps",
    openMapsShort: "Abrir Maps",
    walkingRoute: "Rota a pé",
    doneNext: "Feito → seguinte",
    markDone: "Marcar como feito",
    undoDone: "Desfazer feito",
    nextStop: "Paragem seguinte →",
    myLocation: "A minha localização",
    myLocationShort: "Localizar",
    locating: "A localizar…",
    geoUnsupported: "Geolocalização não suportada",
    geoDenied: "Localização recusada",
    geoFailed: "Localização falhou",
    tourInMaps: "Tour no Maps",
    tourInMapsShort: "Tour → Maps",
    completeTour: "Tour completa ({count} paragens)",
    completeTourShort: "Tudo ({count})",
    stage: "Etapa {index} · paragens {from}–{to}",
    stageShort: "Etapa {index}",
    langLabel: "Idioma",
    storyLabel: "A história",
    offlineMode: "Offline · roteiro e mapa em cache prontos",
    offlineInstalling: "A preparar modo offline…",
    offlinePrepare: "Guardar para offline (mapa + páginas)",
    offlinePreparing: "A guardar para offline…",
    offlineReady: "Guardado para offline ✓",
    iosAddHome:
      "Adicionar ao ecrã principal: Partilhar → “Adicionar ao ecrã principal” — depois o Porto funciona como uma app, também offline.",
    iosAddHomeDismiss: "Percebido",
  },
  days: {
    "1": {
      navLabel: "Segunda",
      title: "Segunda — Centro histórico & Matosinhos",
      blurb:
        "Manhã: um circuito pelo centro até ao almoço. Noite: praia e peixe em Matosinhos.",
    },
    "2": {
      navLabel: "Terça",
      title: "Terça — Gaia & rodízio",
      blurb:
        "Manhã: Bolhão, ponte e vinho do Porto em Gaia. Noite: Fogo de Chão, Virtudes, Mirajazz.",
    },
  },
  sections: {
    morning1: {
      navLabel: "Manhã",
      title: "Manhã — Centro histórico",
      intro:
        "Uma linha, sem voltar atrás: descer a Santa Catarina a partir do apartamento, passar pela Sé e miradouros escondidos até ao rio, pela igreja dourada e subir a Rua das Flores até à Lello. Termina no almoço.",
      tip: "RESERVE A LELLO PARA O ÚLTIMO HORÁRIO DA MANHÃ · ~4,5 KM",
      stops: {
        "m1-breakfast": {
          title: "Pequeno-almoço — o início",
          tag: "the grow",
          body: "Três minutos do apartamento, numa travessa sossegada (Travessa de Alferes Malheiro 83) — pequeno pátio, pratos generosos, cappuccino mesmo bom, sem fila para fotos. Abre às 8:30. Alternativa no caminho: Eatery 119 (Rua de Rodrigues Sampaio, a partir das 9h) com excelentes ovos turcos.",
          meta: "3 min do apartamento — depois direto para a Santa Catarina",
        },
        "m1-santa-catarina": {
          title:
            "Rua de Santa Catarina: Pérola do Bolhão, Majestic, Santo Ildefonso, Capela das Almas",
          tag: "Bonito, não famoso",
          body: "A vossa rua já tem quatro paragens: A Pérola do Bolhão, mercearia com 100 anos e fachada Art Nouveau, sardinhas e bacalhau na montra. O Café Majestic — Belle Époque, olhar pela porta não custa nada. Mais abaixo, as fachadas de azulejo de Santo Ildefonso e da Capela das Almas. Tudo em 800 metros a descer.",
          meta: "Direto do apartamento, tudo no caminho",
        },
        "m1-sao-bento": {
          title: "São Bento pelos Aliados → Sé → Largo da Pena Ventosa",
          tag: "Porto essencial",
          body: "Da Capela das Almas, virar para a Avenida dos Aliados — a grande avenida do Porto com a Câmara no topo, um caminho a direito, zero desvio. Em baixo, o átrio da estação de São Bento com 20.000 azulejos, depois subir à Sé para a primeira vista sobre os telhados — e logo atrás, o Largo da Pena Ventosa, uma das praças mais antigas, quase sem gente. O primeiro momento escondido do dia.",
          meta: "5 min da Capela das Almas, Aliados fica no caminho",
        },
        "m1-miradouro": {
          title: "Miradouro da Rua das Aldas → Ribeira → Ponte",
          tag: "Fora da rota",
          body: "A descer da Sé, o miradouro minúsculo e quase desconhecido na Rua das Aldas — telhados até ao rio, normalmente só para vocês. Depois pelas ruelas até à Ribeira e um momento no tabuleiro inferior da ponte com vista para Gaia. É território de amanhã — hoje só um olhar.",
          meta: "8 min a descer",
        },
        "m1-sao-francisco": {
          title: "Igreja de São Francisco + catacumbas",
          tag: "Inegociável",
          body: "A igreja dourada: o interior todo em talha dourada — e na cripta, as catacumbas com um ossuário sob o chão de vidro. A paragem mais sombria e melhor de romance policial da cidade, mesmo na Ribeira. O Palácio da Bolsa com o Salão Árabe fica ao lado se quiserem a visita de 45 minutos.",
          meta: "3 min da margem do rio",
        },
        "m1-lello": {
          title: "Rua das Flores → Livraria Lello + Manifesto Library + Carmo",
          tag: "Para vocês dois",
          body: "A Rua das Flores sobe por lojas de cerâmica, papel e oficinas. No topo, a Lello — e no novo auditório de Siza, a Manifesto Library: o clube Service95 da Dua Lipa mostra permanentemente 100 livros banidos e censurados (Power, Control, Voice, Memory). Comprem bilhetes online; a taxa desconta-se na compra de um livro. Ao lado, a fachada de azulejo da Igreja do Carmo. Aos sábados, 3 min mais: Mercado Porto Belo, mercado vintage, vinil e livros na Praça Carlos Alberto.",
          meta: "Flores começa na Ribeira, a Lello fica a 6 min",
        },
        "m1-lunch": {
          title: "Almoço",
          tag: "Jardim do Trás",
          body: "Três minutos da Lello, escondido numa travessa na Rua de Trás 224 — sítio pequenino gerido por duas pessoas que se importam de verdade. Carpaccio de polvo, risotto de camarão tigre, bife argentino, cada prato pensado. Restaurante a sério, não snack. Fecha à terça. Se for terça: The Door (Rua das Taipas, perto, 4,8 estrelas, menu fusion pequeno) ou Cozinha dos Lóios (Rua dos Caldeireiros, a meio do percurso, polvo e carne, sempre aberto). No regresso, pastéis de nata na Manteigaria. Depois 15 min até casa. Sesta.",
          meta: "Artesanal, não casual",
        },
      },
    },
    evening1: {
      navLabel: "Noite",
      title: "Noite — Matosinhos: Praia & Peixe",
      intro:
        "Um plano fixo para esta noite, não um menu de opções — na primeira noite estão mais frescos, por isso é a noite da viagem extra até à costa.",
      tip: "SAIAM CEDO — ANTES DE FORMAR FILA NO LAGE SENHOR DO PADRÃO · FECHADO SEG & DOM",
      stops: {
        "e1-metro": {
          title: "Metro para Matosinhos",
          tag: "Linha Azul (A)",
          body: "Linha Azul (A) a partir de Trindade ou Bolhão, sentido Senhora da Hora, mudar se preciso até Matosinhos Sul — cerca de 25 minutos porta a porta. Saiam com luz de dia suficiente para a praia.",
          meta: "~25 min do apartamento de metro",
        },
        "e1-beach": {
          title: "Passeio na praia ao pôr do sol",
          tag: "Praia de Matosinhos",
          body: "Praia de Matosinhos — praia atlântica ampla, surfistas, sem as multidões da Ribeira. Andem no passeio até ao farol enquanto a luz fica dourada.",
          meta: "Mesmo ao lado da paragem de metro",
        },
        "e1-dinner": {
          title: "Jantar",
          tag: "Restaurante Lage Senhor do Padrão",
          body: "Peixe e marisco grelhados a sério — 4,7 estrelas em mais de 6.000 avaliações, porções enormes, cerca de €11 por prato. Sem reservas, por isso cheguem antes das 19h ou esperem. A salada de polvo grelhado e o arroz de marisco são os destaques.",
          meta: "10 min a pé da praia · Locais, não turistas",
        },
        "e1-gelado": {
          title: "Gelado, depois metro para casa",
          tag: "Fechar a noite",
          body: "Uma bola por perto para fechar a noite, depois metro de volta ao Bolhão — cerca de 25 minutos, à porta.",
          meta: "Metro de volta ao apartamento",
        },
      },
    },
    morning2: {
      navLabel: "Manhã",
      title: "Manhã — Rio & Gaia",
      intro:
        "Mercado à porta, depois a ponte: primeiro a vista de cima, depois o vinho de baixo. Almoço à beira-água em Gaia antes de voltar a casa.",
      tip: "RESERVEM A PROVA PARA A MANHÃ · TELEFÉRICO OU A PÉ — OS DOIS SERVEM",
      stops: {
        "m2-breakfast": {
          title: "Pequeno-almoço — o início",
          tag: "Breakfast Lovers Bolhão",
          body: "Cinco minutos do apartamento na Rua da Alegria 87 — café de pequeno-almoço cuidado, com mini porções para provar um pouco de tudo, abre às 8h. Se preferirem só café e comer no mercado: My Coffee Porto no Bolhão (Fernandes Tomás 646) fica no caminho.",
          meta: "5 min do apartamento, o mercado é à volta da esquina",
        },
        "m2-bolhao": {
          title: "Mercado do Bolhão",
          tag: "Bonito, não famoso",
          body: "O vosso vizinho mais próximo. Vão cedo — peixe, queijo, fruta, um copo de vinho por €3 nas bancas de peixe. Depois do pequeno-almoço é só para olhar e provar. Fecha aos domingos.",
          meta: "5 min do apartamento · Ingredientes & proveniência",
        },
        "m2-bridge": {
          title: "Tabuleiro superior → Jardim do Morro + Serra do Pilar",
          tag: "Porto essencial",
          body: "Desta vez o tabuleiro superior da ponte Dom Luís I — a pé, a cidade toda por baixo. Do outro lado, logo à esquerda, o Jardim do Morro e acima o mosteiro da Serra do Pilar: a vista de postal do Porto. Quase vazio de manhã.",
          meta: "20 min do Bolhão — ou 2 paragens de metro até ao Jardim do Morro",
        },
        "m2-lodges": {
          title: "Descer às caves: pequena Quinta + WOW",
          tag: "Artesanal, não massificado",
          body: "Teleférico ou a pé até à margem de Gaia. Prova numa cave familiar mais pequena em vez do ritmo de grupos da Graham’s/Taylor’s — grupo pequeno, tempo para perguntas a sério sobre envelhecimento e colheitas. Depois um passeio curto pelo WOW: armazéns de vinho restaurados, pátios, vista de volta à cidade velha.",
          meta: "Teleférico 5 min ou 10 min a pé a descer",
        },
        "m2-lunch": {
          title: "Almoço",
          tag: "Dragon Palace",
          body: "Mesmo no Cais de Gaia, a poucos minutos das caves — sushi all-you-can-eat com uma das melhores vistas da cidade, em frente à Ribeira. Boa comida, mas cheguem cedo ou esperem fila; pedem no tablet à mesa.",
          meta: "3 min das caves, na margem de Gaia · Grande vista, comida a sério",
        },
        "m2-guindalense": {
          title: "Guindalense — cerveja debaixo da ponte, depois casa",
          tag: "Locais, não turistas",
          body: "De volta pelo tabuleiro inferior, e mesmo ao pé da ponte no lado do Porto: o quiosque do clube de futebol Guindalense. A cerveja mais barata da cidade, a melhor vista, só locais — uma paragem curta antes do caminho para casa. Depois 15–20 min até ao apartamento. Sesta.",
          meta: "No caminho de volta pela ponte",
        },
      },
    },
    evening2: {
      navLabel: "Noite",
      title: "Noite — Rodízio & jazz no Douro",
      intro:
        "Plano fixo: rodízio brasileiro no Fogo de Chão (Norte Shopping), regresso em direção ao apartamento, uma pausa curta no Passeio das Virtudes, e fechar no rooftop do Mirajazz.",
      tip: "RESERVEM O FOGO · CONFIRMEM O LIVE DO MIRAJAZZ",
      stops: {
        "e2-metro": {
          title: "Metro até ao Norte Shopping",
          tag: "A partir do Bolhão",
          body: "Do Bolhão ou Trindade em direção a Senhora da Hora até NorteShopping / Sete Bicas — cerca de 15 minutos. Evitem o Mar Shopping: fica mais longe e alonga a noite sem necessidade.",
          meta: "~15 min de metro do apartamento",
        },
        "e2-fogo": {
          title: "Jantar — Fogo de Chão",
          tag: "Norte Shopping",
          body: "Rodízio brasileiro: carne no espeto, salad bar, sem menu de opções. A filial do Norte Shopping é a certa — ao pé do metro, regresso fácil à cidade. Reservem.",
          meta: "Mesmo no shopping · reservem",
        },
        "e2-virtudes": {
          title: "Passeio das Virtudes",
          tag: "Paragem curta no Douro",
          body: "Metro de volta ao Bolhão, depois 15–20 min a descer até Miragaia. Parem no Jardim / Passeio das Virtudes — luz da noite sobre o Douro, locais, sem programa extra. Opcional ao lado: Miradouro da Vitória.",
          meta: "A caminho do Mirajazz",
        },
        "e2-mirajazz": {
          title: "Mirajazz",
          tag: "Rooftop · jazz",
          body: "Escadas do Caminho Novo 11 — rooftop com vista para o Douro, jazz, vinhos portugueses e petiscos. O fecho certo depois do rodízio: sem segundo jantar, sem bar crawl. Confirmem live e horário; muitas vezes fecha cedo.",
          meta: "A minutos das Virtudes · depois casa",
        },
      },
    },
  },
};
