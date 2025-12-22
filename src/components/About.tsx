import { User, Target, Award, Coffee } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: User,
      title: 'Who I Am',
      description: 'A dedicated IT student with a passion for creating elegant solutions to complex problems.',
    },
    {
      icon: Target,
      title: 'My Goal',
      description: 'To become a skilled full-stack developer and contribute to innovative tech projects.',
    },
    {
      icon: Award,
      title: 'My Approach',
      description: 'I believe in writing clean, maintainable code and following industry best practices.',
    },
    {
      icon: Coffee,
      title: 'Beyond Code',
      description: 'When not coding, I enjoy exploring new technologies, contributing to open source, and learning.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About <span className="text-cyan-400">Me</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Get to know more about who I am, what I do, and what I'm passionate about
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-lg hover:shadow-cyan-500/10"
              >
                <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-slate-900/50 p-8 md:p-12 rounded-xl border border-slate-700/50">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">My Journey</h3>
          <div className="space-y-4 text-gray-400 leading-relaxed">
            <p>
              I'm currently pursuing my degree in Computer Science with a focus on software development
              and modern web technologies. My journey into programming began during high school when I
              created my first website, and I've been hooked ever since.
            </p>
            <p>
              Throughout my academic career, I've worked on numerous projects ranging from simple web
              applications to complex full-stack systems. I'm particularly interested in cloud computing,
              DevOps practices, and building scalable applications that solve real-world problems.
            </p>
            <p>
              I'm always eager to learn new technologies and improve my skills. Currently, I'm diving
              deep into React, Node.js, and cloud platforms like AWS. I believe in continuous learning
              and staying updated with the latest industry trends.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
