# Instruções para o Antigravity IDE

Este repositório é uma ferramenta local e genérica de produção de conteúdo premium para Instagram. Personalize o sistema somente com os dados e ativos fornecidos pelo usuário desta instalação.

## Antes de trabalhar

1. Leia `README.md` e, em instalações novas, `INSTALAR.md`.
2. Consulte os arquivos existentes em `conteudos/` antes de criar ou alterar conteúdo.
3. Preserve configurações e respostas já preenchidas; não substitua conteúdo do usuário sem autorização.
4. Use somente fotos, logos e referências que o usuário tenha fornecido ou autorizado.
5. Leia as skills em `.agents/skills/` para entender os fluxos disponíveis.

## Onboarding

Quando o usuário pedir para instalar, configurar ou iniciar o projeto:

Leia e siga integralmente `documentacao/onboarding-guiado.md`. Trate a instalação como um único processo: mostre os seis marcos antes da primeira pergunta, exiba o progresso em cada interação e continue automaticamente para a etapa segura seguinte. Não encerre com "quer continuar?" nem com um próximo passo sem nome, resultado e responsável.

### Os seis marcos

1. **Instalação** — verificar Node.js 20+, dependências e ambiente.
2. **Perfil** — coletar negócio, público, oferta, posicionamento, voz, objetivos e restrições em blocos curtos.
3. **Identidade Visual** — inventário de fotos, logo, referências e direitos; cores; fontes; referências; direção de arte da primeira peça; aprovação.
4. **Configurações** — Meta API, GitHub Pages; executar `npm run validar:integracoes`.
5. **Primeiro Post** — briefing, copy, arte premium via `generate_image`, preview e ajustes.
6. **Postagem** — dry-run, job de aprovação, confirmação `APROVAR ID-DO-JOB`, publicação.

Atualize `conteudos/estado-do-studio.yml` após cada marco. Só declare o Studio instalado quando a primeira publicação real estiver registrada.

## Roteamento de skills

Use a skill adequada à tarefa. O Antigravity IDE lê automaticamente as skills em `.agents/skills/`:

- estratégia, calendário ou ideias → `planejar-conteudo`
- texto, gancho, legenda ou revisão verbal → `copywriter-instagram`
- sequência de slides → `criar-carrossel`
- arte única orgânica → `criar-post-individual`
- criativo de mídia paga → `criar-post-anuncio`
- stories para Instagram → `gerar-stories`
- criar ou redesenhar identidade, logo ou brandbook → `criar-identidade-visual`
- credenciais, diagnóstico Meta ou publicação → `configurar-instagram`
- análise de performance de posts → `analise-metricas`

Uma solicitação pode atravessar skills em sequência. Registre o handoff; não faça todas repetirem o briefing.

## Geração de imagens

O Criativo AI Studio usa exclusivamente `generate_image` do Antigravity IDE para gerar artes. Não use SVG, HTML ou canvas como ferramenta de geração de arte — esses formatos servem apenas para preview.

### Pipeline visual

1. Ler as 5 camadas de identidade em `recursos/brand/` e `conteudos/identidade-visual.yml`.
2. Inspecionar `recursos/fotos/`, `recursos/logos/` e `recursos/referencias/`.
3. Definir direção visual antes de gerar.
4. Escrever prompts detalhados com invariantes de marca.
5. Usar `generate_image` com aspect ratio `3:4` (feed) ou `9:16` (stories).
6. Passar fotos e referências como `ImagePaths` para consistência visual.
7. Salvar resultados em `saidas/` no diretório correto por tipo.

Leia `documentacao/agentes/pipeline-visual.md` para o pipeline completo.

### Formatos

| Formato | Dimensão | Aspect Ratio |
|---------|----------|-------------|
| Post Individual | 1080×1350 | 3:4 |
| Carrossel | 1080×1350 | 3:4 |
| Anúncio | 1080×1350 | 3:4 |
| Stories | 1080×1920 | 9:16 |

## Arquivos de trabalho

- `conteudos/` — perfil, identidade visual, pilares, ideias e campanhas.
- `recursos/brand/` — design system e tokens visuais aprovados.
- `recursos/` — fotos, logos e referências do próprio usuário.
- `saidas/` — imagens e manifestos gerados.
- `previas/` — páginas HTML locais para revisão.
- `runtime/` e `logs/` — estado e auditoria locais, nunca versionados.

## Segurança e publicação

- Credenciais ficam exclusivamente no `.env` local e nunca devem aparecer em respostas, logs ou commits.
- A publicação exige identificador único, remetente autorizado, aprovação explícita e registro de auditoria.
- Não considere respostas vagas como aprovação.
- Use apenas a API oficial da Meta para Instagram e, quando a extensão opcional estiver ativa, o bot do Telegram configurado pelo usuário.
- Antes de uma ação externa, confirme que o usuário pediu a ação e que o job correto está aprovado.

## Identidade visual

As cinco camadas de identidade devem estar sincronizadas:

1. `recursos/brand/brandbook.md` — fundamento, território e regras
2. `recursos/brand/design-system.md` — decisões executáveis
3. `recursos/brand/tokens.css` — valores exatos
4. `conteudos/identidade-visual.yml` — configuração estruturada
5. `recursos/brand/briefing-visual.md` — direção da primeira peça

Não gere arte enquanto algum desses arquivos tiver `A definir` ou `pendente` em decisões essenciais.

## Quality gates

O onboarding só fica `pronto` quando:

- público, oferta, transformação, voz e restrições não estão genéricos
- inventário de fotos, logo, referências e direitos de uso está decidido e registrado
- identidade visual e direção da primeira arte estão explicitamente aprovadas
- existem de três a cinco pilares distintos
- primeiro briefing tem objetivo, público, mensagem, formato, CTA e fontes
- primeiro post tem PNG final, manifesto e preview revisados
- o post individual foi aprovado em job auditável e publicado pela Meta
- o ID e o permalink retornados foram registrados sem expor credenciais
