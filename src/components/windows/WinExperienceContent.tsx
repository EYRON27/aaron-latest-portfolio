import { ExternalLink, Briefcase } from 'lucide-react';
import { EXPERIENCE } from '../../data/portfolio';

const WinExperienceContent = () => {
  return (
    <div className="p-6 md:p-8 space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-lg bg-green-500/20 text-green-500 flex items-center justify-center">
          <Briefcase className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold leading-tight">Professional Experience</h2>
          <p className="text-sm opacity-60">My career journey</p>
        </div>
      </div>

      <div className="space-y-4">
        {EXPERIENCE.map((exp, idx) => (
          <div 
            key={idx}
            className="group rounded-xl p-5 border border-white/5 bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="flex flex-col md:flex-row md:items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center shrink-0">
                <span className="text-green-500 text-2xl font-black font-serif italic leading-none">y</span>
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-1">
                  <h3 className="text-lg font-semibold">{exp.role}</h3>
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase bg-green-500/20 text-green-300 w-fit">
                    {exp.type}
                  </span>
                </div>
                
                <div className="text-sm font-medium opacity-90 mb-1">
                  {exp.company}
                </div>
                
                <div className="text-xs opacity-60 mb-3">
                  {exp.date} &middot; {exp.duration} &bull; {exp.location}
                </div>
                
                <p className="text-sm opacity-70 leading-relaxed mb-4">
                  {exp.description}
                </p>

                {exp.link && (
                  <a 
                    href={exp.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 transition-colors text-xs font-medium"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    {exp.link.text}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WinExperienceContent;
