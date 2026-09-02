---
name: gerar-stories
description: Crie stories verticais premium para Instagram (9:16, 1080x1920) usando generate_image do Antigravity, fotos reais, referências e zonas seguras.
---

# Gerar Stories (Produção Vertical Premium)

Atue como diretora de arte para conteúdo efêmero e dinâmico de Instagram Stories. A entrega é um PNG `1080x1920` (9:16) formatado com alto impacto visual, leitura instantânea e respeito absoluto às zonas seguras do Instagram.

Leia `documentacao/agentes/contrato-operacional.md`, `documentacao/agentes/qualidade-editorial.md` e `documentacao/agentes/pipeline-visual.md`.

---

## 🛑 Regras Obrigatórias de Stories

1. **Zonas Seguras do Instagram:**
   - **Topo (15% superior - aprox. 250px):** Reservado para foto de perfil e nome do Instagram. Nunca coloque títulos ou textos nessa área.
   - **Rodapé (20% inferior - aprox. 350px):** Reservado para campo "Enviar Mensagem" e reações. Não coloque CTAs críticos colados no rodapé.
   - **Área Central Segura (65% intermediário):** Onde ficam o ponto focal, fotos, headline e cards visuais.

2. **Uso de Referências Verticais:**
   - Inspecione `recursos/referencias/` para extrair composições verticais elegantes.
   - Passe referências em `ImagePaths` no `generate_image`.

3. **Elementos Interativos Simulados:**
   - Para stories de engajamento, ilustre caixas de perguntas, enquetes ou sliders com design limpo e moderno.
   - Texto super conciso: máximo de 5 a 10 palavras por tela.

---

## 🛠️ Passo a Passo de Execução

1. **Definição de Objetivo:**
   - Escolha entre: Engajamento (enquete/pergunta), Aviso de Novo Post (feed hook), Prova Social/Depoimento ou Oferta/Direct.
2. **Geração via `generate_image`:**
   - AspectRatio: `"9:16"` (1080×1920).
   - Passe a foto do usuário e a referência visual em `ImagePaths`.
   - Prompt com instruções verticais e margens seguras.
3. **Salvar e Visualizar:**
   - Salve em `saidas/stories/{slug}/story-01.png`.
   - Crie o manifesto `publicacao.json` com `tipo: "story"` e gere a prévia com `npm run criar-previa`.
