import { content } from '../../data/content';
import { useInView } from '../../hooks/useInView';
import { motion } from 'framer-motion';
import { ScrambleText } from '../motion/ScrambleText';
import { useState } from 'react';

export function Certifications() {
  const { ref, inView } = useInView(0.1);
  const [hovered, setHovered] = useState<number | null>(null);

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
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border border border-border">
          {content.certifications.items.map((cert, i) => (
            <motion.div
              key={cert.abbr}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.36, 1] }}
              className="relative flex flex-col p-6 bg-bg hover:bg-bg-elevated transition-colors group"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Accent line */}
              <div className="absolute top-0 left-0 w-[2px] h-0 bg-accent transition-all duration-300 group-hover:h-full" />

              <span className="font-mono text-[0.55rem] text-text-muted tracking-widest mb-4">
                {cert.num}
              </span>
              <h3 className="font-display text-[clamp(1.6rem,3vw,2.2rem)] font-semibold text-text tracking-wider mb-1">
                <ScrambleText text={cert.abbr} active={hovered === i} duration={300} />
              </h3>
              <p className="text-[0.85rem] text-text-secondary mb-4">{cert.name}</p>
              <span className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-accent mt-auto">
                {cert.org}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
