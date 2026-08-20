import { useRef, useEffect, useState, useCallback } from 'react';
import { content } from '../../data/content';
import { GlitchText } from '../motion/GlitchText';
import { MagneticButton } from '../ui/MagneticButton';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useMousePosition } from '../../hooks/useMousePosition';

// Hex characters for decode effect
const HEX = '0123456789ABCDEF';

function NameDecode({ text, onComplete }: { text: string; onComplete?: () => void }) {
  const [display, setDisplay] = useState('');
  const [phase, setPhase] = useState<'decode' | 'stabilize'>('decode');
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setDisplay(text);
      onComplete?.();
      return;
    }

    let frame = 0;
    const totalFrames = 40;
    const letters = text.split('');

    const animate = () => {
      frame++;
      const progress = Math.min(frame / totalFrames, 1);

      const result = letters.map((ch, i) => {
        if (ch === ' ') return ' ';
        const charProgress = Math.max(0, (progress * letters.length - i) / 3);
        if (charProgress >= 1) return ch;
        if (charProgress > 0.5) return ch;
        return HEX[Math.floor(Math.random() * HEX.length)];
      }).join('');

      setDisplay(result);

      if (frame < totalFrames) {
        requestAnimationFrame(animate);
      } else {
        setDisplay(text);
        setPhase('stabilize');
        onComplete?.();
      }
    };

    const timer = setTimeout(() => requestAnimationFrame(animate), 300);
    return () => clearTimeout(timer);
  }, [text, reduced, onComplete]);

  return (
    <span className="inline-block">
      {display.split('').map((ch, i) => (
        <span
          key={i}
          className="inline-block transition-colors duration-300"
          style={{ color: phase === 'decode' && ch !== ' ' && HEX.includes(ch) ? 'var(--color-accent)' : undefined }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </span>
  );
}

// Particle field background
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useMousePosition();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    let raf: number;

    const isMobile = window.innerWidth < 768;
    const particles = Array.from({ length: isMobile ? 30 : 80 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      char: HEX[Math.floor(Math.random() * HEX.length)],
      opacity: Math.random() * 0.15 + 0.03,
      size: Math.random() * 10 + 8,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      particles.forEach(p => {
        // Mouse influence
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          p.x -= dx * 0.002;
          p.y -= dy * 0.002;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.font = `${p.size}px "JetBrains Mono", monospace`;
        ctx.fillStyle = `rgba(220, 20, 60, ${p.opacity})`;
        ctx.fillText(p.char, p.x, p.y);
      });

      // Draw connections near mouse (skip on mobile for performance)
      if (!isMobile) {
        particles.forEach(p => {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            particles.forEach(p2 => {
              const d = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
              if (d < 100 && d > 0) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = `rgba(220, 20, 60, ${0.03 * (1 - d / 100)})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
              }
            });
          }
        });
      }

      raf = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener('resize', () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    });

    return () => cancelAnimationFrame(raf);
  }, [mouse.x, mouse.y, reduced]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.5 }}
    />
  );
}

export function Hero() {
  const [nameComplete, setNameComplete] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const indicatorsRef = useRef<HTMLDivElement>(null);
  const typewriterRef = useRef<HTMLSpanElement>(null);

  // Typewriter
  useEffect(() => {
    const el = typewriterRef.current;
    if (!el) return;
    const roles = content.hero.roles;
    let ri = 0, ci = 0, deleting = false, speed = 55;

    const type = () => {
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
    };
    const t = setTimeout(type, 800);
    return () => clearTimeout(t);
  }, []);

  // No GSAP animation for indicators — they appear via CSS transition when nameComplete is true

  const handleNameComplete = useCallback(() => {
    setNameComplete(true);
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden">
      <ParticleField />

      {/* HUD grid overlay */}
      <div className="absolute inset-0 pointer-events-none z-[1]" style={{
        backgroundImage: `
          linear-gradient(rgba(220,20,60,0.015) 1px, transparent 1px),
          linear-gradient(90deg, rgba(220,20,60,0.015) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      <div className="relative z-10 max-w-[1100px] mx-auto w-full px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16 items-center">
          {/* Left — Name + Content */}
          <div>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-accent" />
                <span className="font-mono text-[0.6rem] tracking-[0.25em] uppercase text-accent">
                  SECURITY ANALYST
                </span>
              </div>

              <h1 className="font-display text-[clamp(3rem,8vw,6rem)] font-semibold leading-[0.9] tracking-wider uppercase text-text">
                <NameDecode text="ENZO" onComplete={() => {}} />
                <br />
                <NameDecode text="LENZI" onComplete={handleNameComplete} />
              </h1>
            </div>

            {nameComplete && (
              <>
                <div className="mb-6">
                  <GlitchText intensity="soft">
                    <p className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-text-muted">
                      {content.hero.tagline}
                    </p>
                  </GlitchText>
                </div>

                <p className="text-[0.95rem] leading-relaxed text-text-secondary mb-8 max-w-[480px]">
                  {content.hero.desc}
                </p>

                <div className="flex gap-4">
                  <MagneticButton href={`mailto:${content.hero.email}`}>
                    <span className="font-mono text-[0.7rem] tracking-widest uppercase px-6 py-2.5 border border-accent text-text hover:bg-accent-soft transition-colors">
                      Email
                    </span>
                  </MagneticButton>
                  <MagneticButton href={content.hero.linkedin}>
                    <span className="font-mono text-[0.7rem] tracking-widest uppercase px-6 py-2.5 border border-border-medium text-text-secondary hover:border-accent hover:text-text transition-colors">
                      LinkedIn
                    </span>
                  </MagneticButton>
                </div>
              </>
            )}
          </div>

          {/* Right — HUD Indicators */}
          <div
            ref={indicatorsRef}
            className="relative transition-all duration-700"
            style={{
              opacity: nameComplete ? 1 : 0,
              transform: nameComplete ? 'translateY(0)' : 'translateY(15px)',
            }}
          >
            {/* Corner decorations */}
            <div className="hud-corner top-left" />
            <div className="hud-corner top-right" />
            <div className="hud-corner bottom-left" />
            <div className="hud-corner bottom-right" />

            <div className="grid grid-cols-2 gap-px bg-border border border-border">
              {content.hero.indicators.map((ind) => (
                <div key={ind.label} className="flex flex-col gap-1 p-4 bg-bg hover:bg-bg-elevated transition-colors group">
                  <span className="font-mono text-[0.5rem] tracking-[0.15em] uppercase text-text-muted group-hover:text-text-secondary transition-colors">
                    {ind.label}
                  </span>
                  <span className={`font-mono text-[0.75rem] ${ind.accent ? 'text-accent' : 'text-text-secondary'}`}>
                    {ind.value}
                  </span>
                </div>
              ))}
              <div className="flex flex-col gap-1 p-4 bg-bg hover:bg-bg-elevated transition-colors col-span-2">
                <span className="font-mono text-[0.5rem] tracking-[0.15em] uppercase text-text-muted">ROLE</span>
                <span className="font-mono text-[0.75rem] text-text-secondary min-h-[1.2em]">
                  <span ref={typewriterRef} />
                  <span className="animate-pulse text-accent">|</span>
                </span>
              </div>
            </div>

            {/* Status line */}
            <div className="mt-3 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent pulse-glow" />
              <span className="font-mono text-[0.5rem] tracking-widest uppercase text-text-muted">
                SYSTEM ACTIVE — {new Date().toISOString().split('T')[0]}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
