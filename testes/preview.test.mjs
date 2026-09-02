import test from 'node:test';
import assert from 'node:assert/strict';
import { gerarHtml, validarDados } from '../automacoes/criar-previa.mjs';

test('valida dados obrigatórios do preview', () => {
  assert.throws(() => validarDados({}), /Use um slug/);
  assert.throws(() => validarDados({ slug: 'post-valido', slides: [] }), /ao menos um slide/);
  assert.throws(() => validarDados({ slug: 'post-valido', slides: ['../inseguro.png'] }), /relativo seguro/);
});

test('gera HTML de preview interpolando dados', () => {
  const template = '<html><head><title>{{PAGE_TITLE}}</title></head><body><h1>{{USERNAME}}</h1><div class="{{VERIFIED_CLASS}}"></div>{{PREVIEW_DATA}}</body></html>';
  const html = gerarHtml({
    slug: 'post-teste',
    titulo: 'Post de Teste',
    legenda: 'Legenda do post',
    slides: ['saidas/posts-individuais/post-teste/slide-01.png'],
    perfil: { usuario: 'meu_negocio', verificado: true },
    template
  });
  assert.match(html, /Post de Teste/);
  assert.match(html, /meu_negocio/);
  assert.doesNotMatch(html, /hidden/);
});
