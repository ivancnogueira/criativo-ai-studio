import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const concluidos = new Set(['preenchido', 'preenchida', 'validado', 'aprovado', 'configurado', 'publicado', 'pronto']);
const obrigatorios = [
  'perfil',
  'ativos_visuais',
  'identidade_visual',
  'direcao_visual',
  'pilares',
  'primeiro_briefing',
  'primeiro_post',
  'validacao_usuario',
  'integracao_instagram',
  'primeira_publicacao'
];

function lerCampo(conteudo, campo) {
  return conteudo.match(new RegExp(`^ {2}${campo}:\\s*(.*?)\\s*$`, 'm'))?.[1]?.replace(/^['"]|['"]$/g, '') || '';
}

function definirCampo(conteudo, campo, valor) {
  const padrao = new RegExp(`^( {2}${campo}:)\\s*.*$`, 'm');
  return padrao.test(conteudo) ? conteudo.replace(padrao, `$1 ${valor}`) : conteudo;
}

export function estadoAposPrimeiraPublicacao(conteudo, resultado) {
  let atualizado = conteudo;
  for (const [campo, valor] of [
    ['primeiro_post', 'aprovado'],
    ['validacao_usuario', 'validado'],
    ['integracao_instagram', 'configurado'],
    ['primeira_publicacao', 'publicado']
  ]) {
    atualizado = definirCampo(atualizado, campo, valor);
  }

  const pronto = obrigatorios.every((campo) => concluidos.has(lerCampo(atualizado, campo)));
  atualizado = definirCampo(atualizado, 'status', pronto ? 'pronto' : 'em_andamento');
  atualizado = definirCampo(atualizado, 'etapa_atual', pronto ? 'concluido' : 'revisar_pendencias');
  atualizado = definirCampo(atualizado, 'proximo_passo', pronto ? 'criar_proximo_conteudo' : 'concluir_onboarding');

  const registro = `\n  primeira_publicacao_id: ${JSON.stringify(String(resultado.mediaId || ''))}\n  primeira_publicacao_permalink: ${JSON.stringify(String(resultado.permalink || ''))}\n`;
  if (/^\s{2}primeira_publicacao_id:/m.test(atualizado)) {
    atualizado = definirCampo(atualizado, 'primeira_publicacao_id', JSON.stringify(String(resultado.mediaId || '')));
    atualizado = definirCampo(atualizado, 'primeira_publicacao_permalink', JSON.stringify(String(resultado.permalink || '')));
  } else {
    atualizado = `${atualizado.trimEnd()}${registro}`;
  }
  return atualizado;
}

export async function registrarPrimeiraPublicacao(diretorioRaiz, resultado) {
  const caminho = join(diretorioRaiz, 'conteudos', 'estado-do-studio.yml');
  const atual = await readFile(caminho, 'utf8');
  await writeFile(caminho, estadoAposPrimeiraPublicacao(atual, resultado), 'utf8');
}
