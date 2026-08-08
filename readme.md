# VII Semana de Psicologia — Universidade Positivo Londrina

Landing page estática one-page para divulgação, cronograma e inscrições da VII Semana de Psicologia da Universidade Positivo (Campus Londrina-PR), com o tema "Psicologia e seu projeto ético-político: história e enfrentamentos contemporâneos".

## Tecnologias

- HTML5 semântico
- CSS3 moderno (Flexbox, Grid, variáveis CSS, mobile-first)
- JavaScript Vanilla ES6+ (scripts comuns com `defer`, sem módulos ES)
- Netlify (hospedagem estática, headers de segurança via `netlify.toml`)

Nenhum framework, build ou dependência externa — o site é HTML/CSS/JS puro e carrega tudo localmente a partir de `assets/`.

## Estrutura

```
/
├── index.html
├── palestrantes.html
├── netlify.toml
├── agents.md
├── readme.md
├── plano-de-edicoes.md
├── .gitignore
└── assets/
    ├── css/
    │   ├── variables.css
    │   ├── base.css
    │   ├── layout.css
    │   ├── components.css
    │   └── responsive.css
    ├── js/
    │   ├── countdown.js
    │   ├── nav.js
    │   └── favorite.js
    └── img/
        ├── hero-card-background.jpg
        └── README.md
```

## Rodando localmente

Não há dependências para instalar. Os caminhos dos assets são relativos, então dá para abrir `index.html` direto (duplo clique) ou, se preferir, usar um servidor local:

```bash
npx serve .
# ou
python3 -m http.server 8000
```

## Deploy (Netlify)

1. Conecte este repositório a um site no Netlify.
2. Build command: deixar em branco (não há build).
3. Publish directory: `.`
4. `netlify.toml` já define headers de segurança e cache de `/assets/*`.

## O que foi corrigido em relação à versão anterior

- Caminhos de `assets/` eram absolutos (`/assets/...`) — trocados por relativos. Isso evita que a página quebre ao ser aberta localmente via duplo clique (onde um caminho absoluto tenta resolver a partir da raiz do sistema de arquivos, não da pasta do projeto).
- `<script type="module">` removido — nenhum dos três arquivos usa `import`/`export`, e scripts do tipo módulo são bloqueados por CORS quando a página é aberta via `file://`, que é provavelmente a causa principal de "não abrir direito no navegador".
- Fontes do Google (CDN externo) removidas — o projeto agora depende só da stack de fontes do sistema já definida em `variables.css`.
- `netlify.toml` reescrito (o anterior tinha um `publish` inválido para versionamento e chaves que parecem geradas automaticamente pela Netlify).

## Adequação visual ao print de referência do cliente

O Hero foi refeito para se aproximar de um print de referência: virou
um card com imagem própria (fundo claro ao redor, texto alinhado à
esquerda, contador sem "caixinha", nova seção "Realização" com os
parceiros logo abaixo). Detalhes técnicos em `agents.md`.

- **Imagem do card** (`assets/img/hero-card-background.jpg`) já é a
  arte real (a composição com o perfil e a árvore de ícones) — não é
  mais placeholder.
- **⚠️ Ponto de atenção, não corrigido de propósito**: essa imagem já
  traz "VII SEMANA DE PSICOLOGIA" e o tema desenhados dentro dela. O
  `<h1>`/`.hero-subtitle` do HTML (texto branco, por cima da imagem)
  mostram esse mesmo conteúdo de novo, numa fonte diferente — pode ficar
  redundante ou até sobrepor visualmente, dependendo do quanto a imagem
  é recortada pelo `background-size: cover` em cada tamanho de tela.
  Não ajustei isso porque não sei se é intencional (destacar o texto
  duas vezes, com tratamentos diferentes) ou se seria melhor eu reduzir
  o texto branco sobreposto, ou a opacidade do degradê. Só avisar qual
  caminho preferem.
- **Cor do botão** (`--color-maroon-600` em `variables.css`) — estimei
  visualmente a partir do print; não é um hex confirmado. Se tiverem o
  valor exato (do manual de marca, por exemplo), é só atualizar esse
  token.

Não recriei o padrão de ícones flutuantes (mão, coração, maleta, Ψ
etc.) que aparece à esquerda no print, nem a tipografia gigante exata
do tema completo — priorizei o card em si, que é o elemento central.

## Mesclagem com edições feitas em paralelo (GitHub)

Vocês estavam editando uma cópia do projeto direto no GitHub enquanto eu
adicionava os palestrantes e corrigia a Programação nesta conversa. As
duas linhas de trabalho foram unidas nesta revisão. O que veio de lá:

- Link real de inscrição (Google Forms) nos dois botões "Faça sua inscrição".
- QR Code real (`assets/img/qrcode-inscricao.png` — renomeado do original
  `Qrcode.png`; o HTML referenciava em minúsculas, o que teria dado 404
  em produção, já que servidores como a Netlify diferenciam maiúscula de
  minúscula no nome do arquivo).
- Logo combinado real da seção "Realização" (`assets/img/logo-realizacao.png`).
- Sigla do logo no cabeçalho trocada de "VS" para "UP".
- Card do Hero mais largo (`max-width: none`) e mais alto (`min-height: 550px`).
- Texto da seção "Sobre o Evento" ampliado para 3 parágrafos mais detalhados.

Dois ajustes que fiz ao integrar, porque o arquivo original tinha problemas:
- O texto do cabeçalho "Universidade Positivo · Londrina" (dentro do
  card, `.hero-meta`) estava com `font-size: 1.84rem` — bem maior que
  qualquer outro texto do card, inclusive o contador. Pelo pedido
  original ("aumentar o texto acima do card"), entendi que a intenção
  era o `.eyebrow` (o texto **fora**, acima do card) — que é o que
  aumentei — e mantive o `.hero-meta` no tamanho original. Se a
  intenção era mesmo aumentar o texto de dentro do card, me avisem.
- A seção "Sobre" tinha um `<h2>` com o texto duplicado ("VII SEMANA DE
  PSICOLOGIAVII SEMANA DE PSICOLOGIA") e três `<p>` sem tag de
  fechamento. Corrigi para um único `<h2>Sobre o Evento</h2>` — mantendo
  o nome do evento redundante com o `<h1>` do Hero não parecia
  necessário — e adicionei o texto novo como `.section-intro` (mesmo
  padrão usado em "Programação").

## Pendências

- [ ] Ver a nota sobre texto duplicado na imagem do card (seção acima) — decidir se ajusto o overlay branco.
- [ ] Tamanho de exibição de `logo-realizacao.png` (`.realizacao-logos`, `max-height: 48px` em `layout.css`): o HTML que recebi para essa imagem não tinha altura definida, então esse valor é minha estimativa — se vocês já tinham um tamanho específico em mente, me diga (ou o valor em px) que eu ajusto numa linha.
- [ ] `--color-maroon-600`/`700` em `variables.css`: dois sinais independentes (print do cliente + hex sugeridos no documento de palestrantes) convergiram pra essa faixa de cor, mas nenhum dos dois é uma confirmação oficial do manual de marca — se ele existir, vale checar.
- [ ] O botão "Acesso ao site" no header ainda aponta para `#` (não recebeu o link do Forms como os outros dois "Faça sua inscrição") — o rótulo diferente sugere que pode ser um destino diferente de propósito; confirmar.
- [ ] Um dos logos dentro de `logo-realizacao.png` (um brasão, entre "Centro de Pesquisa Positivo" e "Araucária") eu não consegui identificar com certeza.
- [x] ~~A seção com id `palestrantes` mostra a Comissão Organizadora, não biografias de palestrantes.~~ Resolvido: essa seção agora usa `id="comissao"`, e biografias reais de palestrantes viraram uma página própria (`palestrantes.html`).
- [x] ~~Os botões de inscrição apontam para `#`.~~ Resolvido para os dois "Faça sua inscrição" (Hero e Sobre) — link real do Google Forms.
- [x] ~~QR Code e logos da Realização eram placeholder de texto.~~ Resolvido — ambos agora são imagens reais.

## Nova página: palestrantes.html

- [ ] Fotos reais dos 7 palestrantes — hoje cada card mostra as iniciais do nome (círculo com gradiente, gerado em CSS). Passo a passo pra trocar por foto: `assets/img/README.md`.
- [ ] O card "Palestras" e o botão do menu "Palestrantes" já apontam pra essa página nova; a seção antiga (Comissão Organizadora) mudou de `#palestrantes` pra `#comissao` — se algum link externo (ex.: redes sociais, e-mail) já usava `#palestrantes` apontando pra este site, precisa ser atualizado.
- [ ] Conferir se a Programação (Dia 26) precisa de mais ajustes de conteúdo — corrigi o acento de "Natália Kimie Matsubara" e adicionei "Dr. Roberth Miniguine Tavanti" como segundo palestrante da mesa RAPS, ambos a partir do documento de biografias enviado.
