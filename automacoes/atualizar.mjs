/**
 * Atualização segura do Criativo AI Studio.
 *
 * Cenário Git (quem clonou): basta `git pull`.
 * Cenário ZIP (área de membros): `npm run atualizar` baixa o ZIP mais
 * recente do GitHub, extrai apenas os arquivos de sistema e preserva
 * 100% dos dados do usuário (conteudos/, recursos/, saidas/, .env, etc).
 */
import { createWriteStream, existsSync } from 'node:fs';
import { copyFile, mkdir, readdir, readFile, rename, rm, stat, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pipeline } from 'node:stream/promises';
import { createReadStream } from 'node:fs';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

// ── Configuração ────────────────────────────────────────────────────
const REPO_URL = 'https://github.com/ivancnogueira/criativo-ai-studio';
const ZIP_URL = `${REPO_URL}/archive/refs/heads/main.zip`;

/**
 * Diretórios e arquivos que pertencem ao USUÁRIO e NUNCA devem ser
 * sobrescritos por uma atualização. Se o arquivo não existe no destino,
 * a versão nova é copiada como template inicial.
 */
const PROTEGIDOS = [
  // Dados da marca
  'conteudos/',
  // Ativos visuais do usuário
  'recursos/fotos/',
  'recursos/logos/',
  'recursos/referencias/',
  // Saídas geradas
  'saidas/',
  'previas/',
  // Estado local
  'runtime/',
  'logs/',
  // Configuração local
  '.env',
  // Lock de dependências (preservar para reprodutibilidade)
  'package-lock.json',
  'node_modules/',
];

/**
 * Arquivos de SISTEMA que devem ser atualizados. Tudo que não estiver
 * em PROTEGIDOS é considerado atualizável.
 */
const SISTEMA_EXEMPLOS = [
  'automacoes/',
  '.agents/',
  'documentacao/',
  'templates/',
  'testes/',
  'recursos/brand/',
  'exemplos/',
  'GEMINI.md',
  'README.md',
  'INSTALAR.md',
  'INSTALAR-COM-ANTIGRAVITY.md',
  'package.json',
  '.gitignore',
  '.gitattributes',
  '.env.example',
];

// ── Helpers ─────────────────────────────────────────────────────────

function estaProtegido(caminhoRelativo) {
  const normalizado = caminhoRelativo.replaceAll('\\', '/');
  return PROTEGIDOS.some((p) => {
    if (p.endsWith('/')) return normalizado.startsWith(p) || normalizado === p.slice(0, -1);
    return normalizado === p;
  });
}

async function copiarRecursivo(origem, destino, raizOrigem, raizDestino) {
  const entradas = await readdir(origem, { withFileTypes: true });
  for (const entrada of entradas) {
    const caminhoOrigem = join(origem, entrada.name);
    const caminhoDestino = join(destino, entrada.name);
    const relativo = relative(raizOrigem, caminhoOrigem);

    if (estaProtegido(relativo)) {
      // Se o arquivo/pasta protegido não existe no destino, copiar como template
      if (!existsSync(caminhoDestino)) {
        if (entrada.isDirectory()) {
          await copiarDiretorioCompleto(caminhoOrigem, caminhoDestino);
        } else {
          await mkdir(dirname(caminhoDestino), { recursive: true });
          await copyFile(caminhoOrigem, caminhoDestino);
        }
        console.log(`  + ${relativo} (novo, criado como template)`);
      } else {
        // Já existe — preservar intocado
      }
      continue;
    }

    if (entrada.isDirectory()) {
      await mkdir(caminhoDestino, { recursive: true });
      await copiarRecursivo(caminhoOrigem, caminhoDestino, raizOrigem, raizDestino);
    } else {
      await mkdir(dirname(caminhoDestino), { recursive: true });
      await copyFile(caminhoOrigem, caminhoDestino);
    }
  }
}

async function copiarDiretorioCompleto(origem, destino) {
  await mkdir(destino, { recursive: true });
  const entradas = await readdir(origem, { withFileTypes: true });
  for (const entrada of entradas) {
    const src = join(origem, entrada.name);
    const dst = join(destino, entrada.name);
    if (entrada.isDirectory()) {
      await copiarDiretorioCompleto(src, dst);
    } else {
      await copyFile(src, dst);
    }
  }
}

async function extrairZipNativo(zipPath, destino) {
  // Usa PowerShell (Windows) ou unzip (Linux/macOS) para extrair
  const { execSync } = await import('node:child_process');
  const plataforma = (await import('node:os')).platform();

  if (plataforma === 'win32') {
    execSync(`powershell -NoProfile -Command "Expand-Archive -Path '${zipPath}' -DestinationPath '${destino}' -Force"`, { stdio: 'pipe' });
  } else {
    execSync(`unzip -o -q "${zipPath}" -d "${destino}"`, { stdio: 'pipe' });
  }
}

// ── Lógica principal ────────────────────────────────────────────────

async function obterVersaoAtual() {
  try {
    const pkg = JSON.parse(await readFile(join(raiz, 'package.json'), 'utf8'));
    return pkg.version || '0.0.0';
  } catch {
    return '0.0.0';
  }
}

async function obterVersaoRemota(tmpDir) {
  try {
    // Procura o diretório extraído (GitHub nomeia como repo-branch/)
    const entradas = await readdir(tmpDir);
    const pasta = entradas.find((e) => e.startsWith('criativo-ai-studio'));
    if (!pasta) return null;
    const pkg = JSON.parse(await readFile(join(tmpDir, pasta, 'package.json'), 'utf8'));
    return { versao: pkg.version || '0.0.0', pasta: join(tmpDir, pasta) };
  } catch {
    return null;
  }
}

export async function atualizar({ url = ZIP_URL, forcar = false } = {}) {
  const versaoAtual = await obterVersaoAtual();
  console.log(`Criativo AI Studio — Atualização`);
  console.log(`Versão atual: ${versaoAtual}`);
  console.log(`Origem: ${url}\n`);

  // 1. Baixar o ZIP
  const tmpDir = join(raiz, 'runtime', '.update-tmp');
  const zipPath = join(tmpDir, 'update.zip');
  await mkdir(tmpDir, { recursive: true });

  console.log('Baixando atualização...');
  const resposta = await fetch(url);
  if (!resposta.ok) throw new Error(`Falha ao baixar (HTTP ${resposta.status}). Verifique sua conexão.`);
  const buffer = Buffer.from(await resposta.arrayBuffer());
  await writeFile(zipPath, buffer);
  console.log(`Download concluído (${(buffer.length / 1024).toFixed(0)} KB)\n`);

  // 2. Extrair
  console.log('Extraindo arquivos...');
  const extractDir = join(tmpDir, 'extracted');
  await mkdir(extractDir, { recursive: true });
  await extrairZipNativo(zipPath, extractDir);

  const info = await obterVersaoRemota(extractDir);
  if (!info) throw new Error('Não foi possível encontrar o package.json na atualização.');

  console.log(`Versão disponível: ${info.versao}\n`);

  if (!forcar && info.versao === versaoAtual) {
    console.log('Você já está na versão mais recente. Use --forcar para reaplicar.');
    await rm(tmpDir, { recursive: true, force: true });
    return { atualizado: false, versao: versaoAtual };
  }

  // 3. Backup do que será alterado
  const backupDir = join(raiz, 'runtime', `.backup-v${versaoAtual}-${Date.now()}`);
  console.log(`Criando backup em runtime/.backup-v${versaoAtual}-...`);
  await mkdir(backupDir, { recursive: true });
  for (const item of SISTEMA_EXEMPLOS) {
    const src = join(raiz, item);
    const dst = join(backupDir, item);
    try {
      const s = await stat(src);
      if (s.isDirectory()) {
        await copiarDiretorioCompleto(src, dst);
      } else {
        await mkdir(dirname(dst), { recursive: true });
        await copyFile(src, dst);
      }
    } catch (e) {
      if (e.code !== 'ENOENT') throw e;
    }
  }
  console.log('Backup concluído.\n');

  // 4. Copiar arquivos de sistema (preservando dados do usuário)
  console.log('Aplicando atualização...');
  console.log('Arquivos protegidos (seus dados):');
  for (const p of PROTEGIDOS) console.log(`  🔒 ${p}`);
  console.log('');

  await copiarRecursivo(info.pasta, raiz, info.pasta, raiz);

  // 5. Limpar temporários
  await rm(tmpDir, { recursive: true, force: true });

  console.log(`\n✅ Atualização concluída: v${versaoAtual} → v${info.versao}`);
  console.log('Execute npm install para atualizar dependências se necessário.');
  console.log('Execute npm test para validar a integridade.');
  return { atualizado: true, versaoAnterior: versaoAtual, versaoNova: info.versao };
}

// ── CLI ─────────────────────────────────────────────────────────────

async function main() {
  const forcar = process.argv.includes('--forcar') || process.argv.includes('--force');
  const urlCustom = process.argv.find((a) => a.startsWith('--url='))?.split('=')[1];
  await atualizar({ forcar, url: urlCustom || ZIP_URL });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((e) => {
    console.error(`Atualização não concluída: ${e.message}`);
    process.exitCode = 1;
  });
}
