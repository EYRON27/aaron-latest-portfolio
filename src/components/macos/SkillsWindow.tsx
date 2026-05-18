import React from 'react';
import { Code } from 'lucide-react';

const SkillsWindow = ({ isDark = false }: { isDark?: boolean }) => {
  return (
    <div className="p-8 space-y-8 h-[60vh] overflow-y-auto custom-scrollbar">
      <div className="bg-purple-50/50 p-6 rounded-2xl border border-purple-100/50">
        <h3 className="text-sm font-bold text-purple-600 tracking-widest mb-4 uppercase flex items-center gap-2">
          <Code className="w-4 h-4" /> Frontend
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {['React', 'TypeScript', 'Tailwind CSS', 'HTML', 'CSS', 'JavaScript'].map((skill) => (
            <span key={skill} className="px-4 py-2 bg-white text-purple-700 rounded-xl text-sm font-medium border border-purple-100 hover:scale-105 hover:shadow-md transition-all cursor-default shadow-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div className="bg-green-50/50 p-6 rounded-2xl border border-green-100/50">
        <h3 className="text-sm font-bold text-green-600 tracking-widest mb-4 uppercase flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-500 flex items-center justify-center text-white text-[10px] font-bold">B</div> Backend
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {['Node.js', 'PHP', 'C#', 'ASP.NET Core', 'MySQL', 'SQL Server'].map((skill) => (
            <span key={skill} className="px-4 py-2 bg-white text-green-700 rounded-xl text-sm font-medium border border-green-100 hover:scale-105 hover:shadow-md transition-all cursor-default shadow-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-100/50">
        <h3 className="text-sm font-bold text-amber-600 tracking-widest mb-4 uppercase flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-amber-500 flex items-center justify-center text-white text-[10px] font-bold">T</div> Tools & Others
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {['Git', 'Vite', 'Figma', 'UX Design', 'Project Management'].map((skill) => (
            <span key={skill} className="px-4 py-2 bg-white text-amber-700 rounded-xl text-sm font-medium border border-amber-100 hover:scale-105 hover:shadow-md transition-all cursor-default shadow-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsWindow;
