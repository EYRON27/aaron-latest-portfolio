import { Github, ArrowUpRight } from 'lucide-react';

const projects = [
  { title: 'Schatzies Events', desc: 'Professional event planning website. Modern, responsive front-end.', tech: ['React', 'TypeScript', 'Tailwind'], github: 'https://github.com/batdimoiprint/schatzies-events', demo: 'https://www.schatziesevents.com/', color: 'from-blue-500 to-indigo-600', role: 'Front-End Dev' },
  { title: 'Algorithm Portfolio', desc: 'Algorithm implementations with macOS-inspired UI & interactive demos.', tech: ['React', 'TypeScript', 'Tailwind'], github: 'https://github.com/EYRON27/aaron-compilation-portfolio', demo: 'https://aaron-compilation-portfolio.vercel.app/', color: 'from-rose-500 to-orange-600', role: '' },
  { title: 'LinguaLink', desc: 'Flutter mobile app — real-time translation, OCR, vocab mini-games.', tech: ['Flutter', 'Dart', 'Firebase'], github: 'https://github.com/Uryegedon/smarttranslate', demo: '', color: 'from-emerald-500 to-teal-600', role: 'Frontend Dev' },
  { title: 'AarvieveLifeSync', desc: 'All-in-one productivity hub: tasks, expenses, passwords.', tech: ['React', 'Express', 'TypeScript', 'Firebase'], github: 'https://github.com/EYRON27/AarvieveLifeSync', demo: 'https://aarvieve-life-sync-website.vercel.app/', color: 'from-amber-500 to-yellow-600', role: 'Full Stack' },
  { title: 'MySuperSystem2025', desc: 'ASP.NET Core MVC full-stack app — expense, tasks, password manager.', tech: ['C#', 'ASP.NET Core', 'EF Core', 'SQL Server'], github: 'https://github.com/EYRON27/MySuperSystem2025', demo: '', color: 'from-purple-500 to-fuchsia-600', role: '' },
  { title: 'RL Phil Construction', desc: 'Responsive static site for a construction company brand.', tech: ['React', 'TypeScript', 'Tailwind'], github: 'https://github.com/EYRON27/rl-phil', demo: 'https://rl-phil-construction.vercel.app', color: 'from-slate-500 to-gray-600', role: '' },
];

const WinProjectsContent = () => (
  <div className="p-6 h-[58vh] overflow-y-auto custom-scrollbar grid grid-cols-1 md:grid-cols-2 gap-4">
    {projects.map((p, i) => (
      <div key={i} className="bg-white dark:bg-neutral-800 rounded-2xl border border-slate-100 dark:border-neutral-700 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col overflow-hidden">
        <div className={`h-1.5 bg-gradient-to-r ${p.color}`} />
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-bold text-slate-800 dark:text-neutral-100 text-sm leading-tight">{p.title}</h3>
              {p.role && <span className="inline-block mt-1 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest bg-amber-100 text-amber-700 rounded-md">{p.role}</span>}
            </div>
            <div className="flex gap-1.5 ml-2 shrink-0">
              <a href={p.github} target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-full bg-slate-100 dark:bg-neutral-700 hover:bg-slate-200 dark:hover:bg-neutral-600 flex items-center justify-center text-slate-500 dark:text-neutral-300 transition-all"><Github className="w-3.5 h-3.5" /></a>
              {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-full bg-slate-100 dark:bg-neutral-700 hover:bg-slate-200 dark:hover:bg-neutral-600 flex items-center justify-center text-slate-500 dark:text-neutral-300 transition-all"><ArrowUpRight className="w-3.5 h-3.5" /></a>}
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-neutral-400 leading-relaxed flex-1 mb-3">{p.desc}</p>
          <div className="flex flex-wrap gap-1.5">
            {p.tech.map(t => <span key={t} className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide bg-neutral-100 dark:bg-neutral-700 text-slate-600 dark:text-neutral-300 rounded-md">{t}</span>)}
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default WinProjectsContent;
