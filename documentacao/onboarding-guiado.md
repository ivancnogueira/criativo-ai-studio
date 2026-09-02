# Onboarding guiado

Este roteiro é obrigatório durante a primeira configuração pelo Antigravity IDE. A instalação técnica e o onboarding estratégico são partes do mesmo percurso, mas têm conclusões diferentes.

## Experiência que o usuário deve receber

Antes da primeira pergunta, mostre o percurso completo:

1. instalação técnica, ambiente e dependências;
2. perfil: negócio, público, oferta, posicionamento, voz, objetivos e restrições;
3. identidade visual: inventário de ativos, logo existente, referências, cores, tipografia e direção de arte aprovada;
4. configurações: Meta, `.env`, GitHub Pages e integrações opcionais;
5. primeiro post: pilares, briefing, copy, imagem, preview e aprovação visual;
6. postagem: job auditável, confirmação no chat e primeira publicação.

Use o cabeçalho `Onboarding — etapa N de 6: NOME` em cada interação. Diga em uma frase o que será decidido naquela etapa e o que acontecerá depois da resposta.

Faça perguntas em blocos curtos. Não repita o que já estiver nos arquivos ou tiver sido respondido. Quando houver informação suficiente para propor uma direção profissional, apresente a proposta e peça correção ou confirmação, em vez de transferir toda a elaboração ao usuário.

Não termine uma interação com "quer ir para o próximo passo?", "podemos continuar?" ou outra pergunta sem destino explícito. Quando uma resposta for indispensável, encerre assim:

> Depois da sua resposta, vou salvar esta etapa e avançar para **NOME DA PRÓXIMA ETAPA**, onde faremos **RESULTADO CONCRETO**.

## Execução pelo Antigravity IDE

O agente mantém o contexto e usa as skills conforme necessidade. O fluxo não é encerrado entre uma skill e outra:

- perfil e diagnóstico: conversa direta no chat, salvando em `conteudos/perfil-da-marca.md`;
- identidade visual: inventário guiado dos ativos que a pessoa já tem ou vai inserir nas pastas do projeto;
- configurações: skill `configurar-instagram`, antes de produzir a primeira peça; conduz Meta, `.env`, GitHub Pages, sem receber segredos no chat;
- pilares, pauta e primeiro brief: skill `planejar-conteudo`, dentro da etapa 5;
- primeira proposta textual: skill `copywriter-instagram`, depois de pilares e briefing coerentes;
- primeira arte: `generate_image` do Antigravity, seguindo pipeline de `documentacao/agentes/pipeline-visual.md`;
- preview: `npm run criar-previa` com os PNGs gerados;
- postagem: skill `configurar-instagram`, depois de o job exato ser aprovado no chat.

O agente deve atualizar `conteudos/estado-do-studio.yml` depois de cada marco. Todo turno de onboarding precisa informar:

- etapa atual e progresso;
- o que já foi registrado;
- o que está sendo perguntado agora;
- a próxima etapa concreta.

## Etapa 3 — Identidade Visual

Ativos ausentes não devem interromper a definição estratégica, mas bloqueiam a geração até que a ausência seja uma decisão explícita. A etapa 3 deve ser guiada em bloco curto, sem pedir criação de marca dentro do onboarding. Obtenha e registre obrigatoriamente:

- identidade visual existente: se já tiver, peça para inserir logo em `recursos/logos/`, fotos em `recursos/fotos/` e referências em `recursos/referencias/`; se ainda não tiver, pergunte se prefere pausar para criar/inserir agora ou pular a etapa visual completa e usar posts sem fotos/logo por enquanto;
- cores: pergunte se deve extrair da logo fornecida ou se a pessoa prefere preencher códigos, por exemplo `primaria #123456`, `texto #111111`, `fundo #f7f3ea`, `destaque #00a99d`;
- tipografia: pergunte se deve inferir a partir da identidade fornecida ou se a pessoa prefere preencher nomes, por exemplo `titulo: Playfair Display`, `texto: DM Sans`, `apoio: Inter`;
- fotos de pessoa, produto ou ambiente em `recursos/fotos/`, ou a decisão explícita `não usar pessoa nesta primeira peça`;
- logo em `recursos/logos/`, ou a decisão explícita `sem logo nesta primeira peça`;
- duas a cinco referências em `recursos/referencias/`, ou a decisão explícita de buscar referências depois. Se a pessoa não tiver referências, sugira buscas no Pinterest com termos derivados do perfil, do nicho, do público, da promessa da oferta e dos concorrentes diretos;
- confirmação de direitos de uso dos ativos;
- conceito, ponto focal, estrutura, componentes, texto visual, CTA visual e selo editorial da primeira arte.

Em seguida, mostre a direção proposta e peça aprovação explícita antes de marcar a etapa 3 como validada.

## Etapa 5 — Primeiro Post

O primeiro conteúdo é sempre um **post individual 1080×1350**. Esse formato reduz dependências e permite validar todo o sistema.

Use `generate_image` do Antigravity com aspect ratio `3:4` e passe fotos e referências como `ImagePaths`. Se o agente não tiver acesso ao `generate_image`, informe a limitação ao usuário.

Mostre o preview, aplique ajustes e obtenha aprovação explícita da versão. A aprovação visual não autoriza publicação.

## Etapa 6 — Publicação

Depois da aprovação visual, obtenha autorização específica para upload público e envie PNG, preview HTML e vitrine ao GitHub Pages. Execute `npm run pages:validar` e só entregue o link quando o HTTPS responder.

Gere o job, mostre o ID, resuma a versão imutável e peça ao usuário que responda exatamente `APROVAR ID-DO-JOB`. Ao receber essa confirmação no chat, registre a aprovação local auditável e publique pela API oficial.

## Critério de conclusão

### Instalação técnica concluída

Node, dependências, modo, `.env` e diretórios foram verificados, mas ainda existe etapa estratégica pendente. Informe a pendência e continue.

### Onboarding pausado

O usuário pediu para parar ou falta uma resposta/ativo indispensável. Informe a etapa, a pergunta pendente e como retomar.

### Studio instalado e configurado

Somente quando:

- perfil, inventário de ativos, identidade visual e direção visual foram preenchidos e aprovados;
- três a cinco pilares foram apresentados e confirmados;
- existe uma primeira pauta e um briefing com objetivo, público, mensagem, formato, CTA e fontes;
- a copy e a arte do primeiro post passaram pelos quality gates;
- o PNG final e o manifesto foram salvos em `saidas/` e o preview foi gerado em `previas/`;
- o usuário confirmou que a estratégia representa o negócio e aprovou visualmente a primeira peça;
- Meta foi configurada localmente sem expor credenciais;
- a imagem possui URL HTTPS acessível pela Meta;
- um job único foi aprovado no chat pela confirmação exata `APROVAR ID-DO-JOB`;
- a publicação real retornou `mediaId` e permalink registrados na auditoria;
- testes e diagnóstico foram executados.

## Estado persistente

Use este formato em `conteudos/estado-do-studio.yml` e preserve campos já preenchidos:

```yaml
versao: 2
onboarding:
  status: nao_iniciado
  etapa_atual: ambiente
  perfil: pendente
  ativos_visuais: pendente
  identidade_visual: pendente
  direcao_visual: pendente
  pilares: pendente
  primeiro_briefing: pendente
  primeiro_post: pendente
  validacao_usuario: pendente
  integracao_instagram: pendente
  integracao_telegram: opcional
  primeira_publicacao: pendente
producao:
  ultimo_briefing:
  proximo_passo: escolher_modo
```

Valores de etapa: `pendente`, `preenchido`, `validado`, `aprovado`, `configurado` ou `publicado`. Estado geral: `nao_iniciado`, `em_andamento`, `pronto` ou `revisao`.
