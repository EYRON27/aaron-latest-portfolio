const cats = [
  { label: 'Frontend', color: 'bg-purple-100 text-purple-700 border-purple-200', items: ['React', 'TypeScript', 'Tailwind CSS', 'HTML', 'CSS', 'JavaScript', 'Flutter', 'Dart', 'React Native'] },
  { label: 'Backend', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', items: ['Node.js', 'PHP', 'C#', 'ASP.NET Core', 'MySQL', 'SQL Server', 'Firebase'] },
  { label: 'Tools', color: 'bg-amber-100 text-amber-700 border-amber-200', items: ['Git', 'GitHub', 'Vite', 'Figma', 'UX Design', 'Project Management'] },
];

const WinSkillsContent = () => (
  <div className="p-6 h-[58vh] overflow-y-auto custom-scrollbar space-y-5">
    {cats.map(c => (
      <div key={c.label} className="bg-white/70 dark:bg-neutral-800/70 rounded-2xl border border-white dark:border-neutral-700 p-5 shadow-sm">
        <p className={`text-[10px] font-black uppercase tracking-widest mb-3 ${c.color.split(' ')[1]}`}>{c.label}</p>
        <div className="flex flex-wrap gap-2">
          {c.items.map(s => (
            <span key={s} className={`px-3 py-1.5 text-xs font-semibold rounded-xl border shadow-sm hover:scale-105 transition-transform cursor-default ${c.color}`}>{s}</span>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default WinSkillsContent;
