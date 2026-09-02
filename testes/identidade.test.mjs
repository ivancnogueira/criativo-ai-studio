import test from 'node:test';
import assert from 'node:assert/strict';
import { coresDaIdentidade, diagnosticarIdentidade } from '../automacoes/lib/identidade.mjs';

test('extrai cores padrão da identidade YAML', () => {
  const yml = `
tema:
  cor_fundo: "#FFFFFF"
  cor_texto: "#000000"
  cor_destaque: "#FF0000"
  cor_secundaria: "#333333"
  cor_acento: "#00FF00"
  fonte_titulo: "Montserrat"
  fonte_texto: "Open Sans"
`;
  const cores = coresDaIdentidade(yml);
  assert.equal(cores.fundo, '#FFFFFF');
  assert.equal(cores.texto, '#000000');
  assert.equal(cores.destaque, '#FF0000');
});

test('diagnostica pendências na identidade visual', () => {
  const diagnosticoIncompleto = diagnosticarIdentidade({
    designSystem: 'A definir',
    identidade: 'cor_fundo: A definir',
    briefingVisual: 'Pendente',
    brandbook: 'Pendente',
    direcaoVisual: null
  });
  assert.equal(diagnosticoIncompleto.pronto, false);
  assert.ok(diagnosticoIncompleto.pendencias.length > 0);

  const diagnosticoCompleto = diagnosticarIdentidade({
    designSystem: '## Paleta completa',
    identidade: 'tema:\n  cor_fundo: "#FFF"\n  cor_texto: "#000"\n  cor_destaque: "#F00"\n  cor_secundaria: "#333"\n  cor_acento: "#0F0"\n',
    briefingVisual: '## Conceito definido',
    brandbook: '## Fundamento definido',
    direcaoVisual: { conceito: 'x', pontoFocal: 'y', estrutura: 'z', selo: 'w' }
  });
  assert.equal(diagnosticoCompleto.pronto, true);
  assert.equal(diagnosticoCompleto.pendencias.length, 0);
});
