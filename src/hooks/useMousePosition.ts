import { useState, useEffect } from 'react';

export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return position;
}

export function useSmoothedMouse(smoothing = 0.08) {
  const mouse = useMousePosition();
  const [smooth, setSmooth] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let raf: number;
    const target = { x: mouse.x, y: mouse.y };
    const current = { x: smooth.x, y: smooth.y };

    const animate = () => {
      current.x += (target.x - current.x) * smoothing;
      current.y += (target.y - current.y) * smoothing;
      setSmooth({ x: current.x, y: current.y });
      raf = requestAnimationFrame(animate);
    };

    target.x = mouse.x;
    target.y = mouse.y;
    raf = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(raf);
  }, [mouse.x, mouse.y, smoothing]);

  return smooth;
}
