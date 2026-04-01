import { Code2, Server, Database, Wrench, Users } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      icon: Code2,
      title: 'Frontend',
      skills: ['HTML', 'React', 'TypeScript', 'Tailwind CSS'],
    },
    {
      icon: Server,
      title: 'Backend',
      skills: ['JavaScript', 'Node.js', 'Express'],
    },
    {
      icon: Database,
      title: 'Databases',
      skills: ['MySQL', 'MSSQL'],
    },
    {
      icon: Wrench,
      title: 'Tools',
      skills: ['Git', 'Figma'],
    },
    {
      icon: Users,
      title: 'Soft Skills',
      skills: ['Communication', 'Work Under Pressure', 'Teamwork'],
    },
  ];

  return (
    <section id="skills" className="py-24 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-12">
          <div className="h-px w-12 bg-amber-500"></div>
          <span className="text-amber-500 text-sm font-medium tracking-wider uppercase">Skills</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-16">
          Tools & technologies<span className="text-amber-500">.</span>
        </h2>

        <div className="space-y-8">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 pb-8 border-b border-neutral-100 dark:border-neutral-800/50 last:border-0 last:pb-0">
                <div className="flex items-center gap-3 sm:w-40 flex-shrink-0">
                  <Icon className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-semibold tracking-wide uppercase text-neutral-500">{category.title}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 text-sm font-medium rounded-full border border-neutral-200 dark:border-neutral-700/50 hover:border-amber-500/50 hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 p-6 rounded-2xl bg-neutral-100/50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
          <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed text-center max-w-2xl mx-auto">
            Currently deepening my expertise in React, TypeScript, and modern web development practices.
            Always eager to learn new tools and frameworks.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Skills;
