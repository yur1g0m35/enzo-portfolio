import { useEffect, useState } from 'react';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handler = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const p = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(p);
    };

    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-2">
      <div className="w-px h-24 bg-white/5 relative overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full bg-accent transition-none"
          style={{ height: `${progress * 100}%` }}
        />
      </div>
      <span className="font-mono text-[0.55rem] text-text-muted tracking-widest">
        {Math.round(progress * 100).toString().padStart(3, '0')}
      </span>
    </div>
  );
}
