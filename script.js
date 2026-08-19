// ============================================
// SCROLL REVEAL
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
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();

// ============================================
// ACTIVE NAVIGATION
// ============================================
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.getAttribute('id');
        navLinks.forEach(link => {
          link.removeAttribute('aria-current');
          if (link.getAttribute('href') === '#' + id) {
            link.setAttribute('aria-current', 'page');
          }
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-56px 0px -60% 0px' });

  sections.forEach(sec => io.observe(sec));
})();

// ============================================
// TYPEWRITER
// ============================================
(function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const roles = [
    'Analista de Segurança',
    'Red Team',
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
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelector('.nav-links');
  const nav = document.querySelector('.nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav a');

  hamburger.addEventListener('click', () => {
    const isActive = hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isActive);
    mobileMenu.setAttribute('aria-hidden', !isActive);
    document.body.style.overflow = isActive ? 'hidden' : '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  });

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        nav.classList.toggle('scrolled', window.scrollY > 40);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

// ============================================
// BACK TO TOP
// ============================================
(function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (!btn) return;

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        btn.classList.toggle('visible', window.scrollY > 500);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

// ============================================
// BACKGROUND SYSTEM
// ============================================
(function initBackground() {
  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let w, h;
  let nodes = [];
  let connections = [];
  let pulses = [];
  let dataPoints = [];
  let mouseTarget = { x: -1000, y: -1000 };
  let mouseSmooth = { x: -1000, y: -1000 };
  const spotlight = document.querySelector('.bg-spotlight');

  // --- Configuration ---
  const isMobile = window.innerWidth < 768;
  const CONFIG = {
    nodeCount: isMobile ? 8 : 18,
    nodeMaxDist: isMobile ? 160 : 220,
    nodeDrift: 0.12,
    mouseSmoothing: 0.05,
    mouseSpotlightRadius: isMobile ? 0 : 600,
    pulseMaxConcurrent: 1,
    pulseInterval: isMobile ? 0 : 4500,
    dataPointMax: isMobile ? 0 : 5,
    dataPointInterval: isMobile ? 0 : 3500,
  };

  // --- Deterministic seed for consistent positions ---
  function seededRandom(seed) {
    let x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }

  // --- Generate Nodes ---
  function generateNodes() {
    const arr = [];
    const cols = Math.ceil(Math.sqrt(CONFIG.nodeCount * (w / h)));
    const rows = Math.ceil(CONFIG.nodeCount / cols);
    const cellW = w / cols;
    const cellH = h / rows;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (arr.length >= CONFIG.nodeCount) break;
        const seed = arr.length * 7 + 42;
        const jx = (seededRandom(seed + 3) - 0.5) * cellW * 0.5;
        const jy = (seededRandom(seed + 7) - 0.5) * cellH * 0.5;
        arr.push({
          x: c * cellW + cellW / 2 + jx,
          y: r * cellH + cellH / 2 + jy,
          ox: 0,
          oy: 0,
          vx: (seededRandom(seed + 1) - 0.5) * CONFIG.nodeDrift,
          vy: (seededRandom(seed + 2) - 0.5) * CONFIG.nodeDrift,
          radius: 1.2 + seededRandom(seed + 4) * 0.6,
        });
        arr[arr.length - 1].ox = arr[arr.length - 1].x;
        arr[arr.length - 1].oy = arr[arr.length - 1].y;
      }
    }
    return arr;
  }

  // --- Compute Connections ---
  function computeConnections() {
    const conns = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONFIG.nodeMaxDist) {
          conns.push({ from: nodes[i], to: nodes[j], dist });
        }
      }
    }
    return conns;
  }

  // --- Spawn Pulse ---
  function spawnPulse() {
    if (CONFIG.pulseMaxConcurrent <= 0) return;
    if (pulses.length >= CONFIG.pulseMaxConcurrent) return;
    if (connections.length === 0) return;
    const conn = connections[Math.floor(Math.random() * connections.length)];
    // Randomly choose direction
    const flip = Math.random() > 0.5;
    pulses.push({
      from: flip ? conn.from : conn.to,
      to: flip ? conn.to : conn.from,
      progress: 0,
      speed: 0.006 + Math.random() * 0.004,
    });
  }

  // --- Spawn Data Point ---
  function spawnDataPoint() {
    if (CONFIG.dataPointMax <= 0) return;
    if (dataPoints.length >= CONFIG.dataPointMax) return;
    dataPoints.push({
      x: seededRandom(Date.now()) * w,
      y: seededRandom(Date.now() + 1) * h,
      life: 0,
      maxLife: 180 + Math.random() * 250,
    });
  }

  // --- Mouse Tracking ---
  document.addEventListener('mousemove', (e) => {
    mouseTarget.x = e.clientX;
    mouseTarget.y = e.clientY;
    if (spotlight) spotlight.classList.add('active');
  }, { passive: true });

  // --- Resize ---
  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    nodes = generateNodes();
    connections = computeConnections();
  }

  // --- Draw Loop ---
  function draw() {
    ctx.clearRect(0, 0, w, h);

    // Smooth mouse interpolation
    mouseSmooth.x += (mouseTarget.x - mouseSmooth.x) * CONFIG.mouseSmoothing;
    mouseSmooth.y += (mouseTarget.y - mouseSmooth.y) * CONFIG.mouseSmoothing;

    // Update CSS custom properties for spotlight
    if (spotlight && !isMobile) {
      document.documentElement.style.setProperty('--mouse-x', mouseSmooth.x + 'px');
      document.documentElement.style.setProperty('--mouse-y', mouseSmooth.y + 'px');
    }

    // Drift nodes
    for (const node of nodes) {
      node.x += node.vx;
      node.y += node.vy;
      if (node.x < -30 || node.x > w + 30) node.vx *= -1;
      if (node.y < -30 || node.y > h + 30) node.vy *= -1;
    }

    // Recompute connections periodically (every ~60 frames)
    if (Math.random() < 0.016) {
      connections = computeConnections();
    }

    // Draw connections
    for (const conn of connections) {
      const alpha = (1 - conn.dist / CONFIG.nodeMaxDist) * 0.05;
      ctx.beginPath();
      ctx.moveTo(conn.from.x, conn.from.y);
      ctx.lineTo(conn.to.x, conn.to.y);
      ctx.strokeStyle = `rgba(139, 0, 0, ${alpha})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    // Draw nodes
    for (const node of nodes) {
      const dx = mouseSmooth.x - node.x;
      const dy = mouseSmooth.y - node.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const proximity = dist < 200 ? (1 - dist / 200) * 0.12 : 0;

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(139, 0, 0, ${0.1 + proximity})`;
      ctx.fill();
    }

    // Draw pulses
    for (let i = pulses.length - 1; i >= 0; i--) {
      const pulse = pulses[i];
      pulse.progress += pulse.speed;
      if (pulse.progress >= 1) {
        pulses.splice(i, 1);
        continue;
      }
      const x = pulse.from.x + (pulse.to.x - pulse.from.x) * pulse.progress;
      const y = pulse.from.y + (pulse.to.y - pulse.from.y) * pulse.progress;
      const alpha = Math.sin(pulse.progress * Math.PI) * 0.35;

      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(139, 0, 0, ${alpha})`;
      ctx.fill();

      // Small glow
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(139, 0, 0, ${alpha * 0.15})`;
      ctx.fill();
    }

    // Draw data points
    for (let i = dataPoints.length - 1; i >= 0; i--) {
      const dp = dataPoints[i];
      dp.life++;
      const lifeRatio = dp.life / dp.maxLife;
      const alpha = Math.sin(lifeRatio * Math.PI) * 0.2;

      if (dp.life >= dp.maxLife) {
        dataPoints.splice(i, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(dp.x, dp.y, 1, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(139, 0, 0, ${alpha})`;
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  // --- Initialize ---
  resize();
  draw();

  // Event listeners
  window.addEventListener('resize', () => {
    resize();
    connections = computeConnections();
  }, { passive: true });

  // Periodic spawns
  if (CONFIG.pulseInterval > 0) {
    setInterval(spawnPulse, CONFIG.pulseInterval);
  }
  if (CONFIG.dataPointInterval > 0) {
    setInterval(spawnDataPoint, CONFIG.dataPointInterval);
  }
})();
