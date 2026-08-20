import { useRef, useEffect, useState } from 'react';
import { useMousePosition } from '../../hooks/useMousePosition';
import { useReducedMotion } from '../../hooks/useReducedMotion';

function textToHex(text: string): string {
  return text.split('').map(ch => {
    if (ch === ' ') return '20';
    return ch.charCodeAt(0).toString(16).toUpperCase().padStart(2, '0');
  }).join(' ');
}

function textToBin(text: string): string {
  return text.split('').map(ch =>
    ch.charCodeAt(0).toString(2).padStart(8, '0')
  ).join(' ');
}

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useMousePosition();
  const reduced = useReducedMotion();
  const posRef = useRef({ x: 0, y: 0 });
  const lensPosRef = useRef({ x: 0, y: 0 });
  const [isHoveringText, setIsHoveringText] = useState(false);
  const [hoveredText, setHoveredText] = useState('');
  const isTouchDevice = useRef(false);

  // Detect touch device
  useEffect(() => {
    isTouchDevice.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }, []);

  // Main cursor + trail animation
  useEffect(() => {
    if (reduced || isTouchDevice.current) return;

    let raf: number;
    const animate = () => {
      const { x, y } = mouse;
      posRef.current.x += (x - posRef.current.x) * 0.12;
      posRef.current.y += (y - posRef.current.y) * 0.12;

      if (cursorRef.current) {
        cursorRef.current.style.left = posRef.current.x + 'px';
        cursorRef.current.style.top = posRef.current.y + 'px';
      }

      // Lens follows with more lag
      lensPosRef.current.x += (x - lensPosRef.current.x) * 0.06;
      lensPosRef.current.y += (y - lensPosRef.current.y) * 0.06;

      if (lensRef.current) {
        lensRef.current.style.left = lensPosRef.current.x + 'px';
        lensRef.current.style.top = lensPosRef.current.y + 'px';
      }

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [mouse.x, mouse.y, reduced]);

  // Lens canvas - draw hex text
  useEffect(() => {
    if (reduced || isTouchDevice.current || !isHoveringText || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 160;
    canvas.width = size;
    canvas.height = size;

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, size, size);

      if (!hoveredText) return;

      const hex = textToHex(hoveredText);
      const bin = textToBin(hoveredText.substring(0, 8));

      // Draw hex
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(220, 20, 60, 0.5)';
      ctx.fillText(hex.substring(0, 32), 8, 20);
      ctx.fillText(hex.substring(32, 64), 8, 32);

      // Draw bin
      ctx.fillStyle = 'rgba(220, 20, 60, 0.25)';
      ctx.fillText(bin.substring(0, 24), 8, 50);
      ctx.fillText(bin.substring(24, 48), 8, 62);

      // Draw ASCII
      ctx.fillStyle = 'rgba(241, 241, 237, 0.3)';
      ctx.fillText(hoveredText.substring(0, 16), 8, 82);
      if (hoveredText.length > 16) {
        ctx.fillText(hoveredText.substring(16, 32), 8, 94);
      }

      // Center indicator
      ctx.strokeStyle = 'rgba(220, 20, 60, 0.3)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, 20, 0, Math.PI * 2);
      ctx.stroke();

      // Crosshair
      ctx.beginPath();
      ctx.moveTo(size / 2 - 8, size / 2);
      ctx.lineTo(size / 2 + 8, size / 2);
      ctx.moveTo(size / 2, size / 2 - 8);
      ctx.lineTo(size / 2, size / 2 + 8);
      ctx.stroke();

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, [isHoveringText, hoveredText, reduced]);

  // Hover detection
  useEffect(() => {
    if (reduced || isTouchDevice.current) return;

    const handleOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('a, button, [data-cursor]')) {
        cursorRef.current?.classList.add('hovering');
      }
      // Check for text content
      const text = t.textContent?.trim() || '';
      if (text.length > 2 && text.length < 100 && !t.closest('canvas, .custom-cursor, .cursor-trail')) {
        setIsHoveringText(true);
        setHoveredText(text);
      }
    };

    const handleOut = () => {
      cursorRef.current?.classList.remove('hovering');
      setIsHoveringText(false);
      setHoveredText('');
    };

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

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />

      {/* Lens overlay */}
      <div
        ref={lensRef}
        className="pointer-events-none z-[99998] transition-opacity duration-300"
        style={{
          width: 160,
          height: 160,
          transform: 'translate(-50%, -50%)',
          opacity: isHoveringText ? 1 : 0,
          clipPath: isHoveringText ? 'circle(80px at 50% 50%)' : 'circle(0px at 50% 50%)',
          transition: 'clip-path 0.4s cubic-bezier(0.16, 1, 0.36, 1), opacity 0.3s',
        }}
      >
        <canvas ref={canvasRef} width={160} height={160} />
      </div>

      {/* Blur overlay on lens area */}
      {isHoveringText && (
        <div
          className="pointer-events-none z-[99997]"
          style={{
            position: 'fixed',
            inset: 0,
            backdropFilter: 'blur(1px)',
            WebkitBackdropFilter: 'blur(1px)',
            maskImage: `radial-gradient(circle 80px at ${lensPosRef.current.x}px ${lensPosRef.current.y}px, transparent 0%, black 100%)`,
            WebkitMaskImage: `radial-gradient(circle 80px at ${lensPosRef.current.x}px ${lensPosRef.current.y}px, transparent 0%, black 100%)`,
          }}
        />
      )}
    </>
  );
}
