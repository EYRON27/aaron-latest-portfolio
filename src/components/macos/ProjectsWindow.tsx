import React from 'react';
import { ArrowUpRight, Github } from 'lucide-react';

const ProjectsWindow = ({ isDark = false }: { isDark?: boolean }) => {
  const cardBg = isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-100';
  const titleColor = isDark ? 'text-white' : 'text-slate-800';
  const descColor = isDark ? 'text-white/60' : 'text-slate-500';
  const tagBg = isDark ? 'bg-white/10 text-white/80' : 'bg-neutral-100 text-slate-600';
  const roleBg = isDark ? 'bg-amber-500/20 text-amber-300' : 'bg-amber-100 text-amber-700';
  const iconBtn = isDark ? 'bg-white/10 hover:bg-white/20 text-white/70 hover:text-white' : 'bg-neutral-100 hover:bg-neutral-200 text-slate-500 hover:text-slate-800';

  const projects = [
    {
      title: 'Schatzies Events',
      description: 'A professional event planning website showcasing services, portfolio, and client testimonials. Built as a front-end developer, delivering a modern and responsive user experience.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
      github: 'https://github.com/batdimoiprint/schatzies-events',
      demo: 'https://www.schatziesevents.com/',
      role: 'Front-End Developer',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      title: 'SyncStudy',
      description: 'Full-stack collaborative workspace for students featuring a Kanban board, AI study assistant, budget tracker, and live study rooms with video/audio calling.',
      technologies: ['React', 'Node.js', 'Socket.IO', 'Prisma'],
      github: 'https://github.com/EYRON27/SyncStudy',
      demo: 'https://sync-study-ten.vercel.app/',
      role: 'Full Stack',
      color: 'from-cyan-500 to-blue-600',
    },
    {
      title: 'Algorithm Portfolio',
      description: 'A comprehensive compilation portfolio showcasing algorithm implementations and problem-solving approaches for academic coursework. Features a beautiful macOS-inspired UI with interactive demonstrations, code examples, and a dynamic theme switcher.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
      github: 'https://github.com/EYRON27/aaron-compilation-portfolio',
      demo: 'https://aaron-compilation-portfolio.vercel.app/',
      color: 'from-rose-500 to-orange-600',
    },
    {
      title: 'LinguaLink',
      description: 'I am the Frontend Developer for LinguaLink — a Flutter + Firebase mobile app offering real-time translation, OCR text extraction, and vocabulary mini-games; uses Trie, Levenshtein distance, and greedy algorithms for fast autocomplete, spelling correction, and accurate translation suggestions.',
      technologies: ['Flutter', 'Dart', 'Firebase'],
      github: 'https://github.com/Uryegedon/smarttranslate',
      demo: '',
      color: 'from-emerald-500 to-teal-600',
      role: 'Frontend Developer',
    },
    {
      title: 'AarvieveLifeSync',
      description: 'AarvieveLifeSync is an all-in-one personal productivity hub. Manage tasks, track expenses, secure passwords, and more. Full-stack development by a solo developer using React, Express, TypeScript, and Firebase.',
      technologies: ['React', 'Express', 'TypeScript', 'Firebase'],
      github: 'https://github.com/EYRON27/AarvieveLifeSync',
      demo: 'https://aarvieve-life-sync-website.vercel.app/',
      color: 'from-amber-500 to-yellow-600',
      role: 'Full Stack (solo dev)',
    },
    {
      title: 'MySuperSystem2025',
      description: 'Full-stack ASP.NET Core MVC application featuring expense tracking, task management, and a secure password manager with Clean Architecture.',
      technologies: ['C#', 'ASP.NET Core MVC', 'EF Core', 'SQL Server'],
      github: 'https://github.com/EYRON27/MySuperSystem2025',
      demo: '',
      color: 'from-purple-500 to-fuchsia-600',
    },
    {
      title: 'RL Phil Construction',
      description: 'A responsive static website designed to represent a professional construction company brand, emphasizing clarity, trust, and usability.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
      github: 'https://github.com/EYRON27/rl-phil',
      demo: 'https://rl-phil-construction.vercel.app',
      color: 'from-slate-500 to-gray-600',
    },
  ];

  return (
    <div className="p-8 h-[65vh] overflow-y-auto custom-scrollbar">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className={`rounded-2xl border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col overflow-hidden ${cardBg}`}
          >
            {/* Colored top accent bar */}
            <div className={`h-1.5 w-full bg-gradient-to-r ${project.color}`} />

            <div className="p-6 flex flex-col flex-1">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className={`font-bold text-lg leading-tight ${titleColor}`}>{project.title}</h3>
                  {project.role && (
                    <span className={`inline-block mt-1.5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-md ${roleBg}`}>
                      {project.role}
                    </span>
                  )}
                </div>
                <div className="flex gap-2 ml-3 shrink-0">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${iconBtn}`}
                    title="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${iconBtn}`}
                      title="Live Demo"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className={`text-sm leading-relaxed flex-1 mb-4 ${descColor}`}>{project.description}</p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((t) => (
                  <span key={t} className={`px-2.5 py-1 text-[10px] font-bold tracking-wide uppercase rounded-lg ${tagBg}`}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsWindow;
