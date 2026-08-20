import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { content } from '../../data/content';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { MagneticButton } from '../ui/MagneticButton';

const connectionStages = [
  '[ INITIATING CONNECTION ]',
  '[ SCANNING PROFILE ]',
  '[ ANALYZING CAPABILITIES ]',
  '[ PROFILE VERIFIED ]',
  '[ SECURE CHANNEL READY ]',
];

export function Contact() {
  const { ref, inView } = useInView(0.1);
  const [stage, setStage] = useState(-1);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!inView || reduced) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i < connectionStages.length) {
        setStage(i);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 400);
    return () => clearInterval(interval);
  }, [inView, reduced]);

  return (
    <section id="contato" className="relative z-10 px-6 md:px-12 py-24 md:py-32">
      <div ref={ref} className="max-w-[1080px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.36, 1] }}
          className="flex items-center gap-4 mb-12 pb-4 border-b border-border"
        >
          <span className="font-display text-sm font-semibold text-accent bg-accent-soft px-2 py-0.5 tracking-wider">
            {content.contact.num}
          </span>
          <h2 className="font-display text-lg tracking-[0.12em] uppercase text-text">
            {content.contact.title}
          </h2>
          <div className="flex-1 h-px bg-border ml-4" />
          <span className="font-mono text-[0.5rem] tracking-widest text-text-muted uppercase">
            {stage >= connectionStages.length ? '[ CONNECTED ]' : '[ CONNECTING ]'}
          </span>
        </motion.div>

        <div className="text-center py-8 md:py-16">
          {/* Connection status log */}
          <div className="mb-10 max-w-md mx-auto text-left">
            {connectionStages.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={stage >= i ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3 }}
                className={`font-mono text-[0.6rem] mb-1 ${
                  stage >= i ? 'text-accent' : 'text-text-muted/30'
                }`}
              >
                {line}
              </motion.div>
            ))}
          </div>

          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.36, 1] }}
            className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-tight text-text mb-6 tracking-wide"
          >
            Open for the<br />next challenge
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.36, 1] }}
            className="text-[0.95rem] text-text-secondary mb-10 max-w-[440px] mx-auto leading-relaxed"
          >
            {content.contact.desc}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.36, 1] }}
            className="mb-12"
          >
            <MagneticButton href={`mailto:${content.contact.email}`} strength={0.2}>
              <span className="font-mono text-[clamp(0.8rem,1.8vw,1rem)] text-accent px-8 py-4 border border-accent/30 bg-accent-soft hover:bg-accent/15 transition-all inline-block relative">
                {content.contact.email}
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full pulse-glow" />
              </span>
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.36, 1] }}
            className="flex justify-center gap-12"
          >
            {content.contact.links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target={link.url.startsWith('http') ? '_blank' : undefined}
                rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex flex-col items-center gap-1 text-center group"
                data-cursor
              >
                <span className="font-mono text-[0.5rem] tracking-[0.15em] uppercase text-text-muted group-hover:text-text-secondary transition-colors">
                  {link.label}
                </span>
                <span className="text-[0.82rem] text-text-secondary group-hover:text-text transition-colors">
                  {link.value}
                </span>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
