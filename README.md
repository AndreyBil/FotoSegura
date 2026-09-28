# FotoSegura — Módulo Integrado v1 (Squad 8)

> **Sprint 4 — Integração ao design system.** Este site já reflete as mudanças
> descritas no relatório "Módulo Integrado (v1) e 1ª Versão do Artigo Científico":
> paleta oficial do site, grid de 12 colunas, navegação com os rótulos definidos
> pela squad de integração e quiz com 5 perguntas. Detalhes no final deste arquivo,
> em **"Mudanças da Sprint 4"**.
>
> URL interna prevista no site principal: `/trilha-criancas/fotos-e-privacidade`
> (este pacote é o módulo isolado, pronto para ser publicado nesse endereço).

Módulo educativo sobre **privacidade e compartilhamento de fotos** para crianças de 8 a 11 anos.
Feito só com **HTML, CSS e JavaScript puro** (sem bibliotecas, sem build).

## Como rodar no VS Code

1. Abra a pasta `fotosegura` no VS Code (`File > Open Folder`).
2. Instale a extensão **Live Server** (Ritwick Dey).
3. Clique com o botão direito em `index.html` > **Open with Live Server**.

Também funciona dando duplo clique em `index.html` (não usa módulos ES, então abre direto pelo arquivo).

> As fontes (Baloo 2 e Nunito) vêm do Google Fonts. Sem internet, o site usa fontes do sistema.

## Estrutura

```
fotosegura/
├── index.html        Estrutura da página (8 seções)
├── css/style.css     Todo o visual (variáveis de cor/fonte no topo)
├── js/
│   ├── data.js       TODO o conteúdo: textos, regras, quiz, checklist, roteiro do vídeo
│   ├── scenes.js     Ilustrações em SVG (Théo, foto interativa, 6 cenas do vídeo)
│   └── app.js        Lógica: menu, foto interativa, player, quiz, checklist
└── assets/favicon.svg
```

## Como cada parte do material virou página

| Seção do site | Origem |
|---|---|
| Início (boas-vindas) | Sprint 2 — Seção Hero |
| Vídeo | Sprint 2 — roteiro fechado "O Segredo por Trás da Foto" (6 cenas, 2min50s) |
| O que a sua foto pode revelar | Sprint 2 (texto) + Sprint 1 (riscos: fundo, uniforme, rotina) |
| Regras de Ouro | Sprint 2 (5 regras) + dicas práticas do protótipo Figma |
| Perigos + Disque 100 | Protótipo Figma (parte 4) + Sprint 1 (situações de risco) |
| Quiz "Posso compartilhar essa foto?" | Sprint 1 (jornada, etapa Prática) + protótipo (parte 5) |
| Checklist com progresso | Protótipo Figma (parte 6) |
| Peça ajuda + cartão das 3 regras | Sprint 2 (Peça Ajuda) + Sprint 1 (etapas Fixação e Saída) |

## O que editar (sem mexer no resto)

- **Textos, regras, perguntas do quiz, checklist, cenas do vídeo:** `js/data.js`.
- **Cores e fontes:** bloco `:root` no início de `css/style.css`.
- **Quiz:** cada pergunta tem `opcoes` e `certa` (posição da resposta certa, começando em 0). As alternativas são embaralhadas sozinhas.

## Trocar o vídeo provisório pelo vídeo final (Sprint 3)

Hoje o player mostra uma **animação do roteiro** (legendas + narração opcional por voz do navegador).
Quando o vídeo estiver pronto:

1. Coloque o arquivo em `assets/video/` (ex.: `o-segredo-por-tras-da-foto.mp4`).
2. Em `js/data.js`, preencha `videoArquivo` (e `legendasArquivo`, em `.vtt`, para acessibilidade).

O player animado é substituído automaticamente por um `<video controls>`.

## Pendências / decisões para o time

- **Arte final:** o mascote e o Théo são desenhos provisórios em SVG. O mascote ainda não tem nome oficial.
- **Link do site:** a cena final do vídeo diz "Acesse o site"; falta colocar a URL real quando existir.
- **Artigo científico:** aparece no wireframe da Sprint 1, mas é entrega da Sprint 4 — não incluído no MVP.
- **Regras de ouro:** a Sprint 1 fala em "3 regras de ouro" e a Sprint 2 em 5. O site usa as **5** (texto oficial) e o **cartão-resumo** final traz as **3 ideias-chave**. Vale alinhar com o professor.
- **Links do rodapé** (CGI.br, SaferNet, UNICEF, Cartilha): conferir se continuam ativos antes da entrega.
- **Dados estatísticos:** o site não cita números. Se for citar, usar fonte e ano exatos (critério da Sprint 1).

## Acessibilidade já incluída

Link "pular para o conteúdo", navegação por teclado com foco visível, legendas em todas as cenas,
`aria-live` no quiz e na foto interativa, contraste alto, botões grandes para toque e
respeito a `prefers-reduced-motion`.

## Salvamento no navegador

O progresso do checklist e a melhor pontuação do quiz ficam no `localStorage` do navegador (nada é enviado a servidor).

---

## Mudanças da Sprint 4 (Integração ao Design System)

Com base no relatório "Módulo Integrado (v1) e 1ª Versão do Artigo Científico", este pacote recebeu:

### 1. Paleta oficial do site
As variáveis de cor em `css/style.css` (bloco `:root`) passaram a usar os 6 tons
definidos pela squad de integração: Amarelo Vivo `#FFC83B`, Laranja Amigável `#FF7A59`,
Azul Céu `#4EA8DE`, Verde Turquesa `#2EC4B6`, Creme Suave `#FFF9E6` e Azul Noturno `#1E293B`.
Os **nomes** das variáveis antigas (`--sol`, `--coral`, `--menta`…) foram mantidos para não
quebrar nada; só os **valores hexadecimais** mudaram. As mesmas cores foram replicadas no
mascote (SVG no `index.html`), no favicon e nas ilustrações do vídeo (`js/scenes.js`).

Dois ajustes de contraste foram feitos para cumprir o padrão de acessibilidade do site:
- O botão primário (`.btn--azul`) usa fundo Azul Noturno (não Azul Céu), porque texto
  branco sobre Azul Céu puro não atinge contraste mínimo de leitura.
- Links de texto usam `--azul-link` (#1C6EA4, um Azul Céu escurecido) em vez do Azul Céu
  original, pelo mesmo motivo.

### 2. Grid de 12 colunas
Nova classe utilitária `.grid12` em `css/style.css`, aplicada aos cards de "O que é
privacidade digital?" (4 cards, 3 colunas cada em telas grandes), aos "Ajustes extras" e
aos cards de "Perigos" (3 cards, 4 colunas cada). Em celular, todos os cards empilham em
1 coluna automaticamente.

### 3. Navegação global
O menu principal agora usa exatamente os rótulos do relatório: **Início · O que é
privacidade · Dicas · Perigos · Quiz · Guia**. A antiga seção "O que a sua foto pode
revelar" (foto interativa) passou a fazer parte da seção **O que é privacidade**, junto
com os 4 cards conceituais — como no wireframe original da Sprint 1. A seção de Regras
de Ouro é o destino do item **Dicas**. As seções de Vídeo e Peça Ajuda continuam na
página (acessíveis pelos botões do topo e pelo rodapé), só não aparecem mais no menu
principal, seguindo a lista oficial.

### 4. Quiz com 5 perguntas
Reduzido de 6 para 5 perguntas, como descrito no relatório ("quiz funcional com 5
perguntas e pontuação final exibida ao término"). A pergunta removida (sobre já ter
enviado uma foto e se arrepender) tinha o tema já coberto na seção Peça Ajuda.

### 5. Player de vídeo
Já estava de acordo com as boas práticas citadas (legendas sempre visíveis, sem
reprodução automática) — nenhuma mudança necessária aqui além das cores.

### Pendências que o relatório já lista para a Sprint 5 (não alteradas agora)
- Ajuste fino de responsividade em telas muito pequenas (< 360px).
- Revisão de contraste em dois cards de ícone.

Essas duas ficaram explicitamente marcadas como próximo passo no documento da Sprint 4,
então não foram tratadas neste pacote — mas a nova paleta já reduz parte do problema de
contraste, já que todas as combinações de cor de texto usadas agora têm razão de
contraste ≥ 4.5:1 (texto normal) ou ≥ 3:1 (texto grande em negrito), com exceção dos
dois cards que o próprio relatório já sinalizou para revisão futura.
