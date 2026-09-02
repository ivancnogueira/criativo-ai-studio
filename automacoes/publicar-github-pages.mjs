import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { escreverJsonAtomico, lerEnv } from './lib/arquivos.mjs';

const raizPadrao = join(dirname(fileURLToPath(import.meta.url)), '..');
const api = 'https://api.github.com';

function caminhoUrl(caminho) {
  return String(caminho).replaceAll('\\', '/').split('/').map(encodeURIComponent).join('/');
}

function validarNome(valor, rotulo) {
  if (!/^[a-z0-9_.-]+$/i.test(valor || '')) throw new Error(`${rotulo} do GitHub inválido.`);
}

const escapar = (valor = '') =>
  String(valor)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

function gerarVitrinePublica(publicacoes) {
  const cards = publicacoes
    .map(
      (item) =>
        `<article>
          <img src="${escapar(item.imagem)}" alt="Capa">
          <div class="card-body">
            <span class="status">${escapar(item.status || 'Publicação')}</span>
            <h2>${escapar(item.titulo)}</h2>
            <a href="${escapar(item.preview)}">Visualizar Prévia →</a>
          </div>
        </article>`
    )
    .join('\n');

  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="robots" content="noindex,nofollow">
  <title>Vitrine de Prévias — Criativo AI Studio</title>
  <style>
    :root {
      --bg: #f4f6f8;
      --card-bg: #ffffff;
      --text: #1a202c;
      --muted: #718096;
      --primary: #2a9d8f;
      --border: #e2e8f0;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      margin: 0;
      background: var(--bg);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: var(--text);
      line-height: 1.5;
    }
    .shell {
      max-width: 1140px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    header {
      margin-bottom: 32px;
    }
    h1 {
      font-size: 28px;
      font-weight: 700;
      color: var(--text);
    }
    p.subtitle {
      color: var(--muted);
      font-size: 15px;
      margin-top: 4px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 24px;
    }
    article {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    article:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0,0,0,0.08);
    }
    img {
      width: 100%;
      aspect-ratio: 4/5;
      object-fit: cover;
      display: block;
      background: #e2e8f0;
    }
    .card-body {
      padding: 16px;
    }
    .status {
      font-size: 11px;
      text-transform: uppercase;
      font-weight: 600;
      letter-spacing: 0.05em;
      color: var(--primary);
    }
    h2 {
      font-size: 16px;
      font-weight: 600;
      margin: 6px 0 12px;
      line-height: 1.3;
    }
    a {
      display: inline-block;
      color: var(--primary);
      text-decoration: none;
      font-size: 14px;
      font-weight: 600;
    }
    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <main class="shell">
    <header>
      <h1>Vitrine de Prévias</h1>
      <p class="subtitle">Criativo AI Studio — Galeria de publicações</p>
    </header>
    <section class="grid">
      ${cards || '<p>Nenhuma prévia disponível.</p>'}
    </section>
  </main>
</body>
</html>`;
}

async function requisitar(fetchFn, url, token, opcoes = {}, aceitar404 = false) {
  const resposta = await fetchFn(url, {
    ...opcoes,
    headers: {
      accept: 'application/vnd.github+json',
      authorization: `Bearer ${token}`,
      'x-github-api-version': '2022-11-28',
      ...opcoes.headers
    }
  });
  if (aceitar404 && resposta.status === 404) return null;
  const dados = await resposta.json().catch(() => ({}));
  if (!resposta.ok) {
    throw new Error(`GitHub recusou a operação (${resposta.status}). Verifique repositório, branch e permissão Contents: write.`);
  }
  return dados;
}

async function enviarArquivo({ fetchFn, owner, repo, branch, token, caminhoRemoto, conteudo, mensagem, repositorioVazio = false }) {
  const endpoint = `${api}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contents/${caminhoUrl(caminhoRemoto)}`;
  const consulta = repositorioVazio ? endpoint : `${endpoint}?ref=${encodeURIComponent(branch)}`;
  const existente = await requisitar(fetchFn, consulta, token, {}, true);
  const corpo = { message: mensagem, content: Buffer.from(conteudo).toString('base64') };
  if (!repositorioVazio) corpo.branch = branch;
  if (existente?.sha) corpo.sha = existente.sha;
  await requisitar(fetchFn, endpoint, token, {
    method: 'PUT',
    body: JSON.stringify(corpo),
    headers: { 'content-type': 'application/json' }
  });
}

export async function publicarNoGitHubPages({ caminhoManifesto, diretorioRaiz = raizPadrao, fetchFn = fetch } = {}) {
  if (!caminhoManifesto) throw new Error('Informe o caminho de publicacao.json.');
  const raiz = resolve(diretorioRaiz);
  const env = await lerEnv(join(raiz, '.env'));
  const owner = env.GITHUB_PAGES_OWNER;
  const repo = env.GITHUB_PAGES_REPO;
  const branch = env.GITHUB_PAGES_BRANCH || 'main';
  const token = env.GITHUB_PAGES_TOKEN;
  validarNome(owner, 'Usuário');
  validarNome(repo, 'Repositório');
  validarNome(branch, 'Branch');
  if (!token) throw new Error('GITHUB_PAGES_TOKEN não foi preenchido no .env.');

  const repositorio = await requisitar(fetchFn, `${api}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`, token);
  if (repositorio.private) {
    throw new Error('Use um repositório público exclusivo para previews; o Pages precisa entregar as imagens publicamente para a Meta API.');
  }

  const caminhoAbsoluto = resolve(caminhoManifesto);
  const publicacao = JSON.parse(await readFile(caminhoAbsoluto, 'utf8'));
  const rawImagens = publicacao.imagens || (publicacao.slides ? publicacao.slides.map((s) => (typeof s === 'string' ? s : s.src)) : []);
  if (!/^[a-z0-9-]+$/i.test(publicacao.slug || '') || !Array.isArray(rawImagens) || !rawImagens.length) {
    throw new Error('Manifesto sem slug ou imagens válidas.');
  }

  const arquivos = [];
  for (const imagem of rawImagens) {
    const caminhoImg = isAbsolute(imagem) ? imagem : resolve(raiz, imagem);
    const relativo = relative(raiz, caminhoImg).replaceAll('\\', '/');
    if (relativo.startsWith('..') || !resolve(caminhoImg).startsWith(`${raiz}${sep}`) || !relativo.startsWith('saidas/')) {
      throw new Error('Imagem fora da pasta de saídas do projeto.');
    }
    arquivos.push({ local: caminhoImg, remoto: relativo });
  }
  arquivos.push({ local: join(raiz, 'previas', `${publicacao.slug}.html`), remoto: `previas/${publicacao.slug}.html` });

  const caminhoRegistro = join(raiz, 'runtime', 'pages-publicados.json');
  let registro = [];
  try {
    registro = JSON.parse(await readFile(caminhoRegistro, 'utf8'));
  } catch (erro) {
    if (erro.code !== 'ENOENT') throw erro;
  }
  const relativoImagem = arquivos.find((arquivo) => arquivo.remoto.startsWith('saidas/')).remoto;
  const entradaPublica = {
    slug: publicacao.slug,
    titulo: publicacao.titulo || publicacao.slug,
    status: publicacao.status || 'Publicado',
    imagem: caminhoUrl(relativoImagem),
    preview: `previas/${encodeURIComponent(publicacao.slug)}.html`
  };
  registro = [...registro.filter((item) => item.slug !== publicacao.slug), entradaPublica];
  arquivos.push({ conteudo: gerarVitrinePublica(registro), remoto: 'index.html' });
  arquivos.push({ conteudo: '', remoto: '.nojekyll' });

  let repositorioVazio = !repositorio.default_branch || repositorio.size === 0;
  for (const arquivo of arquivos) {
    let conteudo = arquivo.conteudo ?? (await readFile(arquivo.local));
    await enviarArquivo({
      fetchFn,
      owner,
      repo,
      branch,
      token,
      caminhoRemoto: arquivo.remoto,
      conteudo,
      mensagem: `Atualiza preview ${publicacao.slug}`,
      repositorioVazio
    });
    repositorioVazio = false;
  }

  const base = String(env.GITHUB_PAGES_BASE_URL || `https://${owner}.github.io/${repo}`).replace(/\/$/, '');
  publicacao.urlsPublicas = arquivos.filter((arquivo) => arquivo.remoto.startsWith('saidas/')).map((arquivo) => `${base}/${caminhoUrl(arquivo.remoto)}`);
  publicacao.previewPublico = `${base}/previas/${encodeURIComponent(publicacao.slug)}.html`;
  await escreverJsonAtomico(caminhoAbsoluto, publicacao);
  await mkdir(dirname(caminhoRegistro), { recursive: true });
  await writeFile(caminhoRegistro, `${JSON.stringify(registro, null, 2)}\n`, 'utf8');
  return { preview: publicacao.previewPublico, imagens: publicacao.urlsPublicas };
}

export async function validarPublicacaoNoGitHubPages({ caminhoManifesto, fetchFn = fetch } = {}) {
  if (!caminhoManifesto) throw new Error('Informe o caminho de publicacao.json.');
  const publicacao = JSON.parse(await readFile(resolve(caminhoManifesto), 'utf8'));
  const urls = [...(publicacao.urlsPublicas || []), publicacao.previewPublico].filter(Boolean);
  if (!urls.length || urls.some((url) => !String(url).startsWith('https://'))) {
    throw new Error('Ainda não há URLs HTTPS públicas no manifesto. Envie a prévia ao Pages primeiro.');
  }
  for (const url of urls) {
    let resposta;
    try {
      resposta = await fetchFn(url, { signal: AbortSignal.timeout(12_000) });
    } catch {
      throw new Error(`URL pública ainda não respondeu: ${url}`);
    }
    if (!resposta.ok) throw new Error(`URL pública respondeu HTTP ${resposta.status}: ${url}`);
  }
  return { preview: publicacao.previewPublico, imagens: publicacao.urlsPublicas };
}

async function main() {
  const argumentos = process.argv.slice(2);
  const caminho = argumentos.find((item) => !item.startsWith('--'));
  if (argumentos.includes('--validar')) {
    const resultado = await validarPublicacaoNoGitHubPages({ caminhoManifesto: caminho });
    console.log(`Preview público validado: ${resultado.preview}`);
    return;
  }
  const resultado = await publicarNoGitHubPages({ caminhoManifesto: caminho });
  console.log(`Arquivos enviados ao GitHub Pages. Preview esperado: ${resultado.preview}`);
  console.log('Aguarde o Pages concluir a implantação e valide a URL antes de publicar na Meta.');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((erro) => {
    console.error(`GitHub Pages não atualizado: ${erro.message}`);
    process.exitCode = 1;
  });
}
