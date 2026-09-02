import { access, readFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { join, resolve, sep } from 'node:path';

const indefinido = (valor = '') => !String(valor).trim() || /a definir|pendente|nao definido/i.test(String(valor));

export function campoYaml(conteudo, chave, padrao = '') {
  return conteudo.match(new RegExp(`^\\s{2}${chave}:\\s*(.+)$`, 'm'))?.[1]?.trim().replace(/^['"]|['"]$/g, '') || padrao;
}

export function coresDaIdentidade(conteudo) {
  return {
    fundo: campoYaml(conteudo, 'cor_fundo', '#F4F1EA'),
    texto: campoYaml(conteudo, 'cor_texto', '#142C2C'),
    destaque: campoYaml(conteudo, 'cor_destaque', '#2A9D8F'),
    secundaria: campoYaml(conteudo, 'cor_secundaria', '#142C2C'),
    acento: campoYaml(conteudo, 'cor_acento', '#E9C46A'),
    fonteTitulo: campoYaml(conteudo, 'fonte_titulo', 'Arial'),
    fonteTexto: campoYaml(conteudo, 'fonte_texto', 'Arial'),
    usuario: campoYaml(conteudo, 'usuario', 'sua marca')
  };
}

export function diagnosticarIdentidade({ designSystem, identidade, briefingVisual, brandbook, direcaoVisual }) {
  const pendencias = [];
  const essenciais = [
    ['design system', designSystem],
    ['identidade visual', identidade],
    ['briefing visual', briefingVisual],
    ['brandbook', brandbook]
  ];
  for (const [nome, conteudo] of essenciais) {
    if (indefinido(conteudo) || /\bA definir\b|\bpendente\b/i.test(conteudo)) {
      pendencias.push(`${nome} possui decisões pendentes`);
    }
  }
  const cores = coresDaIdentidade(identidade || '');
  for (const [nome, valor] of Object.entries(cores)) {
    if (indefinido(valor)) pendencias.push(`${nome} não foi definido`);
  }
  if (direcaoVisual && (!direcaoVisual.conceito || !direcaoVisual.pontoFocal || !direcaoVisual.estrutura || !direcaoVisual.selo)) {
    pendencias.push('direção visual do post não está completa');
  }
  return { pronto: pendencias.length === 0, pendencias, cores };
}

export async function validarIdentidadeParaArte(diretorioRaiz, direcaoVisual) {
  const [designSystem, identidade, briefingVisual, brandbook] = await Promise.all([
    readFile(join(diretorioRaiz, 'recursos', 'brand', 'design-system.md'), 'utf8'),
    readFile(join(diretorioRaiz, 'conteudos', 'identidade-visual.yml'), 'utf8'),
    readFile(join(diretorioRaiz, 'recursos', 'brand', 'briefing-visual.md'), 'utf8'),
    readFile(join(diretorioRaiz, 'recursos', 'brand', 'brandbook.md'), 'utf8')
  ]);
  const diagnostico = diagnosticarIdentidade({ designSystem, identidade, briefingVisual, brandbook, direcaoVisual });
  if (!diagnostico.pronto) {
    throw new Error(`Identidade visual ainda não está liberada: ${diagnostico.pendencias.join('; ')}.`);
  }
  return { ...diagnostico, designSystem };
}

export async function localizarLogoAutorizado(diretorioRaiz, caminhoInformado = '') {
  const candidato = String(caminhoInformado || '').trim();
  if (!candidato || /sem logo|wordmark|a definir|pendente/i.test(candidato)) return '';
  const raiz = resolve(diretorioRaiz);
  const absoluto = resolve(raiz, candidato);
  if (!absoluto.startsWith(`${raiz}${sep}`) || !absoluto.includes(`${sep}recursos${sep}logos${sep}`)) return '';
  try {
    await access(absoluto, constants.R_OK);
    return absoluto;
  } catch {
    return '';
  }
}

export async function localizarFotoAutorizada(diretorioRaiz, caminhoInformado = '') {
  const candidato = String(caminhoInformado || '').trim();
  if (!candidato || /não usar pessoa|nao usar pessoa|sem pessoa|pendente|a definir/i.test(candidato)) return '';
  const raiz = resolve(diretorioRaiz);
  const absoluto = resolve(raiz, candidato);
  if (!absoluto.startsWith(`${raiz}${sep}`) || !absoluto.includes(`${sep}recursos${sep}fotos${sep}`)) return '';
  try {
    await access(absoluto, constants.R_OK);
    return absoluto;
  } catch {
    return '';
  }
}
