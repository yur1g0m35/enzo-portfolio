import { useRef, useEffect } from 'react';

// Returns a ref that updates on mouse move WITHOUT causing re-renders
export function useMousePositionRef() {
  const position = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let lastUpdate = 0;
    const handler = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastUpdate < 16) return; // throttle to ~60fps
      lastUpdate = now;
      position.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return position;
}

// Legacy hook — kept for compatibility but uses ref internally
export function useMousePosition() {
  const pos = useMousePositionRef();
  // This returns a ref, not state. Components using this should read .current
  // For backward compatibility, we return the ref object
  return pos;
}
