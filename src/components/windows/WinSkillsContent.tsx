import { Code } from 'lucide-react';

const WinSkillsContent = () => (
  <div className="p-6 h-[58vh] overflow-y-auto custom-scrollbar space-y-5">
    {/* Frontend */}
    <div className="bg-purple-50/80 dark:bg-purple-900/10 p-5 rounded-2xl border border-purple-100/50 dark:border-purple-800/20">
      <h3 className="text-xs font-black uppercase tracking-widest text-purple-600 flex items-center gap-2 mb-4">
        <Code className="w-4 h-4" /> Frontend
      </h3>
      <div className="flex flex-wrap gap-2">
        {['React', 'TypeScript', 'Tailwind CSS', 'HTML', 'CSS', 'JavaScript', 'Flutter', 'Dart', 'React Native'].map(s => (
          <span key={s} className="px-3 py-1.5 bg-white text-purple-700 rounded-xl text-xs font-semibold border border-purple-100 hover:scale-105 hover:shadow-md transition-all cursor-default shadow-sm">{s}</span>
        ))}
      </div>
    </div>

    {/* Backend */}
    <div className="bg-emerald-50/80 dark:bg-emerald-900/10 p-5 rounded-2xl border border-emerald-100/50 dark:border-emerald-800/20">
      <h3 className="text-xs font-black uppercase tracking-widest text-emerald-600 flex items-center gap-2 mb-4">
        <div className="w-4 h-4 rounded bg-emerald-500 flex items-center justify-center text-white text-[10px] font-bold">B</div> Backend
      </h3>
      <div className="flex flex-wrap gap-2">
        {['Node.js', 'PHP', 'C#', 'ASP.NET Core', 'MySQL', 'SQL Server', 'React Native', 'Firebase'].map(s => (
          <span key={s} className="px-3 py-1.5 bg-white text-emerald-700 rounded-xl text-xs font-semibold border border-emerald-100 hover:scale-105 hover:shadow-md transition-all cursor-default shadow-sm">{s}</span>
        ))}
      </div>
    </div>

    {/* Tools */}
    <div className="bg-amber-50/80 dark:bg-amber-900/10 p-5 rounded-2xl border border-amber-100/50 dark:border-amber-800/20">
      <h3 className="text-xs font-black uppercase tracking-widest text-amber-600 flex items-center gap-2 mb-4">
        <div className="w-4 h-4 rounded bg-amber-500 flex items-center justify-center text-white text-[10px] font-bold">T</div> Tools & Others
      </h3>
      <div className="flex flex-wrap gap-2">
        {['Git', 'GitHub', 'Vite', 'Figma', 'UX Design', 'Project Management'].map(s => (
          <span key={s} className="px-3 py-1.5 bg-white text-amber-700 rounded-xl text-xs font-semibold border border-amber-100 hover:scale-105 hover:shadow-md transition-all cursor-default shadow-sm">{s}</span>
        ))}
      </div>
    </div>
  </div>
);

export default WinSkillsContent;
