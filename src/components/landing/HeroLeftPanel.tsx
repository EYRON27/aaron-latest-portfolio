import { useState, useEffect } from 'react';
import {
  Mail, Github, Linkedin, ArrowUpRight,
  Briefcase, FileText, Sparkles, GraduationCap,
  Code2, ExternalLink, Clock, Compass, Terminal
} from 'lucide-react';
import { PERSONAL, CONTACT, STATS } from '../../data/portfolio';
import { Typewriter } from './Typewriter';
import { CountUp } from './CountUp';
import { AnimatedStatement } from './AnimatedStatement';
import { useTheme } from '../../context/ThemeContext';

export const HeroLeftPanel = () => {
  const { isDark } = useTheme();
  const [phtTime, setPhtTime] = useState('');

  // Live Philippine Standard Time (PHT - UTC+8)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Manila',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setPhtTime(now.toLocaleTimeString('en-US', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        padding: 'clamp(28px, 4vh, 48px) clamp(28px, 4.5vw, 56px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: 'calc(100vh - 64px)',
        background: isDark ? '#080c14' : '#ffffff',
        transition: 'background 0.3s ease',
        position: 'relative',
        zIndex: 1,
        borderRight: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)',
      }}
    >
      <div>
        {/* ── Studio Telemetry & Live Coordinates Bar ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            marginBottom: 24,
            paddingBottom: 14,
            borderBottom: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.06)',
            flexWrap: 'wrap',
          }}
        >
          {/* Coordinates & Location */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Compass size={13} style={{ color: '#f59e0b' }} />
            <span
              style={{
                fontSize: '0.68rem',
                fontFamily: "'Fira Code', 'Consolas', monospace",
                fontWeight: 700,
                color: isDark ? '#94a3b8' : '#64748b',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              14.6760° N, 121.0437° E · QUEZON CITY, PH
            </span>
          </div>

          {/* Live Clock & Availability */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {/* Live Ticking Clock */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                fontSize: '0.68rem',
                fontFamily: "'Fira Code', 'Consolas', monospace",
                color: isDark ? '#cbd5e1' : '#475569',
                fontWeight: 650,
              }}
            >
              <Clock size={11} style={{ color: '#f59e0b' }} />
              <span>{phtTime || '12:00:00 AM'} PHT</span>
            </div>

            {/* Live Beacon */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '3px 10px',
                borderRadius: 99,
                background: isDark ? 'rgba(34, 197, 94, 0.12)' : 'rgba(34, 197, 94, 0.08)',
                border: isDark ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(34, 197, 94, 0.25)',
              }}
            >
              <span style={{ position: 'relative', display: 'inline-flex', width: 6, height: 6 }}>
                <span
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    background: '#22c55e',
                    animation: 'ping 1.6s ease-out infinite',
                    opacity: 0.75,
                  }}
                />
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'block' }} />
              </span>
              <span
                style={{
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  color: isDark ? '#4ade80' : '#15803d',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                Available
              </span>
            </div>
          </div>
        </div>

        {/* ── Studio Badge & Title ── */}
        <div style={{ marginBottom: 20 }}>
          {/* Classic Monogram Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 10,
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                fontSize: '0.66rem',
                fontFamily: "'Fira Code', 'Consolas', monospace",
                fontWeight: 800,
                color: '#f59e0b',
                background: isDark ? 'rgba(245, 158, 11, 0.1)' : 'rgba(245, 158, 11, 0.08)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                padding: '2px 8px',
                borderRadius: 4,
                letterSpacing: '0.08em',
              }}
            >
              STUDIO EDITION // 2026
            </span>

            <a
              href="https://www.linkedin.com/posts/ca%C3%B1ada-aaron-m-352572352_flyrank-is-building-the-autopilot-for-organic-activity-7470102063142588416-0XyC"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                fontSize: '0.66rem',
                fontWeight: 750,
                color: isDark ? '#fbbf24' : '#b45309',
                textDecoration: 'none',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              <Briefcase size={11} />
              <span>Front-End AI Engineer @ FlyRank</span>
              <ExternalLink size={10} style={{ opacity: 0.7 }} />
            </a>

            <span
              style={{
                fontSize: '0.66rem',
                fontWeight: 750,
                color: isDark ? '#94a3b8' : '#64748b',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <GraduationCap size={12} />
              QCU BSIT
            </span>
          </div>

          {/* Bold Editorial Headline */}
          <h1
            style={{
              fontSize: 'clamp(2.9rem, 5.2vw, 4.5rem)',
              fontWeight: 950,
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              color: isDark ? '#f8fafc' : '#0f172a',
              margin: '0 0 10px',
            }}
          >
            Aaron M.{' '}
            <span
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #f97316 0%, #f59e0b 50%, #fbbf24 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontStyle: 'italic',
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 900,
                filter: 'drop-shadow(0 4px 20px rgba(245,158,11,0.22))',
              }}
            >
              Cañada.
            </span>
          </h1>

          {/* Dynamic Role Subtitle */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
              fontWeight: 750,
              color: isDark ? '#e2e8f0' : '#1e293b',
              letterSpacing: '-0.01em',
            }}
          >
            <span style={{ color: '#f59e0b', fontFamily: 'serif', fontStyle: 'italic', fontWeight: 800 }}>—</span>
            <Typewriter
              words={[
                'Front-End AI Engineer',
                'Full-Stack Developer',
                'UI/UX Architect',
                'Digital Craftsman',
              ]}
            />
          </div>
        </div>

        {/* ── Studio Narrative ── */}
        <p
          style={{
            fontSize: 'clamp(0.94rem, 1.5vw, 1.04rem)',
            lineHeight: 1.7,
            color: isDark ? '#94a3b8' : '#475569',
            maxWidth: 630,
            marginBottom: 24,
            fontWeight: 450,
          }}
        >
          Engineering scalable web architectures and AI-driven interfaces with pixel-perfect precision. Rooted in{' '}
          <strong style={{ color: isDark ? '#f8fafc' : '#0f172a', fontWeight: 700 }}>React</strong>,{' '}
          <strong style={{ color: isDark ? '#f8fafc' : '#0f172a', fontWeight: 700 }}>TypeScript</strong>,{' '}
          <strong style={{ color: isDark ? '#f8fafc' : '#0f172a', fontWeight: 700 }}>Next.js</strong>, and{' '}
          <strong style={{ color: '#f59e0b', fontWeight: 750 }}>Autonomous AI Systems</strong>.
        </p>

        {/* ── Architectural Project Transformation Ledger ── */}
        <AnimatedStatement />

        {/* ── Classic Action Dock ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 28,
            flexWrap: 'wrap',
          }}
        >
          {/* Primary CTA */}
          <a
            href="#contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '13px 28px',
              borderRadius: 10,
              fontWeight: 800,
              fontSize: '0.9rem',
              background: 'linear-gradient(135deg, #f97316 0%, #f59e0b 100%)',
              color: '#fff',
              textDecoration: 'none',
              boxShadow: '0 8px 24px rgba(249,115,22,0.35)',
              transition: 'all 0.25s ease',
              letterSpacing: '0.01em',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = 'translateY(-2px)';
              el.style.boxShadow = '0 12px 32px rgba(249,115,22,0.45)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = '';
              el.style.boxShadow = '0 8px 24px rgba(249,115,22,0.35)';
            }}
          >
            <Mail size={15} /> Initiate Project
          </a>

          {/* Secondary CTA: CV */}
          <a
            href={CONTACT.cv}
            target="_blank"
            rel="noopener noreferrer"
            download="Aaron_Canada_CV.pdf"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '13px 20px',
              borderRadius: 10,
              fontWeight: 700,
              fontSize: '0.9rem',
              background: isDark ? 'rgba(255, 255, 255, 0.04)' : '#f8fafc',
              border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid #cbd5e1',
              color: isDark ? '#f8fafc' : '#1e293b',
              textDecoration: 'none',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = 'translateY(-2px)';
              el.style.borderColor = '#f59e0b';
              el.style.color = '#f59e0b';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = '';
              el.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.12)' : '#cbd5e1';
              el.style.color = isDark ? '#f8fafc' : '#1e293b';
            }}
          >
            <FileText size={15} style={{ color: '#f59e0b' }} /> Curriculum Vitae
          </a>

          {/* Tertiary CTA: Works */}
          <a
            href="#projects"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '13px 18px',
              borderRadius: 10,
              fontWeight: 700,
              fontSize: '0.9rem',
              border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e2e8f0',
              color: isDark ? '#cbd5e1' : '#475569',
              textDecoration: 'none',
              background: 'transparent',
              transition: 'all 0.25s',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = '#f59e0b';
              el.style.borderColor = '#f59e0b';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = isDark ? '#cbd5e1' : '#475569';
              el.style.borderColor = isDark ? 'rgba(255,255,255,0.08)' : '#e2e8f0';
            }}
          >
            Selected Works <ArrowUpRight size={14} />
          </a>

          {/* Social Icon Seals */}
          <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
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
                  width: 42,
                  height: 42,
                  borderRadius: 10,
                  border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e2e8f0',
                  background: isDark ? 'rgba(255,255,255,0.03)' : '#f8fafc',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isDark ? '#cbd5e1' : '#64748b',
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
                  el.style.borderColor = isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0';
                  el.style.color = isDark ? '#cbd5e1' : '#64748b';
                  el.style.transform = '';
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Classic Architectural Metric Ledger ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
          paddingTop: 18,
          borderTop: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e2e8f0',
        }}
      >
        {[
          { code: '01', label: 'Production Systems Built', num: 9, suffix: '+', color: '#f59e0b' },
          { code: '02', label: 'Professional Credentials', num: 15, suffix: '+', color: '#8b5cf6' },
          { code: '03', label: 'AI-Integrated Architecture', num: 100, suffix: '%', color: '#10b981' },
        ].map((item) => (
          <div
            key={item.label}
            style={{
              padding: '12px 14px',
              borderRadius: 10,
              background: isDark ? 'rgba(255, 255, 255, 0.02)' : '#f8fafc',
              border: isDark ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid #f1f5f9',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: 6,
                right: 8,
                fontSize: '0.62rem',
                fontFamily: "'Fira Code', 'Consolas', monospace",
                fontWeight: 800,
                color: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)',
              }}
            >
              {item.code}
            </span>
            <div
              style={{
                fontSize: 'clamp(1.4rem, 2.2vw, 1.8rem)',
                fontWeight: 900,
                color: item.color,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
              }}
            >
              <CountUp to={item.num} suffix={item.suffix} />
            </div>
            <div
              style={{
                fontSize: '0.7rem',
                color: isDark ? '#94a3b8' : '#64748b',
                fontWeight: 600,
                marginTop: 4,
                lineHeight: 1.3,
              }}
            >
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
