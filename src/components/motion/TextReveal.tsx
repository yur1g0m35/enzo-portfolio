import { useRef, useEffect } from 'react';
import type { ReactNode } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  by?: 'chars' | 'words' | 'lines';
}

export function TextReveal({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  by = 'chars',
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;

    const el = ref.current;
    const text = el.textContent || '';
    el.innerHTML = '';

    let units: string[];
    if (by === 'chars') {
      units = text.split('');
    } else if (by === 'words') {
      units = text.split(' ');
    } else {
      units = text.split('\n');
    }

    units.forEach((unit) => {
      if (by === 'lines') {
        const wrapper = document.createElement('div');
        wrapper.style.overflow = 'hidden';
        const inner = document.createElement('div');
        inner.textContent = unit;
        inner.style.transform = 'translateY(100%)';
        wrapper.appendChild(inner);
        el.appendChild(wrapper);
      } else {
        const wrapper = document.createElement('span');
        wrapper.style.display = 'inline-block';
        wrapper.style.overflow = 'hidden';
        const inner = document.createElement('span');
        inner.textContent = unit === ' ' ? '\u00A0' : unit;
        inner.style.display = 'inline-block';
        inner.style.transform = 'translateY(100%)';
        wrapper.appendChild(inner);
        el.appendChild(wrapper);
        if (by === 'words') {
          el.appendChild(document.createTextNode(' '));
        }
      }
    });

    const wrappers = el.querySelectorAll(by === 'lines' ? 'div' : 'span > span');
    gsap.to(wrappers, {
      y: 0,
      duration,
      stagger: by === 'chars' ? 0.02 : by === 'words' ? 0.05 : 0.1,
      delay,
      ease: 'power3.out',
    });
  }, [reduced, delay, duration, by]);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return <div ref={ref} className={className} />;
}
