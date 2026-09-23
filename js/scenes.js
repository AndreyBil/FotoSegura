/* =====================================================================
   FotoSegura — ILUSTRAÇÕES (SVG desenhado em código)
   Aqui ficam: o personagem Théo, o cenário da foto interativa e as
   6 cenas do vídeo provisório. Quando a arte final (Sprint 3) chegar,
   dá para trocar estas funções por <img src="..."> sem mexer no resto.
   ===================================================================== */

const INK = "#1B2350";
const COR = { azul: "#2F5BFF", sol: "#FFC42E", menta: "#22B07D", coral: "#FF5A5F", coralEscuro: "#C8323A", violeta: "#7B4DFF", ceu: "#BFE3FF" };
const FONTE_TITULO = "'Baloo 2','Trebuchet MS',sans-serif";
const FONTE_TEXTO = "'Nunito','Trebuchet MS',sans-serif";

/* Envolve o desenho em um <svg> de 800 x 450 (proporção 16:9) */
function svgWrap(inner) {
  return `<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">${inner}</svg>`;
}

/* ---------- Peças reutilizáveis ---------- */

/* Braço com contorno. (x1,y1) = ombro, (x2,y2) = mão */
function braco(x1, y1, x2, y2, cor, pele) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${INK}" stroke-width="24" stroke-linecap="round"/>
          <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${cor}" stroke-width="17" stroke-linecap="round"/>
          <circle cx="${x2}" cy="${y2}" r="9.5" fill="${pele}" stroke="${INK}" stroke-width="3.5"/>`;
}

/* Personagem (Théo, mãe…). A origem (x,y) fica nos PÉS; ele tem ~220 de altura. */
function kid(o = {}) {
  const {
    x = 0, y = 0, s = 1, shirt = COR.azul, hair = "#3A2A22", skin = "#F2B58C", pants = "#26366B",
    mood = "smile", logo = true, phone = false, wave = false, long = false, bun = false, flip = false
  } = o;

  const olhos = {
    smile: `<circle cx="-12" cy="-184" r="4.5" fill="${INK}"/><circle cx="12" cy="-184" r="4.5" fill="${INK}"/>`,
    happy: `<circle cx="-12" cy="-184" r="4.5" fill="${INK}"/><circle cx="12" cy="-184" r="4.5" fill="${INK}"/>`,
    think: `<circle cx="-9" cy="-187" r="4.5" fill="${INK}"/><circle cx="15" cy="-187" r="4.5" fill="${INK}"/>
            <path d="M-22 -199 l14 -3 M6 -203 l16 3" stroke="${INK}" stroke-width="3.5" stroke-linecap="round" fill="none"/>`,
    worry: `<circle cx="-12" cy="-183" r="4.5" fill="${INK}"/><circle cx="12" cy="-183" r="4.5" fill="${INK}"/>
            <path d="M-21 -196 l12 5 M21 -196 l-12 5" stroke="${INK}" stroke-width="3.5" stroke-linecap="round" fill="none"/>`
  }[mood] || "";

  const boca = {
    smile: `<path d="M-12 -170 Q0 -158 12 -170" stroke="${INK}" stroke-width="4" fill="none" stroke-linecap="round"/>`,
    happy: `<path d="M-14 -172 Q0 -148 14 -172 Z" fill="#8A2233" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>`,
    think: `<path d="M-8 -166 Q0 -171 9 -165" stroke="${INK}" stroke-width="4" fill="none" stroke-linecap="round"/>`,
    worry: `<path d="M-9 -164 Q0 -172 9 -164" stroke="${INK}" stroke-width="4" fill="none" stroke-linecap="round"/>`
  }[mood] || "";

  const cabeloTras = long
    ? `<rect x="-42" y="-214" width="84" height="84" rx="34" fill="${hair}" stroke="${INK}" stroke-width="3.5"/>` : "";
  const coque = bun
    ? `<circle cx="0" cy="-236" r="15" fill="${hair}" stroke="${INK}" stroke-width="3.5"/>` : "";

  /* braço direito (do personagem): normal, com celular ou acenando */
  let bracoDir;
  if (phone) {
    bracoDir = braco(40, -138, 58, -196, shirt, skin) +
      `<g transform="rotate(12 60 -215)">
         <rect x="46" y="-244" width="30" height="48" rx="6" fill="${INK}"/>
         <rect x="50" y="-239" width="22" height="34" rx="3" fill="#8FD3FF"/>
       </g>`;
  } else if (wave) {
    bracoDir = `<g><animateTransform attributeName="transform" type="rotate" values="-14 40 -138;16 40 -138;-14 40 -138" dur="0.9s" repeatCount="indefinite"/>
                ${braco(40, -138, 74, -208, shirt, skin)}</g>`;
  } else {
    bracoDir = braco(40, -138, 47, -80, shirt, skin);
  }
  const bracoEsq = braco(-40, -138, -47, -80, shirt, skin);

  const camisa = logo
    ? `<text x="0" y="-108" text-anchor="middle" font-size="8" font-weight="800" fill="#fff" font-family="${FONTE_TEXTO}">E.M.</text>
       <text x="0" y="-95" text-anchor="middle" font-size="12" font-weight="800" fill="#fff" font-family="${FONTE_TITULO}">GIRASSOL</text>` : "";

  return `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">
    ${cabeloTras}
    <rect x="-24" y="-72" width="19" height="72" rx="8" fill="${pants}" stroke="${INK}" stroke-width="3.5"/>
    <rect x="5" y="-72" width="19" height="72" rx="8" fill="${pants}" stroke="${INK}" stroke-width="3.5"/>
    <ellipse cx="-16" cy="0" rx="16" ry="7" fill="#fff" stroke="${INK}" stroke-width="3.5"/>
    <ellipse cx="16" cy="0" rx="16" ry="7" fill="#fff" stroke="${INK}" stroke-width="3.5"/>
    ${bracoEsq}
    <rect x="-38" y="-152" width="76" height="90" rx="24" fill="${shirt}" stroke="${INK}" stroke-width="3.5"/>
    ${camisa}
    ${bracoDir}
    <circle cx="0" cy="-182" r="34" fill="${skin}" stroke="${INK}" stroke-width="3.5"/>
    <path d="M-36 -184 Q-38 -226 0 -226 Q38 -226 36 -184 Q22 -205 0 -204 Q-22 -205 -36 -184Z" fill="${hair}" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
    ${coque}
    <circle cx="-22" cy="-173" r="6" fill="#FF9AA2" opacity=".65"/><circle cx="22" cy="-173" r="6" fill="#FF9AA2" opacity=".65"/>
    ${olhos}${boca}
  </g>`;
}

/* Mascote (usa o símbolo definido no index.html) */
function mascote(x, y, tam) {
  return `<use href="#mascote" x="${x}" y="${y}" width="${tam}" height="${tam}"/>`;
}

/* Balão de fala com "rabinho". (x,y) = centro do balão */
function balao(x, y, w, h, texto, opts = {}) {
  const { cauda = "baixo", fonte = 20, fundo = "#fff" } = opts;
  const t = cauda === "baixo"
    ? `<path d="M${x - 14} ${y + h / 2 - 2} l-6 24 l30 -24z" fill="${fundo}" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
       <rect x="${x - 30}" y="${y + h / 2 - 6}" width="34" height="8" fill="${fundo}"/>` : "";
  return `<g>
    <rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="22" fill="${fundo}" stroke="${INK}" stroke-width="3.5"/>
    ${t}
    <text x="${x}" y="${y + fonte * 0.35}" text-anchor="middle" font-size="${fonte}" font-weight="800" fill="${INK}" font-family="${FONTE_TEXTO}">${texto}</text>
  </g>`;
}

/* Aparece com fade (SMIL). Use dentro de <g opacity="0"> */
function aparece(inicio, dur = 0.35) {
  return `<animate attributeName="opacity" from="0" to="1" begin="${inicio}s" dur="${dur}s" fill="freeze"/>`;
}
function some(inicio, dur = 0.35) {
  return `<animate attributeName="opacity" from="1" to="0" begin="${inicio}s" dur="${dur}s" fill="freeze"/>`;
}

/* ---------- Cenário: rua com a casa do Théo e a escola ---------- */
function cenario() {
  return `
    <rect width="800" height="450" fill="${COR.ceu}"/>
    <circle cx="700" cy="66" r="38" fill="${COR.sol}" stroke="${INK}" stroke-width="4"/>
    <g fill="#fff"><ellipse cx="140" cy="76" rx="46" ry="19"/><ellipse cx="176" cy="62" rx="34" ry="22"/><ellipse cx="108" cy="68" rx="26" ry="15"/></g>
    <g fill="#fff"><ellipse cx="470" cy="46" rx="40" ry="15"/><ellipse cx="498" cy="36" rx="26" ry="17"/></g>

    <rect x="0" y="300" width="800" height="90" fill="#E3E7F3"/>
    <rect x="0" y="390" width="800" height="60" fill="#8E96B3"/>
    <line x1="0" y1="300" x2="800" y2="300" stroke="${INK}" stroke-width="4"/>
    <line x1="0" y1="390" x2="800" y2="390" stroke="${INK}" stroke-width="4"/>
    <line x1="0" y1="424" x2="800" y2="424" stroke="#fff" stroke-width="6" stroke-dasharray="44 30"/>

    <!-- casa do Théo -->
    <rect x="32" y="190" width="212" height="110" fill="#FFD9A8" stroke="${INK}" stroke-width="4"/>
    <polygon points="14,192 138,98 262,192" fill="#E9573F" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
    <rect x="200" y="112" width="26" height="46" fill="#B5432F" stroke="${INK}" stroke-width="4"/>
    <rect x="116" y="234" width="46" height="66" fill="#8B5A3C" stroke="${INK}" stroke-width="4"/>
    <circle cx="153" cy="268" r="3.5" fill="${COR.sol}"/>
    <rect x="125" y="207" width="28" height="18" rx="3" fill="#fff" stroke="${INK}" stroke-width="3"/>
    <text x="139" y="221" text-anchor="middle" font-size="13" font-weight="800" fill="${INK}" font-family="${FONTE_TITULO}">27</text>
    <rect x="52" y="224" width="46" height="42" fill="${COR.ceu}" stroke="${INK}" stroke-width="4"/>
    <line x1="75" y1="224" x2="75" y2="266" stroke="${INK}" stroke-width="3"/><line x1="52" y1="245" x2="98" y2="245" stroke="${INK}" stroke-width="3"/>
    <rect x="182" y="224" width="46" height="42" fill="${COR.ceu}" stroke="${INK}" stroke-width="4"/>
    <line x1="205" y1="224" x2="205" y2="266" stroke="${INK}" stroke-width="3"/><line x1="182" y1="245" x2="228" y2="245" stroke="${INK}" stroke-width="3"/>

    <!-- escola -->
    <rect x="548" y="150" width="232" height="150" fill="#FFE08A" stroke="${INK}" stroke-width="4"/>
    <rect x="538" y="130" width="252" height="24" fill="${COR.azul}" stroke="${INK}" stroke-width="4"/>
    <rect x="578" y="160" width="164" height="30" rx="6" fill="${COR.azul}" stroke="${INK}" stroke-width="3"/>
    <text x="660" y="182" text-anchor="middle" font-size="17" font-weight="800" fill="#fff" font-family="${FONTE_TITULO}">ESCOLA GIRASSOL</text>
    <circle cx="660" cy="226" r="24" fill="#fff" stroke="${INK}" stroke-width="4"/>
    <line x1="660" y1="226" x2="653" y2="233" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
    <line x1="660" y1="226" x2="660" y2="243" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="660" cy="226" r="2.5" fill="${INK}"/>
    <rect x="640" y="258" width="40" height="42" rx="4" fill="#8B5A3C" stroke="${INK}" stroke-width="4"/>
    <rect x="564" y="216" width="52" height="40" fill="${COR.ceu}" stroke="${INK}" stroke-width="4"/>
    <rect x="704" y="216" width="52" height="40" fill="${COR.ceu}" stroke="${INK}" stroke-width="4"/>

    <!-- placa da rua -->
    <rect x="286" y="206" width="9" height="96" fill="#6B7290" stroke="${INK}" stroke-width="3"/>
    <rect x="228" y="176" width="124" height="34" rx="8" fill="#1E8E64" stroke="${INK}" stroke-width="3.5"/>
    <text x="290" y="199" text-anchor="middle" font-size="15" font-weight="800" fill="#fff" font-family="${FONTE_TEXTO}">Rua das Flores</text>
  `;
}

/* A "foto" da seção interativa: cenário + Théo sorrindo */
function fotoCena() {
  return svgWrap(cenario() + kid({ x: 430, y: 380, s: 1.2, mood: "smile" }));
}

/* ---------- As 6 cenas do vídeo ---------- */

/* Cena 1 — Théo tira a foto */
function cena1() {
  return svgWrap(`
    ${cenario()}
    ${kid({ x: 430, y: 380, s: 1.2, mood: "happy", phone: true })}
    <rect width="800" height="450" fill="#fff" opacity="0">
      <animate attributeName="opacity" values="0;0.95;0" keyTimes="0;0.15;1" begin="3.2s" dur="0.5s" fill="freeze"/>
    </rect>
  `);
}

/* Cena 2 — a foto "congela" e círculos mostram os segredos */
function cena2() {
  const k = 0.88, ox = 48, oy = 14;
  const T = (x, y) => [x * k + ox, y * k + oy];
  const anel = (x, y, r, rotulo, i, lx, ly) => {
    const [cx, cy] = T(x, y);
    const t0 = 1.2 + i * 2.2;
    const larg = Math.round(rotulo.length * 9.2 + 36); // pílula acompanha o tamanho do texto
    return `<g opacity="0">${aparece(t0)}
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${COR.coral}" stroke-width="6" stroke-dasharray="12 8">
        <animate attributeName="r" values="${r};${r + 7};${r}" dur="1.4s" repeatCount="indefinite"/>
      </circle>
      <g transform="translate(${lx} ${ly})">
        <rect x="${-larg / 2}" y="-17" width="${larg}" height="34" rx="17" fill="${COR.coralEscuro}" stroke="${INK}" stroke-width="3"/>
        <text x="0" y="6" text-anchor="middle" font-size="16" font-weight="800" fill="#fff" font-family="${FONTE_TEXTO}">${rotulo}</text>
      </g></g>`;
  };
  return svgWrap(`
    <rect width="800" height="450" fill="#EAF3FF"/>
    <rect x="34" y="6" width="732" height="438" rx="10" fill="#fff" stroke="${INK}" stroke-width="4"/>
    <g transform="translate(${ox} ${oy}) scale(${k})">${cenario()}${kid({ x: 430, y: 380, s: 1.2, mood: "smile" })}</g>
    ${anel(290, 193, 58, "A placa da rua", 0, 330, 96)}
    ${anel(430, 255, 52, "O nome da escola", 1, 430, 322)}
    ${anel(660, 200, 78, "Fachada e hora: 7:30", 2, 630, 322)}
  `);
}

/* Cena 3 — jogo online (esq.) + perfil suspeito no chat (dir.) */
function cena3() {
  const msg = (y, texto, t0) => `<g opacity="0">${aparece(t0)}
      <rect x="434" y="${y}" width="322" height="46" rx="16" fill="#E4ECFF" stroke="${INK}" stroke-width="3"/>
      <text x="454" y="${y + 30}" font-size="19" font-weight="700" fill="${INK}" font-family="${FONTE_TEXTO}">${texto}</text></g>`;
  return svgWrap(`
    <rect width="800" height="450" fill="#EAF3FF"/>

    <rect x="24" y="30" width="362" height="392" rx="22" fill="#3B2C85" stroke="${INK}" stroke-width="4"/>
    <path d="M24 52 a22 22 0 0 1 22 -22 h318 a22 22 0 0 1 22 22 v22 h-362z" fill="#2B1F66"/>
    <text x="46" y="62" font-size="21" font-weight="800" fill="#fff" font-family="${FONTE_TITULO}">🎮 Jogo online</text>
    <g fill="${COR.sol}"><circle cx="70" cy="110" r="4"/><circle cx="330" cy="130" r="5"/><circle cx="110" cy="200" r="3"/><circle cx="350" cy="240" r="4"/><circle cx="60" cy="300" r="5"/></g>
    <rect x="150" y="96" width="108" height="32" rx="16" fill="${COR.sol}" stroke="${INK}" stroke-width="3"/>
    <text x="204" y="119" text-anchor="middle" font-size="18" font-weight="800" fill="${INK}" font-family="${FONTE_TITULO}">Théo</text>
    ${kid({ x: 204, y: 404, s: 0.95, mood: "smile" })}

    <rect x="414" y="30" width="362" height="392" rx="22" fill="#fff" stroke="${INK}" stroke-width="4"/>
    <path d="M414 52 a22 22 0 0 1 22 -22 h318 a22 22 0 0 1 22 22 v22 h-362z" fill="#FFE3E0"/>
    <text x="436" y="62" font-size="21" font-weight="800" fill="${INK}" font-family="${FONTE_TITULO}">💬 Chat do jogo</text>
    <circle cx="456" cy="116" r="22" fill="#4A5280" stroke="${INK}" stroke-width="3.5"/>
    <text x="456" y="125" text-anchor="middle" font-size="26" font-weight="800" fill="#fff" font-family="${FONTE_TITULO}">?</text>
    <text x="490" y="122" font-size="18" font-weight="800" fill="${INK}" font-family="${FONTE_TEXTO}">Amigo_Novo_99</text>
    ${msg(152, "Oi! Manda uma foto sua? 📸", 1.5)}
    ${msg(210, "Qual é o nome da sua escola?", 6)}
    ${msg(268, "E onde você mora?", 11)}
    <g opacity="0">${aparece(17, 0.5)}
      <rect x="450" y="340" width="290" height="50" rx="25" fill="${COR.coralEscuro}" stroke="${INK}" stroke-width="3.5"/>
      <text x="595" y="372" text-anchor="middle" font-size="19" font-weight="800" fill="#fff" font-family="${FONTE_TEXTO}">⚠️ Isso pode ser perigoso!</text>
    </g>
  `);
}

/* Cena 4 — Théo pensa e vai falar com a mãe */
function cena4() {
  return svgWrap(`
    <rect width="800" height="450" fill="#EAF3FF"/>
    <rect x="0" y="392" width="800" height="58" fill="#DDE3F5"/>
    <line x1="0" y1="392" x2="800" y2="392" stroke="${INK}" stroke-width="4"/>
    <g fill="#fff"><ellipse cx="120" cy="70" rx="44" ry="17"/><ellipse cx="152" cy="58" rx="30" ry="20"/></g>
    <g fill="#fff"><ellipse cx="640" cy="60" rx="40" ry="15"/><ellipse cx="666" cy="50" rx="26" ry="17"/></g>

    <!-- Théo pensando -->
    <g>${some(5.5)}
      ${kid({ x: 230, y: 410, s: 1.15, mood: "think" })}
      <g><circle cx="300" cy="140" r="7" fill="#fff" stroke="${INK}" stroke-width="3"/>
         <circle cx="322" cy="112" r="11" fill="#fff" stroke="${INK}" stroke-width="3"/>
         <ellipse cx="380" cy="74" rx="62" ry="40" fill="#fff" stroke="${INK}" stroke-width="3.5"/>
         <text x="380" y="88" text-anchor="middle" font-size="42" font-family="${FONTE_TEXTO}">🤔</text></g>
    </g>

    <!-- Théo com o celular, indo até a mãe -->
    <g opacity="0">${aparece(5.5)}
      ${kid({ x: 400, y: 410, s: 1.15, mood: "smile", phone: true })}
      <g opacity="0">${aparece(8)}${balao(300, 60, 320, 56, "Mãe, posso mostrar uma coisa?", { cauda: "nenhuma", fonte: 19 })}</g>
    </g>

    <!-- Mãe -->
    ${kid({ x: 640, y: 410, s: 1.3, mood: "smile", shirt: COR.violeta, hair: "#2B1A14", skin: "#C98B62", pants: "#3C3F6B", long: true, logo: false })}
    <g opacity="0">${aparece(12)}
      <text x="640" y="108" text-anchor="middle" font-size="52" font-family="${FONTE_TEXTO}">💙</text>
      <animateTransform attributeName="transform" type="translate" values="0 0;0 -8;0 0" dur="1.2s" begin="12s" repeatCount="indefinite"/>
    </g>
  `);
}

/* Cena 5 — as 5 Regras de Ouro, uma por vez */
function cena5() {
  const linhas = DATA.regrasCurtas.map((txt, i) => {
    const y = 84 + i * 68;
    const t0 = 0.6 + i * 6.4;
    const ic = DATA.regras[i].icone;
    return `<g opacity="0">${aparece(t0, 0.4)}
      <animateTransform attributeName="transform" type="translate" from="-50 0" to="0 0" begin="${t0}s" dur="0.45s" fill="freeze"/>
      <rect x="70" y="${y}" width="660" height="56" rx="20" fill="#fff" stroke="${INK}" stroke-width="3.5"/>
      <circle cx="110" cy="${y + 28}" r="21" fill="${COR.sol}" stroke="${INK}" stroke-width="3.5"/>
      <text x="110" y="${y + 37}" text-anchor="middle" font-size="24" font-weight="800" fill="${INK}" font-family="${FONTE_TITULO}">${i + 1}</text>
      <text x="158" y="${y + 38}" font-size="28" font-family="${FONTE_TEXTO}">${ic}</text>
      <text x="204" y="${y + 37}" font-size="23" font-weight="800" fill="${INK}" font-family="${FONTE_TEXTO}">${txt}</text>
    </g>`;
  }).join("");
  return svgWrap(`
    <rect width="800" height="450" fill="#FFF3CF"/>
    <text x="400" y="56" text-anchor="middle" font-size="40" font-weight="800" fill="${INK}" font-family="${FONTE_TITULO}">As Regras de Ouro</text>
    ${linhas}
  `);
}

/* Cena 6 — despedida com o mascote */
function cena6() {
  return svgWrap(`
    <rect width="800" height="450" fill="${COR.ceu}"/>
    <g fill="#fff"><ellipse cx="120" cy="80" rx="46" ry="18"/><ellipse cx="152" cy="66" rx="32" ry="21"/></g>
    <g fill="#fff"><ellipse cx="660" cy="70" rx="42" ry="16"/><ellipse cx="688" cy="58" rx="28" ry="18"/></g>
    <rect x="0" y="360" width="800" height="90" fill="#CFEAB8"/>
    <line x1="0" y1="360" x2="800" y2="360" stroke="${INK}" stroke-width="4"/>
    ${kid({ x: 270, y: 380, s: 1.2, mood: "happy", wave: true })}
    ${mascote(440, 120, 250)}
    <g opacity="0">${aparece(1.2)}${balao(560, 96, 250, 52, "Até a próxima!", { cauda: "nenhuma", fonte: 24 })}</g>
    <g opacity="0">${aparece(3)}
      <rect x="180" y="392" width="440" height="46" rx="23" fill="${COR.azul}" stroke="${INK}" stroke-width="3.5"/>
      <text x="400" y="423" text-anchor="middle" font-size="22" font-weight="800" fill="#fff" font-family="${FONTE_TEXTO}">🎯 Acesse o site e jogue o quiz!</text>
    </g>
  `);
}

const CENAS_SVG = [cena1, cena2, cena3, cena4, cena5, cena6];
