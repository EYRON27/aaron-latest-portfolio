import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User, Code, Briefcase, MessageSquare, Award,
  X, Minus, Maximize2, Minimize2, Github, Linkedin, FileText,
} from 'lucide-react';

// ── Windows sub-components ─────────────────────────────────────────────────
import WinLogo from '../components/windows/WinLogo';
import AppTile from '../components/windows/AppTile';
import WinContextMenu from '../components/windows/WinContextMenu';
import WinStartMenu from '../components/windows/WinStartMenu';
import WinTaskbar from '../components/windows/WinTaskbar';
import { WinQuickSettings, WinCalendar, WinHiddenIcons } from '../components/windows/WinModals';

// ── Window contents ────────────────────────────────────────────────────────
import WinAboutContent from '../components/windows/WinAboutContent';
import WinSkillsContent from '../components/windows/WinSkillsContent';
import WinProjectsContent from '../components/windows/WinProjectsContent';
import WinEducationContent from '../components/windows/WinEducationContent';
import WinContactContent from '../components/windows/WinContactContent';

// ─────────────────────────────────────────────────────────────────────────
// MAIN WINDOWS VIEW
// ─────────────────────────────────────────────────────────────────────────
const WindowsView = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showStart, setShowStart] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [windowKey, setWindowKey] = useState(0);
  const startRef = useRef<HTMLDivElement>(null);

  // ── Context Menu ──
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [iconSize, setIconSize] = useState<'small' | 'medium' | 'large'>('medium');

  // ── System Tray ──
  const [showQuickSettings, setShowQuickSettings] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showHiddenIcons, setShowHiddenIcons] = useState(false);
  const quickSettingsRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const hiddenIconsRef = useRef<HTMLDivElement>(null);

  // ── Clock ──
  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // ── Click-outside handler ──
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (startRef.current && !startRef.current.contains(target) && !target.closest('#start-btn')) setShowStart(false);
      if (quickSettingsRef.current && !quickSettingsRef.current.contains(target) && !target.closest('#quick-settings-btn')) setShowQuickSettings(false);
      if (calendarRef.current && !calendarRef.current.contains(target) && !target.closest('#calendar-btn')) setShowCalendar(false);
      if (hiddenIconsRef.current && !hiddenIconsRef.current.contains(target) && !target.closest('#hidden-icons-btn')) setShowHiddenIcons(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const openWindow = (name: string) => {
    setActiveWindow(name);
    setIsMinimized(false);
    setWindowKey(k => k + 1);
    setShowStart(false);
  };
  const closeWindow = () => { setActiveWindow(null); setIsMinimized(false); };
  const minimizeWindow = () => setIsMinimized(true);
  const restoreWindow = () => setIsMinimized(false);
  const closeContextMenu = () => { if (contextMenu) setContextMenu(null); };
  const handleRefresh = () => { closeContextMenu(); setIsRefreshing(true); setTimeout(() => setIsRefreshing(false), 150); };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    let x = e.clientX, y = e.clientY;
    if (x + 260 > window.innerWidth) x = window.innerWidth - 260 - 5;
    if (y + 350 > window.innerHeight) y = window.innerHeight - 350 - 5;
    setContextMenu({ x, y });
    setShowStart(false);
  };

  // ── Window definitions ──
  const windows: Record<string, { title: string; icon: React.ReactNode; color: string; content: React.ReactNode }> = {
    about: { title: 'About Me', icon: <User className="w-5 h-5 text-white" />, color: 'bg-teal-500', content: <WinAboutContent /> },
    skills: { title: 'Skills & Technologies', icon: <Code className="w-5 h-5 text-white" />, color: 'bg-purple-500', content: <WinSkillsContent /> },
    projects: { title: 'Featured Projects', icon: <Briefcase className="w-5 h-5 text-white" />, color: 'bg-orange-500', content: <WinProjectsContent /> },
    education: { title: 'Education & Certificates', icon: <Award className="w-5 h-5 text-white" />, color: 'bg-yellow-500', content: <WinEducationContent /> },
    contact: { title: 'Get In Touch', icon: <MessageSquare className="w-5 h-5 text-white" />, color: 'bg-green-500', content: <WinContactContent /> },
  };

  const activeWin = activeWindow ? windows[activeWindow] : null;

  // ── Apps list ──
  const allApps = [
    { id: 'about', icon: <User className="w-5 h-5 text-white" />, color: 'bg-teal-500', label: 'About' },
    { id: 'skills', icon: <Code className="w-5 h-5 text-white" />, color: 'bg-purple-500', label: 'Skills' },
    { id: 'projects', icon: <Briefcase className="w-5 h-5 text-white" />, color: 'bg-orange-500', label: 'Projects' },
    { id: 'education', icon: <Award className="w-5 h-5 text-white" />, color: 'bg-yellow-500', label: 'Education' },
    { id: 'contact', icon: <MessageSquare className="w-5 h-5 text-white" />, color: 'bg-green-500', label: 'Contact' },
    { id: 'github', icon: <Github className="w-5 h-5 text-white" />, color: 'bg-neutral-800', label: 'GitHub', href: 'https://github.com/EYRON27' },
    { id: 'linkedin', icon: <Linkedin className="w-5 h-5 text-white" />, color: 'bg-blue-600', label: 'LinkedIn', href: 'https://linkedin.com' },
    { id: 'cv', icon: <FileText className="w-5 h-5 text-white" />, color: 'bg-red-500', label: 'Download CV', href: '/CAÑADA CV (3).pdf', download: true },
  ];

  // ── Theme tokens ──
  const wallpaper = isDark
    ? 'bg-gradient-to-br from-[#000428] via-[#004e92] to-[#000428]'
    : 'bg-gradient-to-br from-[#89f7fe] to-[#66a6ff]';
  const taskbarBg = isDark
    ? 'bg-[#1a1a2e]/90 backdrop-blur-3xl border-t border-white/5'
    : 'bg-white/85 backdrop-blur-3xl border-t border-neutral-300/40';
  const taskText = isDark ? 'text-white' : 'text-neutral-800';

  return (
    <div
      className={`min-h-screen ${wallpaper} overflow-hidden font-sans relative transition-all duration-500 select-none`}
      onClick={() => { if (showStart) setShowStart(false); closeContextMenu(); }}
      onContextMenu={handleContextMenu}
    >
      {/* Bloom blobs */}
      {isDark && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-blue-500/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] bg-indigo-500/10 rounded-full blur-[150px]" />
        </div>
      )}

      {/* Desktop icons — vertical column on desktop, horizontal strip on mobile */}
      <div className={`absolute z-10 ${isRefreshing ? 'hidden' : 'block'}`}
        style={{
          top: '1rem',
          left: '1rem',
        }}
      >
        {/* Mobile: horizontal row at top */}
        <div className="flex sm:hidden flex-row flex-wrap gap-1.5">
          <button
            onClick={() => navigate('/')}
            className={`flex flex-col items-center gap-1 group rounded-lg hover:bg-white/10 transition-colors w-14 p-1.5`}
          >
            <div className="w-9 h-9 text-3xl flex items-center justify-center drop-shadow-md group-hover:scale-105 transition-transform">🗑️</div>
            <span className="text-white font-medium drop-shadow-md text-center leading-tight text-[9px]">Exit</span>
          </button>
          {allApps.slice(0, 5).map(app => (
            <AppTile
              key={app.id}
              icon={app.icon}
              label={app.label}
              color={app.color}
              onClick={() => app.href ? window.open(app.href, '_blank') : openWindow(app.id)}
              isDesktop={true}
              size="small"
            />
          ))}
        </div>
        {/* Desktop: vertical column */}
        <div className="hidden sm:flex flex-col gap-2">
          <button
            onClick={() => navigate('/')}
            className={`flex flex-col items-center gap-1.5 group rounded-lg hover:bg-white/10 transition-colors ${iconSize === 'small' ? 'w-16 p-1.5' : iconSize === 'large' ? 'w-24 p-3' : 'w-20 p-2'}`}
          >
            <div className={`flex items-center justify-center drop-shadow-md group-hover:scale-105 transition-transform ${iconSize === 'small' ? 'w-8 h-8 text-3xl' : iconSize === 'large' ? 'w-16 h-16 text-5xl' : 'w-12 h-12 text-4xl'}`}>🗑️</div>
            <span className={`text-white font-medium drop-shadow-md text-center leading-tight ${iconSize === 'small' ? 'text-[10px]' : iconSize === 'large' ? 'text-xs' : 'text-[11px]'}`}>Exit Mode</span>
          </button>
          {allApps.map(app => (
            <AppTile
              key={app.id}
              icon={app.icon}
              label={app.label}
              color={app.color}
              onClick={() => app.href ? window.open(app.href, '_blank') : openWindow(app.id)}
              isDesktop={true}
              size={iconSize}
            />
          ))}
        </div>
      </div>

      {/* Context menu */}
      {contextMenu && (
        <WinContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          isDark={isDark}
          iconSize={iconSize}
          setIconSize={setIconSize}
          onClose={closeContextMenu}
          onRefresh={handleRefresh}
          openWindow={openWindow}
          toggleDark={() => setIsDark(d => !d)}
        />
      )}

      {/* Window overlay — full-screen on mobile, centered modal on desktop */}
      {activeWin && (
        <div
          className={`fixed inset-0 z-40 flex items-center justify-center sm:p-6 bg-black/20 backdrop-blur-sm transition-all duration-300 ${isMinimized ? 'opacity-0 pointer-events-none scale-75 translate-y-8' : 'opacity-100 scale-100 translate-y-0'}`}
          onClick={closeWindow}
        >
          <div
            key={windowKey}
            className={`w-full animate-win-open rounded-xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)] border sm:max-w-5xl ${isDark ? 'bg-[#1f1f1f] border-white/10' : 'bg-[#f3f3f3] border-white/60'}`}
            style={{ maxHeight: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Title bar */}
            <div className={`flex items-center justify-between px-4 py-2 select-none shrink-0 ${isDark ? 'bg-[#2b2b2b]' : 'bg-[#e8e8e8]'}`}>
              <div className="flex items-center gap-2.5">
                <div className={`w-5 h-5 rounded ${activeWin.color} flex items-center justify-center shadow-sm`}>
                  <div className="scale-[0.5]">{activeWin.icon}</div>
                </div>
                <span className={`text-xs font-semibold ${isDark ? 'text-white/80' : 'text-neutral-600'}`}>{activeWin.title}</span>
              </div>
              <div className="flex -mr-2">
                <button
                  className={`w-11 h-8 flex items-center justify-center transition-colors rounded-sm ${isDark ? 'text-white/50 hover:bg-white/10 hover:text-white' : 'text-neutral-500 hover:bg-black/5'}`}
                  onClick={(e) => { e.stopPropagation(); minimizeWindow(); }}
                  title="Minimize"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  className={`w-11 h-8 flex items-center justify-center transition-colors rounded-sm ${isDark ? 'text-white/50 hover:bg-white/10 hover:text-white' : 'text-neutral-500 hover:bg-black/5'}`}
                  title="Maximize"
                >
                  <Maximize2 className="w-3 h-3" />
                </button>
                <button
                  className={`w-11 h-8 flex items-center justify-center transition-colors hover:bg-red-500 hover:text-white rounded-tr-xl ${isDark ? 'text-white/50' : 'text-neutral-500'}`}
                  onClick={(e) => { e.stopPropagation(); closeWindow(); }}
                  title="Close"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            {/* Content — scrollable */}
            <div className={`overflow-y-auto flex-1 ${isDark ? 'bg-[#1a1a1a] text-white' : 'bg-white text-black'}`}>
              {activeWin.content}
            </div>
          </div>
        </div>
      )}

      {/* Start Menu */}
      {showStart && (
        <WinStartMenu
          isDark={isDark}
          allApps={allApps}
          openWindow={openWindow}
          onExit={() => navigate('/')}
          startRef={startRef}
        />
      )}

      {/* Quick Settings */}
      {showQuickSettings && (
        <WinQuickSettings
          isDark={isDark}
          quickSettingsRef={quickSettingsRef}
          toggleDark={() => setIsDark(d => !d)}
        />
      )}

      {/* Calendar */}
      {showCalendar && (
        <WinCalendar
          isDark={isDark}
          calendarRef={calendarRef}
          currentTime={currentTime}
        />
      )}

      {/* Hidden Icons */}
      {showHiddenIcons && (
        <WinHiddenIcons
          isDark={isDark}
          hiddenIconsRef={hiddenIconsRef}
        />
      )}

      {/* Taskbar */}
      <WinTaskbar
        isDark={isDark}
        taskbarBg={taskbarBg}
        taskText={taskText}
        showStart={showStart}
        currentTime={currentTime}
        allApps={allApps}
        activeWindow={activeWindow}
        isMinimized={isMinimized}
        openWindow={openWindow}
        closeWindow={closeWindow}
        restoreWindow={restoreWindow}
        minimizeWindow={minimizeWindow}
        setShowStart={setShowStart}
        setShowQuickSettings={setShowQuickSettings}
        setShowCalendar={setShowCalendar}
        setShowHiddenIcons={setShowHiddenIcons}
        setIsDark={setIsDark}
        closeContextMenu={closeContextMenu}
      />

      <style>{`
        @keyframes win-open {
          0%   { opacity:0; transform:scale(0.96) translateY(12px); filter:blur(1px); }
          100% { opacity:1; transform:scale(1) translateY(0);       filter:blur(0); }
        }
        .animate-win-open { animation: win-open 0.25s cubic-bezier(0.16,1,0.3,1) forwards; }
        .custom-scrollbar::-webkit-scrollbar { width:6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background:transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background:rgba(128,128,128,0.3); border-radius:10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background:rgba(128,128,128,0.5); }
      `}</style>
    </div>
  );
};

export default WindowsView;
