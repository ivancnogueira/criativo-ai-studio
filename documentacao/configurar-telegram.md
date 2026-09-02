# Preparar o Telegram para aprovação

O Telegram é um canal alternativo opcional de aprovação. O fluxo principal aprova o ID exato diretamente no chat do Antigravity IDE. Se ativado, o robô usa long polling e funciona enquanto o computador estiver ligado.

## Preparação segura

1. Crie um bot no fluxo oficial do Telegram.
2. Envie uma mensagem de teste ao bot para descobrir o `chat_id` autorizado.
3. Guarde o token apenas em `TELEGRAM_BOT_TOKEN` no arquivo `.env`.
4. Registre em `TELEGRAM_AUTHORIZED_CHAT_ID` somente o chat que poderá receber a revisão.
5. Opcionalmente, preencha `TELEGRAM_AUTHORIZED_USER_ID` para restringir também a uma pessoa dentro de um grupo.
6. Execute `npm run diagnosticar` para conferir os campos sem revelar valores.

## Executar

1. Crie um job com `npm run aprovar:criar -- caminho/publicacao.json`.
2. Inicie `npm run telegram`.
3. O robô envia os slides, a legenda e um link para o preview.
4. Aprove pelo botão ou envie `APROVAR CODIGO`.

## Regra da ponte de aprovação

Cada solicitação tem código único e fingerprint dos textos, URLs e imagens. Alterações invalidam a solicitação. Apenas o chat e, quando configurado, o usuário autorizado podem agir. Mensagens vagas não aprovam e a aprovação não publica automaticamente.
