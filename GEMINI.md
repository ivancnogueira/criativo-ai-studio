# Instruções para o Antigravity IDE — Criativo AI Studio

Este repositório é uma fundação local e profissional de produção de conteúdo premium para Instagram. Personalize o sistema exclusivamente com os dados e ativos fornecidos pelo usuário desta instalação.

---

## 🧭 Princípios de Excelência Visual e Operacional

1. **Produção Visual de Revista (Anti-Genérico):**
   - **NUNCA** gere imagens planas, genéricas ou com texto de tamanho único jogado no meio.
   - O padrão visual deve parecer uma capa de revista de negócios internacional (ex.: Bloomberg Businessweek, Wired, Fast Company, Forbes).
   - **SEMPRE** inspecione `recursos/referencias/` e passe as referências estéticas e a foto do usuário em `ImagePaths` no `generate_image`.
   - Toda arte deve ter 4 níveis de hierarquia tipográfica: 1) Selo/Badge no topo, 2) Headline dominante em peso 800+, 3) Subtítulo curto de apoio, 4) Rodapé com assinatura `@usuario` e CTA visual.
   - Textos na imagem devem ser estritamente curtos (8 a 15 palavras) e 100% corretos em português com acentuação. O aprofundamento vai na legenda.

2. **Preservação e Não Repetição:**
   - Leia `README.md`, `INSTALAR-COM-ANTIGRAVITY.md` e `conteudos/` antes de agir.
   - Preserve respostas já preenchidas; nunca apague ou sobrescreva dados sem autorização.

3. **Segurança de Credenciais:**
   - Tokens e segredos ficam **exclusivamente** no `.env` local. Nunca solicite, exiba ou comente valores de tokens no chat.

---

## 🗺️ Onboarding Guiado (6 Marcos Contínuos)

Quando o usuário iniciar ou pedir para conduzir o onboarding, siga `documentacao/onboarding-guiado.md` como um processo contínuo e fluido:

1. **Marco 1 — Instalação:** Verificar Node.js 20+, dependências, `.env` criado automaticamente com modo local e integridade de diretórios.
2. **Marco 2 — Perfil:** Coletar negócio, público, oferta, posicionamento, voz, objetivos e restrições em blocos curtos, salvando em `conteudos/perfil-da-marca.md`.
3. **Marco 3 — Identidade Visual:**
   - Inventário em `recursos/fotos/`, `recursos/logos/` e `recursos/referencias/`.
   - Cores, fontes e território visual.
   - Sincronizar `brandbook.md`, `design-system.md`, `tokens.css`, `briefing-visual.md` e `identidade-visual.yml`.
   - Exigir aprovação explícita da direção de arte antes de produzir.
4. **Marco 4 — Configurações:**
   - Orientar criação do app Meta e do repositório público no GitHub Pages, com preenchimento exclusivo no `.env` local.
   - Executar `npm run validar:integracoes` para testar a conexão real.
5. **Marco 5 — Primeiro Post e Preview:**
   - Criar briefing e copy persuasiva.
   - Gerar arte editorial premium 1080×1350 com `generate_image` passando referências em `ImagePaths`.
   - Gerar preview com `npm run criar-previa` e vitrine com `npm run atualizar-vitrine`.
   - Apresentar o link da prévia mobile para revisão visual do usuário.
6. **Marco 6 — Postagem Oficial:**
   - Enviar arte e preview ao GitHub Pages (`npm run pages:publicar`).
   - Fazer dry-run e criar o job de aprovação auditável (`npm run aprovar:criar`).
   - Solicitar a confirmação exata `APROVAR ID-DO-JOB` no chat.
   - Após a resposta, aprovar localmente (`npm run aprovar:local`) e publicar oficialmente via Meta Graph API (`npm run publicar-instagram:aprovado`).
   - Atualizar `conteudos/estado-do-studio.yml` para `pronto` com `mediaId` e permalink registrados.
   - Executar `npm test` e `npm run diagnosticar`.

---

## 🎛️ Roteamento de Skills (`.agents/skills/`)

- `planejar-conteudo` — Estratégia editorial, pilares, pautas e briefs estruturados.
- `copywriter-instagram` — Redação de headlines de impacto, legendas persuasivas e CTAs.
- `criar-post-individual` — Peças orgânicas de imagem única com diagramação editorial premium (1080×1350).
- `criar-carrossel` — Sequências narrativas de múltiplos slides com capas de alto impacto (1080×1350).
- `criar-post-anuncio` — Criativos de tráfego pago focados em hipóteses e conversão (1080×1350).
- `gerar-stories` — Conteúdos verticais dinâmicos respeitando zonas seguras (1080×1920).
- `criar-identidade-visual` — Brandbook, design system e tokens de marca.
- `configurar-instagram` — Integração com Meta API, GitHub Pages e fluxo de aprovação.
- `analise-metricas` — Diagnóstico de performance de posts e otimizações orientadas a dados.

---

## 📐 Formatos e Resoluções Padrão

| Formato | Dimensão | Aspect Ratio no `generate_image` |
|---------|----------|----------------------------------|
| Post Individual | 1080×1350 | `3:4` |
| Carrossel (cada slide) | 1080×1350 | `3:4` |
| Anúncio no Feed | 1080×1350 | `3:4` |
| Stories | 1080×1920 | `9:16` |

---

## 🔒 Regras de Qualidade e Bloqueios

- Não avance para a geração de arte enquanto a identidade ou direção visual contiverem itens pendentes.
- Não publique posts sem validação prévia no preview mobile e confirmação exata do comando de aprovação.
- Trate qualquer inconsistência de ortografia ou imagem chapada regenerando a peça com prompt mais detalhado e referências em `ImagePaths`.
