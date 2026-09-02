# Pipeline Visual de Alta Produção (Editorial & Cinematográfico)

Este pipeline é obrigatório para todas as skills visuais do Criativo AI Studio (`criar-post-individual`, `criar-carrossel`, `criar-post-anuncio`, `gerar-stories`). A imagem final é gerada via `generate_image` nativo do Antigravity IDE em aspect ratio `3:4` (1080×1350) para feed e `9:16` (1080×1920) para stories.

---

## 🚫 Proibições Absolutas (Anti-Padrões de IA)

- **NUNCA** gerar artes chapadas com fundo plano genérico e uma foto recortada sem iluminação ou sombras.
- **NUNCA** usar texto de tamanho único centralizado no meio da imagem como se fosse um meme amador.
- **NUNCA** gerar imagens sem inspecionar e passar as referências estéticas de `recursos/referencias/` no parâmetro `ImagePaths`.
- **NUNCA** inventar rostos aleatórios se houver fotos em `recursos/fotos/`.
- **NUNCA** poluir a imagem com parágrafos inteiros de texto. Textos longos causam erros de ortografia em modelos de IA e pertencem à **legenda**. Na arte visual entram apenas: Selo/Badge, Headline de Impacto, Subtítulo curto e CTA visual.

---

## 💎 Os 6 Pilares de uma Produção Visual Premium

### 1. Uso Obrigatório de Referências (`ImagePaths`)
Antes de gerar qualquer imagem, inspecione a pasta `recursos/referencias/` e passe de 1 a 2 referências estéticas mais a foto do usuário em `ImagePaths` (máximo 3 imagens).
O modelo generativo deve extrair das referências:
- O **estilo de diagramação** (ex: estilo revista internacional, editorial financeiro de luxo, brutalismo tech suave, poster tipográfico suíço).
- O **tratamento de iluminação e cor** (iluminação de recorte / rim lighting, contrastes profundos, paletas refinadas).
- Os **elementos gráficos de suporte** (molduras finas, tags, selos geométricos, separadores).

### 2. Composição Multicamada e Profundidade
A arte deve ter camadas visíveis que criam profundidade:
- **Camada de Fundo (Background):** Textura tátil, gradiente escuro refinado (dark mode elegante), ruído cinematográfico sutil, iluminação volumétrica ou ambientação de estúdio/escritório desfocada no fundo.
- **Camada Central (Ponto Focal):** A pessoa ou produto iluminada com luz direcional (rim light nas bordas combinando com a cor de destaque da marca), integrada harmonicamente com sombras de contato realistas.
- **Camada Gráfica (Overlays & UI):** Selos editoriais, badges, linhas guia minimalistas, marcadores e ícones de apoio que dão acabamento de produto profissional.
- **Camada Tipográfica (Foreground):** Textos nítidos, contrastantes e legíveis.

### 3. Hierarquia Tipográfica Rigorosa (4 Níveis)
Toda arte de feed ou anúncio deve conter exatamente 4 níveis tipográficos bem diferenciados:
1. **Selo de Categoria / Tag (Topo):** Pequeno, elegante, em caixa alta com espaçamento entre letras (tracking aberto) e moldura fina ou pill badge. Exemplo: `[ ESTRATÉGIA COM IA ]` ou `• GESTÃO EMPRESARIAL •`.
2. **Headline Dominante (Centro/Topo):** Peso pesado (Bold / Extra Bold 800+), tamanho dominante, alto contraste, quebra de linha harmoniosa (2 a 4 linhas no máximo).
3. **Subtítulo / Apoio (Abaixo da Headline):** Peso regular ou itálico sofisticado, 1 frase curta, cor secundária ou texto suave.
4. **Rodapé / Assinatura & CTA Visual:** No rodapé, o nome/perfil `@usuario.marketing` acompanhado de um CTA visual sutil com ícone (ex.: `Leia a legenda ↗` ou `Toque para salvar 🔖`).

### 4. Textos Curtos e Ortografia Impecável
Modelos de IA mantêm fidelidade ortográfica máxima quando o texto é conciso:
- Máximo de 8 a 15 palavras na arte inteira.
- Escreva a headline no prompt exatamente entre aspas duplas, em português correto com acentuação.
- O aprofundamento, método e detalhes vão na **legenda** do post.

### 5. Iluminação e Integração da Fotografia
- A foto fornecida em `recursos/fotos/` deve se fundir na atmosfera da arte.
- Iluminação de estúdio profissional: luz principal suave + luz de recorte (rim light) colorida na silhueta + sombras naturais.
- Expressão confiante, olhar direcionado ou atmosfera de autoridade no nicho.

### 6. Margens Seguras do Instagram
- Mantenha 10% de margem em todas as bordas (superior, inferior e laterais) para que nenhum texto ou elemento crítico seja cortado em diferentes telas ou na grade do perfil.

---

## 📋 Estrutura Padrão de Prompt para `generate_image`

Ao invocar `generate_image`, estruture o prompt com a seguinte riqueza de detalhes:

```text
Prompt: "Editorial magazine cover style graphic design for Instagram post (3:4 ratio, 1080x1350).
STYLING: Premium corporate editorial aesthetic inspired by Bloomberg Businessweek and Wired, luxury dark theme with deep charcoal #0D0D0D background, subtle ambient lighting, glowing accent details in brand color [COR_DESTAQUE].
COMPOSITION & LAYOUT:
- Top Header: Small minimalist badge tag saying '[CATEGORIA_EM_PORTUGUES]' in refined uppercase sans-serif with thin border.
- Main Headline: Prominent bold Brazilian Portuguese text reading '[HEADLINE_EXATA_AQUI]' in large high-contrast typography.
- Subtitle: Clean smaller secondary text reading '[SUBTITULO_CURTO_AQUI]'.
- Visual Subject: Professional high-end portrait of the person from the reference images, seamlessly integrated into the scene with cinematic rim lighting, realistic depth of field, and natural studio shadows.
- Supporting Graphics: Clean modern geometric UI badges, subtle grid lines, minimalist directional arrows.
- Bottom Footer: Minimalist author credit '@[USUARIO]' with a sleek CTA badge reading '[CTA_VISUAL]'.
AESTHETICS: Ultra-sharp, crisp graphic design typography, photorealistic person integration, high dynamic range, no generic clutter, perfectly aligned margins, magazine layout quality."
ImagePaths: ["recursos/referencias/referencia-estilo.jpg", "recursos/fotos/foto-pessoa.jpg", "recursos/logos/logo.png"]
AspectRatio: "3:4"
```

---

## 🔍 Checklist de Qualidade Antes de Aprovar a Arte

- [ ] A arte parece uma produção de revista ou agência de design renomada?
- [ ] As referências em `recursos/referencias/` foram ativamente seguidas na diagramação?
- [ ] A pessoa/produto está organicamente integrada na luz e sombra da cena?
- [ ] A hierarquia tipográfica tem 4 níveis distintos (Selo, Título, Subtítulo, CTA/Assinatura)?
- [ ] O texto está 100% correto em português e legível no celular?
- [ ] As margens seguras (10%) foram respeitadas?
- [ ] O arquivo final é PNG ou JPEG em 1080×1350 (feed) ou 1080×1920 (stories)?
