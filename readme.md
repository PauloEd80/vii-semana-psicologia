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
├── netlify.toml
├── agents.md
├── readme.md
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
parceiros logo abaixo). Detalhes técnicos em `agents.md`. Duas coisas
ficaram como placeholder de propósito, esperando ajuste manual:

- **Imagem do card** (`assets/img/hero-card-background.jpg`) — hoje é
  uma composição abstrata gerada localmente, não a foto/ilustração
  final. Passo a passo para trocar: `assets/img/README.md`.
- **Cor do botão** (`--color-maroon-600` em `variables.css`) — estimei
  visualmente a partir do print; não é um hex confirmado. Se tiverem o
  valor exato (do manual de marca, por exemplo), é só atualizar esse
  token.

Não recriei o padrão de ícones flutuantes (mão, coração, maleta, Ψ
etc.) que aparece à esquerda no print, nem a tipografia gigante exata
do tema completo — priorizei o card em si, que é o elemento central.

## Pendências

- [ ] Trocar `assets/img/hero-card-background.jpg` pela arte final (ver `assets/img/README.md`).
- [ ] Confirmar/ajustar `--color-maroon-600` e `--color-maroon-700` em `assets/css/variables.css` com o valor exato de marca, se houver.
- [ ] Os três botões de inscrição (header, hero, seção "Sobre") apontam para `#` — trocar pelo link/formulário real assim que disponível.
- [ ] `.qrcode-placeholder` na seção "Sobre" é só um texto estilizado — substituir por um QR Code real apontando para a inscrição.
- [ ] Badges da seção "Realização" são texto, não logos — ver `assets/img/README.md`. Um dos itens ("Instituição parceira") é um placeholder genérico porque não consegui identificar o brasão do print com segurança.
- [ ] O rótulo "Acesso ao site" no header não bate com os demais botões de inscrição ("Faça sua inscrição") — confirmar se é intencional.
- [ ] A seção com id `palestrantes` (item de menu "Palestrantes") mostra a Comissão Organizadora, não biografias de palestrantes.
