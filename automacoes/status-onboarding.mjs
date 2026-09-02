import { readFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const raizPadrao = join(dirname(fileURLToPath(import.meta.url)), '..');

const etapas = [
  { campo: 'perfil', numero: 2, nome: 'perfil estratégico', acao: 'No Antigravity IDE, preencha negócio, público, oferta, posicionamento, voz, objetivos e limites.' },
  { campo: 'ativos_visuais', numero: 3, nome: 'inventário de ativos visuais', acao: 'Declare fotos em recursos/fotos/, logo em recursos/logos/, referências e direitos de uso — ou aprove seguir sem esses ativos.' },
  { campo: 'identidade_visual', numero: 3, nome: 'identidade visual', acao: 'Sincronize brandbook, design system, tokens e identidade-visual.yml.' },
  { campo: 'direcao_visual', numero: 3, nome: 'direção visual aprovada', acao: 'Defina conceito, ponto focal, composição, componentes e tratamento no briefing-visual.md.' },
  { campo: 'integracao_instagram', numero: 4, nome: 'configurações Meta e GitHub Pages', acao: 'Configure o app Meta, repositório GitHub Pages e preencha localmente o .env.' },
  { campo: 'pilares', numero: 5, nome: 'pilares e primeira pauta', acao: 'Use a skill planejar-conteudo para validar de 3 a 5 pilares.' },
  { campo: 'primeiro_briefing', numero: 5, nome: 'briefing do primeiro post', acao: 'Crie o briefing executável e envie para copywriter-instagram.' },
  { campo: 'primeiro_post', numero: 5, nome: 'primeiro post e preview', acao: 'Gere a arte final com generate_image, o manifesto e crie a prévia para revisão.' },
  { campo: 'validacao_usuario', numero: 5, nome: 'aprovação visual do primeiro post', acao: 'Revise o preview e aprove a peça antes de preparar a publicação.' },
  { campo: 'primeira_publicacao', numero: 6, nome: 'primeira publicação', acao: 'Envie para GitHub Pages, faça dry-run, aprove o job com APROVAR ID-DO-JOB e publique via Meta API.' }
];

function campoYaml(conteudo, nome) {
  return conteudo.match(new RegExp(`^ {2}${nome}:\\s*(.*?)\\s*$`, 'm'))?.[1] || 'pendente';
}

export function analisarEstadoOnboarding(conteudo) {
  const status = campoYaml(conteudo, 'status');
  const pendente = etapas.find((etapa) => !['preenchido', 'preenchida', 'validado', 'pronto', 'aprovado', 'configurado', 'publicado'].includes(campoYaml(conteudo, etapa.campo)));
  return { status, pendente, pronto: status === 'pronto' && !pendente };
}

export async function mostrarStatusOnboarding(diretorioRaiz = raizPadrao) {
  const conteudo = await readFile(join(resolve(diretorioRaiz), 'conteudos', 'estado-do-studio.yml'), 'utf8');
  const estado = analisarEstadoOnboarding(conteudo);
  console.log('\nEstado do onboarding:');
  if (estado.pronto) {
    console.log('- Criativo AI Studio instalado: estratégia validada e primeira publicação registrada.');
    console.log('- Próxima ação: criar a próxima publicação.');
    return estado;
  }
  console.log('- Instalação técnica: concluída.');
  console.log(`- Onboarding estratégico: em andamento — etapa ${estado.pendente?.numero || 2} de 6 (${estado.pendente?.nome || 'perfil'}).`);
  console.log(`- Próxima ação concreta: ${estado.pendente?.acao || 'Iniciar o perfil da marca no Antigravity IDE.'}`);
  console.log('- Para continuar: abra o projeto no Antigravity IDE e converse com o agente para conduzir o onboarding guiado.');
  return estado;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  mostrarStatusOnboarding(process.argv[2] || raizPadrao).catch((erro) => {
    console.error(`Não foi possível ler o onboarding: ${erro.message}`);
    process.exitCode = 1;
  });
}
