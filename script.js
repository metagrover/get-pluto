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
      code.closest('pre').hidden = false;
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(code);
      selection?.removeAllRanges();
      selection?.addRange(range);
      status.textContent = 'Command selected. Copy it, then paste into Terminal.';
    }
  });
}
