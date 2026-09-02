# Pipeline Visual Adaptativo (Estilo Próprio por Marca)

Este pipeline é a fundação visual do Criativo AI Studio. **O Criativo AI Studio não possui um estilo visual fixo.** Ele é camaleônico: a estética, a iluminação, a paleta, a tipografia e a composição de cada arte devem derivar **estritamente das referências e da identidade visual fornecidas pelo usuário**.

A imagem final é gerada via `generate_image` nativo do Antigravity IDE em aspect ratio `3:4` (1080×1350) para feed e `9:16` (1080×1920) para stories.

---

## 🎯 O Princípio Central: Respeito Total ao Estilo do Usuário

Cada negócio possui seu próprio universo estético:
- **Clínica de Estética / Saúde / Bem-estar:** Fundo claro, tons neutros, luz natural suave, sofisticação clean.
- **Gastronomia / Vinhos / Carnes:** Texturas rústicas, luz quente e dramática, fotografia apetitosa de produto.
- **Moda / Arquitetura / Decoração:** Editorial minimalista, fotografia de autor, espaço negativo generoso, elegância atemporal.
- **Educação / Negócios / Consultoria:** Clareza, seriedade acolhedora, diagramação estruturada.
- **Tech / Startups / IA:** Moderno, dinâmico, paletas contrastantes ou dark mode refinado.

O agente **NUNCA** deve impor um estilo pessoal (como forçar dark mode ou layouts técnicos) se as referências do usuário apontarem para outra direção.

---

## 🎨 Como Extrair o Estilo das Referências (`recursos/referencias/`)

Antes de gerar qualquer peça, o agente deve inspecionar visualmente as imagens em `recursos/referencias/` e identificar:

1. **Atmosfera e Luminosidade:** O estilo é *high-key* (claro, luminoso, luz natural) ou *low-key* (escuro, intimista, dramático)?
2. **Paleta Dominante:** Quais são as cores de fundo, texto e contraste presentes nas referências e no `identidade-visual.yml`?
3. **Diagramação e Ritmo:** O texto fica no topo, na lateral, em caixas flutuantes, ou integrado sobre a imagem? As formas são geométricas, orgânicas ou puramente tipográficas?
4. **Tratamento Fotográfico:** A fotografia é espontânea, de estúdio, lifestyle, macro ou conceitual?
5. **Elementos Gráficos:** As referências usam selos, molduras, linhas finas, texturas, ícones, ou são 100% fotográficas e limpas?

Ao chamar `generate_image`, passe até 2 referências estéticas de `recursos/referencias/` + a foto/produto de `recursos/fotos/` no parâmetro `ImagePaths` para que o gerador absorva o estilo visual exato da marca.

---

## 📐 Princípios Universais de Qualidade de Design

Independentemente do estilo da marca (seja clean, rústico, luxuoso ou vibrante), toda arte gerada deve seguir estes princípios universais:

### 1. Hierarquia Visual Intencional
O olhar de quem rola o feed deve saber instantaneamente onde focar:
- **Ponto Focal:** A imagem principal (pessoa, produto, ambiente ou ilustração) ou a headline deve ser o elemento dominante.
- **Títulos e Subtítulos:** Contraste tipográfico claro entre o que é título principal e o que é texto de apoio.
- **Identificação da Marca:** Logotipo, selo editorial ou assinatura `@usuario` discretos e harmônicos com a composição.

### 2. Integração Fotográfica e Harmonia
- A foto da pessoa ou produto fornecida deve estar em harmonia com a luz, sombras e cores do cenário de fundo.
- Evite aspecto de recorte artificial solto sem sombras ou luz de contato.

### 3. Textos Concisos e Ortografia Perfeita
- Textos na imagem devem ser curtos e diretos (máximo 8 a 15 palavras).
- Textos longos prejudicam a estética e aumentam chances de falhas tipográficas na IA. Detalhes, argumentos e desenvolvimento devem ser desenvolvidos na **legenda**.

### 4. Margens Seguras do Instagram
- Mantenha sempre 10% de margem livre em todas as bordas para evitar cortes em diferentes aparelhos e na grade do feed.

---

## 📋 Estrutura Dinâmica de Prompt para `generate_image`

O prompt deve descrever a direção de arte com base no que foi extraído dos arquivos da marca:

```text
Prompt: "Professional graphic design for Instagram post (3:4 aspect ratio, 1080x1350).
STYLE & MOOD: [DESCREVER_A_ATMOSFERA_DAS_REFERENCIAS_DO_USUARIO: ex: Clean and airy Scandinavian aesthetic / Warm rustic culinary lighting / Sophisticated luxury editorial / High-tech modern vibrant], utilizing the brand color palette ([COR_FUNDO], [COR_TEXTO], [COR_DESTAQUE]).
COMPOSITION:
- Layout inspired by the provided reference images in ImagePaths.
- Headline: Clear high-contrast text in Brazilian Portuguese reading '[HEADLINE_EXATA_AQUI]'.
- Supporting text: Clean subtitle reading '[SUBTITULO_AQUI]'.
- Subject: [PESSOA/PRODUTO] from the reference photos naturally integrated with matching lighting and realistic environment.
- Details: [ELEMENTOS_ESPECIFICOS_DA_MARCA: selos, grafismos ou minimalismo puro conforme o design system].
- Branding: Subtle brand identification '@[USUARIO]'.
QUALITY: Ultra-crisp graphic design, beautiful typography hierarchy, photorealistic lighting matching the brand's aesthetic, perfect margins."
ImagePaths: ["recursos/referencias/referencia-estilo.jpg", "recursos/fotos/foto-usuario.jpg"]
AspectRatio: "3:4"
```

---

## 🔍 Quality Gates Visuais

- [ ] A arte reflete fielmente o estilo, cores e clima das referências em `recursos/referencias/`?
- [ ] A paleta de cores respeita `conteudos/identidade-visual.yml` e `tokens.css`?
- [ ] O texto está correto em português e legível no smartphone?
- [ ] O layout tem hierarquia clara e margens seguras?
