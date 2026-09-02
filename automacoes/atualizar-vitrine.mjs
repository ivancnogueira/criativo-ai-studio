import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const escapar = (v = '') =>
  String(v)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

async function localizar(pasta) {
  let itens = [];
  for (const item of await readdir(pasta, { withFileTypes: true }).catch(() => [])) {
    const caminho = join(pasta, item.name);
    if (item.isDirectory()) {
      itens = itens.concat(await localizar(caminho));
    } else if (item.name === 'publicacao.json') {
      itens.push(caminho);
    }
  }
  return itens;
}

export async function atualizarVitrine(diretorioRaiz = raiz) {
  const arquivos = await localizar(join(diretorioRaiz, 'saidas'));
  const publicacoes = await Promise.all(arquivos.map(async (c) => JSON.parse(await readFile(c, 'utf8'))));

  const cards = publicacoes
    .sort((a, b) => String(b.criadoEm || '').localeCompare(String(a.criadoEm || '')))
    .map((p) => {
      const imgPath = p.imagens?.[0] || p.slides?.[0]?.src || p.slides?.[0] || '';
      const thumb = imgPath ? `../${relative(diretorioRaiz, imgPath).replaceAll('\\', '/')}` : '';
      return `<article>
        ${thumb ? `<img src="${escapar(thumb)}" alt="Capa">` : '<div class="no-thumb">Sem Imagem</div>'}
        <div class="card-body">
          <span class="status">${escapar(p.tipo || 'post')} • ${escapar(p.status || 'rascunho')}</span>
          <h2>${escapar(p.titulo || p.slug)}</h2>
          <a href="${encodeURIComponent(p.slug)}.html">Visualizar Prévia →</a>
        </div>
      </article>`;
    })
    .join('\n');

  const html = `<!doctype html>
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
    .no-thumb {
      width: 100%;
      aspect-ratio: 4/5;
      background: #edf2f7;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--muted);
      font-size: 14px;
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
    .empty {
      grid-column: 1 / -1;
      padding: 48px;
      text-align: center;
      background: var(--card-bg);
      border: 1px dashed var(--border);
      border-radius: 12px;
      color: var(--muted);
    }
  </style>
</head>
<body>
  <main class="shell">
    <header>
      <h1>Vitrine de Prévias</h1>
      <p class="subtitle">Criativo AI Studio — Galeria de conteúdos gerados</p>
    </header>
    <section class="grid">
      ${cards || '<div class="empty">Nenhuma prévia gerada ainda. Use as skills para criar seu primeiro post ou carrossel.</div>'}
    </section>
  </main>
</body>
</html>`;

  await mkdir(join(diretorioRaiz, 'previas'), { recursive: true });
  await writeFile(join(diretorioRaiz, 'previas', 'index.html'), html, 'utf8');
  return publicacoes.length;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  atualizarVitrine()
    .then((n) => console.log(`Vitrine atualizada com ${n} publicação(ões).`))
    .catch((e) => {
      console.error(`Vitrine não atualizada: ${e.message}`);
      process.exitCode = 1;
    });
}
