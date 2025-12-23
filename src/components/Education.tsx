import { GraduationCap, Award, BookOpen, Calendar } from 'lucide-react';

const Education = () => {
  const education = [
    {
      degree: 'Bachelor of Science in Information Technology',
      institution: 'Quezon City University',
      period: '2023 - Present',
      description: 'Currently pursuing IT degree. Learning and practicing modern web technologies such as React, PHP, and MySQL.',
      highlights: [
        'Building personal projects to enhance front-end and back-end development skills',
        'Focused on web development and modern frameworks',
        'Active participation in coding projects and collaborative work',
      ],
    },
    {
      degree: 'Senior High School Graduate',
      institution: 'Commonwealth High School',
      period: '2022 - 2023',
      description: 'Graduated with consistent honors, maintaining a 93 average.',
      highlights: [
        'Developed strong foundation in computer literacy',
        'Basic programming concepts and problem-solving skills',
        'Active participation in school projects strengthening teamwork skills',
      ],
    },
  ];

  const certifications = [
    {
      name: 'Build Dynamic User Interfaces (UI) for Websites',
      issuer: 'Google',
      date: 'Apr 2025',
      credentialId: 'ZDXNQLN9SAUR',
      icon: Award,
    },
    {
      name: 'Design a User Experience for Social Good & Prepare for Jobs',
      issuer: 'Google',
      date: 'Apr 2025',
      credentialId: 'A3X4R82BF45O',
      icon: Award,
    },
    {
      name: 'Google UX Design Specialization',
      issuer: 'Google',
      date: 'Apr 2025',
      credentialId: 'R699YHN7KNVO',
      icon: Award,
    },
    {
      name: 'Build Wireframes and Low-Fidelity Prototypes',
      issuer: 'Google',
      date: 'Mar 2025',
      credentialId: 'TR3L5XRN5VJA',
      icon: Award,
    },
    {
      name: 'Conduct UX Research and Test Early Concepts',
      issuer: 'Google',
      date: 'Mar 2025',
      credentialId: 'C6ZTB5M2J2KZ',
      icon: Award,
    },
    {
      name: 'Create High-Fidelity Designs and Prototypes in Figma',
      issuer: 'Google',
      date: 'Mar 2025',
      credentialId: '0AI8C3O2K0PA',
      icon: Award,
    },
    {
      name: 'Foundations of User Experience (UX) Design',
      issuer: 'Google',
      date: 'Feb 2025',
      credentialId: '9DQCGDRM4KAJ',
      icon: Award,
    },
    {
      name: 'Start the UX Design Process: Empathize, Define, and Ideate',
      issuer: 'Google',
      date: 'Feb 2025',
      credentialId: '2UP3LDWVIDY8',
      icon: Award,
    },
  ];

  const courses = [
    'Web Development',
    'Database Management',
    'Programming Fundamentals',
    'Data Structures',
    'Software Engineering',
    'Computer Networks',
  ];

  return (
    <section id="education" className="py-20 bg-gray-50 dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Education & <span className="text-cyan-500 dark:text-cyan-400">Certifications</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4">
            My academic background and professional certifications
          </p>
        </div>

        <div className="space-y-6 sm:space-y-8 mb-12 sm:mb-16">
          {education.map((edu, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800/50 p-5 sm:p-8 rounded-xl border border-gray-200 dark:border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div className="flex items-start space-x-3 sm:space-x-4 mb-3 md:mb-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-500 dark:text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-1">{edu.degree}</h3>
                    <p className="text-cyan-500 dark:text-cyan-400 font-medium">{edu.institution}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{edu.period}</span>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-4">{edu.description}</p>

              <div className="space-y-2">
                {edu.highlights.map((highlight, highlightIndex) => (
                  <div key={highlightIndex} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-cyan-500 dark:bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <div className="bg-white dark:bg-slate-800/50 p-5 sm:p-8 rounded-xl border border-gray-200 dark:border-slate-700/50">
            <div className="flex items-center space-x-3 mb-5 sm:mb-6">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-500 dark:text-cyan-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">Certifications</h3>
            </div>

            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 dark:bg-slate-900/50 rounded-lg border border-gray-200 dark:border-slate-700/50 hover:border-cyan-500/50 transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-gray-900 dark:text-white font-medium mb-1">{cert.name}</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{cert.issuer}</p>
                      {cert.credentialId && (
                        <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
                          Credential ID: {cert.credentialId}
                        </p>
                      )}
                    </div>
                    <span className="text-cyan-500 dark:text-cyan-400 text-sm font-medium whitespace-nowrap">{cert.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800/50 p-8 rounded-xl border border-gray-200 dark:border-slate-700/50">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Relevant Coursework</h3>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {courses.map((course, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-50 dark:bg-slate-900/50 rounded-lg border border-gray-200 dark:border-slate-700/50 hover:border-cyan-500/50 transition-all duration-200"
                >
                  <p className="text-gray-700 dark:text-gray-300 text-sm">{course}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
