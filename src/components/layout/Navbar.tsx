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

      const sectionEls = sections.map((s) => document.getElementById(s.id));
      for (let i = sectionEls.length - 1; i >= 0; i--) {
        const el = sectionEls[i];
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
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 h-14 transition-all duration-300 ${
          scrolled
            ? 'bg-bg/95 border-b border-border-medium backdrop-blur-xl'
            : 'bg-bg/60 border-b border-border backdrop-blur-lg'
        }`}
      >
        <a href="#" className="font-mono text-sm font-medium tracking-widest">
          &lt;<span className="text-accent">EL</span>/&gt;
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`font-mono text-[0.7rem] tracking-widest uppercase transition-colors duration-200 ${
                  active === s.id ? 'text-text' : 'text-text-muted hover:text-text-secondary'
                }`}
              >
                {s.num}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden flex flex-col gap-[5px] p-1 z-[110]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
        >
          <span
            className={`w-5 h-px bg-text-secondary transition-all duration-200 ${
              menuOpen ? 'rotate-45 translate-x-[4px] translate-y-[4px]' : ''
            }`}
          />
          <span
            className={`w-5 h-px bg-text-secondary transition-all duration-200 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`w-5 h-px bg-text-secondary transition-all duration-200 ${
              menuOpen ? '-rotate-45 translate-x-[4px] -translate-y-[4px]' : ''
            }`}
          />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99] bg-bg/97 backdrop-blur-2xl flex items-center justify-center md:hidden"
          >
            <ul className="flex flex-col items-center gap-6">
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
                    className="font-display text-3xl tracking-widest uppercase text-text-muted hover:text-text transition-colors"
                  >
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
