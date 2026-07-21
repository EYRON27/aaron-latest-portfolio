import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { EXPERIENCE } from '../../data/portfolio';
import { ExternalLink } from 'lucide-react';

const Experience = () => {
  const { ref: headRef, visible: headVisible } = useScrollReveal(0.1);

  return (
    <section id="experience" className="py-24 border-t border-neutral-200 dark:border-neutral-800 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={headRef as React.RefObject<HTMLDivElement>} className={`transition-all duration-700 ${headVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="flex items-center gap-3 mb-12">
            <div className="h-px w-12 bg-amber-500" />
            <span className="text-amber-500 text-sm font-medium tracking-wider uppercase">Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-16">
            Professional Background<span className="text-amber-500">.</span>
          </h2>
        </div>

        <div className="flex flex-col gap-8">
          {EXPERIENCE.map((exp, i) => {
            const { ref, visible } = useScrollReveal(0.15);
            return (
              <div 
                key={i} 
                ref={ref as React.RefObject<HTMLDivElement>}
                className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} bg-white dark:bg-[#1a1a1a] rounded-3xl p-8 sm:p-10 border border-neutral-200 dark:border-neutral-800 shadow-sm dark:shadow-[0_20px_40px_rgba(0,0,0,0.2)] flex flex-col sm:flex-row gap-8`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-neutral-100 dark:bg-[#0a0a0a] border border-neutral-200 dark:border-neutral-800 flex items-center justify-center flex-shrink-0 shadow-inner">
                  <span className="text-green-500 text-3xl font-black font-serif italic leading-none">y</span>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-1 text-neutral-900 dark:text-white">{exp.role}</h3>
                  <div className="text-lg font-medium text-neutral-600 dark:text-neutral-300 mb-2">
                    {exp.company} &middot; {exp.type}
                  </div>
                  <div className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">
                    {exp.date} &middot; {exp.duration}
                  </div>
                  <div className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
                    {exp.location}
                  </div>
                  
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
                    {exp.description}
                  </p>

                  {exp.link && (
                    <a href={exp.link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors px-4 py-2.5 rounded-xl text-neutral-900 dark:text-white text-sm font-semibold">
                      <div className="w-8 h-8 bg-white dark:bg-black rounded-lg flex items-center justify-center shadow-sm">
                        <ExternalLink size={14} className="text-neutral-900 dark:text-white" />
                      </div>
                      {exp.link.text}
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
