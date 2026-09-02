# Instruções para o Antigravity IDE — Criativo AI Studio

Este repositório é uma fundação local e adaptável de produção de conteúdo premium para Instagram. O sistema é camaleônico e molda-se ao estilo, nicho, cores e referências de cada negócio atendido.

---

## 🧭 Princípios Fundamentais

1. **Estilo Camaleônico (Guiado pelas Referências do Usuário):**
   - **NÃO imponha um estilo fixo.** Cada marca possui sua própria identidade (clean, rústico, corporativo, vibrante, luxuoso, minimalista ou tech).
   - **SEMPRE** inspecione visualmente as imagens em `recursos/referencias/` para absorver o estilo, diagramação, iluminação e atmosfera visual desejada pelo usuário.
   - Passe as referências estéticas e a foto/produto em `ImagePaths` no `generate_image` para que a geração respeite a direção visual da marca.
   - Respeite rigorosamente a paleta de cores e fontes definidas em `conteudos/identidade-visual.yml` e `recursos/brand/tokens.css`.
   - Garanta princípios universais de bom design: hierarquia visual clara, integração natural de luz e sombras, textos curtos e corretos em português (8 a 15 palavras na arte) e margens seguras (10%).

2. **Preservação de Dados:**
   - Preserve configurações e respostas preenchidas em `conteudos/` e `recursos/brand/`. Nunca apague ou substitua informações sem autorização expressa.

3. **Segurança de Credenciais:**
   - Credenciais ficam exclusivamente no `.env` local. Nunca solicite, exiba ou comente valores de tokens no chat.

---

## 🗺️ Onboarding Guiado (6 Marcos Contínuos)

Quando o usuário iniciar ou pedir para conduzir o onboarding, siga `documentacao/onboarding-guiado.md` como um processo contínuo e fluido:

1. **Marco 1 — Instalação:** Verificar Node.js 20+, dependências, `.env` criado automaticamente com modo local e integridade de diretórios.
2. **Marco 2 — Perfil:** Coletar negócio, público, oferta, posicionamento, voz, objetivos e restrições em blocos curtos, salvando em `conteudos/perfil-da-marca.md`.
3. **Marco 3 — Identidade Visual:**
   - Inventário em `recursos/fotos/`, `recursos/logos/` e `recursos/referencias/`.
   - Extrair o estilo estético das referências do usuário e registrar a paleta e fontes em `identidade-visual.yml`.
   - Sincronizar `brandbook.md`, `design-system.md`, `tokens.css`, `briefing-visual.md` e `identidade-visual.yml`.
   - Obter aprovação explícita da direção visual antes de produzir artes.
4. **Marco 4 — Configurações:**
   - Orientar criação do app Meta e do repositório público no GitHub Pages, com preenchimento exclusivo no `.env` local.
   - Executar `npm run validar:integracoes` para testar a conexão real.
5. **Marco 5 — Primeiro Post e Preview:**
   - Criar briefing e copy persuasiva alinhada à voz da marca.
   - Gerar arte premium no estilo das referências com `generate_image` (1080×1350) passando fotos e referências em `ImagePaths`.
   - Gerar prévia com `npm run criar-previa` e vitrine com `npm run atualizar-vitrine`.
   - Apresentar o link da prévia mobile para revisão visual do usuário.
6. **Marco 6 — Postagem Oficial:**
   - Enviar arte e prévia ao GitHub Pages (`npm run pages:publicar`).
   - Fazer dry-run e criar o job de aprovação auditável (`npm run aprovar:criar`).
   - Solicitar a confirmação exata `APROVAR ID-DO-JOB` no chat.
   - Após a resposta, aprovar localmente (`npm run aprovar:local`) e publicar oficialmente via Meta Graph API (`npm run publicar-instagram:aprovado`).
   - Atualizar `conteudos/estado-do-studio.yml` para `pronto` com `mediaId` e permalink registrados.
   - Executar `npm test` e `npm run diagnosticar`.

---

## 🎛️ Roteamento de Skills (`.agents/skills/`)

- `planejar-conteudo` — Estratégia editorial, pilares, pautas e briefs estruturados.
- `copywriter-instagram` — Redação de headlines, legendas persuasivas e CTAs com a voz da marca.
- `criar-post-individual` — Peças orgânicas de imagem única moldadas no estilo visual do usuário (1080×1350).
- `criar-carrossel` — Sequências narrativas de múltiplos slides com consistência visual (1080×1350).
- `criar-post-anuncio` — Criativos de tráfego pago focados em hipóteses e conversão (1080×1350).
- `gerar-stories` — Conteúdos verticais dinâmicos respeitando zonas seguras (1080×1920).
- `criar-identidade-visual` — Brandbook, design system e tokens de marca.
- `configurar-instagram` — Integração com Meta API, GitHub Pages e fluxo de aprovação.
- `analise-metricas` — Diagnóstico de performance de posts e otimizações orientadas a dados.

---

## 📐 Formatos e Resoluções

| Formato | Dimensão | Aspect Ratio no `generate_image` |
|---------|----------|----------------------------------|
| Post Individual | 1080×1350 | `3:4` |
| Carrossel (cada slide) | 1080×1350 | `3:4` |
| Anúncio no Feed | 1080×1350 | `3:4` |
| Stories | 1080×1920 | `9:16` |
