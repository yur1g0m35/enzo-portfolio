import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sections = [
  { id: 'sobre', num: '01', label: 'About' },
  { id: 'perfis', num: '02', label: 'Profiles' },
  { id: 'experiencia', num: '03', label: 'Experience' },
  { id: 'certificacoes', num: '04', label: 'Certs' },
  { id: 'competencias', num: '05', label: 'Skills' },
  { id: 'formacao', num: '06', label: 'Education' },
  { id: 'contato', num: '07', label: 'Contact' },
];

export function Navbar() {
  const [active, setActive] = useState('sobre');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) {
          setActive(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 h-14 transition-all duration-300 ${
          scrolled
            ? 'bg-bg/95 border-b border-border-medium backdrop-blur-xl'
            : 'bg-bg/50 border-b border-border backdrop-blur-lg'
        }`}
      >
        <a href="#" className="font-mono text-sm font-medium tracking-widest" data-cursor>
          &lt;<span className="text-accent">EL</span>/&gt;
        </a>

        {/* Desktop nav — HUD style */}
        <div className="hidden md:flex items-center gap-1">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              data-cursor
              className={`relative px-3 py-1.5 font-mono text-[0.65rem] tracking-widest transition-all duration-200 ${
                active === s.id
                  ? 'text-text bg-accent-soft'
                  : 'text-text-muted hover:text-text-secondary'
              }`}
            >
              {s.num}
              {active === s.id && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-0 right-0 h-[1px] bg-accent"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </a>
          ))}
          {/* Current section label */}
          <span className="ml-3 font-mono text-[0.5rem] tracking-widest text-text-muted uppercase hidden lg:block">
            / {sections.find(s => s.id === active)?.label}
          </span>
        </div>

        <button
          className="md:hidden flex flex-col gap-[5px] p-1 z-[110]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          data-cursor
        >
          <span className={`w-5 h-px bg-text-secondary transition-all duration-200 ${menuOpen ? 'rotate-45 translate-x-[4px] translate-y-[4px]' : ''}`} />
          <span className={`w-5 h-px bg-text-secondary transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-5 h-px bg-text-secondary transition-all duration-200 ${menuOpen ? '-rotate-45 translate-x-[4px] -translate-y-[4px]' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99] bg-bg/97 backdrop-blur-2xl flex flex-col items-center justify-center md:hidden"
          >
            <div className="font-mono text-[0.5rem] tracking-widest text-text-muted mb-8">
              // SELECT SECTION
            </div>
            <ul className="flex flex-col items-center gap-5">
              {sections.map((s, i) => (
                <motion.li
                  key={s.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <a
                    href={`#${s.id}`}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-4 font-display text-2xl tracking-widest uppercase text-text-muted hover:text-text transition-colors"
                    data-cursor
                  >
                    <span className="font-mono text-[0.6rem] text-accent">{s.num}</span>
                    {s.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
