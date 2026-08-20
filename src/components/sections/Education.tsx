import { content } from '../../data/content';
import { useInView } from '../../hooks/useInView';
import { motion } from 'framer-motion';

export function Education() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="formacao" className="relative z-10 px-6 md:px-12 py-24 md:py-32">
      <div ref={ref} className="max-w-[1080px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.36, 1] }}
          className="flex items-center gap-4 mb-12 pb-4 border-b border-border"
        >
          <span className="font-display text-sm font-semibold text-accent bg-accent-soft px-2 py-0.5 tracking-wider">
            {content.education.num}
          </span>
          <h2 className="font-display text-lg tracking-[0.12em] uppercase text-text">
            {content.education.title}
          </h2>
        </motion.div>

        <div className="relative pl-8 md:pl-12">
          <div className="absolute left-[5px] md:left-[7px] top-0 bottom-0 w-px bg-border-medium" />

          {content.education.entries.map((entry, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.15, ease: [0.16, 1, 0.36, 1] }}
              className="relative pb-10 last:pb-0"
            >
              <div className="absolute -left-8 md:-left-12 top-1 w-3 h-3 rounded-full border-2 border-border-medium bg-bg z-10">
                {entry.status === 'ongoing' && (
                  <div className="absolute inset-0 rounded-full bg-accent border-2 border-accent shadow-[0_0_0_3px_rgba(139,0,0,0.15)]" />
                )}
              </div>

              <div className="pl-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-[0.7rem] text-text-muted">{entry.date}</span>
                  <span
                    className={`font-mono text-[0.55rem] tracking-widest uppercase px-2 py-0.5 ${
                      entry.status === 'ongoing'
                        ? 'text-accent border border-accent/30 bg-accent-soft'
                        : 'text-text-muted border border-border'
                    }`}
                  >
                    {entry.status === 'ongoing' ? 'Em andamento' : 'Concluído'}
                  </span>
                </div>

                <h3 className="font-display text-[1.15rem] font-semibold text-text mb-1">
                  {entry.degree}
                </h3>
                <p className="font-mono text-[0.75rem] text-accent">
                  {entry.program} — {entry.school}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
