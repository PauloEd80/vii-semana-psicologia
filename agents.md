# AGENTS.md

## Visão geral

Site estático (sem build) para a VII Semana de Psicologia da Universidade Positivo Londrina. Landing page one-page com seções âncora: hero com contador regressivo, sobre o evento, programação, comissão organizadora e FAQ.

## Arquitetura

- `index.html` — página inicial, com a maior parte das seções via âncoras (`#programacao`, `#comissao`, `#faq`, etc.).
- `palestrantes.html` — página dedicada aos palestrantes (conferencista de abertura, oficineiros, participantes das mesas-redondas), aberta a partir do menu "Palestrantes" e do card "Palestras" na home. Usa os mesmos 5 arquivos de CSS e o mesmo header/footer do index.html — qualquer mudança em `layout.css`/`components.css`/`variables.css` afeta as duas páginas.
- `assets/css/` — CSS modular carregado em cascata, **nessa ordem** (a ordem importa: `responsive.css` depende de ser carregado por último para sobrescrever corretamente `layout.css` em telas pequenas):
  1. `variables.css` — tokens de design (cores, tipografia, espaçamento, sombras).
  2. `base.css` — reset e estilos globais de elementos.
  3. `layout.css` — estrutura de header, hero, seções e footer.
  4. `components.css` — componentes reutilizáveis (botões, contador, cards, cronograma, FAQ).
  5. `responsive.css` — regras mobile-first e breakpoints (420px, 768px, 1024px).
- `assets/js/` — scripts independentes, cada um com responsabilidade única, carregados como scripts comuns (`defer`, **sem** `type="module"` — nenhum usa `import`/`export`):
  - `countdown.js` — contador regressivo até 25/08/2026 18h00 (horário de Brasília).
  - `nav.js` — abertura/fechamento do menu mobile.
  - `favorite.js` — estado de "favorito" persistido em `localStorage`.
- `assets/img/` — imagens do site. Ver `assets/img/README.md` para nomes, dimensões e como substituir cada uma.
- `netlify.toml` — publish, headers de segurança (CSP, X-Frame-Options) e cache de `/assets/*`.

## Seções da página (nessa ordem)

1. Header fixo (`.site-header`).
2. Hero (`.hero`) — fundo claro com tipografia gigante decorativa
   (`.hero-decor`, só a partir do tablet) atrás de um card com imagem
   própria (`.hero-card`, ver `assets/img/README.md`), contendo título,
   subtítulo do tema, contador, nome da instituição e CTA.
3. Realização (`.realizacao`) — faixa de logos/nomes dos parceiros, logo
   após o Hero.
4. Sobre o Evento (`#sobre`).
5. Programação (`#programacao`).
6. Comissão Organizadora (`#palestrantes`).
7. FAQ (`#faq`).
8. Footer — só copyright; os logos que ficavam aqui foram movidos para
   a seção Realização (evitava duplicação).

## Convenções

- Sem frameworks e sem etapa de build.
- Caminhos de assets no `index.html` são **relativos** (`assets/css/...`, nunca `/assets/css/...`) — funciona tanto abrindo o arquivo localmente quanto em produção.
- Scripts em `assets/js/` são carregados como scripts comuns com `defer`, não como módulos ES — evita que a página quebre ao ser aberta via `file://`.
- Cores e espaçamentos usam as variáveis CSS de `variables.css`, nunca valores hardcoded.
- Paleta: azul corporativo para identidade/institucional; **vinho/bordô** (`--color-maroon-600`/`700`) é a cor do CTA principal (`.btn-cta`) desde que o cliente enviou referência visual; laranja segue como cor de destaque secundária (eyebrow, rótulos, bordas de destaque).
- Nenhuma dependência de CDN externo (fontes, ícones, scripts) — tudo carrega de `assets/`.

## Bugs corrigidos nesta revisão

- Caminhos absolutos (`/assets/...`) trocados por relativos — causa mais provável de a página não abrir corretamente ao ser testada localmente.
- `type="module"` removido dos três `<script>` — módulos ES são bloqueados por CORS ao abrir via `file://`; como nenhum arquivo usa `import`/`export`, não há perda de funcionalidade.
- Fontes do Google (CDN externo) removidas do `<head>`.
- `netlify.toml` reescrito — o anterior tinha `publish = "/opt/build/repo"` (caminho interno do container de build da Netlify, não um valor válido para commitar) e chaves (`headersOrigin`, `publishOrigin`) características de uma configuração exportada pela própria Netlify, não escrita à mão.
- Os três botões "Faça sua inscrição" / "Acesso ao site" apontavam para `#inscricao`, um id que só existia no próprio botão do Hero (auto-referência, nunca navegava para lugar nenhum) — trocados por `href="#"` com comentário `TODO` até haver link real de inscrição.

## Adequação ao print de referência do cliente

O Hero foi reformulado para se aproximar de um print de referência
enviado pelo cliente (faixa escura full-bleed centralizada → card claro
alinhado à esquerda). Mudanças:

- `.hero` virou fundo claro (`--color-lavender-50`); o conteúdo mora
  dentro de `.hero-card`, que tem largura máxima (900px), cantos
  arredondados, sombra e imagem própria.
- Texto alinhado à esquerda (era centralizado).
- `<h1>` em caixa mista ("VII Semana de Psicologia"); antes era caixa
  alta fixa no HTML.
- `.countdown-item` perdeu o fundo/borda ("caixinha de vidro") — no
  anexo os números aparecem soltos, maiores, sobre a própria imagem.
- Ordem dentro do card: título → subtítulo do tema → contador →
  `.hero-meta` (só o nome da instituição, sem mais repetir a data por
  extenso, já que o contador cobre isso) → CTA.
- `--color-maroon-600`/`700` adicionadas em `variables.css` — cor do
  botão de CTA **estimada visualmente** a partir do print, não é um hex
  confirmado pelo cliente. Ajustar esse token se o valor exato vier
  depois.
- Nova seção `.realizacao` logo após o Hero, com os logos que antes só
  apareciam no rodapé.
- Não recriei a ilustração/foto do card (rosto + rede) nem o padrão de
  ícones flutuantes à esquerda do print — ficaram como
  placeholder/pendência (ver `assets/img/README.md` e `readme.md`).

## Virou site de 2 páginas (era one-page)

Um documento de conteúdo trouxe biografias detalhadas dos palestrantes
e pediu uma página dedicada a eles. Mudanças decorrentes:

- Nova página `palestrantes.html`, mesmo header/footer/CSS do `index.html`.
- Menu "Palestrantes" e o card "Palestras" (no `.highlights-grid` da
  home) agora apontam para `palestrantes.html` em vez de uma âncora
  interna. O card "Palestras" virou `<a>` em vez de `<div>` — por isso
  `.highlight-card` ganhou `display: block` explícito (funciona igual
  como link ou como div).
- A seção que antes tinha `id="palestrantes"` (mas mostrava a Comissão
  Organizadora, não palestrantes) foi renomeada para `id="comissao"` —
  resolve a inconsistência já registrada antes neste arquivo.
- Novos componentes em `components.css`: `.speakers-grid`,
  `.speaker-card` e variantes (`__photo`, `__badge`, `__name`,
  `__activity`, `__bio`). Foto é placeholder de iniciais em CSS — ver
  `assets/img/README.md` para trocar por fotos reais.
- Novo padrão de layout `.page-banner` (banner simples para páginas
  secundárias, sem card/contador — usado em `palestrantes.html`, mas
  reutilizável se surgirem outras páginas).
- Estado "página atual" no menu: `aria-current="page"` no link
  correspondente + regra `.main-nav ul a[aria-current="page"]` em
  `layout.css`.
- `--color-maroon-600`/`700` (`variables.css`) refinados: o mesmo
  documento sugeriu `#800020`/`#8B1E2B` como paleta de CTA, batendo com
  a faixa de cor que eu já tinha estimado antes a partir de um print —
  atualizei os tokens pra esses valores.
- Corrigidas duas pequenas inconsistências de conteúdo na Programação
  (`index.html`), a partir do mesmo documento: acento em "Natália
  Kimie Matsubara" e o segundo palestrante da mesa RAPS (Dr. Roberth
  Miniguine Tavanti), que não estava listado antes.

## Mesclagem com edições em paralelo (GitHub)

O projeto foi editado em paralelo em dois lugares: aqui (palestrantes,
Programação) e num repositório GitHub (link de inscrição, QR Code, logo
de Realização, "UP" no logo, largura do Hero, texto da seção Sobre).
Mesclado nesta revisão — ver `readme.md` para o detalhamento de cada
mudança absorvida e as duas correções feitas ao integrar (`.hero-meta`
vs `.eyebrow`; `<h2>` duplicado/`<p>` sem fechamento na seção Sobre).

Lição para não repetir: ao exportar um zip deste projeto para colocar
num repositório Git, extraia o **conteúdo** direto na raiz do repo, não
a pasta "vii-semana-psicologia" como uma subpasta dentro dele — isso já
causou aninhamento duplicado antes (ver histórico da conversa).

## Decisões não óbvias

- O "favoritar" evento é apenas uma preferência local do navegador (`localStorage`), não um dado de aplicação — por isso não usa banco de dados Netlify.
- Datas do cronograma e do contador estão fixadas para 2026 conforme o conteúdo oficial do evento; ao reutilizar o template para outra edição, atualizar `EVENT_DATE` em `countdown.js` e as datas em `index.html` (hero, meta description e seção Programação).
- A seção com id `palestrantes` atualmente exibe a Comissão Organizadora (docentes/discentes), não biografias de palestrantes — ver `readme.md` para a pendência de revisão de conteúdo.
