import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { alterarJob, criarJob, lerJob } from '../automacoes/lib/fila.mjs';

test('criação e aprovação de job são idempotentes e auditadas', async () => {
  const raiz = await mkdtemp(join(tmpdir(), 'cas-fila-'));
  try {
    await criarJob(raiz, { id: 'TESTE-001', legenda: 'Teste post', imagens: ['slide-01.png'] });
    const job = await lerJob(raiz, 'TESTE-001');
    assert.equal(job.status, 'pronto_para_aprovar');

    await alterarJob(raiz, 'TESTE-001', 'antigravity-chat', 'aprovar');
    const jobAprovado = await lerJob(raiz, 'TESTE-001');
    assert.equal(jobAprovado.status, 'aprovado');
    assert.equal(jobAprovado.aprovadoPor, 'antigravity-chat');

    await assert.rejects(() => alterarJob(raiz, 'TESTE-001', 'antigravity-chat', 'aprovar'), /não está pronta/);
  } finally {
    await rm(raiz, { recursive: true, force: true });
  }
});

test('aprovação é recusada se imagem foi modificada após entrar na fila', async () => {
  const raiz = await mkdtemp(join(tmpdir(), 'cas-fila-hash-'));
  try {
    const imagem = join(raiz, 'slide.png');
    await writeFile(imagem, 'imagem-v1-bytes');
    await criarJob(raiz, { id: 'TESTE-002', legenda: 'Teste', imagens: [imagem] });
    await writeFile(imagem, 'imagem-v2-bytes-modificados');
    await assert.rejects(() => alterarJob(raiz, 'TESTE-002', 'antigravity-chat', 'aprovar'), /mudou após entrar na fila/);
  } finally {
    await rm(raiz, { recursive: true, force: true });
  }
});
