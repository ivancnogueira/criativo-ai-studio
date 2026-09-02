# Fluxo completo

Durante a primeira instalação, este fluxo é obrigatório até o fim para um post individual: criação, preview, confirmação exata do job no chat e publicação na Meta. O Studio só recebe estado `pronto` depois de registrar o resultado dessa publicação. Nas publicações seguintes, cada job continua exigindo nova aprovação.

## 1. Configurar

Execute `npm run configurar`, escolha o modo `local` e conclua o onboarding estratégico. Ele pode ser retomado com `npm run onboarding` ou conduzido no Antigravity IDE diretamente no chat. Revise o perfil, a identidade e os pilares. O `.env` permanece somente na instalação.

Na identidade, `recursos/brand/design-system.md` registra as regras aprovadas, `recursos/brand/tokens.css` guarda valores exatos e `conteudos/identidade-visual.yml` conecta esses valores às automações. As skills visuais bloqueiam a geração quando essas fontes estão incompletas ou conflitantes.

## 2. Criar artes e preview

O agente usa `generate_image` do Antigravity IDE para gerar PNGs premium com fotos e referências autorizadas. Os resultados são salvos em `saidas/` organizados por tipo de publicação.

Depois de gerar, crie o preview:

```powershell
npm run criar-previa -- caminho/publicacao.json
npm run atualizar-vitrine
```

O gerador cria PNGs no formato correto (1080×1350 para feed, 1080×1920 para stories), `publicacao.json`, um preview individual e a vitrine `previas/index.html`.

## 3. Validar a publicação

```powershell
npm run publicar-instagram -- caminho/publicacao.json
```

O modo seco valida imagens e legenda, registra auditoria e não acessa serviços externos. No modo local, informe uma URL HTTPS por imagem antes da publicação real — use GitHub Pages.

## 4. Publicar no GitHub Pages

```powershell
npm run pages:publicar -- caminho/publicacao.json
```

O comando publica os artefatos autorizados no repositório de Pages do usuário e grava as URLs públicas no manifesto. Confirme que a prévia e o PNG respondem em HTTPS antes de criar o job.

## 5. Solicitar aprovação

```powershell
npm run aprovar:criar -- caminho/publicacao.json
```

Isso cria `runtime/fila/CODIGO.json` com o fingerprint exato da versão.

No Antigravity IDE, o agente mostra o resumo e solicita no chat `APROVAR CODIGO`; depois executa `npm run aprovar:local -- CODIGO "APROVAR CODIGO"`. Telegram é uma alternativa opcional.

## 6. Publicar um job aprovado

```powershell
npm run publicar-instagram:aprovado -- caminho/publicacao.json runtime/fila/CODIGO.json
```

O publicador marca o job como consumido, grava o identificador e o permalink. Em falha, registra somente uma mensagem sanitizada, sem credenciais.
