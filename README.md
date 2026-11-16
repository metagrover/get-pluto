# Pluto website

A standalone, framework-free marketing site for Pluto. It uses plain HTML, CSS, and JavaScript with self-hosted fonts, images, and video. No build step, package install, backend, analytics, or runtime CDN is required.

The homepage leads with **“Intelligent meeting notes for Mac.”** Its explanation
is concrete: Pluto takes the notes, tracks who promised what, and reminds you
to follow through. The page then explains four practical benefits:

- **Voice ID:** confirm a speaker and let clear voice matches connect them to
  their name in future meetings, reducing repeated manual labeling.
- **People and Projects:** related conversations, commitments, and
  decisions stay together so you can pick up where you left off.
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
- `getting-started.html` — single installation and setup destination, including Ollama, ChatGPT sign-in, OpenRouter, a first recording, the separate optional ChatGPT Work plugin, and troubleshooting.
- `site.css` — responsive layout, typography, and reduced-motion styles.
- `script.js` — copyable installer/model commands, a scroll-driven illustrative conversation on large screens, and one-time infographic sequences with replay controls. The complete example remains visible without JavaScript, on smaller screens, and with reduced motion.
- `assets/` — the Pluto logo, favicon, closing illustration, and self-hosted Inter and Lora fonts. Font licenses are included in `assets/fonts/`.
- `PRODUCT.md` and `DESIGN.md` — product and visual-direction context.

## GitHub Pages

This site needs no build step. In the repository's **Settings → Pages**, choose **Deploy from a branch**, then select `main` and `/(root)`. GitHub Pages will publish the files at `https://<owner>.github.io/<repository>/`. The `.nojekyll` file keeps GitHub Pages from running Jekyll on this plain HTML site.

The account configuring Pages needs admin or maintainer access to the repository. The published website is public even when the repository is private.

## Product demo

The homepage’s `#in-action` section contains the approved 30.5-second Pluto demo.
The hero’s “Watch the demo” link opens this section. The demo shows the Notes
editor, Tasks, meeting notes, and Ask Pluto with a cited transcript passage,
using fictional launch data and a scripted answer.

- `assets/product/pluto-demo.mp4` — 1920 × 1080 H.264/AAC video with the approved
  ElevenLabs Kyle narration.
- `assets/product/pluto-demo-poster.jpg` — a frame from the approved video.
- `assets/product/pluto-demo.en.vtt` — English captions matching the narration.

The native player supports playback, seeking, captions, volume, and fullscreen.
The poster loads with the page. Visitors choose when to load and play the video.
The same assets live in Pluto’s `docs/media/`. Keep the copies in sync when
replacing the demo.

To verify an update, check desktop and narrow mobile layouts, play and seek the
video, enable English captions, and confirm the video and caption URLs resolve.
Keep private meeting data out of all public media.

## Search and sharing metadata

Both pages declare canonical URLs under `https://metagrover.github.io/get-pluto/`,
with page-specific Open Graph and Twitter/X large-image card metadata. They use
`assets/product/dashboard.jpg` (1920 × 1152 JPEG), showing Pluto’s actual interface
with fictional demo data. Image URLs are absolute so sharing crawlers can resolve them.

If the publishing URL changes, update each page’s canonical link, `og:url`,
`og:image`, and `twitter:image` together. No custom domain is configured.

## Before publishing

- Verify anonymous installer access, release downloads, and the guide’s GitHub source links as part of deployment.
- Verify canonical and social-preview URLs if the deployment domain changes.
  Both pages currently use https://metagrover.github.io/get-pluto/ and the
  fictional dashboard image in assets/product/dashboard.jpg.
- Choose a license for the website code before publishing a public repository. The bundled fonts retain their own licenses.

The conversation and meeting examples are fictional and labeled illustrative. No pricing, testimonials, release date, or usage metrics are claimed.

The onboarding screenshot in `assets/pluto-onboarding.png` was captured from Pluto’s welcome screen using an isolated empty profile on October 4, 2026. It contains no meeting data.

The macOS sharing badge was removed from the screenshot. Only its small corner region was replaced; the original app pixels outside that region are preserved.
