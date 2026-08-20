import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { content } from '../../data/content';
import { GlitchText } from '../motion/GlitchText';
import { MagneticButton } from '../ui/MagneticButton';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function Hero() {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const indicatorsRef = useRef<HTMLDivElement>(null);
  const typewriterRef = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  // Typewriter effect
  useEffect(() => {
    const el = typewriterRef.current;
    if (!el) return;
    const roles = content.hero.roles;
    let ri = 0;
    let ci = 0;
    let deleting = false;
    let speed = 55;

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

      if (!deleting && ci === current.length) {
        speed = 2200;
        deleting = true;
      } else if (deleting && ci === 0) {
        deleting = false;
        ri = (ri + 1) % roles.length;
        speed = 200;
      }

      setTimeout(type, speed);
    };

    const timer = setTimeout(type, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Entry animations
  useEffect(() => {
    if (reduced) return;

    const tl = gsap.timeline({ delay: 0.2 });

    tl.from(labelRef.current, { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' })
      .from(nameRef.current, { opacity: 0, y: 40, duration: 0.8, ease: 'power3.out' }, '-=0.3')
      .from(taglineRef.current, { opacity: 0, y: 15, duration: 0.5, ease: 'power3.out' }, '-=0.4')
      .from(descRef.current, { opacity: 0, y: 15, duration: 0.5, ease: 'power3.out' }, '-=0.3')
      .from(ctaRef.current, { opacity: 0, y: 15, duration: 0.5, ease: 'power3.out' }, '-=0.2');

    if (indicatorsRef.current) {
      gsap.from(indicatorsRef.current.children, {
        opacity: 0,
        y: 10,
        stagger: 0.05,
        duration: 0.4,
        ease: 'power3.out',
        delay: 0.5,
      });
    }
  }, [reduced]);

  return (
    <section className="relative min-h-screen flex items-center px-6 md:px-12">
      <div className="max-w-[1080px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-16 lg:gap-20 items-center py-20">
        {/* Left */}
        <div className="max-w-[600px]">
          <span
            ref={labelRef}
            className="inline-block font-mono text-[0.65rem] tracking-[0.2em] uppercase text-accent border border-accent/30 bg-accent-soft px-2 py-0.5 mb-6"
          >
            {content.hero.label}
          </span>

          <h1
            ref={nameRef}
            className="font-display text-[clamp(3rem,8vw,5.5rem)] font-semibold leading-[0.95] tracking-wide uppercase text-text mb-6"
          >
            <GlitchText intensity="soft">
              {content.hero.name.split(' ').map((word, i) => (
                <span key={i}>
                  {word}
                  {i === 0 ? <br /> : ' '}
                </span>
              ))}
            </GlitchText>
          </h1>

          <p ref={taglineRef} className="font-mono text-[0.7rem] tracking-[0.18em] uppercase text-text-muted mb-6">
            {content.hero.tagline}
          </p>

          <p ref={descRef} className="text-[0.95rem] leading-relaxed text-text-secondary mb-8 max-w-[480px]">
            {content.hero.desc}
          </p>

          <div ref={ctaRef} className="flex gap-4">
            <MagneticButton
              href={`mailto:${content.hero.email}`}
              className="font-mono text-[0.75rem] tracking-widest uppercase px-6 py-2.5 border border-accent text-text hover:bg-accent-soft transition-colors"
            >
              Email
            </MagneticButton>
            <MagneticButton
              href={content.hero.linkedin}
              className="font-mono text-[0.75rem] tracking-widest uppercase px-6 py-2.5 border border-border-medium text-text-secondary hover:border-accent hover:text-text transition-colors"
            >
              LinkedIn
            </MagneticButton>
          </div>
        </div>

        {/* Right — Indicators */}
        <div ref={indicatorsRef} className="grid grid-cols-2 gap-px bg-border border border-border">
          {content.hero.indicators.map((ind) => (
            <div key={ind.label} className="flex flex-col gap-0.5 p-4 bg-bg hover:bg-bg-elevated transition-colors">
              <span className="font-mono text-[0.55rem] tracking-[0.15em] uppercase text-text-muted">
                {ind.label}
              </span>
              <span className={`font-mono text-[0.78rem] ${ind.accent ? 'text-accent' : 'text-text-secondary'}`}>
                {ind.value}
              </span>
            </div>
          ))}
          <div className="flex flex-col gap-0.5 p-4 bg-bg hover:bg-bg-elevated transition-colors col-span-2">
            <span className="font-mono text-[0.55rem] tracking-[0.15em] uppercase text-text-muted">ROLE</span>
            <span className="font-mono text-[0.78rem] text-text-secondary min-h-[1.2em]">
              <span ref={typewriterRef}></span>
              <span className="animate-pulse text-accent">|</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
