# Configurar Meta e Instagram

## Tutorial em vídeo

O instalador mostra e oferece abrir o tutorial oficial no YouTube quando `metaTutorialYoutubeUrl` estiver preenchido em `documentacao/links-oficiais.json`. Enquanto o link não estiver cadastrado, este documento permanece como orientação principal.

Esta etapa é manual. O instalador não cria aplicativo, conta ou token em seu nome.

## Antes de começar

- Use uma conta profissional do Instagram vinculada à Página correta.
- Tenha acesso administrativo à conta e à Página.
- Abra o painel oficial de desenvolvedores da Meta no navegador e crie ou escolha o aplicativo que será usado para esta integração.
- Guarde segredos exclusivamente no arquivo local `.env`; não os cole no chat, em comandos, capturas de tela ou repositórios.

## Checklist de configuração

1. Confirme que o Instagram profissional está conectado à Página desejada.
2. No aplicativo da Meta, habilite os produtos e permissões exigidos pela publicação de conteúdo do Instagram.
3. Gere o token conforme o fluxo oficial aplicável à sua conta e registre-o somente em `INSTAGRAM_ACCESS_TOKEN` no `.env`.
4. Preencha também `META_API_VERSION`, `INSTAGRAM_BUSINESS_ID` e `FACEBOOK_PAGE_ID`.
5. Execute `npm run validar:integracoes`. Ele testa por leitura a conexão com o perfil configurado e o repositório/branch do GitHub Pages; não mostra nem grava tokens.
6. Configure o GitHub Pages para hospedagem HTTPS pública das imagens conforme `configurar-github-pages.md`.

## Teste seguro

Use primeiro `npm run publicar-instagram -- caminho/publicacao.json`. A publicação real exige um job aprovado, URLs HTTPS válidas e as credenciais locais.
