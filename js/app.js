/* =====================================================================
   FotoSegura — LÓGICA DO SITE
   Cada função "iniciar…" cuida de uma parte da página.
   O conteúdo vem de data.js e as ilustrações de scenes.js.
   ===================================================================== */

(function () {
  "use strict";

  /* ---------- Atalhos e ferramentas ---------- */
  const $ = (sel, raiz = document) => raiz.querySelector(sel);
  const $$ = (sel, raiz = document) => Array.from(raiz.querySelectorAll(sel));
  const reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Guarda dados no navegador (progresso do checklist, melhor pontuação).
     Se o navegador bloquear, o site continua funcionando normalmente. */
  const guardar = {
    ler(chave, padrao) {
      try { const v = localStorage.getItem("fotosegura." + chave); return v === null ? padrao : JSON.parse(v); }
      catch (e) { return padrao; }
    },
    gravar(chave, valor) {
      try { localStorage.setItem("fotosegura." + chave, JSON.stringify(valor)); } catch (e) { /* ignora */ }
    }
  };

  function embaralhar(lista) {
    const a = lista.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  const mascoteSvg = (classe) => `<svg class="${classe}" viewBox="0 0 200 200" aria-hidden="true"><use href="#mascote"/></svg>`;
  const mmss = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  /* Ajusta animações SVG para quem prefere menos movimento */
  function respeitarMovimento(svg) {
    if (!svg || !reduzMovimento || typeof svg.setCurrentTime !== "function") return;
    svg.setCurrentTime(120); // pula para o final das animações
    svg.pauseAnimations();
  }

  /* ================================================================
     1. MENU + LINK ATIVO
     ================================================================ */
  function iniciarMenu() {
    const botao = $("#menuBtn");
    const menu = $("#menu");

    botao.addEventListener("click", () => {
      const aberto = menu.classList.toggle("is-aberto");
      botao.setAttribute("aria-expanded", String(aberto));
    });
    $$("a", menu).forEach((a) => a.addEventListener("click", () => {
      menu.classList.remove("is-aberto");
      botao.setAttribute("aria-expanded", "false");
    }));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("is-aberto")) {
        menu.classList.remove("is-aberto");
        botao.setAttribute("aria-expanded", "false");
        botao.focus();
      }
    });

    // Destaca no menu a seção que está na tela
    const links = new Map($$("a", menu).map((a) => [a.getAttribute("href").slice(1), a]));
    if ("IntersectionObserver" in window) {
      const obs = new IntersectionObserver((entradas) => {
        entradas.forEach((en) => {
          if (en.isIntersecting) {
            links.forEach((a) => { a.classList.remove("is-ativo"); a.removeAttribute("aria-current"); });
            const a = links.get(en.target.id);
            if (a) { a.classList.add("is-ativo"); a.setAttribute("aria-current", "true"); }
          }
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      links.forEach((_, id) => { const sec = document.getElementById(id); if (sec) obs.observe(sec); });
    }
  }

  /* ================================================================
     2. "O QUE A SUA FOTO PODE REVELAR" (foto interativa)
     ================================================================ */
  function iniciarSegredos() {
    const cena = $("#fotoCena");
    const lista = $("#listaSegredos");
    const contador = $("#contador");
    const balaoTxt = $("#balaoTxt");
    const total = DATA.segredos.length;
    const vistos = new Set();

    cena.innerHTML = fotoCena();

    DATA.segredos.forEach((s, i) => {
      // bolinha na foto (posição em % a partir das coordenadas do desenho 800x450)
      const ponto = document.createElement("button");
      ponto.type = "button";
      ponto.className = "ponto";
      ponto.dataset.id = s.id;
      ponto.style.left = (s.x / 800 * 100) + "%";
      ponto.style.top = (s.y / 450 * 100) + "%";
      ponto.setAttribute("aria-label", `Segredo ${i + 1}: ${s.titulo}`);
      ponto.textContent = "?";
      cena.appendChild(ponto);

      // item da lista ao lado
      const li = document.createElement("li");
      li.innerHTML = `<button type="button" class="segredo" data-id="${s.id}">
        <span class="segredo__icone" aria-hidden="true">${s.icone}</span>
        <span><strong>${s.titulo}</strong>${s.resto}</span>
        <span class="segredo__marca" aria-hidden="true">✓</span>
      </button>`;
      lista.appendChild(li);
    });

    function revelar(id) {
      const s = DATA.segredos.find((x) => x.id === id);
      vistos.add(id);
      $$(".ponto, .segredo").forEach((el) => {
        const eEste = el.dataset.id === id;
        el.classList.toggle("is-ativo", eEste);
        if (eEste) el.classList.add("is-visto");
        if (el.classList.contains("ponto") && eEste) el.textContent = "✓";
      });
      balaoTxt.textContent = s.dica;
      contador.textContent = `${vistos.size} de ${total} segredos descobertos`;
      if (vistos.size === total) {
        balaoTxt.textContent = s.dica + " Você descobriu todos os segredos! Agora já sabe o que olhar antes de postar. 🕵️";
      }
    }

    cena.addEventListener("click", (e) => { const p = e.target.closest(".ponto"); if (p) revelar(p.dataset.id); });
    lista.addEventListener("click", (e) => { const b = e.target.closest(".segredo"); if (b) revelar(b.dataset.id); });
  }

  /* ================================================================
     3. CONCEITOS, REGRAS, EXTRAS E PERIGOS
     ================================================================ */
  function iniciarCartoes() {
    // Cards explicativos
    $("#conceitos").innerHTML = DATA.conceitos.map((c) => `
      <article class="card conceito conceito--${c.cor}">
        <span class="conceito__icone" aria-hidden="true">${c.icone}</span>
        <h4>${c.titulo}</h4>
        <p>${c.texto}</p>
      </article>`).join("");

    // Regras de Ouro (clique para abrir a dica prática)
    const listaRegras = $("#listaRegras");
    listaRegras.innerHTML = DATA.regras.map((r, i) => `
      <li class="regra regra--${r.cor}">
        <button type="button" class="regra__btn" aria-expanded="false" aria-controls="dica-${i}">
          <span class="regra__moeda" aria-hidden="true">${i + 1}</span>
          <span><span class="sr-only">Regra ${i + 1}: </span>${r.texto}</span>
          <span class="regra__icone" aria-hidden="true">${r.icone}</span>
        </button>
        <p class="regra__dica" id="dica-${i}" role="region">${r.dica}</p>
      </li>`).join("");
    listaRegras.addEventListener("click", (e) => {
      const btn = e.target.closest(".regra__btn");
      if (!btn) return;
      const li = btn.closest(".regra");
      const aberta = li.classList.toggle("is-aberta");
      btn.setAttribute("aria-expanded", String(aberta));
    });

    // Ajustes extras
    $("#extras").innerHTML = DATA.extras.map((x) => `
      <article class="card extra">
        <span class="extra__icone" aria-hidden="true">${x.icone}</span>
        <h4>${x.titulo}</h4>
        <p>${x.texto}</p>
        <span class="extra__como">${x.como}</span>
      </article>`).join("");

    // Perigos (usa <details>, que já abre/fecha sozinho e funciona com teclado)
    $("#listaPerigos").innerHTML = DATA.perigos.map((p) => `
      <details class="perigo">
        <summary>
          <span class="perigo__icone" aria-hidden="true">${p.icone}</span>
          <h3>${p.titulo}</h3>
          <p class="perigo__resumo">${p.resumo}</p>
          <span class="perigo__tag">⚠️ ${p.tag}</span>
          <span class="perigo__mais-btn">Saiba mais</span>
        </summary>
        <p class="perigo__mais">${p.mais}</p>
      </details>`).join("");
  }

  /* ================================================================
     4. PLAYER DO VÍDEO (animação do roteiro fechado)
        Se DATA.videoArquivo estiver preenchido, usa o vídeo real.
     ================================================================ */
  function iniciarVideo() {
    const player = $("#player");
    const cenas = DATA.cenas;
    const TOTAL = cenas[cenas.length - 1].fim;

    // Lista de cenas (botões para pular)
    const listaCenas = $("#listaCenas");
    listaCenas.innerHTML = cenas.map((c, i) => `
      <li><button type="button" data-i="${i}">${c.nome} <span class="sr-only">(${mmss(c.inicio)})</span></button></li>`).join("");

    // ---- Vídeo real (quando existir) ----
    if (DATA.videoArquivo) {
      const trilha = DATA.legendasArquivo
        ? `<track kind="captions" src="${DATA.legendasArquivo}" srclang="pt-BR" label="Português" default>` : "";
      player.innerHTML = `<video controls preload="metadata" playsinline aria-label="O Segredo por Trás da Foto">
        <source src="${DATA.videoArquivo}" type="video/mp4">${trilha}
        Seu navegador não consegue mostrar este vídeo.</video>`;
      player.querySelector("video").style.cssText = "display:block;width:100%;aspect-ratio:16/9;background:#000";
      listaCenas.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => {
        const v = player.querySelector("video");
        v.currentTime = cenas[+b.dataset.i].inicio; v.play();
      }));
      return;
    }

    // ---- Player animado provisório ----
    const palco = $("#palco"), legenda = $("#legenda"), range = $("#range"), tempo = $("#tempo");
    const btnPlay = $("#btnPlay"), btnGrande = $("#btnGrande"), btnGrandeTxt = $("#btnGrandeTxt");
    const btnAnt = $("#btnAnt"), btnProx = $("#btnProx"), btnVoz = $("#btnVoz");
    range.max = TOTAL;

    let t = 0, tocando = false, atual = -1, ultimo = 0, quadro = 0, terminou = false;
    let vozLigada = guardar.ler("voz", false);
    const temVoz = "speechSynthesis" in window;
    if (!temVoz) btnVoz.hidden = true;

    const cenaEm = (seg) => { for (let i = cenas.length - 1; i >= 0; i--) if (seg >= cenas[i].inicio) return i; return 0; };

    function falar(texto) {
      if (!temVoz) return;
      speechSynthesis.cancel();
      if (!vozLigada || !tocando) return;
      const u = new SpeechSynthesisUtterance(texto);
      u.lang = "pt-BR"; u.rate = 0.92; u.pitch = 1.05;
      const v = speechSynthesis.getVoices().find((x) => /pt[-_]BR/i.test(x.lang));
      if (v) u.voice = v;
      speechSynthesis.speak(u);
    }

    function mostrarCena(i) {
      atual = i;
      const c = cenas[i];
      palco.innerHTML = CENAS_SVG[i]();
      palco.setAttribute("aria-label", `Cena ${i + 1}: ${c.alt}`);
      respeitarMovimento(palco.querySelector("svg"));
      legenda.textContent = c.fala;
      $$("button", listaCenas).forEach((b, k) => { if (k === i) b.setAttribute("aria-current", "true"); else b.removeAttribute("aria-current"); });
      falar(c.fala);
    }

    function atualizarTela() {
      const i = cenaEm(t);
      if (i !== atual) mostrarCena(i);
      range.value = t;
      tempo.textContent = `${mmss(t)} / ${mmss(TOTAL)}`;
    }

    function marcarBotoes() {
      const rotulo = tocando ? "Pausar" : (terminou ? "Ver de novo" : "Assistir");
      btnPlay.textContent = tocando ? "⏸" : (terminou ? "↺" : "▶");
      btnPlay.setAttribute("aria-label", rotulo);
      btnGrande.hidden = tocando;
      btnGrandeTxt.textContent = terminou ? "Ver de novo" : (t > 0 ? "Continuar" : "Assistir ao vídeo");
      $(".player__grande-icone", player).textContent = terminou ? "↺" : "▶";
    }

    function passo(agora) {
      if (!tocando) return;
      t = Math.min(TOTAL, t + (agora - ultimo) / 1000);
      ultimo = agora;
      atualizarTela();
      if (t >= TOTAL) { pausar(true); return; }
      quadro = requestAnimationFrame(passo);
    }

    function tocar() {
      if (terminou || t >= TOTAL) { t = 0; atual = -1; terminou = false; }
      tocando = true;
      ultimo = performance.now();
      marcarBotoes();
      if (atual === -1 || atual !== cenaEm(t)) atualizarTela(); else falar(cenas[atual].fala);
      quadro = requestAnimationFrame(passo);
    }

    function pausar(fim = false) {
      tocando = false;
      terminou = fim;
      cancelAnimationFrame(quadro);
      if (temVoz) speechSynthesis.cancel();
      marcarBotoes();
    }

    function irPara(seg) {
      t = Math.max(0, Math.min(TOTAL, seg));
      terminou = false;
      atual = -1;           // força redesenhar a cena (reinicia a animação)
      atualizarTela();
      marcarBotoes();
    }

    const alternar = () => (tocando ? pausar() : tocar());
    btnPlay.addEventListener("click", alternar);
    btnGrande.addEventListener("click", tocar);
    palco.addEventListener("click", alternar);
    range.addEventListener("input", () => irPara(+range.value));
    btnProx.addEventListener("click", () => { const i = cenaEm(t); irPara(i < cenas.length - 1 ? cenas[i + 1].inicio : 0); });
    btnAnt.addEventListener("click", () => { const i = cenaEm(t); irPara(t - cenas[i].inicio > 3 || i === 0 ? cenas[i].inicio : cenas[i - 1].inicio); });
    listaCenas.addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) irPara(cenas[+b.dataset.i].inicio); });

    btnVoz.setAttribute("aria-pressed", String(vozLigada));
    btnVoz.addEventListener("click", () => {
      vozLigada = !vozLigada;
      guardar.gravar("voz", vozLigada);
      btnVoz.setAttribute("aria-pressed", String(vozLigada));
      if (vozLigada && tocando) falar(cenas[atual].fala); else if (temVoz) speechSynthesis.cancel();
    });

    // Pausa ao sair da aba
    document.addEventListener("visibilitychange", () => { if (document.hidden && tocando) pausar(); });

    atualizarTela();
    marcarBotoes();
  }

  /* ================================================================
     5. QUIZ
     ================================================================ */
  function iniciarQuiz() {
    const raiz = $("#quizRoot");
    const perguntas = DATA.quiz;
    const n = perguntas.length;
    let i = 0, pontos = 0;

    function desenharPergunta() {
      const q = perguntas[i];
      const opcoes = embaralhar(q.opcoes.map((texto, idx) => ({ texto, ok: idx === q.certa })));
      raiz.innerHTML = `
        <div class="quiz__topo"><span>Pergunta ${i + 1} de ${n}</span><span>Pontuação: ${pontos}</span></div>
        <div class="barra" aria-hidden="true"><div class="barra__cheia" style="width:${(i / n) * 100}%"></div></div>
        <p class="quiz__cena" aria-hidden="true">${q.cena}</p>
        <h3 class="quiz__pergunta" id="qPergunta" tabindex="-1">${q.pergunta}</h3>
        <div class="opcoes" role="group" aria-labelledby="qPergunta">
          ${opcoes.map((o, k) => `<button type="button" class="opcao" data-ok="${o.ok}">
            <span class="opcao__letra" aria-hidden="true">${"ABCD"[k]}</span><span>${o.texto}</span><span class="opcao__marca" aria-hidden="true"></span>
          </button>`).join("")}
        </div>
        <div id="qFeedback" aria-live="polite"></div>
        <div class="quiz__acoes"><button type="button" class="btn btn--azul" id="qProx" hidden>${i === n - 1 ? "Ver meu resultado" : "Próxima pergunta"}</button></div>`;

      $$(".opcao", raiz).forEach((b) => b.addEventListener("click", () => responder(b, q)));
      $("#qProx", raiz).addEventListener("click", () => { i++; i < n ? desenharPergunta() : desenharResultado(); $("#quiz").scrollIntoView({ behavior: reduzMovimento ? "auto" : "smooth", block: "start" }); });
    }

    function responder(botao, q) {
      const acertou = botao.dataset.ok === "true";
      if (acertou) pontos++;
      $$(".opcao", raiz).forEach((b) => {
        b.disabled = true;
        const ok = b.dataset.ok === "true";
        if (ok) { b.classList.add("is-certa"); $(".opcao__marca", b).textContent = "✅"; }
        else if (b === botao) { b.classList.add("is-errada"); $(".opcao__marca", b).textContent = "❌"; }
        else b.classList.add("is-off");
      });
      $(".barra__cheia", raiz).style.width = ((i + 1) / n * 100) + "%";
      $(".quiz__topo span:last-child", raiz).textContent = `Pontuação: ${pontos}`;
      $("#qFeedback", raiz).innerHTML = `
        <div class="feedback ${acertou ? "feedback--certo" : "feedback--errado"}">
          ${mascoteSvg("feedback__mascote")}
          <p><strong>${acertou ? "Isso mesmo! 🎉" : "Quase! Vamos aprender juntos."}</strong> ${q.explica}</p>
        </div>`;
      const prox = $("#qProx", raiz);
      prox.hidden = false;
      prox.focus();
    }

    function desenharResultado() {
      const melhorAntes = guardar.ler("quiz.melhor", 0);
      const melhor = Math.max(melhorAntes, pontos);
      guardar.gravar("quiz.melhor", melhor);
      const estrelas = pontos === n ? 3 : pontos >= Math.ceil(n * 0.6) ? 2 : 1;
      let titulo, texto;
      if (pontos === n) { titulo = "Uau! Você é craque!"; texto = "Você acertou tudo! Já sabe muito bem como cuidar das suas fotos."; }
      else if (estrelas === 2) { titulo = "Muito bem!"; texto = "Você já sabe quase tudo. Que tal rever as regras de ouro e tentar de novo?"; }
      else { titulo = "Bom começo!"; texto = "Aprender leva um tempinho. Veja o vídeo e as regras de ouro e tente outra vez. Você consegue!"; }

      raiz.innerHTML = `
        <div class="resultado">
          ${mascoteSvg("resultado__mascote")}
          <div class="resultado__estrelas" aria-label="${estrelas} de 3 estrelas">${"⭐".repeat(estrelas)}${"☆".repeat(3 - estrelas)}</div>
          <h3>${titulo}</h3>
          <p><strong>Você acertou ${pontos} de ${n}.</strong> ${texto}</p>
          <p>Lembre-se: na dúvida, converse com um adulto de confiança.</p>
          <p class="resultado__melhor">Sua melhor pontuação: ${melhor} de ${n}</p>
          <div class="quiz__acoes">
            <button type="button" class="btn btn--azul" id="qDeNovo">Jogar de novo</button>
            <a class="btn btn--branco" href="#regras">Rever as regras</a>
            <a class="btn btn--branco" href="#guia">Ir para o checklist</a>
          </div>
        </div>`;
      $("#qDeNovo", raiz).addEventListener("click", () => { i = 0; pontos = 0; desenharPergunta(); });
    }

    desenharPergunta();
  }

  /* ================================================================
     6. CHECKLIST (salva no navegador)
     ================================================================ */
  function iniciarChecklist() {
    const lista = $("#listaChecklist");
    const total = DATA.checklist.length;
    let marcados = guardar.ler("checklist", []);
    if (!Array.isArray(marcados)) marcados = [];

    lista.innerHTML = DATA.checklist.map((it, i) => `
      <li><label class="item">
        <input type="checkbox" data-i="${i}" ${marcados.includes(i) ? "checked" : ""}>
        <span class="item__icone" aria-hidden="true">${it.icone}</span>
        <span>${it.texto}</span>
      </label></li>`).join("");

    const planta = (n) => (n === 0 ? "🌱" : n <= 2 ? "🌱" : n <= 4 ? "🌿" : n < total ? "🪴" : "🌳");
    const mensagem = (n) => {
      if (n === 0) return "Vamos começar? Marque o primeiro item.";
      if (n < 3) return "Ótimo começo! Continue assim.";
      if (n < 5) return "Você está indo muito bem!";
      if (n < total) return "Falta pouquinho para completar!";
      return "Parabéns! Você cuida muito bem da sua privacidade! 🎉";
    };

    function atualizar(comFesta) {
      const n = marcados.length;
      $("#progNum").textContent = `${n}/${total}`;
      $("#progCheia").style.width = (n / total * 100) + "%";
      $("#progBarra").setAttribute("aria-valuenow", String(n));
      $("#progPlanta").textContent = planta(n);
      $("#progMsg").textContent = mensagem(n);
      if (comFesta && n === total) confete();
    }

    lista.addEventListener("change", (e) => {
      const cx = e.target.closest("input[type=checkbox]");
      if (!cx) return;
      const idx = +cx.dataset.i;
      marcados = cx.checked ? Array.from(new Set([...marcados, idx])) : marcados.filter((x) => x !== idx);
      guardar.gravar("checklist", marcados);
      atualizar(true);
    });

    $("#limparChecklist").addEventListener("click", () => {
      marcados = [];
      guardar.gravar("checklist", marcados);
      $$("input", lista).forEach((c) => (c.checked = false));
      atualizar(false);
    });

    atualizar(false);
  }

  function confete() {
    if (reduzMovimento) return;
    const cores = ["#FFC42E", "#2F5BFF", "#22B07D", "#FF5A5F", "#7B4DFF"];
    for (let k = 0; k < 60; k++) {
      const c = document.createElement("span");
      c.className = "confete";
      c.style.left = Math.random() * 100 + "vw";
      c.style.background = cores[k % cores.length];
      c.style.animationDelay = Math.random() * 0.6 + "s";
      c.style.animationDuration = 1.8 + Math.random() * 1.4 + "s";
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 3800);
    }
  }

  /* ================================================================
     7. CARTÃO-RESUMO (imprimir) + ANO NO RODAPÉ
     ================================================================ */
  function iniciarCartao() {
    $("#btnImprimir").addEventListener("click", () => {
      document.body.classList.add("imprimindo-cartao");
      window.print();
    });
    window.addEventListener("afterprint", () => document.body.classList.remove("imprimindo-cartao"));
    $("#ano").textContent = new Date().getFullYear();
  }

  /* ---------- Começa tudo ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    iniciarMenu();
    iniciarSegredos();
    iniciarCartoes();
    iniciarVideo();
    iniciarQuiz();
    iniciarChecklist();
    iniciarCartao();
  });
})();
