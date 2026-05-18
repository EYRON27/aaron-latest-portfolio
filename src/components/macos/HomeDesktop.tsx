import React from 'react';

interface HomeDesktopProps {
  currentTime: Date;
  setCurrentPage: (page: string) => void;
  isDark: boolean;
}

const HomeDesktop: React.FC<HomeDesktopProps> = ({ currentTime, setCurrentPage, isDark }) => {
  const glass = isDark
    ? 'bg-white/5 backdrop-blur-3xl border border-white/10 shadow-xl'
    : 'bg-white/40 backdrop-blur-3xl border border-white/60 shadow-xl';
  const textPrimary = isDark ? 'text-white' : 'text-slate-800';
  const textSecondary = isDark ? 'text-white/50' : 'text-slate-500';
  const tagBg = isDark ? 'bg-white/10 text-white/80 border-white/15' : 'bg-white/60 text-slate-700 border-white/80';

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full max-w-5xl animate-fade-in-up z-10 px-4">

      {/* Clock & Date Widget */}
      <div className={`md:col-span-4 ${glass} rounded-[2.5rem] p-8 flex flex-col justify-between hover:scale-[1.02] transition-all duration-300`}>
        <div>
          <h3 className={`text-xl font-bold tracking-wide mb-1 ${textPrimary}`}>{currentTime.toLocaleDateString([], { weekday: 'long' })}</h3>
          <p className={`font-medium ${textSecondary}`}>{currentTime.toLocaleDateString([], { month: 'long', day: 'numeric' })}</p>
        </div>
        <h1 className={`text-6xl sm:text-7xl font-thin tracking-tighter mt-8 ${textPrimary}`}>
          {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
        </h1>
      </div>

      {/* Welcome Greeting Widget */}
      <div className={`md:col-span-8 ${isDark ? 'bg-gradient-to-br from-indigo-600/60 to-purple-700/60 border border-white/10' : 'bg-gradient-to-br from-blue-500/80 to-purple-600/80 border border-white/40'} backdrop-blur-3xl rounded-[2.5rem] p-10 shadow-xl flex flex-col justify-center text-white relative overflow-hidden hover:scale-[1.01] transition-all duration-300`}>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/20 rounded-full blur-3xl pointer-events-none"></div>
        <h2 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight leading-tight relative z-10">Welcome to my <br/>macOS Portfolio.</h2>
        <p className="text-white/90 text-lg font-medium max-w-lg relative z-10">
          Explore my projects, skills, and experience by clicking the apps in the dock below.
        </p>
        <div className="mt-8 flex gap-3 relative z-10">
          <button onClick={() => setCurrentPage('projects')} className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-2xl backdrop-blur-md transition-colors font-bold text-sm tracking-wide border border-white/30 shadow-sm">View Projects</button>
        </div>
      </div>

      {/* Quick Status Widget */}
      <div className={`md:col-span-4 ${glass} rounded-[2.5rem] p-8 flex flex-col justify-center items-center text-center hover:scale-[1.02] transition-all duration-300`}>
        <div className={`w-16 h-16 rounded-full ${isDark ? 'bg-green-500/20' : 'bg-green-100'} flex items-center justify-center mb-5 shadow-inner`}>
          <div className="w-6 h-6 rounded-full bg-green-500 animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.6)]"></div>
        </div>
        <h3 className={`text-xl font-bold mb-2 ${textPrimary}`}>Available for Work</h3>
        <p className={`font-medium text-sm ${textSecondary}`}>Open to full-stack roles and freelance opportunities.</p>
      </div>

      {/* System Info Widget */}
      <div className={`md:col-span-8 ${glass} rounded-[2.5rem] p-8 flex flex-col sm:flex-row items-center gap-8 hover:scale-[1.01] transition-all duration-300 text-center sm:text-left`}>
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-4xl shadow-inner shrink-0">
          🚀
        </div>
        <div>
          <h3 className={`text-2xl font-bold mb-2 ${textPrimary}`}>Aaron Cañada</h3>
          <p className={`font-medium mb-4 ${textSecondary}`}>Frontend • Backend • UI/UX Design</p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-2">
            {['React', 'TypeScript', 'Tailwind', 'Node.js', 'C#'].map(tech => (
              <span key={tech} className={`px-3 py-1 text-xs font-bold rounded-lg border shadow-sm ${tagBg}`}>{tech}</span>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default HomeDesktop;
