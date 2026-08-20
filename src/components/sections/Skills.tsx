import { content } from '../../data/content';
import { useInView } from '../../hooks/useInView';
import { motion } from 'framer-motion';
import { ScrambleText } from '../motion/ScrambleText';
import { useState } from 'react';

export function Skills() {
  const { ref, inView } = useInView(0.1);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section id="competencias" className="relative z-10 px-6 md:px-12 py-24 md:py-32">
      <div ref={ref} className="max-w-[1080px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.36, 1] }}
          className="flex items-center gap-4 mb-12 pb-4 border-b border-border"
        >
          <span className="font-display text-sm font-semibold text-accent bg-accent-soft px-2 py-0.5 tracking-wider">
            {content.skills.num}
          </span>
          <h2 className="font-display text-lg tracking-[0.12em] uppercase text-text">
            {content.skills.title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {content.skills.categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.36, 1] }}
              className="p-6 bg-bg hover:bg-bg-elevated transition-colors"
            >
              <h3 className="font-mono text-[0.65rem] font-medium tracking-[0.12em] uppercase text-accent mb-4 pb-3 border-b border-border">
                {cat.name}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-[0.65rem] px-2 py-1 bg-bg-surface border border-border text-text-muted hover:border-accent hover:text-text-secondary hover:bg-accent-soft transition-all cursor-default"
                    onMouseEnter={() => setHoveredSkill(skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <ScrambleText text={skill} active={hoveredSkill === skill} duration={250} />
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
