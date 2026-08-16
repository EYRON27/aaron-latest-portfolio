import React, { useState, useEffect, useRef } from 'react';
import {
  Mail, Github, Linkedin, ArrowUpRight,
  Globe, Briefcase, FileText, ChevronLeft, ChevronRight,
  Terminal, Sparkles, MapPin, Code2, Cpu
} from 'lucide-react';


import { PERSONAL, CONTACT, STATS, REPO_STATEMENTS } from '../data/portfolio';

// ── Typewriter ────────────────────────────────────────────────────────────────
export const Typewriter = ({
  words,
  typingSpeed = 80,
  deletingSpeed = 40,
  delay = 2000,
}: {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delay?: number;
}) => {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[idx];
    const timer = setTimeout(() => {
      if (isDeleting) {
        setText((prev) => prev.slice(0, -1));
        if (text.length <= 1) {
          setIsDeleting(false);
          setIdx((prev) => (prev + 1) % words.length);
        }
      } else {
        setText(currentWord.slice(0, text.length + 1));
        if (text.length + 1 === currentWord.length) {
          setTimeout(() => setIsDeleting(true), delay);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, idx, words, typingSpeed, deletingSpeed, delay]);

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
      {text}
      <span style={{ marginLeft: 4, color: '#f59e0b', animation: 'blink 0.8s step-end infinite' }}>|</span>
    </span>
  );
};

// ── CountUp ───────────────────────────────────────────────────────────────────
export const CountUp = ({ to, suffix = '' }: { to: number; suffix?: string }) => {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let n = 0;
      const step = Math.max(1, Math.ceil(to / 50));
      const t = setInterval(() => {
        n += step;
        if (n >= to) {
          setVal(to);
          clearInterval(t);
        } else {
          setVal(n);
        }
      }, 20);
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);

  return <span ref={ref}>{val}{suffix}</span>;
};

// ── Floating Tech Badge ───────────────────────────────────────────────────────
export const FloatingBadge = ({
  icon,
  label,
  color,
  style,
}: {
  icon: React.ReactNode;
  label: string;
  color: string;
  style?: React.CSSProperties;
}) => (
  <div
    style={{
      position: 'absolute',
      background: '#fff',
      borderRadius: '50%',
      width: 62,
      height: 62,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
      fontSize: '0.52rem',
      fontWeight: 700,
      color: '#475569',
      gap: 3,
      animation: 'float-badge 4s ease-in-out infinite',
      zIndex: 3,
      ...style,
    }}
  >
    <div style={{ color, fontSize: '1.25rem' }}>{icon}</div>
    <span>{label}</span>
  </div>
);

// ── Spacious Animated Statement (Uncluttered) ─────────────────────────────────
export const AnimatedHeroStatement = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [displayedFrom, setDisplayedFrom] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const current = REPO_STATEMENTS[activeIdx];

  useEffect(() => {
    if (isPaused) return;
    const target = current.from;
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayedFrom.length < target.length) {
          setDisplayedFrom(target.slice(0, displayedFrom.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 3400);
        }
      } else {
        if (displayedFrom.length > 0) {
          setDisplayedFrom((prev) => prev.slice(0, -1));
        } else {
          setIsDeleting(false);
          setActiveIdx((prev) => (prev + 1) % REPO_STATEMENTS.length);
        }
      }
    }, isDeleting ? 28 : 55);

    return () => clearTimeout(timer);
  }, [displayedFrom, isDeleting, activeIdx, isPaused, current.from]);

  const handlePrev = () => {
    const nextIdx = (activeIdx - 1 + REPO_STATEMENTS.length) % REPO_STATEMENTS.length;
    setActiveIdx(nextIdx);
    setDisplayedFrom(REPO_STATEMENTS[nextIdx].from);
    setIsDeleting(false);
  };

  const handleNext = () => {
    const nextIdx = (activeIdx + 1) % REPO_STATEMENTS.length;
    setActiveIdx(nextIdx);
    setDisplayedFrom(REPO_STATEMENTS[nextIdx].from);
    setIsDeleting(false);
  };

  return (
    <div
      style={{ marginBottom: 32, maxWidth: 620 }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── Main Statement Text ── */}
      <p
        style={{
          fontSize: 'clamp(1.15rem, 2vw, 1.35rem)',
          lineHeight: 1.8,
          color: '#334155',
          margin: '0 0 20px',
          fontWeight: 450,
          minHeight: '4.8rem',
        }}
      >
        I turn{' '}
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            color: '#0f172a',
            fontWeight: 800,
            background: current.bgLight,
            border: `1.5px solid ${current.borderColor}`,
            padding: '3px 12px',
            borderRadius: '8px',
            whiteSpace: 'nowrap',
            verticalAlign: 'middle',
            boxShadow: `0 2px 10px ${current.color}15`,
            transition: 'all 0.3s ease',
          }}
        >
          <span>
            {displayedFrom}
            <span
              style={{
                display: 'inline-block',
                width: '2px',
                height: '1.05em',
                background: current.color,
                marginLeft: '2px',
                verticalAlign: 'text-bottom',
                animation: 'blink 0.8s step-end infinite',
              }}
            />
          </span>
        </span>{' '}
        into {current.to} that brings in{' '}
        <strong style={{ color: current.color, fontWeight: 850, letterSpacing: '-0.01em' }}>
          {current.benefit}
        </strong>
      </p>

      {/* ── Minimal Project Indicator Row ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Project name tag with colored left-border accent */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '6px 14px',
            borderRadius: 8,
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderLeft: `3px solid ${current.color}`,
          }}
        >
          <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {current.tag}
          </span>
          <span style={{ width: 1, height: 12, background: '#e2e8f0', display: 'inline-block' }} />
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a' }}>
            {current.project}
          </span>
        </div>

        {/* Dot stepper + arrows grouped together cleanly */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={handlePrev}
            style={{
              width: 24, height: 24, borderRadius: '50%',
              border: '1px solid #e2e8f0', background: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#94a3b8', padding: 0,
              transition: 'all 0.2s',
            }}
            title="Previous"
          >
            <ChevronLeft size={13} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {REPO_STATEMENTS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => { setActiveIdx(i); setDisplayedFrom(s.from); setIsDeleting(false); }}
                title={s.project}
                style={{
                  width: i === activeIdx ? 20 : 6,
                  height: 6,
                  borderRadius: 99,
                  background: i === activeIdx ? current.color : '#e2e8f0',
                  border: 'none', padding: 0, cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            style={{
              width: 24, height: 24, borderRadius: '50%',
              border: '1px solid #e2e8f0', background: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#94a3b8', padding: 0,
              transition: 'all 0.2s',
            }}
            title="Next"
          >
            <ChevronRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Hero Section (Spacious, Elegant, Uncluttered) ─────────────────────────────
export function HeroSection() {
  return (
    <section
      id="home"
      style={{
        paddingTop: 64,
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '55fr 45fr',
      }}
    >
      {/* ── LEFT PANEL ── */}
      <div
        style={{
          padding: 'clamp(36px, 5vh, 56px) clamp(36px, 5vw, 64px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: 'calc(100vh - 64px)',
          background: '#fff',
        }}
      >
        <div>
          {/* Status Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(34, 197, 94, 0.08)',
                border: '1px solid rgba(34, 197, 94, 0.25)',
                padding: '6px 14px',
                borderRadius: 99,
              }}
            >
              <span style={{ position: 'relative', display: 'inline-flex', width: 7, height: 7 }}>
                <span
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    background: '#22c55e',
                    animation: 'ping 1.5s ease-out infinite',
                    opacity: 0.6,
                  }}
                />
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', display: 'block' }} />
              </span>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: '#15803d',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                Available for projects
              </span>
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: 'rgba(245, 158, 11, 0.08)',
                border: '1px solid rgba(245, 158, 11, 0.22)',
                padding: '6px 12px',
                borderRadius: 99,
              }}
            >
              <Briefcase size={12} style={{ color: '#f59e0b' }} />
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: '#b45309',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                Front-End AI Engineer @ FlyRank
              </span>
            </div>
          </div>

          {/* Headline & Name */}
          <div style={{ marginBottom: 22 }}>
            <span
              style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                color: '#64748b',
                display: 'block',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: 8,
              }}
            >
              Hi! I Am
            </span>
            <h1
              style={{
                fontSize: 'clamp(2.8rem, 5vw, 4.4rem)',
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: '-0.04em',
                color: '#0f172a',
                margin: '0 0 12px',
              }}
            >
              Aaron M.{' '}
              <span
                style={{
                  display: 'inline-block',
                  background: 'linear-gradient(135deg, #f97316 0%, #f59e0b 50%, #eab308 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Cañada<span style={{ WebkitTextFillColor: '#f59e0b' }}>.</span>
              </span>
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)', fontWeight: 700, color: '#334155' }}>
                <Typewriter
                  words={['Front-End AI Engineer', 'Full-Stack Developer', 'UI/UX Designer', 'Web Craftsman']}
                />
              </span>
              <span
                style={{
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  background: '#0f172a',
                  color: '#f59e0b',
                  padding: '4px 10px',
                  borderRadius: 6,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                QCU BSIT
              </span>
            </div>
          </div>

          {/* ── Spacious Dynamic Statement (No Cluttered Pills) ── */}
          <AnimatedHeroStatement />

          {/* ── Clean CTAs (Well-spaced) ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28, flexWrap: 'wrap' }}>
            {/* Primary Hire Me */}
            <a
              href="#contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '14px 30px',
                borderRadius: 12,
                fontWeight: 800,
                fontSize: '0.92rem',
                background: 'linear-gradient(135deg, #f97316 0%, #f59e0b 100%)',
                color: '#fff',
                textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(249,115,22,0.32)',
                transition: 'all 0.25s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(-2px)';
                el.style.boxShadow = '0 12px 30px rgba(249,115,22,0.42)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = '';
                el.style.boxShadow = '0 8px 24px rgba(249,115,22,0.32)';
              }}
            >
              <Mail size={16} /> Hire Me
            </a>

            {/* Download CV */}
            <a
              href={CONTACT.cv}
              target="_blank"
              rel="noopener noreferrer"
              download="Aaron_Canada_CV.pdf"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '14px 24px',
                borderRadius: 12,
                fontWeight: 700,
                fontSize: '0.92rem',
                background: 'rgba(245, 158, 11, 0.08)',
                border: '1.5px solid rgba(245, 158, 11, 0.35)',
                color: '#b45309',
                textDecoration: 'none',
                transition: 'all 0.25s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)';
                el.style.borderColor = '#f59e0b';
                el.style.color = '#78350f';
                el.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = 'rgba(245, 158, 11, 0.08)';
                el.style.borderColor = 'rgba(245, 158, 11, 0.35)';
                el.style.color = '#b45309';
                el.style.transform = '';
              }}
            >
              <FileText size={16} style={{ color: '#f59e0b' }} /> Download CV
            </a>

            {/* Projects Link */}
            <a
              href="#works"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '14px 20px',
                borderRadius: 12,
                fontWeight: 700,
                fontSize: '0.92rem',
                border: '1.5px solid #e2e8f0',
                color: '#334155',
                textDecoration: 'none',
                background: '#fff',
                transition: 'all 0.25s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = '#cbd5e1';
                el.style.color = '#0f172a';
                el.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = '#e2e8f0';
                el.style.color = '#334155';
                el.style.transform = '';
              }}
            >
              Projects <ArrowUpRight size={15} />
            </a>

            {/* Social Icons */}
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { href: CONTACT.github.url, icon: <Github size={16} />, label: 'GitHub' },
                { href: CONTACT.linkedin.url, icon: <Linkedin size={16} />, label: 'LinkedIn' },
              ].map(({ href, icon, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 11,
                    border: '1.5px solid #e2e8f0',
                    background: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#64748b',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = '#f59e0b';
                    el.style.color = '#f59e0b';
                    el.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = '#e2e8f0';
                    el.style.color = '#64748b';
                    el.style.transform = '';
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Stats Row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 16,
              borderTop: '1px solid #f1f5f9',
              borderBottom: '1px solid #f1f5f9',
              padding: '18px 0',
              marginBottom: 20,
            }}
          >
            {STATS.map((s, i) => (
              <div key={s.label}>
                <div
                  style={{
                    fontSize: '2.1rem',
                    fontWeight: 900,
                    color: i === 0 ? '#f59e0b' : '#0f172a',
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                  }}
                >
                  <CountUp to={s.number} suffix={s.suffix} />
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: 6, fontWeight: 600 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Email */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '8px 14px',
              borderRadius: 10,
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
            }}
          >
            <Mail size={13} style={{ color: '#f59e0b' }} />
            <a
              href={`mailto:${CONTACT.email}`}
              style={{ fontSize: '0.84rem', color: '#334155', fontWeight: 700, textDecoration: 'none' }}
            >
              {CONTACT.email}
            </a>
          </div>
        </div>

        {/* Project Stats Card */}
        <div
          style={{
            marginTop: 20,
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            borderRadius: 18,
            padding: '20px 24px',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 12px 30px rgba(15,23,42,0.15)',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 20, alignItems: 'center' }}>
            <div>
              <div
                style={{
                  fontSize: '0.62rem',
                  color: '#94a3b8',
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  fontWeight: 700,
                  marginBottom: 4,
                }}
              >
                Overview
              </div>
              <div
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  color: '#f8fafc',
                  lineHeight: 1.25,
                  marginBottom: 12,
                }}
              >
                Project Stats 2025
              </div>
              <a
                href="#works"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                  color: '#0f172a',
                  fontWeight: 800,
                  fontSize: '0.75rem',
                  padding: '8px 16px',
                  borderRadius: 8,
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = '';
                }}
              >
                Know More <ArrowUpRight size={12} />
              </a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { label: 'Website Design', count: 6 },
                { label: 'Mobile App', count: 1 },
                { label: 'Full-Stack Apps', count: 2 },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                    paddingBottom: 6,
                  }}
                >
                  <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{s.label}</span>
                  <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#f59e0b' }}>{s.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL (Bespoke Developer Showcase) ── */}
      <div
        style={{
          background: 'linear-gradient(150deg, #faf8f5 0%, #f1ece1 50%, #e8e0d0 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          minHeight: 'calc(100vh - 64px)',
          overflow: 'hidden',
          padding: '40px 32px',
        }}
      >
        {/* Ambient atmospheric glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 520,
            height: 520,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245,158,11,0.18) 0%, rgba(249,115,22,0.08) 45%, transparent 70%)',
            filter: 'blur(30px)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* Minimal dot matrix background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle, rgba(15,23,42,0.07) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />

        {/* ── Developer Identity & Tech Showcase Card ── */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            maxWidth: 410,
            background: '#0d131f',
            borderRadius: 24,
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 28px 70px rgba(15,23,42,0.35), 0 0 0 1px rgba(255,255,255,0.05)',
            overflow: 'hidden',
            color: '#fff',
          }}
        >
          {/* Card Header / Status */}
          <div
            style={{
              padding: '14px 20px',
              background: 'rgba(255,255,255,0.03)',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444', opacity: 0.8 }} />
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b', opacity: 0.8 }} />
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', opacity: 0.8 }} />
              <span style={{ fontSize: '0.66rem', fontWeight: 800, color: '#64748b', marginLeft: 6, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                SPEC // AARON.DEV
              </span>
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: 'rgba(34,197,94,0.12)',
                border: '1px solid rgba(34,197,94,0.3)',
                padding: '4px 10px',
                borderRadius: 99,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#22c55e',
                  boxShadow: '0 0 0 2px rgba(34,197,94,0.4)',
                }}
              />
              <span style={{ fontSize: '0.64rem', fontWeight: 700, color: '#4ade80', letterSpacing: '0.04em' }}>
                Open to Work
              </span>
            </div>
          </div>

          {/* Profile Content Body */}
          <div style={{ padding: '24px 24px 20px' }}>
            {/* Top Identity Row: Photo + Titles */}
            <div style={{ display: 'flex', gap: 18, alignItems: 'center', marginBottom: 20 }}>
              {/* Photo Frame */}
              <div
                style={{
                  position: 'relative',
                  width: 96,
                  height: 110,
                  borderRadius: 18,
                  overflow: 'hidden',
                  flexShrink: 0,
                  border: '2px solid rgba(245,158,11,0.5)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                  background: '#1e293b',
                }}
              >
                <img
                  src={encodeURI(PERSONAL.photo)}
                  alt={PERSONAL.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 15%',
                    display: 'block',
                  }}
                  onError={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.display = 'none';
                  }}
                />
              </div>

              {/* Names & Role */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#fff', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                  Aaron M.{' '}
                  <span
                    style={{
                      background: 'linear-gradient(90deg, #f97316, #f59e0b)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Cañada
                  </span>
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f59e0b', marginTop: 4 }}>
                  Front-End AI Engineer
                </div>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Briefcase size={11} style={{ color: '#f59e0b' }} /> FlyRank AI · Remote
                </div>
                <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <MapPin size={11} /> Quezon City, Philippines
                </div>
              </div>
            </div>

            {/* Metrics Row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 8,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 14,
                padding: '12px 14px',
                marginBottom: 20,
                textAlign: 'center',
              }}
            >
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#f59e0b', lineHeight: 1 }}>2+</div>
                <div style={{ fontSize: '0.62rem', color: '#94a3b8', fontWeight: 600, marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Yrs Exp
                </div>
              </div>
              <div style={{ borderLeft: '1px solid rgba(255,255,255,0.08)', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#fff', lineHeight: 1 }}>9+</div>
                <div style={{ fontSize: '0.62rem', color: '#94a3b8', fontWeight: 600, marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Projects
                </div>
              </div>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#38bdf8', lineHeight: 1 }}>9+</div>
                <div style={{ fontSize: '0.62rem', color: '#94a3b8', fontWeight: 600, marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Certs
                </div>
              </div>
            </div>

            {/* Core Tech Stack Matrix */}
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: '0.66rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 5 }}>
                <Code2 size={12} style={{ color: '#f59e0b' }} /> Core Stack & Tooling
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {[
                  { name: 'React', color: '#61dafb' },
                  { name: 'TypeScript', color: '#3178c6' },
                  { name: 'Next.js', color: '#ffffff' },
                  { name: 'Tailwind CSS', color: '#38bdf8' },
                  { name: 'AI/LLM UI', color: '#f59e0b' },
                  { name: 'Figma', color: '#f24e1e' },
                  { name: 'Node.js', color: '#22c55e' },
                ].map((t) => (
                  <span
                    key={t.name}
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      color: '#e2e8f0',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      padding: '4px 9px',
                      borderRadius: 7,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 5,
                    }}
                  >
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: t.color }} />
                    {t.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Code / Mission Snippet Terminal Box */}
            <div
              style={{
                background: 'rgba(0,0,0,0.45)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 12,
                padding: '10px 14px',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                fontSize: '0.7rem',
                lineHeight: 1.5,
              }}
            >
              <div style={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <Terminal size={11} style={{ color: '#10b981' }} />
                <span>mission.config.ts</span>
              </div>
              <div>
                <span style={{ color: '#c084fc' }}>const</span> <span style={{ color: '#38bdf8' }}>focus</span> ={' '}
                <span style={{ color: '#fde047' }}>"Crafting AI-augmented interfaces that users love."</span>;
              </div>
            </div>
          </div>

          {/* Card Footer: Quick Actions */}
          <div
            style={{
              padding: '12px 24px',
              background: 'rgba(255,255,255,0.02)',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', gap: 8 }}>
              <a
                href={CONTACT.github.url}
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                style={{
                  color: '#94a3b8',
                  background: 'rgba(255,255,255,0.06)',
                  padding: '6px',
                  borderRadius: 6,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#fff'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.12)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#94a3b8'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'; }}
              >
                <Github size={14} />
              </a>
              <a
                href={CONTACT.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                style={{
                  color: '#94a3b8',
                  background: 'rgba(255,255,255,0.06)',
                  padding: '6px',
                  borderRadius: 6,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#38bdf8'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.12)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#94a3b8'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'; }}
              >
                <Linkedin size={14} />
              </a>
            </div>

            <a
              href="#contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                fontSize: '0.72rem',
                fontWeight: 800,
                color: '#f59e0b',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#f97316'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#f59e0b'; }}
            >
              Get in touch <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


