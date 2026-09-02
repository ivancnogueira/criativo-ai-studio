---
name: criar-carrossel
description: Crie carrosséis premium de Instagram usando generate_image do Antigravity, fotos reais, logos, referências, design system, revisão visual, preview e aprovação.
---

# Criar Carrossel

Atue como diretora de arte e produtora de carrosséis. A entrega principal são PNGs finais `1080x1350`; HTML existe apenas para preview e vitrine.

Leia `documentacao/agentes/contrato-operacional.md`, `documentacao/agentes/qualidade-editorial.md` e `documentacao/agentes/pipeline-visual.md` antes de produzir.

Leia obrigatoriamente `recursos/brand/brandbook.md`, `recursos/brand/design-system.md`, `recursos/brand/tokens.css` e `recursos/brand/briefing-visual.md` antes de escrever prompts ou gerar o primeiro slide. Se algum deles estiver genérico, incompleto ou pendente, interrompa a geração e peça ao usuário para completar.

## Entrada obrigatória

- brief com objetivo, público, mensagem central e CTA;
- copy aprovada ou autorização explícita para desenvolvê-la;
- perfil e identidade visual utilizáveis;
- fontes ou provas para afirmações factuais;
- decisão sobre quantidade de slides.

## Preflight visual

Inspecione `recursos/fotos/`, `recursos/logos/` e `recursos/referencias/`. Para cada ativo candidato, confirme função e autorização.

O design system prevalece sobre referências. Extraia delas ritmo, hierarquia, densidade, enquadramento e clima; não copie composição de terceiros.

## Arquitetura narrativa

Escolha a sequência que melhor entrega a ideia:

- diagnóstico: gancho -> sintoma -> causa -> solução -> aplicação -> CTA;
- tutorial: promessa -> contexto -> passos -> resultado -> CTA;
- lista: promessa -> itens progressivos -> síntese -> CTA;
- comparação: tensão -> alternativa A -> alternativa B -> critérios -> conclusão;
- história: cena -> conflito -> virada -> aprendizado -> aplicação -> CTA.

Use de 2 a 10 slides conforme a narrativa.

## Direção visual

Antes de gerar, defina:

- conceito visual e metáfora;
- paleta, contraste e textura;
- tratamento fotográfico;
- regra tipográfica e hierarquia;
- componentes recorrentes;
- alternância e continuidade entre slides;
- uso de pessoa, produto, prova e logo.

## Produção com generate_image

1. Escreva todos os prompts antes de gerar para garantir consistência.
2. Gere um slide piloto, normalmente capa ou slide representativo.
3. Valide a direção; depois gere os demais um por vez.
4. Repita invariantes de marca e sequência em todos os prompts.
5. Passe fotos e referências como `ImagePaths` para consistência visual.
6. Use aspect ratio `3:4` para formato 1080×1350.
7. Exija texto curto e exato, sem palavras extras.
8. Salve cada resultado aceito em `saidas/carrosseis/{slug}/slide-XX.png`.

## Quality gates por slide

- texto correto e legível no celular;
- uma função narrativa clara;
- rosto, mãos, objetos e produto coerentes;
- margens seguras e nenhum corte crítico;
- identidade visual consistente sem monotonia;
- ausência de texto, logo ou marca d'água inventados;
- promessa da capa entregue pelo conjunto;
- CTA final coerente com o brief;
- arquivo final exatamente `1080x1350`.

Corrija apenas slides reprovados.

## Preview, aprovação e saída

Monte `publicacao.json`, gere `previas/{slug}.html` com os PNGs e execute `npm run atualizar-vitrine`. Mostre o preview e pergunte quais slides precisam de ajuste. Não publique nem crie aprovação definitiva antes da revisão visual.

Com a versão pronta, execute `npm run aprovar:criar -- CAMINHO_PUBLICACAO`.
