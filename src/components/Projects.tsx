import { useRef, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const projects = [
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
    title: 'Algorithm Portfolio',
    description: 'A comprehensive compilation portfolio showcasing algorithm implementations with a beautiful macOS-inspired UI, interactive demos, and dynamic theme switcher.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    github: 'https://github.com/EYRON27/aaron-compilation-portfolio',
    demo: 'https://aaron-compilation-portfolio.vercel.app/',
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
    description: 'All-in-one personal productivity hub: task management, expense tracking, and secure password manager.',
    technologies: ['React', 'Express', 'TypeScript', 'Firebase'],
    github: 'https://github.com/EYRON27/AarvieveLifeSync',
    demo: 'https://aarvieve-life-sync-website.vercel.app/',
    role: 'Full Stack (solo dev)',
    accent: '#10b981',
  },
  {
    title: 'MySuperSystem2025',
    description: 'Full-stack ASP.NET Core MVC application with expense tracking, task management, and Clean Architecture.',
    technologies: ['C#', 'ASP.NET Core MVC', 'EF Core', 'SQL Server'],
    github: 'https://github.com/EYRON27/MySuperSystem2025',
    demo: '',
    accent: '#f43f5e',
  },
  {
    title: 'RL Phil Construction',
    description: 'Responsive static website for a professional construction company brand emphasizing clarity, trust, and usability.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    github: 'https://github.com/EYRON27/rl-phil',
    demo: 'https://rl-phil-construction.vercel.app',
    accent: '#64748b',
  },
];

// ── Magnetic 3D project card ───────────────────────────────────────────────────
const ProjectCard = ({ project, index, large = false }: {
  project: typeof projects[0];
  index: number;
  large?: boolean;
}) => {
  const { ref, visible } = useScrollReveal(0.1);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, shine: { x: 50, y: 50 } });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      x: (y - 0.5) * -10,
      y: (x - 0.5) * 10,
      shine: { x: x * 100, y: y * 100 },
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, shine: { x: 50, y: 50 } });
    setHovered(false);
  };

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 100}ms`, perspective: '800px' }}
    >
      <div
        ref={cardRef}
        className={`relative group ${large ? 'p-8 sm:p-10' : 'p-6'} rounded-2xl flex flex-col cursor-default h-full`}
        style={{
          border: `1px solid ${hovered ? project.accent + '40' : 'rgba(128,128,128,0.15)'}`,
          background: hovered
            ? `linear-gradient(135deg, ${project.accent}06, rgba(0,0,0,0))`
            : 'rgba(128,128,128,0.03)',
          transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${hovered ? 'scale(1.01) translateZ(10px)' : 'scale(1) translateZ(0)'}`,
          transition: hovered
            ? 'transform 0.1s ease-out, border-color 0.3s, background 0.3s, box-shadow 0.3s'
            : 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1), border-color 0.3s, background 0.3s, box-shadow 0.3s',
          boxShadow: hovered ? `0 25px 60px ${project.accent}15, 0 0 0 1px ${project.accent}20` : 'none',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        {/* Shine overlay */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${tilt.shine.x}% ${tilt.shine.y}%, rgba(255,255,255,0.06), transparent 60%)`,
            opacity: hovered ? 1 : 0,
          }}
        />

        {/* Top accent line */}
        <div
          className="absolute top-0 left-6 right-6 h-px rounded-full transition-all duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
          }}
        />

        {/* Header */}
        <div className="flex items-start justify-between mb-4 relative z-10">
          <span
            className="text-xs font-mono tracking-wider transition-colors duration-300"
            style={{ color: project.accent }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="flex gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 transition-all duration-300 hover:scale-110"
              style={{ '--hover-color': project.accent } as React.CSSProperties}
              onMouseEnter={e => (e.currentTarget.style.color = project.accent)}
              onMouseLeave={e => (e.currentTarget.style.color = '')}
            >
              <Github className={large ? 'w-5 h-5' : 'w-4 h-4'} />
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 transition-all duration-300 hover:scale-110"
                onMouseEnter={e => (e.currentTarget.style.color = project.accent)}
                onMouseLeave={e => (e.currentTarget.style.color = '')}
              >
                <ExternalLink className={large ? 'w-5 h-5' : 'w-4 h-4'} />
              </a>
            )}
          </div>
        </div>

        {/* Title */}
        <h3
          className={`${large ? 'text-2xl sm:text-3xl' : 'text-lg'} font-bold mb-3 transition-colors duration-300 relative z-10`}
          style={{ color: hovered ? project.accent : undefined }}
        >
          {project.title}
        </h3>

        {/* Role badge */}
        {project.role && (
          <span
            className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase mb-3 w-fit"
            style={{ background: project.accent + '20', color: project.accent }}
          >
            {project.role}
          </span>
        )}

        {/* Description */}
        <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed mb-6 flex-1 relative z-10 text-sm">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 relative z-10">
          {project.technologies.map(tech => (
            <span
              key={tech}
              className="px-2.5 py-1 text-xs font-medium rounded-full transition-all duration-300"
              style={{
                border: '1px solid rgba(128,128,128,0.2)',
                background: 'transparent',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLSpanElement).style.borderColor = project.accent + '60';
                (e.currentTarget as HTMLSpanElement).style.color = project.accent;
                (e.currentTarget as HTMLSpanElement).style.background = project.accent + '10';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLSpanElement).style.borderColor = '';
                (e.currentTarget as HTMLSpanElement).style.color = '';
                (e.currentTarget as HTMLSpanElement).style.background = '';
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Section ───────────────────────────────────────────────────────────────────
const Projects = () => {
  const { ref: headRef, visible: headVisible } = useScrollReveal(0.1);

  return (
    <section id="projects" className="py-24 border-t border-neutral-200 dark:border-neutral-800 relative overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 40% at 50% 100%, rgba(245,158,11,0.03) 0%, transparent 100%)' }}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className={`transition-all duration-700 ${headVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="flex items-center gap-3 mb-12">
            <div className="h-px w-12 bg-amber-500" />
            <span className="text-amber-500 text-sm font-medium tracking-wider uppercase">Projects</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Selected work<span className="text-amber-500">.</span>
            </h2>
            <a
              href="https://github.com/EYRON27"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 text-neutral-400 hover:text-amber-500 text-sm font-medium transition-all duration-300"
            >
              View all on GitHub
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </a>
          </div>
        </div>

        {/* Featured */}
        <div className="mb-8">
          <ProjectCard project={projects[0]} index={0} large />
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.slice(1).map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
