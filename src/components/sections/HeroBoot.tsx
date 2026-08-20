import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '../../data/content';

interface HeroBootProps {
  onComplete: () => void;
}

export function HeroBoot({ onComplete }: HeroBootProps) {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const boot = content.boot;
    boot.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, i]);
      }, line.delay);
    });

    // Fade out and call complete
    const fadeTimer = setTimeout(() => {
      setFading(true);
      setTimeout(onComplete, 600);
    }, boot[boot.length - 1].delay + 800);

    return () => clearTimeout(fadeTimer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!fading && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[200] bg-bg flex items-center justify-center"
        >
          <div className="max-w-md w-full px-8">
            {content.boot.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={visibleLines.includes(i) ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3 }}
                className="boot-line mb-2"
              >
                <span className="text-text-muted">{line.text}</span>
              </motion.div>
            ))}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: visibleLines.length > 0 ? `${(visibleLines.length / content.boot.length) * 100}%` : '0%' }}
              transition={{ duration: 0.3 }}
              className="h-px bg-accent mt-4"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
