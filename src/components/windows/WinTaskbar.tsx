import { useRef } from 'react';
import { Search, Wifi, Battery, Volume2, Sun, Moon, ChevronUp } from 'lucide-react';
import WinLogo from './WinLogo';

interface WinTaskbarProps {
  isDark: boolean;
  taskbarBg: string;
  taskText: string;
  showStart: boolean;
  currentTime: Date;
  allApps: { id: string; icon: React.ReactNode; color: string; label: string }[];
  activeWindow: string | null;
  openWindow: (name: string) => void;
  closeWindow: () => void;
  setShowStart: React.Dispatch<React.SetStateAction<boolean>>;
  setShowQuickSettings: React.Dispatch<React.SetStateAction<boolean>>;
  setShowCalendar: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
  closeContextMenu: () => void;
}

const WinTaskbar = ({
  isDark, taskbarBg, taskText, showStart, currentTime, allApps, activeWindow,
  openWindow, closeWindow, setShowStart, setShowQuickSettings, setShowCalendar, setIsDark, closeContextMenu
}: WinTaskbarProps) => (
  <div className={`fixed bottom-0 inset-x-0 h-[48px] ${taskbarBg} flex items-center justify-between z-50 transition-all duration-500 px-3`}>

    {/* Left: weather */}
    <div className={`flex items-center gap-2 ${taskText} hover:bg-white/10 px-2 py-1 rounded-md cursor-pointer transition-colors`}>
      <span className="text-xl">☀️</span>
      <div className="leading-tight flex flex-col">
        <span className="font-semibold text-[11px]">32°C</span>
        <span className="opacity-70 text-[10px]">Mostly clear</span>
      </div>
    </div>

    {/* Center: Start + Search + App icons */}
    <div className="flex items-center gap-1.5 absolute left-1/2 -translate-x-1/2">
      <button
        id="start-btn"
        onClick={e => { e.stopPropagation(); setShowStart(s => !s); }}
        className={`w-10 h-10 rounded-md flex items-center justify-center transition-all ${showStart ? (isDark ? 'bg-white/20' : 'bg-white/50') : (isDark ? 'hover:bg-white/10' : 'hover:bg-white/40')}`}
      >
        <WinLogo size={22} />
      </button>

      <button
        onClick={e => { e.stopPropagation(); setShowStart(true); }}
        className={`flex items-center gap-2 px-4 h-9 rounded-full text-[12px] transition-all ${isDark ? 'bg-white/10 text-white/60 hover:bg-white/15 border border-white/10' : 'bg-white text-neutral-500 hover:bg-neutral-50 shadow-sm border border-neutral-200'}`}
        style={{ minWidth: '180px' }}
      >
        <Search className="w-4 h-4 text-blue-500" /> <span className="opacity-80 font-medium">Search</span>
      </button>

      <div className={`w-px h-6 mx-1 ${isDark ? 'bg-white/10' : 'bg-neutral-300/50'}`} />

      {allApps.slice(0, 5).map(app => {
        const isActive = activeWindow === app.id;
        return (
          <button
            key={app.id}
            onClick={() => isActive ? closeWindow() : openWindow(app.id)}
            className={`w-10 h-10 rounded-md flex items-center justify-center relative transition-all ${isActive ? (isDark ? 'bg-white/10' : 'bg-white/60') : (isDark ? 'hover:bg-white/5' : 'hover:bg-white/40')}`}
          >
            <div className={`w-6 h-6 rounded ${app.color} flex items-center justify-center shadow-sm`}>{app.icon}</div>
            {isActive && <div className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-3 h-1 rounded-full ${isDark ? 'bg-white/50' : 'bg-black/40'}`} />}
          </button>
        );
      })}
    </div>

    {/* Right: system tray */}
    <div className="flex items-center gap-1">
      <button
        onClick={() => setIsDark(d => !d)}
        className={`w-8 h-8 rounded-md flex items-center justify-center transition-all ${isDark ? 'hover:bg-white/10 text-white/80' : 'hover:bg-white/40 text-neutral-700'}`}
        aria-label="Toggle theme"
      >
        {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </button>

      <button className={`flex items-center justify-center w-6 h-8 ${isDark ? 'hover:bg-white/10' : 'hover:bg-white/40'} rounded-md transition-colors`}>
        <ChevronUp className={`w-4 h-4 ${taskText} opacity-80`} />
      </button>

      <button
        id="quick-settings-btn"
        className={`flex items-center gap-1.5 px-2 h-8 ${taskText} opacity-90 ${isDark ? 'hover:bg-white/10' : 'hover:bg-white/40'} rounded-md transition-colors`}
        onClick={(e) => { e.stopPropagation(); setShowQuickSettings(prev => !prev); setShowCalendar(false); setShowStart(false); closeContextMenu(); }}
      >
        <Wifi className="w-4 h-4" />
        <Volume2 className="w-4 h-4" />
        <Battery className="w-4 h-4" />
      </button>

      <button
        id="calendar-btn"
        className={`flex flex-col items-end justify-center px-2 h-8 leading-none cursor-default ${taskText} ${isDark ? 'hover:bg-white/10' : 'hover:bg-white/40'} rounded-md transition-colors`}
        onClick={(e) => { e.stopPropagation(); setShowCalendar(prev => !prev); setShowQuickSettings(false); setShowStart(false); closeContextMenu(); }}
      >
        <span className="text-[11px] font-medium mb-1">
          {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
        <span className="text-[10px] opacity-80">
          {currentTime.toLocaleDateString([], { month: 'numeric', day: 'numeric', year: 'numeric' })}
        </span>
      </button>
    </div>
  </div>
);

export default WinTaskbar;
