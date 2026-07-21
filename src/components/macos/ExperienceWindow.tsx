import React from 'react';
import { ExternalLink, Briefcase } from 'lucide-react';
import { EXPERIENCE } from '../../data/portfolio';

const ExperienceWindow = ({ isDark = false }: { isDark?: boolean }) => {
  const cardBg = isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-100';
  const titleColor = isDark ? 'text-white' : 'text-slate-800';
  const descColor = isDark ? 'text-white/60' : 'text-slate-500';
  const tagBg = isDark ? 'bg-white/10 text-white/80' : 'bg-neutral-100 text-slate-600';
  const roleBg = isDark ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-700';

  return (
    <div className="h-full overflow-y-auto custom-scrollbar p-6">
      <div className="max-w-3xl mx-auto space-y-6 animate-fade-in-up">
        {EXPERIENCE.map((exp, index) => (
          <div 
            key={index}
            className={`${cardBg} rounded-2xl border p-6 flex flex-col sm:flex-row gap-6 hover:shadow-lg transition-all duration-300`}
          >
            <div className={`w-14 h-14 rounded-2xl ${isDark ? 'bg-black/50 border border-white/10' : 'bg-slate-50 border border-slate-200'} flex items-center justify-center shrink-0`}>
              <span className="text-green-500 text-2xl font-black font-serif italic leading-none">y</span>
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <h3 className={`text-xl font-bold ${titleColor}`}>{exp.role}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${roleBg} whitespace-nowrap w-fit`}>
                  {exp.type}
                </span>
              </div>
              
              <div className={`text-sm font-medium ${descColor} mb-1 flex items-center gap-2`}>
                <Briefcase size={14} />
                {exp.company}
              </div>
              
              <div className={`text-xs font-medium ${descColor} mb-4 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 opacity-80`}>
                <span>{exp.date} &middot; {exp.duration}</span>
                <span className="hidden sm:inline">&bull;</span>
                <span>{exp.location}</span>
              </div>
              
              <p className={`text-sm leading-relaxed ${descColor} mb-6`}>
                {exp.description}
              </p>

              {exp.link && (
                <a 
                  href={exp.link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                    isDark 
                      ? 'bg-white/10 hover:bg-white/20 text-white' 
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <ExternalLink size={14} />
                  {exp.link.text}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceWindow;
