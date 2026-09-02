import { access, readFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validarIntegracoes } from './validar-integracoes.mjs';

const raizPadrao = join(dirname(fileURLToPath(import.meta.url)), '..');
const argumentos = process.argv.slice(2);
const valor = (nome) => {
  const i = argumentos.indexOf(nome);
  return i < 0 ? undefined : argumentos[i + 1];
};
const diretorioDoProjeto = resolve(valor('--diretorio') || raizPadrao);
const exigirMeta = argumentos.includes('--exigir-meta');
const exigirPages = argumentos.includes('--exigir-pages');
const verificarRede = argumentos.includes('--rede');

async function existe(caminho) {
  try {
    await access(caminho, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

export function lerEnvDiagnostico(conteudo) {
  const valores = new Map();
  for (const original of conteudo.split(/\r?\n/)) {
    const linha = original.trim();
    if (!linha || linha.startsWith('#')) continue;
    const separador = linha.indexOf('=');
    if (separador > 0) {
      valores.set(linha.slice(0, separador).trim(), linha.slice(separador + 1).trim().replace(/^['"]|['"]$/g, ''));
    }
  }
  return valores;
}

export function configurado(valor) {
  return Boolean(valor && !/^<.*>$/.test(valor) && !/^(alterar|preencher|exemplo)/i.test(valor));
}

function estadoCampo(nome, valorCampo, obrigatorio) {
  const pronto = configurado(valorCampo);
  console.log(`- ${nome}: ${pronto ? 'configurado' : obrigatorio ? 'pendente' : 'opcional pendente'}`);
  return pronto;
}

function estadoFerramenta(nome, comando, args) {
  try {
    const versao = execFileSync(comando, args, { encoding: 'utf8' }).trim().split(/\r?\n/)[0];
    console.log(`- ${nome}: disponível (${versao})`);
    return true;
  } catch {
    console.log(`- ${nome}: não encontrado`);
    return false;
  }
}

async function main() {
  console.log('Diagnóstico do Criativo AI Studio');
  const nodeOk = Number(process.versions.node.split('.')[0]) >= 20;
  console.log(`- Node.js: ${nodeOk ? 'disponível' : 'versão incompatível'} (${process.version})`);
  if (!nodeOk) process.exitCode = 1;
  estadoFerramenta('Git', 'git', ['--version']);

  const obrigatorios = [
    'conteudos/perfil-da-marca.md',
    'conteudos/pilares-de-conteudo.md',
    'conteudos/banco-de-ideias.md',
    'conteudos/campanhas.md',
    'documentacao/configurar-meta.md',
    'documentacao/configurar-github-pages.md',
    '.agents/skills/planejar-conteudo/SKILL.md',
    '.agents/skills/copywriter-instagram/SKILL.md',
    '.agents/skills/criar-carrossel/SKILL.md',
    '.agents/skills/criar-post-individual/SKILL.md',
    '.agents/skills/criar-post-anuncio/SKILL.md',
    '.agents/skills/criar-identidade-visual/SKILL.md',
    '.agents/skills/configurar-instagram/SKILL.md',
    '.agents/skills/analise-metricas/SKILL.md',
    '.agents/skills/gerar-stories/SKILL.md'
  ];
  const ausentes = [];
  for (const arquivo of obrigatorios) {
    if (!(await existe(join(diretorioDoProjeto, arquivo)))) ausentes.push(arquivo);
  }
  console.log(`- Estrutura do projeto: ${ausentes.length ? `incompleta (${ausentes.join(', ')})` : 'pronta (9 skills disponíveis)'}`);

  const caminhoEnv = join(diretorioDoProjeto, '.env');
  if (!(await existe(caminhoEnv))) {
    console.log('- .env: não encontrado. Execute npm run configurar.');
    if (exigirMeta) process.exitCode = 1;
    return;
  }
  const env = lerEnvDiagnostico(await readFile(caminhoEnv, 'utf8'));
  const modo = 'local';
  console.log('- .env: encontrado (valores mantidos em sigilo)');
  console.log(`- Modo: ${modo}`);

  console.log('GitHub Pages:');
  const pagesPronto = [
    estadoCampo('GITHUB_PAGES_OWNER', env.get('GITHUB_PAGES_OWNER'), true),
    estadoCampo('GITHUB_PAGES_REPO', env.get('GITHUB_PAGES_REPO'), true),
    estadoCampo('GITHUB_PAGES_TOKEN', env.get('GITHUB_PAGES_TOKEN'), true)
  ].every(Boolean);
  console.log(`- GITHUB_PAGES_BRANCH: ${env.get('GITHUB_PAGES_BRANCH') || 'main (padrão)'}`);
  if (!pagesPronto) console.log('GitHub Pages: siga documentacao/configurar-github-pages.md antes da primeira publicação.');
  if (!pagesPronto && exigirPages) process.exitCode = 1;

  console.log('Meta / Instagram:');
  const metaPronta = [
    estadoCampo('META_API_VERSION', env.get('META_API_VERSION'), true),
    estadoCampo('INSTAGRAM_BUSINESS_ID', env.get('INSTAGRAM_BUSINESS_ID'), true),
    estadoCampo('FACEBOOK_PAGE_ID', env.get('FACEBOOK_PAGE_ID'), true),
    estadoCampo('INSTAGRAM_ACCESS_TOKEN', env.get('INSTAGRAM_ACCESS_TOKEN'), true)
  ].every(Boolean);

  console.log('Telegram:');
  estadoCampo('TELEGRAM_BOT_TOKEN', env.get('TELEGRAM_BOT_TOKEN'), false);
  estadoCampo('TELEGRAM_AUTHORIZED_CHAT_ID', env.get('TELEGRAM_AUTHORIZED_CHAT_ID'), false);
  estadoCampo('TELEGRAM_AUTHORIZED_USER_ID', env.get('TELEGRAM_AUTHORIZED_USER_ID'), false);

  if (!metaPronta) {
    console.log('Meta / Instagram: siga documentacao/configurar-meta.md antes da integração.');
    if (exigirMeta) process.exitCode = 1;
  }

  if (verificarRede && metaPronta && env.get('GITHUB_PAGES_OWNER')) {
    try {
      await validarIntegracoes({ diretorioRaiz: diretorioDoProjeto });
      console.log('- Integrações: Meta/Instagram e hospedagem validadas por conexão real');
    } catch (erro) {
      console.log(`- Integrações: falharam na validação real (${erro.message})`);
      process.exitCode = 1;
    }
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((erro) => {
    console.error(`Diagnóstico interrompido: ${erro.message}`);
    process.exitCode = 1;
  });
}
