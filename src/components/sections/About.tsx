import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { content } from '../../data/content';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';

function DataExtractLine({ text, delay }: { text: string; delay: number }) {
  const [status, setStatus] = useState<'waiting' | 'extracting' | 'done'>('waiting');
  const [display, setDisplay] = useState('');
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setStatus('done');
      setDisplay(text);
      return;
    }

    const t1 = setTimeout(() => setStatus('extracting'), delay);
    const t2 = setTimeout(() => {
      // Typewriter effect
      let i = 0;
      const interval = setInterval(() => {
        if (i <= text.length) {
          setDisplay(text.substring(0, i));
          i++;
        } else {
          clearInterval(interval);
          setStatus('done');
        }
      }, 15);
      return () => clearInterval(interval);
    }, delay + 200);

    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [text, delay, reduced]);

  return (
    <div className="flex items-start gap-3 mb-3">
      <span className={`font-mono text-[0.6rem] mt-1 w-16 shrink-0 ${
        status === 'done' ? 'text-accent' : 'text-text-muted'
      }`}>
        {status === 'waiting' ? '[ ------ ]' : status === 'extracting' ? '[ >>>>>> ]' : '[ LOADED ]'}
      </span>
      <p className={`text-[0.95rem] leading-[1.7] transition-colors duration-500 ${
        status === 'done' ? 'text-text' : 'text-text-muted'
      }`}>
        {display}
        {status === 'extracting' && <span className="animate-pulse text-accent">_</span>}
      </p>
    </div>
  );
}

export function About() {
  const { ref, inView } = useInView(0.1);
  const reduced = useReducedMotion();

  return (
    <section id="sobre" className="relative z-10 px-6 md:px-12 py-24 md:py-32">
      <div ref={ref} className="max-w-[1080px] mx-auto">
        {/* Section header with scan effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.36, 1] }}
          className="flex items-center gap-4 mb-12 pb-4 border-b border-border"
        >
          <span className="font-display text-sm font-semibold text-accent bg-accent-soft px-2 py-0.5 tracking-wider">
            {content.about.num}
          </span>
          <h2 className="font-display text-lg tracking-[0.12em] uppercase text-text">
            {content.about.title}
          </h2>
          <div className="flex-1 h-px bg-border ml-4" />
          <span className="font-mono text-[0.5rem] tracking-widest text-text-muted uppercase">
            {inView ? '[ EXTRACTED ]' : '[ PENDING ]'}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 lg:gap-16">
          {/* Main — Data extraction */}
          <div>
            {inView && content.about.paragraphs.map((p, i) => (
              <DataExtractLine key={i} text={p} delay={reduced ? 0 : i * 400} />
            ))}
          </div>

          {/* Sidebar — System status */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="hud-corner top-left" />
            <div className="hud-corner top-right" />
            <div className="hud-corner bottom-left" />
            <div className="hud-corner bottom-right" />

            <div className="flex flex-col gap-px bg-border border border-border">
              <div className="p-3 bg-bg">
                <span className="font-mono text-[0.5rem] tracking-[0.15em] uppercase text-text-muted block mb-2">
                  // IDENTITY DATA
                </span>
              </div>
              {content.about.sidebar.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  className="flex flex-col gap-0.5 p-4 bg-bg hover:bg-bg-elevated transition-colors group"
                >
                  <span className="font-mono text-[0.5rem] tracking-[0.15em] uppercase text-text-muted group-hover:text-text-secondary transition-colors">
                    {item.label}
                  </span>
                  <span className={`text-[0.85rem] ${item.accent ? 'text-accent' : 'text-text-secondary'}`}>
                    {item.value}
                  </span>
                </motion.div>
              ))}
              <div className="p-3 bg-bg">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent pulse-glow" />
                  <span className="font-mono text-[0.45rem] tracking-widest uppercase text-text-muted">
                    STATUS: VERIFIED
                  </span>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
