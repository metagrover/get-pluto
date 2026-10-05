# Pluto website

A standalone, framework-free marketing site for Pluto. It uses plain HTML, CSS, and JavaScript with self-hosted fonts and images. No build step, package install, backend, analytics, or runtime CDN is required.

The homepage tells Pluto’s story through four connected benefits:

- **Voice ID:** confirm a speaker and let clear voice matches connect them to
  their name in future meetings, reducing repeated manual labeling.
- **People and Projects:** synthesis brings linked conversations, commitments,
  decisions, and recurring themes into dossiers you can return to.
- **Ask Pluto:** explore day-to-day questions and broader patterns across your
  meeting history and connected people and project context, with citations.
- **ChatGPT plugin:** bring synthesized meeting notes into ChatGPT Work without
  copying them into each chat. The connection reads notes; retrieved notes go
  to OpenAI, while raw transcripts and recordings are excluded.

The additions follow the existing ivory, ink, and blue palette, self-hosted
Lora and Inter type, and editorial layout. Voice ID and dossier synthesis use concise HTML/SVG
infographics with brief, one-time motion and replay controls. The Ask Pluto
conversation carries the question-and-answer story, and an illustrative ChatGPT Work conversation
types a Pluto question, then reveals a note-backed answer. Diagrams remain complete without JavaScript or
with reduced motion. Speaker labels remain reviewable,
and all conversation examples are illustrative.

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
- `script.js` — copyable installer/model commands, a scroll-driven illustrative conversation on large screens, and one-time infographic sequences with replay controls. The complete example remains visible without JavaScript, on smaller screens, and with reduced motion.
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
