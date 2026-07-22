import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, Moon, Sun, ArrowUpRight, Monitor, ChevronDown } from 'lucide-react';

// Windows logo inline SVG
const WindowsLogo = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.8" />
  </svg>
);

// Apple logo inline SVG
const AppleLogo = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

const Navigation = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showUiDropdown, setShowUiDropdown] = useState(false);
  const uiDropdownRef = useRef<HTMLDivElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (uiDropdownRef.current && !uiDropdownRef.current.contains(e.target as Node)) {
        setShowUiDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));
    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? 'bg-stone-50/90 dark:bg-neutral-950/90 backdrop-blur-lg border-b border-neutral-200 dark:border-neutral-800'
        : ''
      }`}>
      {/* Cinematic scroll progress bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] z-10 overflow-hidden">
        <div
          className="h-full transition-all duration-150 ease-out"
          style={{
            width: `${scrollProgress}%`,
            background: 'linear-gradient(90deg, #f59e0b, #d97706, #f59e0b)',
            boxShadow: '0 0 8px rgba(245,158,11,0.8)',
          }}
        />
      </div>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, '#home')}
            className="text-xl font-black tracking-tight group relative"
          >
            <span className="group-hover:text-amber-500 transition-colors duration-300">Aarvieve</span>
            <span
              className="text-amber-500 inline-block group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300 origin-center"
              style={{ display: 'inline-block' }}
            >.</span>
            {/* Underline shimmer on hover */}
            <span
              className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-400 rounded-full"
            />
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, idx) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`relative px-3 py-1.5 text-[13px] font-medium rounded-full transition-all duration-300 ${isActive
                      ? 'text-white'
                      : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100'
                    }`}
                  style={{ transitionDelay: `${idx * 30}ms` }}
                >
                  {/* Active background — amber glow pill */}
                  {isActive && (
                    <span
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'linear-gradient(135deg, rgba(245,158,11,0.9), rgba(217,119,6,0.85))',
                        boxShadow: '0 0 16px rgba(245,158,11,0.4), inset 0 1px 0 rgba(255,255,255,0.15)',
                      }}
                    />
                  )}
                  {/* Hover glow */}
                  {!isActive && (
                    <span
                      className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"
                      style={{ background: 'rgba(245,158,11,0.07)' }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                  {/* Active glow dot below */}
                  {isActive && (
                    <span
                      className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-400"
                      style={{ boxShadow: '0 0 8px rgba(245,158,11,1)', animation: 'dot-glow 2s ease-in-out infinite' }}
                    />
                  )}
                </a>
              );
            })}
          </div>
          <style>{`@keyframes dot-glow { 0%,100%{opacity:1;transform:translateX(-50%) scale(1);} 50%{opacity:0.5;transform:translateX(-50%) scale(1.8);} }`}</style>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            {/* UI Mode dropdown */}
            <div className="relative" ref={uiDropdownRef}>
              <button
                onClick={() => setShowUiDropdown(v => !v)}
                className={`flex items-center gap-1.5 text-[13px] font-medium transition-all duration-200 px-3 py-1.5 rounded-full border ${showUiDropdown
                    ? 'border-amber-500/60 text-amber-500 bg-amber-500/5'
                    : 'border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:text-amber-500 dark:hover:text-amber-500 hover:border-amber-500/40'
                  }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                UI Mode
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${showUiDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showUiDropdown && (
                <div className="absolute top-full mt-2 right-0 w-44 rounded-2xl overflow-hidden shadow-2xl border border-neutral-200 dark:border-neutral-800 bg-stone-50/95 dark:bg-neutral-900/95 backdrop-blur-xl z-[100] animate-dropdown">
                  <div className="px-3 py-2 border-b border-neutral-200 dark:border-neutral-800">
                    <p className="text-[10px] font-bold text-neutral-400 dark:text-neutral-600 uppercase tracking-widest">Choose UI Mode</p>
                  </div>
                  <button
                    onClick={() => { navigate('/macos'); setShowUiDropdown(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-[13px] font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors group"
                  >
                    <span className="w-7 h-7 rounded-lg bg-neutral-900 dark:bg-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <AppleLogo size={14} />
                    </span>
                    <span className="text-white dark:text-neutral-900 sr-only">Apple</span>
                    <div className="flex flex-col items-start">
                      <span>macOS Mode</span>
                      <span className="text-[10px] text-neutral-400">Mac-style UI</span>
                    </div>
                  </button>
                  <button
                    onClick={() => { navigate('/windows'); setShowUiDropdown(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-[13px] font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors group border-b border-neutral-200 dark:border-neutral-800"
                  >
                    <span className="w-7 h-7 rounded-lg bg-[#0078d4] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform text-white">
                      <WindowsLogo size={14} />
                    </span>
                    <div className="flex flex-col items-start">
                      <span>Windows Mode</span>
                      <span className="text-[10px] text-neutral-400">Win 11-style UI</span>
                    </div>
                  </button>
                  <button
                    onClick={() => { navigate('/'); setShowUiDropdown(false); }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 text-[13px] font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors group"
                  >
                    Exit Mode
                  </button>
                </div>
              )}
            </div>
            <a
              href="/CAÑADA CV (3).pdf"
              download="CAÑADA_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[13px] font-medium border border-neutral-300 dark:border-neutral-700 px-3.5 py-1.5 rounded-full hover:bg-neutral-900 hover:text-white dark:hover:bg-neutral-100 dark:hover:text-neutral-900 transition-all duration-200"
            >
              CV
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-neutral-600 dark:text-neutral-400"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 z-[60]' : 'opacity-0 pointer-events-none -z-10'
          }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile slide menu */}
      <div className={`fixed top-0 right-0 h-screen w-72 bg-stone-50 dark:bg-neutral-950 md:hidden transform transition-transform duration-300 ease-out ${isMenuOpen ? 'translate-x-0 z-[70]' : 'translate-x-full -z-10'
        }`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-end p-5">
            <button onClick={() => setIsMenuOpen(false)} className="p-2 text-neutral-400" aria-label="Close menu">
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="flex-1 px-6">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      onClick={(e) => scrollToSection(e, item.href)}
                      className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive
                          ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900'
                          : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100'
                        }`}
                    >
                      {item.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="px-6 pb-8 space-y-3">
            {/* Mobile UI Mode options */}
            <div className="space-y-2">
              <p className="text-[10px] font-bold text-neutral-400 dark:text-neutral-600 uppercase tracking-widest px-1">UI Mode</p>
              <button
                onClick={() => navigate('/macos')}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-medium border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <span className="w-7 h-7 rounded-lg bg-neutral-900 dark:bg-white flex items-center justify-center shrink-0">
                  <AppleLogo size={13} />
                </span>
                macOS Mode
              </button>
              <button
                onClick={() => navigate('/windows')}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-medium border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <span className="w-7 h-7 rounded-lg bg-[#0078d4] flex items-center justify-center shrink-0">
                  <WindowsLogo size={13} />
                </span>
                Windows Mode
              </button>
            </div>
            <a
              href="/CAÑADA CV (3).pdf"
              download="CAÑADA_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 border border-neutral-300 dark:border-neutral-700 px-4 py-2.5 rounded-full text-sm font-medium hover:bg-neutral-900 hover:text-white dark:hover:bg-neutral-100 dark:hover:text-neutral-900 transition-colors"
            >
              CV
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
