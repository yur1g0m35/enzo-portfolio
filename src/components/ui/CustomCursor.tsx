import { useRef, useEffect } from 'react';
import { useMousePositionRef } from '../../hooks/useMousePosition';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mouseRef = useMousePositionRef();
  const reduced = useReducedMotion();
  const posRef = useRef({ x: 0, y: 0 });
  const isTouchDevice = useRef(false);

  useEffect(() => {
    isTouchDevice.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }, []);

  useEffect(() => {
    if (reduced || isTouchDevice.current) return;

    let raf: number;
    const animate = () => {
      const { x, y } = mouseRef.current;
      posRef.current.x += (x - posRef.current.x) * 0.12;
      posRef.current.y += (y - posRef.current.y) * 0.12;

      if (cursorRef.current) {
        cursorRef.current.style.left = posRef.current.x + 'px';
        cursorRef.current.style.top = posRef.current.y + 'px';
      }

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  // Hover detection
  useEffect(() => {
    if (reduced || isTouchDevice.current) return;
    const handleOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button, [data-cursor]')) {
        cursorRef.current?.classList.add('hovering');
      }
    };
    const handleOut = () => cursorRef.current?.classList.remove('hovering');
    const handleDown = () => cursorRef.current?.classList.add('clicking');
    const handleUp = () => cursorRef.current?.classList.remove('clicking');

    document.addEventListener('mouseover', handleOver, { passive: true });
    document.addEventListener('mouseout', handleOut, { passive: true });
    document.addEventListener('mousedown', handleDown);
    document.addEventListener('mouseup', handleUp);
    return () => {
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
      document.removeEventListener('mousedown', handleDown);
      document.removeEventListener('mouseup', handleUp);
    };
  }, [reduced]);

  if (reduced || isTouchDevice.current) return null;
  return <div ref={cursorRef} className="custom-cursor" />;
}
