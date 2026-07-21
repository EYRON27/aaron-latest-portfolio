import { useState, useEffect } from 'react';
import { GraduationCap, Award, Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { EDUCATION, CERTIFICATIONS } from '../../data/portfolio';

const Education = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Coursera' | 'Participation'>('All');

  // ← Edit education in src/data/portfolio.ts → EDUCATION
  const education = EDUCATION;

  // ← Edit certifications in src/data/portfolio.ts → CERTIFICATIONS
  const certifications = CERTIFICATIONS;

  const courses = [
    'Web Development', 'Programming Fundamentals',
    'Data Structures', 'Computer Networks',
  ];

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

  const filteredCerts = activeFilter === 'All' ? certifications : certifications.filter(c => c.category === activeFilter);

  const categoryStyle: Record<string, { pill: string; badge: string; dot: string }> = {
    Coursera: {
      pill: 'bg-blue-500 text-white border-blue-500 shadow-sm shadow-blue-500/30',
      badge: 'text-blue-500 bg-blue-500/10 border-blue-500/30',
      dot: 'bg-blue-500',
    },
    Participation: {
      pill: 'bg-amber-500 text-white border-amber-500 shadow-sm shadow-amber-500/30',
      badge: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
      dot: 'bg-amber-500',
    },
  };


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

        {/* ── Education Timeline ── */}
        <div className="relative mb-20">
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
                <div className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-amber-500 bg-stone-50 dark:bg-neutral-950 transition-all duration-300 group-hover:shadow-[0_0_12px_rgba(245,158,11,0.6)] group-hover:scale-125" />
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

        {/* ── Certifications Grid ── */}
        <div className="mb-20">
          {/* Section header */}
          <div className="flex items-center gap-2 mb-6">
            <Award className="w-4 h-4 text-amber-500" />
            <h3 className="font-bold text-lg">Certifications</h3>
            <span className="text-neutral-400 text-sm ml-1">({certifications.length})</span>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {(['All', 'Coursera', 'Participation'] as const).map(tab => {
              const count = tab === 'All' ? certifications.length : certifications.filter(c => c.category === tab).length;
              const isActive = activeFilter === tab;
              const activeStyle = tab !== 'All' ? categoryStyle[tab].pill : 'bg-amber-500 text-white border-amber-500 shadow-sm shadow-amber-500/30';
              return (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                    isActive
                      ? activeStyle
                      : 'border-neutral-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 hover:border-neutral-300 dark:hover:border-neutral-600'
                  }`}
                >
                  {tab} <span className={`text-[11px] ml-0.5 ${isActive ? 'opacity-80' : 'opacity-60'}`}>({count})</span>
                </button>
              );
            })}
          </div>

          {/* 4-column thumbnail grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredCerts.map((cert) => {
              const globalIdx = certifications.indexOf(cert);
              return (
                <button
                  key={globalIdx}
                  onClick={() => setLightboxIndex(globalIdx)}
                  className="group relative text-left rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 hover:border-amber-500/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                >
                  {/* Thumbnail */}
                  <div className="aspect-[4/3] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                    <img
                      src={cert.image}
                      alt={cert.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                      loading="lazy"
                    />
                  </div>
                  {/* Gradient hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  {/* Card info */}
                  <div className="p-3">
                    <p className="text-xs font-semibold leading-snug text-neutral-800 dark:text-neutral-100 line-clamp-2 mb-2">
                      {cert.name}
                    </p>
                    <div className="flex items-center justify-between gap-1">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border ${categoryStyle[cert.category]?.badge ?? ''}`}>
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${categoryStyle[cert.category]?.dot ?? ''}`} />
                        {cert.category}
                      </span>
                      <span className="text-[10px] text-neutral-400 font-medium shrink-0">{cert.date}</span>
                    </div>
                  </div>
                  {/* View hint badge */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="bg-black/60 backdrop-blur-sm text-white text-[9px] font-bold px-2 py-1 rounded-full tracking-wide">
                      View
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Coursework ── */}
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

      {/* ── Lightbox ── */}
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
