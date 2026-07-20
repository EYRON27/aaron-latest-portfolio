import { useRef, useState } from 'react';
import { ExternalLink, Github, ArrowUpRight, Globe } from 'lucide-react';
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
    accent: '#f43f5e',
  },
  {
    title: 'RL Phil Construction',
    description: 'Responsive static website for a professional construction company emphasizing clarity, trust, and usability.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    github: 'https://github.com/EYRON27/rl-phil',
    demo: 'https://rl-phil-construction.vercel.app',
    accent: '#64748b',
  },
];

// ─── Floating Preview ──────────────────────────────────────────────────────────
interface FloatingPreviewProps {
  url: string;
  accent: string;
  visible: boolean;
  x: number;
  y: number;
}

const FloatingPreview = ({ url, accent, visible, x, y }: FloatingPreviewProps) => (
  <div
    style={{
      position: 'fixed',
      left: x,
      top: y,
      width: 320,
      pointerEvents: 'none',
      zIndex: 9999,
      borderRadius: 12,
      overflow: 'hidden',
      border: `1px solid ${accent}50`,
      background: '#0d0d0d',
      opacity: visible ? 1 : 0,
      transform: visible
        ? 'translate(-50%, calc(-100% - 18px)) scale(1) rotateX(0deg)'
        : 'translate(-50%, calc(-100% - 18px)) scale(0.88) rotateX(10deg)',
      boxShadow: visible
        ? `0 28px 70px rgba(0,0,0,0.5), 0 0 0 1px ${accent}28, 0 0 50px ${accent}12`
        : 'none',
      transition: 'opacity 0.3s cubic-bezier(0.22,1,0.36,1), transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease',
      transformOrigin: 'bottom center',
    }}
  >
    {/* Browser chrome bar */}
    <div style={{
      display: 'flex', alignItems: 'center', gap: 6,
      padding: '6px 10px',
      background: accent + '15',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
        {['#ff5f57','#febc2e','#28c840'].map(c => (
          <span key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c, display: 'block' }} />
        ))}
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 4,
        background: 'rgba(255,255,255,0.06)', borderRadius: 4,
        padding: '2px 8px', flex: 1, overflow: 'hidden',
        fontSize: '0.6rem', color: 'rgba(200,200,200,0.5)', whiteSpace: 'nowrap',
      }}>
        <Globe size={9} style={{ color: accent, flexShrink: 0 }} />
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
        </span>
      </div>
    </div>

    {/* iFrame screenshot */}
    <div style={{ position: 'relative', width: '100%', height: 190, overflow: 'hidden', background: '#111' }}>
      <iframe
        src={url}
        title="site preview"
        scrolling="no"
        style={{
          width: '200%', height: '380px',
          border: 'none',
          transform: 'scale(0.5)',
          transformOrigin: 'top left',
          pointerEvents: 'none',
          display: 'block',
        }}
        loading="lazy"
      />
      {/* Fade overlay at bottom */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `linear-gradient(to top, ${accent}20 0%, transparent 60%)`,
      }} />
    </div>

    {/* Bottom accent glow line */}
    <div style={{
      height: 2,
      background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
    }} />
  </div>
);

// ─── 3D Magnetic Card ──────────────────────────────────────────────────────────
const ProjectCard = ({
  project,
  index,
  large = false,
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
}: {
  project: typeof projects[0];
  index: number;
  large?: boolean;
  onMouseMove: (e: React.MouseEvent, p: typeof projects[0]) => void;
  onMouseEnter: (p: typeof projects[0]) => void;
  onMouseLeave: () => void;
}) => {
  const { ref, visible } = useScrollReveal(0.08);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, shine: { x: 50, y: 50 } });
  const [hovered, setHovered] = useState(false);
  const [exploding, setExploding] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    const el = cardRef.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    setTilt({ x: (y - 0.5) * -12, y: (x - 0.5) * 12, shine: { x: x * 100, y: y * 100 } });
    onMouseMove(e, project);
  };

  const onEnter = () => {
    setHovered(true);
    setExploding(true);
    setTimeout(() => setExploding(false), 600);
    onMouseEnter(project);
  };

  const onLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0, shine: { x: 50, y: 50 } });
    onMouseLeave();
  };

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-14'}`}
      style={{ transitionDelay: `${index * 90}ms`, perspective: '900px' }}
    >
      <div
        ref={cardRef}
        className={`relative group ${large ? 'p-8 sm:p-10' : 'p-6'} rounded-2xl flex flex-col h-full cursor-default overflow-hidden`}
        style={{
          border: `1px solid ${hovered ? project.accent + '45' : 'rgba(128,128,128,0.13)'}`,
          background: hovered
            ? `linear-gradient(145deg, ${project.accent}07, rgba(0,0,0,0))`
            : 'rgba(128,128,128,0.025)',
          transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${hovered ? 'scale(1.015) translateZ(16px)' : 'scale(1)'}`,
          transition: hovered
            ? 'transform 0.08s ease-out, border-color 0.3s, background 0.3s, box-shadow 0.3s'
            : 'transform 0.55s cubic-bezier(0.34,1.56,0.64,1), border-color 0.3s, background 0.3s, box-shadow 0.3s',
          boxShadow: hovered ? `0 30px 70px ${project.accent}18, 0 0 0 1px ${project.accent}22` : 'none',
        }}
        onMouseMove={onMove}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        {/* Corner burst on enter */}
        {exploding && (
          <div
            className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${project.accent}60, transparent)`,
              transform: 'translate(30%,-30%)',
              animation: 'card-burst 0.6s ease-out forwards',
            }}
          />
        )}

        {/* Specular shine */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${tilt.shine.x}% ${tilt.shine.y}%, rgba(255,255,255,0.07), transparent 60%)`,
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.3s',
          }}
        />

        {/* Accent top beam */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] rounded-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
            transition: 'transform 0.4s, opacity 0.4s',
          }}
        />

        {/* Pulsing dot */}
        <div
          className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full"
          style={{
            background: project.accent,
            boxShadow: `0 0 8px ${project.accent}`,
            animation: hovered ? `dot-pulse 1s ease-in-out infinite` : 'none',
          }}
        />

        {/* Header row */}
        <div className="flex items-start justify-between mb-4 relative z-10">
          <span className="text-xs font-mono tracking-widest" style={{ color: project.accent }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="flex gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 transition-all duration-300 hover:scale-125"
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
                className="text-neutral-400 transition-all duration-300 hover:scale-125"
                onMouseEnter={e => (e.currentTarget.style.color = project.accent)}
                onMouseLeave={e => (e.currentTarget.style.color = '')}
              >
                <ArrowUpRight className={large ? 'w-5 h-5' : 'w-4 h-4'} />
              </a>
            )}
          </div>
        </div>

        {/* Title */}
        <h3
          className={`${large ? 'text-2xl sm:text-3xl' : 'text-lg'} font-bold mb-2 transition-colors duration-300 relative z-10`}
          style={{ color: hovered ? project.accent : undefined }}
        >
          {project.title}
        </h3>

        {/* Role badge */}
        {project.role && (
          <span
            className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase mb-3 w-fit"
            style={{ background: project.accent + '18', color: project.accent, border: `1px solid ${project.accent}30` }}
          >
            {project.role}
          </span>
        )}

        {/* Description */}
        <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed mb-5 flex-1 relative z-10 text-sm">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 relative z-10">
          {project.technologies.map((tech, i) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-xs font-medium rounded-full transition-all duration-300 cursor-default"
              style={{
                border: '1px solid rgba(128,128,128,0.18)',
                transitionDelay: hovered ? `${i * 30}ms` : '0ms',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = project.accent + '55';
                el.style.color = project.accent;
                el.style.background = project.accent + '12';
                el.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = '';
                el.style.color = '';
                el.style.background = '';
                el.style.transform = '';
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes card-burst { from { opacity: 0.8; transform: translate(30%,-30%) scale(0.5); } to { opacity: 0; transform: translate(30%,-30%) scale(2); } }
        @keyframes dot-pulse { 0%,100% { transform: scale(1); opacity: 1; } 50% { transform: scale(2); opacity: 0.4; } }
      `}</style>
    </div>
  );
};

// ─── Section ──────────────────────────────────────────────────────────────────
const Projects = () => {
  const { ref: headRef, visible: headVisible } = useScrollReveal(0.1);

  // Floating preview state
  const [preview, setPreview] = useState<{
    project: typeof projects[0] | null;
    x: number;
    y: number;
    visible: boolean;
  }>({ project: null, x: 0, y: 0, visible: false });

  const handleMouseMove = (e: React.MouseEvent, project: typeof projects[0]) => {
    setPreview(prev => ({ ...prev, x: e.clientX, y: e.clientY, project }));
  };

  const handleMouseEnter = (project: typeof projects[0]) => {
    if (!project.demo) return;
    setPreview(prev => ({ ...prev, project, visible: true }));
  };

  const handleMouseLeave = () => {
    setPreview(prev => ({ ...prev, visible: false }));
  };

  return (
    <section id="projects" className="py-24 border-t border-neutral-200 dark:border-neutral-800 relative overflow-hidden">

      {/* Floating preview portal */}
      {preview.project?.demo && (
        <FloatingPreview
          url={preview.project.demo}
          accent={preview.project.accent}
          visible={preview.visible}
          x={preview.x}
          y={preview.y}
        />
      )}

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 110%, rgba(245,158,11,0.04), transparent)' }} />

      {/* Animated grid accent */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015] dark:opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(rgba(245,158,11,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className={`transition-all duration-700 ${headVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="flex items-center gap-3 mb-12">
            <div className="h-px w-12 bg-amber-500" />
            <span className="text-amber-500 text-sm font-medium tracking-widest uppercase">Projects</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
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

        {/* Featured card */}
        <div className="mb-6">
          <ProjectCard
            project={projects[0]}
            index={0}
            large
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.slice(1).map((p, i) => (
            <ProjectCard
              key={p.title}
              project={p}
              index={i + 1}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
