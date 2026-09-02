import { readFile, stat } from 'node:fs/promises';
import { dirname, isAbsolute, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { auditar, escreverJsonAtomico, lerEnv } from './lib/arquivos.mjs';
import { publicarNaMeta } from './lib/meta.mjs';
import { calcularFingerprint } from './lib/fila.mjs';
import { registrarPrimeiraPublicacao } from './lib/estado-onboarding.mjs';
import sharp from 'sharp';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const opcao = (n) => {
  const i = process.argv.indexOf(n);
  return i < 0 ? undefined : process.argv[i + 1];
};

export async function validarPublicacao(d, diretorioRaiz = raiz) {
  if (!d.id || !d.legenda) throw new Error('Dados exigem id e legenda.');
  const rawImagens = d.imagens || (d.slides ? d.slides.map((s) => (typeof s === 'string' ? s : s.src)) : []);
  if (!Array.isArray(rawImagens) || !rawImagens.length) throw new Error('Dados exigem imagens.');
  if (rawImagens.length > 10) throw new Error('São permitidas no máximo 10 imagens.');

  const imagensAbsolutas = [];
  for (const img of rawImagens) {
    const caminhoImg = isAbsolute(img) ? img : resolve(diretorioRaiz, img);
    const info = await stat(caminhoImg);
    if (!info.isFile()) throw new Error(`Imagem não encontrada: ${img}`);
    const meta = await sharp(caminhoImg).metadata();
    const formatoValido = ['png', 'jpeg', 'jpg', 'webp'].includes(meta.format);
    if (!formatoValido) throw new Error(`Formato inválido (${meta.format}). Deve ser PNG ou JPEG.`);
    const feedValido = meta.width === 1080 && meta.height === 1350;
    const storyValido = meta.width === 1080 && meta.height === 1920;
    if (!feedValido && !storyValido) {
      console.warn(`Aviso: dimensão ${meta.width}x${meta.height} diferente do padrão (1080x1350 feed ou 1080x1920 stories).`);
    }
    imagensAbsolutas.push(caminhoImg);
  }
  d.imagens = imagensAbsolutas;

  if (d.urlsPublicas?.length && (d.urlsPublicas.length !== d.imagens.length || d.urlsPublicas.some((u) => !/^https:\/\//.test(u)))) {
    throw new Error('urlsPublicas deve ter uma URL HTTPS válida por imagem.');
  }
  return d;
}

export async function executar({ caminhoDados, caminhoJob, dryRun = false, fetchFn = fetch, diretorioRaiz = raiz }) {
  const d = await validarPublicacao(JSON.parse(await readFile(resolve(caminhoDados), 'utf8')), diretorioRaiz);

  if (dryRun) {
    await auditar(diretorioRaiz, { id: d.id, acao: 'dry-run', status: 'validado', imagens: d.imagens.length });
    return { dryRun: true };
  }

  if (!caminhoJob) throw new Error('A publicação real exige um job aprovado (--job).');
  const job = JSON.parse(await readFile(resolve(caminhoJob), 'utf8'));

  if (job.id !== String(d.id).toUpperCase() || job.status !== 'aprovado' || !job.aprovadoPor || !job.aprovadoEm || job.consumidoEm) {
    throw new Error('O job não contém aprovação válida e não consumida.');
  }
  if (!job.fingerprint || job.fingerprint !== (await calcularFingerprint(d))) {
    throw new Error('O conteúdo atual não corresponde exatamente à versão aprovada.');
  }
  if (!d.urlsPublicas?.length) {
    throw new Error('Configure URLs HTTPS (ex: via GitHub Pages) antes da publicação real.');
  }

  const env = await lerEnv(join(diretorioRaiz, '.env'));
  if (['META_API_VERSION', 'INSTAGRAM_BUSINESS_ID', 'INSTAGRAM_ACCESS_TOKEN'].some((k) => !env[k])) {
    throw new Error('Credenciais da Meta API incompletas no .env.');
  }

  job.status = 'publicando';
  job.atualizadoEm = new Date().toISOString();
  await escreverJsonAtomico(resolve(caminhoJob), job);

  try {
    const r = await publicarNaMeta({
      fetchFn,
      apiVersion: env.META_API_VERSION,
      instagramId: env.INSTAGRAM_BUSINESS_ID,
      token: env.INSTAGRAM_ACCESS_TOKEN,
      urls: d.urlsPublicas,
      legenda: d.legenda
    });
    job.status = 'publicado';
    job.consumidoEm = new Date().toISOString();
    job.resultado = r;
    await escreverJsonAtomico(resolve(caminhoJob), job);
    await auditar(diretorioRaiz, { id: job.id, acao: 'publicar', status: 'publicado', mediaId: r.mediaId, permalink: r.permalink });

    try {
      await registrarPrimeiraPublicacao(diretorioRaiz, r);
    } catch {
      await auditar(diretorioRaiz, { id: job.id, acao: 'atualizar_onboarding', status: 'erro' });
    }
    return r;
  } catch (e) {
    job.status = 'erro';
    job.erro = 'Falha na publicação pela Meta API.';
    job.atualizadoEm = new Date().toISOString();
    await escreverJsonAtomico(resolve(caminhoJob), job);
    await auditar(diretorioRaiz, { id: job.id, acao: 'publicar', status: 'erro' });
    throw e;
  }
}

async function main() {
  const pos = process.argv.slice(2).filter((item) => !item.startsWith('--'));
  const dados = opcao('--dados') || pos[0];
  if (!dados) throw new Error('Informe o caminho de publicacao.json.');
  const real = process.argv.includes('--publicar-aprovado');
  const r = await executar({
    caminhoDados: dados,
    caminhoJob: opcao('--job') || (real ? pos[1] : undefined),
    dryRun: !real
  });
  console.log(r.dryRun ? 'Dry-run concluído com sucesso. Nenhuma chamada externa foi realizada.' : `Publicado com sucesso: ${r.permalink || r.mediaId}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((e) => {
    console.error(`Publicação não executada: ${e.message}`);
    process.exitCode = 1;
  });
}
