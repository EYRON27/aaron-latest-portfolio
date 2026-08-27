import { useState } from 'react';
import {
  Github, Linkedin, ArrowUpRight,
  Briefcase, MapPin, Code2, Terminal, User, Copy, Check,
  Sparkles, Layers, Cpu, Globe, CheckCircle2, ExternalLink,
  CreditCard, Move
} from 'lucide-react';
import { PERSONAL, CONTACT } from '../../data/portfolio';
import { useTheme } from '../../context/ThemeContext';
import DraggableID from '../DraggableID';

export const HeroRightPanel = () => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<'id' | 'code' | 'stack'>('id');
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const techBadges = [
    { name: 'React', color: '#61dafb', bg: 'rgba(97, 218, 251, 0.12)', border: 'rgba(97, 218, 251, 0.3)' },
    { name: 'TypeScript', color: '#3178c6', bg: 'rgba(49, 120, 198, 0.12)', border: 'rgba(49, 120, 198, 0.3)' },
    { name: 'Next.js', color: '#ffffff', bg: 'rgba(255, 255, 255, 0.12)', border: 'rgba(255, 255, 255, 0.25)' },
    { name: 'Tailwind CSS', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.12)', border: 'rgba(56, 189, 248, 0.3)' },
    { name: 'AI Workflows', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.12)', border: 'rgba(245, 158, 11, 0.3)' },
    { name: 'Node.js', color: '#22c55e', bg: 'rgba(34, 197, 94, 0.12)', border: 'rgba(34, 197, 94, 0.3)' },
    { name: 'Figma UI/UX', color: '#f43f5e', bg: 'rgba(244, 63, 94, 0.12)', border: 'rgba(244, 63, 94, 0.3)' },
    { name: 'Python', color: '#eab308', bg: 'rgba(234, 179, 8, 0.12)', border: 'rgba(234, 179, 8, 0.3)' },
  ];

  return (
    <div
      style={{
        background: isDark
          ? 'linear-gradient(150deg, #060910 0%, #0a0f1d 50%, #0d1424 100%)'
          : 'linear-gradient(150deg, #faf8f5 0%, #f4eee4 50%, #ebe3d6 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        minHeight: 'calc(100vh - 64px)',
        overflow: 'hidden',
        padding: '36px 24px',
        transition: 'background 0.3s ease',
      }}
    >
      {/* ── Ambient Glow Background ── */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 580,
          height: 580,
          borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(245,158,11,0.16) 0%, rgba(139,92,246,0.1) 40%, transparent 70%)'
            : 'radial-gradient(circle, rgba(245,158,11,0.18) 0%, rgba(249,115,22,0.08) 40%, transparent 70%)',
          filter: 'blur(45px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: isDark
            ? 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)'
            : 'radial-gradient(circle, rgba(15,23,42,0.06) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* ── Architectural Studio Console Card ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: 440,
          background: isDark
            ? 'rgba(11, 16, 28, 0.92)'
            : 'rgba(255, 255, 255, 0.96)',
          borderRadius: 20,
          border: isDark
            ? '1px solid rgba(255,255,255,0.12)'
            : '1px solid rgba(226, 232, 240, 0.95)',
          boxShadow: isDark
            ? '0 28px 70px rgba(0, 0, 0, 0.65), 0 0 35px rgba(245,158,11,0.08), inset 0 1px 0 rgba(255,255,255,0.1)'
            : '0 24px 50px rgba(15, 23, 42, 0.1), 0 0 25px rgba(245,158,11,0.06), inset 0 1px 0 rgba(255,255,255,0.9)',
          backdropFilter: 'blur(24px)',
          overflow: 'hidden',
          color: isDark ? '#fff' : '#0f172a',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Corner Crosshairs */}
        <span style={{ position: 'absolute', top: 6, left: 6, fontSize: '0.6rem', color: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)', pointerEvents: 'none' }}>+</span>
        <span style={{ position: 'absolute', top: 6, right: 6, fontSize: '0.6rem', color: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)', pointerEvents: 'none' }}>+</span>

        {/* Card Header with Controls & Navigation Tabs */}
        <div
          style={{
            padding: '12px 18px',
            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(241, 245, 249, 0.75)',
            borderBottom: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 8,
          }}
        >
          {/* Mac Window Dots & Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444', opacity: 0.85 }} />
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b', opacity: 0.85 }} />
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', opacity: 0.85 }} />
            <span
              style={{
                fontSize: '0.62rem',
                fontFamily: "'Fira Code', 'Consolas', monospace",
                fontWeight: 800,
                color: isDark ? '#94a3b8' : '#64748b',
                marginLeft: 4,
                letterSpacing: '0.06em',
              }}
            >
              CONSOLE // AARON.DEV
            </span>
          </div>

          {/* Interactive Mode Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {[
              { key: 'id', label: '3D Pass', icon: <CreditCard size={11} /> },
              { key: 'code', label: 'spec.ts', icon: <Terminal size={11} /> },
              { key: 'stack', label: 'Stack', icon: <Cpu size={11} /> },
            ].map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    padding: '4px 9px',
                    borderRadius: 6,
                    fontSize: '0.68rem',
                    fontWeight: isActive ? 800 : 600,
                    color: isActive
                      ? '#fff'
                      : isDark
                      ? '#94a3b8'
                      : '#64748b',
                    background: isActive
                      ? '#f59e0b'
                      : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Tab 1: Interactive 3D Draggable ID Pass ── */}
        {activeTab === 'id' && (
          <div
            style={{
              padding: '16px 20px 24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              minHeight: 380,
            }}
          >
            {/* Interactive Notice Bar */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontSize: '0.66rem',
                fontFamily: "'Fira Code', 'Consolas', monospace",
                color: isDark ? '#94a3b8' : '#64748b',
                background: isDark ? 'rgba(255, 255, 255, 0.03)' : '#f8fafc',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #e2e8f0',
                padding: '3px 10px',
                borderRadius: 99,
                marginBottom: 6,
              }}
            >
              <Move size={10} style={{ color: '#f59e0b' }} />
              <span>Interactive 3D Pass — Grab & Drag</span>
            </div>

            {/* Draggable 3D ID Component */}
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: 2 }}>
              <DraggableID
                photoSrc={PERSONAL.photo}
                name={PERSONAL.name}
                role="Front-End AI Engineer"
                school="Quezon City University"
                idNumber="23-2301"
              />
            </div>
          </div>
        )}

        {/* ── Tab 2: Syntax Highlighted Spec Terminal (`spec.ts`) ── */}
        {activeTab === 'code' && (
          <div
            style={{
              padding: '18px 20px',
              fontFamily: "'Fira Code', 'Consolas', monospace",
              fontSize: '0.76rem',
              lineHeight: 1.65,
              background: isDark ? '#080c14' : '#0f172a',
              color: '#f8fafc',
              overflowX: 'auto',
            }}
          >
            <div style={{ color: '#64748b', marginBottom: 6 }}>// Architectural System Spec</div>
            <div>
              <span style={{ color: '#f43f5e' }}>const</span> <span style={{ color: '#38bdf8' }}>aaronCanada</span>:{' '}
              <span style={{ color: '#fbbf24' }}>Developer</span> = &#123;
            </div>
            <div style={{ paddingLeft: 16 }}>
              <span style={{ color: '#94a3b8' }}>role</span>:{' '}
              <span style={{ color: '#4ade80' }}>'Front-End AI Engineer'</span>,
            </div>
            <div style={{ paddingLeft: 16 }}>
              <span style={{ color: '#94a3b8' }}>company</span>:{' '}
              <span style={{ color: '#4ade80' }}>'FlyRank AI'</span>,
            </div>
            <div style={{ paddingLeft: 16 }}>
              <span style={{ color: '#94a3b8' }}>education</span>:{' '}
              <span style={{ color: '#4ade80' }}>'BSIT @ Quezon City University'</span>,
            </div>
            <div style={{ paddingLeft: 16 }}>
              <span style={{ color: '#94a3b8' }}>coreStack</span>: [
              <span style={{ color: '#60a5fa' }}>'React'</span>,{' '}
              <span style={{ color: '#60a5fa' }}>'TypeScript'</span>,{' '}
              <span style={{ color: '#60a5fa' }}>'Next.js'</span>,{' '}
              <span style={{ color: '#60a5fa' }}>'Python'</span>],
            </div>
            <div style={{ paddingLeft: 16 }}>
              <span style={{ color: '#94a3b8' }}>mission</span>:{' '}
              <span style={{ color: '#f59e0b' }}>'Building Autonomous AI Experiences'</span>,
            </div>
            <div style={{ paddingLeft: 16 }}>
              <span style={{ color: '#94a3b8' }}>status</span>:{' '}
              <span style={{ color: '#34d399' }}>'Ready for Commission'</span>
            </div>
            <div>&#125;;</div>

            {/* One-Click Copy Email Bar inside Terminal */}
            <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <button
                onClick={handleCopyEmail}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '9px 12px',
                  borderRadius: 8,
                  background: 'rgba(245,158,11,0.12)',
                  border: '1px solid rgba(245,158,11,0.35)',
                  cursor: 'pointer',
                  color: '#fbbf24',
                  fontFamily: "'Fira Code', 'Consolas', monospace",
                  fontSize: '0.74rem',
                  transition: 'all 0.2s',
                }}
              >
                <span>&gt; copyEmail({CONTACT.email})</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontWeight: 700 }}>
                  {copied ? (
                    <>
                      <Check size={11} style={{ color: '#22c55e' }} />
                      <span style={{ color: '#22c55e' }}>COPIED!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={11} />
                      <span>EXEC</span>
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* ── Tab 3: Core Architecture Stack ── */}
        {activeTab === 'stack' && (
          <div style={{ padding: '20px 22px' }}>
            <div
              style={{
                fontSize: '0.68rem',
                fontFamily: "'Fira Code', 'Consolas', monospace",
                fontWeight: 800,
                color: isDark ? '#94a3b8' : '#64748b',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: 12,
              }}
            >
              PRIMARY PROFICIENCIES & RUNTIMES
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 10,
              }}
            >
              {techBadges.map((badge) => (
                <div
                  key={badge.name}
                  style={{
                    padding: '9px 12px',
                    borderRadius: 8,
                    background: isDark ? badge.bg : '#f8fafc',
                    border: `1px solid ${badge.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'transform 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = '')}
                >
                  <span
                    style={{
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      color: isDark ? '#f8fafc' : '#0f172a',
                    }}
                  >
                    {badge.name}
                  </span>
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: badge.color,
                      boxShadow: `0 0 8px ${badge.color}`,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
