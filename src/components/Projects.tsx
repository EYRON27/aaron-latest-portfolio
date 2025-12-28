import { ExternalLink, Github, FolderGit2 } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'MoneyFlow Tracker',
      description: 'A personal finance web app that helps users monitor their income and expenses. It provides daily, weekly, and monthly insights to understand spending habits and manage budgets effectively.',
      technologies: ['PHP', 'HTML', 'CSS', 'MySQL', 'JavaScript'],
      github: 'https://github.com/EYRON27',
      demo: '',
      image: 'gradient-1',
    },
    {
      title: 'OneForAll',
      description: 'A comprehensive project that holds your passwords, tasks to do, and money flow tracker all in one place.',
      technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Tailwind CSS'],
      github: 'https://github.com/EYRON27/OneForAll',
      demo: 'https://all-for-one-theta.vercel.app/',
      image: 'gradient-2',
    },
    {
      title: 'MySuperSystem2025',
      description: 'Full-stack ASP.NET Core MVC application featuring expense tracking, task management, and a secure password manager. Built with Clean Architecture, Entity Framework Core, SQL Server, and ASP.NET Identity focused on security, scalability, and maintainable enterprise design.',
      technologies: ['C#', 'ASP.NET Core MVC', 'EF Core', 'SQL Server'],
      github: 'https://github.com/EYRON27/MySuperSystem2025',
      demo: '',
      image: 'gradient-4',
    },
    {
      title: 'Weather Dashboard',
      description: 'A responsive weather dashboard with location-based forecasts, interactive maps, and detailed weather analytics.',
      technologies: ['React', 'Chart.js', 'OpenWeather API', 'Leaflet'],
      github: 'https://github.com/EYRON27',
      demo: 'https://demo.com',
      image: 'gradient-3',
    },
  ];

  const gradients = {
    'gradient-1': 'from-cyan-500 to-blue-500',
    'gradient-2': 'from-blue-500 to-teal-500',
    'gradient-3': 'from-teal-500 to-green-500',
    'gradient-4': 'from-green-500 to-emerald-500',
    'gradient-5': 'from-emerald-500 to-cyan-500',
    'gradient-6': 'from-cyan-500 to-blue-600',
  };

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Featured <span className="text-cyan-500 dark:text-cyan-400">Projects</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4">
            A selection of my recent work and personal projects showcasing my skills and creativity
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-900/50 rounded-xl border border-gray-200 dark:border-slate-700/50 overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10 group"
            >
              <div className={`h-48 bg-gradient-to-br ${gradients[project.image as keyof typeof gradients]} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/40 transition-colors duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <FolderGit2 className="w-16 h-16 text-white/50 group-hover:text-white/70 transition-colors duration-300" />
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-xs font-medium rounded-full border border-cyan-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center space-x-4 pt-4 border-t border-gray-200 dark:border-slate-700/50">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors text-sm"
                  >
                    <Github className="w-4 h-4" />
                    <span>Code</span>
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://github.com/EYRON27"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-transparent hover:bg-gray-100 dark:hover:bg-slate-900 text-cyan-500 dark:text-cyan-400 px-6 py-3 rounded-lg font-medium border-2 border-cyan-500/50 hover:border-cyan-500 transition-all duration-200"
          >
            <Github className="w-5 h-5" />
            <span>View More on GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
