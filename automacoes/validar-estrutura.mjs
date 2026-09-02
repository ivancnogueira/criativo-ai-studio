import { access, readFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const arquivos = [
  'package.json',
  'README.md',
  'INSTALAR.md',
  'GEMINI.md',
  '.env.example',
  'automacoes/configurar.mjs',
  'automacoes/onboarding.mjs',
  'automacoes/status-onboarding.mjs',
  'automacoes/lib/configuracao.mjs',
  'automacoes/lib/estado-onboarding.mjs',
  'automacoes/lib/identidade.mjs',
  'automacoes/lib/fila.mjs',
  'automacoes/lib/meta.mjs',
  'automacoes/lib/arquivos.mjs',
  'automacoes/diagnosticar.mjs',
  'automacoes/criar-previa.mjs',
  'automacoes/atualizar-vitrine.mjs',
  'automacoes/publicar-github-pages.mjs',
  'automacoes/servidor-previas.mjs',
  'automacoes/publicar-instagram.mjs',
  'automacoes/ponte-de-aprovacao.mjs',
  'automacoes/cli.mjs',
  'conteudos/perfil-da-marca.md',
  'conteudos/pilares-de-conteudo.md',
  'conteudos/banco-de-ideias.md',
  'conteudos/campanhas.md',
  'conteudos/identidade-visual.yml',
  'conteudos/estado-do-studio.yml',
  'recursos/brand/design-system.md',
  'recursos/brand/brandbook.md',
  'recursos/brand/briefing-visual.md',
  'recursos/brand/tokens.css',
  'templates/preview-instagram.html',
  'exemplos/publicacao-exemplo.json',
  'documentacao/configurar-meta.md',
  'documentacao/configurar-github-pages.md',
  'documentacao/links-oficiais.json',
  'documentacao/fluxo-completo.md',
  'documentacao/onboarding-guiado.md',
  'documentacao/agentes/contrato-operacional.md',
  'documentacao/agentes/qualidade-editorial.md',
  'documentacao/agentes/pipeline-visual.md',
  'documentacao/configurar-telegram.md'
];

const skills = [
  'planejar-conteudo',
  'copywriter-instagram',
  'criar-carrossel',
  'criar-post-individual',
  'criar-post-anuncio',
  'criar-identidade-visual',
  'configurar-instagram',
  'analise-metricas',
  'gerar-stories'
];

async function existe(caminho) {
  try {
    await access(caminho, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const problemas = [];
  for (const arquivo of arquivos) {
    if (!(await existe(join(raiz, arquivo)))) {
      problemas.push(`Arquivo obrigatório ausente: ${arquivo}`);
    }
  }

  for (const skill of skills) {
    const caminho = join(raiz, '.agents', 'skills', skill, 'SKILL.md');
    if (!(await existe(caminho))) {
      problemas.push(`Skill ausente: ${skill}`);
      continue;
    }
    const conteudo = await readFile(caminho, 'utf8');
    if (!conteudo.startsWith('---\n') || !conteudo.includes(`name: ${skill}`) || !/description:\s*\S/.test(conteudo)) {
      problemas.push(`Frontmatter inválido: .agents/skills/${skill}/SKILL.md`);
    }
  }

  if (problemas.length) {
    for (const problema of problemas) console.error(`- ${problema}`);
    process.exitCode = 1;
    return;
  }

  console.log(`Estrutura validada com sucesso: ${arquivos.length} arquivos-base e ${skills.length} skills do Antigravity.`);
}

main().catch((erro) => {
  console.error(`Validação interrompida: ${erro.message}`);
  process.exitCode = 1;
});
