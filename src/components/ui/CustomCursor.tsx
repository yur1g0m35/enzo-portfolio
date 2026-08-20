import { useRef, useEffect } from 'react';
import { useMousePosition } from '../../hooks/useMousePosition';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);
  const mouse = useMousePosition();
  const reduced = useReducedMotion();
  const posRef = useRef({ x: 0, y: 0 });
  const trailPositions = useRef(Array(6).fill({ x: 0, y: 0 }));

  useEffect(() => {
    if (reduced) return;

    let raf: number;
    const animate = () => {
      const { x, y } = mouse;
      posRef.current.x += (x - posRef.current.x) * 0.12;
      posRef.current.y += (y - posRef.current.y) * 0.12;

      if (cursorRef.current) {
        cursorRef.current.style.left = posRef.current.x + 'px';
        cursorRef.current.style.top = posRef.current.y + 'px';
      }

      // Trail
      let prevX = x, prevY = y;
      trailPositions.current.forEach((pos, i) => {
        const speed = 0.25 - i * 0.03;
        pos.x += (prevX - pos.x) * speed;
        pos.y += (prevY - pos.y) * speed;
        const el = trailRefs.current[i];
        if (el) {
          el.style.left = pos.x + 'px';
          el.style.top = pos.y + 'px';
          el.style.opacity = String(0.3 - i * 0.05);
        }
        prevX = pos.x;
        prevY = pos.y;
      });

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [mouse.x, mouse.y, reduced]);

  // Hover detection
  useEffect(() => {
    if (reduced) return;

    const handleOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('a, button, [data-cursor]')) {
        cursorRef.current?.classList.add('hovering');
      }
    };
    const handleOut = () => cursorRef.current?.classList.remove('hovering');
    const handleDown = () => { cursorRef.current?.classList.add('clicking'); };
    const handleUp = () => { cursorRef.current?.classList.remove('clicking'); };

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

  if (reduced) return null;

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { if (el) trailRefs.current[i] = el; }}
          className="cursor-trail"
        />
      ))}
    </>
  );
}
