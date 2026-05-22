// ─── Nav scroll ─────────────────────────────────────────────────────
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ─── Mobile menu ─────────────────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // ─── Waveform bars builder ───────────────────────────────────────────
  function buildWaveform(id, count, variant) {
    const el = document.getElementById(id);
    if (!el) return;
    const heights = [12,22,35,28,40,18,32,25,40,30,38,22,14,36,28,42,20,34,26,40,30,16,38,24,42,28,18,36,22,40,32,14,38,26,42,20,30,36,24,40];
    for (let i = 0; i < count; i++) {
      const bar = document.createElement('div');
      bar.className = 'wave-bar' + (variant === 'cyan' ? ' cyan' : variant === 'muted' ? ' muted' : '');
      const h = heights[i % heights.length];
      bar.style.cssText = `height:${h}px;animation-delay:${(i * 0.05).toFixed(2)}s;`;
      el.appendChild(bar);
    }
  }
  buildWaveform('waveform-main', 52, 'default');
  buildWaveform('waveform-dir',  52, 'muted');
  buildWaveform('waveform-eng',  52, 'cyan');

  // Feature waveforms (static decorative bars)
  function buildFeatWave(id, color) {
    const el = document.getElementById(id);
    if (!el) return;
    const vals = [40,70,55,80,45,65,90,50,75,40,85,60,70,50,80,45,65,55,75,90,40,70,60,85,50];
    vals.forEach((v, i) => {
      const bar = document.createElement('div');
      bar.className = 'fw-bar';
      bar.style.cssText = `height:${(v/100)*26}px;background:${color};opacity:${0.3 + (v/100)*0.7};animation:waveAnim ${(1.2 + i*0.04).toFixed(2)}s ease-in-out infinite;animation-delay:${(i*0.06).toFixed(2)}s;transform-origin:center;`;
      el.appendChild(bar);
    });
  }
  buildFeatWave('feat-wave-1', 'linear-gradient(to top,#7C3AED,#9F67F8)');
  buildFeatWave('feat-wave-2', 'linear-gradient(to top,#0891B2,#22D3EE)');
  buildFeatWave('feat-wave-3', 'linear-gradient(to top,#059669,#10B981)');

  // ─── Scroll reveal (Intersection Observer) ──────────────────────────
  const revealEls = document.querySelectorAll('.fade-up, .fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => observer.observe(el));

  // ─── FAQ accordion ──────────────────────────────────────────────────
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-q');
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ─── Pricing toggle ─────────────────────────────────────────────────
  const pricingToggle = document.getElementById('pricing-toggle');
  const pricingGrid   = document.getElementById('pricing-grid');
  pricingToggle.addEventListener('change', () => {
    pricingGrid.classList.toggle('annual-active', pricingToggle.checked);
  });

  // ─── Smooth anchor scrolling ─────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });
  });