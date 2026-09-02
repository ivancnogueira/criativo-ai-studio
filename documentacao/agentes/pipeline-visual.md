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

### 🚫 REGRA CRÍTICA: Blindagem Anti-Cópia de Referências (Anti-Leakage)
- As imagens em `recursos/referencias/` pertencem a terceiros ou servem **EXCLUSIVAMENTE** para extração de diretrizes estéticas (layout, luz, textura, composição).
- **É ESTRITAMENTE PROIBIDO copiar ou deixar vazar para a imagem gerada**:
  - Nomes de profissionais, especialistas, designers, criadores ou marcas das referências (ex.: "Ivan Nogueira - Especialista em I.A.", "Boccalini Designer", etc.).
  - Arrobas (@handles), perfis de redes sociais ou links presentes nas imagens de referência (ex.: `@boccalini`).
  - Assinaturas, cargos, títulos, marcas d'água, carimbos, selos ou logos de terceiros.
  - Textos, copies ou slogans que façam parte das peças de referência.
- **FONTE ÚNICA DE IDENTIDADE**: A única assinatura/arroba permitida na imagem é a do usuário atual definida em `conteudos/identidade-visual.yml` (campo `usuario`) ou o nome/título oficial do titular em `conteudos/perfil-da-marca.md`. Se não houver @handle ou titular especificado, **não insira nenhum @, nome ou cargo inventado na imagem**.

---

## 📸 Seleção, Variação e Consistência Facial das Fotos (`recursos/fotos/`)

Quando a pasta `recursos/fotos/` contiver fotos da pessoa/titular da marca:

1. **Variação Ativa do Acervo (NÃO Repetir a Mesma Foto):**
   - Inspecione **todas as imagens** presentes em `recursos/fotos/` antes de cada geração.
   - **Alterne os ângulos, roupas e expressões** entre posts consecutivos: fotos de close, meio-corpo, corpo inteiro, postura séria/estratégica, momentos espontâneos ou em ação.
   - Nunca utilize repetidamente a mesma foto se o acervo contiver múltiplas opções disponíveis.

2. **Geração de Novas Composições com o Rosto do Usuário (*Facial Consistency*):**
   - O agente pode gerar **novos cenários, posturas, ambientes modernos ou iluminações de estúdio** preservando a identidade da pessoa.
   - Passe a foto selecionada do usuário em `ImagePaths`.
   - Inclua no prompt a instrução explícita de consistência facial:
     `"SUBJECT / FACIAL CONSISTENCY: The main person in the image MUST be the exact subject from the reference photo in ImagePaths, maintaining their authentic facial structure, facial features, skin tone, hair, and likeness. Place this exact person naturally in [CENARIO_DESEJADO: ex. modern high-tech office / warm studio setting / speaking with confidence], with realistic photorealistic lighting matching the scene."`

---

## 🏷️ Uso de Logo e Ícone da Marca (Quando Disponível)

Quando a marca possuir arquivos de logotipo ou ícone em `recursos/logos/`:

1. **Localização e Formatos:**
   - Inspecione `recursos/logos/` (ex: `logo.png`, `logo-dark.png`, `icone.png`, `simbolo.svg`).
   - Confirme se o arquivo está registrado em `conteudos/identidade-visual.yml` (`recursos.logo`).

2. **Como Incluir no `generate_image`:**
   - Adicione o caminho do logo/ícone em `ImagePaths` (ex: `["recursos/logos/logo.png", "recursos/referencias/ref.jpg", "recursos/fotos/foto.jpg"]`).
   - No prompt, especifique a posição exata e a aplicação:
     - **Canto Superior (Top-Left ou Top-Center):** Ideal para carrosséis institucionais, relatórios e posts autorais. Manter margem segura (mínimo 80px das bordas).
     - **Rodapé / Assinatura (Bottom-Left ou Bottom-Center):** Acompanhando sutilmente a identificação `@usuario`.
     - **Ícone / Símbolo:** Para peças minimalistas, preferir o símbolo/monograma isolado em vez do logo extenso.
   - Instrução de prompt: *"Subtly place the official brand logo/icon from ImagePaths in the top-left corner, preserving clean margins, crisp edges, and correct contrast against the background."*

3. **Quando NÃO houver arquivo de logo disponível:**
   - Utilize apenas a assinatura tipográfica limpa do `@usuario` oficial (conforme `identidade-visual.yml`).
   - **NUNCA invente um logo gráfico aleatório ou assinatura fictícia.**

---

## 📐 Princípios Universais de Qualidade de Design

Independentemente do estilo da marca (seja clean, rústico, luxuoso ou vibrante), toda arte gerada deve seguir estes princípios universais:

### 1. Hierarquia Visual Intencional
O olhar de quem rola o feed deve saber instantaneamente onde focar:
- **Ponto Focal:** A imagem principal (pessoa, produto, ambiente ou ilustração) ou a headline deve ser o elemento dominante.
- **Títulos e Subtítulos:** Contraste tipográfico claro entre o que é título principal e o que é texto de apoio.
- **Identificação da Marca:** Logotipo/ícone oficial (`recursos/logos/`) ou assinatura `@usuario` do projeto (`conteudos/identidade-visual.yml`), discretos e harmônicos. NUNCA use dados de terceiros.

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

O prompt deve descrever a direção de arte com base no que foi extraído dos arquivos da marca e conter a cláusula anti-cópia:

```text
Prompt: "Professional graphic design for Instagram post (3:4 aspect ratio, 1080x1350).
STYLE & MOOD: [DESCREVER_A_ATMOSFERA_DAS_REFERENCIAS_DO_USUARIO: ex: Clean and airy Scandinavian aesthetic / Warm rustic culinary lighting / Sophisticated luxury editorial / High-tech modern vibrant], utilizing the brand color palette ([COR_FUNDO], [COR_TEXTO], [COR_DESTAQUE]).
COMPOSITION:
- Layout inspired by the provided reference images in ImagePaths.
- Headline: Clear high-contrast text in Brazilian Portuguese reading '[HEADLINE_EXATA_AQUI]'.
- Supporting text: Clean subtitle reading '[SUBTITULO_AQUI]'.
- Subject: [PESSOA/PRODUTO] from the reference photos naturally integrated with matching lighting and realistic environment.
- Logo/Icon: [SE_HOUVER: Official brand logo from ImagePaths placed subtly in top-left with padding / SE_NAO_HOUVER: None].
- Branding: Subtle brand identification '@[USUARIO_ATUAL]' (or omitted if none provided).
STRICT NEGATIVE/ISOLATION INSTRUCTIONS:
- Do NOT copy, transcribe, or include any names, titles, credentials, handles, watermarks, signatures, or logos from the reference images (do NOT copy names like 'Ivan Nogueira', 'Boccalini', or any reference author/specialist text).
- Use reference images ONLY for lighting, layout structure, and aesthetic mood.
QUALITY: Ultra-crisp graphic design, beautiful typography hierarchy, photorealistic lighting matching the brand's aesthetic, perfect margins."
ImagePaths: ["recursos/referencias/referencia-estilo.jpg", "recursos/fotos/foto-usuario.jpg", "recursos/logos/logo.png"]
AspectRatio: "3:4"
```

---

## 🔍 Quality Gates Visuais (Bloqueantes)

- [ ] A arte reflete fielmente o estilo, cores e clima das referências em `recursos/referencias/`?
- [ ] **NENHUM nome, cargo, @handle, logo ou dado de terceiros das referências visuais vazou para a arte?** (Se houver vazamento de referência, REJEITE e gere novamente).
- [ ] **A foto utilizada varia em relação aos posts anteriores**, explorando a diversidade do acervo em `recursos/fotos/` e mantendo a consistência facial autêntica do titular?
- [ ] O logo ou ícone oficial da marca (se disponível em `recursos/logos/`) foi aplicado com respiro e sem distorções?
- [ ] A paleta de cores respeita `conteudos/identidade-visual.yml` e `tokens.css`?
- [ ] O texto está correto em português e legível no smartphone?
- [ ] O layout tem hierarquia clara e margens seguras?
