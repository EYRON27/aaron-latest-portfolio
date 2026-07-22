// ============================================================
//  portfolio.ts — SINGLE SOURCE OF TRUTH
//  Edit this file to update ALL pages of the portfolio at once.
// ============================================================

// ── Personal Info ────────────────────────────────────────────
export const PERSONAL = {
  name: 'Aaron M. Cañada',
  firstName: 'Aaron M.',
  lastName: 'Cañada',
  title: 'IT Student & Developer',
  tagline: 'Front-End Developer · UI/UX Designer · Full-Stack Craftsman',
  bio: [
    "I'm a web development student who loves learning new technologies and building responsive, accessible, and efficient websites and applications. Currently pursuing a Bachelor of Science in Information Technology at Quezon City University.",
    "When I'm not coding or studying, I explore new tech, build side projects, and connect with other students who share the same passion for development. I believe in creating digital experiences that matter.",
    "I'm particularly passionate about front-end development and UI/UX design — always striving to craft web experiences that are not only visually stunning but also fast and accessible.",
  ],
  photo: '/ME YARN.jpg',
  location: 'Quezon City, Philippines',
  availability: 'Currently available for opportunities',
};

// ── Experience ────────────────────────────────────────────────
export const EXPERIENCE = [
  {
    role: 'Front-end AI Engineering Intern',
    company: 'FlyRank AI',
    type: 'Internship',
    date: 'Jun 2026 - Present',
    duration: '2 mos',
    location: 'Quezon City, National Capital Region, Philippines · Remote',
    description: 'Currently driving frontend innovation at FlyRank AI as a Front-end AI Engineer. Spearheading the development of high-performance user interfaces and spearheading the seamless integration of AI-driven features.',
    link: {
      text: 'FlyRank - The Autopilot for Organic Growth',
      url: 'https://www.linkedin.com/posts/ca%C3%B1ada-aaron-m-352572352_flyrank-is-building-the-autopilot-for-organic-activity-7470102063142588416-0XyC?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFgBIm4BPyX01L-_oI4_tYfk6jFxdrFd_Sc'
    }
  }
];

// ── Contact ───────────────────────────────────────────────────
export const CONTACT = {
  email: 'canada.aaron.mulat@gmail.com',
  github: {
    label: 'GitHub',
    handle: '@EYRON27',
    url: 'https://github.com/EYRON27',
  },
  linkedin: {
    label: 'LinkedIn',
    handle: 'Aaron Cañada',
    url: 'https://www.linkedin.com/in/ca%C3%B1ada-aaron-m-352572352/',
  },
  cv: '/CAÑADA CV (3).pdf',
};

// ── Stats ─────────────────────────────────────────────────────
export const STATS = [
  { number: 9,  suffix: '+', label: 'Projects Built',   color: '#f59e0b' },
  { number: 9,  suffix: '+', label: 'Certifications',   color: '#8b5cf6' },
  { number: 9,  suffix: '+', label: 'Courses Taken',    color: '#06b6d4' },
];

// ── Tech pills shown in About ─────────────────────────────────
export const TECH_PILLS = [
  'React', 'TypeScript', 'Tailwind CSS', 'Flutter',
  'Node.js', 'Figma', 'Firebase', 'Git',
];

// ── Skills ────────────────────────────────────────────────────
export const SKILL_CATEGORIES = [
  {
    title: 'Frontend',
    color: '#f59e0b',
    skills: ['HTML', 'React', 'TypeScript', 'Tailwind CSS', 'Flutter', 'Dart', 'React Native'],
  },
  {
    title: 'Backend',
    color: '#8b5cf6',
    skills: ['JavaScript', 'Node.js', 'Express', 'React Native'],
  },
  {
    title: 'Databases',
    color: '#06b6d4',
    skills: ['MySQL', 'MSSQL', 'Firebase'],
  },
  {
    title: 'Tools',
    color: '#10b981',
    skills: ['Git', 'GitHub', 'Figma'],
  },
  {
    title: 'Soft Skills',
    color: '#f43f5e',
    skills: ['Communication', 'Work Under Pressure', 'Teamwork'],
  },
];

// ── Education ─────────────────────────────────────────────────
export const EDUCATION = [
  {
    degree: 'Bachelor of Science in Information Technology',
    institution: 'Quezon City University',
    period: '2023 - Present',
    description: 'Currently pursuing IT degree. Learning modern web technologies such as React, PHP, and MySQL.',
    highlights: [
      'Building personal projects to enhance development skills',
      'Focused on web development and modern frameworks',
      'Active participation in coding projects and collaborative work',
    ],
  },
  {
    degree: 'Senior High School Graduate',
    institution: 'Commonwealth High School',
    period: '2022 - 2023',
    description: 'Graduated with consistent honors, maintaining a 93 average.',
    highlights: [
      'Strong foundation in computer literacy',
      'Basic programming concepts and problem-solving',
      'Active participation in school projects',
    ],
  },
];

// ── Certifications ────────────────────────────────────────────
export type CertCategory = 'Coursera' | 'Participation';

export const CERTIFICATIONS: Array<{
  name: string;
  issuer: string;
  date: string;
  category: CertCategory;
  image: string;
}> = [
  { name: 'Google UX Design Specialization',                      issuer: 'Google',      date: 'Apr 2025', category: 'Coursera',      image: '/Certificates/Google UX Specialization.png' },
  { name: 'Google AI Specialization',                             issuer: 'Google',      date: '2025',     category: 'Coursera',      image: '/Certificates/Google AI Specialization.png' },
  { name: 'Technical Support Fundamentals',                       issuer: 'Google',      date: 'Dec 2025', category: 'Coursera',      image: '/Certificates/Technical Support Fundamentals.png' },
  { name: 'Foundation of Project Management',                     issuer: 'Google',      date: 'Dec 2025', category: 'Coursera',      image: '/Certificates/Foundation of Project Management.png' },
  { name: 'Project Initiation: Starting a Successful Project',    issuer: 'Google',      date: 'Dec 2025', category: 'Coursera',      image: '/Certificates/Project Initiation Starting a Successful Project.png' },
  { name: 'Build Dynamic User Interfaces (UI) for Websites',      issuer: 'Google',      date: 'Apr 2025', category: 'Coursera',      image: '/Certificates/Build Dynamic User Interfaces (UI) for Websites.png' },
  { name: 'Design a User Experience for Social Good & Prepare for Jobs', issuer: 'Google', date: 'Apr 2025', category: 'Coursera',   image: '/Certificates/Design a User Experience for Social Good.png' },
  { name: 'Build Wireframes and Low-Fidelity Prototypes',         issuer: 'Google',      date: 'Mar 2025', category: 'Coursera',      image: '/Certificates/Build Wireframes and Low Fidelity Prototypes.png' },
  { name: 'Conduct UX Research and Test Early Concepts',          issuer: 'Google',      date: 'Mar 2025', category: 'Coursera',      image: '/Certificates/Conduct UX Research .png' },
  { name: 'Create High-Fidelity Designs and Prototypes in Figma', issuer: 'Google',      date: 'Mar 2025', category: 'Coursera',      image: '/Certificates/Create High Fidelity Designs and Prototypes.png' },
  { name: 'Foundations of User Experience (UX) Design',          issuer: 'Google',      date: 'Feb 2025', category: 'Coursera',      image: '/Certificates/Foundation of User Experience.png' },
  { name: 'Start the UX Design Process: Empathize, Define, and Ideate', issuer: 'Google', date: 'Feb 2025', category: 'Coursera',    image: '/Certificates/Start the UX design.png' },
  { name: 'AI Fundamentals',                                      issuer: 'Microsoft',   date: '2025',     category: 'Coursera',      image: '/Certificates/AI Fundamentals.png' },
  { name: 'AI for Writing and Communicating',                     issuer: 'Microsoft',   date: '2025',     category: 'Coursera',      image: '/Certificates/AI for Writing and Communicating.png' },
  { name: 'AI for Research and Insights',                         issuer: 'Microsoft',   date: '2025',     category: 'Coursera',      image: '/Certificates/AI for Research and Insights.png' },
  { name: 'AI For Data Analysis',                                 issuer: 'Microsoft',   date: '2025',     category: 'Coursera',      image: '/Certificates/AI For Data Analysis.jpg' },
  { name: 'AI for Content Creation',                              issuer: 'Microsoft',   date: '2025',     category: 'Coursera',      image: '/Certificates/AI for Content Creation.png' },
  { name: 'AI For Brainstorming And Planning',                    issuer: 'Microsoft',   date: '2025',     category: 'Coursera',      image: '/Certificates/AI For Brainstormiing And Planning.png' },
  { name: 'AI For App Building',                                  issuer: 'Microsoft',   date: '2025',     category: 'Coursera',      image: '/Certificates/AI For App Building.png' },
  { name: 'IGNITE Summit 2023 (Participation)',                   issuer: 'IGNITE',      date: '2023',     category: 'Participation', image: '/Certificates/IGNITE Summit 2023 (Participation).png' },
  { name: 'Cybersecure U: Defending The Digital World (Participation)', issuer: 'Cybersecure U', date: '2024', category: 'Participation', image: '/Certificates/Cybersecure U Defending The Digital World (Participation).png' },
  { name: 'Alumni Talks (Participation)',                         issuer: 'Alumni',      date: '2024',     category: 'Participation', image: '/Certificates/Alumni Talks (Participation).png' },
];

// ── Projects ──────────────────────────────────────────────────
export const PROJECTS = [
  {
    title: 'Schatzies Events',
    description: 'A professional event planning website showcasing services, portfolio, and client testimonials. Built as a front-end developer, delivering a modern and responsive user experience.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    github: 'https://github.com/batdimoiprint/schatzies-events',
    demo: 'https://www.schatziesevents.com/',
    role: 'Front-End Developer',
    accent: '#f59e0b',
    featured: true,
  },
  {
    title: 'SyncStudy',
    description: 'Full-stack collaborative workspace for students featuring a Kanban board, AI study assistant, budget tracker, and live study rooms with video/audio calling.',
    technologies: ['React', 'Node.js', 'Socket.IO', 'Prisma'],
    github: 'https://github.com/EYRON27/SyncStudy',
    demo: 'https://sync-study-ten.vercel.app/',
    role: 'Full Stack',
    accent: '#3b82f6',
  },
  {
    title: 'Algorithm Portfolio',
    description: 'Comprehensive compilation portfolio with algorithm implementations, a macOS-inspired UI, interactive demos, and a dynamic theme switcher.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    github: 'https://github.com/EYRON27/aaron-compilation-portfolio',
    demo: 'https://aaron-compilation-portfolio.vercel.app/',
    role: 'Frontend Developer',
    accent: '#8b5cf6',
  },
  {
    title: 'LinguaLink',
    description: 'Flutter + Firebase mobile app with real-time translation, OCR, and vocabulary mini-games using Trie & Levenshtein distance algorithms.',
    technologies: ['Flutter', 'Dart', 'Firebase'],
    github: 'https://github.com/Uryegedon/smarttranslate',
    demo: '',
    role: 'Frontend Developer',
    accent: '#06b6d4',
  },
  {
    title: 'AarvieveLifeSync',
    description: 'All-in-one personal productivity hub: task management, expense tracking, and secure password manager built solo.',
    technologies: ['React', 'Express', 'TypeScript', 'Firebase'],
    github: 'https://github.com/EYRON27/AarvieveLifeSync',
    demo: 'https://aarvieve-life-sync-website.vercel.app/',
    role: 'Full Stack',
    accent: '#10b981',
  },
  {
    title: 'MySuperSystem2025',
    description: 'Full-stack ASP.NET Core MVC app with expense tracking, task management, and secure password manager using Clean Architecture.',
    technologies: ['C#', 'ASP.NET Core MVC', 'EF Core', 'SQL Server'],
    github: 'https://github.com/EYRON27/MySuperSystem2025',
    demo: '',
    role: 'Full Stack',
    accent: '#f43f5e',
  },
  {
    title: 'RL Phil Construction',
    description: 'Responsive static website for a professional construction company emphasizing clarity, trust, and usability.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    github: 'https://github.com/EYRON27/rl-phil',
    demo: 'https://rl-phil-construction.vercel.app',
    role: 'Front-End Developer',
    accent: '#64748b',
  },
];
