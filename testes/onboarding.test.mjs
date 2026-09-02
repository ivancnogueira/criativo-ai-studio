import test from 'node:test';
import assert from 'node:assert/strict';
import {
  montarBrandbook,
  montarBriefingVisual,
  montarDesignSystem,
  montarIdentidadeVisual,
  montarPerfil,
  montarTokens
} from '../automacoes/onboarding.mjs';
import { estadoAposPrimeiraPublicacao } from '../automacoes/lib/estado-onboarding.mjs';

test('monta estrutura de perfil da marca completa', () => {
  const dados = {
    negocio: 'Consultoria Financeira',
    publico: 'Pequenos empresários',
    contextoPublico: 'Falta de fluxo de caixa',
    posicionamento: 'Gestão ágil',
    oferta: 'Diagnóstico financeiro',
    transformacao: 'Previsibilidade',
    provas: 'Mais de 100 empresas atendidas',
    tom: 'Técnico e acessível',
    vocabulario: 'ROI, Margem, Fluxo',
    cta: 'Agende uma conversa',
    objetivos: 'Autoridade e leads',
    capacidade: '3 posts por semana',
    limites: 'Não prometer enriquecimento rápido'
  };
  const resultado = montarPerfil(dados);
  assert.match(resultado, /Consultoria Financeira/);
  assert.match(resultado, /Pequenos empresários/);
  assert.match(resultado, /Diagnóstico financeiro/);
});

test('monta design system com regras de arte e dimensões', () => {
  const dados = {
    personalidade: 'Elegante',
    sensacao: 'Confiança',
    energia: 'Média',
    formalidade: 'Semi-formal',
    principios: '1. Clareza 2. Contraste 3. Espaço',
    primaria: '#2A9D8F',
    secundaria: '#142C2C',
    fundo: '#F4F1EA',
    texto: '#142C2C',
    acento: '#E9C46A',
    usoCores: 'Fundo claro com destaques verdes',
    fonteTitulo: 'Playfair Display',
    fonteTexto: 'Inter',
    enfase: 'Negrito 800',
    regrasTipo: 'Títulos em caixa alta',
    fotografia: 'Luz natural',
    enquadramento: 'Plano médio',
    densidade: 'Espaço negativo generoso',
    componentes: 'Selo no canto superior',
    hierarquia: 'Título > Subtítulo > CTA',
    logo: 'recursos/logos/logo.png',
    antiPadroes: 'Não usar fontes decorativas'
  };
  const resultado = montarDesignSystem(dados);
  assert.match(resultado, /#2A9D8F/);
  assert.match(resultado, /Playfair Display/);
  assert.match(resultado, /1080×1350/);
});

test('monta tokens CSS', () => {
  const resultado = montarTokens({
    primaria: '#2A9D8F',
    secundaria: '#142C2C',
    acento: '#E9C46A',
    fundo: '#F4F1EA',
    texto: '#142C2C',
    textoSuave: '#5F6B6B',
    fonteTitulo: 'Playfair Display',
    fonteTexto: 'Inter'
  });
  assert.match(resultado, /--brand-primary: #2A9D8F;/);
  assert.match(resultado, /--brand-font-heading: "Playfair Display"/);
});

test('estado após primeira publicação atualiza para pronto', () => {
  const ymlInicial = `versao: 2
onboarding:
  status: em_andamento
  etapa_atual: postagem
  perfil: validado
  ativos_visuais: validado
  identidade_visual: validado
  direcao_visual: validado
  pilares: validado
  primeiro_briefing: validado
  primeiro_post: pendente
  validacao_usuario: pendente
  integracao_instagram: pendente
  primeira_publicacao: pendente
`;
  const atualizado = estadoAposPrimeiraPublicacao(ymlInicial, {
    mediaId: '123456789',
    permalink: 'https://instagram.com/p/ABC123xyz'
  });
  assert.match(atualizado, /status: pronto/);
  assert.match(atualizado, /primeira_publicacao_id: "123456789"/);
});
