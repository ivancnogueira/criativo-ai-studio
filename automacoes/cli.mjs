#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const [comando = 'ajuda', ...args] = process.argv.slice(2);
const comandos = {
  configurar: 'configurar.mjs',
  onboarding: 'onboarding.mjs',
  status: 'status-onboarding.mjs',
  diagnosticar: 'diagnosticar.mjs',
  validar: 'validar-estrutura.mjs',
  'validar-integracoes': 'validar-integracoes.mjs',
  'criar-previa': 'criar-previa.mjs',
  'atualizar-vitrine': 'atualizar-vitrine.mjs',
  preview: 'servidor-previas.mjs',
  'pages-publicar': 'publicar-github-pages.mjs',
  aprovar: 'ponte-de-aprovacao.mjs',
  publicar: 'publicar-instagram.mjs'
};

function ajuda() {
  console.log(`Criativo AI Studio — CLI

Comandos disponíveis:
  configurar          Configura o ambiente e o arquivo .env
  onboarding          Executa o onboarding interativo no terminal
  status              Exibe o status do onboarding e marcos pendentes
  diagnosticar        Verifica a saúde do projeto e dependências
  validar             Valida a estrutura de arquivos e diretórios
  validar-integracoes Testa conexões reais com Meta e GitHub Pages
  criar-previa        Gera página de preview HTML de uma publicação
  atualizar-vitrine   Atualiza a galeria local de prévias
  preview             Inicia o servidor local de prévias
  pages-publicar      Envia artes autorizadas para o GitHub Pages
  aprovar             Gerencia a fila de aprovação de publicações
  publicar            Executa publicação via Meta API (dry-run ou aprovado)
`);
}

async function main() {
  if (comando === 'ajuda' || !comandos[comando]) {
    ajuda();
    if (comando !== 'ajuda') process.exitCode = 1;
    return;
  }
  const resultado = spawnSync(process.execPath, [join(raiz, 'automacoes', comandos[comando]), ...args], { cwd: raiz, stdio: 'inherit' });
  if (resultado.error) throw resultado.error;
  process.exitCode = resultado.status ?? 1;
}

main().catch((erro) => {
  console.error(`Erro: ${erro.message}`);
  process.exitCode = 1;
});
