import React from 'react';

const AboutWindow = ({ isDark = false }: { isDark?: boolean }) => {
  const textPrimary = isDark ? 'text-white' : 'text-slate-800';
  const textSecondary = isDark ? 'text-white/60' : 'text-slate-600';
  return (
    <div className="p-8 sm:p-12 flex flex-col md:flex-row items-center md:items-start gap-8">
      <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-5xl shadow-xl transform hover:scale-105 transition-transform duration-500 shrink-0">
        👨‍💻
      </div>
      <div className="text-center md:text-left flex-1">
        <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
          <span className="text-[11px] font-bold text-green-500 tracking-widest uppercase">Available for work</span>
        </div>
        <h2 className={`text-4xl font-black mb-2 tracking-tight ${textPrimary}`}>Aaron Cañada</h2>
        <h3 className="text-base font-bold text-blue-500 tracking-widest mb-6 uppercase">Full-Stack Developer</h3>
        <p className={`leading-relaxed text-lg max-w-2xl ${textSecondary}`}>
          A passionate developer specializing in building modern web applications.
          Experienced in React, TypeScript, and full-stack development with a focus
          on creating intuitive, high-performance user experiences.
        </p>
      </div>
    </div>
  );
};

export default AboutWindow;
