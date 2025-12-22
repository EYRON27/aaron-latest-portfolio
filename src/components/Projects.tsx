import { ExternalLink, Github, FolderGit2 } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with user authentication, product management, shopping cart, and payment integration. Built with modern best practices and responsive design.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      image: 'gradient-1',
    },
    {
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, team collaboration features, and intuitive drag-and-drop interface for organizing projects.',
      technologies: ['React', 'Firebase', 'TypeScript', 'Material-UI'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      image: 'gradient-2',
    },
    {
      title: 'Weather Dashboard',
      description: 'An interactive weather dashboard that provides real-time weather data, forecasts, and visualizations. Features location-based weather tracking and historical data analysis.',
      technologies: ['React', 'OpenWeather API', 'Chart.js', 'Tailwind CSS'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      image: 'gradient-3',
    },
    {
      title: 'Social Media Analytics',
      description: 'A comprehensive analytics tool for tracking social media metrics, engagement rates, and audience insights. Includes data visualization and automated reporting.',
      technologies: ['Next.js', 'PostgreSQL', 'Prisma', 'Recharts'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      image: 'gradient-4',
    },
    {
      title: 'Portfolio Generator',
      description: 'A dynamic portfolio generator that allows users to create beautiful portfolio websites without coding. Features customizable themes and templates.',
      technologies: ['React', 'Node.js', 'Express', 'AWS S3'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      image: 'gradient-5',
    },
    {
      title: 'Chat Application',
      description: 'A real-time chat application with private messaging, group chats, file sharing, and emoji support. Built with WebSocket for instant communication.',
      technologies: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      image: 'gradient-6',
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
    <section id="projects" className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured <span className="text-cyan-400">Projects</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A selection of my recent work and personal projects showcasing my skills and creativity
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-slate-900/50 rounded-xl border border-slate-700/50 overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10 group"
            >
              <div className={`h-48 bg-gradient-to-br ${gradients[project.image as keyof typeof gradients]} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/40 transition-colors duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <FolderGit2 className="w-16 h-16 text-white/50 group-hover:text-white/70 transition-colors duration-300" />
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
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

                <div className="flex items-center space-x-4 pt-4 border-t border-slate-700/50">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                  >
                    <Github className="w-4 h-4" />
                    <span>Code</span>
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-transparent hover:bg-slate-900 text-cyan-400 px-6 py-3 rounded-lg font-medium border-2 border-cyan-500/50 hover:border-cyan-500 transition-all duration-200"
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
