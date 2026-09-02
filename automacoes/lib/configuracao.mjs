import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { access, readFile, writeFile } from 'node:fs/promises';

export const MODOS = ['local'];

export function normalizarModo(valor) {
  const modo = String(valor || 'local').trim().toLowerCase();
  if (modo !== 'local') {
    throw new Error('O Criativo AI Studio v1 opera no modo "local".');
  }
  return modo;
}

export function normalizarUrlBase(valor) {
  const entrada = String(valor || '').trim();
  if (!entrada) return '';
  const url = new URL(/^https?:\/\//i.test(entrada) ? entrada : `https://${entrada}`);
  if (url.protocol !== 'https:') throw new Error('A URL base deve utilizar HTTPS.');
  return url.origin;
}

export async function detectarAmbiente({ plataforma = process.platform, ambiente = process.env, accessFn = access } = {}) {
  const sinais = [];
  if (plataforma === 'win32') sinais.push('Windows');
  else if (plataforma === 'darwin') sinais.push('macOS');
  else if (plataforma === 'linux') sinais.push('Linux');
  return { recomendacao: 'local', sinais, plataforma };
}

export function atualizarEnvTexto(texto, valores) {
  let saida = String(texto || '').replace(/\r\n/g, '\n');
  for (const [chave, valorOriginal] of Object.entries(valores)) {
    const valor = String(valorOriginal ?? '');
    if (/\r|\n/.test(valor)) throw new Error(`Valor inválido para ${chave}.`);
    const linha = `${chave}=${valor}`;
    const expressao = new RegExp(`^${chave.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}=.*$`, 'm');
    if (expressao.test(saida)) saida = saida.replace(expressao, linha);
    else saida = `${saida.trimEnd()}\n${linha}\n`;
  }
  return saida.endsWith('\n') ? saida : `${saida}\n`;
}

export async function atualizarArquivoEnv(caminho, valores) {
  const atual = await readFile(caminho, 'utf8').catch((erro) => {
    if (erro.code === 'ENOENT') return '';
    throw erro;
  });
  await writeFile(caminho, atualizarEnvTexto(atual, valores), 'utf8');
}

export function criarSegredo(bytes = 32) {
  return randomBytes(bytes).toString('base64url');
}

function assinatura(segredo, conteudo) {
  return createHmac('sha256', segredo).update(conteudo).digest('base64url');
}

function assinaturasIguais(a, b) {
  const esquerda = Buffer.from(String(a || ''));
  const direita = Buffer.from(String(b || ''));
  return esquerda.length === direita.length && timingSafeEqual(esquerda, direita);
}

export function criarTokenPreview(segredo, slug, expiraEm) {
  if (!segredo) return '';
  const exp = Math.floor(Number(expiraEm));
  if (!Number.isSafeInteger(exp) || exp <= 0) throw new Error('Expiração de preview inválida.');
  return `${exp}.${assinatura(segredo, `preview:${slug}:${exp}`)}`;
}

export function validarTokenPreview(segredo, slug, token, agora = Date.now()) {
  if (!segredo) return true;
  const [expTexto, recebido, extra] = String(token || '').split('.');
  const exp = Number(expTexto);
  if (extra || !Number.isSafeInteger(exp) || exp * 1000 < agora || !recebido || !segredo) return false;
  return assinaturasIguais(recebido, assinatura(segredo, `preview:${slug}:${exp}`));
}

function caminhoUrl(relativo) {
  const partes = String(relativo || '').replaceAll('\\', '/').split('/').filter(Boolean);
  if (!partes.length || partes.some((parte) => parte === '.' || parte === '..')) throw new Error('Caminho de mídia inválido.');
  return partes.map(encodeURIComponent).join('/');
}

export function criarUrlMidia(base, relativo) {
  if (!base) return '';
  return new URL(`${String(base).replace(/\/$/, '')}/${caminhoUrl(relativo)}`).toString();
}
