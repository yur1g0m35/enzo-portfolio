import { useRef, useEffect } from 'react';
import type { ReactNode } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface GlitchTextProps {
  children: ReactNode;
  className?: string;
  intensity?: 'soft' | 'medium' | 'heavy';
}

export function GlitchText({
  children,
  className = '',
  intensity = 'soft',
}: GlitchTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;
    const el = ref.current;

    const config = {
      soft: { skewX: 2, x: 2, duration: 0.3 },
      medium: { skewX: 5, x: 4, duration: 0.4 },
      heavy: { skewX: 10, x: 8, duration: 0.5 },
    }[intensity];

    const glitch = () => {
      gsap.to(el, {
        skewX: config.skewX,
        x: config.x,
        duration: config.duration / 2,
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.to(el, {
            skewX: 0,
            x: 0,
            duration: config.duration / 2,
            ease: 'power2.inOut',
          });
        },
      });
    };

    const interval = setInterval(glitch, 3000 + Math.random() * 4000);
    return () => clearInterval(interval);
  }, [intensity, reduced]);

  return (
    <div ref={ref} className={className} style={{ display: 'inline-block' }}>
      {children}
    </div>
  );
}
