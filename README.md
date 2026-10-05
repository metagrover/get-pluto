# Pluto website

A standalone, framework-free marketing site for Pluto. It uses plain HTML, CSS, and JavaScript with self-hosted fonts and images. No build step, package install, backend, analytics, or runtime CDN is required.

## Preview

From this folder:

```sh
python3 -m http.server 4179 --bind 127.0.0.1
```

Open http://127.0.0.1:4179/.

## Project files

- `index.html` — homepage content and metadata.
- `getting-started.html` — single installation and setup destination, including Ollama, a first recording, the optional ChatGPT Work plugin, and troubleshooting.
- `site.css` — responsive layout, typography, and reduced-motion styles.
- `script.js` — copyable installer/model commands and a scroll-driven illustrative conversation on large screens. The complete example remains visible without JavaScript, on smaller screens, and with reduced motion.
- `assets/` — the Pluto logo, favicon, closing illustration, and self-hosted Inter and Lora fonts. Font licenses are included in `assets/fonts/`.
- `PRODUCT.md` and `DESIGN.md` — product and visual-direction context.

## GitHub Pages

This site needs no build step. In the repository's **Settings → Pages**, choose **Deploy from a branch**, then select `main` and `/(root)`. GitHub Pages will publish the files at `https://<owner>.github.io/<repository>/`. The `.nojekyll` file keeps GitHub Pages from running Jekyll on this plain HTML site.

The account configuring Pages needs admin or maintainer access to the repository. The published website is public even when the repository is private.

## Before publishing

- Verify anonymous installer access, release downloads, and the guide’s GitHub source links as part of deployment.
- Add the production domain's canonical URL and a social sharing image.
- Choose a license for the website code before publishing a public repository. The bundled fonts retain their own licenses.

The conversation and meeting examples are fictional and labeled illustrative. No pricing, testimonials, release date, or usage metrics are claimed.

The onboarding screenshot in `assets/pluto-onboarding.png` was captured from Pluto’s welcome screen using an isolated empty profile on October 4, 2026. It contains no meeting data.

The macOS sharing badge was removed from the screenshot. Only its small corner region was replaced; the original app pixels outside that region are preserved.
