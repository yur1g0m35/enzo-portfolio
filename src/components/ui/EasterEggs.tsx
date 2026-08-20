import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Konami Code
const KONAMI = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

export function EasterEggs() {
  const [showRoot, setShowRoot] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [konamiIndex, setKonamiIndex] = useState(0);

  // Konami Code detection
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.keyCode === KONAMI[konamiIndex]) {
        if (konamiIndex === KONAMI.length - 1) {
          setShowRoot(true);
          setTimeout(() => setShowRoot(false), 3000);
          setKonamiIndex(0);
        } else {
          setKonamiIndex(konamiIndex + 1);
        }
      } else {
        setKonamiIndex(0);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [konamiIndex]);

  // Terminal: press > to open
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '>' && !showTerminal) {
        e.preventDefault();
        setShowTerminal(true);
        setTerminalLines([
          'ENZO SECURITY TERMINAL v1.0',
          'Type "help" for available commands.',
          '',
        ]);
      }
      if (e.key === 'Escape' && showTerminal) {
        setShowTerminal(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [showTerminal]);

  const handleTerminalCommand = useCallback((cmd: string) => {
    const c = cmd.toLowerCase().trim();
    const responses: Record<string, string[]> = {
      help: [
        'Available commands:',
        '  about    — Profile information',
        '  skills   — Technical capabilities',
        '  certs    — Certifications',
        '  contact  — Contact information',
        '  status   — System status',
        '  clear    — Clear terminal',
        '  exit     — Close terminal',
      ],
      about: [
        'Enzo Lenzi — Security Analyst',
        'Focus: Offensive Security / Red Team / Pentest',
        'Location: Rio de Janeiro, BR',
        'Status: Active',
      ],
      skills: [
        'Offensive Security: Pentest, Red Team, OSINT',
        'Tools: Burp Suite, Nmap, Metasploit, Docker',
        'Frameworks: OWASP, MITRE ATT&CK, CVSS',
      ],
      certs: [
        'CRTA — Certified Red Team Analyst',
        'WEB-RTA — Certified Web Red Team Analyst',
        'MCRTA — Certified Multi-Cloud Red Team Analyst',
        'API-RTA — Certified API Red Team Analyst',
      ],
      contact: [
        'Email: enzofred.lenzi@gmail.com',
        'LinkedIn: /in/enzo-frederico-lenzi',
      ],
      status: [
        'System: ONLINE',
        'Uptime: ' + Math.floor(Date.now() / 1000 % 86400) + 's',
        'Clearance: ADMIN',
        'Threat Level: LOW',
      ],
    };

    if (c === 'clear') {
      setTerminalLines(['Terminal cleared.', '']);
      return;
    }
    if (c === 'exit') {
      setShowTerminal(false);
      return;
    }

    const response = responses[c] || [`Command not found: ${cmd}`, 'Type "help" for available commands.'];
    setTerminalLines(prev => [...prev, `> ${cmd}`, ...response, '']);
  }, []);

  return (
    <>
      {/* ROOT ACCESS overlay */}
      <AnimatePresence>
        {showRoot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-bg/90 pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="text-center"
            >
              <div className="font-mono text-4xl md:text-6xl font-bold text-accent tracking-widest mb-4"
                style={{ textShadow: '0 0 40px rgba(220,20,60,0.5)' }}>
                ROOT ACCESS
              </div>
              <div className="font-mono text-sm text-text-muted tracking-widest">
                GRANTED
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terminal */}
      <AnimatePresence>
        {showTerminal && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-4 right-4 left-4 md:left-auto md:w-[500px] z-[150] bg-bg border border-border-medium"
          >
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-bg-elevated">
              <div className="w-2.5 h-2.5 rounded-full bg-accent/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-600/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-600/60" />
              <span className="font-mono text-[0.55rem] text-text-muted ml-2">terminal — bash</span>
            </div>

            {/* Terminal body */}
            <div className="p-3 h-[250px] overflow-y-auto font-mono text-[0.7rem]">
              {terminalLines.map((line, i) => (
                <div key={i} className={`${line.startsWith('>') ? 'text-accent' : 'text-text-secondary'} mb-0.5`}>
                  {line}
                </div>
              ))}
              <TerminalInput onSubmit={handleTerminalCommand} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Console message */}
      <ConsoleMessage />
    </>
  );
}

function TerminalInput({ onSubmit }: { onSubmit: (cmd: string) => void }) {
  const [value, setValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && value.trim()) {
      onSubmit(value);
      setValue('');
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-accent">$</span>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent outline-none text-text font-mono text-[0.7rem]"
        autoFocus
        placeholder="type a command..."
      />
    </div>
  );
}

function ConsoleMessage() {
  useEffect(() => {
    console.log(
      '%c ENZO LENZI %c Security Analyst ',
      'background: #DC143C; color: white; padding: 4px 8px; font-family: monospace; font-weight: bold;',
      'background: #1a1a1a; color: #888; padding: 4px 8px; font-family: monospace;'
    );
    console.log('%c Press ">" to open terminal', 'color: #888; font-family: monospace;');
    console.log('%c Konami code: ↑↑↓↓←→←→BA', 'color: #555; font-family: monospace;');
  }, []);

  return null;
}
