import { useState } from 'react';
import { GraduationCap, Award, X } from 'lucide-react';

const certs = [
  { name: 'Google UX Design Specialization', issuer: 'Google', date: 'Apr 2025', image: '/Certificates/Google UX Specialization.png' },
  { name: 'Technical Support Fundamentals', issuer: 'Google', date: 'Dec 2025', image: '/Certificates/Technical Support Fundamentals.png' },
  { name: 'Foundation of Project Management', issuer: 'Google', date: 'Dec 2025', image: '/Certificates/Foundation of Project Management.png' },
  { name: 'Build Dynamic UI for Websites', issuer: 'Google', date: 'Apr 2025', image: '/Certificates/Build Dynamic User Interfaces (UI) for Websites.png' },
  { name: 'Design UX for Social Good', issuer: 'Google', date: 'Apr 2025', image: '/Certificates/Design a User Experience for Social Good.png' },
  { name: 'Build Wireframes & Prototypes', issuer: 'Google', date: 'Mar 2025', image: '/Certificates/Build Wireframes and Low Fidelity Prototypes.png' },
  { name: 'Conduct UX Research & Test Early Concepts', issuer: 'Google', date: 'Mar 2025', image: '/Certificates/Conduct UX Research and Test Early Concepts.png' },
  { name: 'Create High Fidelity Designs', issuer: 'Google', date: 'Mar 2025', image: '/Certificates/Create High Fidelity Designs and Prototypes in Figma.png' },
  { name: 'Foundations of UX Design', issuer: 'Google', date: 'Mar 2025', image: '/Certificates/Foundations of User Experience (UX) Design.png' },
];

const education = [
  { deg: 'BS Information Technology', school: 'Quezon City University', year: '2023 – Present', color: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/30' },
  { deg: 'Senior High School', school: 'Commonwealth High School', year: '2022 – 2023', color: 'bg-slate-50 dark:bg-neutral-800/50 border-slate-200 dark:border-neutral-700' },
];

const WinEducationContent = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <div className="p-6 h-[58vh] overflow-y-auto custom-scrollbar space-y-6 relative">
      {/* Academic */}
      <div>
        <h3 className="text-xs font-black uppercase tracking-widest text-amber-500 flex items-center gap-2 mb-4"><GraduationCap className="w-4 h-4" />Academic</h3>
        <div className="space-y-3">
          {education.map((e, i) => (
            <div key={i} className={`${e.color} rounded-2xl border p-5 flex items-center justify-between shadow-sm`}>
              <div><h4 className="font-bold text-slate-800 dark:text-neutral-200 text-sm">{e.deg}</h4><p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">{e.school}</p></div>
              <span className="text-xs font-bold text-slate-500 dark:text-neutral-300 bg-white dark:bg-neutral-800 rounded-lg px-3 py-1 border border-slate-200 dark:border-neutral-700 whitespace-nowrap">{e.year}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div>
        <h3 className="text-xs font-black uppercase tracking-widest text-blue-500 flex items-center gap-2 mb-4"><Award className="w-4 h-4" />Google Certifications</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {certs.map((c, i) => (
            <div key={i} onClick={() => setLightboxIndex(i)} className="bg-white dark:bg-neutral-800 rounded-2xl border border-slate-100 dark:border-neutral-700 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer overflow-hidden group flex flex-col">
              <div className="h-28 bg-slate-50 dark:bg-neutral-900 overflow-hidden border-b border-slate-100 dark:border-neutral-700 relative">
                <img src={c.image} alt={c.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-white/90 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all flex items-center justify-center text-sm shadow text-black">👁️</div>
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

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-xl flex items-center justify-center p-4" onClick={() => setLightboxIndex(null)}>
          <button className="absolute top-4 right-4 p-2.5 bg-white/20 hover:bg-white/30 rounded-full text-white" onClick={() => setLightboxIndex(null)}><X className="w-5 h-5" /></button>
          <div className="max-w-3xl w-full bg-white/10 backdrop-blur-3xl p-6 rounded-3xl border border-white/20 shadow-2xl" onClick={e => e.stopPropagation()}>
            <img src={certs[lightboxIndex].image} alt={certs[lightboxIndex].name} className="w-full h-auto max-h-[65vh] object-contain rounded-xl" />
            <p className="text-white font-bold text-center mt-4">{certs[lightboxIndex].name}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WinEducationContent;
