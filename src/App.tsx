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
import { EasterEggs } from './components/ui/EasterEggs';

const CyberGrid = lazy(() =>
  import('./components/three/CyberGrid').then((m) => ({ default: m.CyberGrid }))
);

const techLabels = [
  { text: 'SECURITY OPERATIONS', style: { top: '12%', left: '5%' } },
  { text: 'MITRE ATT&CK', style: { top: '28%', right: '8%' } },
  { text: 'TCP/IP', style: { top: '55%', left: '3%' } },
  { text: 'CVSS:9.8', style: { top: '72%', right: '6%' } },
  { text: 'NODE_07', style: { top: '88%', left: '7%' } },
  { text: '0x4F2A', style: { top: '15%', right: '3%' } },
  { text: 'PORT 443', style: { top: '42%', left: '2%' } },
  { text: 'STATUS: ACTIVE', style: { top: '65%', right: '4%' } },
  { text: 'OWASP', style: { top: '35%', left: '8%' } },
  { text: '192.168.x.x', style: { top: '80%', right: '9%' } },
];

export default function App() {
  const [booted, setBooted] = useState(false);
  const [showContent, setShowContent] = useState(false);

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

  useEffect(() => {
    if (booted) setTimeout(() => setShowContent(true), 200);
  }, [booted]);

  return (
    <div className="relative min-h-screen">
      <div className="bg-grain" aria-hidden="true" />
      <div className="bg-scanline" aria-hidden="true" />

      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        {techLabels.map((l, i) => (
          <span key={i} className="tech-label" style={l.style}>{l.text}</span>
        ))}
      </div>

      <Suspense fallback={null}>
        <CyberGrid />
      </Suspense>

      {!booted && <HeroBoot onComplete={() => setBooted(true)} />}

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
          <EasterEggs />
        </>
      )}
    </div>
  );
}
