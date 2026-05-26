import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home, User, Code, Briefcase, MessageSquare, Award,
  X, Minus, Maximize2, Search, Wifi, Battery, Volume2,
  ChevronUp, ArrowUpRight, Github, Linkedin, Mail, GraduationCap, Sun, Moon,
  Power, ChevronRight, FileText, MonitorPlay, Layers,
  LayoutGrid, ArrowUpDown, RefreshCw, PlusCircle, Monitor, Paintbrush, TerminalSquare, Code2, ExternalLink
} from 'lucide-react';

// ── Windows Logo ─────────────────────────────────────────────────────────
const WinLogo = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 88 88" fill="none" className={className}>
    <rect x="0" y="0" width="40" height="40" fill="#00A4EF" rx="4" />
    <rect x="48" y="0" width="40" height="40" fill="#00A4EF" rx="4" />
    <rect x="0" y="48" width="40" height="40" fill="#00A4EF" rx="4" />
    <rect x="48" y="48" width="40" height="40" fill="#00A4EF" rx="4" />
  </svg>
);

// ── App icon button used in both desktop and start menu ──────────────────
const AppTile = ({
  icon, label, color, onClick, isActive = false, isDesktop = false
}: {
  icon: React.ReactNode; label: string; color: string; onClick: () => void; isActive?: boolean; isDesktop?: boolean;
}) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center gap-1.5 group transition-all duration-200 ${isActive && !isDesktop ? 'opacity-100' : ''} ${isDesktop ? 'w-20 p-2 rounded-lg hover:bg-white/10' : ''}`}
    title={label}
  >
    <div
      className={`w-10 h-10 ${isDesktop ? 'w-12 h-12' : ''} rounded-lg ${color} flex items-center justify-center shadow-md group-hover:scale-110 transition-all duration-200 relative`}
    >
      {icon}
      {isActive && !isDesktop && (
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white shadow-sm" />
      )}
    </div>
    <span className={`text-[11px] font-medium transition-colors leading-tight text-center max-w-[70px] ${isDesktop ? 'text-white drop-shadow-md' : 'text-neutral-600 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white'} truncate`}>{label}</span>
  </button>
);

// ── Skill tags content (inline, no window needed) ────────────────────────
const SkillsContent = () => {
  const cats = [
    { label: 'Frontend', color: 'bg-purple-100 text-purple-700 border-purple-200', items: ['React', 'TypeScript', 'Tailwind CSS', 'HTML', 'CSS', 'JavaScript', 'Flutter', 'Dart', 'React Native'] },
    { label: 'Backend', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', items: ['Node.js', 'PHP', 'C#', 'ASP.NET Core', 'MySQL', 'SQL Server', 'Firebase'] },
    { label: 'Tools', color: 'bg-amber-100 text-amber-700 border-amber-200', items: ['Git', 'GitHub', 'Vite', 'Figma', 'UX Design', 'Project Management'] },
  ];
  return (
    <div className="p-6 h-[58vh] overflow-y-auto custom-scrollbar space-y-5">
      {cats.map(c => (
        <div key={c.label} className="bg-white/70 dark:bg-neutral-800/70 rounded-2xl border border-white dark:border-neutral-700 p-5 shadow-sm">
          <p className={`text-[10px] font-black uppercase tracking-widest mb-3 ${c.color.split(' ')[1]}`}>{c.label}</p>
          <div className="flex flex-wrap gap-2">
            {c.items.map(s => (
              <span key={s} className={`px-3 py-1.5 text-xs font-semibold rounded-xl border shadow-sm hover:scale-105 transition-transform cursor-default ${c.color}`}>{s}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// ── Projects content ──────────────────────────────────────────────────────
const ProjectsContent = () => {
  const projects = [
    { title: 'Schatzies Events', desc: 'Professional event planning website. Modern, responsive front-end.', tech: ['React', 'TypeScript', 'Tailwind'], github: 'https://github.com/batdimoiprint/schatzies-events', demo: 'https://www.schatziesevents.com/', color: 'from-blue-500 to-indigo-600', role: 'Front-End Dev' },
    { title: 'Algorithm Portfolio', desc: 'Algorithm implementations with macOS-inspired UI & interactive demos.', tech: ['React', 'TypeScript', 'Tailwind'], github: 'https://github.com/EYRON27/aaron-compilation-portfolio', demo: 'https://aaron-compilation-portfolio.vercel.app/', color: 'from-rose-500 to-orange-600', role: '' },
    { title: 'LinguaLink', desc: 'Flutter mobile app — real-time translation, OCR, vocab mini-games.', tech: ['Flutter', 'Dart', 'Firebase'], github: 'https://github.com/Uryegedon/smarttranslate', demo: '', color: 'from-emerald-500 to-teal-600', role: 'Frontend Dev' },
    { title: 'AarvieveLifeSync', desc: 'All-in-one productivity hub: tasks, expenses, passwords.', tech: ['React', 'Express', 'TypeScript', 'Firebase'], github: 'https://github.com/EYRON27/AarvieveLifeSync', demo: 'https://aarvieve-life-sync-website.vercel.app/', color: 'from-amber-500 to-yellow-600', role: 'Full Stack' },
    { title: 'MySuperSystem2025', desc: 'ASP.NET Core MVC full-stack app — expense, tasks, password manager.', tech: ['C#', 'ASP.NET Core', 'EF Core', 'SQL Server'], github: 'https://github.com/EYRON27/MySuperSystem2025', demo: '', color: 'from-purple-500 to-fuchsia-600', role: '' },
    { title: 'RL Phil Construction', desc: 'Responsive static site for a construction company brand.', tech: ['React', 'TypeScript', 'Tailwind'], github: 'https://github.com/EYRON27/rl-phil', demo: 'https://rl-phil-construction.vercel.app', color: 'from-slate-500 to-gray-600', role: '' },
  ];
  return (
    <div className="p-6 h-[58vh] overflow-y-auto custom-scrollbar grid grid-cols-1 md:grid-cols-2 gap-4">
      {projects.map((p, i) => (
        <div key={i} className="bg-white dark:bg-neutral-800 rounded-2xl border border-slate-100 dark:border-neutral-700 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col overflow-hidden">
          <div className={`h-1.5 bg-gradient-to-r ${p.color}`} />
          <div className="p-5 flex flex-col flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-bold text-slate-800 dark:text-neutral-100 text-sm leading-tight">{p.title}</h3>
                {p.role && <span className="inline-block mt-1 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest bg-amber-100 text-amber-700 rounded-md">{p.role}</span>}
              </div>
              <div className="flex gap-1.5 ml-2 shrink-0">
                <a href={p.github} target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-full bg-slate-100 dark:bg-neutral-700 hover:bg-slate-200 dark:hover:bg-neutral-600 flex items-center justify-center text-slate-500 dark:text-neutral-300 transition-all"><Github className="w-3.5 h-3.5" /></a>
                {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-full bg-slate-100 dark:bg-neutral-700 hover:bg-slate-200 dark:hover:bg-neutral-600 flex items-center justify-center text-slate-500 dark:text-neutral-300 transition-all"><ArrowUpRight className="w-3.5 h-3.5" /></a>}
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-neutral-400 leading-relaxed flex-1 mb-3">{p.desc}</p>
            <div className="flex flex-wrap gap-1.5">
              {p.tech.map(t => <span key={t} className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide bg-neutral-100 dark:bg-neutral-700 text-slate-600 dark:text-neutral-300 rounded-md">{t}</span>)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ── About content ──────────────────────────────────────────────────────────
const AboutContent = () => (
  <div className="p-8 sm:p-10 flex flex-col md:flex-row items-center md:items-start gap-8 min-h-[50vh]">
    <img src="/aaron.jpg" alt="Aaron Cañada" className="w-36 h-36 rounded-3xl object-cover shadow-xl border-4 border-white dark:border-neutral-800 shrink-0 hover:scale-105 transition-transform duration-500" />
    <div className="text-center md:text-left flex-1">
      <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
        <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
        <span className="text-[11px] font-black text-green-600 tracking-widest uppercase">Available for work</span>
      </div>
      <h2 className="text-4xl font-black mb-1 tracking-tight text-slate-800 dark:text-neutral-100">Aaron Cañada</h2>
      <h3 className="text-sm font-bold text-blue-500 tracking-widest mb-5 uppercase">IT Student & Full-Stack Developer</h3>
      <p className="leading-relaxed text-slate-600 dark:text-neutral-400 max-w-2xl">
        A passionate developer specializing in building modern web applications. Experienced in React, TypeScript, and full-stack development with a focus on creating intuitive, high-performance user experiences.
      </p>
      <div className="mt-6 flex flex-wrap gap-2 justify-center md:justify-start">
        {['React', 'TypeScript', 'Node.js', 'C#', 'Flutter', 'Figma'].map(t => (
          <span key={t} className="px-3 py-1 text-xs font-bold bg-neutral-100 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm">{t}</span>
        ))}
      </div>
    </div>
  </div>
);

// ── Education / Certs content ─────────────────────────────────────────────
const EducationContent = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const certs = [
    { name: 'Google UX Design Specialization', issuer: 'Google', date: 'Apr 2025', image: '/Certificates/Google UX Specialization.png' },
    { name: 'Technical Support Fundamentals', issuer: 'Google', date: 'Dec 2025', image: '/Certificates/Technical Support Fundamentals.png' },
    { name: 'Foundation of Project Management', issuer: 'Google', date: 'Dec 2025', image: '/Certificates/Foundation of Project Management.png' },
    { name: 'Build Dynamic UI for Websites', issuer: 'Google', date: 'Apr 2025', image: '/Certificates/Build Dynamic User Interfaces (UI) for Websites.png' },
    { name: 'Design UX for Social Good', issuer: 'Google', date: 'Apr 2025', image: '/Certificates/Design a User Experience for Social Good.png' },
    { name: 'Build Wireframes & Prototypes', issuer: 'Google', date: 'Mar 2025', image: '/Certificates/Build Wireframes and Low Fidelity Prototypes.png' },
  ];
  return (
    <div className="p-6 h-[58vh] overflow-y-auto custom-scrollbar space-y-6 relative">
      <div>
        <h3 className="text-xs font-black uppercase tracking-widest text-amber-500 flex items-center gap-2 mb-4"><GraduationCap className="w-4 h-4" />Academic</h3>
        <div className="space-y-3">
          {[{ deg: 'BS Information Technology', school: 'Quezon City University', year: '2023 – Present', color: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/30' },
          { deg: 'Senior High School', school: 'Commonwealth High School', year: '2022 – 2023', color: 'bg-slate-50 dark:bg-neutral-800/50 border-slate-200 dark:border-neutral-700' }
          ].map((e, i) => (
            <div key={i} className={`${e.color} rounded-2xl border p-5 flex items-center justify-between shadow-sm`}>
              <div><h4 className="font-bold text-slate-800 dark:text-neutral-200 text-sm">{e.deg}</h4><p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">{e.school}</p></div>
              <span className="text-xs font-bold text-slate-500 dark:text-neutral-300 bg-white dark:bg-neutral-800 rounded-lg px-3 py-1 border border-slate-200 dark:border-neutral-700 whitespace-nowrap">{e.year}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-xs font-black uppercase tracking-widest text-blue-500 flex items-center gap-2 mb-4"><Award className="w-4 h-4" />Google Certifications</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {certs.map((c, i) => (
            <div key={i} onClick={() => setLightboxIndex(i)} className="bg-white dark:bg-neutral-800 rounded-2xl border border-slate-100 dark:border-neutral-700 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer overflow-hidden group flex flex-col">
              <div className="h-28 bg-slate-50 dark:bg-neutral-900 overflow-hidden border-b border-slate-100 dark:border-neutral-700 relative">
                <img src={c.image} alt={c.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-white/90 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all flex items-center justify-center text-sm shadow text-black">👁️</div>
                </div>
              </div>
              <div className="p-3 flex-1 flex flex-col">
                <p className="font-semibold text-slate-800 dark:text-neutral-200 text-[10px] leading-tight flex-1">{c.name}</p>
                <div className="flex justify-between mt-2">
                  <span className="text-[9px] text-slate-400">{c.issuer}</span>
                  <span className="text-[9px] font-bold text-blue-500">{c.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-xl flex items-center justify-center p-4" onClick={() => setLightboxIndex(null)}>
          <button className="absolute top-4 right-4 p-2.5 bg-white/20 hover:bg-white/30 rounded-full text-white" onClick={() => setLightboxIndex(null)}><X className="w-5 h-5" /></button>
          <div className="max-w-3xl w-full bg-white/10 backdrop-blur-3xl p-6 rounded-3xl border border-white/20 shadow-2xl" onClick={e => e.stopPropagation()}>
            <img src={certs[lightboxIndex].image} alt={certs[lightboxIndex].name} className="w-full h-auto max-h-[65vh] object-contain rounded-xl" />
            <p className="text-white font-bold text-center mt-4">{certs[lightboxIndex].name}</p>
          </div>
        </div>
      )}
    </div>
  );
};

// ── Contact content ───────────────────────────────────────────────────────
const ContactContent = () => (
  <div className="p-8 sm:p-12 flex flex-col items-center justify-center min-h-[50vh] text-center">
    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-green-500 mb-6 shadow-inner">
      <MessageSquare className="w-10 h-10" />
    </div>
    <h3 className="text-3xl font-black text-slate-800 dark:text-neutral-100 mb-3 tracking-tight">Let's build something!</h3>
    <p className="text-slate-500 dark:text-neutral-400 max-w-md text-base mb-8 leading-relaxed">
      I'm currently looking for new opportunities. Feel free to reach out for collaborations, or just a friendly chat!
    </p>
    <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-xl">
      {[
        { icon: <Mail className="w-5 h-5 text-rose-500" />, label: 'Email Me', href: 'mailto:your.email@example.com' },
        { icon: <Github className="w-5 h-5 text-slate-800 dark:text-neutral-200" />, label: 'GitHub', href: 'https://github.com/EYRON27' },
        { icon: <Linkedin className="w-5 h-5 text-blue-600" />, label: 'LinkedIn', href: 'https://linkedin.com' },
      ].map((item, idx) => (
        <a key={idx} href={item.href} target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 px-6 py-4 bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-slate-100 dark:border-neutral-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 font-bold text-slate-700 dark:text-neutral-200 w-full sm:w-auto"
        >
          {item.icon} <span>{item.label}</span>
        </a>
      ))}
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────
// MAIN WINDOWS VIEW
// ─────────────────────────────────────────────────────────────────────────
const WindowsView = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [showStart, setShowStart] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [windowKey, setWindowKey] = useState(0);
  const startRef = useRef<HTMLDivElement>(null);

  // ── Context Menu State ──
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    let x = e.clientX;
    let y = e.clientY;
    const menuWidth = 260; 
    const menuHeight = 350; 
    
    if (x + menuWidth > window.innerWidth) x = window.innerWidth - menuWidth - 5;
    if (y + menuHeight > window.innerHeight) y = window.innerHeight - menuHeight - 5;

    setContextMenu({ x, y });
    setShowStart(false);
  };

  const closeContextMenu = () => {
    if (contextMenu) setContextMenu(null);
  };

  const [showQuickSettings, setShowQuickSettings] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const quickSettingsRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (startRef.current && !startRef.current.contains(target)) setShowStart(false);
      if (quickSettingsRef.current && !quickSettingsRef.current.contains(target)) setShowQuickSettings(false);
      if (calendarRef.current && !calendarRef.current.contains(target)) setShowCalendar(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const openWindow = (name: string) => {
    setActiveWindow(name);
    setWindowKey(k => k + 1);
    setShowStart(false);
  };

  const closeWindow = () => setActiveWindow(null);

  // ── Window contents map ──────────────────────────────────────────────
  const windows: Record<string, { title: string; icon: React.ReactNode; color: string; content: React.ReactNode }> = {
    about: { title: 'About Me', icon: <User className="w-5 h-5 text-white" />, color: 'bg-teal-500', content: <AboutContent /> },
    skills: { title: 'Skills & Technologies', icon: <Code className="w-5 h-5 text-white" />, color: 'bg-purple-500', content: <SkillsContent /> },
    projects: { title: 'Featured Projects', icon: <Briefcase className="w-5 h-5 text-white" />, color: 'bg-orange-500', content: <ProjectsContent /> },
    education: { title: 'Education & Certificates', icon: <Award className="w-5 h-5 text-white" />, color: 'bg-yellow-500', content: <EducationContent /> },
    contact: { title: 'Get In Touch', icon: <MessageSquare className="w-5 h-5 text-white" />, color: 'bg-green-500', content: <ContactContent /> },
  };

  const activeWin = activeWindow ? windows[activeWindow] : null;

  // ── Theme ────────────────────────────────────────────────────────────
  // Windows 11 default dark bloom wallpaper approximation
  const wallpaper = isDark
    ? 'bg-gradient-to-br from-[#000428] via-[#004e92] to-[#000428] bg-cover bg-center'
    : 'bg-gradient-to-br from-[#89f7fe] to-[#66a6ff]';

  const taskbarBg = isDark
    ? 'bg-[#1a1a2e]/90 backdrop-blur-3xl border-t border-white/5'
    : 'bg-white/85 backdrop-blur-3xl border-t border-neutral-300/40';

  const taskText = isDark ? 'text-white' : 'text-neutral-800';

  // ── Desktop & Start Menu apps ─────────────────────────────────────────
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

  return (
    <div
      className={`min-h-screen ${wallpaper} overflow-hidden font-sans relative transition-all duration-500 select-none`}
      onClick={() => {
        if (showStart) setShowStart(false);
        closeContextMenu();
      }}
      onContextMenu={handleContextMenu}
    >
      {/* ── Windows 11 Bloom aesthetic blobs ── */}
      {isDark && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-blue-500/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] bg-indigo-500/10 rounded-full blur-[150px]" />
        </div>
      )}

      {/* ── DESKTOP ICONS (Left-aligned) ── */}
      <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
        <button onClick={() => navigate('/')} className="flex flex-col items-center gap-1.5 group w-20 p-2 rounded-lg hover:bg-white/10 transition-colors">
          <div className="w-12 h-12 flex items-center justify-center text-4xl drop-shadow-md group-hover:scale-105 transition-transform">
            🗑️
          </div>
          <span className="text-[11px] text-white font-medium drop-shadow-md text-center leading-tight">Exit Mode</span>
        </button>

        {allApps.slice(0, 5).map(app => (
          <AppTile
            key={app.id}
            icon={app.icon}
            label={app.label}
            color={app.color}
            onClick={() => app.href ? window.open(app.href, '_blank') : openWindow(app.id)}
            isDesktop={true}
          />
        ))}
      </div>

      {/* ══ CONTEXT MENU ════════════════════════════════════════════════ */}
      {contextMenu && (
        <div 
          className={`fixed z-[100] w-64 rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.4)] border py-1.5 ${isDark ? 'bg-[#2b2b2b]/95 border-white/10 text-white' : 'bg-[#f9f9f9]/95 border-neutral-300 text-neutral-800'} backdrop-blur-3xl text-xs font-medium`}
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onClick={(e) => { e.stopPropagation(); closeContextMenu(); }}
          onContextMenu={e => { e.preventDefault(); e.stopPropagation(); closeContextMenu(); }}
        >
          <div className={`flex items-center justify-between px-3 py-1.5 mx-1.5 rounded hover:${isDark ? 'bg-white/10' : 'bg-black/5'} cursor-pointer`}>
            <div className="flex items-center gap-3"><LayoutGrid className="w-4 h-4 opacity-70"/> View</div>
            <ChevronRight className="w-3.5 h-3.5 opacity-50"/>
          </div>
          <div className={`flex items-center justify-between px-3 py-1.5 mx-1.5 rounded hover:${isDark ? 'bg-white/10' : 'bg-black/5'} cursor-pointer`}>
            <div className="flex items-center gap-3"><ArrowUpDown className="w-4 h-4 opacity-70"/> Sort by</div>
            <ChevronRight className="w-3.5 h-3.5 opacity-50"/>
          </div>
          <div className={`flex items-center gap-3 px-3 py-1.5 mx-1.5 rounded hover:${isDark ? 'bg-white/10' : 'bg-black/5'} cursor-pointer`}>
            <RefreshCw className="w-4 h-4 opacity-70"/> Refresh
          </div>
          
          <div className={`h-px w-full my-1.5 ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
          
          <div className={`flex items-center justify-between px-3 py-1.5 mx-1.5 rounded hover:${isDark ? 'bg-white/10' : 'bg-black/5'} cursor-pointer`}>
            <div className="flex items-center gap-3"><PlusCircle className="w-4 h-4 opacity-70"/> New</div>
            <ChevronRight className="w-3.5 h-3.5 opacity-50"/>
          </div>

          <div className={`h-px w-full my-1.5 ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
          
          <div className={`flex items-center gap-3 px-3 py-1.5 mx-1.5 rounded hover:${isDark ? 'bg-white/10' : 'bg-black/5'} cursor-pointer`}>
            <Monitor className="w-4 h-4 opacity-70 text-blue-500"/> Display settings
          </div>
          <div className={`flex items-center gap-3 px-3 py-1.5 mx-1.5 rounded hover:${isDark ? 'bg-white/10' : 'bg-black/5'} cursor-pointer`}>
            <Paintbrush className="w-4 h-4 opacity-70 text-blue-500"/> Personalize
          </div>

          <div className={`h-px w-full my-1.5 ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
          
          <div className={`flex items-center gap-3 px-3 py-1.5 mx-1.5 rounded hover:${isDark ? 'bg-white/10' : 'bg-black/5'} cursor-pointer`}>
            <TerminalSquare className="w-4 h-4 opacity-70"/> Open in Terminal
          </div>
          <div className={`flex items-center gap-3 px-3 py-1.5 mx-1.5 rounded hover:${isDark ? 'bg-white/10' : 'bg-black/5'} cursor-pointer`}>
            <Code2 className="w-4 h-4 opacity-70"/> Open with Zed
          </div>

          <div className={`h-px w-full my-1.5 ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />

          <div className={`flex items-center gap-3 px-3 py-1.5 mx-1.5 rounded hover:${isDark ? 'bg-white/10' : 'bg-black/5'} cursor-pointer`}>
            <ExternalLink className="w-4 h-4 opacity-70"/> Show more options
          </div>
        </div>
      )}

      {/* ══ WINDOW OVERLAY ════════════════════════════════════════════════ */}
      {activeWin && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm" onClick={closeWindow}>
          <div
            key={windowKey}
            className={`w-full max-w-5xl animate-win-open rounded-xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)] border ${isDark ? 'bg-[#1f1f1f] border-white/10' : 'bg-[#f3f3f3] border-white/60'}`}
            onClick={e => e.stopPropagation()}
          >
            {/* Title bar */}
            <div className={`flex items-center justify-between px-4 py-2 select-none ${isDark ? 'bg-[#2b2b2b]' : 'bg-[#e8e8e8]'}`}>
              <div className="flex items-center gap-2.5">
                <div className={`w-5 h-5 rounded ${activeWin.color} flex items-center justify-center shadow-sm`}>
                  <div className="scale-[0.5]">{activeWin.icon}</div>
                </div>
                <span className={`text-xs font-semibold ${isDark ? 'text-white/80' : 'text-neutral-600'}`}>{activeWin.title}</span>
              </div>
              <div className="flex -mr-2">
                <button className={`w-11 h-8 flex items-center justify-center transition-colors rounded-sm ${isDark ? 'text-white/50 hover:bg-white/10' : 'text-neutral-500 hover:bg-black/5'}`} onClick={closeWindow}><Minus className="w-3.5 h-3.5" /></button>
                <button className={`w-11 h-8 flex items-center justify-center transition-colors rounded-sm ${isDark ? 'text-white/50 hover:bg-white/10' : 'text-neutral-500 hover:bg-black/5'}`}><Maximize2 className="w-3 h-3" /></button>
                <button className={`w-11 h-8 flex items-center justify-center transition-colors hover:bg-red-500 hover:text-white rounded-tr-xl ${isDark ? 'text-white/50' : 'text-neutral-500'}`} onClick={closeWindow}><X className="w-3.5 h-3.5" /></button>
              </div>
            </div>
            {/* Content */}
            <div className={isDark ? 'bg-[#1a1a1a] text-white' : 'bg-white text-black'}>
              {activeWin.content}
            </div>
          </div>
        </div>
      )}

      {/* ══ START MENU ════════════════════════════════════════════════════ */}
      {showStart && (
        <div className="fixed bottom-[60px] left-1/2 -translate-x-1/2 z-[60] w-[640px] max-w-[95vw]">
          <div
            ref={startRef}
            className={`w-full h-full ${isDark ? 'bg-[#242424]/95 text-white border-white/10' : 'bg-white/95 text-black border-black/10'} backdrop-blur-3xl rounded-xl border shadow-[0_30px_80px_rgba(0,0,0,0.4)] animate-win-open overflow-hidden flex flex-col p-8`}
            onClick={e => e.stopPropagation()}
          >
          {/* Search bar inside start menu */}
          <div className={`flex items-center gap-3 px-4 py-2.5 rounded-full ${isDark ? 'bg-white/5 border border-white/10' : 'bg-neutral-100 border border-neutral-200'} mb-8`}>
            <Search className="w-4 h-4 opacity-50" />
            <input type="text" placeholder="Type here to search" className="bg-transparent border-none outline-none text-sm w-full placeholder:opacity-50" disabled />
          </div>

          {/* Pinned section */}
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
                  }
                  else if (app.href) window.open(app.href, '_blank');
                  else openWindow(app.id);
                }}
              />
            ))}
          </div>

          {/* Recommended section */}
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
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${isDark ? 'bg-white/5' : 'bg-white shadow-sm'}`}>
                  {item.icon}
                </div>
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
            <button onClick={() => navigate('/')} className={`p-2.5 ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'} rounded-lg transition-colors`} title="Power / Exit Mode">
              <Power className="w-4 h-4 opacity-80" />
            </button>
          </div>
        </div>
        </div>
      )}

      {/* ══ QUICK SETTINGS MODAL ═════════════════════════════════════════ */}
      {showQuickSettings && (
        <div 
          ref={quickSettingsRef}
          className={`fixed bottom-[60px] right-4 z-[60] w-[360px] ${isDark ? 'bg-[#242424]/95 text-white border-white/10' : 'bg-[#f3f3f3]/95 text-neutral-800 border-neutral-300'} backdrop-blur-3xl rounded-xl border shadow-[0_30px_80px_rgba(0,0,0,0.4)] animate-win-open p-5`}
          onClick={e => e.stopPropagation()}
        >
          <div className="grid grid-cols-3 gap-4 mb-5">
            <div className={`flex flex-col items-center justify-center p-3 rounded-lg ${isDark ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-600'} text-white cursor-pointer transition-colors`}>
               <Wifi className="w-5 h-5 mb-2"/>
               <span className="text-[11px] font-medium">Wi-Fi</span>
            </div>
            <div className={`flex flex-col items-center justify-center p-3 rounded-lg ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-neutral-50 shadow-sm'} cursor-pointer transition-colors`}>
               <Battery className="w-5 h-5 mb-2"/>
               <span className="text-[11px] font-medium">Battery saver</span>
            </div>
            <div className={`flex flex-col items-center justify-center p-3 rounded-lg ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-neutral-50 shadow-sm'} cursor-pointer transition-colors`} onClick={() => setIsDark(!isDark)}>
               {isDark ? <Moon className="w-5 h-5 mb-2"/> : <Sun className="w-5 h-5 mb-2"/>}
               <span className="text-[11px] font-medium">Theme</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Volume2 className={`w-5 h-5 ${isDark ? 'text-white/70' : 'text-neutral-500'}`} />
            <div className="flex-1 h-1.5 rounded-full bg-blue-500 relative cursor-pointer">
              <div className="absolute top-1/2 -translate-y-1/2 right-[20%] w-3.5 h-3.5 bg-white rounded-full shadow-md" />
            </div>
            <span className={`text-xs font-medium ${isDark ? 'text-white/70' : 'text-neutral-500'}`}>80</span>
          </div>
        </div>
      )}

      {/* ══ CALENDAR MODAL ═══════════════════════════════════════════════ */}
      {showCalendar && (
        <div 
          ref={calendarRef}
          className={`fixed bottom-[60px] right-2 z-[60] w-[320px] ${isDark ? 'bg-[#242424]/95 text-white border-white/10' : 'bg-[#f3f3f3]/95 text-neutral-800 border-neutral-300'} backdrop-blur-3xl rounded-xl border shadow-[0_30px_80px_rgba(0,0,0,0.4)] animate-win-open p-5`}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">{currentTime.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}</h3>
            <button className={`p-1.5 rounded ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}><ChevronUp className="w-4 h-4" /></button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
            {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => <div key={d} className={`font-semibold ${isDark ? 'text-white/50' : 'text-neutral-500'}`}>{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {Array.from({length: 31}, (_, i) => (
              <div key={i} className={`p-2 rounded-full ${i+1 === currentTime.getDate() ? 'bg-blue-500 text-white font-bold' : isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'} cursor-pointer transition-colors`}>
                {i+1}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══ TASKBAR ═══════════════════════════════════════════════════════ */}
      <div className={`fixed bottom-0 inset-x-0 h-[48px] ${taskbarBg} flex items-center justify-between z-50 transition-all duration-500 px-3`}>

        {/* Left: weather/widgets area */}
        <div className={`flex items-center gap-2 ${taskText} hover:bg-white/10 px-2 py-1 rounded-md cursor-pointer transition-colors`}>
          <span className="text-xl">☀️</span>
          <div className="leading-tight flex flex-col">
            <span className="font-semibold text-[11px]">32°C</span>
            <span className="opacity-70 text-[10px]">Mostly clear</span>
          </div>
        </div>

        {/* Center: Windows logo + Search + taskbar apps */}
        <div className="flex items-center gap-1.5 absolute left-1/2 -translate-x-1/2">

          {/* Start button */}
          <button
            onClick={e => { e.stopPropagation(); setShowStart(s => !s); }}
            className={`w-10 h-10 rounded-md flex items-center justify-center transition-all ${showStart ? (isDark ? 'bg-white/20' : 'bg-white/50') : (isDark ? 'hover:bg-white/10' : 'hover:bg-white/40')}`}
          >
            <WinLogo size={22} />
          </button>

          {/* Search */}
          <button
            onClick={e => { e.stopPropagation(); setShowStart(true); }}
            className={`flex items-center gap-2 px-4 h-9 rounded-full text-[12px] transition-all ${isDark ? 'bg-white/10 text-white/60 hover:bg-white/15 border border-white/10' : 'bg-white text-neutral-500 hover:bg-neutral-50 shadow-sm border border-neutral-200'}`}
            style={{ minWidth: '180px' }}
          >
            <Search className="w-4 h-4 text-blue-500" /> <span className="opacity-80 font-medium">Search</span>
          </button>

          {/* Taskbar app icons */}
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
          {/* Dark mode */}
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
            className={`flex items-center gap-1.5 px-2 h-8 ${taskText} opacity-90 ${isDark ? 'hover:bg-white/10' : 'hover:bg-white/40'} rounded-md transition-colors`}
            onClick={(e) => { e.stopPropagation(); setShowQuickSettings(prev => !prev); setShowCalendar(false); setShowStart(false); closeContextMenu(); }}
          >
            <Wifi className="w-4 h-4" />
            <Volume2 className="w-4 h-4" />
            <Battery className="w-4 h-4" />
          </button>

          <button 
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
