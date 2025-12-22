import { GraduationCap, Award, BookOpen, Calendar } from 'lucide-react';

const Education = () => {
  const education = [
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'Tech University',
      period: '2021 - Present',
      description: 'Focusing on software engineering, data structures, algorithms, and web development. Current GPA: 3.8/4.0',
      highlights: [
        'Dean\'s List for 3 consecutive semesters',
        'Member of Computer Science Club',
        'Teaching Assistant for Introduction to Programming',
      ],
    },
    {
      degree: 'High School Diploma',
      institution: 'Central High School',
      period: '2017 - 2021',
      description: 'Graduated with honors. Specialized in Mathematics and Computer Science.',
      highlights: [
        'Valedictorian of graduating class',
        'First place in Regional Coding Competition',
        'President of Robotics Club',
      ],
    },
  ];

  const certifications = [
    {
      name: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      date: '2023',
      icon: Award,
    },
    {
      name: 'React Developer Certification',
      issuer: 'Meta',
      date: '2023',
      icon: Award,
    },
    {
      name: 'Full Stack Web Development',
      issuer: 'freeCodeCamp',
      date: '2022',
      icon: Award,
    },
    {
      name: 'JavaScript Algorithms and Data Structures',
      issuer: 'freeCodeCamp',
      date: '2022',
      icon: Award,
    },
  ];

  const courses = [
    'Data Structures & Algorithms',
    'Database Management Systems',
    'Web Development',
    'Software Engineering',
    'Operating Systems',
    'Computer Networks',
    'Cloud Computing',
    'Mobile App Development',
  ];

  return (
    <section id="education" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Education & <span className="text-cyan-400">Certifications</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            My academic background and professional certifications
          </p>
        </div>

        <div className="space-y-8 mb-16">
          {education.map((edu, index) => (
            <div
              key={index}
              className="bg-slate-800/50 p-8 rounded-xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div className="flex items-start space-x-4 mb-4 md:mb-0">
                  <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-1">{edu.degree}</h3>
                    <p className="text-cyan-400 font-medium">{edu.institution}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{edu.period}</span>
                </div>
              </div>

              <p className="text-gray-400 mb-4">{edu.description}</p>

              <div className="space-y-2">
                {edu.highlights.map((highlight, highlightIndex) => (
                  <div key={highlightIndex} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-400 text-sm">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700/50">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white">Certifications</h3>
            </div>

            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="p-4 bg-slate-900/50 rounded-lg border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-white font-medium mb-1">{cert.name}</h4>
                      <p className="text-gray-400 text-sm">{cert.issuer}</p>
                    </div>
                    <span className="text-cyan-400 text-sm font-medium">{cert.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700/50">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white">Relevant Coursework</h3>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {courses.map((course, index) => (
                <div
                  key={index}
                  className="p-3 bg-slate-900/50 rounded-lg border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-200"
                >
                  <p className="text-gray-300 text-sm">{course}</p>
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
