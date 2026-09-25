document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('[data-header]');
  const navToggle = document.querySelector('[data-nav-toggle]');
  const mobileNav = document.querySelector('[data-mobile-nav]');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Header scroll stuck state
  const setHeader = () => header?.classList.toggle('is-stuck', window.scrollY > 18);
  setHeader();
  window.addEventListener('scroll', setHeader, { passive: true });

  // Mobile navigation
  navToggle?.addEventListener('click', () => {
    const open = navToggle.getAttribute('aria-expanded') !== 'true';
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    if (mobileNav) mobileNav.hidden = !open;
  });

  mobileNav?.addEventListener('click', event => {
    if (!event.target.closest('a')) return;
    navToggle?.setAttribute('aria-expanded', 'false');
    navToggle?.setAttribute('aria-label', 'Open navigation');
    if (mobileNav) mobileNav.hidden = true;
  });

  // Reveal animations
  const reveals = document.querySelectorAll('[data-reveal]');
  if (reducedMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -36px' });
    reveals.forEach(el => observer.observe(el));
  }

  // Download Toast
  const toast = document.querySelector('[data-toast]');
  let toastTimer;
  document.querySelectorAll('[data-download]').forEach(control => {
    control.addEventListener('click', event => {
      event.preventDefault();
      if (!toast) return;
      toast.hidden = false;
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => { toast.hidden = true; }, 5000);
    });
  });

  document.querySelector('[data-toast-close]')?.addEventListener('click', () => {
    if (toast) toast.hidden = true;
    clearTimeout(toastTimer);
  });

  // Dynamic Copyright year
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Subtle audio tap (Apple UI micro-sound feedback)
  let audioCtx = null;
  const playMicroClick = () => {
    if (reducedMotion) return;
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1100, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.035);
      gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.035);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.04);
    } catch (_) {}
  };

  // ==========================================================================
  // 1. Motion Graphics: Interactive Ambient Knowledge Graph Canvas
  // ==========================================================================
  const canvas = document.getElementById('hero-ambient-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = 0, height = 0, dpr = 1;
    let animId = null;
    let mouse = { x: -1000, y: -1000, active: false };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', resize, { passive: true });
    resize();

    // Generate constellation nodes
    const nodeCount = Math.max(14, Math.min(26, Math.floor(width / 50)));
    const nodes = [];
    const colors = [
      'rgba(197, 155, 99,', // Champagne Gold
      'rgba(26, 35, 64,',   // Midnight Blue
      'rgba(140, 94, 30,'   // Deep Amber Gold
    ];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.8 + 1.8,
        colorPrefix: colors[Math.floor(Math.random() * colors.length)],
        baseAlpha: Math.random() * 0.4 + 0.35,
        pulseOffset: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.015
      });
    }

    // Mouse tracking for interactive knowledge thread connections
    const heroEl = document.getElementById('top');
    heroEl?.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    }, { passive: true });

    heroEl?.addEventListener('mouseleave', () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    });

    const render = (time) => {
      if (document.hidden) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        if (!reducedMotion) {
          n.x += n.vx;
          n.y += n.vy;

          // Bounce off bounds with soft padding
          if (n.x < 10) { n.x = 10; n.vx *= -1; }
          else if (n.x > width - 10) { n.x = width - 10; n.vx *= -1; }
          if (n.y < 10) { n.y = 10; n.vy *= -1; }
          else if (n.y > height - 10) { n.y = height - 10; n.vy *= -1; }

          // Interactive subtle magnetic pull toward mouse
          if (mouse.active) {
            const dx = mouse.x - n.x;
            const dy = mouse.y - n.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 180 && dist > 5) {
              const force = (180 - dist) / 180 * 0.015;
              n.x += dx * force;
              n.y += dy * force;
            }
          }
        }

        // Draw connections between nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dist = Math.hypot(n.x - n2.x, n.y - n2.y);
          if (dist < 130) {
            const lineAlpha = (1 - dist / 130) * 0.22;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(197, 155, 99, ${lineAlpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }

        // Draw connection to mouse cursor
        if (mouse.active) {
          const mDist = Math.hypot(n.x - mouse.x, n.y - mouse.y);
          if (mDist < 160) {
            const mAlpha = (1 - mDist / 160) * 0.42;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(197, 155, 99, ${mAlpha})`;
            ctx.lineWidth = 1.1;
            ctx.stroke();
          }
        }

        // Draw node
        const pulse = Math.sin(time * 0.002 + n.pulseOffset) * 0.15;
        const currentAlpha = Math.min(1, Math.max(0.1, n.baseAlpha + pulse));

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${n.colorPrefix} ${currentAlpha})`;
        ctx.fill();

        // Subtle outer glow ring on golden nodes
        if (n.radius > 2.5) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius + 3, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(197, 155, 99, ${currentAlpha * 0.35})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      if (!reducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    if (reducedMotion) {
      render(0);
    } else {
      animId = requestAnimationFrame(render);
    }
  }

  // ==========================================================================
  // 2. Motion Graphics: Command Bar Live Typewriter & Dynamic Hero Memory Card
  // ==========================================================================
  const typewriter = document.querySelector('[data-typewriter]');
  const heroMeeting = document.querySelector('[data-hero-result-meeting]');
  const heroSpeaker = document.querySelector('[data-hero-result-speaker]');
  const heroTime = document.querySelector('[data-hero-result-time]');
  const heroText = document.querySelector('[data-hero-result-text]');
  const heroAction = document.querySelector('[data-hero-result-action]');

  if (typewriter && !reducedMotion) {
    const questions = [
      '“What did Alex commit to in Tuesday’s sync?”',
      '“Summarize decisions on the Q4 roadmap”',
      '“What are Sarah’s top priorities right now?”',
      '“What open promises did I make to the team?”'
    ];

    let qIdx = 0, charIdx = 0, isDeleting = false;
    const typeSpeed = () => isDeleting ? 28 : 60;

    const tickTypewriter = () => {
      const current = questions[qIdx];
      if (isDeleting) {
        typewriter.textContent = current.substring(0, charIdx--);
        if (charIdx < 0) {
          isDeleting = false;
          qIdx = (qIdx + 1) % questions.length;
          setTimeout(tickTypewriter, 450);
          return;
        }
      } else {
        typewriter.textContent = current.substring(0, charIdx++);
        if (charIdx > current.length) {
          isDeleting = true;
          setTimeout(tickTypewriter, 3200);
          return;
        }
      }
      setTimeout(tickTypewriter, typeSpeed());
    };
    setTimeout(tickTypewriter, 1200);
  }

  // ==========================================================================
  // 3. Interactive 3-Stage Meeting Lifecycle Console
  // ==========================================================================
  const consoleEl = document.querySelector('[data-workflow-console]');
  if (consoleEl) {
    const tabs = consoleEl.querySelectorAll('[data-stage]');
    const views = consoleEl.querySelectorAll('[data-view]');

    const selectStage = (stageName) => {
      tabs.forEach(tab => {
        const isMatch = tab.dataset.stage === stageName;
        tab.classList.toggle('is-active', isMatch);
        tab.setAttribute('aria-selected', String(isMatch));
      });

      views.forEach(view => {
        const isMatch = view.dataset.view === stageName;
        view.classList.toggle('is-active', isMatch);
        view.hidden = !isMatch;
      });
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        playMicroClick();
        selectStage(tab.dataset.stage);
      });

      tab.addEventListener('keydown', (e) => {
        let targetIndex = -1;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          targetIndex = (index + 1) % tabs.length;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          targetIndex = (index - 1 + tabs.length) % tabs.length;
        } else if (e.key === 'Home') {
          targetIndex = 0;
        } else if (e.key === 'End') {
          targetIndex = tabs.length - 1;
        }

        if (targetIndex !== -1) {
          e.preventDefault();
          tabs[targetIndex].focus();
          tabs[targetIndex].click();
        }
      });
    });
  }

  // ==========================================================================
  // 4. Interactive Spotlight Command Palette (⌘K)
  // ==========================================================================
  const spotlight = document.querySelector('[data-spotlight-modal]');
  const spotlightInput = document.querySelector('[data-spotlight-input]');
  const spotlightAnswer = document.querySelector('[data-spotlight-answer]');
  const answerSource = document.querySelector('[data-answer-source]');
  const answerText = document.querySelector('[data-answer-text]');
  const answerQuote = document.querySelector('[data-answer-quote]');
  const spotlightItems = document.querySelectorAll('.spotlight-item');

  const spotlightData = [
    {
      source: 'Infrastructure Migration · Tuesday 10:42 AM',
      answer: 'Alex committed to delivering the staging build by Friday at 4 PM and signing off on local encryption.',
      quote: '“I’ll have the staging build ready for the team by Friday at 4 PM.”'
    },
    {
      source: 'Live Document · Project Space: Q4 Roadmap',
      answer: 'Consensus reached on SQLite local storage as the default engine. Cloud models via OpenRouter remain strictly opt-in.',
      quote: '“Let’s lock in SQLite for default local storage. Audio and transcripts never leave the device.”'
    },
    {
      source: 'Pre-Meeting Intelligence · Executive Brief',
      answer: 'Sarah focuses on schema evolution and auth protocols. 1 open action item: finalize security checklist before Thursday sync.',
      quote: '“Derived from 3 conversations this week.”'
    }
  ];

  let selectedQueryIdx = 0;

  const selectQuery = (idx) => {
    selectedQueryIdx = idx;
    spotlightItems.forEach((item, i) => {
      const isSel = i === idx;
      item.classList.toggle('is-selected', isSel);
      item.setAttribute('aria-selected', String(isSel));
    });

    const res = spotlightData[idx];
    if (res && spotlightAnswer) {
      if (answerSource) answerSource.textContent = res.source;
      if (answerText) answerText.textContent = res.answer;
      if (answerQuote) answerQuote.textContent = res.quote;
      spotlightAnswer.hidden = false;
    }
  };

  const openSpotlight = () => {
    playMicroClick();
    if (spotlight) {
      spotlight.hidden = false;
      selectQuery(0);
      setTimeout(() => spotlightInput?.focus(), 60);
    }
  };

  const closeSpotlight = () => {
    playMicroClick();
    if (spotlight) {
      spotlight.hidden = true;
      if (spotlightInput) spotlightInput.value = '';
    }
  };

  // Keyboard shortcut ⌘K / Ctrl+K & Esc
  window.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (spotlight && !spotlight.hidden) closeSpotlight();
      else openSpotlight();
    }
    if (e.key === 'Escape' && spotlight && !spotlight.hidden) {
      closeSpotlight();
    }
  });

  // Spotlight keyboard navigation (Arrow Up / Down)
  spotlight?.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIdx = (selectedQueryIdx + 1) % spotlightItems.length;
      selectQuery(nextIdx);
      spotlightItems[nextIdx]?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIdx = (selectedQueryIdx - 1 + spotlightItems.length) % spotlightItems.length;
      selectQuery(prevIdx);
      spotlightItems[prevIdx]?.scrollIntoView({ block: 'nearest' });
    }
  });

  // Triggers
  document.querySelectorAll('[data-spotlight-trigger]').forEach(btn => {
    btn.addEventListener('click', openSpotlight);
    btn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openSpotlight();
      }
    });
  });

  // Close triggers
  document.querySelectorAll('[data-spotlight-close]').forEach(btn => {
    btn.addEventListener('click', closeSpotlight);
  });

  // Query item click selection
  spotlightItems.forEach((item, idx) => {
    item.addEventListener('click', () => {
      playMicroClick();
      selectQuery(idx);
    });
  });

  // Free typing in spotlight
  spotlightInput?.addEventListener('input', () => {
    const val = spotlightInput.value.trim();
    if (val.length > 2) {
      if (spotlightAnswer) {
        if (answerSource) answerSource.textContent = 'Grounded across 4 meetings on your Mac';
        if (answerText) answerText.textContent = `Found 2 relevant citations for “${val}”. All evidence verified on-device.`;
        if (answerQuote) answerQuote.textContent = `“Local evidence matched in Product Sync and Architecture Review.”`;
        spotlightAnswer.hidden = false;
      }
    }
  });
});
