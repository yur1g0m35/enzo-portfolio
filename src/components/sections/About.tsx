import { content } from '../../data/content';
import { useInView } from '../../hooks/useInView';
import { motion } from 'framer-motion';

export function About() {
  const { ref: sectionRef, inView } = useInView(0.1);

  return (
    <section id="sobre" className="relative z-10 px-6 md:px-12 py-24 md:py-32">
      <div ref={sectionRef} className="max-w-[1080px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.36, 1] }}
          className="flex items-center gap-4 mb-12 pb-4 border-b border-border"
        >
          <span className="font-display text-sm font-semibold text-accent bg-accent-soft px-2 py-0.5 tracking-wider">
            {content.about.num}
          </span>
          <h2 className="font-display text-lg tracking-[0.12em] uppercase text-text">
            {content.about.title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-16 lg:gap-24">
          {/* Main */}
          <div>
            {content.about.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.36, 1] }}
                className={`mb-4 leading-[1.75] ${i === 0 ? 'text-text text-[1.05rem]' : 'text-text-secondary text-[0.95rem]'}`}
              >
                {i === 0 ? (
                  <>
                    Profissional de Segurança da Informação com foco em{' '}
                    <strong>Segurança Ofensiva</strong>, atuando na identificação, exploração e
                    priorização de vulnerabilidades em aplicações e infraestrutura em ambientes
                    corporativos e institucionais, com o objetivo de antecipar riscos e apoiar
                    decisões estratégicas de segurança.
                  </>
                ) : (
                  p
                )}
              </motion.p>
            ))}
          </div>

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.36, 1] }}
            className="flex flex-col gap-px bg-border border border-border sticky top-20"
          >
            {content.about.sidebar.map((item) => (
              <div key={item.label} className="flex flex-col gap-0.5 p-4 bg-bg">
                <span className="font-mono text-[0.55rem] tracking-[0.15em] uppercase text-text-muted">
                  {item.label}
                </span>
                <span className={`text-[0.88rem] ${item.accent ? 'text-accent' : 'text-text-secondary'}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
