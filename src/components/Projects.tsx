import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'Schatzies Events',
      description: 'A professional event planning website showcasing services, portfolio, and client testimonials. Built as a front-end developer, delivering a modern and responsive user experience.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
      github: 'https://github.com/batdimoiprint/schatzies-events',
      demo: 'https://www.schatziesevents.com/',
      role: 'Front-End Developer',
    },
    {
      title: 'MoneyFlow Tracker',
      description: 'A personal finance web app that helps users monitor their income and expenses. It provides daily, weekly, and monthly insights to understand spending habits and manage budgets effectively.',
      technologies: ['PHP', 'HTML', 'CSS', 'MySQL', 'JavaScript'],
      github: 'https://github.com/EYRON27',
      demo: '',
    },
    {
      title: 'OneForAll',
      description: 'A comprehensive project that holds your passwords, tasks to do, and money flow tracker all in one place.',
      technologies: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS'],
      github: 'https://github.com/EYRON27/OneForAll',
      demo: 'https://all-for-one-theta.vercel.app/',
    },
    {
      title: 'MySuperSystem2025',
      description: 'Full-stack ASP.NET Core MVC application featuring expense tracking, task management, and a secure password manager with Clean Architecture.',
      technologies: ['C#', 'ASP.NET Core MVC', 'EF Core', 'SQL Server'],
      github: 'https://github.com/EYRON27/MySuperSystem2025',
      demo: '',
    },
    {
      title: 'RL Phil Construction',
      description: 'A responsive static website designed to represent a professional construction company brand, emphasizing clarity, trust, and usability.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
      github: 'https://github.com/EYRON27/rl-phil',
      demo: 'https://rl-phil-construction.vercel.app',
    },
  ];

  return (
    <section id="projects" className="py-24 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-12">
          <div className="h-px w-12 bg-amber-500"></div>
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
            className="text-neutral-400 hover:text-amber-500 text-sm font-medium transition-colors flex items-center gap-1.5"
          >
            View all on GitHub
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Featured project */}
        <div className="mb-8 group">
          <div className="p-8 sm:p-10 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-amber-500/30 transition-colors">
            <div className="flex items-start justify-between mb-6">
              <span className="text-amber-500 text-xs font-mono tracking-wider">01</span>
              <div className="flex gap-3">
                <a href={projects[0].github} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                {projects[0].demo && (
                  <a href={projects[0].demo} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-3 group-hover:text-amber-500 transition-colors">{projects[0].title}</h3>
            <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed mb-6 max-w-2xl">{projects[0].description}</p>
            <div className="flex flex-wrap gap-2">
              {projects[0].technologies.map((tech, i) => (
                <span key={i} className="px-3 py-1 text-xs font-medium bg-neutral-200/80 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Other projects */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(1).map((project, index) => (
            <div key={index} className="group p-6 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-amber-500/30 transition-colors flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <span className="text-amber-500 text-xs font-mono tracking-wider">0{index + 2}</span>
                <div className="flex gap-3">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                    <Github className="w-4 h-4" />
                  </a>
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-amber-500 transition-colors">{project.title}</h3>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed mb-4 flex-1">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="px-2.5 py-1 text-xs font-medium bg-neutral-200/80 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
