import { useState } from 'react';
import { motion } from 'framer-motion';
import { content } from '../../data/content';
import { useInView } from '../../hooks/useInView';
import { ScrambleText } from '../motion/ScrambleText';

export function Experience() {
  const { ref, inView } = useInView(0.05);
  const [expandedEntry, setExpandedEntry] = useState<number | null>(null);

  return (
    <section id="experiencia" className="relative z-10 px-6 md:px-12 py-24 md:py-32">
      <div ref={ref} className="max-w-[1080px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.36, 1] }}
          className="flex items-center gap-4 mb-12 pb-4 border-b border-border"
        >
          <span className="font-display text-sm font-semibold text-accent bg-accent-soft px-2 py-0.5 tracking-wider">
            {content.experience.num}
          </span>
          <h2 className="font-display text-lg tracking-[0.12em] uppercase text-text">
            {content.experience.title}
          </h2>
          <div className="flex-1 h-px bg-border ml-4" />
          <span className="font-mono text-[0.5rem] tracking-widest text-text-muted uppercase">
            {content.experience.entries.length} OPERATIONS
          </span>
        </motion.div>

        <div className="space-y-1">
          {content.experience.entries.map((entry, i) => {
            const isExpanded = expandedEntry === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.15 }}
              >
                <button
                  onClick={() => setExpandedEntry(isExpanded ? null : i)}
                  className="w-full text-left group"
                  data-cursor
                >
                  <div className="relative border border-border hover:border-border-medium transition-all duration-300 bg-bg-card">
                    <div
                      className={
                        'absolute top-0 left-0 h-full bg-accent transition-all duration-500 ' +
                        (isExpanded ? 'w-1' : 'w-0 group-hover:w-[2px]')
                      }
                    />
                    <div className="p-5 md:p-6 pl-6 md:pl-8">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-mono text-[0.65rem] text-text-muted">{entry.date}</span>
                            {entry.current && (
                              <span className="font-mono text-[0.5rem] tracking-widest uppercase px-2 py-0.5 text-accent border border-accent/30 bg-accent-soft pulse-glow">
                                ACTIVE
                              </span>
                            )}
                          </div>
                          <h3 className="font-display text-[1.1rem] font-semibold text-text mb-1">
                            {entry.role}
                          </h3>
                          <p className="font-mono text-[0.7rem] text-accent">{entry.org}</p>
                        </div>
                        <div
                          className={
                            'w-6 h-6 flex items-center justify-center border border-border text-text-muted transition-transform duration-300 ' +
                            (isExpanded ? 'rotate-45' : '')
                          }
                        >
                          <span className="text-lg leading-none">+</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: isExpanded ? 'auto' : 0,
                    opacity: isExpanded ? 1 : 0,
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="border-x border-b border-border bg-bg-card/50 p-5 md:p-6 pl-6 md:pl-8">
                    <p className="text-[0.88rem] text-text-secondary mb-4 leading-relaxed">{entry.desc}</p>
                    <div className="mb-4">
                      <span className="font-mono text-[0.5rem] tracking-[0.15em] uppercase text-text-muted block mb-2">
                        {'// OBJECTIVES'}
                      </span>
                      <ul className="space-y-1.5">
                        {entry.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-2 text-[0.82rem] text-text-muted">
                            <span className="text-accent mt-0.5 shrink-0">{'\u25B8'}</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="font-mono text-[0.5rem] tracking-[0.15em] uppercase text-text-muted block mb-2">
                        {'// TOOLS DEPLOYED'}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {entry.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[0.58rem] px-2 py-1 bg-bg-surface border border-border text-text-muted hover:border-accent hover:text-text-secondary transition-colors"
                          >
                            <ScrambleText text={tag} active={isExpanded} duration={300} />
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
