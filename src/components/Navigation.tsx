import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, Moon, Sun, ArrowUpRight } from 'lucide-react';

const Navigation = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
    { name: 'Experience', href: '#education' },
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled
        ? 'bg-stone-50/90 dark:bg-neutral-950/90 backdrop-blur-lg border-b border-neutral-200 dark:border-neutral-800'
        : ''
    }`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="text-xl font-bold tracking-tight">
            Aarvieve<span className="text-amber-500">.</span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`px-3 py-1.5 text-[13px] font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900'
                      : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100'
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <button
              onClick={() => navigate('/macos')}
              className="flex items-center gap-1.5 text-[13px] font-medium text-neutral-600 dark:text-neutral-400 hover:text-amber-500 dark:hover:text-amber-500 transition-colors"
            >
              macOS Mode
            </button>
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
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 z-[60]' : 'opacity-0 pointer-events-none -z-10'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile slide menu */}
      <div className={`fixed top-0 right-0 h-screen w-72 bg-stone-50 dark:bg-neutral-950 md:hidden transform transition-transform duration-300 ease-out ${
        isMenuOpen ? 'translate-x-0 z-[70]' : 'translate-x-full -z-10'
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
                      className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        isActive
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
            <button
              onClick={() => navigate('/macos')}
              className="w-full flex items-center justify-center gap-2 text-neutral-600 dark:text-neutral-400 px-4 py-2.5 rounded-full text-sm font-medium hover:text-amber-500 dark:hover:text-amber-500 transition-colors border border-neutral-300 dark:border-neutral-700"
            >
              macOS Mode
            </button>
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
