const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Normaliza a legenda para envio à Meta API.
 * Converte sequências literais \\n em quebras de linha reais (\n).
 * Remove espaços em branco desnecessários no início/fim.
 */
export function normalizarLegenda(texto) {
  if (!texto) return '';
  return String(texto)
    .replace(/\\n/g, '\n')   // \\n literal → newline real
    .replace(/\r\n/g, '\n')  // CRLF → LF
    .replace(/\r/g, '\n')    // CR → LF
    .trim();
}

async function chamar(fetchFn, url, opcoes = {}) {
  const resposta = await fetchFn(url, opcoes);
  const dados = await resposta.json().catch(() => ({}));
  if (!resposta.ok || dados.error) {
    throw new Error(`Meta API recusou a operação (${dados.error?.code || resposta.status}).`);
  }
  return dados;
}

export async function publicarNaMeta({ fetchFn = fetch, apiVersion, instagramId, token, urls, legenda, tipo = 'post' }) {
  const legendaNormalizada = normalizarLegenda(legenda);
  const base = `https://graph.facebook.com/${apiVersion}`;
  const post = (rota, campos) =>
    chamar(fetchFn, `${base}/${rota}`, {
      method: 'POST',
      body: new URLSearchParams({ ...campos, access_token: token })
    });

  let container;
  if (tipo === 'story' || tipo === 'stories') {
    container = (await post(`${instagramId}/media`, { image_url: urls[0], media_type: 'STORIES' })).id;
  } else if (urls.length === 1) {
    container = (await post(`${instagramId}/media`, { image_url: urls[0], caption: legendaNormalizada })).id;
  } else {
    const filhos = [];
    for (const image_url of urls) {
      filhos.push((await post(`${instagramId}/media`, { image_url, is_carousel_item: 'true' })).id);
    }
    container = (await post(`${instagramId}/media`, { media_type: 'CAROUSEL', children: filhos.join(','), caption: legendaNormalizada })).id;
  }

  for (let tentativa = 0; tentativa < 12; tentativa++) {
    const estado = await chamar(fetchFn, `${base}/${container}?fields=status_code`, {
      headers: { authorization: `Bearer ${token}` }
    });
    if (estado.status_code === 'FINISHED') break;
    if (estado.status_code === 'ERROR') throw new Error('A Meta informou erro ao processar a mídia.');
    if (tentativa === 11) throw new Error('Tempo esgotado aguardando o processamento da mídia.');
    await esperar(5000);
  }

  const mediaId = (await post(`${instagramId}/media_publish`, { creation_id: container })).id;
  const publicado = await chamar(fetchFn, `${base}/${mediaId}?fields=id,permalink`, {
    headers: { authorization: `Bearer ${token}` }
  });
  return { mediaId, permalink: publicado.permalink || '' };
}
