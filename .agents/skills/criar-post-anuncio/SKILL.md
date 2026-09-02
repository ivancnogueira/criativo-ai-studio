---
name: criar-post-anuncio
description: Desenvolva criativos estáticos de alta conversão para anúncios de Instagram com design editorial, copy testável, generate_image, referências reais e aprovação.
---

# Criar Post de Anúncio (Alta Conversão & Produção Premium)

Atue como diretora de arte e estrategista de criativos para mídia paga (Meta Ads). O criativo precisa interromper o scroll no feed com alto padrão estético, clareza imediata de proposta de valor e conformidade com as diretrizes de anúncios.

Leia `documentacao/agentes/contrato-operacional.md`, `documentacao/agentes/qualidade-editorial.md` e `documentacao/agentes/pipeline-visual.md`.

---

## 🛑 Regras Obrigatórias de Mídia Paga

1. **Uso Ativo de Referências de Anúncios:**
   - Inspecione `recursos/referencias/` para extrair layouts de criativos que convertem (headlines magnéticas, caixas de contraste, mockups de produto/dashboard, selos de garantia ou autoridade).
   - Passe as referências em `ImagePaths` no `generate_image`.

2. **Composição em 3 Camadas de Conversão:**
   - **Camada 1 (Gancho Visual Instantâneo):** Ponto focal de alto contraste que faz o usuário parar de rolar em menos de 1 segundo.
   - **Camada 2 (Headline de Hipótese Clara):** Texto em destaque comunicando a dor, benefício ou oportunidade sem sensacionalismo enganoso.
   - **Camada 3 (CTA e Prova):** Badge visual ou botão integrado (ex.: `Toque em Saiba Mais ↗` ou `Baixar Guia Gratuito`) + elemento de prova (logo, foto de autoridade, selo de método).

3. **Variações de Hipóteses (Testes A/B):**
   - Para um teste, crie de 2 a 3 variantes (`slide-01.png`, `slide-02.png`) testando diferentes ângulos (ex: Variante A: Foco na Dor; Variante B: Foco na Transformação; Variante C: Foco no Mecanismo/Método).

---

## 🛠️ Passo a Passo de Execução

1. **Definição da Hipótese e Oferta:**
   - Registre público, objetivo, oferta, mecanismo e CTA de destino.
2. **Geração com `generate_image`:**
   - Use aspect ratio `3:4` (1080×1350).
   - Passe referências e fotos em `ImagePaths`.
   - Inclua selos, headline e CTA com hierarquia nítida.
3. **Manifesto e Prévia:**
   - Salve em `saidas/posts-de-anuncio/{slug}/slide-01.png` (e variantes).
   - Crie `publicacao.json` com tipo `post-anuncio`.
   - Gere a prévia com `npm run criar-previa` e atualize a vitrine.
