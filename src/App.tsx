import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mail, Github, Linkedin, ArrowUpRight, ExternalLink,
  Monitor, ChevronDown, Film, Moon, Sun, Send,
  Code2, Layers, Smartphone, Globe, Briefcase, X
} from 'lucide-react';
import { CONTACT, STATS, PROJECTS, EXPERIENCE, PERSONAL, EDUCATION, CERTIFICATIONS } from './data/portfolio';

// ── SVG logos ─────────────────────────────────────────────────────────────────
const WindowsLogo = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.8" />
  </svg>
);
const AppleLogo = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

// ── Animated count-up ─────────────────────────────────────────────────────────
const CountUp = ({ to, suffix = '' }: { to: number; suffix?: string }) => {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let n = 0; const step = to / 60;
      const t = setInterval(() => {
        n += step;
        if (n >= to) { setVal(to); clearInterval(t); } else setVal(Math.floor(n));
      }, 18);
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{val}{suffix}</span>;
};

// ── Floating tech badge ───────────────────────────────────────────────────────
const FloatingBadge = ({ icon, label, color, style }: { icon: React.ReactNode; label: string; color: string; style?: React.CSSProperties }) => (
  <div style={{
    position: 'absolute',
    background: '#fff',
    borderRadius: '50%',
    width: 68, height: 68,
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
    fontSize: '0.5rem', fontWeight: 700,
    color: '#555', gap: 4,
    animation: 'float-badge 4s ease-in-out infinite',
    ...style,
  }}>
    <div style={{ color, fontSize: '1.4rem' }}>{icon}</div>
    <span>{label}</span>
  </div>
);

// ── Floating Preview ──────────────────────────────────────────────────────────
interface FloatingPreviewProps {
  url: string;
  accent: string;
  visible: boolean;
  x: number;
  y: number;
}

const FloatingPreview = ({ url, accent, visible, x, y }: FloatingPreviewProps) => (
  <div
    style={{
      position: 'fixed',
      left: x,
      top: y,
      width: 320,
      pointerEvents: 'none',
      zIndex: 9999,
      borderRadius: 12,
      overflow: 'hidden',
      border: `1px solid ${accent}50`,
      background: '#0d0d0d',
      opacity: visible ? 1 : 0,
      transform: visible
        ? 'translate(-50%, calc(-100% - 18px)) scale(1) rotateX(0deg)'
        : 'translate(-50%, calc(-100% - 18px)) scale(0.88) rotateX(10deg)',
      boxShadow: visible
        ? `0 28px 70px rgba(0,0,0,0.5), 0 0 0 1px ${accent}28, 0 0 50px ${accent}12`
        : 'none',
      transition: 'opacity 0.3s cubic-bezier(0.22,1,0.36,1), transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease',
      transformOrigin: 'bottom center',
    }}
  >
    <div style={{
      display: 'flex', alignItems: 'center', gap: 6,
      padding: '6px 10px',
      background: accent + '15',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
        {['#ff5f57','#febc2e','#28c840'].map(c => (
          <span key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c, display: 'block' }} />
        ))}
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 4,
        background: 'rgba(255,255,255,0.06)', borderRadius: 4,
        padding: '2px 8px', flex: 1, overflow: 'hidden',
        fontSize: '0.6rem', color: 'rgba(200,200,200,0.5)', whiteSpace: 'nowrap',
      }}>
        <Globe size={9} style={{ color: accent, flexShrink: 0 }} />
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
        </span>
      </div>
    </div>
    <div style={{ position: 'relative', width: '100%', height: 190, overflow: 'hidden', background: '#111' }}>
      <iframe
        src={url}
        title="site preview"
        scrolling="no"
        style={{
          width: '200%', height: '380px',
          border: 'none',
          transform: 'scale(0.5)',
          transformOrigin: 'top left',
          pointerEvents: 'none',
          display: 'block',
        }}
        loading="lazy"
      />
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `linear-gradient(to top, ${accent}20 0%, transparent 60%)`,
      }} />
    </div>
    <div style={{
      height: 2,
      background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
    }} />
  </div>
);

// ── Floating Cert Preview ─────────────────────────────────────────────────────
interface FloatingCertPreviewProps {
  image: string;
  name: string;
  visible: boolean;
  x: number;
  y: number;
}

const FloatingCertPreview = ({ image, name, visible, x, y }: FloatingCertPreviewProps) => (
  <div
    style={{
      position: 'fixed',
      left: x,
      top: y,
      width: 280,
      pointerEvents: 'none',
      zIndex: 99999,
      borderRadius: 12,
      overflow: 'hidden',
      border: '1px solid rgba(139, 92, 246, 0.3)',
      background: '#0d0d0d',
      opacity: visible ? 1 : 0,
      transform: visible
        ? 'translate(-50%, calc(-100% - 18px)) scale(1) rotateX(0deg)'
        : 'translate(-50%, calc(-100% - 18px)) scale(0.88) rotateX(10deg)',
      boxShadow: visible
        ? '0 28px 70px rgba(0,0,0,0.5), 0 0 50px rgba(139,92,246,0.12)'
        : 'none',
      transition: 'opacity 0.25s cubic-bezier(0.22,1,0.36,1), transform 0.25s cubic-bezier(0.22,1,0.36,1)',
      transformOrigin: 'bottom center',
    }}
  >
    <img 
      src={image} 
      alt={name} 
      style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }} 
    />
  </div>
);

// ── Typewriter component ──────────────────────────────────────────────────────
const Typewriter = ({ words, typingSpeed = 80, deletingSpeed = 40, delay = 2000 }: { words: string[]; typingSpeed?: number; deletingSpeed?: number; delay?: number }) => {
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentWord = words[currentWordIdx];

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(prev => prev.slice(0, -1));
      }, deletingSpeed);
    } else {
      timer = setTimeout(() => {
        setCurrentText(currentWord.slice(0, currentText.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && currentText === currentWord) {
      timer = setTimeout(() => setIsDeleting(true), delay);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentWordIdx(prev => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIdx, words, typingSpeed, deletingSpeed, delay]);

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', minWidth: '290px' }}>
      {currentText}
      <span style={{
        marginLeft: 4,
        fontWeight: 400,
        color: '#f59e0b',
        animation: 'blink 0.8s step-end infinite'
      }}>|</span>
    </span>
  );
};

// ── Top Navigation ────────────────────────────────────────────────────────────
const TopNav = () => {
  const navigate = useNavigate();
  const [showUI, setShowUI] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    const s = localStorage.getItem('darkMode');
    return s !== null ? JSON.parse(s) : false;
  });
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDark));
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDark]);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setShowUI(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const navLinks = ['Home', 'About', 'Works', 'Education', 'Projects', 'Services'];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(0,0,0,0.06)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 40px', height: 64,
    }}>
      {/* Brand */}
      <a href="/" style={{ fontWeight: 900, fontSize: '1.25rem', letterSpacing: '-0.04em', color: '#111', textDecoration: 'none' }}>
        Aarvieve<span style={{ color: '#f59e0b' }}>.</span>
      </a>

      {/* Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
        {navLinks.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`}
            style={{ fontSize: '0.88rem', fontWeight: 500, color: '#555', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#111')}
            onMouseLeave={e => (e.currentTarget.style.color = '#555')}
          >{l}</a>
        ))}
      </div>

      {/* Right controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Dark mode */}
        <button onClick={() => setIsDark(!isDark)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888', padding: 6, display: 'flex' }}>
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* UI Mode */}
        <div ref={dropRef} style={{ position: 'relative' }}>
          <button onClick={() => setShowUI(v => !v)}
            style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', fontWeight: 500, border: '1.5px solid #ddd', borderRadius: 8, padding: '7px 14px', cursor: 'pointer', background: 'transparent', color: '#555', transition: 'border-color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = '#f59e0b')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = '#ddd')}
          >
            <Monitor size={13} /> UI Mode
            <ChevronDown size={11} style={{ transition: 'transform 0.2s', transform: showUI ? 'rotate(180deg)' : 'none' }} />
          </button>
          {showUI && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 8px)', right: 0,
              width: 192, background: '#fff', border: '1px solid #eee',
              borderRadius: 14, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.14)',
            }}>
              <div style={{ padding: '8px 14px 4px', fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#aaa' }}>Choose UI</div>
              {[
                { label: 'macOS Mode', sub: 'Mac-style UI', path: '/macos', icon: <AppleLogo />, bg: '#1a1a1a' },
                { label: 'Windows Mode', sub: 'Win 11-style', path: '/windows', icon: <WindowsLogo />, bg: '#0078d4' },
                { label: 'Cinematic Mode', sub: 'Animated full UI', path: '/cinematic', icon: <Film size={12} />, bg: 'linear-gradient(135deg,#f59e0b,#7c3aed)' },
              ].map(item => (
                <button key={item.path} onClick={() => { navigate(item.path); setShowUI(false); }}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'background 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#f9f9f9')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <span style={{ width: 28, height: 28, borderRadius: 8, background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0, fontSize: '0.75rem' }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#222' }}>{item.label}</div>
                    <div style={{ fontSize: '0.65rem', color: '#aaa' }}>{item.sub}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Let's chat */}
        <a href="#contact"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', fontWeight: 700, border: '2px solid #111', borderRadius: 8, padding: '8px 20px', color: '#111', textDecoration: 'none', transition: 'all 0.2s' }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#111'; el.style.color = '#fff'; }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.color = '#111'; }}
        >
          Let's chat
        </a>
      </div>
    </nav>
  );
};

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  
  // States for Project hover preview
  const [hoveredProjectIdx, setHoveredProjectIdx] = useState<number | null>(null);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });

  // State for active certification image modal
  const [activeCert, setActiveCert] = useState<{ name: string; image: string } | null>(null);

  // States for Certification hover preview
  const [hoveredCertIdx, setHoveredCertIdx] = useState<number | null>(null);
  const [certHoverPos, setCertHoverPos] = useState({ x: 0, y: 0 });

  const skills = [
    { icon: <Code2 size={20} />, label: 'Web Dev', count: 6, color: '#f59e0b' },
    { icon: <Layers size={20} />, label: 'UI/UX', count: 3, color: '#8b5cf6' },
    { icon: <Smartphone size={20} />, label: 'Mobile', count: 1, color: '#06b6d4' },
    { icon: <Globe size={20} />, label: 'Full-Stack', count: 2, color: '#10b981' },
  ];

  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", minHeight: '100vh', background: '#fff' }}>
      <TopNav />

      {/* ── HERO — Split Layout ─────────────────────────────────────────────── */}
      <section id="home" style={{ paddingTop: 64, minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>

        {/* Left panel — white */}
        <div style={{ padding: '24px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 'calc(100vh - 64px)' }}>

          {/* Top: headline */}
          <div>
            {/* Status Chip */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.2)', padding: '6px 14px', borderRadius: 99, marginBottom: 12 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }} />
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#b45309', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Available for projects</span>
            </div>

            <h1 style={{ fontSize: 'clamp(2.5rem, 4.5vw, 3.8rem)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.04em', color: '#111', margin: '0 0 8px' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#666', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Hi! I Am</span>
              <span style={{ display: 'inline-block', background: 'linear-gradient(to right, #f97316, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Aaron M. Cañada</span>
            </h1>

            <h2 style={{ fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)', fontWeight: 800, color: '#333', letterSpacing: '-0.02em', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <Typewriter words={['Front-End AI Engineer', 'Full-Stack Developer', 'UI/UX Designer']} />
              <span style={{ fontSize: '0.72rem', fontWeight: 700, background: '#111', color: '#f59e0b', padding: '4px 12px', borderRadius: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>QCU BSIT STUDENT</span>
            </h2>

            <p style={{ fontSize: '1rem', lineHeight: 1.6, color: '#555', maxWidth: 500, marginBottom: 24 }}>
              Crafting fast, modern, and intelligent web experiences. Specialize in building user-focused applications with React, TypeScript, and interactive UI/UX designs.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24, flexWrap: 'wrap' }}>
              <a href="#contact"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 28px', borderRadius: 10, fontWeight: 800, fontSize: '0.92rem', background: '#f97316', color: '#fff', textDecoration: 'none', boxShadow: '0 8px 24px rgba(249,115,22,0.25)', transition: 'all 0.2s' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 12px 28px rgba(249,115,22,0.35)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = ''; el.style.boxShadow = '0 8px 24px rgba(249,115,22,0.25)'; }}
              >
                Hire Me
              </a>
              <a href="#works"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 10, fontWeight: 700, fontSize: '0.92rem', border: '1.5px solid #ddd', color: '#333', textDecoration: 'none', transition: 'all 0.2s' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#f59e0b'; el.style.color = '#f59e0b'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#ddd'; el.style.color = '#333'; }}
              >
                Projects <ArrowUpRight size={16} />
              </a>
            </div>

            {/* Stats — Grid layout with top/bottom border */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, borderTop: '1px solid #eee', borderBottom: '1px solid #eee', padding: '16px 0', marginBottom: 24 }}>
              {STATS.map(s => (
                <div key={s.label}>
                  <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#111', lineHeight: 1, letterSpacing: '-0.02em' }}>
                    <CountUp to={s.number} suffix={s.suffix} />
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#666', marginTop: 6, fontWeight: 500 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Contact inline */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              <div>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Contact Email</div>
                <a href={`mailto:${CONTACT.email}`} style={{ fontSize: '0.92rem', color: '#111', fontWeight: 700, textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#f59e0b')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#111')}
                >
                  {CONTACT.email}
                </a>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                {[
                  { href: CONTACT.github.url,   icon: <Github size={16} />, label: 'GitHub' },
                  { href: CONTACT.linkedin.url,  icon: <Linkedin size={16} />, label: 'LinkedIn' },
                ].map(({ href, icon, label }) => (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer" title={label}
                    style={{ width: 38, height: 38, borderRadius: 8, border: '1px solid #eee', background: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', textDecoration: 'none', transition: 'all 0.2s' }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#f59e0b'; el.style.color = '#f59e0b'; el.style.background = 'rgba(245,158,11,0.04)'; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#eee'; el.style.color = '#555'; el.style.background = '#fafafa'; }}
                  >{icon}</a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom styled gradient card: Project Statistics */}
          <div style={{ marginTop: 20, background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)', borderRadius: 20, padding: '20px 24px', color: '#fff', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 20px 40px rgba(15,23,42,0.15)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: '0.65rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, marginBottom: 6 }}>Overview</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1.2, marginBottom: 12 }}>Project Stats 2025</div>
                <a href="#works"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#f59e0b', color: '#111', fontWeight: 800, fontSize: '0.78rem', padding: '8px 16px', borderRadius: 8, textDecoration: 'none', transition: 'all 0.2s' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#fbbf24'; el.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#f59e0b'; el.style.transform = ''; }}
                >Know More</a>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { label: 'Website Design', count: 6 },
                  { label: 'Mobile App', count: 1 },
                  { label: 'Full-Stack Apps', count: 2 },
                ].map(s => (
                  <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.07)', paddingBottom: 8 }}>
                    <span style={{ fontSize: '0.8rem', color: '#bbb' }}>{s.label}</span>
                    <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#f59e0b' }}>{s.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right panel — beige/cream */}
        <div style={{ background: '#f5f0e8', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: '56px 40px 40px', position: 'relative', minHeight: 'calc(100vh - 64px)', overflow: 'hidden' }}>

          {/* Top caption */}
          <div style={{ textAlign: 'center', fontSize: '1.1rem', fontWeight: 500, color: '#444', lineHeight: 1.6 }}>
            Build your site in <strong>React</strong>,<br />
            <strong>TypeScript</strong> or <strong>Next.js</strong>
          </div>

          {/* Profile photo placeholder */}
          <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            {/* Floating tech badges */}
            <FloatingBadge icon={<Code2 size={22} />} label="React" color="#61dafb" style={{ top: '12%', left: '8%', animationDelay: '0s' }} />
            <FloatingBadge icon={<span style={{ fontWeight: 900, fontSize: '0.9rem', color: '#3178c6' }}>TS</span>} label="TypeScript" color="#3178c6" style={{ top: '22%', right: '6%', animationDelay: '0.8s' }} />
            <FloatingBadge icon={<Layers size={22} />} label="Figma" color="#f24e1e" style={{ bottom: '30%', left: '5%', animationDelay: '1.6s' }} />
            <FloatingBadge icon={<Globe size={22} />} label="Node.js" color="#339933" style={{ bottom: '22%', right: '8%', animationDelay: '2.4s' }} />

            {/* Photo card */}
            <div style={{
              width: 280, height: 380,
              borderRadius: 24,
              background: 'linear-gradient(160deg, #e8dcc8 0%, #d4c5a9 100%)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 32px 80px rgba(0,0,0,0.14)',
              position: 'relative', overflow: 'hidden',
              border: '3px solid rgba(255,255,255,0.6)',
            }}>
              {/* Avatar initial */}
              <div style={{
                width: 110, height: 110, borderRadius: '50%',
                background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '3rem', fontWeight: 900, color: '#fff',
                boxShadow: '0 12px 40px rgba(249,115,22,0.4)',
                marginBottom: 20,
              }}>A</div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#333' }}>Aaron M. Cañada</div>
              <div style={{ fontSize: '0.75rem', color: '#f59e0b', fontWeight: 700, marginTop: 4 }}>Developer · Designer</div>
              <div style={{ marginTop: 16, fontSize: '0.65rem', color: '#aaa', fontStyle: 'italic' }}>📸 Photo coming soon</div>

              {/* Open to work badge */}
              <div style={{
                position: 'absolute', top: 16, right: 16,
                background: '#22c55e', borderRadius: 999,
                padding: '4px 12px', fontSize: '0.6rem', fontWeight: 800,
                color: '#fff', letterSpacing: '0.08em', textTransform: 'uppercase',
                boxShadow: '0 4px 12px rgba(34,197,94,0.4)',
              }}>● Available</div>
            </div>
          </div>

          {/* Subscribe input */}
          <div style={{ width: '100%', maxWidth: 340, position: 'relative' }}>
            <input
              type="email"
              placeholder="Subscribe my Newsletter"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                width: '100%', padding: '14px 52px 14px 20px',
                borderRadius: 10, border: '1.5px solid rgba(0,0,0,0.1)',
                fontSize: '0.82rem', background: '#fff',
                outline: 'none', boxSizing: 'border-box',
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              }}
            />
            <button
              onClick={() => { if (email) setSubscribed(true); }}
              style={{
                position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)',
                width: 36, height: 36, borderRadius: 8,
                background: '#111', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#f59e0b')}
              onMouseLeave={e => (e.currentTarget.style.background = '#111')}
            >
              {subscribed ? '✓' : <Send size={14} />}
            </button>
            {subscribed && <div style={{ textAlign: 'center', marginTop: 8, fontSize: '0.72rem', color: '#22c55e', fontWeight: 600 }}>Thanks for subscribing! 🎉</div>}
          </div>
        </div>
      </section>

      {/* ── ABOUT ───────────────────────────────────────────────────────────── */}
      <section id="about" style={{ padding: '80px 48px', background: '#fafafa', borderTop: '1px solid #f0f0f0' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#f59e0b', marginBottom: 8 }}>About Me</div>
            <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 900, letterSpacing: '-0.04em', margin: 0 }}>
              Get to Know Me<span style={{ color: '#f59e0b' }}>.</span>
            </h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>
            {/* Bio text */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {PERSONAL.bio.map((paragraph, i) => (
                <p key={i} style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.8, color: '#555' }}>
                  {paragraph}
                </p>
              ))}
              <div style={{ marginTop: 12 }}>
                <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 8, fontWeight: 700, fontSize: '0.85rem', background: '#111', color: '#fff', textDecoration: 'none', transition: 'background 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#f59e0b')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#111')}
                >
                  Let's Talk
                </a>
              </div>
            </div>
            
            {/* Details Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignContent: 'start' }}>
              <div style={{ background: '#fff', padding: 24, borderRadius: 16, border: '1px solid #eee' }}>
                <div style={{ fontSize: '0.7rem', color: '#aaa', fontWeight: 700, textTransform: 'uppercase', marginBottom: 8 }}>Location</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#222' }}>{PERSONAL.location}</div>
              </div>
              <div style={{ background: '#fff', padding: 24, borderRadius: 16, border: '1px solid #eee' }}>
                <div style={{ fontSize: '0.7rem', color: '#aaa', fontWeight: 700, textTransform: 'uppercase', marginBottom: 8 }}>Status</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#22c55e' }}>{PERSONAL.availability}</div>
              </div>
              <div style={{ background: '#fff', padding: 24, borderRadius: 16, border: '1px solid #eee', gridColumn: '1 / -1' }}>
                <div style={{ fontSize: '0.7rem', color: '#aaa', fontWeight: 700, textTransform: 'uppercase', marginBottom: 8 }}>Email</div>
                <a href={`mailto:${CONTACT.email}`} style={{ fontSize: '0.9rem', fontWeight: 600, color: '#222', textDecoration: 'none' }}>{CONTACT.email}</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ── SERVICES ────────────────────────────────────────────────────────── */}
      <section id="services" style={{ padding: '80px 48px', borderTop: '1px solid #f0f0f0' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48 }}>
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#f59e0b', marginBottom: 8 }}>What I Do</div>
              <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 900, letterSpacing: '-0.04em', margin: 0 }}>
                How Can I Help<span style={{ color: '#f59e0b' }}>?</span>
              </h2>
            </div>
            <a href="#works" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', fontWeight: 700, color: '#f59e0b', textDecoration: 'none' }}>
              View All Work <ExternalLink size={13} />
            </a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 20 }}>
            {skills.map(s => (
              <div key={s.label}
                style={{ border: '2px solid #f0f0f0', borderRadius: 20, padding: '32px 24px', cursor: 'default', transition: 'all 0.25s' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = s.color; el.style.transform = 'translateY(-5px)'; el.style.boxShadow = `0 20px 48px ${s.color}20`; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#f0f0f0'; el.style.transform = ''; el.style.boxShadow = ''; }}
              >
                <div style={{ width: 52, height: 52, borderRadius: 14, background: s.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, color: s.color }}>
                  {s.icon}
                </div>
                <div style={{ fontWeight: 800, fontSize: '1rem', marginBottom: 6, color: '#111' }}>{s.label}</div>
                <div style={{ fontSize: '0.78rem', color: s.color, fontWeight: 700 }}>{s.count} Projects</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE (Works) ──────────────────────────────────────────────── */}
      <section id="works" style={{ padding: '80px 48px', background: '#fff', borderTop: '1px solid #f0f0f0' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#f59e0b', marginBottom: 8 }}>Experience</div>
              <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 900, letterSpacing: '-0.04em', margin: 0 }}>
                Professional Experience<span style={{ color: '#f59e0b' }}>.</span>
              </h2>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {EXPERIENCE.map((exp, i) => (
              <div key={i} style={{ 
                background: '#1a1a1a', 
                borderRadius: 20, 
                padding: '32px', 
                color: '#fff',
                display: 'flex',
                gap: 24,
                boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                flexDirection: 'row'
              }}>
                {/* Logo Box */}
                <div style={{ 
                  width: 64, height: 64, borderRadius: 12, 
                  background: '#0a0a0a', border: '1px solid #333',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <span style={{ color: '#22c55e', fontSize: '2rem', fontWeight: 900, fontFamily: 'serif', fontStyle: 'italic' }}>y</span>
                </div>
                
                {/* Content */}
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 4px', color: '#fff' }}>{exp.role}</h3>
                  <div style={{ fontSize: '0.95rem', color: '#ccc', marginBottom: 6 }}>
                    {exp.company} · {exp.type}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: 2 }}>
                    {exp.date} · {exp.duration}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: 16 }}>
                    {exp.location}
                  </div>
                  
                  <p style={{ fontSize: '0.9rem', color: '#bbb', lineHeight: 1.6, margin: '0 0 20px' }}>
                    {exp.description}
                  </p>

                  {/* Link Card */}
                  {exp.link && (
                    <a href={exp.link.url} target="_blank" rel="noopener noreferrer" style={{
                      display: 'inline-flex', alignItems: 'center', gap: 12,
                      background: '#2a2a2a', padding: '10px 16px', borderRadius: 10,
                      textDecoration: 'none', color: '#fff', fontSize: '0.85rem', fontWeight: 600,
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#333')}
                    onMouseLeave={e => (e.currentTarget.style.background = '#2a2a2a')}
                    >
                      <div style={{ width: 36, height: 36, background: '#111', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ExternalLink size={16} color="#fff" />
                      </div>
                      {exp.link.text}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDUCATION & CERTIFICATIONS ─────────────────────────────────────── */}
      <section id="education" style={{ padding: '80px 48px', background: '#fff', borderTop: '1px solid #f0f0f0' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#f59e0b', marginBottom: 8 }}>Learning Journey</div>
              <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 900, letterSpacing: '-0.04em', margin: 0 }}>
                Education & Certs<span style={{ color: '#f59e0b' }}>.</span>
              </h2>
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
            
            {/* Education Section */}
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: 24, color: '#111', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }} /> 
                Academic Background
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
                {EDUCATION.map((edu, i) => (
                  <div key={i} style={{ padding: '24px', background: '#fafafa', borderRadius: 16, border: '1px solid #eee', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 0, top: 24, bottom: 24, width: 3, background: '#f59e0b', borderRadius: '0 4px 4px 0' }} />
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f59e0b', marginBottom: 4 }}>{edu.period}</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111', marginBottom: 4 }}>{edu.degree}</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#666', marginBottom: 12 }}>{edu.institution}</div>
                    <p style={{ fontSize: '0.85rem', color: '#777', lineHeight: 1.6, margin: 0 }}>{edu.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications Section */}
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: 24, color: '#111', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#8b5cf6', display: 'inline-block' }} /> 
                Certifications
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
                {CERTIFICATIONS.map((cert, i) => (
                  <div key={i} 
                  onClick={() => setActiveCert(cert)}
                  style={{ 
                    padding: '20px', background: '#fff', borderRadius: 16, 
                    border: '1px solid #eee', transition: 'all 0.25s', cursor: 'pointer'
                  }}
                  onMouseEnter={e => { 
                    const el = e.currentTarget as HTMLElement; 
                    el.style.borderColor = '#8b5cf6'; 
                    el.style.transform = 'translateY(-4px)'; 
                    el.style.boxShadow = '0 12px 32px rgba(139,92,246,0.12)'; 
                    setHoveredCertIdx(i);
                  }}
                  onMouseLeave={e => { 
                    const el = e.currentTarget as HTMLElement; 
                    el.style.borderColor = '#eee'; 
                    el.style.transform = ''; 
                    el.style.boxShadow = ''; 
                    setHoveredCertIdx(null);
                  }}
                  onMouseMove={e => setCertHoverPos({ x: e.clientX, y: e.clientY })}
                  >
                    <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#8b5cf6', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{cert.issuer}</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#111', marginBottom: 10, lineHeight: 1.3 }}>{cert.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#888', fontWeight: 500 }}>{cert.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ── PROJECTS ─────────────────────────────────────────────────────────── */}
      <section id="projects" style={{ padding: '80px 48px', background: '#fafafa', borderTop: '1px solid #f0f0f0' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#f59e0b', marginBottom: 8 }}>Portfolio</div>
              <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 900, letterSpacing: '-0.04em', margin: 0 }}>
                My Latest Works<span style={{ color: '#f59e0b' }}>.</span>
              </h2>
            </div>
            <a href="https://github.com/EYRON27" target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', fontWeight: 700, color: '#f59e0b', textDecoration: 'none' }}>
              Explore More <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Projects — from src/data/portfolio.ts → PROJECTS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 20 }}>
            {PROJECTS.map((p, i) => (
              <div key={i}
                style={{ background: '#fff', border: '2px solid #f0f0f0', borderRadius: 20, overflow: 'hidden', transition: 'all 0.25s', cursor: 'default' }}
                onMouseEnter={e => { 
                  const el = e.currentTarget as HTMLElement; 
                  el.style.borderColor = p.accent; 
                  el.style.transform = 'translateY(-4px)'; 
                  el.style.boxShadow = `0 20px 48px ${p.accent}18`; 
                  setHoveredProjectIdx(i);
                }}
                onMouseLeave={e => { 
                  const el = e.currentTarget as HTMLElement; 
                  el.style.borderColor = '#f0f0f0'; 
                  el.style.transform = ''; 
                  el.style.boxShadow = ''; 
                  setHoveredProjectIdx(null);
                }}
                onMouseMove={e => setHoverPos({ x: e.clientX, y: e.clientY })}
              >
                {/* Thumbnail */}
                <div style={{ height: 110, background: `linear-gradient(135deg,${p.accent}18,${p.accent}08)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <div style={{ width: 5, height: '100%', position: 'absolute', left: 0, top: 0, background: p.accent }} />
                  <span style={{ fontSize: '2.2rem', fontWeight: 900, color: p.accent, opacity: 0.22, letterSpacing: '-0.05em' }}>{p.title.slice(0,2).toUpperCase()}</span>
                </div>
                <div style={{ padding: '18px 22px' }}>
                  {/* Title + role badge */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#111' }}>{p.title}</div>
                    {p.role && <span style={{ fontSize: '0.6rem', fontWeight: 700, background: p.accent + '15', color: p.accent, padding: '3px 8px', borderRadius: 999, textTransform: 'uppercase', letterSpacing: '0.07em', whiteSpace: 'nowrap', marginLeft: 8 }}>{p.role}</span>}
                  </div>
                  {/* Description — from portfolio.ts */}
                  <p style={{ fontSize: '0.78rem', color: '#777', lineHeight: 1.6, margin: '0 0 12px' }}>
                    {p.description}
                  </p>
                  {/* Tech pills */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 14 }}>
                    {p.technologies.map(t => (
                      <span key={t} style={{ fontSize: '0.65rem', fontWeight: 600, padding: '3px 9px', borderRadius: 999, border: '1px solid #eee', color: '#666' }}>{t}</span>
                    ))}
                  </div>
                  {/* Links */}
                  <div style={{ display: 'flex', gap: 14 }}>
                    <a href={p.github} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.75rem', fontWeight: 700, color: '#888', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#111')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#888')}
                    ><Github size={13} /> Code</a>
                    {p.demo && (
                      <a href={p.demo} target="_blank" rel="noopener noreferrer"
                        style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.75rem', fontWeight: 700, color: p.accent, textDecoration: 'none', transition: 'gap 0.2s' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.gap = '9px'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.gap = '5px'}
                      ><ArrowUpRight size={13} /> Live Demo</a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────────────── */}
      <section id="contact" style={{ padding: '80px 48px', borderTop: '1px solid #f0f0f0' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#f59e0b', marginBottom: 8 }}>Get In Touch</div>
            <h2 style={{ fontSize: 'clamp(2rem,3.5vw,3rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.1, margin: '0 0 20px' }}>
              Let's make something<br />
              <span style={{ color: '#f59e0b' }}>amazing</span> together<span style={{ color: '#f59e0b' }}>.</span>
            </h2>
            <p style={{ color: '#777', lineHeight: 1.7, fontSize: '0.95rem', margin: '0 0 32px' }}>
              I'm always open to new projects, collaborations, or just a good conversation. Start by <a href="mailto:canadaaaronm@gmail.com" style={{ color: '#f59e0b', fontWeight: 700, textDecoration: 'none' }}>saying hi</a>.
            </p>
            <a href="mailto:canadaaaronm@gmail.com"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 28px', borderRadius: 8, fontWeight: 800, fontSize: '0.88rem', background: '#111', color: '#fff', textDecoration: 'none', transition: 'background 0.2s, transform 0.2s' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#f59e0b'; el.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#111'; el.style.transform = ''; }}
            ><Mail size={16} /> Send Message</a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Contact links — from src/data/portfolio.ts → CONTACT */}
            {[
              { icon: <Mail size={18} />,    label: 'Email',    val: CONTACT.email,              href: `mailto:${CONTACT.email}`,    color: '#f59e0b' },
              { icon: <Github size={18} />,  label: 'GitHub',   val: CONTACT.github.url.replace('https://',''),  href: CONTACT.github.url,   color: '#111'    },
              { icon: <Linkedin size={18} />,label: 'LinkedIn', val: CONTACT.linkedin.handle,    href: CONTACT.linkedin.url,         color: '#0a66c2' },
            ].map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px', border: '2px solid #f0f0f0', borderRadius: 16, textDecoration: 'none', color: 'inherit', transition: 'all 0.25s' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = l.color; el.style.transform = 'translateX(6px)'; el.style.boxShadow = `0 8px 24px ${l.color}18`; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#f0f0f0'; el.style.transform = ''; el.style.boxShadow = ''; }}
              >
                <span style={{ width: 40, height: 40, borderRadius: 10, background: l.color + '14', display: 'flex', alignItems: 'center', justifyContent: 'center', color: l.color, flexShrink: 0 }}>{l.icon}</span>
                <div>
                  <div style={{ fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#aaa' }}>{l.label}</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111' }}>{l.val}</div>
                </div>
                <ArrowUpRight size={14} style={{ marginLeft: 'auto', color: '#ccc' }} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
      <footer style={{ background: '#111', color: '#fff', padding: '28px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontWeight: 900, fontSize: '1.1rem', letterSpacing: '-0.04em' }}>Aarvieve<span style={{ color: '#f59e0b' }}>.</span></span>
        <span style={{ fontSize: '0.75rem', color: '#888' }}>© 2025 Aaron M. Cañada · All Rights Reserved</span>
        <span style={{ fontSize: '0.7rem', color: '#555' }}>Design by Aarvieve</span>
      </footer>

      {hoveredProjectIdx !== null && PROJECTS[hoveredProjectIdx].demo && (
        <FloatingPreview
          url={PROJECTS[hoveredProjectIdx].demo}
          accent={PROJECTS[hoveredProjectIdx].accent}
          visible={true}
          x={hoverPos.x}
          y={hoverPos.y}
        />
      )}

      {activeCert && (
        <div 
          onClick={() => setActiveCert(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100000,
            cursor: 'zoom-out',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <div 
            onClick={e => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '90%',
              maxHeight: '90%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 16,
              animation: 'scaleUp 0.25s cubic-bezier(0.34, 1.3, 0.64, 1)'
            }}
          >
            <button 
              onClick={() => setActiveCert(null)}
              style={{
                position: 'absolute',
                top: -48,
                right: 0,
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '50%',
                width: 36,
                height: 36,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)')}
            >
              <X size={20} />
            </button>
            <img 
              src={activeCert.image} 
              alt={activeCert.name}
              style={{
                maxWidth: '100%',
                maxHeight: '80vh',
                borderRadius: 12,
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                objectFit: 'contain'
              }}
            />
            <div style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, textAlign: 'center', maxWidth: 600 }}>
              {activeCert.name}
            </div>
          </div>
        </div>
      )}

      {hoveredCertIdx !== null && (
        <FloatingCertPreview
          image={CERTIFICATIONS[hoveredCertIdx].image}
          name={CERTIFICATIONS[hoveredCertIdx].name}
          visible={true}
          x={certHoverPos.x}
          y={certHoverPos.y}
        />
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        @keyframes float-badge {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          33%      { transform: translateY(-10px) rotate(2deg); }
          66%      { transform: translateY(-5px) rotate(-2deg); }
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @media (max-width: 768px) {
          section > div, section { grid-template-columns: 1fr !important; }
          #home { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
