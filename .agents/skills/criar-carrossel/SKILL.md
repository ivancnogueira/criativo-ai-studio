---
name: criar-carrossel
description: Crie carrosséis premium de Instagram (1080x1350) adaptados fielmente ao estilo, cores e referências do usuário usando generate_image do Antigravity, fotos reais, logos, design system, preview mobile e aprovação.
---

# Criar Carrossel (Estilo Próprio do Usuário)

Atue como diretora de arte de carrosséis de alto engajamento. A entrega consiste em uma sequência de PNGs `1080x1350` (3:4) onde a estética, a iluminação e as cores refletem **fielmente as referências e a identidade visual fornecidas pelo usuário**.

Leia `documentacao/agentes/contrato-operacional.md`, `documentacao/agentes/qualidade-editorial.md` e `documentacao/agentes/pipeline-visual.md`.

---

## 🎨 Como Estruturar a Sequência Visual

1. **Absorver o Estilo das Referências e Selecionar Fotos:**
   - Inspecione `recursos/referencias/` para entender a diagramação dos slides (fundo claro/escuro, uso de caixas, divisórias, tipografia, fotos).
   - **Variação de Fotos:** Inspecione `recursos/fotos/` e selecione fotos variadas do acervo para os slides que exigirem foto da pessoa/produto. Não repita sempre a mesma imagem.
   - **REGRA CRÍTICA ANTI-CÓPIA:** Referências servem **EXCLUSIVAMENTE** para inspiração visual de iluminação, diagramação e estética. **NUNCA copie nomes de designers, empresas, @handles, assinaturas, logos ou textos presentes nas referências** (ex: @boccalini, designer de exemplo, etc.). Toda assinatura de marca deve ser estritamente o `@usuario` do projeto (`conteudos/identidade-visual.yml`). Se não houver, deixe sem @.
   - Passe as referências, as fotos selecionadas e o logo (`recursos/logos/`) em `ImagePaths` no `generate_image`.

2. **Capa de Alto Impacto (Slide 1):**
   - Ponto focal envolvente, headline com alto contraste e gancho irresistível, adaptado às cores da marca (`tokens.css`).
   - Se houver foto da pessoa, preserve a fidelidade fisionômica (`FACIAL CONSISTENCY`).
   - Indicador visual sutil para passar para o lado (`Arraste para o lado ➔` ou seta minimalista).

3. **Slides de Conteúdo (2 a N-1):**
   - 1 ideia ou passo por slide.
   - Textos concisos (15 a 25 palavras por slide) diagramados com clareza.
   - Consistência de fundo, cores, fontes e estilo em toda a sequência.

4. **Slide Final (Fechamento & CTA):**
   - Resumo da ideia principal, assinatura da marca (`@[USUARIO_DO_PROJETO]`) e CTA visual correspondente ao objetivo do post.

---

## 🛠️ Passo a Passo de Execução

1. **Planejamento dos Slides:** Defina a quantidade de slides e o texto de cada um antes de gerar.
2. **Geração com `generate_image`:**
   - Gere o `slide-01.png` (capa) com aspect ratio `3:4` passando referências, fotos variadas e logo em `ImagePaths`.
   - Inclua no prompt a instrução de consistência facial e negativa de isolamento:
     - *"FACIAL CONSISTENCY: The subject MUST match the exact person from the reference photo in ImagePaths, maintaining authentic likeness."*
     - *"STRICT RULE: Do NOT copy any names, @handles, signatures, or logos from reference images. Branding must strictly be '@[USUARIO_DO_PROJETO]' or omitted."*
   - Valide a capa e gere os slides seguintes mantendo a consistência do estilo da marca.
3. **Salvar e Visualizar:**
   - Salve em `saidas/carrosseis/{slug}/slide-01.png` até `slide-NN.png`.
   - Crie o manifesto `publicacao.json` com todos os slides listados em `imagens`.
   - Gere a prévia local com `npm run criar-previa` e atualize a vitrine com `npm run atualizar-vitrine`.
4. **Revisão e Quality Gate:** Verifique se as fotos variaram, a fisionomia está preservada e NENHUM dado de terceiros das referências vazou para as imagens. Se vazou, regere imediatamente.
5. **Aprovação:** Com o carrossel aprovado, crie o job com `npm run aprovar:criar`.
