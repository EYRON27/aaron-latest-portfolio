import { User, Target, Award, Coffee } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: User,
      title: 'Clean Code',
      description: 'Writing maintainable and scalable code with best practices',
    },
    {
      icon: Target,
      title: 'UI/UX Design',
      description: 'Creating intuitive and beautiful user experiences',
    },
    {
      icon: Award,
      title: 'Consistent',
      description: 'Passionate about making applications run efficiently and perform at their best',
    },
    {
      icon: Coffee,
      title: 'Always Learning',
      description: 'Constantly exploring new technologies and building side projects',
    },
  ];

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About <span className="text-cyan-500 dark:text-cyan-400">Me</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Get to know more about who I am, what I do, and what I'm passionate about
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border border-gray-200 dark:border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-lg hover:shadow-cyan-500/10"
              >
                <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-cyan-500 dark:text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-white dark:bg-slate-900/50 p-8 md:p-12 rounded-xl border border-gray-200 dark:border-slate-700/50">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">My Journey</h3>
          <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            <p>
              I'm a web development student who loves learning new technologies and building responsive, 
              accessible, and efficient websites and applications. Currently pursuing a Bachelor of Science 
              in Information Technology at Quezon City University.
            </p>
            <p>
              When I'm not busy coding or studying, I like trying out new tech, building side projects, 
              and connecting with other students who share the same passion for development. I believe in 
              creating digital experiences that matter and focusing on both functionality and aesthetics.
            </p>
            <p>
              I'm particularly passionate about front-end development and UI/UX design, always striving to 
              create web experiences that are not only visually stunning but also fast and accessible to everyone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
