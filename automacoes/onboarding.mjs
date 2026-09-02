import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const raizPadrao = join(dirname(fileURLToPath(import.meta.url)), '..');

const vazio = (valor) => !valor || /^(a definir|pendente|nao_iniciado)$/i.test(String(valor).trim());
const corHex = (valor, padrao) => (/^#[0-9a-f]{6}$/i.test(String(valor).trim()) ? String(valor).trim().toLowerCase() : padrao);

async function perguntar(rl, rotulo, atual = '') {
  const sufixo = !vazio(atual) ? ` [Enter preserva: ${atual}]` : '';
  const resposta = (await rl.question(`${rotulo}${sufixo}: `)).trim();
  return resposta || (!vazio(atual) ? atual : 'A definir');
}

async function perguntarObrigatorio(rl, rotulo, atual = '', orientacao = '') {
  for (;;) {
    const valor = await perguntar(rl, rotulo, atual);
    if (!vazio(valor)) return valor;
    console.log(`Decisão obrigatória: ${orientacao || 'registre uma escolha explícita antes de avançar.'}`);
  }
}

function extrairSecao(markdown, titulo) {
  const padrao = new RegExp(`^## ${titulo}\\s*\\r?\\n+([\\s\\S]*?)(?=^## |\\Z)`, 'mi');
  return markdown.match(padrao)?.[1]?.trim().replace(/\n+/g, ' ') || '';
}

function extrairCampo(markdown, rotulo) {
  const escapado = rotulo.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return markdown.match(new RegExp(`^- ${escapado}:\\s*(.+)$`, 'mi'))?.[1]?.trim().replaceAll('`', '') || '';
}

export function montarDesignSystem(dados) {
  return `# Design system da marca

## Essência visual

- Personalidade: ${dados.personalidade}
- Sensação principal: ${dados.sensacao}
- Nível de energia: ${dados.energia}
- Grau de formalidade: ${dados.formalidade}

## Princípios de direção de arte

${dados.principios}

## Paleta

- Primária: \`${dados.primaria}\`
- Secundária: \`${dados.secundaria}\`
- Fundo principal: \`${dados.fundo}\`
- Texto principal: \`${dados.texto}\`
- Acento: \`${dados.acento}\`

Uso e proporção das cores: ${dados.usoCores}

## Tipografia

- Títulos: ${dados.fonteTitulo}
- Texto: ${dados.fonteTexto}
- Ênfases e números: ${dados.enfase}
- Regras de caixa, peso e espaçamento: ${dados.regrasTipo}

## Fotografia e pessoas

- Tratamento fotográfico: ${dados.fotografia}
- Enquadramentos, cenários, luz e expressão: ${dados.enquadramento}
- Identidade pessoal: usar somente fotos autorizadas em \`recursos/fotos/\` e reprovar resultados que não preservem a pessoa.

## Composição

- Densidade e espaço negativo: ${dados.densidade}
- Formas, texturas e componentes: ${dados.componentes}
- Hierarquia típica: ${dados.hierarquia}
- Margens seguras: manter textos, rostos, logos e CTAs afastados das bordas.

## Logo

- Arquivo principal: ${dados.logo}
- Uso: aplicar o arquivo oficial de \`recursos/logos/\`; nunca pedir ao gerador que redesenhe o logo.

## Referências

Use \`recursos/referencias/\` para inspiração de ritmo, composição e tratamento. Referências não substituem este design system e nunca autorizam cópia literal.

## Anti-padrões

${dados.antiPadroes}

## Aplicação por formato

- Carrossel: manter continuidade visual e variação de ritmo entre slides (1080×1350).
- Post individual: uma ideia e um ponto focal dominante (1080×1350).
- Criativo de anúncio: priorizar hipótese, oferta e leitura rápida (1080×1350).
- Stories: layout vertical ágil e zonas seguras respeitadas (1080×1920).
- Preview: exibir os PNGs finais sem redesenhar as peças em HTML.
`;
}

export function montarTokens(dados) {
  const familia = (valor) => String(valor).replace(/["';{}]/g, '').trim() || 'Arial';
  return `:root {
  --brand-primary: ${dados.primaria};
  --brand-secondary: ${dados.secundaria};
  --brand-accent: ${dados.acento};
  --brand-background: ${dados.fundo};
  --brand-surface: #ffffff;
  --brand-text: ${dados.texto};
  --brand-text-muted: ${dados.textoSuave};

  --brand-font-heading: "${familia(dados.fonteTitulo)}", sans-serif;
  --brand-font-body: "${familia(dados.fonteTexto)}", sans-serif;

  --brand-radius-small: 12px;
  --brand-radius-medium: 20px;
  --brand-radius-large: 32px;
  --brand-space-safe: 72px;
  --brand-shadow: 0 18px 45px rgb(0 0 0 / 14%);
}
`;
}

export function montarIdentidadeVisual(dados) {
  return `# Configuração estruturada usada pelos scripts locais.
perfil:
  usuario: ${dados.usuario}
  avatar: ${dados.avatar}
  verificado: false

preview:
  curtidas:
  horario: Agora

tema:
  cor_fundo: "${dados.fundo}"
  cor_texto: "${dados.texto}"
  cor_destaque: "${dados.primaria}"
  cor_secundaria: "${dados.secundaria}"
  cor_acento: "${dados.acento}"
  fonte_titulo: "${dados.fonteTitulo}"
  fonte_texto: "${dados.fonteTexto}"

brand:
  design_system: recursos/brand/design-system.md
  tokens: recursos/brand/tokens.css

recursos:
  fotos: ${JSON.stringify(dados.fotos || '')}
  logo: ${JSON.stringify(dados.logo || '')}
  referencias: ${JSON.stringify(dados.referencias || '')}
  direitos_de_uso: ${JSON.stringify(dados.direitos || '')}
`;
}

export function montarPerfil(dados) {
  return `# Perfil da marca

## Negócio e nicho

${dados.negocio}

## Público prioritário

${dados.publico}

## Momento, dores e desejos do público

${dados.contextoPublico}

## Posicionamento e ponto de vista

${dados.posicionamento}

## Oferta principal

${dados.oferta}

## Transformação e mecanismo

${dados.transformacao}

## Provas e ativos de autoridade

${dados.provas}

## Tom de voz

${dados.tom}

## Vocabulário e expressões

${dados.vocabulario}

## Chamada para ação preferida

${dados.cta}

## Objetivos do Instagram

${dados.objetivos}

## Capacidade de produção

${dados.capacidade}

## Limites e cuidados

${dados.limites}

- Não inventar preços, promessas, resultados, depoimentos ou informações reguladas.
- Confirmar detalhes não definidos antes de usá-los em uma publicação.
`;
}

export function montarBriefingVisual(dados) {
  return `# Briefing visual da marca

## Ativos autorizados

- Fotos: ${dados.fotos}
- Logo: ${dados.logo}
- Referências: ${dados.referencias}
- Direitos de uso: ${dados.direitos}

## Direção da primeira arte

- Conceito visual: ${dados.conceito}
- Ponto focal: ${dados.pontoFocal}
- Estrutura: ${dados.estrutura}
- Layout editorial: ${dados.layout || 'A definir'}
- Etapas ou itens visuais: ${(dados.etapas || []).join(' → ') || 'Não se aplica'}
- Elementos recorrentes: ${dados.componentes}
- Texto de arte: ${dados.textoArte}
- CTA visual: ${dados.ctaVisual}
- Selo editorial: ${dados.selo}

## Aprovação da direção

- Status: aprovada pelo usuário no onboarding
`;
}

export function montarBrandbook(dados) {
  return `# Brandbook da marca

## Fundação

- Nome e assinatura: ${dados.nomeMarca || dados.usuario}
- Origem da identidade: ${dados.origemIdentidade || 'fornecida pelo usuário e organizada no onboarding'}
- Personalidade: ${dados.personalidade}
- Sensação: ${dados.sensacao}
- Tom visual: ${dados.energia}, ${dados.formalidade}

## Sistema visual aprovado

- Paleta: ${dados.primaria}, ${dados.secundaria}, ${dados.fundo}, ${dados.acento}
- Tipografia: ${dados.fonteTitulo} para títulos; ${dados.fonteTexto} para leitura
- Componentes: ${dados.componentes}
- Layout editorial: ${dados.layout || 'A definir'}
- Hierarquia: ${dados.hierarquia}
- Anti-padrões: ${dados.antiPadroes}

## Ativos e uso

- Fotos: ${dados.fotos}
- Logo: ${dados.logo}
- Referências: ${dados.referencias}
- Direitos: ${dados.direitos}

## Governança

- Status: aprovado pelo usuário no onboarding
`;
}

export async function executarOnboarding({ diretorioRaiz = raizPadrao, terminalInterativo = input.isTTY && output.isTTY } = {}) {
  if (!terminalInterativo) {
    throw new Error('O onboarding guiado exige um terminal interativo. No Antigravity IDE, converse diretamente no chat com o agente.');
  }
  const caminho = join(diretorioRaiz, 'conteudos', 'perfil-da-marca.md');
  const atual = await readFile(caminho, 'utf8');
  const caminhoDesign = join(diretorioRaiz, 'recursos', 'brand', 'design-system.md');
  const caminhoBriefingVisual = join(diretorioRaiz, 'recursos', 'brand', 'briefing-visual.md');
  const caminhoBrandbook = join(diretorioRaiz, 'recursos', 'brand', 'brandbook.md');
  const designAtual = await readFile(caminhoDesign, 'utf8');
  const identidadeAtual = await readFile(join(diretorioRaiz, 'conteudos', 'identidade-visual.yml'), 'utf8');
  const rl = createInterface({ input, output });
  try {
    console.log('\nOnboarding estratégico do Criativo AI Studio');
    console.log('Percurso: 1) instalação  2) perfil  3) identidade visual  4) configurações  5) primeiro post e preview  6) postagem.');
    console.log('Insira seus ativos em recursos/ ou registre ausência temporária como “sem logo nesta primeira peça”.\n');
    console.log('Onboarding — etapa 2 de 6: perfil, estratégia e voz\n');

    const dados = {
      negocio: await perguntar(rl, 'Negócio, especialidade e nicho', extrairSecao(atual, 'Negócio e nicho')),
      publico: await perguntar(rl, 'Público prioritário', extrairSecao(atual, 'Público prioritário')),
      contextoPublico: await perguntar(rl, 'Momento, dores, desejos e objeções do público', extrairSecao(atual, 'Momento, dores e desejos do público')),
      posicionamento: await perguntar(rl, 'Posicionamento, crença ou ponto de vista', extrairSecao(atual, 'Posicionamento e ponto de vista')),
      oferta: await perguntar(rl, 'Oferta principal e condições confirmadas', extrairSecao(atual, 'Oferta principal')),
      transformacao: await perguntar(rl, 'Transformação entregue e como ela acontece', extrairSecao(atual, 'Transformação e mecanismo')),
      provas: await perguntar(rl, 'Provas, casos, experiência ou ativos de autoridade', extrairSecao(atual, 'Provas e ativos de autoridade')),
      tom: await perguntar(rl, 'Tom de voz', extrairSecao(atual, 'Tom de voz')),
      vocabulario: await perguntar(rl, 'Palavras que usa e palavras que evita', extrairSecao(atual, 'Vocabulário e expressões')),
      cta: await perguntar(rl, 'CTA preferido', extrairSecao(atual, 'Chamada para ação preferida')),
      objetivos: await perguntar(rl, 'Objetivos do Instagram', extrairSecao(atual, 'Objetivos do Instagram')),
      capacidade: await perguntar(rl, 'Frequência e formatos que consegue produzir', extrairSecao(atual, 'Capacidade de produção')),
      limites: await perguntar(rl, 'Restrições, promessas proibidas ou cuidados', extrairSecao(atual, 'Limites e cuidados'))
    };
    await writeFile(caminho, montarPerfil(dados), 'utf8');

    console.log('\nOnboarding — etapa 3 de 6: ativos, identidade visual e direção de arte\n');
    const ativos = {
      origemIdentidade: await perguntarObrigatorio(rl, 'Identidade existente: informe onde está ou registre FORNECER DEPOIS', '', 'informe a identidade existente ou a decisão de fornecê-la depois'),
      fotos: await perguntarObrigatorio(rl, 'Fotos autorizadas em recursos/fotos/ ou decisão de não usar pessoa', '', 'informe os caminhos ou escreva “não usar pessoa nesta primeira peça”'),
      logo: await perguntarObrigatorio(rl, 'Logo em recursos/logos/ ou decisão de fornecer depois', '', 'informe o caminho ou escreva “sem logo nesta primeira peça”'),
      referencias: await perguntarObrigatorio(rl, 'Referências em recursos/referencias/, links ou BUSCAR DEPOIS', '', 'informe de duas a cinco referências ou registre a busca posterior'),
      direitos: await perguntarObrigatorio(rl, 'Confirmação de direitos de uso dos ativos', '', 'registre quem autorizou as fotos, logo e referências')
    };

    const visual = {
      personalidade: await perguntarObrigatorio(rl, 'Personalidade visual', extrairCampo(designAtual, 'Personalidade')),
      sensacao: await perguntarObrigatorio(rl, 'Sensação que a marca deve transmitir', extrairCampo(designAtual, 'Sensação principal')),
      energia: await perguntarObrigatorio(rl, 'Nível de energia visual', extrairCampo(designAtual, 'Nível de energia')),
      formalidade: await perguntarObrigatorio(rl, 'Grau de formalidade', extrairCampo(designAtual, 'Grau de formalidade')),
      principios: await perguntarObrigatorio(rl, 'Três princípios de direção de arte', extrairSecao(designAtual, 'Princípios de direção de arte')),
      primaria: corHex(await perguntarObrigatorio(rl, 'Cor primária', extrairCampo(designAtual, 'Primária')), '#2a9d8f'),
      secundaria: corHex(await perguntarObrigatorio(rl, 'Cor secundária', extrairCampo(designAtual, 'Secundária')), '#142c2c'),
      fundo: corHex(await perguntarObrigatorio(rl, 'Cor de fundo principal', extrairCampo(designAtual, 'Fundo principal')), '#f4f1ea'),
      texto: corHex(await perguntarObrigatorio(rl, 'Cor de texto principal', extrairCampo(designAtual, 'Texto principal')), '#142c2c'),
      acento: corHex(await perguntarObrigatorio(rl, 'Cor de acento', extrairCampo(designAtual, 'Acento')), '#e9c46a'),
      textoSuave: '#5f6b6b',
      usoCores: await perguntarObrigatorio(rl, 'Como as cores devem ser distribuídas'),
      fonteTitulo: await perguntarObrigatorio(rl, 'Fonte de títulos', extrairCampo(designAtual, 'Títulos')),
      fonteTexto: await perguntarObrigatorio(rl, 'Fonte de textos', extrairCampo(designAtual, 'Texto')),
      enfase: await perguntarObrigatorio(rl, 'Estilo para ênfases e números', extrairCampo(designAtual, 'Ênfases e números')),
      regrasTipo: await perguntarObrigatorio(rl, 'Regras de caixa, peso e espaçamento', extrairCampo(designAtual, 'Regras de caixa, peso e espaçamento')),
      fotografia: await perguntarObrigatorio(rl, 'Tratamento fotográfico', extrairCampo(designAtual, 'Tratamento fotográfico')),
      enquadramento: await perguntarObrigatorio(rl, 'Enquadramentos, cenários, luz e expressão'),
      densidade: await perguntarObrigatorio(rl, 'Densidade e espaço negativo'),
      componentes: await perguntarObrigatorio(rl, 'Formas, texturas e componentes recorrentes'),
      hierarquia: await perguntarObrigatorio(rl, 'Hierarquia visual típica'),
      logo: ativos.logo,
      antiPadroes: await perguntarObrigatorio(rl, 'Estilos e elementos que a marca não deve usar')
    };

    const direcaoVisual = {
      ...ativos,
      conceito: await perguntarObrigatorio(rl, 'Conceito visual do primeiro post'),
      pontoFocal: await perguntarObrigatorio(rl, 'Ponto focal dominante do primeiro post'),
      estrutura: await perguntarObrigatorio(rl, 'Estrutura da composição (por exemplo, editorial em painéis)'),
      layout: await perguntarObrigatorio(rl, 'Território visual (editorial impresso, técnico, brutalismo suave, luxo silencioso, vitalidade orgânica ou dossiê)'),
      etapas: (await perguntar(rl, 'Até quatro etapas/itens visuais, separados por |, ou NÃO SE APLICA')).split('|').map((item) => item.trim()).filter((item) => item && !/não se aplica|nao se aplica/i.test(item)),
      componentes: visual.componentes,
      textoArte: await perguntarObrigatorio(rl, 'Texto central previsto para a arte'),
      ctaVisual: await perguntarObrigatorio(rl, 'CTA visual previsto'),
      selo: await perguntarObrigatorio(rl, 'Selo editorial (por exemplo, IDEIA PRÁTICA)')
    };

    const aprovacaoDirecao = await perguntarObrigatorio(rl, 'Para confirmar, escreva exatamente APROVO DIREÇÃO VISUAL');
    if (aprovacaoDirecao.trim().toUpperCase() !== 'APROVO DIREÇÃO VISUAL') {
      throw new Error('Direção visual não aprovada. Revise as decisões antes de gerar a primeira arte.');
    }

    const usuario = identidadeAtual.match(/^\s{2}usuario:\s*(.*)$/m)?.[1]?.trim() || 'seu_perfil';
    const avatar = identidadeAtual.match(/^\s{2}avatar:\s*(.*)$/m)?.[1]?.trim() || '';

    await writeFile(caminhoDesign, montarDesignSystem(visual), 'utf8');
    await writeFile(join(diretorioRaiz, 'recursos', 'brand', 'tokens.css'), montarTokens(visual), 'utf8');
    await writeFile(join(diretorioRaiz, 'conteudos', 'identidade-visual.yml'), montarIdentidadeVisual({ ...visual, ...ativos, usuario, avatar }), 'utf8');
    await writeFile(caminhoBriefingVisual, montarBriefingVisual(direcaoVisual), 'utf8');
    await writeFile(caminhoBrandbook, montarBrandbook({ ...visual, ...ativos, usuario }), 'utf8');

    await writeFile(
      join(diretorioRaiz, 'conteudos', 'estado-do-studio.yml'),
      `versao: 2
onboarding:
  status: em_andamento
  etapa_atual: configuracoes
  perfil: preenchido
  ativos_visuais: validado
  identidade_visual: validado
  direcao_visual: validado
  pilares: pendente
  primeiro_briefing: pendente
  primeiro_post: pendente
  validacao_usuario: pendente
  integracao_instagram: pendente
  integracao_telegram: opcional
  primeira_publicacao: pendente
producao:
  ultimo_briefing:
  proximo_passo: configurar_meta_e_hospedagem
`,
      'utf8'
    );

    console.log('\nPerfil, ativos, identidade e direção de arte aprovada foram salvos.');
    console.log('Onboarding em andamento — etapa 4 de 6: configurações.');
    console.log('Abra o projeto no Antigravity IDE para continuar o processo com o agente.');
  } finally {
    rl.close();
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  executarOnboarding().catch((erro) => {
    console.error(`Onboarding interrompido: ${erro.message}`);
    process.exitCode = 1;
  });
}
