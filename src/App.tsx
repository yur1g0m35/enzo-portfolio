import { useState, useEffect, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import { HeroBoot } from './components/sections/HeroBoot';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Profiles } from './components/sections/Profiles';
import { Experience } from './components/sections/Experience';
import { Certifications } from './components/sections/Certifications';
import { Skills } from './components/sections/Skills';
import { Education } from './components/sections/Education';
import { Contact } from './components/sections/Contact';
import { CustomCursor } from './components/ui/CustomCursor';
import { ScrollProgress } from './components/ui/ScrollProgress';

const CyberGrid = lazy(() =>
  import('./components/three/CyberGrid').then((m) => ({ default: m.CyberGrid }))
);

export default function App() {
  const [booted, setBooted] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  // Boot sequence
  useEffect(() => {
    if (booted) {
      setTimeout(() => setShowContent(true), 200);
    }
  }, [booted]);

  return (
    <div className="relative min-h-screen">
      {/* Background layers */}
      <div className="bg-grain" aria-hidden="true" />
      <div className="bg-scanline" aria-hidden="true" />

      {/* Tech labels */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        <span className="tech-label" style={{ top: '12%', left: '5%' }}>SECURITY OPERATIONS</span>
        <span className="tech-label" style={{ top: '28%', right: '8%' }}>MITRE ATT&CK</span>
        <span className="tech-label" style={{ top: '55%', left: '3%' }}>TCP/IP</span>
        <span className="tech-label" style={{ top: '72%', right: '6%' }}>CVSS:9.8</span>
        <span className="tech-label" style={{ top: '88%', left: '7%' }}>NODE_07</span>
        <span className="tech-label" style={{ top: '15%', right: '3%' }}>0x4F2A</span>
        <span className="tech-label" style={{ top: '42%', left: '2%' }}>PORT 443</span>
        <span className="tech-label" style={{ top: '65%', right: '4%' }}>STATUS: ACTIVE</span>
        <span className="tech-label" style={{ top: '35%', left: '8%' }}>OWASP</span>
        <span className="tech-label" style={{ top: '80%', right: '9%' }}>192.168.x.x</span>
      </div>

      {/* WebGL Background */}
      <Suspense fallback={null}>
        <CyberGrid />
      </Suspense>

      {/* Boot Sequence */}
      {!booted && <HeroBoot onComplete={() => setBooted(true)} />}

      {/* Main Content */}
      {showContent && (
        <>
          <CustomCursor />
          <ScrollProgress />
          <Navbar />

          <main className="relative z-10">
            <Hero />
            <About />
            <Profiles />
            <Experience />
            <Certifications />
            <Skills />
            <Education />
            <Contact />
          </main>

          <Footer />
        </>
      )}
    </div>
  );
}
