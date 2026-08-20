import { useState } from 'react';
import { motion } from 'framer-motion';
import { content } from '../../data/content';
import { useInView } from '../../hooks/useInView';
import { ScrambleText } from '../motion/ScrambleText';

export function Certifications() {
  const { ref, inView } = useInView(0.1);
  const [activatedCert, setActivatedCert] = useState<number | null>(null);

  return (
    <section id="certificacoes" className="relative z-10 px-6 md:px-12 py-24 md:py-32">
      <div ref={ref} className="max-w-[1080px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.36, 1] }}
          className="flex items-center gap-4 mb-12 pb-4 border-b border-border"
        >
          <span className="font-display text-sm font-semibold text-accent bg-accent-soft px-2 py-0.5 tracking-wider">
            {content.certifications.num}
          </span>
          <h2 className="font-display text-lg tracking-[0.12em] uppercase text-text">
            {content.certifications.title}
          </h2>
          <div className="flex-1 h-px bg-border ml-4" />
          <span className="font-mono text-[0.5rem] tracking-widest text-text-muted uppercase">
            {content.certifications.items.length} CREDENTIALS
          </span>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border border border-border">
          {content.certifications.items.map((cert, i) => (
            <motion.div
              key={cert.abbr}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="relative group"
              onMouseEnter={() => setActivatedCert(i)}
              onMouseLeave={() => setActivatedCert(null)}
              data-cursor
            >
              {/* Scan effect on activate */}
              {activatedCert === i && (
                <motion.div
                  initial={{ top: 0, opacity: 0 }}
                  animate={{ top: '100%', opacity: [0, 0.6, 0] }}
                  transition={{ duration: 0.8 }}
                  className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent z-10 pointer-events-none"
                />
              )}

              <div className="relative p-6 bg-bg hover:bg-bg-elevated transition-colors h-full">
                {/* Accent line */}
                <div className={`absolute top-0 left-0 h-full bg-accent transition-all duration-500 ${
                  activatedCert === i ? 'w-1 opacity-100' : 'w-0 opacity-0'
                }`} />

                {/* Status indicator */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[0.5rem] tracking-widest text-text-muted">
                    CRED-{cert.num}
                  </span>
                  <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activatedCert === i
                      ? 'bg-accent shadow-[0_0_8px_rgba(220,20,60,0.6)]'
                      : 'bg-border-strong'
                  }`} />
                </div>

                {/* Certificate name */}
                <h3 className="font-display text-[clamp(1.6rem,3vw,2.2rem)] font-semibold text-text tracking-wider mb-1">
                  <ScrambleText text={cert.abbr} active={activatedCert === i} duration={300} />
                </h3>
                <p className="text-[0.82rem] text-text-secondary mb-4 leading-snug">{cert.name}</p>

                {/* Org + activation status */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.55rem] tracking-[0.1em] uppercase text-accent">
                    {cert.org}
                  </span>
                  <span className={`font-mono text-[0.45rem] tracking-widest uppercase transition-colors duration-300 ${
                    activatedCert === i ? 'text-accent' : 'text-text-muted'
                  }`}>
                    {activatedCert === i ? '[ VERIFIED ]' : '[ STANDBY ]'}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
