import { GraduationCap, Award, Calendar } from 'lucide-react';

const Education = () => {
  const education = [
    {
      degree: 'Bachelor of Science in Information Technology',
      institution: 'Quezon City University',
      period: '2023 - Present',
      description: 'Currently pursuing IT degree. Learning modern web technologies such as React, PHP, and MySQL.',
      highlights: [
        'Building personal projects to enhance development skills',
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
        'Strong foundation in computer literacy',
        'Basic programming concepts and problem-solving',
        'Active participation in school projects',
      ],
    },
  ];

  const certifications = [
    { name: 'Technical Support Fundamentals', issuer: 'Google', date: 'Dec 2025' },
    { name: 'Build Dynamic User Interfaces (UI) for Websites', issuer: 'Google', date: 'Apr 2025' },
    { name: 'Design a User Experience for Social Good & Prepare for Jobs', issuer: 'Google', date: 'Apr 2025' },
    { name: 'Google UX Design Specialization', issuer: 'Google', date: 'Apr 2025' },
    { name: 'Build Wireframes and Low-Fidelity Prototypes', issuer: 'Google', date: 'Mar 2025' },
    { name: 'Conduct UX Research and Test Early Concepts', issuer: 'Google', date: 'Mar 2025' },
    { name: 'Create High-Fidelity Designs and Prototypes in Figma', issuer: 'Google', date: 'Mar 2025' },
    { name: 'Foundations of User Experience (UX) Design', issuer: 'Google', date: 'Feb 2025' },
    { name: 'Start the UX Design Process: Empathize, Define, and Ideate', issuer: 'Google', date: 'Feb 2025' },
  ];

  const courses = [
    'Web Development', 'Database Management', 'Programming Fundamentals',
    'Data Structures', 'Software Engineering', 'Computer Networks',
  ];

  return (
    <section id="education" className="py-24 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-12">
          <div className="h-px w-12 bg-amber-500"></div>
          <span className="text-amber-500 text-sm font-medium tracking-wider uppercase">Experience</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-16">
          Education & certs<span className="text-amber-500">.</span>
        </h2>

        {/* Timeline */}
        <div className="relative mb-20">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-neutral-200 dark:bg-neutral-800"></div>
          <div className="space-y-12">
            {education.map((edu, index) => (
              <div key={index} className="relative pl-10">
                <div className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-amber-500 bg-stone-50 dark:bg-neutral-950"></div>
                <div className="flex items-center gap-2 text-neutral-400 text-sm mb-2">
                  <Calendar className="w-3.5 h-3.5" />
                  {edu.period}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-1">{edu.degree}</h3>
                <p className="text-amber-500 font-medium text-sm mb-3">{edu.institution}</p>
                <p className="text-neutral-500 dark:text-neutral-400 mb-4">{edu.description}</p>
                <ul className="space-y-1.5">
                  {edu.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-neutral-500 dark:text-neutral-400 text-sm">
                      <span className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Certs + Coursework */}
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <div className="flex items-center gap-2 mb-6">
              <Award className="w-4 h-4 text-amber-500" />
              <h3 className="font-bold text-lg">Certifications</h3>
            </div>
            <div className="space-y-3">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-start justify-between gap-4 py-3 border-b border-neutral-100 dark:border-neutral-800/50 last:border-0">
                  <div>
                    <p className="font-medium text-sm">{cert.name}</p>
                    <p className="text-neutral-400 text-xs mt-0.5">{cert.issuer}</p>
                  </div>
                  <span className="text-amber-500 text-xs font-medium whitespace-nowrap">{cert.date}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap className="w-4 h-4 text-amber-500" />
              <h3 className="font-bold text-lg">Coursework</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {courses.map((course, index) => (
                <span key={index} className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400 text-sm rounded-full border border-neutral-200 dark:border-neutral-700/50">
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
