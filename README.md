# Pluto website

A standalone, framework-free marketing site for Pluto. It uses plain HTML, CSS, and JavaScript with self-hosted fonts and images. No build step, package install, backend, analytics, or runtime CDN is required.

## Preview

From this folder:

```sh
python3 -m http.server 4179 --bind 127.0.0.1
```

Open http://127.0.0.1:4179/.

## Project files

- `index.html` — page content and metadata.
- `site.css` — responsive layout, typography, and reduced-motion styles.
- `script.js` — scroll-driven illustrative conversation on large screens. The complete example remains visible without JavaScript, on smaller screens, and with reduced motion.
- `assets/` — the Pluto logo, favicon, closing illustration, and self-hosted Inter and Lora fonts. Font licenses are included in `assets/fonts/`.
- `PRODUCT.md` and `DESIGN.md` — product and visual-direction context.

## Before publishing

- Replace the explicit “Mac download coming soon” placeholder with a real release link.
- Make `https://github.com/metagrover/pluto` public or replace the three GitHub links; the app repository is currently private, so visitors will see a 404.
- Add the production domain's canonical URL and a social sharing image.
- Choose a license for the website code before publishing a public repository. The bundled fonts retain their own licenses.

The conversation and meeting examples are fictional and labeled illustrative. No pricing, testimonials, release date, or usage metrics are claimed.
