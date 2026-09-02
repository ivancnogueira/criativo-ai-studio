---
name: criar-post-individual
description: Crie posts individuais premium para Instagram com acabamento editorial de revista usando generate_image do Antigravity, fotos reais, logos, referências estéticas, preview mobile e aprovação.
---

# Criar Post Individual (Produção Editorial Premium)

Atue como diretora de arte e designer editorial sênior de publicações de alto impacto. O objetivo é produzir uma peça visual que pareça uma capa de revista de negócios internacional (estilo Bloomberg, Wired, Fast Company) — rica em detalhes, iluminação e composição.

Leia `documentacao/agentes/contrato-operacional.md`, `documentacao/agentes/qualidade-editorial.md` e `documentacao/agentes/pipeline-visual.md`.

---

## 🛑 Regras Obrigatórias de Produção

1. **Uso Ativo de Referências:**
   - Inspecione sempre `recursos/referencias/` antes de escrever o prompt.
   - Passe até 2 referências estéticas de layout + a foto do usuário em `ImagePaths` no `generate_image`.
   - Replique ou combine o layout, enquadramento, peso tipográfico e tratamento de luz das melhores referências.

2. **Hierarquia Tipográfica de 4 Níveis:**
   - **Nível 1 (Selo/Badge no Topo):** Caixa alta com espaçamento entre letras em moldura fina. Ex: `[ ESTRATÉGIA DE IA ]`.
   - **Nível 2 (Headline Principal):** Título curto em peso pesado (Bold 800+), alto contraste e quebra inteligente.
   - **Nível 3 (Subtítulo/Apoio):** 1 frase concisa em peso regular ou itálico.
   - **Nível 4 (Rodapé com Assinatura e CTA):** `@usuario.marketing` + selo visual `Leia a legenda ↗` ou `Salvar 🔖`.

3. **Integração Fotográfica Profissional:**
   - A pessoa ou produto NÃO deve ficar chapada como adesivo.
   - Aplique luz direcional de estúdio, luz de contorno (rim light) nas bordas com a cor de destaque da marca e sombras de contato realistas.
   - Fundo com profundidade (gradientes dark mode, texturas sutis de estúdio, iluminação volumétrica).

4. **Ortografia e Textos Curtos:**
   - Mantenha textos curtos na arte (máximo 8 a 15 palavras) para garantir ortografia impecável em português.
   - Todo o aprofundamento, método e narrativa devem estar na **legenda**.

---

## 🛠️ Passo a Passo de Execução

### 1. Preflight e Ativos
- Leia o perfil da marca em `conteudos/perfil-da-marca.md` e a identidade em `conteudos/identidade-visual.yml`.
- Liste os arquivos em `recursos/fotos/`, `recursos/logos/` e `recursos/referencias/`.
- Selecione a melhor foto e a melhor referência de layout.

### 2. Copy da Arte e Legenda
- Defina o selo, a headline exata (entre aspas), o subtítulo de apoio e o CTA visual.
- Escreva a legenda completa e persuasiva com gancho, desenvolvimento e CTA para o direct ou comentários.

### 3. Geração via `generate_image`
- Invoque `generate_image` com:
  - `AspectRatio`: `"3:4"` (1080×1350)
  - `ImagePaths`: `["recursos/referencias/ref.jpg", "recursos/fotos/foto.jpg", "recursos/logos/logo.png"]`
  - `Prompt`: Descrição editorial completa detalhando cada elemento visual em inglês/português estruturado.
  - `ImageName`: `slug_do_post_arte`

### 4. Salvamento e Prévia
- Salve a imagem gerada em `saidas/posts-individuais/{slug}/slide-01.png` (ou `arte-final.jpg/png`).
- Crie o manifesto `publicacao.json` com campos `id`, `slug`, `tipo: "post-individual"`, `titulo`, `legenda`, `imagens: ["saidas/posts-individuais/{slug}/slide-01.png"]`, `slides`, `headline`, `cta`.
- Execute `npm run criar-previa -- saidas/posts-individuais/{slug}/publicacao.json`.
- Execute `npm run atualizar-vitrine`.

---

## 🔍 Quality Gates Bloqueantes

- A arte parece uma produção de design editorial profissional?
- As referências de `recursos/referencias/` foram aproveitadas?
- A pessoa está harmoniosamente iluminada e integrada na cena?
- O texto está correto em português e tem 4 níveis de hierarquia?
- O preview local abre corretamente com a imagem e avatar?

Se tudo estiver aprovado visualmente, crie o job para aprovação:
```powershell
npm run aprovar:criar -- saidas/posts-individuais/{slug}/publicacao.json
```
