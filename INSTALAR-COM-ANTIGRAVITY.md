# Instalação assistida pelo Antigravity IDE

Em uma janela vazia do Antigravity IDE ou terminal, envie este prompt no chat:

```text
Instale o Criativo AI Studio a partir de https://github.com/ivancnogueira/criativo-ai-studio.git em uma nova pasta criativo-ai-studio no diretório atual. Depois do clone, leia integralmente GEMINI.md, README.md, documentacao/onboarding-guiado.md e documentacao/configurar-github-pages.md. Você está autorizado a executar npm install e configurar o ambiente. Conduza a instalação e o onboarding como um único processo contínuo, sem encerrar entre etapas.

Antes da primeira pergunta, mostre estes seis marcos:
1) Instalação (Node.js 20+, dependências, .env)
2) Perfil (Negócio, público, oferta, posicionamento, voz, objetivos e restrições)
3) Identidade Visual (Inventário de fotos, logo, referências, cores, tipografia, design system e direção de arte)
4) Configurações (Meta API e GitHub Pages para URLs públicas)
5) Primeiro Post e Preview (Briefing, copy, arte premium com generate_image em 1080x1350 e preview mobile)
6) Postagem (Job auditável, confirmação APROVAR ID-DO-JOB e publicação oficial)

Em cada interação, mostre o marco atual, progresso, a decisão que estamos tomando e o resultado da próxima etapa. Nunca termine apenas perguntando se quero continuar.

Regras fundamentais:
- No marco Perfil, registre negócio, público, oferta, posicionamento e voz em blocos curtos no conteudos/perfil-da-marca.md.
- No marco Identidade Visual, pergunte se já tenho os ativos e indique recursos/logos/, recursos/fotos/ e recursos/referencias/. Se eu ainda não tiver, posso escolher entre fornecer depois ou seguir temporariamente sem logo e/ou fotos. Mantenha sincronizados brandbook.md, design-system.md, tokens.css, briefing-visual.md e identidade-visual.yml. Não gere artes enquanto decisões essenciais estiverem pendentes.
- No marco Configurações, oriente a criação do app Meta e do repositório público no GitHub Pages, com preenchimento exclusivo no .env local. Nunca peça nem exiba tokens no chat. Execute npm run validar:integracoes.
- No marco Primeiro Post, use planejar-conteudo, copywriter-instagram e criar-post-individual para gerar um post 1080x1350 com generate_image, usando fotos e referências autorizadas via ImagePaths. Crie a prévia com npm run criar-previa e atualize a vitrine.
- No marco Postagem, envie os artefatos ao GitHub Pages (npm run pages:publicar), faça dry-run, crie um job único e peça no chat a confirmação exata APROVAR ID-DO-JOB. Só após receber essa confirmação exata, registre a aprovação e publique via Meta API.
- Ao concluir, execute npm test e npm run diagnosticar, atualize conteudos/estado-do-studio.yml para pronto com mediaId e permalink registrados.
```

---

## Se você já baixou o arquivo zip (Área de membros)

Se você já extraiu o projeto em uma pasta e a abriu no Antigravity IDE, envie este prompt no chat:

```text
Inicie o onboarding do Criativo AI Studio nesta pasta. Leia integralmente GEMINI.md, README.md e documentacao/onboarding-guiado.md. Verifique dependências e conduza o processo pelos 6 marcos até a primeira publicação oficial.
```

---

## Comportamento obrigatório do agente

1. **Preservação:** Manter `.env`, conteúdos e ativos existentes sem sobrescrever respostas anteriores.
2. **Segurança de credenciais:** Nunca receber, exibir ou solicitar tokens no chat, em comandos ou commits.
3. **Publicação com aprovação explícita:** Preview visual aprovado NÃO publica automaticamente; apenas o comando exato `APROVAR ID-DO-JOB` autoriza o disparo da Meta API.
4. **Conclusão real:** Encerrar o onboarding somente após a primeira publicação real ser registrada com `mediaId` e permalink.
