// The complete example is the default, including without JavaScript or motion.
// On larger screens, scroll progress gently reveals each part of the same scene.
const ecosystem = document.querySelector('.ecosystem');
const ecosystemScroll = document.querySelector('.ecosystem-scroll');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const desktopStory = window.matchMedia('(min-width: 1100px) and (min-height: 760px)');
let storyFrame = 0;

function reveal(progress, start, end) {
  const amount = Math.min(1, Math.max(0, (progress - start) / (end - start)));
  return amount * amount * (3 - 2 * amount);
}

function updateStory() {
  storyFrame = 0;
  if (!ecosystem || !ecosystemScroll) return;
  if (reducedMotion.matches || !desktopStory.matches || window.location.hash === '#ask') {
    ecosystem.classList.remove('is-scroll-story');
    return;
  }
  ecosystem.classList.add('is-scroll-story');
  const bounds = ecosystemScroll.getBoundingClientRect();
  const leadIn = window.innerHeight * 0.35;
  const travel = bounds.height - window.innerHeight + leadIn;
  const progress = Math.min(1, Math.max(0, (leadIn - bounds.top) / travel));
  const beats = {
    '--question-reveal': reveal(progress, -0.14, 0.1),
    '--answer-reveal': reveal(progress, 0.18, 0.34),
    '--person-reveal': reveal(progress, 0.22, 0.38),
    '--project-reveal': reveal(progress, 0.34, 0.5),
    '--followup-reveal': reveal(progress, 0.48, 0.61),
    '--reply-reveal': reveal(progress, 0.64, 0.78),
    '--commitment-reveal': reveal(progress, 0.68, 0.83),
    '--sources-reveal': reveal(progress, 0.78, 0.9),
  };
  for (const [name, value] of Object.entries(beats)) {
    ecosystem.style.setProperty(name, value.toFixed(3));
  }
}
function scheduleStory() {
  if (!storyFrame) storyFrame = requestAnimationFrame(updateStory);
}
window.addEventListener('scroll', scheduleStory, { passive: true });
window.addEventListener('resize', scheduleStory);
window.addEventListener('hashchange', scheduleStory);
reducedMotion.addEventListener('change', scheduleStory);
desktopStory.addEventListener('change', scheduleStory);
updateStory();

// The poster and native controls work without JavaScript; playback is always opt-in.
const demo = document.querySelector('.product-film video');
const demoPlay = document.querySelector('.product-film-play');
const demoStatus = document.querySelector('.product-film-status');
if (demo && demoPlay && demoStatus) {
  demoPlay.hidden = false;
  demoPlay.addEventListener('click', async () => {
    demoPlay.disabled = true;
    demoStatus.hidden = true;
    try {
      if (demo.error) demo.load();
      await demo.play();
    } catch {
      demoStatus.textContent = 'The video could not play. Please refresh the page and try again.';
      demoStatus.hidden = false;
    } finally {
      demoPlay.disabled = false;
    }
  });
  demo.addEventListener('playing', () => { demoPlay.hidden = true; });
  demo.addEventListener('ended', () => { demoPlay.hidden = false; });
}

// Commands remain selectable without JavaScript or clipboard permission.
for (const button of document.querySelectorAll('[data-copy-command]')) {
  const code = document.getElementById(button.dataset.copyCommand);
  const status = button.closest('.install-command')?.querySelector('.copy-status');
  if (!code || !status) continue;
  button.hidden = false;
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(code.textContent.trim());
      button.textContent = 'Copied';
      status.textContent = 'Paste into Terminal, then press Return.';
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(code);
      selection?.removeAllRanges();
      selection?.addRange(range);
      status.textContent = 'Command selected. Copy it, then paste into Terminal.';
    }
  });
}

// Brief illustrative sequences play once in view; the finished diagram is the fallback.
const memoryGraphics = document.querySelectorAll('[data-memory-motion]');
function playMemoryGraphic(graphic) {
  if (reducedMotion.matches) return;
  // Restart only on an explicit replay; never queue animations.
  graphic.classList.remove('is-playing');
  void graphic.offsetWidth;
  graphic.classList.add('is-playing');
}
if ('IntersectionObserver' in window) {
  const memoryObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        playMemoryGraphic(entry.target);
        memoryObserver.unobserve(entry.target);
      }
    }
  }, { threshold: 0.4 });
  for (const graphic of memoryGraphics) {
    memoryObserver.observe(graphic);
    const replay = graphic.querySelector('.motion-replay');
    if (!replay) continue;
    replay.hidden = reducedMotion.matches;
    replay.addEventListener('click', () => playMemoryGraphic(graphic));
  }
}
reducedMotion.addEventListener('change', () => {
  for (const graphic of memoryGraphics) {
    graphic.classList.remove('is-playing');
    const replay = graphic.querySelector('.motion-replay');
    if (replay) replay.hidden = reducedMotion.matches;
  }
});

// Show the live GitHub star count; the button works without it.
(() => {
  const badges = document.querySelectorAll('[data-github-stars]');
  if (!badges.length) return;
  const show = (count) => {
    if (!Number.isFinite(count) || count < 1) return;
    const text = count >= 1000 ? `${(count / 1000).toFixed(count >= 10000 ? 0 : 1).replace(/\.0$/, '')}k` : String(count);
    for (const badge of badges) {
      badge.textContent = text;
      badge.hidden = false;
      badge.closest('a')?.setAttribute('aria-label', `Star Pluto on GitHub, ${count} stars`);
    }
  };
  try {
    const cached = JSON.parse(sessionStorage.getItem('pluto-stars') || 'null');
    if (cached && Date.now() - cached.at < 3600000) return show(cached.count);
  } catch {}
  fetch('https://api.github.com/repos/metagrover/pluto', { headers: { Accept: 'application/vnd.github+json' } })
    .then((response) => (response.ok ? response.json() : null))
    .then((repo) => {
      const count = repo?.stargazers_count;
      show(count);
      try { sessionStorage.setItem('pluto-stars', JSON.stringify({ count, at: Date.now() })); } catch {}
    })
    .catch(() => {});
})();
