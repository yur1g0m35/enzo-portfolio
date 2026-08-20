import { content } from '../../data/content';
import { useInView } from '../../hooks/useInView';
import { motion } from 'framer-motion';

export function Experience() {
  const { ref, inView } = useInView(0.05);

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
        </motion.div>

        <div className="relative pl-8 md:pl-12">
          {/* Timeline line */}
          <div className="absolute left-[5px] md:left-[7px] top-0 bottom-0 w-px bg-border-medium" />

          {content.experience.entries.map((entry, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.2, ease: [0.16, 1, 0.36, 1] }}
              className="relative pb-12 last:pb-0"
            >
              {/* Dot */}
              <div className="absolute -left-8 md:-left-12 top-1 w-3 h-3 rounded-full border-2 border-border-medium bg-bg z-10">
                {entry.current && (
                  <div className="absolute inset-0 rounded-full bg-accent border-2 border-accent shadow-[0_0_0_3px_rgba(139,0,0,0.15)]" />
                )}
              </div>

              <div className="pl-6">
                {/* Meta */}
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-[0.7rem] text-text-muted">{entry.date}</span>
                  {entry.current && (
                    <span className="font-mono text-[0.55rem] tracking-widest uppercase px-2 py-0.5 text-accent border border-accent/30 bg-accent-soft">
                      Atual
                    </span>
                  )}
                </div>

                <h3 className="font-display text-[1.15rem] font-semibold text-text mb-1">
                  {entry.role}
                </h3>
                <p className="font-mono text-[0.75rem] text-accent mb-3">{entry.org}</p>
                <p className="text-[0.9rem] text-text-secondary mb-4 leading-relaxed">{entry.desc}</p>

                <ul className="mb-4">
                  {entry.items.map((item, j) => (
                    <li
                      key={j}
                      className="relative pl-4 mb-1.5 text-[0.85rem] text-text-muted leading-snug"
                    >
                      <span className="absolute left-0 text-accent">—</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1 mt-4">
                  {entry.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[0.6rem] px-2 py-1 bg-bg-surface border border-border text-text-muted hover:border-accent hover:text-text-secondary transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
