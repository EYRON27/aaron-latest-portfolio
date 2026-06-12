import { useState } from 'react';
import { GraduationCap, Award, X, ChevronLeft, ChevronRight } from 'lucide-react';

const certifications = [
  { name: 'Google UX Design Specialization', issuer: 'Google', date: 'Apr 2025', image: '/Certificates/Google UX Specialization.png' },
  { name: 'Google AI Specialization', issuer: 'Google', date: '2025', image: '/Certificates/Google AI Specialization.png' },
  { name: 'Technical Support Fundamentals', issuer: 'Google', date: 'Dec 2025', image: '/Certificates/Technical Support Fundamentals.png' },
  { name: 'Foundation of Project Management', issuer: 'Google', date: 'Dec 2025', image: '/Certificates/Foundation of Project Management.png' },
  { name: 'Project Initiation: Starting a Successful Project', issuer: 'Google', date: 'Dec 2025', image: '/Certificates/Project Initiation Starting a Successful Project.png' },
  { name: 'Build Dynamic User Interfaces (UI)', issuer: 'Google', date: 'Apr 2025', image: '/Certificates/Build Dynamic User Interfaces (UI) for Websites.png' },
  { name: 'Design a User Experience for Social Good', issuer: 'Google', date: 'Apr 2025', image: '/Certificates/Design a User Experience for Social Good.png' },
  { name: 'Build Wireframes and Low-Fidelity Prototypes', issuer: 'Google', date: 'Mar 2025', image: '/Certificates/Build Wireframes and Low Fidelity Prototypes.png' },
  { name: 'Conduct UX Research and Test Early Concepts', issuer: 'Google', date: 'Mar 2025', image: '/Certificates/Conduct UX Research .png' },
  { name: 'Create High-Fidelity Designs and Prototypes', issuer: 'Google', date: 'Mar 2025', image: '/Certificates/Create High Fidelity Designs and Prototypes.png' },
  { name: 'Foundations of User Experience (UX) Design', issuer: 'Google', date: 'Feb 2025', image: '/Certificates/Foundation of User Experience.png' },
  { name: 'Start the UX Design Process', issuer: 'Google', date: 'Feb 2025', image: '/Certificates/Start the UX design.png' },
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

const education = [
  { deg: 'Bachelor of Science in Information Technology', school: 'Quezon City University', year: '2023 – Present', color: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/30' },
  { deg: 'Senior High School Graduate', school: 'Commonwealth High School', year: '2022 – 2023', color: 'bg-slate-50 dark:bg-neutral-800/50 border-slate-200 dark:border-neutral-700' },
];

const WinEducationContent = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col h-full relative overflow-hidden">
      
      {/* Scrollable Content Area */}
      <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
        
        {/* Academic */}
        <div>
          <h3 className="text-xs font-black uppercase tracking-widest text-amber-500 flex items-center gap-2 mb-4">
            <GraduationCap className="w-4 h-4" /> Academic Background
          </h3>
          <div className="space-y-3">
            {education.map((e, i) => (
              <div key={i} className={`${e.color} rounded-2xl border p-5 flex items-center justify-between shadow-sm`}>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-neutral-200 text-sm">{e.deg}</h4>
                  <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">{e.school}</p>
                </div>
                <span className="text-xs font-bold text-slate-500 dark:text-neutral-300 bg-white dark:bg-neutral-800 rounded-lg px-3 py-1 border border-slate-200 dark:border-neutral-700 whitespace-nowrap">{e.year}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="text-xs font-black uppercase tracking-widest text-blue-500 flex items-center gap-2 mb-4">
            <Award className="w-4 h-4" /> Google Certifications
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {certifications.map((c, i) => (
              <div
                key={i}
                onClick={() => setLightboxIndex(i)}
                className="bg-white dark:bg-neutral-800 rounded-2xl border border-slate-100 dark:border-neutral-700 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer overflow-hidden group flex flex-col"
              >
                <div className="h-28 bg-slate-50 dark:bg-neutral-900 overflow-hidden border-b border-slate-100 dark:border-neutral-700 relative">
                  <img src={c.image} alt={c.name} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end">
                    <p className="text-white font-semibold text-[10px] line-clamp-2 leading-tight">{c.name}</p>
                    <p className="text-white/80 text-[9px] mt-0.5">{c.issuer} &middot; {c.date}</p>
                  </div>
                </div>
                <div className="p-3 flex-1 flex flex-col">
                  <p className="font-semibold text-slate-800 dark:text-neutral-200 text-[10px] leading-tight flex-1">{c.name}</p>
                  <div className="flex justify-between mt-2">
                    <span className="text-[9px] text-slate-400">{c.issuer}</span>
                    <span className="text-[9px] font-bold text-blue-500">{c.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Overlay - Sibling to Scrollable Area! */}
      {lightboxIndex !== null && (
        <div
          className="absolute inset-0 z-[9999] bg-black/75 backdrop-blur-xl flex flex-col items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close */}
          <button className="absolute top-4 right-4 p-2.5 bg-white/20 hover:bg-white/30 rounded-full text-white z-10" onClick={() => setLightboxIndex(null)}>
            <X className="w-5 h-5" />
          </button>
          {/* Prev / Next */}
          <button
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 rounded-full text-white backdrop-blur-md transition-colors shadow-lg z-10"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + certifications.length) % certifications.length); }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 rounded-full text-white backdrop-blur-md transition-colors shadow-lg z-10"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % certifications.length); }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image card taking remaining space but strictly contained */}
          <div className="w-full flex-1 min-h-0 flex items-center justify-center mt-12 mb-4 px-4 sm:px-12" onClick={e => e.stopPropagation()}>
            <img
              src={certifications[lightboxIndex].image}
              alt={certifications[lightboxIndex].name}
              className="max-w-3xl max-h-full object-contain bg-white/10 backdrop-blur-3xl rounded-[2rem] border border-white/20 shadow-2xl p-2 sm:p-4"
            />
          </div>

          {/* Title — always visible below card */}
          <div className="text-center shrink-0 mb-2 sm:mb-4 px-12" onClick={e => e.stopPropagation()}>
            <p className="text-white font-bold text-base sm:text-lg leading-tight drop-shadow-lg">{certifications[lightboxIndex].name}</p>
            <p className="text-white/70 text-xs mt-1 uppercase tracking-widest drop-shadow">{certifications[lightboxIndex].issuer} &middot; {certifications[lightboxIndex].date}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WinEducationContent;
