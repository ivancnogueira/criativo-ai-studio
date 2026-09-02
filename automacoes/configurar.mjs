import { access, copyFile, mkdir, readFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { execFileSync, spawn } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { executarOnboarding } from './onboarding.mjs';
import { mostrarStatusOnboarding } from './status-onboarding.mjs';
import { lerEnv } from './lib/arquivos.mjs';
import { atualizarArquivoEnv, detectarAmbiente, normalizarModo } from './lib/configuracao.mjs';

const arquivoAtual = fileURLToPath(import.meta.url);
const diretorioPadrao = resolve(dirname(arquivoAtual), '..');
const argumentos = process.argv.slice(2);

function valorDaOpcao(nome) {
  const indice = argumentos.indexOf(nome);
  if (indice === -1) return undefined;
  const valor = argumentos[indice + 1];
  if (!valor || valor.startsWith('--')) throw new Error(`A opção ${nome} precisa de um valor.`);
  return valor;
}

function possui(nome) {
  return argumentos.includes(nome);
}

function mostrarAjuda() {
  console.log(`Criativo AI Studio — Configuração

Uso interativo:
  npm run configurar

Opções:
  --sem-interacao         Executa sem perguntas usando valores padrão seguros
  --sem-instalar          Não executa npm install
  --diretorio DIRETORIO   Diretório do projeto
  --ajuda                 Mostra esta ajuda
`);
}

async function existe(caminho) {
  try {
    await access(caminho, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

function verificarRuntime() {
  const versao = Number(process.versions.node.split('.')[0]);
  if (!Number.isInteger(versao) || versao < 20) {
    throw new Error('É necessário usar Node.js 20 ou superior.');
  }
}

function instalarDependencias(diretorioDoProjeto) {
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  console.log('Verificando dependências do projeto...');
  execFileSync(npm, ['install', '--ignore-scripts', '--no-audit', '--no-fund'], {
    cwd: diretorioDoProjeto,
    stdio: 'inherit',
    shell: process.platform === 'win32'
  });
}

async function garantirDiretorios(diretorioDoProjeto) {
  const diretorios = [
    'conteudos',
    'documentacao',
    'previas',
    'recursos/brand',
    'recursos/logos',
    'recursos/fotos',
    'recursos/referencias',
    'saidas/carrosseis',
    'saidas/posts-individuais',
    'saidas/posts-de-anuncio',
    'saidas/stories',
    'runtime',
    'logs'
  ];
  await Promise.all(diretorios.map((pasta) => mkdir(join(diretorioDoProjeto, pasta), { recursive: true })));
}

async function criarEnvSeNecessario(diretorioDoProjeto) {
  const destino = join(diretorioDoProjeto, '.env');
  if (await existe(destino)) {
    console.log('.env preservado: nenhuma credencial existente foi substituída.');
    return;
  }
  await copyFile(join(diretorioDoProjeto, '.env.example'), destino);
  console.log('.env criado a partir de .env.example. Preencha credenciais somente neste arquivo local.');
}

export async function escolherModo({ diretorioDoProjeto, modoNaoInterativo }) {
  const env = await lerEnv(join(diretorioDoProjeto, '.env'));
  const detectado = await detectarAmbiente();
  const modo = normalizarModo(env.APP_MODE || 'local');
  return { modo, base: '', detectado, env };
}

async function salvarModo(diretorioDoProjeto, escolha) {
  const env = escolha.env;
  const valores = {
    APP_MODE: 'local',
    PREVIEW_HOST: '127.0.0.1',
    PREVIEW_PORT: env.PREVIEW_PORT || '4173'
  };
  await atualizarArquivoEnv(join(diretorioDoProjeto, '.env'), valores);
  console.log('Modo local configurado.');
}

function abrirDestino(destino) {
  const comando = process.platform === 'win32' ? 'explorer.exe' : process.platform === 'darwin' ? 'open' : 'xdg-open';
  const args = [destino];
  const processo = spawn(comando, args, { detached: true, stdio: 'ignore' });
  processo.unref();
}

async function oferecerGuias(diretorioDoProjeto, modoNaoInterativo) {
  if (modoNaoInterativo || !input.isTTY || !output.isTTY) return;
  const rl = createInterface({ input, output });
  try {
    const abrirPages = (await rl.question('Deseja abrir o guia do GitHub Pages agora? [s/N] ')).trim().toLowerCase();
    if (['s', 'sim'].includes(abrirPages)) {
      abrirDestino(join(diretorioDoProjeto, 'documentacao', 'configurar-github-pages.md'));
    }

    const abrirMeta = (await rl.question('Deseja abrir o guia de configuração da Meta API agora? [s/N] ')).trim().toLowerCase();
    if (['s', 'sim'].includes(abrirMeta)) {
      abrirDestino(join(diretorioDoProjeto, 'documentacao', 'configurar-meta.md'));
    }
  } finally {
    rl.close();
  }
}

async function oferecerOnboarding(diretorioDoProjeto) {
  if (!input.isTTY || !output.isTTY) return;
  const rl = createInterface({ input, output });
  let iniciar = false;
  try {
    const resposta = (await rl.question('Executar agora o onboarding estratégico da marca pelo terminal? [S/n] ')).trim().toLowerCase();
    iniciar = !['n', 'nao', 'não'].includes(resposta);
  } finally {
    rl.close();
  }
  if (iniciar) {
    await executarOnboarding({ diretorioRaiz: diretorioDoProjeto });
  } else {
    console.log('Onboarding adiado. Você pode realizá-lo diretamente no chat do Antigravity IDE ou com npm run onboarding.');
  }
}

async function executarDiagnostico(diretorioDoProjeto) {
  console.log('\nExecutando diagnóstico...');
  execFileSync(process.execPath, [join(diretorioDoProjeto, 'automacoes', 'diagnosticar.mjs'), '--diretorio', diretorioDoProjeto], {
    cwd: diretorioDoProjeto,
    stdio: 'inherit'
  });
}

async function main() {
  if (possui('--ajuda')) {
    mostrarAjuda();
    return;
  }
  const diretorioDoProjeto = resolve(valorDaOpcao('--diretorio') ?? diretorioPadrao);
  const modoNaoInterativo = possui('--sem-interacao');

  if (!(await existe(join(diretorioDoProjeto, 'package.json'))) || !(await existe(join(diretorioDoProjeto, '.env.example')))) {
    throw new Error('Diretório sem a estrutura esperada do Criativo AI Studio.');
  }

  verificarRuntime();
  if (!possui('--sem-instalar')) instalarDependencias(diretorioDoProjeto);
  await garantirDiretorios(diretorioDoProjeto);
  await criarEnvSeNecessario(diretorioDoProjeto);
  const escolha = await escolherModo({ diretorioDoProjeto, modoNaoInterativo });
  await salvarModo(diretorioDoProjeto, escolha);

  if (!modoNaoInterativo) await oferecerOnboarding(diretorioDoProjeto);
  await oferecerGuias(diretorioDoProjeto, modoNaoInterativo);
  await executarDiagnostico(diretorioDoProjeto);
  await mostrarStatusOnboarding(diretorioDoProjeto);

  console.log('\nConfiguração concluída com sucesso!');
}

if (process.argv[1] === arquivoAtual) {
  main().catch((erro) => {
    console.error(`Configuração interrompida: ${erro.message}`);
    process.exitCode = 1;
  });
}
