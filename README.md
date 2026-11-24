# MLP Light Labs — web presentations

Static site, no build step. Netlify publishes this folder as it is.

```
index.html            Landing page: "Where are you?" → Perth / Sydney / Melbourne
perth/index.html      Perth Light Lab presentation
perth/img/            Photography, each at 1000px and 2000px wide (+ og.jpg link preview)
assets/css/main.css   All styles (MLP Light design system: Söhne, black/white, square corners)
assets/js/deck.js     Reveal animations, progress line, keyboard navigation
assets/fonts/         Söhne Buch, Söhne Dreiviertelfett, Söhne Mono Buch (licensed: check web licence covers this domain)
assets/brand/         Approved MLP logo, tagline and lockup SVGs, favicon
netlify.toml          Headers: noindex, caching
robots.txt            Blocks search engines
```

## Navigation
Scroll, swipe, arrow keys, Page Up/Down, Space, Home/End. On phones each slide restacks with the photo above the text.

## Adding Sydney or Melbourne
1. Copy `perth/` to `sydney/` (or `melbourne/`), swap the photos in `img/` and edit the text in `index.html`.
2. In the root `index.html`, change that city's `<div class="city-link soon" …>` to `<a class="city-link" href="sydney/">` and replace the "COMING SOON" label with the arrow, as Perth has it.

## Deploying
- Netlify → Add new site → Import from GitHub → this repo. Build command: none. Publish directory: `.`
- Domain: Netlify → Domain management → add `lightlab.mlplight.com`. MLP's DNS manager adds the CNAME record Netlify shows.
- Link previews (og:image) assume `https://lightlab.mlplight.com`. If the domain changes, update the `og:image` URLs in both `index.html` files.

## Privacy
Pages are `noindex` and blocked in robots.txt, so they won't appear in search. Anyone with the link can view them.
