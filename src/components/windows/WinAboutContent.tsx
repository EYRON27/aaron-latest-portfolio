const WinAboutContent = () => (
  <div className="p-8 sm:p-10 flex flex-col md:flex-row items-center md:items-start gap-8 min-h-[50vh]">
    <img src="/3d-avatar.png" alt="Aaron Cañada" className="w-36 h-36 rounded-3xl object-cover shadow-xl border-4 border-white dark:border-neutral-800 shrink-0 hover:scale-105 transition-transform duration-500" />
    <div className="text-center md:text-left flex-1">
      <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
        <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
        <span className="text-[11px] font-black text-green-600 tracking-widest uppercase">Available for work</span>
      </div>
      <h2 className="text-4xl font-black mb-1 tracking-tight text-slate-800 dark:text-neutral-100">Aaron Cañada</h2>
      <h3 className="text-sm font-bold text-blue-500 tracking-widest mb-5 uppercase">IT Student & Full-Stack Developer</h3>
      <p className="leading-relaxed text-slate-600 dark:text-neutral-400 max-w-2xl">
        A passionate developer specializing in building modern web applications. Experienced in React, TypeScript, and full-stack development with a focus on creating intuitive, high-performance user experiences.
      </p>
      <div className="mt-6 flex flex-wrap gap-2 justify-center md:justify-start">
        {['React', 'TypeScript', 'Node.js', 'C#', 'Flutter', 'Figma'].map(t => (
          <span key={t} className="px-3 py-1 text-xs font-bold bg-neutral-100 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm">{t}</span>
        ))}
      </div>
    </div>
  </div>
);

export default WinAboutContent;
