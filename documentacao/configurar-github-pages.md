# Configurar GitHub Pages

O modo local usa um repositório público separado para hospedar apenas imagens finais, previews e a vitrine. Não use o repositório privado do produto e não envie `.env`, estratégia, fotos-fonte, logos-fonte ou arquivos da marca.

Tudo que for enviado ao GitHub Pages fica publicamente acessível. `noindex` reduz indexação acidental, mas não cria privacidade. Só continue se o usuário autorizar publicar esses artefatos.

## 1. Criar o repositório de previews

1. Entre na conta do comprador no GitHub.
2. Crie um repositório público, por exemplo `meus-criativos-previews`.
3. O repositório pode ficar vazio nesta etapa; a validação inicial confirma apenas que ele existe, é público e pode ser lido pela credencial.
4. Depois do primeiro arquivo ou commit criar a branch, em **Settings → Pages**, escolha **Deploy from a branch**, a branch configurada (normalmente `main`) e a pasta `/ (root)`.

O GitHub documenta esse fluxo em <https://docs.github.com/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site>.

## 2. Criar uma credencial mínima

Crie um fine-grained personal access token:

- proprietário: a conta dona do repositório;
- acesso: somente ao repositório de previews;
- permissão: **Contents — Read and write**;
- validade: escolha um período e renove quando necessário;
- nenhuma permissão de administração ou workflow.

Preencha diretamente no `.env`, sem colar o valor no chat:

```text
GITHUB_PAGES_OWNER=
GITHUB_PAGES_REPO=
GITHUB_PAGES_BRANCH=main
GITHUB_PAGES_TOKEN=
GITHUB_PAGES_BASE_URL=
```

`GITHUB_PAGES_BASE_URL` pode ficar vazio para usar `https://USUARIO.github.io/REPOSITORIO`.

## 3. Enviar uma publicação

Depois de gerar o manifesto e aprovar visualmente o conteúdo:

```powershell
npm run pages:publicar -- saidas/posts-individuais/SLUG/publicacao.json
```

O comando envia sequencialmente somente os PNGs finais, `previas/SLUG.html`, a vitrine e `.nojekyll`. O token não aparece no comando, na saída ou no repositório.
