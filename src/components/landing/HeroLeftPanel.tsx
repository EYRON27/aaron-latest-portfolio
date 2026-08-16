import {
  Mail, Github, Linkedin, ArrowUpRight,
  Briefcase, FileText, Sparkles
} from 'lucide-react';
import { PERSONAL, CONTACT, STATS } from '../../data/portfolio';
import { Typewriter } from './Typewriter';
import { CountUp } from './CountUp';
import { AnimatedStatement } from './AnimatedStatement';
import { useTheme } from '../../context/ThemeContext';

export const HeroLeftPanel = () => {
  const { isDark } = useTheme();

  return (
    <div
      style={{
        padding: 'clamp(36px, 5vh, 56px) clamp(36px, 5vw, 64px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: 'calc(100vh - 64px)',
        background: isDark ? '#090d16' : '#fff',
        transition: 'background 0.3s ease',
      }}
    >
      <div>
        {/* ── Top Status Badges ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22, flexWrap: 'wrap' }}>
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
              border: '1px solid rgba(245, 158, 11, 0.25)',
              padding: '6px 14px',
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

        {/* ── Headline & Titles ── */}
        <div style={{ marginBottom: 24 }}>
          <span
            style={{
              fontSize: '0.85rem',
              fontWeight: 700,
              color: isDark ? '#94a3b8' : '#64748b',
              display: 'block',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              marginBottom: 8,
            }}
          >
            Hi! I Am
          </span>
          <h1
            style={{
              fontSize: 'clamp(2.8rem, 5.2vw, 4.4rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              color: isDark ? '#f8fafc' : '#0f172a',
              margin: '0 0 14px',
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
            <span style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)', fontWeight: 700, color: isDark ? '#e2e8f0' : '#334155' }}>
              <Typewriter
                words={['Front-End AI Engineer', 'Full-Stack Developer', 'UI/UX Designer', 'Web Craftsman']}
              />
            </span>
            <span
              style={{
                fontSize: '0.66rem',
                fontWeight: 800,
                background: isDark ? '#1e293b' : '#0f172a',
                color: '#f59e0b',
                padding: '4px 10px',
                borderRadius: 6,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                border: isDark ? '1px solid rgba(245,158,11,0.3)' : 'none',
              }}
            >
              QCU BSIT
            </span>
          </div>
        </div>

        {/* ── Dynamic Statement ── */}
        <AnimatedStatement />

        {/* ── Call to Actions ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
          {/* Hire Me */}
          <a
            href="#contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '13px 28px',
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
              padding: '13px 22px',
              borderRadius: 12,
              fontWeight: 700,
              fontSize: '0.92rem',
              background: isDark ? 'rgba(245, 158, 11, 0.12)' : 'rgba(245, 158, 11, 0.08)',
              border: `1.5px solid ${isDark ? 'rgba(245, 158, 11, 0.45)' : 'rgba(245, 158, 11, 0.35)'}`,
              color: isDark ? '#fbbf24' : '#b45309',
              textDecoration: 'none',
              transition: 'all 0.25s',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = isDark ? 'rgba(245, 158, 11, 0.25)' : 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)';
              el.style.borderColor = '#f59e0b';
              el.style.color = isDark ? '#fff' : '#78350f';
              el.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = isDark ? 'rgba(245, 158, 11, 0.12)' : 'rgba(245, 158, 11, 0.08)';
              el.style.borderColor = isDark ? 'rgba(245, 158, 11, 0.45)' : 'rgba(245, 158, 11, 0.35)';
              el.style.color = isDark ? '#fbbf24' : '#b45309';
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
              padding: '13px 18px',
              borderRadius: 12,
              fontWeight: 700,
              fontSize: '0.92rem',
              border: isDark ? '1.5px solid rgba(255,255,255,0.12)' : '1.5px solid #e2e8f0',
              color: isDark ? '#f8fafc' : '#334155',
              textDecoration: 'none',
              background: isDark ? '#131b2e' : '#fff',
              transition: 'all 0.25s',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = isDark ? 'rgba(255,255,255,0.3)' : '#cbd5e1';
              el.style.color = isDark ? '#fbbf24' : '#0f172a';
              el.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = isDark ? 'rgba(255,255,255,0.12)' : '#e2e8f0';
              el.style.color = isDark ? '#f8fafc' : '#334155';
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
                  border: isDark ? '1.5px solid rgba(255,255,255,0.12)' : '1.5px solid #e2e8f0',
                  background: isDark ? '#131b2e' : '#fff',
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
                  el.style.borderColor = isDark ? 'rgba(255,255,255,0.12)' : '#e2e8f0';
                  el.style.color = isDark ? '#cbd5e1' : '#64748b';
                  el.style.transform = '';
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* ── Key Metrics Strip ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 16,
            borderTop: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #f1f5f9',
            borderBottom: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #f1f5f9',
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
                  color: i === 0 ? '#f59e0b' : isDark ? '#f8fafc' : '#0f172a',
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                }}
              >
                <CountUp to={s.number} suffix={s.suffix} />
              </div>
              <div style={{ fontSize: '0.75rem', color: isDark ? '#94a3b8' : '#64748b', marginTop: 6, fontWeight: 600 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* ── Contact Email Pill ── */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '8px 14px',
            borderRadius: 10,
            background: isDark ? 'rgba(255,255,255,0.04)' : '#f8fafc',
            border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e2e8f0',
          }}
        >
          <Mail size={13} style={{ color: '#f59e0b' }} />
          <a
            href={`mailto:${CONTACT.email}`}
            style={{ fontSize: '0.84rem', color: isDark ? '#cbd5e1' : '#334155', fontWeight: 700, textDecoration: 'none' }}
          >
            {CONTACT.email}
          </a>
        </div>
      </div>


      {/* ── Engineering Highlights Bar ── */}
      <div
        style={{
          marginTop: 20,
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          borderRadius: 16,
          padding: '16px 20px',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
          boxShadow: '0 10px 25px rgba(15,23,42,0.12)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: 'rgba(245,158,11,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#f59e0b',
            }}
          >
            <Sparkles size={16} />
          </div>
          <div>
            <div style={{ fontSize: '0.62rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700 }}>
              Specialization
            </div>
            <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#f8fafc' }}>
              Front-End AI Engineering & Full-Stack Apps
            </div>
          </div>
        </div>

        <a
          href="#works"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            background: 'linear-gradient(135deg, #f59e0b, #f97316)',
            color: '#0f172a',
            fontWeight: 800,
            fontSize: '0.75rem',
            padding: '7px 14px',
            borderRadius: 8,
            textDecoration: 'none',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = '';
          }}
        >
          View Works <ArrowUpRight size={12} />
        </a>
      </div>
    </div>
  );
};
