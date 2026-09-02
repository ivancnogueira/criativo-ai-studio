---
name: criar-identidade-visual
description: Crie ou traduza uma identidade visual de marca em brandbook, design system e tokens aprovados antes de produzir conteúdo.
---

# Criar Identidade Visual

Atue como diretora de marca. Esta skill serve para pessoas que ainda não têm identidade visual pronta ou que precisam transformar materiais dispersos em um sistema utilizável pelo Criativo AI Studio. Não substitui registro de marca, pesquisa jurídica ou um projeto de branding completo.

Leia `documentacao/agentes/contrato-operacional.md`, `conteudos/perfil-da-marca.md`, `recursos/brand/briefing-visual.md`, `recursos/brand/design-system.md`, `recursos/brand/tokens.css` e `conteudos/identidade-visual.yml`.

## Escolha de rota

Comece perguntando e registrando uma escolha inequívoca:

- **Já tenho identidade:** traduzir logo, paleta, fontes, referências e regras existentes sem reinventar a marca.
- **Quero criar:** partir do posicionamento, público, oferta e referências autorizadas para propor uma identidade original de conteúdo.
- **Ainda não quero logo:** criar o sistema visual e um wordmark tipográfico provisório, explicitamente marcado como provisório.

Não trate a ausência de um logo como permissão para criar um símbolo aleatório.

## Diagnóstico e proposta

Colete em blocos curtos:

- nome a exibir, pronúncia e assinatura;
- público, posicionamento, promessa e sensação desejada;
- referências e o que exatamente deve ser aproveitado nelas;
- cores, fontes ou elementos já obrigatórios;
- aversões visuais, concorrentes a evitar e necessidades de acessibilidade;
- fotos, produtos e demais ativos autorizados;
- intenção para o logo: somente wordmark, monograma, símbolo ou combinação.

Apresente duas ou três direções realmente distintas. Para cada uma, explique metáfora, paleta, tipografia, composição, comportamento no feed e risco de banalidade.

## Logo e wordmark

Quando não existir logo, pergunte se a pessoa prefere exploração com `generate_image` ou um wordmark SVG editável. Com autorização e `generate_image` disponível, gere duas ou três explorações com aspect ratio `1:1` e fundo transparente; apresente-as em preview, salve a escolha aprovada em `recursos/logos/`.

## Entregas obrigatórias

Depois da aprovação da direção, mantenha estas fontes sincronizadas:

1. `recursos/brand/brandbook.md`: fundamento, território visual escolhido, regras, ativos, usos e anti-padrões.
2. `recursos/brand/design-system.md`: decisões executáveis de direção de arte.
3. `recursos/brand/tokens.css`: cores, fontes, espaçamentos e componentes exatos.
4. `conteudos/identidade-visual.yml`: tema estruturado e a seção `recursos` com fotos, logo, referências e direitos de uso.
5. `recursos/brand/briefing-visual.md`: direção já aprovada da primeira peça.

Não marque a identidade como validada enquanto algum desses arquivos tiver `A definir` ou `pendente`. Atualize `conteudos/estado-do-studio.yml` somente após confirmação do usuário.

## Handoff

Entregue um resumo da direção aprovada, os caminhos de todos os ativos e qualquer limitação. A identidade aprovada não é aprovação automática da primeira arte.
