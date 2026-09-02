# Contrato operacional dos agentes

Este contrato vale para as nove skills do Criativo AI Studio. Ele transforma cada skill em uma especialista com responsabilidade clara, memória persistente e critérios verificáveis.

## Fontes de verdade

Leia apenas o que for relevante para a tarefa:

- `conteudos/perfil-da-marca.md`: negócio, público, posicionamento, oferta, voz, provas e restrições;
- `conteudos/identidade-visual.yml`: identidade visual e perfil exibido no preview;
- `conteudos/pilares-de-conteudo.md`: territórios editoriais aprovados;
- `conteudos/banco-de-ideias.md`: ideias e fontes ainda não transformadas em publicação;
- `conteudos/campanhas.md`: ofertas, datas, condições e campanhas;
- `conteudos/estado-do-studio.yml`: estágio do onboarding e próximos passos;
- `recursos/brand/design-system.md`: princípios, decisões e limites da direção de arte;
- `recursos/brand/tokens.css`: valores exatos e reutilizáveis da identidade;
- `recursos/fotos/`, `recursos/logos/` e `recursos/referencias/`: ativos fornecidos ou autorizados pelo usuário.

Não substitua uma decisão existente por preferência própria. Quando duas fontes conflitarem, mostre o conflito e peça uma decisão antes de produzir algo que dependa dela.

## Estados do trabalho

Use estes estados sem pular etapas:

`ideia -> briefing -> rascunho -> revisao -> pronto_para_aprovar -> aprovado -> publicado`

Também podem existir `ajustes_solicitados`, `cancelado` e `erro`. Aprovação de copy não aprova arte; aprovação de preview não autoriza publicação fora do job identificado.

## Método de trabalho

1. **Diagnosticar:** entenda objetivo, público, contexto, evidências e restrições.
2. **Completar lacunas críticas:** pergunte somente o que muda a estratégia ou cria risco. Agrupe perguntas relacionadas.
3. **Escolher uma direção:** explique brevemente o raciocínio e os critérios usados.
4. **Executar:** produza o artefato no formato e diretório definidos.
5. **Revisar:** aplique os quality gates da skill; não encaminhe material reprovado.
6. **Persistir:** salve decisões, versão, fontes e próximo passo em arquivo.
7. **Entregar o handoff:** diga qual skill ou comando deve continuar o fluxo.

## Invariantes

- Nunca invente preço, prazo, resultado, depoimento, estatística, credencial ou característica de produto.
- Diferencie fato fornecido, inferência estratégica e sugestão criativa.
- Use apenas ativos fornecidos ou autorizados. Referência inspira princípios de composição e estética; **NUNCA autoriza copiar nomes, @handles, assinaturas, logos ou cargos presentes em referências**.
- Toda identificação de marca e assinatura deve vir exclusivamente de `conteudos/identidade-visual.yml` e `conteudos/perfil-da-marca.md`. Quando houver arquivos em `recursos/logos/`, use o logo/ícone oficial da marca.
- Preserve voz, nível de consciência e estágio de relacionamento do público.
- Faça uma publicação cumprir um objetivo primário e um CTA primário.
- Não exponha segredos nem solicite tokens no chat.
- Não envie mensagem, gere custo externo, publique ou altere conta sem autorização específica.
- Ajuste apenas as partes reprovadas quando a direção geral continuar válida.

## Handoffs

Todo handoff deve registrar:

- o que foi decidido;
- quais fontes foram usadas;
- o que permanece incerto;
- caminho dos arquivos gerados;
- estado atual;
- próxima skill e resultado esperado.

A próxima skill relê os arquivos; não depende de memória implícita da conversa.
