import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, User, Code, Briefcase, MessageSquare, Award, Sun, Moon } from 'lucide-react';

import AboutWindow from '../components/macos/AboutWindow';
import SkillsWindow from '../components/macos/SkillsWindow';
import ProjectsWindow from '../components/macos/ProjectsWindow';
import CertificatesWindow from '../components/macos/CertificatesWindow';
import ContactWindow from '../components/macos/ContactWindow';
import HomeDesktop from '../components/macos/HomeDesktop';

const MacOSView = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [hoveredDockItem, setHoveredDockItem] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [windowKey, setWindowKey] = useState(0); // to re-trigger animation on page change

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClose = () => {
    setCurrentPage('home');
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    setWindowKey(k => k + 1); // re-trigger animation
  };

  const pages = {
    about: {
      id: 'about',
      title: 'About Me',
      dockIcon: <User className="w-6 h-6 text-white" />,
      color: 'bg-teal-500',
      content: <AboutWindow isDark={isDark} />
    },
    skills: {
      id: 'skills',
      title: 'Skills & Technologies',
      dockIcon: <Code className="w-6 h-6 text-white" />,
      color: 'bg-purple-500',
      content: <SkillsWindow isDark={isDark} />
    },
    projects: {
      id: 'projects',
      title: 'Featured Projects',
      dockIcon: <Briefcase className="w-6 h-6 text-white" />,
      color: 'bg-orange-500',
      content: <ProjectsWindow isDark={isDark} />
    },
    certificates: {
      id: 'certificates',
      title: 'Education & Certificates',
      dockIcon: <Award className="w-6 h-6 text-white" />,
      color: 'bg-yellow-500',
      content: <CertificatesWindow isDark={isDark} />
    },
    contact: {
      id: 'contact',
      title: 'Get In Touch',
      dockIcon: <MessageSquare className="w-6 h-6 text-white" />,
      color: 'bg-green-500',
      content: <ContactWindow isDark={isDark} />
    },
  };

  const activePageData = currentPage !== 'home' ? pages[currentPage as keyof typeof pages] : null;

  // Theme tokens
  const bg = isDark
    ? 'bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]'
    : 'bg-gradient-to-br from-[#c8d8ec] via-[#e6ebf4] to-[#f1e6ee]';
  const menuBar = isDark
    ? 'bg-black/60 backdrop-blur-md border-b border-white/10 text-white/80'
    : 'bg-white/40 backdrop-blur-md border-b border-white/30 text-slate-700';
  const menuBarText = isDark ? 'text-white font-bold' : 'text-black font-bold';
  const exitBtn = isDark
    ? 'bg-white/10 hover:bg-white/20 text-white'
    : 'bg-slate-800/10 hover:bg-slate-800/20 text-slate-800';
  const windowBg = isDark
    ? 'bg-[#1c1c1e]/90 backdrop-blur-3xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)]'
    : 'bg-white/85 backdrop-blur-3xl border border-white/60 shadow-[0_20px_60px_rgba(0,0,0,0.1)]';
  const windowHeader = isDark
    ? 'bg-[#2c2c2e]/80 border-b border-white/10'
    : 'bg-white/40 border-b border-slate-200/50';
  const windowTitle = isDark ? 'text-white/60' : 'text-slate-500';
  const dockBg = isDark
    ? 'bg-white/10 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.5)]'
    : 'bg-white/40 backdrop-blur-2xl border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.1)]';
  const dockDot = isDark ? 'bg-white' : 'bg-slate-800';
  const dockDivider = isDark ? 'bg-white/20' : 'bg-white/50';

  return (
    <div className={`min-h-screen ${bg} overflow-hidden font-sans relative transition-all duration-700`}>

      {/* Animated background particles (dark mode) */}
      {isDark && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-20 animate-float-particle"
              style={{
                width: `${80 + i * 40}px`,
                height: `${80 + i * 40}px`,
                background: i % 2 === 0
                  ? 'radial-gradient(circle, #6366f1, transparent)'
                  : 'radial-gradient(circle, #8b5cf6, transparent)',
                left: `${10 + i * 15}%`,
                top: `${5 + i * 12}%`,
                animationDelay: `${i * 1.2}s`,
                animationDuration: `${6 + i}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Top Menu Bar */}
      <div className={`fixed top-0 inset-x-0 h-7 flex items-center justify-between px-4 z-50 text-[13px] font-medium shadow-sm ${menuBar} transition-all duration-500`}>
        <div className="flex items-center gap-4">
          <span className={`${menuBarText} transition-colors duration-500`}>Aaron</span>
          {['File', 'Edit', 'View', 'Window', 'Help'].map(item => (
            <span key={item} className={`cursor-pointer hidden sm:inline-block transition-colors duration-200 hover:opacity-100 ${isDark ? 'opacity-70 hover:text-white' : 'hover:text-black'}`}>{item}</span>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          {/* macOS-style system tray icons */}
          {/* Control Center / Sliders */}
          <button className={`w-6 h-6 flex items-center justify-center rounded-md transition-colors ${isDark ? 'hover:bg-white/10 text-white/70' : 'hover:bg-black/10 text-slate-600'}`} title="Control Center">
            <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
              <rect x="2" y="2" width="5" height="5" rx="1.2" opacity="0.8"/>
              <rect x="9" y="2" width="5" height="5" rx="1.2" opacity="0.8"/>
              <rect x="2" y="9" width="5" height="5" rx="1.2" opacity="0.8"/>
              <rect x="9" y="9" width="5" height="5" rx="1.2" opacity="0.5"/>
            </svg>
          </button>
          {/* Wifi */}
          <button className={`w-6 h-6 flex items-center justify-center rounded-md transition-colors ${isDark ? 'hover:bg-white/10 text-white/70' : 'hover:bg-black/10 text-slate-600'}`} title="Wi-Fi">
            <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
              <path d="M8 12a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm0-3.5c1.4 0 2.65.6 3.54 1.55l-1.06 1.06A3.48 3.48 0 0 0 8 10a3.48 3.48 0 0 0-2.48 1.11L4.46 10.05A4.98 4.98 0 0 1 8 8.5zm0-3.5c2.35 0 4.46 1 5.94 2.6l-1.06 1.06A6.46 6.46 0 0 0 8 6.5a6.46 6.46 0 0 0-4.88 2.16L2.06 7.6A7.96 7.96 0 0 1 8 5zm0-3.5c3.31 0 6.28 1.42 8.38 3.69l-1.06 1.06A9.44 9.44 0 0 0 8 3a9.44 9.44 0 0 0-7.32 3.25L-.38 5.19A10.96 10.96 0 0 1 8 1.5z" transform="scale(0.85) translate(1,0)"/>
            </svg>
          </button>
          {/* Battery */}
          <button className={`w-7 h-6 flex items-center justify-center rounded-md transition-colors ${isDark ? 'hover:bg-white/10 text-white/70' : 'hover:bg-black/10 text-slate-600'}`} title="Battery">
            <svg viewBox="0 0 20 12" fill="none" className="w-4 h-3" stroke="currentColor" strokeWidth="1.2">
              <rect x="0.6" y="0.6" width="16" height="10.8" rx="2.2" />
              <path d="M17 4v4" strokeWidth="2" strokeLinecap="round"/>
              <rect x="2.5" y="2.5" width="10" height="7" rx="1" fill="currentColor" stroke="none" opacity="0.85"/>
            </svg>
          </button>
          {/* Search */}
          <button className={`w-6 h-6 flex items-center justify-center rounded-md transition-colors ${isDark ? 'hover:bg-white/10 text-white/70' : 'hover:bg-black/10 text-slate-600'}`} title="Spotlight">
            <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
              <circle cx="6.5" cy="6.5" r="4" fill="none" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="9.5" y1="9.5" x2="13" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          {/* Notification Bell */}
          <button className={`w-6 h-6 flex items-center justify-center rounded-md transition-colors ${isDark ? 'hover:bg-white/10 text-white/70' : 'hover:bg-black/10 text-slate-600'}`} title="Notifications">
            <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
              <path d="M8 1a5 5 0 0 0-5 5v3l-1 1.5h12L13 9V6a5 5 0 0 0-5-5zm-1.5 11a1.5 1.5 0 0 0 3 0z"/>
            </svg>
          </button>

          <div className={`w-px h-4 mx-0.5 ${isDark ? 'bg-white/10' : 'bg-slate-300/60'}`}/>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setIsDark(d => !d)}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${isDark ? 'bg-white/10 hover:bg-white/20 text-yellow-400' : 'bg-slate-800/10 hover:bg-slate-800/20 text-slate-600'}`}
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => navigate('/')}
            className={`px-3 py-0.5 rounded-md transition-colors font-bold text-[12px] ${exitBtn}`}
          >
            Exit macOS Mode
          </button>
          <span className={`hidden sm:inline-block transition-colors duration-500 ${isDark ? 'text-white/70' : ''}`}>
            {currentTime.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}{' '}
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>

      {/* Main Desktop Area */}
      <div className="pt-16 pb-32 px-4 sm:px-8 h-screen overflow-hidden relative flex items-center justify-center">

        {/* Home Desktop Widgets */}
        {currentPage === 'home' && (
          <HomeDesktop currentTime={currentTime} setCurrentPage={handlePageChange} isDark={isDark} />
        )}

        {/* Active Window / Page */}
        {activePageData && (
          <div key={windowKey} className="w-full max-w-5xl animate-window-open z-10 relative">
            <div className={`${windowBg} rounded-[2rem] overflow-hidden flex flex-col transition-all duration-500`}>

              {/* Window Header */}
              <div className={`${windowHeader} px-6 py-4 flex items-center justify-between backdrop-blur-md transition-all duration-500`}>
                <div className="flex gap-2.5">
                  <button
                    className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] border border-[#e0443e] transition-all duration-200 flex items-center justify-center group shadow-inner hover:scale-110"
                    onClick={handleClose}
                  >
                    <span className="opacity-0 group-hover:opacity-100 text-[8px] font-bold text-red-900 mb-[1px]">x</span>
                  </button>
                  <button
                    className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] border border-[#dea123] transition-all duration-200 flex items-center justify-center group shadow-inner hover:scale-110"
                    onClick={handleClose}
                  >
                    <span className="opacity-0 group-hover:opacity-100 text-[8px] font-bold text-yellow-900 mb-[1px]">-</span>
                  </button>
                  <button className="w-3.5 h-3.5 rounded-full bg-[#27c93f] border border-[#1aab29] transition-all duration-200 shadow-inner hover:scale-110" />
                </div>
                <div className={`text-sm font-bold tracking-wider flex items-center gap-2 ${windowTitle}`}>
                  <div className={`w-4 h-4 rounded ${activePageData.color} flex items-center justify-center`}>
                    <div className="scale-[0.5] origin-center">{activePageData.dockIcon}</div>
                  </div>
                  {activePageData.title}
                </div>
                <div className="w-[52px]" />
              </div>

              {/* Window Content */}
              <div className={`flex-1 ${isDark ? 'bg-[#1c1c1e]/50' : 'bg-gradient-to-b from-transparent to-white/30'} transition-all duration-500`}>
                {activePageData.content}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dock */}
      <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 animate-dock-rise">
        <div className={`${dockBg} rounded-[2rem] px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-2 sm:gap-3 relative transition-all duration-500`}>

          {/* Home Button */}
          <div className="relative group">
            <div className={`absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 ${isDark ? 'bg-white/20 text-white border-white/20' : 'bg-slate-800/90 text-white border-white/10'} backdrop-blur-md text-[11px] font-medium rounded-lg transition-all duration-200 pointer-events-none whitespace-nowrap shadow-xl border ${hoveredDockItem === 'home' ? 'opacity-100 -translate-y-1' : 'opacity-0 translate-y-2'}`}>
              Desktop Home
              <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 ${isDark ? 'bg-white/20' : 'bg-slate-800/90'} rotate-45`} />
            </div>
            <button
              onClick={() => handlePageChange('home')}
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-[1rem] sm:rounded-[1.2rem] bg-blue-500 flex items-center justify-center shadow-md hover:shadow-xl transition-all duration-300 dock-icon relative ${currentPage === 'home' ? 'ring-2 ring-white/80' : ''}`}
              onMouseEnter={() => setHoveredDockItem('home')}
              onMouseLeave={() => setHoveredDockItem(null)}
            >
              <Home className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              {currentPage === 'home' && (
                <div className={`absolute -bottom-1.5 sm:-bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 ${dockDot} rounded-full`} />
              )}
            </button>
          </div>

          <div className={`w-px h-8 ${dockDivider} mx-1 transition-colors duration-500`} />

          {/* Page Buttons */}
          {Object.entries(pages).map(([key, page]) => {
            const isActive = currentPage === key;
            return (
              <div key={key} className="relative group">
                <div className={`absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 ${isDark ? 'bg-white/20 text-white border-white/20' : 'bg-slate-800/90 text-white border-white/10'} backdrop-blur-md text-[11px] font-medium rounded-lg transition-all duration-200 pointer-events-none whitespace-nowrap shadow-xl border ${hoveredDockItem === key ? 'opacity-100 -translate-y-1' : 'opacity-0 translate-y-2'}`}>
                  {page.title}
                  <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 ${isDark ? 'bg-white/20' : 'bg-slate-800/90'} rotate-45`} />
                </div>
                <button
                  onClick={() => handlePageChange(isActive ? 'home' : key)}
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-[1rem] sm:rounded-[1.2rem] ${page.color} flex items-center justify-center shadow-md hover:shadow-xl transition-all duration-300 dock-icon relative ${isActive ? 'ring-2 ring-white/80' : ''}`}
                  onMouseEnter={() => setHoveredDockItem(key)}
                  onMouseLeave={() => setHoveredDockItem(null)}
                >
                  {page.dockIcon}
                  {isActive && (
                    <div className={`absolute -bottom-1.5 sm:-bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 ${dockDot} rounded-full`} />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        /* Dock icon magnify */
        .dock-icon {
          transform-origin: bottom center;
          will-change: transform, margin;
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), margin 0.25s ease, box-shadow 0.25s ease;
        }
        @media (min-width: 640px) {
          .dock-icon:hover {
            transform: scale(1.4) translateY(-12px);
            margin: 0 12px;
            z-index: 10;
          }
        }
        @media (max-width: 639px) {
          .dock-icon:hover {
            transform: scale(1.2) translateY(-6px);
            margin: 0 5px;
            z-index: 10;
          }
        }

        /* Window open animation */
        @keyframes window-open {
          0% {
            opacity: 0;
            transform: scale(0.88) translateY(30px);
            filter: blur(4px);
          }
          60% {
            filter: blur(0px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: blur(0px);
          }
        }
        .animate-window-open {
          animation: window-open 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Dock rise animation on load */
        @keyframes dock-rise {
          0% { opacity: 0; transform: translateX(-50%) translateY(40px); }
          100% { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .animate-dock-rise {
          animation: dock-rise 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
        }

        /* Home desktop fade-in */
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(24px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Dark mode floating particles */
        @keyframes float-particle {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.15; }
          50% { transform: translateY(-30px) scale(1.05); opacity: 0.25; }
        }
        .animate-float-particle {
          animation: float-particle var(--duration, 7s) ease-in-out infinite;
        }

        /* Custom scrollbar */
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.12); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.22); }
      `}</style>
    </div>
  );
};

export default MacOSView;
