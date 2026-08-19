// ============================================
// SCROLL REVEAL (IntersectionObserver)
// ============================================
(function initReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();

// ============================================
// TYPEWRITER
// ============================================
(function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const roles = [
    'Analista de Segurança da Informação',
    'Red Team Specialist',
    'Pentester',
    'Offensive Security',
    'Vulnerability Researcher',
  ];
  let ri = 0, ci = 0, deleting = false, speed = 55;

  function type() {
    const current = roles[ri];
    if (deleting) {
      el.textContent = current.substring(0, ci - 1);
      ci--;
      speed = 25;
    } else {
      el.textContent = current.substring(0, ci + 1);
      ci++;
      speed = 50;
    }

    if (!deleting && ci === current.length) { speed = 2200; deleting = true; }
    else if (deleting && ci === 0) { deleting = false; ri = (ri + 1) % roles.length; speed = 200; }

    setTimeout(type, speed);
  }
  setTimeout(type, 800);
})();

// ============================================
// NAVBAR
// ============================================
(function initNav() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.topbar-nav');
  const topbar = document.querySelector('.topbar');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  window.addEventListener('scroll', () => {
    topbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
})();

// ============================================
// 3D TILT (sutil)
// ============================================
(function initTilt() {
  const cards = document.querySelectorAll('[data-tilt]');
  if (!cards.length) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateX(${y * -3}deg) rotateY(${x * 3}deg)`;
      card.style.transition = 'transform 0.1s ease';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0)';
      card.style.transition = 'transform 0.4s cubic-bezier(.22, 1, .36, 1)';
    });
  });
})();
