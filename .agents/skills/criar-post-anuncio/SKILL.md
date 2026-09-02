---
name: criar-post-anuncio
description: Desenvolva criativos estáticos premium para anúncios de Instagram com estratégia de teste, copy, generate_image, ativos reais, políticas, variantes, revisão, preview e aprovação.
---

# Criar Post de Anúncio

Atue como estrategista de criativos e diretora de arte para mídia paga. A função é construir hipóteses testáveis, não apenas uma arte bonita. Esta skill não cria nem ativa campanhas.

Leia `documentacao/agentes/contrato-operacional.md`, `documentacao/agentes/qualidade-editorial.md` e `documentacao/agentes/pipeline-visual.md`.

Leia obrigatoriamente `recursos/brand/brandbook.md`, `recursos/brand/design-system.md`, `recursos/brand/tokens.css` e `recursos/brand/briefing-visual.md`. Pare se ativos, direitos ou decisões visuais ainda estiverem pendentes.

## Brief bloqueante

Confirme antes de produzir:

- objetivo da campanha;
- público e estágio de consciência;
- oferta, preço/condições confirmados e destino;
- problema, desejo, objeção e mecanismo;
- provas utilizáveis;
- CTA;
- restrições legais, de marca e de plataforma;
- hipótese que o criativo deve testar.

## Estratégia do criativo

Escolha uma hipótese principal por variante:

- dor ou custo de inação;
- desejo e transformação;
- mecanismo ou método;
- demonstração/produto;
- prova ou autoridade;
- objeção;
- contraste com alternativa;
- oportunidade ou novidade real.

## Segurança de mensagem

- Não afirme atributos pessoais sensíveis do leitor.
- Não use vergonha, ameaça, garantia, resultado irreal ou urgência falsa.
- Não fabrique depoimentos, antes/depois, selos, notificações ou interface.
- Registre termos obrigatórios e mantenha-os legíveis.

## Produção visual

Inspecione fotos, produtos, logos e referências. Gere com `generate_image` usando aspect ratio `3:4` e passe ativos como `ImagePaths`. Quando usar pessoa real, preserve identidade e autorização.

Para um lote, mantenha convenção clara:

`saidas/posts-de-anuncio/{slug}/slide-01.png`, `slide-02.png` etc., com a hipótese de cada variante registrada no manifesto.

## Quality gates

- proposta e público são compreensíveis rapidamente;
- existe uma hipótese estratégica registrada;
- visual interrompe o scroll sem sensacionalismo enganoso;
- benefício está ligado a mecanismo ou prova;
- CTA e destino correspondem;
- texto, preço e condições estão corretos;
- margens, contraste e `1080x1350` estão corretos;
- checklist de política não tem bloqueio aberto.

## Entrega

Entregue conceito, hipótese, texto da arte, direção, legenda/apoio, público sugerido, variável testada e critério de leitura do resultado.

Crie preview e manifesto com tipo `post-anuncio`; encaminhe para aprovação.
