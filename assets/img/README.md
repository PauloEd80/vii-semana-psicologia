# Guia de Imagens — `assets/img/`

## `hero-card-background.jpg`

Fundo do card no topo da página (`.hero-card`, referenciado em
`assets/css/layout.css`). **Placeholder atual**: composição abstrata
gerada localmente (tons de azul/teal com um padrão de pontos
conectados) — não é a arte final, é só pra o card não nascer com um
fundo quebrado.

**Como trocar:**

1. Prepare a imagem final (a ilustração/foto que o cliente aprovar).
   Dimensão sugerida: por volta de **1600×1000px** (paisagem), já que o
   card usa `background-size: cover` — qualquer proporção parecida
   funciona, ela é recortada automaticamente para preencher o espaço.
2. Salve com **o mesmo nome**: `hero-card-background.jpg` (se o arquivo
   novo for `.png` ou `.webp`, também dá pra usar — só ajuste a extensão
   no `background-image: url(...)` dentro de `.hero-card::before`, em
   `assets/css/layout.css`).
3. Substitua o arquivo nesta pasta. Nenhuma outra edição é necessária.

Importante: o card tem um degradê azul por cima da imagem
(`.hero-card::after`, em `layout.css`) para garantir que o texto branco
continue legível em qualquer foto. Se a nova imagem for muito clara,
pode ser necessário escurecer um pouco esse degradê.

## Logos da seção "Realização"

Os nomes das instituições (Universidade Positivo, Centro de Pesquisa
Positivo, Araucária, ecohub, etc.) hoje aparecem como texto estilizado
(`.partner-badge`, em `index.html`), não como imagens — não tenho os
arquivos de logo reais. Quando tiverem os logos oficiais:

1. Salve cada um em `assets/img/` com nome intuitivo, ex.:
   `logo-universidade-positivo.png`, `logo-cpup.png`, `logo-araucaria.png`,
   `logo-ecohub.png`.
2. Em `index.html`, na seção `<!-- ===== REALIZAÇÃO ===== -->`, troque
   cada `<li class="partner-badge">Nome</li>` por
   `<li class="partner-badge"><img src="assets/img/logo-x.png" alt="Nome da instituição" height="28"></li>`.
3. Se quiser, posso fazer essa troca — é só mandar os arquivos.

## Sobre o item "Instituição parceira"

No anexo de referência há um brasão/emblema entre "Centro de Pesquisa
Positivo" e "Araucária" que não consegui identificar com segurança —
deixei como placeholder genérico em `index.html`. Substituam pelo nome
correto (e, quando possível, pelo logo real).
