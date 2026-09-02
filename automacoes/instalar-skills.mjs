/**
 * Instala as skills do Criativo AI Studio na config global do Antigravity IDE.
 * Isso habilita os comandos de barra (/) no chat, como /criar-carrossel, /gerar-stories, etc.
 *
 * Uso: npm run instalar-skills
 */
import { copyFile, mkdir, readdir, readFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

// Caminho global do Antigravity IDE para skills
const configGlobal = join(homedir(), '.gemini', 'config', 'skills');

async function copiarDiretorio(origem, destino) {
  await mkdir(destino, { recursive: true });
  const entradas = await readdir(origem, { withFileTypes: true });
  for (const entrada of entradas) {
    const src = join(origem, entrada.name);
    const dst = join(destino, entrada.name);
    if (entrada.isDirectory()) {
      await copiarDiretorio(src, dst);
    } else {
      await copyFile(src, dst);
    }
  }
}

export async function instalarSkills() {
  const skillsDir = join(raiz, '.agents', 'skills');
  const skills = await readdir(skillsDir, { withFileTypes: true });
  const nomes = skills.filter((e) => e.isDirectory()).map((e) => e.name);

  if (!nomes.length) {
    console.error('Nenhuma skill encontrada em .agents/skills/');
    return { total: 0 };
  }

  console.log('Instalando skills do Criativo AI Studio como comandos de barra (/)\n');
  console.log(`Destino: ${configGlobal}\n`);

  await mkdir(configGlobal, { recursive: true });

  let instaladas = 0;
  for (const nome of nomes) {
    const origem = join(skillsDir, nome);
    const destino = join(configGlobal, nome);

    // Verificar se o SKILL.md existe
    try {
      await readFile(join(origem, 'SKILL.md'), 'utf8');
    } catch {
      console.log(`  ⏭  ${nome} — sem SKILL.md, ignorado`);
      continue;
    }

    await copiarDiretorio(origem, destino);
    console.log(`  ✅ /${nome}`);
    instaladas++;
  }

  console.log(`\n${instaladas} skill(s) instalada(s) com sucesso.`);
  console.log('Reabra o Antigravity IDE para que os comandos de barra apareçam.');
  console.log('\nComandos disponíveis:');
  for (const nome of nomes) {
    console.log(`  /${nome}`);
  }
  return { total: instaladas, nomes };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  instalarSkills().catch((e) => {
    console.error(`Instalação de skills falhou: ${e.message}`);
    process.exitCode = 1;
  });
}
