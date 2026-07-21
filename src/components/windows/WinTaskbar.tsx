import { Search, Wifi, Battery, Volume2, Sun, Moon, ChevronUp, Monitor, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WinLogo from './WinLogo';

const AppleLogo = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

interface WinTaskbarProps {
  isDark: boolean;
  taskbarBg: string;
  taskText: string;
  showStart: boolean;
  currentTime: Date;
  allApps: { id: string; icon: React.ReactNode; color: string; label: string }[];
  activeWindow: string | null;
  isMinimized: boolean;
  openWindow: (name: string) => void;
  closeWindow: () => void;
  restoreWindow: () => void;
  minimizeWindow: () => void;
  setShowStart: React.Dispatch<React.SetStateAction<boolean>>;
  setShowQuickSettings: React.Dispatch<React.SetStateAction<boolean>>;
  setShowCalendar: React.Dispatch<React.SetStateAction<boolean>>;
  setShowHiddenIcons: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
  closeContextMenu: () => void;
}

const WinTaskbar = ({
  isDark, taskbarBg, taskText, showStart, currentTime, allApps, activeWindow, isMinimized,
  openWindow, closeWindow, restoreWindow, minimizeWindow,
  setShowStart, setShowQuickSettings, setShowCalendar, setShowHiddenIcons, setIsDark, closeContextMenu
}: WinTaskbarProps) => {
  const navigate = useNavigate();
  const [showUiDropdown, setShowUiDropdown] = useState(false);
  const uiDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (uiDropdownRef.current && !uiDropdownRef.current.contains(e.target as Node)) {
        setShowUiDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleAppClick = (appId: string) => {
    if (activeWindow === appId) {
      // Same window is open: toggle minimize/restore
      if (isMinimized) restoreWindow();
      else minimizeWindow();
    } else {
      // Different or no window: open it
      openWindow(appId);
    }
  };

  return (
    <div className={`fixed bottom-0 inset-x-0 h-[48px] ${taskbarBg} flex items-center justify-between z-50 transition-all duration-500 px-3`}>

      {/* Left: weather — hidden on mobile */}
      <div className={`hidden sm:flex items-center gap-2 ${taskText} hover:bg-white/10 px-2 py-1 rounded-md cursor-pointer transition-colors`}>
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

        {/* Search bar — hidden on mobile */}
        <button
          onClick={e => { e.stopPropagation(); setShowStart(true); }}
          className={`hidden sm:flex items-center gap-2 px-4 h-9 rounded-full text-[12px] transition-all ${isDark ? 'bg-white/10 text-white/60 hover:bg-white/15 border border-white/10' : 'bg-white text-neutral-500 hover:bg-neutral-50 shadow-sm border border-neutral-200'}`}
          style={{ minWidth: '180px' }}
        >
          <Search className="w-4 h-4 text-blue-500" /> <span className="opacity-80 font-medium">Search</span>
        </button>

        <div className={`hidden sm:block w-px h-6 mx-1 ${isDark ? 'bg-white/10' : 'bg-neutral-300/50'}`} />

        {allApps.slice(0, 5).map(app => {
          const isActive = activeWindow === app.id;
          const isMin = isActive && isMinimized;
          return (
            <button
              key={app.id}
              onClick={() => handleAppClick(app.id)}
              className={`w-10 h-10 rounded-md flex items-center justify-center relative transition-all group ${isActive ? (isDark ? 'bg-white/10' : 'bg-white/60') : (isDark ? 'hover:bg-white/5' : 'hover:bg-white/40')}`}
              title={isMin ? `Restore ${app.label}` : app.label}
            >
              <div className={`w-6 h-6 rounded ${app.color} flex items-center justify-center shadow-sm transition-transform ${isMin ? 'opacity-60' : ''}`}>{app.icon}</div>
              {/* Active indicator bar */}
              {isActive && (
                <div className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-1 rounded-full transition-all ${isMin ? 'w-2 bg-white/30' : 'w-3 ' + (isDark ? 'bg-white/50' : 'bg-black/40')}`} />
              )}
            </button>
          );
        })}
      </div>

      {/* Right: system tray */}
      <div className="flex items-center gap-1">
        <div className="relative" ref={uiDropdownRef}>
          <button
            onClick={() => setShowUiDropdown(v => !v)}
            className={`flex items-center gap-1 px-2 h-8 rounded-md transition-all ${isDark ? 'hover:bg-white/10 text-white/80' : 'hover:bg-white/40 text-neutral-700'}`}
          >
            <Monitor className="w-4 h-4" />
            <span className="hidden md:inline text-[11px] font-medium">UI Mode</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${showUiDropdown ? 'rotate-180' : ''}`} />
          </button>
          
          {showUiDropdown && (
            <div className={`absolute bottom-full mb-2 right-0 w-44 rounded-xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.3)] border ${isDark ? 'border-white/10 bg-[#1c1c1e] text-white' : 'border-neutral-200 bg-white text-neutral-800'} backdrop-blur-3xl z-[100] animate-win-open`}>
              <button
                onClick={() => { navigate('/cinematic'); setShowUiDropdown(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-[12px] font-medium transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-neutral-50'}`}
              >
                <div className="w-6 h-6 rounded-md bg-amber-500 text-white flex items-center justify-center font-bold text-[10px]">C</div>
                <div className="flex flex-col items-start text-left">
                  <span>Cinematic</span>
                  <span className="text-[9px] opacity-70">Creative UI</span>
                </div>
              </button>
              <button
                onClick={() => { navigate('/macos'); setShowUiDropdown(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-[12px] font-medium transition-colors border-b ${isDark ? 'hover:bg-white/5 border-white/5' : 'hover:bg-neutral-50 border-neutral-100'}`}
              >
                <div className="w-6 h-6 rounded-md bg-neutral-900 text-white flex items-center justify-center">
                  <AppleLogo size={12} />
                </div>
                <div className="flex flex-col items-start text-left">
                  <span>macOS Mode</span>
                  <span className="text-[9px] opacity-70">Mac-style UI</span>
                </div>
              </button>
              <button
                onClick={() => { navigate('/'); setShowUiDropdown(false); }}
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 text-[12px] font-bold text-red-500 transition-colors ${isDark ? 'hover:bg-red-500/10' : 'hover:bg-red-50'}`}
              >
                Exit Mode
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsDark(d => !d)}
          className={`w-8 h-8 rounded-md flex items-center justify-center transition-all ${isDark ? 'hover:bg-white/10 text-white/80' : 'hover:bg-white/40 text-neutral-700'}`}
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Hidden icons — desktop only */}
        <button
          id="hidden-icons-btn"
          className={`hidden sm:flex items-center justify-center w-6 h-8 ${isDark ? 'hover:bg-white/10' : 'hover:bg-white/40'} rounded-md transition-colors`}
          onClick={(e) => { e.stopPropagation(); setShowHiddenIcons(prev => !prev); setShowQuickSettings(false); setShowCalendar(false); setShowStart(false); closeContextMenu(); }}
        >
          <ChevronUp className={`w-4 h-4 ${taskText} opacity-80`} />
        </button>

        {/* Quick settings — desktop only */}
        <button
          id="quick-settings-btn"
          className={`hidden sm:flex items-center gap-1.5 px-2 h-8 ${taskText} opacity-90 ${isDark ? 'hover:bg-white/10' : 'hover:bg-white/40'} rounded-md transition-colors`}
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
          <span className="hidden sm:inline text-[10px] opacity-80">
            {currentTime.toLocaleDateString([], { month: 'numeric', day: 'numeric', year: 'numeric' })}
          </span>
        </button>
      </div>
    </div>
  );
};

export default WinTaskbar;
