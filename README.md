# FotoSegura — MVP (Squad 8)

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
