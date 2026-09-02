import { appendFile, mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

export async function existe(caminho) {
  try {
    await readFile(caminho);
    return true;
  } catch (erro) {
    if (erro.code === 'ENOENT') return false;
    throw erro;
  }
}

export function lerEnvTexto(texto) {
  const env = {};
  for (const original of String(texto || '').split(/\r?\n/)) {
    const linha = original.trim();
    if (!linha || linha.startsWith('#')) continue;
    const indice = linha.indexOf('=');
    if (indice < 1) continue;
    let valor = linha.slice(indice + 1).trim();
    if ((valor.startsWith('"') && valor.endsWith('"')) || (valor.startsWith("'") && valor.endsWith("'"))) {
      valor = valor.slice(1, -1);
    }
    env[linha.slice(0, indice).trim()] = valor;
  }
  return env;
}

export async function lerEnv(caminho) {
  try {
    return lerEnvTexto(await readFile(caminho, 'utf8'));
  } catch (erro) {
    if (erro.code === 'ENOENT') return {};
    throw erro;
  }
}

export async function escreverJsonAtomico(caminho, dados) {
  await mkdir(dirname(caminho), { recursive: true });
  const temporario = `${caminho}.${process.pid}.tmp`;
  await writeFile(temporario, `${JSON.stringify(dados, null, 2)}\n`, 'utf8');
  await rename(temporario, caminho);
}

export async function auditar(raiz, evento) {
  const caminho = join(raiz, 'logs', 'auditoria.jsonl');
  await mkdir(dirname(caminho), { recursive: true });
  await appendFile(caminho, `${JSON.stringify({ em: new Date().toISOString(), ...evento })}\n`, 'utf8');
}
