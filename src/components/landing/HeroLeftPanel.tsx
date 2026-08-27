import { useState } from 'react';
import {
  Mail, Github, Linkedin, ArrowUpRight,
  Briefcase, FileText, Sparkles, GraduationCap, CheckCircle2,
  Code2, ExternalLink
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
        padding: 'clamp(28px, 4vh, 48px) clamp(28px, 4vw, 56px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: 'calc(100vh - 64px)',
        background: isDark ? '#090d16' : '#ffffff',
        transition: 'background 0.3s ease',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div>
        {/* ── Top Verified & Status Badges ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
          {/* Live Availability Pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: isDark ? 'rgba(34, 197, 94, 0.12)' : 'rgba(34, 197, 94, 0.08)',
              border: isDark ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(34, 197, 94, 0.25)',
              padding: '5px 13px',
              borderRadius: 99,
              boxShadow: '0 2px 8px rgba(34, 197, 94, 0.1)',
            }}
          >
            <span style={{ position: 'relative', display: 'inline-flex', width: 7, height: 7 }}>
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
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', display: 'block' }} />
            </span>
            <span
              style={{
                fontSize: '0.7rem',
                fontWeight: 750,
                color: isDark ? '#4ade80' : '#15803d',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              Available for Projects
            </span>
          </div>

          {/* Current Role Badge */}
          <a
            href="https://www.linkedin.com/posts/ca%C3%B1ada-aaron-m-352572352_flyrank-is-building-the-autopilot-for-organic-activity-7470102063142588416-0XyC"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: isDark ? 'rgba(245, 158, 11, 0.12)' : 'rgba(245, 158, 11, 0.08)',
              border: isDark ? '1px solid rgba(245, 158, 11, 0.35)' : '1px solid rgba(245, 158, 11, 0.3)',
              padding: '5px 13px',
              borderRadius: 99,
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = 'translateY(-1px)';
              el.style.borderColor = '#f59e0b';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = '';
              el.style.borderColor = isDark ? 'rgba(245, 158, 11, 0.35)' : 'rgba(245, 158, 11, 0.3)';
            }}
          >
            <Briefcase size={12} style={{ color: '#f59e0b' }} />
            <span
              style={{
                fontSize: '0.7rem',
                fontWeight: 750,
                color: isDark ? '#fbbf24' : '#b45309',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              Front-End AI Engineer @ FlyRank
            </span>
            <ExternalLink size={10} style={{ color: '#f59e0b', opacity: 0.8 }} />
          </a>

          {/* Education Tag */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: isDark ? 'rgba(99, 102, 241, 0.12)' : 'rgba(99, 102, 241, 0.08)',
              border: isDark ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid rgba(99, 102, 241, 0.25)',
              padding: '5px 13px',
              borderRadius: 99,
            }}
          >
            <GraduationCap size={12} style={{ color: '#818cf8' }} />
            <span
              style={{
                fontSize: '0.7rem',
                fontWeight: 750,
                color: isDark ? '#a5b4fc' : '#4338ca',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              QCU BSIT
            </span>
          </div>
        </div>

        {/* ── Main Name & Animated Roles ── */}
        <div style={{ marginBottom: 18 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: '0.82rem',
              fontWeight: 800,
              color: isDark ? '#94a3b8' : '#64748b',
              textTransform: 'uppercase',
              letterSpacing: '0.16em',
              marginBottom: 6,
            }}
          >
            <Sparkles size={13} style={{ color: '#f59e0b' }} />
            <span>Hello, I Am</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.7rem, 4.8vw, 4.2rem)',
              fontWeight: 950,
              lineHeight: 1.08,
              letterSpacing: '-0.04em',
              color: isDark ? '#f8fafc' : '#0f172a',
              margin: '0 0 10px',
            }}
          >
            Aaron M.{' '}
            <span
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #f97316 0%, #f59e0b 50%, #eab308 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 4px 18px rgba(245,158,11,0.25))',
              }}
            >
              Cañada.
            </span>
          </h1>

          {/* Dynamic Typewriter Role */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '6px 14px',
              borderRadius: 10,
              background: isDark ? 'rgba(255, 255, 255, 0.04)' : '#f8fafc',
              border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            <Code2 size={15} style={{ color: '#f59e0b' }} />
            <span
              style={{
                fontSize: 'clamp(0.95rem, 1.6vw, 1.2rem)',
                fontWeight: 750,
                color: isDark ? '#e2e8f0' : '#1e293b',
              }}
            >
              <Typewriter
                words={[
                  'Front-End AI Engineer',
                  'Full-Stack Developer',
                  'UI/UX Architect',
                  'Modern Web Craftsman',
                ]}
              />
            </span>
          </div>
        </div>

        {/* ── Bio Summary with Tag Highlights ── */}
        <p
          style={{
            fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
            lineHeight: 1.7,
            color: isDark ? '#94a3b8' : '#475569',
            maxWidth: 620,
            marginBottom: 24,
            fontWeight: 450,
          }}
        >
          Specializing in bridging intricate backend architectures with fast, accessible, and cinematic web interfaces. Building with{' '}
          <strong style={{ color: isDark ? '#f8fafc' : '#0f172a', fontWeight: 700 }}>React</strong>,{' '}
          <strong style={{ color: isDark ? '#f8fafc' : '#0f172a', fontWeight: 700 }}>TypeScript</strong>,{' '}
          <strong style={{ color: isDark ? '#f8fafc' : '#0f172a', fontWeight: 700 }}>Next.js</strong>, and{' '}
          <strong style={{ color: '#f59e0b', fontWeight: 750 }}>AI-Driven UI systems</strong>.
        </p>

        {/* ── Dynamic Impact Statement Widget ── */}
        <AnimatedStatement />

        {/* ── High-Impact Call to Actions ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 28,
            flexWrap: 'wrap',
          }}
        >
          {/* Primary CTA: Hire Me */}
          <a
            href="#contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 26px',
              borderRadius: 12,
              fontWeight: 800,
              fontSize: '0.9rem',
              background: 'linear-gradient(135deg, #f97316 0%, #f59e0b 100%)',
              color: '#fff',
              textDecoration: 'none',
              boxShadow: '0 8px 24px rgba(249,115,22,0.35)',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = 'translateY(-2px)';
              el.style.boxShadow = '0 12px 30px rgba(249,115,22,0.45)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = '';
              el.style.boxShadow = '0 8px 24px rgba(249,115,22,0.35)';
            }}
          >
            <Mail size={15} /> Start a Project
          </a>

          {/* Secondary CTA: Download CV */}
          <a
            href={CONTACT.cv}
            target="_blank"
            rel="noopener noreferrer"
            download="Aaron_Canada_CV.pdf"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 20px',
              borderRadius: 12,
              fontWeight: 700,
              fontSize: '0.9rem',
              background: isDark ? 'rgba(255, 255, 255, 0.05)' : '#f8fafc',
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
            <FileText size={15} style={{ color: '#f59e0b' }} /> Download CV
          </a>

          {/* Tertiary CTA: Projects */}
          <a
            href="#projects"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '12px 18px',
              borderRadius: 12,
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
            Projects <ArrowUpRight size={14} />
          </a>

          {/* Social Icons Dock */}
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
                  width: 40,
                  height: 40,
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

      {/* ── Bottom Metric Cards Deck ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 14,
          paddingTop: 18,
          borderTop: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e2e8f0',
        }}
      >
        {[
          { label: 'Production Projects', num: 9, suffix: '+', color: '#f59e0b' },
          { label: 'Certifications Earned', num: 15, suffix: '+', color: '#8b5cf6' },
          { label: 'Responsive & Accessible', num: 100, suffix: '%', color: '#10b981' },
        ].map((item) => (
          <div
            key={item.label}
            style={{
              padding: '12px 14px',
              borderRadius: 14,
              background: isDark ? 'rgba(255, 255, 255, 0.02)' : '#f8fafc',
              border: isDark ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid #f1f5f9',
              transition: 'all 0.25s ease',
            }}
          >
            <div
              style={{
                fontSize: 'clamp(1.4rem, 2.4vw, 1.85rem)',
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
                fontSize: '0.72rem',
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
