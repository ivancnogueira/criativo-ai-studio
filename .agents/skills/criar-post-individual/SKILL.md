---
name: criar-post-individual
description: Crie posts individuais premium para Instagram (1080x1350) adaptados fielmente ao estilo, cores e referências do usuário usando generate_image do Antigravity, fotos reais, logos, preview mobile e aprovação.
---

# Criar Post Individual (Estilo Próprio do Usuário)

Atue como diretora de arte e designer especializada em traduzir a identidade única de cada marca em publicações visuais de alto impacto. **Não existe um estilo pré-definido:** a estética da arte é moldada pelas referências, cores e design system fornecidos pelo usuário.

Leia `documentacao/agentes/contrato-operacional.md`, `documentacao/agentes/qualidade-editorial.md` e `documentacao/agentes/pipeline-visual.md`.

---

## 🎨 Como Definir a Direção de Arte da Peça

1. **Inspecione as Referências do Usuário:**
   - Abra e analise as imagens em `recursos/referencias/`.
   - Identifique a atmosfera: é clean/minimalista? É acolhedora/quente? É luxuosa/sóbria? É vibrante/pop? É técnica/moderna?
   - Observe como os textos, fotos e elementos gráficos são distribuídos nas referências do usuário.

2. **Inspecione as Cores e Fontes da Marca:**
   - Leia `conteudos/identidade-visual.yml` e `recursos/brand/tokens.css`.
   - Use as cores da marca (fundo, texto, destaque, acento) no prompt.

3. **Uso de `ImagePaths`:**
   - Passe até 2 referências estéticas de `recursos/referencias/` + a foto da pessoa/produto de `recursos/fotos/` no parâmetro `ImagePaths` do `generate_image`.

---

## 📐 Princípios Universais de Composição

Independentemente do nicho e estilo escolhido:

- **Hierarquia Visual:** Título/headline com destaque claro, subtítulo curto de apoio e identificação sutil da marca ou autor (`@usuario`).
- **Integração Fotográfica:** Se houver pessoa ou produto, garanta iluminação e sombras que combinem com o cenário e a atmosfera das referências.
- **Textos Curtos na Imagem:** Máximo de 8 a 15 palavras na arte para manter a legibilidade no smartphone e fidelidade ortográfica em português. Detalhes e método ficam na **legenda**.
- **Margens Seguras:** Mantenha 10% de margem livre em todas as bordas para evitar cortes no feed e nos diferentes dispositivos.

---

## 🛠️ Passo a Passo de Execução

1. **Briefing & Copy:**
   - Defina a headline central, o apoio visual e escreva a legenda persuasiva completa.
2. **Geração via `generate_image`:**
   - `AspectRatio`: `"3:4"` (1080×1350).
   - `ImagePaths`: `["recursos/referencias/ref-usuario.jpg", "recursos/fotos/foto-usuario.jpg"]`.
   - `Prompt`: Descreva a composição baseando-se no estilo extraído das referências e nas cores da marca.
3. **Salvar e Visualizar:**
   - Salve a arte em `saidas/posts-individuais/{slug}/slide-01.png`.
   - Crie o manifesto `publicacao.json`.
   - Gere o preview local com `npm run criar-previa -- saidas/posts-individuais/{slug}/publicacao.json`.
   - Atualize a vitrine com `npm run atualizar-vitrine`.
4. **Aprovação:**
   - Com a prévia aprovada pelo usuário, gere o job com `npm run aprovar:criar -- saidas/posts-individuais/{slug}/publicacao.json`.
