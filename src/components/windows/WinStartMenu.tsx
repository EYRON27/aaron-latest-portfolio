import { useRef } from 'react';
import { Search, Power, ChevronRight, MonitorPlay, FileText, Award } from 'lucide-react';
import AppTile from './AppTile';

interface AppDef {
  id: string;
  icon: React.ReactNode;
  color: string;
  label: string;
  href?: string;
  download?: boolean;
}

interface WinStartMenuProps {
  isDark: boolean;
  allApps: AppDef[];
  openWindow: (name: string) => void;
  onExit: () => void;
  startRef: React.RefObject<HTMLDivElement>;
}

const WinStartMenu = ({ isDark, allApps, openWindow, onExit, startRef }: WinStartMenuProps) => (
  <div className="fixed bottom-[60px] left-1/2 -translate-x-1/2 z-[60] w-[640px] max-w-[95vw]">
    <div
      ref={startRef}
      className={`w-full h-full ${isDark ? 'bg-[#242424]/95 text-white border-white/10' : 'bg-white/95 text-black border-black/10'} backdrop-blur-3xl rounded-xl border shadow-[0_30px_80px_rgba(0,0,0,0.4)] animate-win-open overflow-hidden flex flex-col p-8`}
      onClick={e => e.stopPropagation()}
    >
      {/* Search */}
      <div className={`flex items-center gap-3 px-4 py-2.5 rounded-full ${isDark ? 'bg-white/5 border border-white/10' : 'bg-neutral-100 border border-neutral-200'} mb-8`}>
        <Search className="w-4 h-4 opacity-50" />
        <input type="text" placeholder="Type here to search" className="bg-transparent border-none outline-none text-sm w-full placeholder:opacity-50" disabled />
      </div>

      {/* Pinned */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-sm pl-2">Pinned</h3>
        <button className={`text-[11px] font-medium px-3 py-1 rounded shadow-sm ${isDark ? 'bg-white/10 hover:bg-white/20 border-white/10' : 'bg-white hover:bg-neutral-50 border-neutral-200'} border transition-colors flex items-center gap-1`}>All apps <ChevronRight className="w-3 h-3" /></button>
      </div>
      <div className="grid grid-cols-6 gap-y-8 gap-x-2 mb-8">
        {allApps.map(app => (
          <AppTile
            key={app.id}
            icon={app.icon}
            label={app.label}
            color={app.color}
            onClick={() => {
              if (app.download) {
                const link = document.createElement('a');
                link.href = app.href!;
                link.download = 'CAÑADA_CV.pdf';
                link.click();
              } else if (app.href) window.open(app.href, '_blank');
              else openWindow(app.id);
            }}
          />
        ))}
      </div>

      {/* Recommended */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-sm pl-2">Recommended</h3>
        <button className={`text-[11px] font-medium px-3 py-1 rounded shadow-sm ${isDark ? 'bg-white/10 hover:bg-white/20 border-white/10' : 'bg-white hover:bg-neutral-50 border-neutral-200'} border transition-colors flex items-center gap-1`}>More <ChevronRight className="w-3 h-3" /></button>
      </div>
      <div className="grid grid-cols-2 gap-2 flex-1">
        {[
          { title: 'Schatzies Events', subtitle: 'Recent Project', icon: <MonitorPlay className="w-5 h-5 text-blue-500" /> },
          { title: 'CAÑADA CV.pdf', subtitle: 'Recently added', icon: <FileText className="w-5 h-5 text-red-500" /> },
          { title: 'AarvieveLifeSync', subtitle: 'Recent Project', icon: <MonitorPlay className="w-5 h-5 text-amber-500" /> },
          { title: 'Google UX Cert', subtitle: 'Recently earned', icon: <Award className="w-5 h-5 text-yellow-500" /> },
        ].map(item => (
          <button key={item.title} onClick={() => openWindow('projects')} className={`flex items-center gap-3 p-3 rounded-lg ${isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'} transition-colors text-left`}>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${isDark ? 'bg-white/5' : 'bg-white shadow-sm'}`}>{item.icon}</div>
            <div>
              <p className={`text-[13px] font-medium ${isDark ? 'text-white' : 'text-neutral-800'} leading-tight`}>{item.title}</p>
              <p className={`text-[11px] ${isDark ? 'text-white/50' : 'text-neutral-500'} mt-0.5`}>{item.subtitle}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className={`mt-6 pt-4 border-t ${isDark ? 'border-white/10' : 'border-black/10'} flex items-center justify-between -mx-8 px-8 -mb-4 pb-4`}>
        <div className={`flex items-center gap-3 ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'} px-3 py-2 -ml-3 rounded-lg transition-colors cursor-pointer`}>
          <img src="/aaron.jpg" alt="Aaron" className="w-8 h-8 rounded-full object-cover" />
          <span className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-neutral-800'}`}>Aaron Cañada</span>
        </div>
        <button onClick={onExit} className={`p-2.5 ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'} rounded-lg transition-colors`} title="Power / Exit Mode">
          <Power className="w-4 h-4 opacity-80" />
        </button>
      </div>
    </div>
  </div>
);

export default WinStartMenu;
