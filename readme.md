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

