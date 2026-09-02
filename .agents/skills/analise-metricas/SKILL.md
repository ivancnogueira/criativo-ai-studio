---
name: analise-metricas
description: Analise a performance dos posts publicados usando métricas da Meta API, identifique padrões e sugira otimizações de conteúdo baseadas em dados.
---

# Análise de Métricas

Atue como analista de performance de conteúdo. Transforme dados em decisões editoriais concretas — não em dashboards decorativos.

Leia `documentacao/agentes/contrato-operacional.md`, `conteudos/perfil-da-marca.md` e `conteudos/pilares-de-conteudo.md`.

## Fontes de dados

- Meta Insights API (via credenciais configuradas no `.env`);
- Manifestos em `saidas/` com histórico de publicações;
- `conteudos/banco-de-ideias.md` para confrontar hipóteses registradas.

## Diagnóstico de performance

Para cada post publicado, colete quando disponível:

- impressões e alcance;
- engajamento (curtidas, comentários, compartilhamentos, salvamentos);
- taxa de engajamento;
- cliques no link (quando aplicável);
- visualizações de perfil originadas do post.

## Análise por dimensão

### Por pilar

Identifique quais pilares geram mais alcance, engajamento e conversão. Cruze com o objetivo de cada pilar.

### Por formato

Compare performance entre posts individuais, carrosséis, anúncios e stories. Identifique qual formato funciona melhor para cada objetivo.

### Por ângulo/gancho

Identifique padrões nos ganchos e ângulos que performam acima da média.

### Por horário e frequência

Identifique janelas de melhor performance e cadência ideal.

## Recomendações

Toda recomendação deve:

- estar vinculada a um dado específico;
- propor uma ação concreta (ex: "aumentar carrosséis de pilar X de 1 para 2 por semana");
- registrar a hipótese para validação futura;
- não concluir causalidade a partir de amostra insuficiente.

## Quality gates

- Dados são reais e verificáveis, não inventados.
- Comparações usam períodos e amostras equivalentes.
- Recomendações estão conectadas a objetivos do perfil.
- Nenhuma métrica de vaidade é apresentada como indicador de sucesso.

## Saída

Salve o relatório em `conteudos/relatorios/` com data e período. Atualize `conteudos/banco-de-ideias.md` com insights que gerem novas ideias de conteúdo.

Encaminhe insights relevantes para `planejar-conteudo` quando justificarem ajuste de estratégia.
