import React, { useState } from 'react';
import { Award, GraduationCap, X, ChevronLeft, ChevronRight } from 'lucide-react';

const CertificatesWindow = ({ isDark = false }: { isDark?: boolean }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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

  return (
    <div className="p-8 h-[65vh] overflow-y-auto custom-scrollbar flex flex-col gap-10 relative">
      <div>
        <h3 className="text-sm font-bold text-amber-500 tracking-widest mb-6 uppercase flex items-center gap-2">
          <GraduationCap className="w-5 h-5" /> Academic Background
        </h3>
        <div className="space-y-6">
          <div className="bg-white/50 p-6 rounded-2xl border border-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-lg text-slate-800">Bachelor of Science in Information Technology</h4>
              <p className="text-amber-600 font-medium">Quezon City University</p>
            </div>
            <div className="px-4 py-2 bg-amber-100 text-amber-800 rounded-lg text-sm font-bold tracking-wider whitespace-nowrap">
              2023 - Present
            </div>
          </div>
          <div className="bg-white/50 p-6 rounded-2xl border border-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-lg text-slate-800">Senior High School Graduate</h4>
              <p className="text-slate-500 font-medium">Commonwealth High School</p>
            </div>
            <div className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-bold tracking-wider whitespace-nowrap">
              2022 - 2023
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-blue-500 tracking-widest mb-6 uppercase flex items-center gap-2">
          <Award className="w-5 h-5" /> Google Certifications
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden group flex flex-col"
              onClick={() => setLightboxIndex(idx)}
            >
              <div className="h-40 bg-slate-50 overflow-hidden relative border-b border-slate-100">
                <img src={cert.image} alt={cert.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center shadow-md">
                    <span className="text-xl">👁️</span>
                  </div>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h4 className="font-bold text-slate-800 text-sm mb-2 leading-tight flex-1">{cert.name}</h4>
                <div className="flex items-center justify-between mt-auto text-xs">
                  <span className="font-medium text-slate-500">{cert.issuer}</span>
                  <span className="font-bold text-blue-500">{cert.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Gallery */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xl flex items-center justify-center p-4 animate-scale-in"
          onClick={() => setLightboxIndex(null)}
        >
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              className="p-3 bg-white/20 hover:bg-white/30 rounded-full text-white backdrop-blur-md transition-colors shadow-lg"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <button
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 rounded-full text-white backdrop-blur-md transition-colors shadow-lg"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + certifications.length) % certifications.length); }}
            aria-label="Previous"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 rounded-full text-white backdrop-blur-md transition-colors shadow-lg"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % certifications.length); }}
            aria-label="Next"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div className="max-w-4xl max-h-[85vh] w-full relative flex flex-col items-center bg-white/10 backdrop-blur-3xl p-4 sm:p-8 rounded-[2rem] border border-white/20 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={certifications[lightboxIndex].image}
              alt={certifications[lightboxIndex].name}
              className="w-full h-auto max-h-[65vh] object-contain rounded-xl shadow-inner bg-white/5"
            />
            <div className="text-center mt-6">
              <p className="text-white font-bold text-xl tracking-wide">{certifications[lightboxIndex].name}</p>
              <p className="text-white/70 font-medium mt-1 uppercase tracking-widest text-sm">{certifications[lightboxIndex].issuer} &middot; {certifications[lightboxIndex].date}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificatesWindow;
