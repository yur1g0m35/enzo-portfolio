import { useRef, useEffect, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ScrambleTextProps {
  text: string;
  className?: string;
  active?: boolean;
  duration?: number;
}

const CHARS = '!<>-_\\/[]{}—=+*^?#_abcdef0123456789';

export function ScrambleText({
  text,
  className = '',
  active = false,
  duration = 400,
}: ScrambleTextProps) {
  const [display, setDisplay] = useState(text);
  const reduced = useReducedMotion();
  const frameRef = useRef(0);

  useEffect(() => {
    if (reduced || !active) {
      setDisplay(text);
      return;
    }

    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const result = text
        .split('')
        .map((ch, i) => {
          if (i < text.length * progress) return ch;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join('');
      setDisplay(result);
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [active, text, duration, reduced]);

  return <span className={className}>{display}</span>;
}
