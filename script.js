// ============================================
// BOOT SEQUENCE
// ============================================
(function initBoot() {
  const bootScreen = document.getElementById('boot-screen');
  const asciiEl = document.getElementById('boot-ascii');
  const terminalEl = document.getElementById('boot-terminal');
  const progressBar = document.getElementById('boot-progress-bar');
  const statusEl = document.getElementById('boot-status');

  const asciiArt = `
 ███████╗███╗   ███╗ █████╗ ██████╗ ████████╗
 ██╔════╝████╗ ████║██╔══██╗██╔══██╗╚══██╔══╝
 █████╗  ██╔████╔██║███████║██████╔╝   ██║
 ██╔══╝  ██║╚██╔╝██║██╔══██║██╔══██╗   ██║
 ███████╗██║ ╚═╝ ██║██║  ██║██║  ██║   ██║
 ╚══════╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝
        G O M E S  //  SECURITY`.trim();

  const bootLines = [
    { text: '[  OK  ] Started Network Manager.', delay: 100 },
    { text: '[  OK  ] Reached target Network.', delay: 200 },
    { text: '[  OK  ] Started GNOME Display Manager.', delay: 150 },
    { text: '[  OK  ] Started Session 1 of User enzo.', delay: 200 },
    { text: '[ INFO  ] Loading kernel modules...', delay: 300 },
    { text: '[  OK  ] Initialized security subsystem.', delay: 250 },
    { text: '[  OK  ] Loaded firewall rules (nftables).', delay: 200 },
    { text: '[  OK  ] Started OpenSSH Server.', delay: 150 },
    { text: '[  OK  ] Multi-user.target reached.', delay: 300 },
    { text: '[  OK  ] Portfolio system ready.', delay: 200 },
  ];

  // Type ASCII art
  let asciiIndex = 0;
  function typeAscii() {
    if (asciiIndex < asciiArt.length) {
      asciiEl.textContent += asciiArt[asciiIndex];
      asciiIndex++;
      setTimeout(typeAscii, 8);
    } else {
      startBootLines();
    }
  }

  // Boot lines
  let lineIndex = 0;
  function startBootLines() {
    if (lineIndex < bootLines.length) {
      const line = bootLines[lineIndex];
      const div = document.createElement('p');
      div.className = 'boot-line';
      div.innerHTML = line.text.replace('[  OK  ]', '<span class="ok">[  OK  ]</span>')
                               .replace('[ INFO  ]', '<span class="info">[ INFO  ]</span>');
      terminalEl.appendChild(div);
      lineIndex++;
      const progress = (lineIndex / bootLines.length) * 100;
      progressBar.style.width = progress + '%';
      setTimeout(startBootLines, line.delay);
    } else {
      statusEl.textContent = 'Sistema inicializado. Carregando portfólio...';
      setTimeout(() => {
        bootScreen.classList.add('hidden');
        document.body.style.overflow = 'auto';
      }, 600);
    }
  }

  document.body.style.overflow = 'hidden';
  setTimeout(typeAscii, 400);
})();

// ============================================
// CUSTOM CURSOR + TRAIL
// ============================================
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const trail = document.getElementById('cursor-trail');
  const trailCount = 8;
  const trailDots = [];

  // Create trail dots
  for (let i = 0; i < trailCount; i++) {
    const dot = document.createElement('div');
    dot.className = 'trail-dot';
    document.body.appendChild(dot);
    trailDots.push({ el: dot, x: 0, y: 0 });
  }

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let trailX = 0, trailY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Hover detection
  const hoverTargets = document.querySelectorAll('a, button, [data-tilt], .skill-tag, .nav-links a');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });

  function animate() {
    // Smooth cursor follow
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    // Trail follow
    trailX += (mouseX - trailX) * 0.08;
    trailY += (mouseY - trailY) * 0.08;
    trail.style.left = trailX + 'px';
    trail.style.top = trailY + 'px';

    // Trail dots
    let prevX = mouseX, prevY = mouseY;
    trailDots.forEach((dot, i) => {
      const speed = 0.3 - (i * 0.03);
      dot.x += (prevX - dot.x) * speed;
      dot.y += (prevY - dot.y) * speed;
      dot.el.style.left = dot.x + 'px';
      dot.el.style.top = dot.y + 'px';
      dot.el.style.opacity = 1 - (i / trailCount) * 0.8;
      dot.el.style.transform = `translate(-50%, -50%) scale(${1 - i * 0.1})`;
      prevX = dot.x;
      prevY = dot.y;
    });

    requestAnimationFrame(animate);
  }
  animate();
})();

// ============================================
// 3D CARD TILT
// ============================================
(function initTilt() {
  const cards = document.querySelectorAll('[data-tilt]');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / centerY * -6;
      const rotateY = (x - centerX) / centerX * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

      // Move glow
      const glow = card.querySelector('.cert-glow');
      if (glow) {
        glow.style.left = x + 'px';
        glow.style.top = y + 'px';
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.5s ease';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease';
    });
  });
})();

// ============================================
// MATRIX RAIN (Neon)
// ============================================
(function initMatrix() {
  const canvas = document.getElementById('matrix-canvas');
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFabcdef<>/{}[];:=';
  const fontSize = 14;
  let columns = Math.floor(canvas.width / fontSize);
  let drops = Array(columns).fill(1);

  window.addEventListener('resize', () => {
    columns = Math.floor(canvas.width / fontSize);
    drops = Array(columns).fill(1);
  });

  function draw() {
    ctx.fillStyle = 'rgba(5, 5, 5, 0.06)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      const brightness = Math.random();
      if (brightness > 0.7) {
        ctx.fillStyle = '#ff0040';
        ctx.shadowColor = '#ff0040';
        ctx.shadowBlur = 8;
      } else if (brightness > 0.4) {
        ctx.fillStyle = '#8B0000';
        ctx.shadowColor = '#8B0000';
        ctx.shadowBlur = 4;
      } else {
        ctx.fillStyle = '#330010';
        ctx.shadowBlur = 0;
      }

      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      ctx.shadowBlur = 0;

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(draw, 42);
})();

// ============================================
// PARTICLES (Neon)
// ============================================
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const particles = [];
  const count = 50;
  let mouse = { x: -1000, y: -1000 };

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 1.5 + 0.5,
    });
  }

  document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 0, 64, 0.4)';
      ctx.shadowColor = '#ff0040';
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Connect nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(255, 0, 64, ${0.12 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // Mouse connection
      if (mouse.x > 0) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(255, 0, 64, ${0.25 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }
  draw();
})();

// ============================================
// TYPEWRITER
// ============================================
(function initTypewriter() {
  const el = document.getElementById('typewriter');
  const roles = [
    'Analista de Segurança da Informação',
    'Red Team Specialist',
    'Pentester',
    'Offensive Security',
    'Vulnerability Researcher',
  ];
  let ri = 0, ci = 0, deleting = false, speed = 60;

  function type() {
    const current = roles[ri];
    if (deleting) {
      el.textContent = current.substring(0, ci - 1);
      ci--;
      speed = 25;
    } else {
      el.textContent = current.substring(0, ci + 1);
      ci++;
      speed = 55;
    }

    if (!deleting && ci === current.length) { speed = 2000; deleting = true; }
    else if (deleting && ci === 0) { deleting = false; ri = (ri + 1) % roles.length; speed = 250; }

    setTimeout(type, speed);
  }
  setTimeout(type, 1000);
})();

// ============================================
// SCROLL REVEAL
// ============================================
(function initReveal() {
  const els = document.querySelectorAll('.reveal');

  function check() {
    els.forEach((el, i) => {
      const top = el.getBoundingClientRect().top;
      if (top < window.innerHeight - 60) {
        setTimeout(() => el.classList.add('active'), i * 50);
      }
    });
  }

  window.addEventListener('scroll', check);
  check();
})();

// ============================================
// NAVBAR
// ============================================
(function initNav() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const navbar = document.getElementById('navbar');

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
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
})();

// ============================================
// TEXT SCRAMBLE ON HOVER (skill tags)
// ============================================
(function initScramble() {
  const chars = '!<>-_\\/[]{}—=+*^?#_abcdef0123456789';
  const tags = document.querySelectorAll('.skill-tag');

  tags.forEach(tag => {
    const original = tag.getAttribute('data-text') || tag.textContent;

    tag.addEventListener('mouseenter', () => {
      let iteration = 0;
      const interval = setInterval(() => {
        tag.textContent = original
          .split('')
          .map((char, i) => {
            if (i < iteration) return original[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');

        if (iteration >= original.length) clearInterval(interval);
        iteration += 1 / 2;
      }, 30);
    });
  });
})();
