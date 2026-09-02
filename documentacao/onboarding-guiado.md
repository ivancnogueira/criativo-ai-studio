# Onboarding Guiado — Criativo AI Studio

Este guia define o fluxo do onboarding no Criativo AI Studio. O processo é um funil progressivo de 6 marcos que transforma um repositório recém-instalado em uma máquina de produção de conteúdo ativo e integrado.

---

## 🗺️ Visão Geral dos 6 Marcos

1. **Instalação** — Dependências, ambiente Node.js 20+, criação do `.env` local e diretórios.
2. **Perfil da Marca** — Negócio, público, oferta, mecanismo, voz e limites.
3. **Identidade Visual** — Fotos, logo, referências, cores, fontes, brandbook e direção da 1ª peça.
4. **Configurações** — Meta API, GitHub Pages e validação de conexões reais.
5. **Primeiro Post e Preview** — Briefing, copy, arte editorial via `generate_image`, preview mobile e vitrine.
6. **Postagem Oficial** — Upload para Pages, dry-run, job auditável, aprovação no chat e publicação.

---

## Marco 1 — Instalação

- Verifique se Node.js 20+ e Git estão disponíveis.
- Garanta que as dependências estejam instaladas (`npm install`).
- Garanta que o `.env` exista com os padrões de execução local:
  ```text
  APP_MODE=local
  PREVIEW_HOST=127.0.0.1
  PREVIEW_PORT=4173
  ```
- Garanta a existência das pastas `conteudos/`, `documentacao/`, `recursos/fotos/`, `recursos/logos/`, `recursos/referencias/`, `saidas/`, `previas/`, `runtime/` e `logs/`.
- Instale as skills como comandos de barra para que o usuário possa usar `/criar-carrossel`, `/gerar-stories`, etc:
  ```powershell
  npm run instalar-skills
  ```
- Mostre a tabela dos 6 marcos e avance para o Marco 2.

---

## Marco 2 — Perfil da Marca

Colete em blocos curtos, sem repetições cansativas:
- **Bloco 1 (Negócio):** Nome, especialidade/nicho e localização ou formato de atuação.
- **Bloco 2 (Público & Dores):** Quem é o cliente ideal, suas dores e aspirações.
- **Bloco 3 (Oferta & Diferencial):** O que é vendido, mecanismo único e provas/casos.
- **Bloco 4 (Voz & Regras):** Tom de voz, vocabulário característico e restrições.

Salve no formato estruturado em `conteudos/perfil-da-marca.md` e avance para o Marco 3.

---

## Marco 3 — Identidade Visual

1. **Inventário de Ativos:**
   - Peça ao usuário para colocar suas fotos em `recursos/fotos/`, logo/favicon em `recursos/logos/` e referências estéticas em `recursos/referencias/` (ou informar se usará sem fotos/logo provisoriamente).
2. **Cores e Tipografia:**
   - Extraia ou colete a paleta (fundo, texto, primária de destaque, acento) e fontes de título e leitura.
3. **Direção de Arte da 1ª Peça (Editorial Premium):**
   - Escolha o território visual (ex: Revista de Negócios / Bloomberg Style, Editorial Tech, Brutalismo Elegante).
   - Defina o selo, headline, subtítulo e CTA visual.
4. **Sincronização das 5 Camadas:**
   - Atualize `brandbook.md`, `design-system.md`, `tokens.css`, `briefing-visual.md` e `identidade-visual.yml`.
   - Peça aprovação da direção visual e avance para o Marco 4.

---

## Marco 4 — Configurações

1. Oriente a criação e configuração do aplicativo na Meta (Instagram Graph API) e do repositório público no GitHub Pages.
2. Peça ao usuário para preencher o `.env` local diretamente com suas credenciais.
3. Execute `npm run validar:integracoes` para validar a conexão real com a Meta e o GitHub Pages.
4. Com a conexão validada, avance para o Marco 5.

---

## Marco 5 — Primeiro Post e Preview

1. **Briefing e Copy:** Crie a copy persuasiva (gancho, desenvolvimento, CTA e legenda completa).
2. **Produção Visual de Revista:**
   - Inspecione `recursos/referencias/` e `recursos/fotos/`.
   - Invoque `generate_image` passando a referência estética e a foto em `ImagePaths`.
   - Garanta a hierarquia em 4 níveis (Selo no topo, Título 800+, Subtítulo e Rodapé com `@usuario` e CTA).
3. **Prévia e Vitrine:**
   - Salve a imagem em `saidas/posts-individuais/{slug}/slide-01.png`.
   - Crie `publicacao.json`.
   - Gere a prévia com `npm run criar-previa -- saidas/posts-individuais/{slug}/publicacao.json`.
   - Atualize a vitrine com `npm run atualizar-vitrine`.
   - Apresente o link do preview local ou abra a página para revisão visual.
   - Aplique ajustes caso solicitados. Com a arte aprovada visualmente, avance para o Marco 6.

---

## Marco 6 — Postagem Oficial

1. **Upload para o GitHub Pages:** Execute `npm run pages:publicar -- saidas/posts-individuais/{slug}/publicacao.json`.
2. **Validação:** Execute `npm run pages:validar -- saidas/posts-individuais/{slug}/publicacao.json`.
3. **Dry-Run e Criação do Job:**
   - Execute o dry-run com `npm run publicar-instagram -- saidas/posts-individuais/{slug}/publicacao.json`.
   - Crie o job com `npm run aprovar:criar -- saidas/posts-individuais/{slug}/publicacao.json`.
4. **Aprovação Auditável:**
   - Mostre o ID do job (ex.: `POST-001`) e solicite no chat a resposta exata `APROVAR POST-001`.
   - Após a resposta do usuário, execute:
     ```powershell
     npm run aprovar:local -- POST-001 "APROVAR POST-001"
     ```
5. **Publicação Oficial:**
   - Dispare a publicação oficial via Meta API:
     ```powershell
     npm run publicar-instagram:aprovado -- saidas/posts-individuais/{slug}/publicacao.json runtime/fila/POST-001.json
     ```
   - Registre o `mediaId` e o `permalink` retornado pelo Instagram.
6. **Finalização:**
   - Atualize `conteudos/estado-do-studio.yml` para `status: pronto`.
   - Execute `npm test` e `npm run diagnosticar`.
   - Apresente o resumo final e encerre o onboarding comemorando o primeiro post publicado!
