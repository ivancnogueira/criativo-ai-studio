import test from 'node:test';
import assert from 'node:assert/strict';
import {
  atualizarEnvTexto,
  criarTokenPreview,
  criarUrlMidia,
  detectarAmbiente,
  normalizarModo,
  normalizarUrlBase,
  validarTokenPreview
} from '../automacoes/lib/configuracao.mjs';

test('normaliza modo para local', () => {
  assert.equal(normalizarModo('local'), 'local');
  assert.equal(normalizarModo(''), 'local');
  assert.throws(() => normalizarModo('servidor_invalido'), /modo "local"/);
});

test('normaliza URL HTTPS quando informada', () => {
  assert.equal(normalizarUrlBase('https://meu-preview.github.io'), 'https://meu-preview.github.io');
  assert.equal(normalizarUrlBase(''), '');
  assert.throws(() => normalizarUrlBase('http://inseguro.com'), /HTTPS/);
});

test('detecção de ambiente identifica plataforma local', async () => {
  const resultado = await detectarAmbiente();
  assert.equal(resultado.recomendacao, 'local');
  assert.ok(Array.isArray(resultado.sinais));
});

test('atualiza texto do env preservando campos e adicionando novos', () => {
  const env = atualizarEnvTexto('TOKEN=preservado\nAPP_MODE=local\n', {
    APP_MODE: 'local',
    PREVIEW_PORT: '5000'
  });
  assert.match(env, /TOKEN=preservado/);
  assert.match(env, /APP_MODE=local/);
  assert.match(env, /PREVIEW_PORT=5000/);
});

test('gera tokens e URLs de preview assinados', () => {
  const segredo = 'segredo-de-teste-12345';
  const tokenPreview = criarTokenPreview(segredo, 'post-01', 2_000_000_000);
  assert.equal(validarTokenPreview(segredo, 'post-01', tokenPreview, 1_900_000_000_000), true);
  assert.equal(validarTokenPreview(segredo, 'outro-post', tokenPreview, 1_900_000_000_000), false);

  const url = criarUrlMidia('https://usuario.github.io/repo', 'saidas/posts-individuais/post-01/slide-01.png');
  assert.equal(url, 'https://usuario.github.io/repo/saidas/posts-individuais/post-01/slide-01.png');
});
