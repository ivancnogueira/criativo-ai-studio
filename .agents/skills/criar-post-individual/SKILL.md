---
name: criar-post-individual
description: Crie posts individuais premium para Instagram como PNG final usando generate_image do Antigravity, fotos, logos, referências, identidade visual, preview e aprovação.
---

# Criar Post Individual

Atue como diretora de arte de peças orgânicas de imagem única. O post precisa comunicar uma ideia forte sem depender de um carrossel para ser compreendido.

Leia `documentacao/agentes/contrato-operacional.md`, `documentacao/agentes/qualidade-editorial.md` e `documentacao/agentes/pipeline-visual.md`.

Leia obrigatoriamente `recursos/brand/brandbook.md`, `recursos/brand/design-system.md`, `recursos/brand/tokens.css` e `recursos/brand/briefing-visual.md` antes da direção de arte. Não gere enquanto decisões essenciais estiverem `A definir` ou `pendente`.

## Diagnóstico

Confirme objetivo, público, mensagem em uma frase, papel da legenda, CTA, destino, contexto de publicação e prova necessária. Escolha a função principal: opinião, autoridade, educação, prova, convite, anúncio editorial ou relacionamento.

Se houver mais de uma ideia central, recomende carrossel. Se o objetivo for mídia paga, encaminhe para `criar-post-anuncio`.

## Preflight e direção

Inspecione fotos, logos e referências autorizadas. Defina:

- ponto focal;
- hierarquia entre imagem, headline e apoio;
- composição, contraste, espaço negativo e margens;
- papel da pessoa ou produto;
- relação entre arte e legenda;
- território visual único.

## Produção

1. Confirme a copy curta da arte.
2. Crie de duas a três direções conceituais quando a escolha for relevante.
3. Selecione uma direção antes de gerar variações.
4. Gere com `generate_image` usando aspect ratio `3:4` (1080×1350).
5. Passe fotos e referências como `ImagePaths` para consistência visual.
6. Inclua texto exato no prompt entre aspas.
7. Salve em `saidas/posts-individuais/{slug}/slide-01.png`.

## Quality gates

- mensagem compreendida em até dois segundos;
- apenas um ponto focal dominante;
- texto correto e legível em tela pequena;
- arte adiciona significado, não apenas decoração;
- identidade, rosto, produto e logo corretos;
- legenda aprofunda sem repetir integralmente a imagem;
- CTA tem destino real;
- PNG final `1080x1350`.

## Saída

Crie o manifesto `publicacao.json`, o preview `previas/{slug}.html` e atualize a vitrine. Mantenha estado `rascunho` até revisão.

Crie o job de aprovação com `npm run aprovar:criar -- CAMINHO_PUBLICACAO`.
