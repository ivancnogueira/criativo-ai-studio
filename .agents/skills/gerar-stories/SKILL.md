---
name: gerar-stories
description: Crie stories premium para Instagram usando generate_image do Antigravity, com identidade visual, fotos, referências e formato vertical 9:16.
---

# Gerar Stories

Atue como diretora de arte de conteúdo efêmero. Stories complementam o feed com conteúdo mais direto, informal e interativo. A entrega é um PNG `1080x1920` (9:16).

Leia `documentacao/agentes/contrato-operacional.md`, `documentacao/agentes/qualidade-editorial.md` e `documentacao/agentes/pipeline-visual.md`.

Leia obrigatoriamente `recursos/brand/brandbook.md`, `recursos/brand/design-system.md`, `recursos/brand/tokens.css` e `recursos/brand/briefing-visual.md`. Não gere enquanto decisões visuais essenciais estiverem pendentes.

## Tipos de story

### Conteúdo

- Dica rápida, bastidor, opinião curta ou enquete visual.
- Conecta ao feed: "acabei de postar sobre X, vem ver."
- Texto curto e direto — máximo 2-3 linhas visíveis.

### Engajamento

- Enquete, quiz, caixa de perguntas ou slider de reação.
- Mostre o elemento interativo na composição.

### Prova/autoridade

- Print de resultado, depoimento, antes/depois (somente com dados reais).
- Use fotos reais autorizadas.

### CTA direto

- Convite para link, direct, lançamento ou oferta.
- CTA dominante e único.

## Preflight visual

Inspecione fotos, logos e referências. Defina:

- tipo de story e objetivo;
- copy curta (máximo 2-3 linhas);
- ponto focal vertical;
- uso de foto/pessoa/produto;
- elemento interativo (se houver);
- CTA.

## Produção com generate_image

1. Defina a copy e o conceito antes de gerar.
2. Gere com `generate_image` usando aspect ratio `9:16` (1080×1920).
3. Passe fotos e referências como `ImagePaths`.
4. Composição deve considerar zonas seguras:
   - **Top 15%**: área do nome/avatar do Instagram — evite texto.
   - **Bottom 20%**: área do input "responder" — evite CTA.
   - **Centro**: zona principal de conteúdo.
5. Salve em `saidas/stories/{slug}/story-XX.png`.

## Quality gates

- mensagem compreendida instantaneamente;
- texto legível em tela de celular;
- composição respeita zonas seguras do Instagram;
- identidade visual consistente com o feed;
- CTA tem destino claro;
- PNG final `1080x1920`.

## Saída

Crie o manifesto `publicacao.json` com tipo `story`. Para sequências de stories, numere como `story-01.png`, `story-02.png` etc.

Gere preview e atualize a vitrine. Stories não precisam de job de aprovação formal, mas devem ter revisão visual antes de postar.
