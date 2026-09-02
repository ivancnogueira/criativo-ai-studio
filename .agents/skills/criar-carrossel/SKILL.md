---
name: criar-carrossel
description: Crie carrosséis premium de Instagram usando generate_image do Antigravity, referências estéticas, fotos reais, logos, design system, revisão visual, preview e aprovação.
---

# Criar Carrossel (Produção Editorial Sequencial)

Atue como diretora de arte e designer editorial de carrosséis de alto engajamento. A entrega consiste em PNGs `1080x1350` (3:4) diagramados com narrativa envolvente e consistência visual rigorosa entre todos os slides.

Leia `documentacao/agentes/contrato-operacional.md`, `documentacao/agentes/qualidade-editorial.md` e `documentacao/agentes/pipeline-visual.md`.

---

## 🛑 Regras Obrigatórias de Produção

1. **Uso Ativo de Referências de Carrossel:**
   - Inspecione sempre `recursos/referencias/` para extrair grids de carrossel, elementos de continuidade e diagramação de slides internos.
   - Passe as referências em `ImagePaths` no `generate_image`.

2. **Hierarquia e Narrativa dos Slides:**
   - **Slide 1 (Capa):** Padrão capa de revista de negócios com gancho visual irresistível, selo de categoria, headline dominante, foto integrada com iluminação de recorte e CTA de arraste `Arraste para o lado ➔`.
   - **Slides Internos (2 a N-1):** Foco em 1 ideia central por slide, diagramação limpa em cards ou tópicos visuais, ícones geométricos minimalistas, marcadores numerados `01`, `02` elegantes e elementos de continuidade visual.
   - **Slide Final (Fechamento):** Síntese da transformação, foto de perfil/autoridade, selo de marca `@usuario.marketing` e múltiplos CTAs visuais (Salvar 🔖, Compartilhar ✈️, Comentar 💬).

3. **Consistência Visual Invariante:**
   - Repita o mesmo fundo, paleta de cores, tipografia, tratamento de iluminação e componentes gráficos em todos os prompts da sequência.
   - Mantenha a numeração de slides consistente no topo ou rodapé (ex.: `01 / 05`, `02 / 05`...).

4. **Textos Curtos e Legíveis:**
   - Máximo de 15 a 25 palavras por slide interno.
   - Não sobrecarregue os slides com parágrafos densos; detalhes estratégicos ficam na **legenda**.

---

## 🛠️ Passo a Passo de Execução

1. **Estrutura da Narrativa:**
   - Planeje a sequência de 3 a 7 slides antes de gerar: Capa -> Tensão/Diagnóstico -> Método/Passos -> Aplicação Prática -> Fechamento & CTA.
2. **Escrever Prompts Sequenciais:**
   - Escreva todos os prompts antes de iniciar a geração para fixar a coerência de estilo, luz e componentes.
3. **Geração com `generate_image`:**
   - Gere a Capa (`slide-01.png`) com aspect ratio `3:4` passando referências e fotos em `ImagePaths`.
   - Valide a capa e gere sequencialmente `slide-02.png`, `slide-03.png`... mantendo o estilo visual.
4. **Manifesto e Prévia:**
   - Salve os slides em `saidas/carrosseis/{slug}/slide-01.png` até `slide-NN.png`.
   - Crie o manifesto `publicacao.json` com `imagens` listando todos os slides na ordem.
   - Execute `npm run criar-previa -- saidas/carrosseis/{slug}/publicacao.json`.
   - Execute `npm run atualizar-vitrine`.

---

## 🔍 Quality Gates por Slide

- A capa tem impacto visual imediato com hierarquia tipográfica clara?
- Todos os slides pertencem claramente à mesma identidade visual e atmosfera?
- A pessoa e os elementos estão perfeitamente integrados e iluminados?
- O preview local permite folhear todos os slides suavemente no mobile/desktop?

Com a aprovação visual da sequência, crie o job:
```powershell
npm run aprovar:criar -- saidas/carrosseis/{slug}/publicacao.json
```
