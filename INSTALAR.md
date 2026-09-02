# Instalação do Criativo AI Studio

## Pré-requisitos

- **Node.js 20** ou superior — [baixar aqui](https://nodejs.org)
- **Antigravity IDE** — extensão instalada no VS Code
- **Git** (opcional, para versionamento)

## Modos de instalação

### Modo 1: 1-Clique via Antigravity IDE (com Git)
Basta copiar o prompt em [INSTALAR-COM-ANTIGRAVITY.md](INSTALAR-COM-ANTIGRAVITY.md) e colar no chat do Antigravity. O agente faz o clone, instalação e conduz o onboarding.

### Modo 2: Download do Zip (Área de Membros)

### 1. Extraia o arquivo
Extraia o arquivo zip baixado da área de membros em uma pasta de sua escolha.

### 2. Instale as dependências
Abra o terminal na pasta extraída e execute:

```powershell
npm install
```

### 3. Configure o ambiente
Execute o configurador interativo:

```powershell
npm run configurar
```

Ele irá:
- Criar o arquivo `.env` a partir do `.env.example`
- Verificar o Node.js e dependências
- Preparar a estrutura de pastas

### 4. Abra no Antigravity IDE

Abra a pasta no VS Code com Antigravity IDE instalado. O agente detecta o `GEMINI.md` e as skills automaticamente.

### 5. Inicie o onboarding

No chat do Antigravity, peça para iniciar o onboarding. O agente conduz todo o processo em seis marcos:

1. **Instalação** — Verifica dependências e ambiente
2. **Perfil** — Coleta informações do negócio
3. **Identidade Visual** — Define cores, fontes, logo e direção de arte
4. **Configurações** — Configura Meta API e GitHub Pages
5. **Primeiro Post** — Cria briefing, copy, arte premium e preview
6. **Postagem** — Aprovação e publicação pela API oficial

### 6. Verifique a instalação

```powershell
npm run diagnosticar
npm test
```

## Configuração da Meta / Instagram

Depois do onboarding, siga o guia em `documentacao/configurar-meta.md` para:

1. Criar um App no Meta for Developers
2. Obter o Instagram Business ID
3. Gerar um token de acesso
4. Preencher as credenciais no `.env`

**Nunca compartilhe seu token de acesso.**

## GitHub Pages (modo local)

Para que a Meta consiga baixar suas imagens, elas precisam de uma URL HTTPS pública. No modo local, usamos GitHub Pages:

1. Crie um repositório público separado no GitHub
2. Gere um token fine-grained com permissão `Contents: write`
3. Preencha as credenciais no `.env`
4. Execute `npm run pages:publicar` para enviar as artes

Leia `documentacao/configurar-github-pages.md` para o guia completo.

## Problemas?

Execute o diagnóstico completo:

```powershell
npm run diagnosticar
```

Se persistir, verifique:
- Node.js está na versão 20+? (`node --version`)
- As dependências foram instaladas? (`npm install`)
- O `.env` foi criado? (`npm run configurar`)
