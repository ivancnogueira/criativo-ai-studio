import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { lerEnv } from './lib/arquivos.mjs';

const raizPadrao = join(dirname(fileURLToPath(import.meta.url)), '..');
const githubApi = 'https://api.github.com';
const metaApi = 'https://graph.facebook.com';

function necessario(env, nome) {
  if (!env[nome] || /^<.*>$/.test(env[nome]) || /^(alterar|preencher|exemplo)/i.test(env[nome])) {
    throw new Error(`${nome} não foi preenchido no .env.`);
  }
  return env[nome];
}

async function respostaSegura(fetchFn, url, opcoes, rotulo) {
  let resposta;
  try {
    resposta = await fetchFn(url, { ...opcoes, signal: AbortSignal.timeout(12_000) });
  } catch {
    throw new Error(`${rotulo} não respondeu. Verifique conexão e configuração local.`);
  }
  if (!resposta.ok) {
    throw new Error(`${rotulo} recusou a validação (HTTP ${resposta.status}). Verifique permissões e identificadores.`);
  }
  return resposta.json().catch(() => ({}));
}

export async function validarIntegracoes({ diretorioRaiz = raizPadrao, fetchFn = fetch, agora = new Date() } = {}) {
  const raiz = resolve(diretorioRaiz);
  const env = await lerEnv(join(raiz, '.env'));
  const versao = necessario(env, 'META_API_VERSION');
  const instagramId = necessario(env, 'INSTAGRAM_BUSINESS_ID');
  const tokenMeta = necessario(env, 'INSTAGRAM_ACCESS_TOKEN');
  const perfil = await respostaSegura(
    fetchFn,
    `${metaApi}/${encodeURIComponent(versao)}/${encodeURIComponent(instagramId)}?fields=id,username`,
    { headers: { authorization: `Bearer ${tokenMeta}` } },
    'Meta / Instagram'
  );
  if (String(perfil.id || '') !== String(instagramId)) {
    throw new Error('Meta / Instagram retornou um perfil diferente do INSTAGRAM_BUSINESS_ID configurado.');
  }

  const modo = 'local';
  const resultado = { validadoEm: agora.toISOString(), modo, meta: { ok: true, username: perfil.username || '' } };

  const owner = necessario(env, 'GITHUB_PAGES_OWNER');
  const repo = necessario(env, 'GITHUB_PAGES_REPO');
  const tokenPages = necessario(env, 'GITHUB_PAGES_TOKEN');
  const cabecalhos = { accept: 'application/vnd.github+json', authorization: `Bearer ${tokenPages}`, 'x-github-api-version': '2022-11-28' };
  const base = `${githubApi}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`;
  const repositorio = await respostaSegura(fetchFn, base, { headers: cabecalhos }, 'GitHub Pages');
  if (repositorio.private) {
    throw new Error('O repositório de preview é privado. Para a Meta baixar imagens, use um repositório público separado.');
  }
  resultado.pages = { ok: true, repositorioPublico: true };

  await mkdir(join(raiz, 'runtime'), { recursive: true });
  await writeFile(join(raiz, 'runtime', 'validacao-integracoes.json'), `${JSON.stringify(resultado, null, 2)}\n`, 'utf8');
  return resultado;
}

export async function integracoesValidadasRecentemente(diretorioRaiz = raizPadrao, agora = Date.now()) {
  try {
    const registro = JSON.parse(await readFile(join(diretorioRaiz, 'runtime', 'validacao-integracoes.json'), 'utf8'));
    const idade = agora - Date.parse(registro.validadoEm || '');
    return Boolean(registro.meta?.ok && registro.pages?.ok && idade >= 0 && idade < 24 * 60 * 60 * 1000);
  } catch {
    return false;
  }
}

async function main() {
  await validarIntegracoes();
  console.log('Integrações validadas: perfil Meta/Instagram e hospedagem pública responderam sem expor credenciais.');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((erro) => {
    console.error(`Validação das integrações falhou: ${erro.message}`);
    process.exitCode = 1;
  });
}
