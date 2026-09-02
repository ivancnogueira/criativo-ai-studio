import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, isAbsolute, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const valor = (nome) => {
  const i = process.argv.indexOf(nome);
  return i < 0 ? undefined : process.argv[i + 1];
};
const escapar = (texto = '') =>
  String(texto)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const seguroJson = (dados) =>
  JSON.stringify(dados)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');

const avatarDataUri = (iniciais) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><rect width="96" height="96" rx="48" fill="#1e293b"/><text x="48" y="56" text-anchor="middle" font-family="Arial, sans-serif" font-size="30" font-weight="700" fill="#f8fafc">${escapar(iniciais)}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

export function validarDados(dados) {
  if (!dados || !/^[a-z0-9-]+$/i.test(dados.slug || '')) {
    throw new Error('Use um slug com letras, números e hífens.');
  }
  const slides = dados.slides || dados.imagens;
  if (!Array.isArray(slides) || !slides.length) {
    throw new Error('Informe ao menos um slide/imagem.');
  }
  for (const slide of slides) {
    const src = typeof slide === 'string' ? slide : slide?.src;
    if (!src || isAbsolute(src) || src.includes('..\\') || src.includes('../')) {
      throw new Error('Cada slide deve usar um caminho relativo seguro.');
    }
  }
}

export function gerarHtml(dados) {
  validarDados(dados);
  const perfil = dados.perfil ?? {};
  const usuario = perfil.usuario || 'seu_perfil';
  const iniciais = usuario.replace(/[^\p{L}\p{N}]/gu, '').slice(0, 2).toUpperCase() || 'CS';
  const rawSlides = dados.slides || dados.imagens;
  const slides = rawSlides.map((slide) => (typeof slide === 'string' ? { src: slide } : slide));

  const slidesHtml = slides.map((slide) => {
    const src = typeof slide === 'string' ? slide : slide.src;
    return (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('../') || src.startsWith('data:'))
      ? src
      : `../${src}`;
  });

  const normalizado = {
    slides: slidesHtml.map((s) => ({ src: s })),
    legenda: String(dados.legenda || '').replace(/\\n/g, '\n'),
    curtidas: dados.curtidas || '1.842 curtidas',
    horario: dados.horario || 'Há 2 horas'
  };
  const avatar = perfil.avatar || avatarDataUri(iniciais);

  return dados.template
    .replaceAll('{{PAGE_TITLE}}', escapar(dados.titulo || `Prévia — ${usuario}`))
    .replaceAll('{{TITLE}}', escapar(dados.titulo || `Prévia — ${usuario}`))
    .replaceAll('{{USERNAME}}', escapar(usuario))
    .replace('{{AVATAR}}', perfil.avatar ? `<img src="${escapar(perfil.avatar)}" alt="Avatar de ${escapar(usuario)}">` : escapar(iniciais))
    .replaceAll('{{AVATAR_PATH}}', escapar(avatar))
    .replaceAll('{{AVATAR_ALT}}', escapar(`Avatar de ${usuario}`))
    .replaceAll('{{VERIFIED_CLASS}}', perfil.verificado !== false ? '' : 'hidden')
    .replaceAll('{{LIKES}}', escapar(normalizado.curtidas))
    .replaceAll('{{CAPTION}}', escapar(normalizado.legenda))
    .replaceAll('{{TIME_LABEL}}', escapar(normalizado.horario))
    .replaceAll('{{SLIDES_JSON}}', seguroJson(slidesHtml))
    .replace('{{PREVIEW_DATA}}', seguroJson(normalizado));
}

async function main() {
  const entrada = valor('--dados') || process.argv.slice(2).find((item) => !item.startsWith('--'));
  if (!entrada) throw new Error('Uso: npm run criar-previa -- caminho/publicacao.json');

  const dados = JSON.parse(await readFile(resolve(entrada), 'utf8'));
  validarDados(dados);

  const [template, identidade] = await Promise.all([
    readFile(join(raiz, 'templates', 'preview-instagram.html'), 'utf8'),
    readFile(join(raiz, 'conteudos', 'identidade-visual.yml'), 'utf8')
  ]);

  const campos = Object.fromEntries(
    [...identidade.matchAll(/^\s*(usuario|avatar|verificado|curtidas|horario):\s*['"]?(.*?)['"]?\s*$/gm)].map((m) => [m[1], m[2].trim()])
  );

  let avatar = campos.avatar || '';
  if (avatar && !avatar.startsWith('data:') && !avatar.startsWith('http')) {
    try {
      const buf = await readFile(resolve(raiz, avatar));
      const ext = avatar.endsWith('.png') ? 'image/png' : avatar.endsWith('.svg') ? 'image/svg+xml' : 'image/jpeg';
      avatar = `data:${ext};base64,${buf.toString('base64')}`;
    } catch {
      // fallback
    }
  }

  dados.perfil = {
    usuario: campos.usuario || 'seu_perfil',
    avatar: avatar || '',
    verificado: campos.verificado === 'true' || campos.verificado === true || true,
    ...dados.perfil
  };
  dados.curtidas ??= campos.curtidas || '1.842 curtidas';
  dados.horario ??= campos.horario || 'Há 2 horas';
  dados.template = template;

  const destino = join(raiz, 'previas', `${dados.slug}.html`);
  await mkdir(dirname(destino), { recursive: true });
  await writeFile(destino, gerarHtml(dados), 'utf8');
  console.log(`Prévia criada com sucesso: previas/${dados.slug}.html`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((erro) => {
    console.error(`Prévia não criada: ${erro.message}`);
    process.exitCode = 1;
  });
}
