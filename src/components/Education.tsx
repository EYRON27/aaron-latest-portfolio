import { useState, useEffect, useCallback } from 'react';
import { GraduationCap, Award, Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Education = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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
    { name: 'Google UX Design Specialization', issuer: 'Google', date: 'Apr 2025', image: '/Certificates/Google UX Specialization.png' },
    { name: 'Google AI Specialization', issuer: 'Google', date: '2025', image: '/Certificates/Google AI Specialization.png' },
    { name: 'Technical Support Fundamentals', issuer: 'Google', date: 'Dec 2025', image: '/Certificates/Technical Support Fundamentals.png' },
    { name: 'Foundation of Project Management', issuer: 'Google', date: 'Dec 2025', image: '/Certificates/Foundation of Project Management.png' },
    { name: 'Project Initiation: Starting a Successful Project', issuer: 'Google', date: 'Dec 2025', image: '/Certificates/Project Initiation Starting a Successful Project.png' },
    { name: 'Build Dynamic User Interfaces (UI) for Websites', issuer: 'Google', date: 'Apr 2025', image: '/Certificates/Build Dynamic User Interfaces (UI) for Websites.png' },
    { name: 'Design a User Experience for Social Good & Prepare for Jobs', issuer: 'Google', date: 'Apr 2025', image: '/Certificates/Design a User Experience for Social Good.png' },
    { name: 'Build Wireframes and Low-Fidelity Prototypes', issuer: 'Google', date: 'Mar 2025', image: '/Certificates/Build Wireframes and Low Fidelity Prototypes.png' },
    { name: 'Conduct UX Research and Test Early Concepts', issuer: 'Google', date: 'Mar 2025', image: '/Certificates/Conduct UX Research .png' },
    { name: 'Create High-Fidelity Designs and Prototypes in Figma', issuer: 'Google', date: 'Mar 2025', image: '/Certificates/Create High Fidelity Designs and Prototypes.png' },
    { name: 'Foundations of User Experience (UX) Design', issuer: 'Google', date: 'Feb 2025', image: '/Certificates/Foundation of User Experience.png' },
    { name: 'Start the UX Design Process: Empathize, Define, and Ideate', issuer: 'Google', date: 'Feb 2025', image: '/Certificates/Start the UX design.png' },
    { name: 'AI Fundamentals', issuer: 'Microsoft', date: '2025', image: '/Certificates/AI Fundamentals.png' },
    { name: 'AI for Writing and Communicating', issuer: 'Microsoft', date: '2025', image: '/Certificates/AI for Writing and Communicating.png' },
    { name: 'AI for Research and Insights', issuer: 'Microsoft', date: '2025', image: '/Certificates/AI for Research and Insights.png' },
    { name: 'AI For Data Analysis', issuer: 'Microsoft', date: '2025', image: '/Certificates/AI For Data Analysis.jpg' },
    { name: 'AI for Content Creation', issuer: 'Microsoft', date: '2025', image: '/Certificates/AI for Content Creation.png' },
    { name: 'AI For Brainstorming And Planning', issuer: 'Microsoft', date: '2025', image: '/Certificates/AI For Brainstormiing And Planning.png' },
    { name: 'AI For App Building', issuer: 'Microsoft', date: '2025', image: '/Certificates/AI For App Building.png' },
    { name: 'IGNITE Summit 2023 (Participation)', issuer: 'IGNITE', date: '2023', image: '/Certificates/IGNITE Summit 2023 (Participation).png' },
    { name: 'Cybersecure U: Defending The Digital World (Participation)', issuer: 'Cybersecure U', date: '2024', image: '/Certificates/Cybersecure U Defending The Digital World (Participation).png' },
    { name: 'Alumni Talks (Participation)', issuer: 'Alumni', date: '2024', image: '/Certificates/Alumni Talks (Participation).png' },
  ];

  const courses = [
    'Web Development', 'Programming Fundamentals',
    'Data Structures', 'Computer Networks',
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % certifications.length);
  }, [certifications.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + certifications.length) % certifications.length);
  }, [certifications.length]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((prev) => prev !== null ? (prev + 1) % certifications.length : null);
      if (e.key === 'ArrowLeft') setLightboxIndex((prev) => prev !== null ? (prev - 1 + certifications.length) % certifications.length : null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [lightboxIndex, certifications.length]);

  // Scroll reveal for header
  const { ref: headRef, visible: headVisible } = useScrollReveal(0.1);

  return (
    <section id="education" className="py-24 border-t border-neutral-200 dark:border-neutral-800 relative overflow-hidden">
      {/* Background ambience */}
      <div className="absolute top-0 left-0 w-[600px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(245,158,11,0.04) 0%, transparent 70%)', transform: 'translate(-30%, -20%)' }} />

      <div className="max-w-6xl mx-auto px-6">
        {/* Label */}
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className={`flex items-center gap-3 mb-12 transition-all duration-700 ${headVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}
        >
          <div className="h-px w-12 bg-amber-500"></div>
          <span className="text-amber-500 text-sm font-medium tracking-wider uppercase">Experience</span>
        </div>

        <h2
          className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-16 transition-all duration-700 ${headVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '100ms' }}
        >
          Education &amp; certs<span className="text-amber-500">.</span>
        </h2>

        {/* Timeline */}
        <div className="relative mb-20">
          {/* Animated timeline line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px overflow-hidden">
            <div className="w-full bg-neutral-200 dark:bg-neutral-800 absolute inset-0" />
            <div
              className={`w-full bg-gradient-to-b from-amber-500 to-amber-500/20 absolute top-0 transition-all duration-1500 ${headVisible ? 'h-full' : 'h-0'}`}
              style={{ transitionDelay: '400ms' }}
            />
          </div>
          <div className="space-y-12">
            {education.map((edu, index) => (
              <div key={index} className="relative pl-10 group">
                {/* Glowing dot */}
                <div
                  className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-amber-500 bg-stone-50 dark:bg-neutral-950 transition-all duration-300 group-hover:shadow-[0_0_12px_rgba(245,158,11,0.6)] group-hover:scale-125"
                />
                {/* Card */}
                <div
                  className={`p-5 rounded-xl border transition-all duration-500 ${headVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                  style={{
                    transitionDelay: `${200 + index * 150}ms`,
                    borderColor: 'rgba(128,128,128,0.12)',
                    background: 'rgba(128,128,128,0.02)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(245,158,11,0.25)';
                    (e.currentTarget as HTMLDivElement).style.background = 'rgba(245,158,11,0.03)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(128,128,128,0.12)';
                    (e.currentTarget as HTMLDivElement).style.background = 'rgba(128,128,128,0.02)';
                  }}
                >
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
              </div>
            ))}
          </div>
        </div>

        {/* Certificate Carousel */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <h3 className="font-bold text-lg">Certifications</h3>
              <span className="text-neutral-400 text-sm ml-2">
                {currentSlide + 1} / {certifications.length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => { setIsAutoPlaying(false); prevSlide(); }}
                className="p-2 rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 hover:border-amber-500 transition-all"
                aria-label="Previous certificate"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => { setIsAutoPlaying(false); nextSlide(); }}
                className="p-2 rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 hover:border-amber-500 transition-all"
                aria-label="Next certificate"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Carousel viewport */}
          <div
            className="relative overflow-hidden rounded-xl"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {certifications.map((cert, index) => (
                <div key={index} className="w-full flex-shrink-0 px-1">
                  <div
                    className="group relative cursor-pointer"
                    onClick={() => setLightboxIndex(index)}
                  >
                    <div className="relative overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900">
                      <img
                        src={cert.image}
                        alt={cert.name}
                        className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <p className="text-white font-semibold text-sm">{cert.name}</p>
                        <p className="text-white/70 text-xs mt-1">{cert.issuer} &middot; {cert.date}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-1.5 mt-5">
            {certifications.map((_, index) => (
              <button
                key={index}
                onClick={() => { setCurrentSlide(index); setIsAutoPlaying(false); }}
                className={`h-1.5 rounded-full transition-all duration-300 ${index === currentSlide
                    ? 'w-6 bg-amber-500'
                    : 'w-1.5 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-600'
                  }`}
                aria-label={`Go to certificate ${index + 1}`}
              />
            ))}
          </div>

          {/* Cert name list below carousel */}
          <div className="mt-8 space-y-2">
            {certifications.map((cert, index) => (
              <button
                key={index}
                onClick={() => { setCurrentSlide(index); setIsAutoPlaying(false); }}
                className={`w-full flex items-start justify-between gap-4 py-2.5 px-3 rounded-lg text-left transition-all duration-200 ${index === currentSlide
                    ? 'bg-amber-500/10 border border-amber-500/30'
                    : 'border border-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800/50'
                  }`}
              >
                <div className="flex items-start gap-3">
                  <span className={`text-xs font-mono mt-0.5 ${index === currentSlide ? 'text-amber-500' : 'text-neutral-400'}`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className={`font-medium text-sm ${index === currentSlide ? 'text-amber-500' : ''}`}>{cert.name}</p>
                    <p className="text-neutral-400 text-xs mt-0.5">{cert.issuer}</p>
                  </div>
                </div>
                <span className={`text-xs font-medium whitespace-nowrap mt-0.5 ${index === currentSlide ? 'text-amber-500' : 'text-neutral-400'}`}>
                  {cert.date}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Coursework */}
        <div>
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

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors z-10"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + certifications.length) % certifications.length); }}
            aria-label="Previous"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % certifications.length); }}
            aria-label="Next"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
          <div className="max-w-5xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={certifications[lightboxIndex].image}
              alt={certifications[lightboxIndex].name}
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
            />
            <div className="text-center mt-3">
              <p className="text-white font-medium text-sm">{certifications[lightboxIndex].name}</p>
              <p className="text-white/50 text-xs mt-1">{certifications[lightboxIndex].issuer} &middot; {certifications[lightboxIndex].date}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Education;
