import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface ScrollSceneProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fadeUp' | 'fadeIn' | 'scaleIn' | 'slideLeft' | 'slideUp' | 'clipReveal';
  delay?: number;
  stagger?: number;
  scrub?: boolean | number;
  pin?: boolean;
  markers?: boolean;
}

export function ScrollScene({
  children,
  className = '',
  animation = 'fadeUp',
  delay = 0,
  scrub = false,
  pin = false,
  markers = false,
}: ScrollSceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;

    const el = ref.current;

    const from: gsap.TweenVars = {
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay,
    };

    switch (animation) {
      case 'fadeUp':
        from.y = 40;
        break;
      case 'fadeIn':
        // just opacity
        break;
      case 'scaleIn':
        from.scale = 0.95;
        from.y = 20;
        break;
      case 'slideLeft':
        from.x = -40;
        break;
      case 'slideUp':
        from.y = 60;
        break;
      case 'clipReveal':
        from.clipPath = 'inset(100% 0 0 0)';
        break;
    }

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      end: 'top 20%',
      toggleActions: 'play none none reverse',
      animation: gsap.from(el, from),
      markers,
    });

    if (pin) {
      ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: 'bottom top',
        pin: true,
        pinSpacing: false,
      });
    }

    return () => {
      st.kill();
    };
  }, [reduced, animation, delay, scrub, pin, markers]);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

// Parallax wrapper
export function ParallaxLayer({
  children,
  className = '',
  speed = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;

    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      animation: gsap.to(ref.current, {
        y: speed * -100,
        ease: 'none',
      }),
    });

    return () => st.kill();
  }, [reduced, speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

// Section transition overlay
export function SectionTransition({ direction = 'up' }: { direction?: 'up' | 'down' }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;

    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 90%',
      end: 'top 10%',
      scrub: true,
      animation: gsap.fromTo(
        ref.current,
        { scaleX: 0 },
        { scaleX: 1, transformOrigin: direction === 'up' ? 'left center' : 'right center', ease: 'none' }
      ),
    });

    return () => st.kill();
  }, [reduced, direction]);

  return (
    <div
      ref={ref}
      className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent my-8"
      style={{ transform: 'scaleX(0)' }}
    />
  );
}

// Initialize all scroll triggers (call in App)
export function initScrollChoreography() {
  // Refresh on resize
  ScrollTrigger.addEventListener('refresh', () => {
    ScrollTrigger.refresh();
  });

  // Smooth scroll completion
  ScrollTrigger.defaults({ toggleActions: 'play none none reverse' });
}
