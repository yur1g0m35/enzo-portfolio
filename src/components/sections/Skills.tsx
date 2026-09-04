import { useState } from 'react';
import { content } from '../../data/content';

function SkillNode({ skill, onHover, isHovered, connectedTo }: {
  skill: string;
  onHover: (s: string | null) => void;
  isHovered: boolean;
  connectedTo: boolean;
}) {
  return (
    <span
      className={`font-mono text-[0.65rem] px-2.5 py-1.5 border cursor-default inline-block ${
        isHovered
          ? 'border-accent text-text bg-accent-soft shadow-[0_0_12px_rgba(185,74,72,0.2)]'
          : connectedTo
          ? 'border-accent/40 text-text-secondary bg-accent-soft/50'
          : 'border-border text-text-muted bg-bg-surface hover:border-border-medium hover:text-text-secondary'
      }`}
      onMouseEnter={() => onHover(skill)}
      onMouseLeave={() => onHover(null)}
      data-cursor
    >
      {skill}
    </span>
  );
}

const connections: Record<string, string[]> = {
  'Pentest Web': ['Burp Suite', 'OWASP Top 10', 'Nmap'],
  'Pentest API': ['Burp Suite', 'OWASP Top 10'],
  'Pentest Infraestrutura': ['Nmap', 'Metasploit', 'Linux', 'Windows'],
  'Red Team': ['Active Directory', 'Metasploit', 'OSINT'],
  'Python': ['Pentest Web', 'OSINT'],
  'Bash': ['Linux', 'Docker'],
  'Docker': ['Linux', 'Bash'],
  'Nmap': ['Pentest Infraestrutura', 'TCP/IP'],
  'Metasploit': ['Red Team', 'Pentest Infraestrutura'],
  'Burp Suite': ['Pentest Web', 'Pentest API'],
  'Linux': ['Bash', 'Docker', 'TCP/IP'],
  'Windows': ['Active Directory', 'Pentest Infraestrutura'],
  'OWASP Top 10': ['Pentest Web', 'Pentest API', 'CVSS'],
  'MITRE ATT&CK': ['Red Team', 'CVSS'],
  'CVSS': ['OWASP Top 10', 'MITRE ATT&CK', 'CWE/CVE'],
};

export function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const getConnected = (skill: string) => {
    if (!hoveredSkill) return false;
    if (connections[hoveredSkill]?.includes(skill)) return true;
    if (connections[skill]?.includes(hoveredSkill)) return true;
    return false;
  };

  return (
    <section id="competencias" className="relative z-10 px-6 md:px-12 py-24 md:py-32">
      <div className="max-w-[1080px] mx-auto">
        <div className="flex items-center gap-4 mb-12 pb-4 border-b border-border">
          <span className="font-display text-sm font-semibold text-accent bg-accent-soft px-2 py-0.5 tracking-wider">
            {content.skills.num}
          </span>
          <h2 className="font-display text-lg tracking-[0.12em] uppercase text-text">
            {content.skills.title}
          </h2>
          <div className="flex-1 h-px bg-border ml-4" />
          <span className="font-mono text-[0.5rem] tracking-widest text-text-muted uppercase">
            {content.skills.categories.reduce((a, c) => a + c.items.length, 0)} CAPABILITIES
          </span>
        </div>

        {hoveredSkill && (
          <div className="mb-6 font-mono text-[0.55rem] text-accent tracking-wider">
            CONNECTED TO: {Object.entries(connections)
              .filter(([k, v]) => k === hoveredSkill || v.includes(hoveredSkill))
              .flatMap(([k, v]) => k === hoveredSkill ? v : [k])
              .filter((v, i, a) => a.indexOf(v) === i)
              .join(' · ')}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {content.skills.categories.map((cat) => (
            <div
              key={cat.name}
              className="p-5 bg-bg hover:bg-bg-elevated"
            >
              <h3 className="font-mono text-[0.6rem] font-medium tracking-[0.12em] uppercase text-accent mb-3 pb-2 border-b border-border">
                {cat.name}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((skill) => (
                  <SkillNode
                    key={skill}
                    skill={skill}
                    onHover={setHoveredSkill}
                    isHovered={hoveredSkill === skill}
                    connectedTo={getConnected(skill)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
