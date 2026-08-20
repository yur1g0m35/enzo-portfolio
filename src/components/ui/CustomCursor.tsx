import { useEffect, useRef } from 'react';
import { useMousePosition } from '../../hooks/useMousePosition';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !cursorRef.current) return;

    let raf: number;
    let cx = mouse.x;
    let cy = mouse.y;

    const animate = () => {
      cx += (mouse.x - cx) * 0.15;
      cy += (mouse.y - cy) * 0.15;
      if (cursorRef.current) {
        cursorRef.current.style.left = cx + 'px';
        cursorRef.current.style.top = cy + 'px';
      }
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [mouse.x, mouse.y, reduced]);

  useEffect(() => {
    if (reduced) return;

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-cursor-hover]')
      ) {
        cursorRef.current?.classList.add('hovering');
      }
    };

    const handleOut = () => {
      cursorRef.current?.classList.remove('hovering');
    };

    document.addEventListener('mouseover', handleOver, { passive: true });
    document.addEventListener('mouseout', handleOut, { passive: true });
    return () => {
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
    };
  }, [reduced]);

  if (reduced) return null;

  return <div ref={cursorRef} className="custom-cursor" />;
}
