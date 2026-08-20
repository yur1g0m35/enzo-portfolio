import { content } from '../../data/content';
import { useInView } from '../../hooks/useInView';
import { motion } from 'framer-motion';
import { MagneticButton } from '../ui/MagneticButton';

export function Contact() {
  const { ref, inView } = useInView(0.1);

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
        </motion.div>

        <div className="text-center py-12 md:py-20">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.36, 1] }}
            className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-tight text-text mb-6 tracking-wide"
          >
            Open for the<br />next challenge
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.36, 1] }}
            className="text-[1rem] text-text-secondary mb-8 max-w-[440px] mx-auto leading-relaxed"
          >
            {content.contact.desc}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.36, 1] }}
            className="mb-12"
          >
            <MagneticButton
              href={`mailto:${content.contact.email}`}
              strength={0.2}
            >
              <span className="font-mono text-[clamp(0.85rem,2vw,1.1rem)] text-accent px-8 py-4 border border-accent/30 bg-accent-soft hover:bg-accent/15 transition-colors inline-block">
                {content.contact.email}
              </span>
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.36, 1] }}
            className="flex justify-center gap-12"
          >
            {content.contact.links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target={link.url.startsWith('http') ? '_blank' : undefined}
                rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex flex-col items-center gap-1 text-center group"
              >
                <span className="font-mono text-[0.55rem] tracking-[0.15em] uppercase text-text-muted">
                  {link.label}
                </span>
                <span className="text-[0.85rem] text-text-secondary group-hover:text-text transition-colors">
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
