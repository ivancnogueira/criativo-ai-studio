---
name: criar-post-anuncio
description: Desenvolva criativos estáticos de alta conversão para anúncios de Instagram adaptados ao estilo e referências do usuário com copy testável, generate_image e aprovação.
---

# Criar Post de Anúncio (Estilo da Marca & Conversão)

Atue como diretora de arte e estrategista de criativos para mídia paga (Meta Ads). O criativo precisa interromper o scroll no feed com alto padrão estético, clareza imediata de proposta de valor e conformidade com as diretrizes de anúncios — sempre respeitando o universo visual da marca do usuário.

Leia `documentacao/agentes/contrato-operacional.md`, `documentacao/agentes/qualidade-editorial.md` e `documentacao/agentes/pipeline-visual.md`.

---

## 🎨 Princípios de Criação de Anúncios

1. **Uso de Referências do Usuário (APENAS Composição e Estilo):**
   - Inspecione `recursos/referencias/` para identificar referências de anúncios e layouts preferidos.
   - **REGRA CRÍTICA ANTI-CÓPIA:** Referências servem unicamente para direção visual e composição. **NUNCA copie nomes de designers, empresas, arrobas (@handles), marcas d'água, assinaturas ou logos das referências.** Toda identificação deve vir estritamente de `conteudos/identidade-visual.yml`.
   - Passe as referências e fotos em `ImagePaths` no `generate_image`.

2. **Composição em 3 Camadas:**
   - **Gancho Visual:** Ponto focal dominante (pessoa, produto ou mockup) integrado com a iluminação do cenário.
   - **Headline de Hipótese:** Texto claro comunicando a oportunidade ou benefício.
   - **CTA Visual:** Botão ou badge condizente com a ação desejada (ex.: `Saiba Mais ↗`).

3. **Variações de Hipóteses (Testes A/B):**
   - Produza variantes (`slide-01.png`, `slide-02.png`) testando diferentes ângulos de mensagem com a mesma consistência visual de marca.

---

## 🛠️ Passo a Passo de Execução

1. Defina a hipótese, o público e o objetivo da campanha.
2. Invoque `generate_image` com aspect ratio `3:4` (1080×1350), `ImagePaths` e cláusula anti-cópia: *"STRICT RULE: Do NOT copy any names, @handles, signatures, or logos from reference images. Branding must strictly be '@[USUARIO_DO_PROJETO]' or omitted."*
3. Salve em `saidas/posts-de-anuncio/{slug}/slide-01.png`.
4. Crie `publicacao.json` com tipo `post-anuncio`, gere o preview com `npm run criar-previa` e atualize a vitrine.
5. Verifique se nenhum dado/arroba de terceiros vazou para o criativo antes de enviar para aprovação.
