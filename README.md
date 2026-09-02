# Criativo AI Studio

Produção premium de conteúdo para Instagram usando Antigravity IDE e IA generativa.

O Criativo AI Studio é uma fundação local e instalável para organizar o perfil de um negócio, planejar conteúdo para Instagram e preparar o caminho para revisão, aprovação e publicação segura — tudo usando o poder da IA generativa.

## Comece aqui

Pré-requisitos: Node.js 20 ou superior e Antigravity IDE.

### Instalação

1. Extraia o arquivo zip em uma pasta de sua escolha.
2. Abra o terminal na pasta extraída e execute:

```powershell
npm install
npm run configurar
```

3. Abra a pasta no Antigravity IDE.
4. O agente detecta o projeto e conduz o onboarding automaticamente.

Leia [INSTALAR.md](INSTALAR.md) para o guia completo de instalação.

### Onboarding

O onboarding segue seis marcos:

1. **Instalação** — Dependências e configuração do ambiente.
2. **Perfil** — Negócio, público, oferta, posicionamento e voz.
3. **Identidade Visual** — Cores, fontes, logo, fotos, referências e direção de arte.
4. **Configurações** — Meta API, GitHub Pages e Telegram opcional.
5. **Primeiro Post** — Briefing, copy, arte premium e preview.
6. **Postagem** — Aprovação auditável e publicação pela API oficial.

O agente informa o progresso em cada interação e só declara o Studio instalado quando a primeira publicação real estiver registrada.

Para consultar a etapa pendente a qualquer momento:

```powershell
npm run status
```

### Identidade Visual

O onboarding visual mantém cinco camadas sincronizadas:

- `recursos/brand/brandbook.md` — estratégia visual em linguagem humana
- `recursos/brand/design-system.md` — decisões de direção de arte executáveis
- `recursos/brand/tokens.css` — cores, fontes, espaçamentos e valores exatos
- `recursos/brand/briefing-visual.md` — direção aprovada da primeira peça
- `conteudos/identidade-visual.yml` — configuração estruturada consumida pelas automações

## O que o projeto entrega

- Estrutura local para conteúdo, recursos, saídas e prévias.
- Modelos legíveis em Markdown para perfil, pilares, ideias e campanhas.
- Guias de configuração da Meta, GitHub Pages e Telegram opcional.
- Nove skills especialistas com onboarding, estratégia, identidade visual, copy, direção de arte, análise de métricas, stories e integração.
- Geração de artes premium via `generate_image` do Antigravity IDE para carrossel, post individual, anúncio e stories.
- Preview mobile, vitrine, fila auditável e publicação pela API oficial.
- Aprovação auditável diretamente no chat.
- Instalador repetível que preserva `.env` e perfis já preenchidos.

## Formatos suportados

| Formato | Dimensão | Uso |
|---------|----------|-----|
| Post Individual | 1080×1350 (4:5) | Arte única orgânica |
| Carrossel | 1080×1350 (4:5) | Sequência de 2-10 slides |
| Anúncio | 1080×1350 (4:5) | Criativos de mídia paga |
| Stories | 1080×1920 (9:16) | Conteúdo efêmero vertical |

## Scripts disponíveis

```powershell
npm run configurar          # Configura .env e ambiente
npm run onboarding          # Inicia onboarding pelo terminal
npm run status              # Mostra etapa atual do onboarding
npm run diagnosticar        # Verifica saúde do projeto
npm run validar             # Valida estrutura do projeto
npm run validar:integracoes # Testa conexão real com Meta e Pages
npm run criar-previa        # Gera preview HTML de uma publicação
npm run atualizar-vitrine   # Atualiza vitrine local de prévias
npm run preview             # Inicia servidor local de prévias
npm run publicar-instagram  # Dry-run de publicação
npm run aprovar:criar       # Cria job de aprovação
npm run aprovar:listar      # Lista jobs pendentes
npm run pages:publicar      # Publica no GitHub Pages
npm test                    # Executa validação e testes
```

## Estrutura principal

```text
.agents/skills/   Nove skills especialistas para o Antigravity IDE
automacoes/       Criação, diagnóstico, aprovação e publicação
conteudos/        Perfil do negócio, pilares, ideias e campanhas
documentacao/     Guias de configuração da Meta, GitHub Pages e fluxo completo
exemplos/         Exemplos de publicação para referência
previas/          Galeria local de prévias geradas
recursos/brand/   Design system e tokens visuais configurados no onboarding
recursos/         Fotos, logos e referências fornecidas pelo próprio usuário
saidas/           Artefatos gerados por tipo de publicação
templates/        Template de preview
testes/           Testes automatizados
```

## Segurança e privacidade

- O `.env` é local e ignorado pelo Git.
- Nunca cole tokens em chats, argumentos de terminal ou documentos compartilhados.
- Use apenas recursos que você tem autorização para utilizar.
- A publicação exige identificação única, versão imutável, aprovação explícita e auditoria local.

Leia [GEMINI.md](GEMINI.md) antes de usar o projeto com o Antigravity IDE.
