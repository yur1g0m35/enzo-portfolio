export const content = {
  meta: {
    title: "Enzo Lenzi — Security Analyst",
    description:
      "Enzo Frederico Mota Lenzi Gomes — Analista de Segurança da Informação especializado em Segurança Ofensiva, Red Team e Pentest.",
    url: "https://enzoportifolio.vercel.app",
  },

  hero: {
    label: "Security Analyst · Offensive Security",
    name: "ENZO LENZI",
    tagline: "Offensive Security · Red Team · Pentest",
    desc: "Profissional de Segurança da Informação com foco em Segurança Ofensiva. Identificação, exploração e gestão de vulnerabilidades em aplicações e infraestrutura corporativa.",
    email: "enzofred.lenzi@gmail.com",
    linkedin: "https://www.linkedin.com/in/enzo-frederico-lenzi",
    indicators: [
      { label: "STATUS", value: "ACTIVE", accent: true },
      { label: "FOCUS", value: "Red Team" },
      { label: "CVSS", value: "9.8" },
      { label: "MITRE", value: "ATT&CK" },
      { label: "OWASP", value: "Top 10" },
      { label: "LOCATION", value: "Rio de Janeiro, BR" },
      { label: "CLEARANCE", value: "Offensive" },
    ],
    roles: [
      "Analista de Segurança",
      "Red Team",
      "Pentester",
      "Offensive Security",
      "Vulnerability Researcher",
    ],
  },

  boot: [
    { text: "[ INITIALIZING SYSTEM ]", delay: 0 },
    { text: "[ SIGNAL DETECTED ]", delay: 600 },
    { text: "[ CONNECTION ESTABLISHED ]", delay: 1200 },
    { text: "[ SCANNING NETWORK ]", delay: 1800 },
    { text: "[ IDENTITY VERIFIED ]", delay: 2400 },
    { text: "[ ACCESS GRANTED ]", delay: 3000 },
  ],

  about: {
    title: "Sobre Mim",
    num: "I",
    paragraphs: [
      "Profissional de Segurança da Informação com foco em Segurança Ofensiva, atuando na identificação, exploração e priorização de vulnerabilidades em aplicações e infraestrutura em ambientes corporativos e institucionais, com o objetivo de antecipar riscos e apoiar decisões estratégicas de segurança.",
      "Possuo formação em Segurança da Informação, Bacharelado em Ciência da Computação e atualmente curso pós-graduação em Red Team Operations & Offensive Cyber Security, mantendo uma base sólida aliada à prática contínua.",
      "Minha atuação envolve a identificação, exploração e validação de vulnerabilidades, utilizando referências como OWASP, MITRE ATT&CK, CWE, CVE, CVSS e NVD para análise e priorização de riscos com foco em impacto real no negócio. Além disso, mantenho prática constante em ambientes controlados e CTFs, acompanhando a evolução de técnicas ofensivas e do cenário de ameaças.",
      "Ao longo da minha trajetória, desenvolvi uma visão que integra exploração técnica e entendimento de defesa, permitindo avaliar não apenas como uma falha pode ser explorada, mas também seu impacto na detecção, resposta e resiliência dos ambientes.",
    ],
    sidebar: [
      { label: "FOCUS", value: "Offensive Security" },
      { label: "SPECIALIZATION", value: "Red Team / Pentest" },
      { label: "LOCATION", value: "Rio de Janeiro, Brazil" },
      { label: "STATUS", value: "Open to opportunities", accent: true },
      { label: "LANGUAGES", value: "Português · English" },
    ],
  },

  profiles: {
    nick: "11Lnz",
    links: [
      {
        platform: "Hack The Box",
        value: "/profile/11Lnz",
        url: "https://profile.hackthebox.com/profile/019c8a5d-2e2d-70a9-8fb4-94aeff4b0903",
      },
      {
        platform: "TryHackMe",
        value: "/p/11Lnz",
        url: "https://tryhackme.com/p/11Lnz",
      },
      {
        platform: "GitHub",
        value: "/Enzofmlg",
        url: "https://github.com/Enzofmlg",
      },
      {
        platform: "YouTube",
        value: "/channel",
        url: "https://www.youtube.com/channel/UC8fB-Q2CZNiwx479Qyf9_-w",
      },
    ],
  },

  experience: {
    title: "Experiência Profissional",
    num: "II",
    entries: [
      {
        date: "mai 2025 — atualmente",
        current: true,
        role: "Analista de Segurança da Informação",
        org: "Every Cibersecurity",
        desc: "Execução de pentests em aplicações Web e infraestrutura, simulações de adversários e gestão de vulnerabilidades corporativas.",
        items: [
          "Pentests em aplicações Web e infraestrutura (grey box e white box)",
          "Simulações de adversários focada em cenários de Assumed Breach",
          "Identificação e análise de vulnerabilidades com Tenable One, Nessus e Syhunt",
          "Validação de vulnerabilidades via testes de intrusão controlados",
          "Correlação e análise de ameaças utilizando MITRE ATT&CK, OWASP, CWE, CVE e NVD",
          "Priorização de correção fundamentada no risco corporativo e CVSS",
          "Implantação e gerenciamento de agentes e sensores (RNA)",
          "Elaboração de relatórios técnicos e executivos com KPIs",
          "Análises forenses digitais com identificação de causa raiz",
          "Criação de laboratórios práticos de cibersegurança em Docker",
          "Gestão de vulnerabilidades em auditorias ISO 27001/27002",
          "Colaboração com equipes de Blue Team, GRC e Privacidade",
        ],
        tags: [
          "Web Pentest",
          "Assumed Breach",
          "MITRE ATT&CK",
          "CVSS",
          "ISO 27001",
          "Docker",
          "Forense",
          "GRC",
        ],
      },
      {
        date: "mai 2023 — dez 2024",
        current: false,
        role: "Administrador Técnico — Projeto Hórus",
        org: "UVA - Universidade Veiga de Almeida",
        desc: "Trabalho voluntário promovendo conscientização sobre segurança da informação e capacitação da comunidade acadêmica.",
        items: [
          "Criação de materiais práticos voltados à mitigação de vulnerabilidades",
          "Condução de treinamentos técnicos sobre segurança ofensiva e defensiva",
          "Democratização do acesso à cibersegurança e prevenção contra engenharia social",
        ],
        tags: ["Segurança Ofensiva", "Treinamentos", "Engenharia Social"],
      },
    ],
  },

  certifications: {
    title: "Certificações",
    num: "III",
    items: [
      {
        num: "01",
        abbr: "CRTA",
        name: "Certified Red Team Analyst",
        org: "CyberWarFare Labs",
      },
      {
        num: "02",
        abbr: "WEB-RTA",
        name: "Certified Web Red Team Analyst",
        org: "CyberWarFare Labs",
      },
      {
        num: "03",
        abbr: "MCRTA",
        name: "Certified Multi-Cloud Red Team Analyst",
        org: "CyberWarFare Labs",
      },
      {
        num: "04",
        abbr: "API-RTA",
        name: "Certified API Red Team Analyst",
        org: "CyberWarFare Labs",
      },
    ],
  },

  skills: {
    title: "Competências Técnicas",
    num: "IV",
    categories: [
      {
        name: "Offensive Security",
        items: [
          "Pentest Web",
          "Pentest API",
          "Pentest Infraestrutura",
          "Red Team",
          "Gestão de Vulnerabilidades",
          "OSINT",
          "Active Directory",
          "Mobile Exploitation",
          "OpSec",
        ],
      },
      {
        name: "Systems & Networks",
        items: ["Windows", "Linux", "TCP/IP", "DNS"],
      },
      {
        name: "Tools",
        items: [
          "Burp Suite",
          "Nmap",
          "Metasploit",
          "Tenable/Nessus",
          "Syhunt",
          "Wireshark",
          "Docker",
        ],
      },
      {
        name: "Frameworks",
        items: [
          "OWASP Top 10",
          "MITRE ATT&CK",
          "PTES",
          "NIST",
          "CIS Controls",
          "CWE/CVE",
          "CVSS",
          "ISO 27001",
          "ISO 27002",
          "LGPD",
        ],
      },
      {
        name: "Programming",
        items: ["Python", "Bash", "SQL"],
      },
      {
        name: "Practice",
        items: ["TryHackMe", "HackTheBox", "CTFs"],
      },
    ],
  },

  education: {
    title: "Formação Acadêmica",
    num: "V",
    entries: [
      {
        date: "Previsão: fev 2027",
        status: "ongoing",
        degree: "Pós-graduação",
        program: "Red Team Operations & Offensive Cyber Security",
        school: "FIAP",
      },
      {
        date: "Dezembro 2025",
        status: "done",
        degree: "Bacharelado",
        program: "Ciência da Computação",
        school: "UVA - Universidade Veiga de Almeida",
      },
      {
        date: "Outubro 2023",
        status: "done",
        degree: "Tecnólogo",
        program: "Segurança da Informação",
        school: "IBMR",
      },
    ],
  },

  contact: {
    title: "Contato",
    num: "VI",
    headline: "Open for the next challenge",
    desc: "Aberto a oportunidades, colaborações e troca de conhecimento na área de segurança da informação.",
    email: "enzofred.lenzi@gmail.com",
    links: [
      {
        label: "LinkedIn",
        value: "/in/enzo-frederico-lenzi",
        url: "https://www.linkedin.com/in/enzo-frederico-lenzi",
      },
      {
        label: "Telefone",
        value: "(21) 99973-4036",
        url: "tel:+5521999734036",
      },
    ],
  },

  footer: {
    name: "Enzo Lenzi",
    role: "Security Analyst",
  },
};
