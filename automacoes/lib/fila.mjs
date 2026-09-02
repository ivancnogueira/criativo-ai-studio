import { readdir, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { isAbsolute, join, relative, resolve } from 'node:path';
import { auditar, escreverJsonAtomico } from './arquivos.mjs';

export const STATUS = ['rascunho', 'pronto_para_aprovar', 'ajuste_solicitado', 'aprovado', 'publicando', 'publicado', 'cancelado', 'erro'];

export function codigoValido(codigo) {
  return /^[A-Z0-9][A-Z0-9-]{2,40}$/.test(codigo || '');
}

export async function calcularFingerprint(publicacao, raiz = process.cwd()) {
  const hash = createHash('sha256');
  const imagensNormalizadas = (publicacao.imagens || []).map((img) => {
    const abs = isAbsolute(img) ? img : resolve(raiz, img);
    return relative(raiz, abs).replaceAll('\\', '/');
  });

  const contrato = {
    id: publicacao.id || '',
    slug: publicacao.slug || '',
    tipo: publicacao.tipo || '',
    titulo: publicacao.titulo || '',
    legenda: publicacao.legenda || '',
    imagens: imagensNormalizadas,
    urlsPublicas: publicacao.urlsPublicas || []
  };
  hash.update(JSON.stringify(contrato));

  for (const img of publicacao.imagens || []) {
    const abs = isAbsolute(img) ? img : resolve(raiz, img);
    try {
      hash.update(await readFile(abs));
    } catch (erro) {
      if (erro.code === 'ENOENT') hash.update(`arquivo-ausente:${abs}`);
      else throw erro;
    }
  }
  return hash.digest('hex');
}

export async function criarJob(raiz, publicacao) {
  const id = String(publicacao.id || '').toUpperCase();
  if (!codigoValido(id)) {
    throw new Error('A publicação precisa de um id único com 3 a 40 letras, números ou hífens.');
  }
  const caminho = join(raiz, 'runtime', 'fila', `${id}.json`);
  try {
    await readFile(caminho);
    throw new Error(`Já existe uma tarefa com o id ${id}.`);
  } catch (erro) {
    if (erro.code !== 'ENOENT') throw erro;
  }
  const agora = new Date().toISOString();
  const fingerprint = await calcularFingerprint(publicacao, raiz);
  const job = {
    id,
    codigo: id,
    status: 'pronto_para_aprovar',
    criadoEm: agora,
    atualizadoEm: agora,
    publicacao,
    fingerprint,
    aprovadoPor: null,
    aprovadoEm: null,
    consumidoEm: null,
    resultado: null
  };
  await escreverJsonAtomico(caminho, job);
  await auditar(raiz, { id, acao: 'job_criado', status: job.status });
  return job;
}

export async function lerJob(raiz, codigo) {
  return JSON.parse(await readFile(join(raiz, 'runtime', 'fila', `${String(codigo).toUpperCase()}.json`), 'utf8'));
}

export async function alterarJob(raiz, codigo, remetente, acao, observacao = '') {
  const job = await lerJob(raiz, codigo);
  const agora = new Date().toISOString();
  if (['publicado', 'cancelado'].includes(job.status)) {
    throw new Error(`A tarefa ${job.id} já está encerrada como ${job.status}.`);
  }
  if (acao === 'aprovar') {
    if (job.status !== 'pronto_para_aprovar') {
      throw new Error(`A tarefa ${job.id} não está pronta para aprovação.`);
    }
    if (job.fingerprint !== (await calcularFingerprint(job.publicacao, raiz))) {
      throw new Error(`A publicação ${job.id} mudou após entrar na fila. Crie uma nova solicitação.`);
    }
    Object.assign(job, { status: 'aprovado', aprovadoPor: String(remetente), aprovadoEm: agora });
  } else if (acao === 'ajuste') {
    Object.assign(job, { status: 'ajuste_solicitado', observacao });
  } else if (acao === 'cancelar') {
    job.status = 'cancelado';
  } else {
    throw new Error('Ação de aprovação desconhecida.');
  }
  job.atualizadoEm = agora;
  await escreverJsonAtomico(join(raiz, 'runtime', 'fila', `${job.id}.json`), job);
  await auditar(raiz, { id: job.id, acao, status: job.status, remetente: String(remetente) });
  return job;
}

export async function listarJobs(raiz, status) {
  const pasta = join(raiz, 'runtime', 'fila');
  let nomes;
  try {
    nomes = await readdir(pasta);
  } catch (erro) {
    if (erro.code === 'ENOENT') return [];
    throw erro;
  }
  const jobs = await Promise.all(
    nomes
      .filter((nome) => nome.endsWith('.json'))
      .map(async (nome) => JSON.parse(await readFile(join(pasta, nome), 'utf8')))
  );
  return status ? jobs.filter((job) => job.status === status) : jobs;
}
