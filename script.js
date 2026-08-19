// ============================================
// 1. GRID / PARTÍCULAS INTERATIVO
// ============================================
(function initGrid() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, cols, rows;
  const spacing = 50;
  let mouse = { x: -1000, y: -1000 };
  let dots = [];

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    cols = Math.ceil(w / spacing) + 1;
    rows = Math.ceil(h / spacing) + 1;
    dots = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        dots.push({
          x: c * spacing,
          y: r * spacing,
          ox: c * spacing,
          oy: r * spacing,
        });
      }
    }
  }
  resize();
  window.addEventListener('resize', resize);

  document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function draw() {
    ctx.clearRect(0, 0, w, h);

    // Update dots near mouse
    for (const d of dots) {
      const dx = mouse.x - d.ox;
      const dy = mouse.y - d.oy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 120;
      if (dist < maxDist) {
        const force = (1 - dist / maxDist) * 8;
        d.x = d.ox + (dx / dist) * force;
        d.y = d.oy + (dy / dist) * force;
      } else {
        d.x += (d.ox - d.x) * 0.08;
        d.y += (d.oy - d.y) * 0.08;
      }
    }

    // Draw dots
    for (const d of dots) {
      const dx = mouse.x - d.x;
      const dy = mouse.y - d.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 150;
      const brightness = dist < maxDist ? 1 - dist / maxDist : 0;

      ctx.beginPath();
      ctx.arc(d.x, d.y, 1, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(139, 0, 0, ${0.3 + brightness * 0.7})`;
      ctx.fill();
    }

    // Draw connections near mouse
    for (let i = 0; i < dots.length; i++) {
      const d = dots[i];
      const dmx = mouse.x - d.x;
      const dmy = mouse.y - d.y;
      const dm = Math.sqrt(dmx * dmx + dmy * dmy);
      if (dm > 150) continue;

      // Check neighbors (grid-based, skip most)
      const col = i % cols;
      const row = Math.floor(i / cols);
      const neighbors = [
        [row, col + 1],
        [row + 1, col],
        [row + 1, col + 1],
      ];
      for (const [nr, nc] of neighbors) {
        if (nr >= rows || nc >= cols) continue;
        const j = nr * cols + nc;
        if (j >= dots.length) continue;
        const d2 = dots[j];
        const dx = d.x - d2.x;
        const dy = d.y - d2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < spacing * 1.8) {
          const lineOpacity = (1 - dm / 150) * 0.4;
          ctx.beginPath();
          ctx.moveTo(d.x, d.y);
          ctx.lineTo(d2.x, d2.y);
          ctx.strokeStyle = `rgba(139, 0, 0, ${lineOpacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }
  draw();
})();

// ============================================
// 2. DATA STREAM
// ============================================
(function initDataStream() {
  const container = document.getElementById('data-stream');
  if (!container) return;

  const streams = [
    '192.168.1.', '10.0.0.', '172.16.', '0xDEAD', '0xBEEF',
    'nmap -sV', 'msfconsole', 'sqlmap --dbs', 'nikto -h',
    'HASH:', 'SHA256:', 'CVE-2024-', 'CVSS:9.8',
    'root@kali', '/bin/sh', 'chmod 777', 'iptables -L',
    'SELECT *', 'UNION SELECT', 'DROP TABLE', '-->',
    'ffuf -w', 'gobuster dir', 'hydra -l', 'john --wordlist',
    'burpsuite', 'mitmproxy', 'responder', 'impacket',
    ' bloodhound', 'ldapsearch', 'psexec.py', 'wmiexec.py',
    'FLAG{', 'CTF{', 'pwned', 'ROOT',
    '4A:6B:3C:', 'MAC:', 'TTL:64', 'SYN→ACK',
  ];

  function createLine() {
    const el = document.createElement('div');
    el.className = 'stream-line';
    el.style.left = Math.random() * 100 + '%';
    el.style.animationDuration = (18 + Math.random() * 22) + 's';
    el.style.animationDelay = Math.random() * 8 + 's';

    // Build random data string
    const parts = [];
    const count = 3 + Math.floor(Math.random() * 4);
    for (let i = 0; i < count; i++) {
      parts.push(streams[Math.floor(Math.random() * streams.length)]);
    }
    el.textContent = parts.join('  ');
    container.appendChild(el);
  }

  // Create initial lines
  for (let i = 0; i < 14; i++) createLine();

  // Slowly add more
  setInterval(() => {
    if (container.children.length < 20) createLine();
  }, 6000);
})();

// ============================================
// 3. HERO TYPING (terminal commands)
// ============================================
(function initHeroTyping() {
  const el = document.getElementById('hero-terminal') ||
             (() => {
               // Create terminal element if not in HTML
               const heroFrame = document.querySelector('.hero-frame');
               if (!heroFrame) return null;
               const div = document.createElement('div');
               div.className = 'hero-terminal';
               div.id = 'hero-terminal';
               heroFrame.parentNode.insertBefore(div, heroFrame);
               return div;
             })();
  if (!el) return;

  const lines = [
    { type: 'cmd', text: '> whoami', delay: 400 },
    { type: 'output', text: 'enzo', delay: 300 },
    { type: 'cmd', text: '> cat /etc/motd', delay: 500 },
    { type: 'output', text: 'Security Analyst // Red Team // Offensive Security', delay: 600 },
  ];

  let lineIdx = 0;

  function typeLine() {
    if (lineIdx >= lines.length) return;
    const line = lines[lineIdx];

    if (line.type === 'cmd') {
      const span = document.createElement('p');
      span.innerHTML = `<span class="t-prompt">$ </span><span class="t-cmd"></span>`;
      el.appendChild(span);
      const cmdEl = span.querySelector('.t-cmd');
      let ci = 0;
      function typeChar() {
        if (ci < line.text.length) {
          cmdEl.textContent += line.text[ci];
          ci++;
          setTimeout(typeChar, 40 + Math.random() * 30);
        } else {
          lineIdx++;
          setTimeout(typeLine, line.delay);
        }
      }
      setTimeout(typeChar, 300);
    } else {
      const span = document.createElement('p');
      span.className = 't-output';
      span.textContent = line.text;
      el.appendChild(span);
      lineIdx++;
      setTimeout(typeLine, line.delay);
    }
  }

  setTimeout(typeLine, 500);
})();

// ============================================
// 4. SCROLL REVEAL + STAGGER
// ============================================
(function initReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
    return;
  }

  const revealEls = document.querySelectorAll('.reveal');

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  revealEls.forEach(el => io.observe(el));

  // Staggered cards inside grids
  function setupStagger(containerSel, childSel) {
    document.querySelectorAll(containerSel).forEach(container => {
      const children = container.querySelectorAll(childSel);
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            children.forEach((child, i) => {
              child.style.transitionDelay = (i * 80) + 'ms';
              child.classList.add('stagger-in');
            });
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0.1 });
      obs.observe(container);
    });
  }

  setupStagger('.card-grid-4', '.card');
  setupStagger('.card-grid-3', '.card');
  setupStagger('.contact-row', '.contact-item');
})();

// ============================================
// 5. PARALLAX LEVE
// ============================================
(function initParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const sections = document.querySelectorAll('section');
  let ticking = false;

  function update() {
    const scrollY = window.scrollY;
    sections.forEach((sec, i) => {
      const rect = sec.getBoundingClientRect();
      const visible = rect.top < window.innerHeight && rect.bottom > 0;
      if (visible) {
        const offset = (rect.top - window.innerHeight / 2) * 0.025;
        sec.style.transform = `translateY(${offset}px)`;
      }
    });
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
})();

// ============================================
// 6. TEXT SCRAMBLE (skill pills)
// ============================================
(function initScramble() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const chars = '!<>-_\\/[]{}—=+*^?#_abcdef0123456789';
  const pills = document.querySelectorAll('.skill-pill');

  pills.forEach(pill => {
    const original = pill.textContent;

    pill.addEventListener('mouseenter', () => {
      let iteration = 0;
      const interval = setInterval(() => {
        pill.textContent = original
          .split('')
          .map((ch, i) => {
            if (i < iteration) return original[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');
        if (iteration >= original.length) clearInterval(interval);
        iteration += 1 / 2;
      }, 28);
    });

    pill.addEventListener('mouseleave', () => {
      pill.textContent = original;
    });
  });
})();

// ============================================
// 7. TYPEWRITER (hero role)
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
  setTimeout(type, 2800); // start after hero typing animation
})();

// ============================================
// 8. NAVBAR
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
// 9. 3D TILT (sutil)
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
