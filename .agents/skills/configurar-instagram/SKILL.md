---
name: configurar-instagram
description: Configure, diagnostique e opere com segurança a integração oficial Instagram/Meta do Criativo AI Studio, incluindo credenciais locais, validação, aprovação e publicação auditável.
---

# Configurar Instagram

Atue como especialista de integração Meta. Guie a pessoa sem receber segredos no chat e use apenas a Graph API oficial.

Leia `documentacao/agentes/contrato-operacional.md`. Para configuração, leia `documentacao/configurar-meta.md`; para aprovação/publicação, leia `documentacao/fluxo-completo.md`.

Leia também `documentacao/configurar-github-pages.md`. GitHub Pages é a hospedagem pública padrão das imagens e previews.

## Limites absolutos

- Nunca peça que o usuário cole token, segredo ou senha na conversa.
- Nunca coloque token em argumento de terminal, URL exibida, log ou commit.
- Nunca publique por autorização vaga ou sem job aprovado e íntegro.

## Diagnóstico inicial

Identifique o estágio:

1. conta ainda não é profissional;
2. conta profissional sem Página/app vinculados;
3. ativos prontos, credenciais ausentes;
4. credenciais presentes, conexão não validada;
5. integração válida, publicação em dry-run;
6. fluxo aprovado pronto para publicar;
7. erro ou credencial revogada.

## Configuração segura

1. Confirme conta profissional e ativos administrados pelo usuário.
2. Oriente criação/configuração no painel oficial da Meta.
3. Oriente permissões mínimas necessárias.
4. Peça ao usuário para preencher o `.env` local diretamente.
5. Execute `npm run validar:integracoes`.
6. Mostre somente sucesso/falha, nunca valores ou tokens.

## Publicação

Antes de qualquer chamada de escrita, confirme:

- manifesto correto;
- imagens finais e URLs HTTPS acessíveis;
- legenda revisada;
- job com ID único;
- fingerprint correspondente;
- remetente autorizado;
- status `aprovado` e job não consumido.

Use `npm run publicar-instagram -- CAMINHO_PUBLICACAO` para dry-run. A publicação real usa `npm run publicar-instagram:aprovado -- CAMINHO_PUBLICACAO CAMINHO_JOB`.

## Primeira publicação do onboarding

1. Aceite somente um manifesto do tipo `post_individual` com uma única imagem `1080x1350` já aprovada no preview.
2. Conduza a configuração da Meta sem pedir segredos no chat.
3. Confirme que a URL HTTPS da imagem é acessível externamente.
4. Obtenha autorização para upload público e execute `npm run pages:publicar -- CAMINHO_PUBLICACAO`.
5. Execute `npm run pages:validar` e confirme que HTTPS responde.
6. Execute o dry-run.
7. Crie o job, mostre o ID e solicite `APROVAR ID-DO-JOB`.
8. Aceite somente essa confirmação e execute `npm run aprovar:local -- ID-DO-JOB "APROVAR ID-DO-JOB"`.
9. Publique e registre `mediaId`/permalink.

## Diagnóstico de falhas

Classifique antes de sugerir correção: credencial ausente/inválida/revogada, permissão faltante, conta desvinculada, mídia inacessível, container processando, limite de API ou aprovação inválida.

## Conclusão

Informe estágio alcançado, verificações executadas, pendências e próximo comando seguro.
