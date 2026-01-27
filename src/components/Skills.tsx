import { Code2, Database, Globe, Server, Wrench, GitBranch, Users, Lightbulb, Target } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      icon: Code2,
      title: 'Frontend',
      skills: [
        { name: 'HTML', level: 95 },
        { name: 'React', level: 70 },
        { name: 'TypeScript', level: 70 },
        { name: 'JavaScript', level: 95 },
        { name: 'Tailwind CSS', level: 75 },
      ],
    },
    {
      icon: Server,
      title: 'Backend',
      skills: [
        { name: 'Node.js', level: 25 },
        { name: 'Express', level: 25 },
      ],
    },
    {
      icon: Database,
      title: 'Databases',
      skills: [
        { name: 'MySQL', level: 96 },
        { name: 'MSSQL', level: 80 },
      ],
    },
    {
      icon: Wrench,
      title: 'Tools',
      skills: [
        { name: 'Git', level: 90 },
        { name: 'Figma', level: 80 },
      ],
    },
    {
      icon: Users,
      title: 'Soft Skills',
      skills: [
        { name: 'Communication', level: 90 },
        { name: 'Work Under Pressure', level: 85 },
        { name: 'Teamwork', level: 95 },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Technical <span className="text-cyan-500 dark:text-cyan-400">Skills</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4">
            A comprehensive overview of my technical expertise and proficiency levels
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-slate-800/50 p-5 sm:p-6 rounded-xl border border-gray-200 dark:border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="flex items-center space-x-3 mb-5 sm:mb-6">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-500 dark:text-cyan-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">{category.title}</h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">{skill.name}</span>
                        <span className="text-cyan-500 dark:text-cyan-400 text-sm font-medium">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-slate-700/50 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-white dark:bg-slate-800/50 p-8 rounded-xl border border-gray-200 dark:border-slate-700/50 text-center">
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            I'm constantly expanding my skill set and staying up-to-date with the latest technologies.
            Currently focusing on mastering React, TypeScript, and modern web development practices.
            Always eager to learn new tools and frameworks that can help build better, faster applications.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Skills;
