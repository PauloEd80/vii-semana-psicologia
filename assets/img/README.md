# Guia de Imagens — `assets/img/`

## `hero-card-background.jpg`

Fundo do card no topo da página (`.hero-card`, referenciado em
`assets/css/layout.css`). **Já é a arte real** (a composição com o
perfil e a árvore de ícones, igual ao print de referência do cliente) —
não é mais o placeholder abstrato das versões anteriores.

Observação: o arquivo tem conteúdo PNG mas mantém a extensão `.jpg`
(nome que o CSS já referenciava). Isso funciona sem problema — o
navegador identifica o formato pelo conteúdo, não pela extensão — mas
se um dia for reexportar essa imagem, considerar salvar como `.png` de
verdade e ajustar o nome no CSS.

**Como trocar por uma versão mais nova, se precisar:**

1. Salve a nova imagem com **o mesmo nome**: `hero-card-background.jpg`.
2. Dimensão: qualquer uma funciona (`background-size: cover` recorta
   automaticamente), mas quanto mais próxima de uma proporção larga
   (a atual é 1333×686, ~1,9:1), menos recorte acontece.
3. Substitua o arquivo nesta pasta. Nenhuma outra edição é necessária.

Importante: o card tem um degradê azul por cima da imagem
(`.hero-card::after`, em `layout.css`) para garantir que o texto branco
continue legível em qualquer foto. Se a nova imagem for muito clara,
pode ser necessário escurecer um pouco esse degradê.

## `logo-realizacao.png`

Logo único combinado dos apoiadores/parceiros (Universidade Positivo,
Centro de Pesquisa Positivo, um brasão que não consegui identificar
com certeza, Araucária e ecohub), usado na seção "Realização"
(`index.html`, logo abaixo do Hero). A própria imagem já traz o texto
"Realização:" desenhado — por isso o HTML não tem mais um rótulo de
texto separado.

**Como trocar** (ex.: se entrar um novo parceiro, ou o brasão não
identificado precisar ser corrigido): edite/substitua o arquivo mantendo
o mesmo nome. Dimensão atual: 2560×305px (faixa larga e baixa); qualquer
proporção parecida funciona, já que a exibição usa `max-height: 48px` e
`height: auto` (`.realizacao-logos`, em `assets/css/layout.css`).

## `qrcode-inscricao.png`

QR Code de inscrição, exibido ao lado do botão "Faça sua inscrição" na
seção "Sobre" (`.vagas-box`). Já aponta para o formulário real. Se o
link de inscrição mudar, é só gerar um QR Code novo (qualquer gerador
online) e substituir este arquivo com o mesmo nome — dimensão
recomendada: quadrada, pelo menos 300×300px.

## Fotos dos palestrantes (`palestrantes.html`)

Cada card de palestrante hoje mostra um círculo com as iniciais do nome
(gerado só em CSS, sem arquivo de imagem) em vez de uma foto real —
decisão de propósito, pra não ter que inventar/gerar fotos de pessoas
reais e nomeadas.

**Como trocar por uma foto real, palestrante por palestrante:**

1. Salve a foto em `assets/img/`, com nome intuitivo, ex.:
   `palestrante-pedro-bicalho.jpg`. Dimensão sugerida: quadrada, pelo
   menos 300×300px (o card exibe em círculo de 72px, mas uma imagem
   maior evita perda de qualidade).
2. No `palestrantes.html`, troque o `<div class="speaker-card__photo" aria-hidden="true"><span>PB</span></div>`
   correspondente por:
   ```html
   <img
     src="assets/img/palestrante-pedro-bicalho.jpg"
     alt="Foto de Pedro Paulo Gastalho de Bicalho"
     class="speaker-card__photo"
     width="72"
     height="72"
   >
   ```
3. Em `assets/css/components.css`, na regra `.speaker-card__photo`, troque
   `background: linear-gradient(...)` por `object-fit: cover;` (pra foto
   preencher o círculo sem distorcer) — as demais propriedades (`width`,
   `height`, `border-radius`) continuam servindo.

Pode trocar um por um, sem precisar esperar ter todas as fotos.
