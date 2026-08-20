import { content } from '../../data/content';
import { useInView } from '../../hooks/useInView';
import { motion } from 'framer-motion';
import { ScrambleText } from '../motion/ScrambleText';
import { useState } from 'react';

export function Profiles() {
  const { ref, inView } = useInView(0.1);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="perfis" className="relative z-10 px-6 md:px-12 py-24 md:py-32">
      <div ref={ref} className="max-w-[1080px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center"
        >
          <motion.img
            src="/avatar.jpeg"
            alt="Avatar 11Lnz"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.36, 1] }}
            className="w-[140px] h-[140px] rounded-full object-cover border-2 border-border-medium mb-6 grayscale-[40%] hover:grayscale-0 hover:border-accent transition-all duration-300"
          />

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.36, 1] }}
            className="font-mono text-[clamp(2rem,4vw,3rem)] font-medium tracking-wider text-text mb-8"
          >
            <ScrambleText text={content.profiles.nick} active={inView} duration={600} />
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-px bg-border border border-border"
          >
            {content.profiles.links.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-0.5 p-4 bg-bg hover:bg-bg-elevated transition-colors text-center min-w-[160px]"
                onMouseEnter={() => setHovered(link.platform)}
                onMouseLeave={() => setHovered(null)}
              >
                <span className="font-mono text-[0.55rem] tracking-[0.12em] uppercase text-accent">
                  {link.platform}
                </span>
                <span className="text-[0.8rem] text-text-secondary">
                  <ScrambleText
                    text={link.value}
                    active={hovered === link.platform}
                    duration={300}
                  />
                </span>
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
