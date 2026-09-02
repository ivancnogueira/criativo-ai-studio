# Pipeline visual premium

Use este pipeline em carrosséis, posts individuais, criativos de anúncio e stories. A imagem final é um PNG gerado via `generate_image` do Antigravity IDE; HTML serve somente para preview e vitrine.

## Preflight obrigatório

1. Leia `recursos/brand/brandbook.md`, `recursos/brand/design-system.md`, `recursos/brand/tokens.css`, `recursos/brand/briefing-visual.md`, `conteudos/identidade-visual.yml` e o perfil da marca.
2. Liste `recursos/fotos/`, `recursos/logos/` e `recursos/referencias/` sem alterar nada e confirme cada decisão registrada no briefing visual.
3. Inspecione visualmente apenas os ativos candidatos.
4. Confirme objetivo, formato, copy aprovada, CTA, quantidade de peças e destino.
5. Se o design system, o briefing visual ou a direção da peça ainda contiverem decisões essenciais como `A definir` ou `pendente`, interrompa a produção e peça ao usuário para completar.
6. Defina uma direção visual consistente (conceito, ponto focal, estrutura, componentes, texto, CTA e selo) antes de gerar a primeira imagem.

## Decisão de fonte visual

- **Pessoa real necessária:** use uma ou mais fotos autorizadas como referência via `ImagePaths`. Pode criar nova composição, cenário ou tratamento, mas deve preservar a identidade.
- **Fotografia existente já resolve:** passe a foto como `ImagePaths` para editar ou compor.
- **Pessoa não é necessária:** gere produto, objetos, ambiente, ilustração ou composição abstrata original.

Não invente um rosto para representar o usuário. Se a semelhança falhar após tentativas direcionadas, use a foto original ou uma direção sem rosto.

## Geração via generate_image

Quando `generate_image` estiver disponível, gere a arte uma peça por vez ou em pequenos lotes. Todo prompt deve fixar:

- finalidade e público;
- formato e aspect ratio (`3:4` para feed, `9:16` para stories);
- identidade da marca e direção visual;
- papel de cada foto e referência (passadas via `ImagePaths`);
- texto exato e curto entre aspas;
- hierarquia, enquadramento e margens seguras;
- elementos proibidos, inclusive texto extra e marcas d'água.

Para uma sequência de slides (carrossel), repita os elementos invariantes em todos os prompts para garantir consistência visual.

Passe fotos e referências como `ImagePaths` para que o gerador mantenha consistência com a pessoa/produto/marca real.

## Elementos de precisão

Quando possível, inclua texto exato diretamente no prompt do `generate_image`. Para dados muito críticos (preço, QR code, telefone), considere gerar a arte com área reservada e aplicar o dado depois via composição.

## Revisão visual bloqueante

Inspecione cada arte e confirme:

- identidade e anatomia coerentes;
- texto completo, correto e sem caracteres extras;
- contraste e legibilidade em tela pequena;
- margens seguras e ausência de cortes;
- logo correto e não deformado;
- consistência de paleta, tipografia, luz e tratamento;
- ausência de marcas, pessoas ou objetos não solicitados;
- dimensão final correta (1080×1350 para feed, 1080×1920 para stories).

Se uma peça falhar, regenere ou corrija somente aquela peça.

## Saída

- Carrossel: `saidas/carrosseis/{slug}/slide-01.png` até `slide-NN.png`.
- Post individual: `saidas/posts-individuais/{slug}/slide-01.png`.
- Anúncio: `saidas/posts-de-anuncio/{slug}/slide-01.png` e variantes.
- Stories: `saidas/stories/{slug}/story-01.png`.
- Manifesto: `publicacao.json` no mesmo diretório.
- Preview: `previas/{slug}.html` usando caminhos relativos para os PNGs.

Depois, execute `npm run atualizar-vitrine`, faça revisão e somente então crie o job com `npm run aprovar:criar -- CAMINHO_PUBLICACAO`.
