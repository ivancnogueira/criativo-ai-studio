import { readFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { alterarJob, criarJob, listarJobs } from './lib/fila.mjs';
import { lerEnv } from './lib/arquivos.mjs';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const opcao = (nome) => {
  const i = process.argv.indexOf(nome);
  return i < 0 ? undefined : process.argv[i + 1];
};

export async function processarAcao({ diretorioRaiz = raiz, codigo, chatId, remetente, acao, observacao = '' }) {
  const env = await lerEnv(join(diretorioRaiz, '.env'));
  const chat = String(chatId ?? remetente ?? '');
  const usuario = String(remetente ?? chatId ?? '');
  if (!env.TELEGRAM_AUTHORIZED_CHAT_ID || chat !== String(env.TELEGRAM_AUTHORIZED_CHAT_ID)) {
    throw new Error('Chat não autorizado.');
  }
  if (env.TELEGRAM_AUTHORIZED_USER_ID && usuario !== String(env.TELEGRAM_AUTHORIZED_USER_ID)) {
    throw new Error('Remetente não autorizado.');
  }
  return alterarJob(diretorioRaiz, String(codigo).toUpperCase(), usuario, acao, observacao);
}

export async function aprovarNoChat({ diretorioRaiz = raiz, codigo, confirmacao }) {
  const id = String(codigo || '').toUpperCase();
  const esperado = `APROVAR ${id}`;
  if (!id || String(confirmacao || '').trim().toUpperCase() !== esperado) {
    throw new Error(`Confirmação inválida. Responda exatamente: ${esperado}`);
  }
  return alterarJob(diretorioRaiz, id, 'antigravity-chat-local', 'aprovar', 'Confirmação exata recebida no chat do projeto.');
}

async function main() {
  const pos = process.argv.slice(2).filter((item) => !item.startsWith('--'));

  if (process.argv.includes('--criar')) {
    const caminho = opcao('--dados') || pos[0];
    if (!caminho) throw new Error('Informe o caminho de publicacao.json.');
    const job = await criarJob(raiz, JSON.parse(await readFile(resolve(caminho), 'utf8')));
    console.log(`Tarefa ${job.id} criada e pronta para aprovação.`);
    console.log(`Para aprovar, use no chat do Antigravity: APROVAR ${job.id}`);
    return;
  }

  if (process.argv.includes('--listar')) {
    const jobs = await listarJobs(raiz, opcao('--status'));
    if (!jobs.length) {
      console.log('Nenhuma tarefa na fila de aprovação.');
      return;
    }
    for (const job of jobs) {
      console.log(`${job.id}: ${job.status} (criado em ${job.criadoEm})`);
    }
    return;
  }

  if (process.argv.includes('--aprovar-local')) {
    const codigo = opcao('--codigo') || pos[0];
    const confirmacao = opcao('--confirmacao') || pos[1];
    if (!codigo || !confirmacao) throw new Error('Informe o ID e a confirmação exata APROVAR ID-DO-JOB.');
    const job = await aprovarNoChat({ codigo, confirmacao });
    console.log(`Tarefa ${job.id}: aprovada e registrada para esta versão.`);
    return;
  }

  const acao = ['aprovar', 'ajuste', 'cancelar'].find((item) => process.argv.includes(`--${item}`));
  const codigo = acao ? opcao(`--${acao}`) : '';
  const remetente = opcao('--remetente');
  const chatId = opcao('--chat') || remetente;
  if (!acao || !codigo || !remetente || !chatId) {
    throw new Error('Informe ação, código, --chat e --remetente.');
  }
  const job = await processarAcao({ codigo, chatId, remetente, acao, observacao: opcao('--observacao') || '' });
  console.log(`Tarefa ${job.id}: ${job.status}.`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((erro) => {
    console.error(`Aprovação não processada: ${erro.message}`);
    process.exitCode = 1;
  });
}
