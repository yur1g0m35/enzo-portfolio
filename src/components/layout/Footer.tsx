import { useEffect, useState } from 'react';
import { content } from '../../data/content';

export function Footer() {
  const [year, setYear] = useState('');
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    setYear(new Date().getFullYear().toString());

    const handler = () => setShowTop(window.scrollY > 500);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <footer className="relative z-10 border-t border-border px-6 py-8">
      <div className="max-w-[1080px] mx-auto flex items-center justify-center gap-6">
        <span className="font-display text-sm tracking-[0.15em] uppercase text-text-secondary">
          {content.footer.name}
        </span>
        <span className="font-mono text-[0.6rem] tracking-widest uppercase text-text-muted">
          {content.footer.role}
        </span>
        <span className="font-mono text-[0.6rem] text-text-muted">{year}</span>
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center border border-border bg-bg-surface transition-all duration-200 hover:border-accent hover:text-accent ${
          showTop ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-label="Voltar ao topo"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
    </footer>
  );
}
