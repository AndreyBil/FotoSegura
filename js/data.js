/* =====================================================================
   FotoSegura — CONTEÚDO DO SITE
   Todos os textos ficam aqui (baseados no documento da Sprint 2).
   Para mudar uma frase, um quiz ou uma cena, edite este arquivo —
   não precisa mexer no HTML nem no app.js.
   ===================================================================== */

const DATA = {

  /* ------------------------------------------------------------------
     VÍDEO FINAL
     Quando o vídeo estiver pronto (Sprint 3), coloque o arquivo em
     assets/video/ e preencha o caminho abaixo. O player animado provisório
     será trocado automaticamente pelo vídeo de verdade.
     Ex.: videoArquivo: "assets/video/o-segredo-por-tras-da-foto.mp4"
     ------------------------------------------------------------------ */
  videoArquivo: "",
  legendasArquivo: "", // Ex.: "assets/video/legendas.vtt" (formato WebVTT)

  /* ------------------------------------------------------------------
     SEÇÃO "O QUE A SUA FOTO PODE REVELAR"
     x e y = posição da bolinha na foto (o desenho tem 800 x 450)
     ------------------------------------------------------------------ */
  segredos: [
    {
      id: "onde", icone: "📍", x: 290, y: 252,
      titulo: "Onde você mora ou estuda", resto: "",
      dica: "A placa da rua mostra onde você mora ou estuda. Quem vê a foto pode descobrir onde você está."
    },
    {
      id: "escola", icone: "🏫", x: 432, y: 298,
      titulo: "O nome da sua escola", resto: ", no uniforme ou na mochila",
      dica: "O nome da escola no uniforme ou na mochila conta onde você passa os seus dias."
    },
    {
      id: "horarios", icone: "⏰", x: 694, y: 196,
      titulo: "Os horários", resto: " em que você costuma sair de casa",
      dica: "A hora da foto mostra quando você sai de casa. Com várias fotos, dá para descobrir a sua rotina."
    },
    {
      id: "casa", icone: "🏠", x: 66, y: 276,
      titulo: "Como é a sua casa", resto: " por dentro ou por fora",
      dica: "A porta, o portão e a frente da casa mostram como ela é. Uma foto já diz muita coisa!"
    }
  ],

  /* Cards explicativos do tema */
  conceitos: [
    { icone: "🔑", cor: "azul",  titulo: "Privacidade é seu direito",
      texto: "Você decide quem pode ver as suas fotos. Não é obrigação mostrar tudo para todo mundo!" },
    { icone: "🌐", cor: "sol",   titulo: "A internet nunca esquece",
      texto: "Uma foto que vai para a internet pode ficar lá para sempre, mesmo que você apague do seu celular." },
    { icone: "👀", cor: "menta", titulo: "Quem pode ver?",
      texto: "Quando você posta uma foto pública, qualquer pessoa no mundo pode ver — até desconhecidos." },
    { icone: "💬", cor: "coral", titulo: "Pense antes de enviar",
      texto: "Quando você manda uma foto por mensagem, a outra pessoa pode salvar e repassar para outros." }
  ],

  /* ------------------------------------------------------------------
     REGRAS DE OURO (texto oficial da Sprint 2 + dica prática)
     ------------------------------------------------------------------ */
  regras: [
    { icone: "🤝", cor: "azul",
      texto: "Só envie fotos para pessoas que você conhece de verdade, na vida real.",
      dica: "Pergunte a si mesmo: eu conheço essa pessoa fora da internet? Se a resposta for não, não envie." },
    { icone: "🧑‍🏫", cor: "sol",
      texto: "Peça sempre a opinião de um adulto de confiança antes de postar uma foto.",
      dica: "Fale com seus pais, responsáveis ou professor(a). Eles ajudam você a decidir." },
    { icone: "🚫", cor: "coral",
      texto: "Nunca envie fotos para quem você conheceu só pela internet.",
      dica: "Mesmo em jogos! Nem sempre a pessoa do outro lado é quem diz ser." },
    { icone: "🔍", cor: "menta",
      texto: "Fique de olho no fundo da foto: ele também aparece!",
      dica: "Olhe a foto toda: placa de rua, uniforme, portão, fachada da casa…" },
    { icone: "🙋", cor: "violeta",
      texto: "Se alguém insistir para você mandar uma foto, isso é estranho — conte para um adulto.",
      dica: "Insistir é um sinal de alerta. Você pode dizer “não” e contar para um adulto." }
  ],

  /* Ajustes práticos (do protótipo Figma) */
  extras: [
    { icone: "🔒", titulo: "Deixe a conta no privado",
      texto: "Assim só os amigos aprovados veem suas fotos.",
      como: "Configurações → Privacidade → Conta privada" },
    { icone: "📍", titulo: "Desligue a localização da câmera",
      texto: "Muitos celulares guardam onde a foto foi tirada. Isso pode mostrar onde você mora ou estuda.",
      como: "Câmera → Configurações → Localização → Desativar" },
    { icone: "🙋", titulo: "Peça licença antes de postar",
      texto: "Se outra pessoa aparece na foto, pergunte se ela deixa você postar. Respeite a privacidade dos outros.",
      como: "Pergunte: “Posso postar essa foto com você?”" }
  ],

  /* ------------------------------------------------------------------
     PERIGOS (linguagem simples; termo técnico só para os adultos)
     ------------------------------------------------------------------ */
  perigos: [
    { icone: "🎭", titulo: "Pedidos estranhos de foto", tag: "Pede fotos pessoais",
      resumo: "Alguém que finge ser criança para pedir fotos.",
      mais: "Às vezes uma pessoa que você não conhece de verdade puxa conversa num jogo e vai pedindo mais fotos e mais informações. Parece só um joguinho, mas não é. Não responda e conte para um adulto. (Os adultos chamam isso de “aliciamento” ou “grooming”.)" },
    { icone: "📸", titulo: "Foto espalhada sem licença", tag: "Foto publicada sem permissão",
      resumo: "Quando alguém posta ou repassa suas fotos sem você deixar.",
      mais: "Uma foto enviada “só para um amigo” pode acabar em vários grupos, e você perde o controle de quem vê. Se isso acontecer, conte para um adulto. Você não fez nada de errado!" },
    { icone: "🪪", titulo: "Perfil falso com a sua foto", tag: "Perfil falso usando suas fotos",
      resumo: "Usar suas fotos para criar perfis falsos.",
      mais: "Alguém pode copiar suas fotos e fingir que é você. Quanto menos fotos públicas, mais protegido você fica. Se encontrar um perfil falso, avise um adulto." }
  ],

  /* ------------------------------------------------------------------
     QUIZ  (certa = posição da resposta certa em "opcoes", começando em 0)
     As alternativas são embaralhadas a cada partida.
     ------------------------------------------------------------------ */
  quiz: [
    { cena: "📸 👧 🏫",
      pergunta: "Você tirou uma foto com sua amiga na escola. O que fazer antes de postar?",
      opcoes: ["Perguntar para ela se deixa eu postar", "Postar logo, ficou linda!", "Postar e marcar o perfil dela sem avisar", "Mandar para todos os contatos do WhatsApp"],
      certa: 0,
      explica: "Cada pessoa decide se quer aparecer nas fotos. Sempre peça licença antes de postar!" },

    { cena: "🎮 💬 🕵️",
      pergunta: "Um jogador que você só conhece do jogo online pediu uma foto sua. O que você faz?",
      opcoes: ["Não envio e conto para um adulto de confiança", "Envio, porque ele é simpático", "Envio só uma, para ele me deixar em paz", "Envio se ele mandar uma primeiro"],
      certa: 0,
      explica: "Nunca envie fotos para quem você conheceu só pela internet. Contar para um adulto é a atitude certa!" },

    { cena: "👦 🎒 🏫",
      pergunta: "Você está de uniforme, com o nome da escola bem à mostra. Posso postar essa foto para todo mundo?",
      opcoes: ["Não: o uniforme mostra onde eu estudo", "Sim, o uniforme é bonito", "Sim, se eu sorrir bastante", "Sim, se ninguém me conhecer"],
      certa: 0,
      explica: "O nome da escola conta onde você passa os seus dias. Fique de olho no que aparece na foto!" },

    { cena: "🖼️ 👵 ❤️",
      pergunta: "Você quer mostrar seu desenho para a vovó. O que é mais seguro?",
      opcoes: ["Enviar só para ela, com um adulto sabendo", "Postar em um perfil público", "Mandar para um grupo com desconhecidos", "Colocar na internet para todo mundo ver"],
      certa: 0,
      explica: "Compartilhar com quem a gente conhece de verdade é legal, principalmente com um adulto por perto!" },

    { cena: "📱 😬 🙅",
      pergunta: "Alguém fica insistindo: “manda só mais uma foto, prometo que ninguém vai ver!”. O que isso significa?",
      opcoes: ["É estranho: eu conto para um adulto", "Tudo bem, ele prometeu", "É uma brincadeira, posso mandar", "Devo responder para ele parar"],
      certa: 0,
      explica: "Quando alguém insiste para você mandar uma foto, isso é estranho. Conte para um adulto!" },

    { cena: "😟 📤 🤗",
      pergunta: "Você mandou uma foto e se arrependeu. O que fazer?",
      opcoes: ["Contar para um adulto de confiança, sem medo", "Esconder e não falar com ninguém", "Ficar quieto e torcer para dar certo", "Mandar mais fotos para compensar"],
      certa: 0,
      explica: "Você não fez nada de errado. Pedir ajuda é ser corajoso(a), e um adulto pode ajudar você!" }
  ],

  /* Checklist (do protótipo Figma) */
  checklist: [
    { icone: "🔒", texto: "Minha conta nas redes sociais está configurada como privada" },
    { icone: "📍", texto: "A localização da câmera do meu celular está desativada" },
    { icone: "👥", texto: "Só aceito pedidos de amizade de pessoas que conheço na vida real" },
    { icone: "🤝", texto: "Sempre peço permissão antes de postar fotos com outras pessoas" },
    { icone: "🚫", texto: "Nunca envio fotos para desconhecidos que conheci online" },
    { icone: "🧑‍🤝‍🧑", texto: "Sei que posso contar para um adulto de confiança se algo me incomodar" },
    { icone: "📞", texto: "Conheço o número Disque 100 para denúncias de emergência" }
  ],

  /* ------------------------------------------------------------------
     ROTEIRO DO VÍDEO "O Segredo por Trás da Foto"  (2min50s)
     inicio/fim em segundos. "fala" = narração = legenda.
     ------------------------------------------------------------------ */
  cenas: [
    { inicio: 0,   fim: 20,  nome: "Oi, eu sou o Théo",
      alt: "Théo sorri e tira uma foto em frente à sua casa e à sua escola.",
      fala: "Oi! Eu sou o Théo. Hoje eu tirei essa foto para mandar para um amigo novo do jogo online. Mas... será que essa foto é só um sorriso?" },
    { inicio: 20,  fim: 50,  nome: "A foto congelou",
      alt: "A foto congela e círculos destacam a placa da rua, o uniforme e a fachada da escola.",
      fala: "Olha só! Essa foto mostra minha rua, o nome da minha escola no uniforme... e até a hora em que eu saio de casa!" },
    { inicio: 50,  fim: 80,  nome: "Pedido no chat",
      alt: "Tela dividida: à esquerda o jogo online, à direita um perfil suspeito pedindo fotos e informações no chat.",
      fala: "Às vezes, uma pessoa que a gente não conhece de verdade pede fotos e detalhes. Isso pode ser perigoso, mesmo que pareça só um joguinho." },
    { inicio: 80,  fim: 110, nome: "Hora de pensar",
      alt: "Théo pensa um pouco e depois vai conversar com a mãe, mostrando o celular.",
      fala: "Por isso, antes de mandar qualquer foto, eu paro e penso... e quando fico em dúvida, eu chamo um adulto de confiança!" },
    { inicio: 110, fim: 145, nome: "Regras de Ouro",
      alt: "As cinco regras de ouro aparecem uma por vez, com ícones animados.",
      fala: "Vou te contar as regras de ouro: só envie fotos para quem você conhece de verdade; peça a opinião de um adulto; nunca mande foto para desconhecido; fique de olho no fundo da imagem; e se alguém insistir, isso é estranho — conte para um adulto!" },
    { inicio: 145, fim: 170, nome: "Até a próxima!",
      alt: "Théo acena feliz ao lado do mascote do projeto.",
      fala: "Agora você já sabe cuidar melhor das suas fotos! Quer aprender mais? Acesse o nosso site e jogue o nosso quiz. Até a próxima!" }
  ],

  /* Versão curta das regras para a cena 5 do vídeo */
  regrasCurtas: [
    "Só para quem eu conheço de verdade",
    "Peço a opinião de um adulto",
    "Nunca para desconhecidos da internet",
    "Olho o fundo da foto",
    "Se insistirem: conto para um adulto"
  ]
};
