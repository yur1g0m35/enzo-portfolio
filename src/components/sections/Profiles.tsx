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
          {/* Avatar with scan effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.36, 1] }}
            className="relative mb-6"
          >
            <img
              src="/avatar.jpeg"
              alt="Avatar 11Lnz"
              className="w-[130px] h-[130px] rounded-full object-cover border-2 border-border-medium grayscale-[40%] hover:grayscale-0 hover:border-accent transition-all duration-500"
            />
            {/* Scan ring */}
            <div className="absolute inset-[-4px] rounded-full border border-accent/20 animate-spin" style={{ animationDuration: '8s' }} />
          </motion.div>

          {/* Nick with decode */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.36, 1] }}
            className="font-mono text-[clamp(2rem,4vw,3rem)] font-medium tracking-wider text-text mb-2"
          >
            <ScrambleText text={content.profiles.nick} active={inView} duration={600} />
          </motion.h2>

          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="font-mono text-[0.5rem] tracking-widest text-text-muted uppercase mb-8"
          >
            // DIGITAL IDENTITY
          </motion.span>

          {/* Links with status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="hud-corner top-left" />
            <div className="hud-corner top-right" />
            <div className="hud-corner bottom-left" />
            <div className="hud-corner bottom-right" />

            <div className="flex flex-col sm:flex-row gap-px bg-border border border-border">
              {content.profiles.links.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col gap-1 p-4 bg-bg hover:bg-bg-elevated transition-colors text-center min-w-[150px] group"
                  onMouseEnter={() => setHovered(link.platform)}
                  onMouseLeave={() => setHovered(null)}
                  data-cursor
                >
                  <span className="font-mono text-[0.5rem] tracking-[0.12em] uppercase text-accent">
                    {link.platform}
                  </span>
                  <span className="text-[0.78rem] text-text-secondary group-hover:text-text transition-colors">
                    <ScrambleText text={link.value} active={hovered === link.platform} duration={300} />
                  </span>
                  <span className="font-mono text-[0.4rem] tracking-widest text-text-muted mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    [ CONNECT → ]
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
