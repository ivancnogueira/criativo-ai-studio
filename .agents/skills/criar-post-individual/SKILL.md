---
name: criar-post-individual
description: Crie posts individuais premium para Instagram (1080x1350) adaptados fielmente ao estilo, cores e referências do usuário usando generate_image do Antigravity, fotos reais, logos, preview mobile e aprovação.
---

# Criar Post Individual (Estilo Próprio do Usuário)

Atue como diretora de arte e designer especializada em traduzir a identidade única de cada marca em publicações visuais de alto impacto. **Não existe um estilo pré-definido:** a estética da arte é moldada pelas referências, cores e design system fornecidos pelo usuário.

Leia `documentacao/agentes/contrato-operacional.md`, `documentacao/agentes/qualidade-editorial.md` e `documentacao/agentes/pipeline-visual.md`.

---

## 🎨 Como Definir a Direção de Arte da Peça

1. **Inspecione as Referências do Usuário (APENAS Estilo e Composição):**
   - Abra e analise as imagens em `recursos/referencias/`.
   - Identifique a atmosfera: é clean/minimalista? É acolhedora/quente? É luxuosa/sóbria? É vibrante/pop? É técnica/moderna?
   - Observe como os textos, fotos e elementos gráficos são distribuídos nas referências do usuário.
   - **REGRA CRÍTICA ANTI-CÓPIA:** Referências servem exclusivamente para direção artística. **NUNCA copie nomes de pessoas, marcas, designers, @handles, assinaturas, logos ou textos das referências.** A única identidade permitida na arte é a do usuário atual (`conteudos/identidade-visual.yml`).

2. **Inspecione as Cores e Fontes da Marca:**
   - Leia `conteudos/identidade-visual.yml` e `recursos/brand/tokens.css`.
   - Use as cores da marca (fundo, texto, destaque, acento) no prompt.

3. **Seleção Inteligente e Variação de Fotos (`recursos/fotos/`):**
   - **NÃO use sempre a mesma foto.** Inspecione todo o acervo em `recursos/fotos/` e selecione uma foto diferente e coerente com a mensagem do post (postura séria, descontraída, close, meio-corpo, etc.).
   - Passe a foto selecionada em `ImagePaths`.

4. **Uso de `ImagePaths` e Logo:**
   - Passe a referência estética de `recursos/referencias/`, a foto selecionada de `recursos/fotos/` e o logo oficial de `recursos/logos/` (se houver).

---

## 📐 Princípios Universais de Composição

Independentemente do nicho e estilo escolhido:

- **Hierarquia Visual:** Título/headline com destaque claro, subtítulo curto de apoio e identificação sutil da marca ou autor (`@[USUARIO_DO_PROJETO]`).
- **Consistência Facial e Integração Fotográfica:** Ao gerar o sujeito na cena, instrua o gerador a preservar fielmente o rosto da pessoa de `ImagePaths` (`SUBJECT / FACIAL CONSISTENCY`), adaptando iluminação e sombras ao cenário.
- **Textos Curtos na Imagem:** Máximo de 8 a 15 palavras na arte para manter a legibilidade no smartphone e fidelidade ortográfica em português. Detalhes e método ficam na **legenda**.
- **Margens Seguras:** Mantenha 10% de margem livre em todas as bordas para evitar cortes no feed e nos diferentes dispositivos.

---

## 🛠️ Passo a Passo de Execução

1. **Briefing & Copy:**
   - Defina a headline central, o apoio visual e escreva a legenda persuasiva completa.
2. **Geração via `generate_image`:**
   - `AspectRatio`: `"3:4"` (1080×1350).
   - `ImagePaths`: `["recursos/referencias/ref-usuario.jpg", "recursos/fotos/foto-selecionada.jpg", "recursos/logos/logo.png"]`.
   - `Prompt`: Descreva a composição baseando-se no estilo das referências, cores da marca e preservação facial do sujeito.
   - **Cláusulas Obrigatórias no Prompt**:
     - *Anti-Cópia*: *"STRICT RULE: Do NOT copy any names, @handles, watermarks, signatures, or logos from reference images. Branding must strictly be '@[USUARIO_DO_PROJETO]' or omitted."*
     - *Consistência Facial*: *"FACIAL CONSISTENCY: The subject MUST be the exact person from the reference photo, preserving their facial structure, features, and authentic likeness seamlessly in the scene."*
3. **Salvar e Visualizar:**
   - Salve a arte em `saidas/posts-individuais/{slug}/slide-01.png`.
   - Crie o manifesto `publicacao.json`.
   - Gere o preview local com `npm run criar-previa -- saidas/posts-individuais/{slug}/publicacao.json`.
   - Atualize a vitrine com `npm run atualizar-vitrine`.
4. **Revisão e Quality Gate:** Confirme que a foto variou, a fisionomia está autêntica e nenhum dado/arroba de terceiros vazou para a arte antes de avançar.
5. **Aprovação:**
   - Com a prévia aprovada pelo usuário, gere o job com `npm run aprovar:criar -- saidas/posts-individuais/{slug}/publicacao.json`.
