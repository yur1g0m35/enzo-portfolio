// ============================================
// MATRIX RAIN
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

  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>/{}[]';
  const fontSize = 14;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(1);

  function draw() {
    ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#8B0000';
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(draw, 45);
})();

// ============================================
// PARTICLES
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
  const particleCount = 60;
  let mouse = { x: null, y: null };

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
    });
  }

  window.addEventListener('mousemove', (e) => {
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
      ctx.fillStyle = 'rgba(139, 0, 0, 0.5)';
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(139, 0, 0, ${0.15 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      if (mouse.x !== null) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(220, 20, 60, ${0.3 * (1 - dist / 150)})`;
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
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let speed = 60;

  function type() {
    const current = roles[roleIndex];

    if (isDeleting) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      speed = 30;
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      speed = 60;
    }

    if (!isDeleting && charIndex === current.length) {
      speed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 300;
    }

    setTimeout(type, speed);
  }

  setTimeout(type, 1200);
})();

// ============================================
// SCROLL REVEAL
// ============================================
(function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  function check() {
    reveals.forEach((el) => {
      const top = el.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (top < windowHeight - 80) {
        el.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', check);
  check();
})();

// ============================================
// NAVBAR HAMBURGER
// ============================================
(function initNav() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
})();

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
(function initNavScroll() {
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.borderBottomColor = 'rgba(139, 0, 0, 0.5)';
      navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
      navbar.style.borderBottomColor = 'rgba(139, 0, 0, 0.2)';
      navbar.style.background = 'rgba(10, 10, 10, 0.85)';
    }
  });
})();
