import { useState } from 'react';
import {
  Github, Linkedin, ArrowUpRight,
  Briefcase, MapPin, Code2, Terminal, User, Copy, Check,
  Sparkles, Layers, Cpu, Globe, CheckCircle2, ExternalLink
} from 'lucide-react';
import { PERSONAL, CONTACT } from '../../data/portfolio';
import { useTheme } from '../../context/ThemeContext';

export const HeroRightPanel = () => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<'profile' | 'code' | 'stack'>('profile');
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
    { name: 'AI / LLMs', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.12)', border: 'rgba(245, 158, 11, 0.3)' },
    { name: 'Node.js', color: '#22c55e', bg: 'rgba(34, 197, 94, 0.12)', border: 'rgba(34, 197, 94, 0.3)' },
    { name: 'Figma UI/UX', color: '#f43f5e', bg: 'rgba(244, 63, 94, 0.12)', border: 'rgba(244, 63, 94, 0.3)' },
    { name: 'Python', color: '#eab308', bg: 'rgba(234, 179, 8, 0.12)', border: 'rgba(234, 179, 8, 0.3)' },
  ];

  return (
    <div
      style={{
        background: isDark
          ? 'linear-gradient(150deg, #070b12 0%, #0d131f 50%, #111827 100%)'
          : 'linear-gradient(150deg, #faf8f5 0%, #f3ede2 50%, #eae2d3 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        minHeight: 'calc(100vh - 64px)',
        overflow: 'hidden',
        padding: '36px 28px',
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
          width: 550,
          height: 550,
          borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(245,158,11,0.18) 0%, rgba(139,92,246,0.12) 40%, transparent 70%)'
            : 'radial-gradient(circle, rgba(245,158,11,0.2) 0%, rgba(249,115,22,0.1) 40%, transparent 70%)',
          filter: 'blur(40px)',
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

      {/* ── Main Interactive Glass Hub Card ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: 440,
          background: isDark
            ? 'rgba(13, 19, 31, 0.88)'
            : 'rgba(255, 255, 255, 0.95)',
          borderRadius: 24,
          border: isDark
            ? '1px solid rgba(255,255,255,0.12)'
            : '1px solid rgba(226, 232, 240, 0.95)',
          boxShadow: isDark
            ? '0 28px 70px rgba(0, 0, 0, 0.6), 0 0 35px rgba(245,158,11,0.1), inset 0 1px 0 rgba(255,255,255,0.1)'
            : '0 24px 50px rgba(15, 23, 42, 0.1), 0 0 25px rgba(245,158,11,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
          backdropFilter: 'blur(24px)',
          overflow: 'hidden',
          color: isDark ? '#fff' : '#0f172a',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Card Header with Mac Controls & Navigation Tabs */}
        <div
          style={{
            padding: '12px 18px',
            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(241, 245, 249, 0.7)',
            borderBottom: isDark ? '1px solid rgba(255,255,255,0.07)' : '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
          }}
        >
          {/* Mac Window Dots */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#ef4444', opacity: 0.85 }} />
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#f59e0b', opacity: 0.85 }} />
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#10b981', opacity: 0.85 }} />
          </div>

          {/* Interactive Mode Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {[
              { key: 'profile', label: 'Dev Profile', icon: <User size={11} /> },
              { key: 'code', label: 'spec.ts', icon: <Terminal size={11} /> },
              { key: 'stack', label: 'Tech Stack', icon: <Cpu size={11} /> },
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
                    fontWeight: isActive ? 750 : 600,
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

        {/* ── Tab 1: Profile Spotlight ── */}
        {activeTab === 'profile' && (
          <div style={{ padding: '24px 22px 20px' }}>
            {/* Identity Row: Photo + Title Info */}
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20 }}>
              {/* Photo Frame with Glowing Ambient Halo */}
              <div
                style={{
                  position: 'relative',
                  width: 98,
                  height: 112,
                  borderRadius: 18,
                  overflow: 'hidden',
                  flexShrink: 0,
                  border: '2px solid rgba(245,158,11,0.6)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                  background: isDark ? '#1e293b' : '#f1f5f9',
                }}
              >
                <img
                  src={encodeURI(PERSONAL.photo)}
                  alt={PERSONAL.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />
                {/* Live Online Dot */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 6,
                    right: 6,
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: '#22c55e',
                    border: '2px solid #0d131f',
                  }}
                  title="Online & Ready to Build"
                />
              </div>

              {/* Title & Details */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <span
                    style={{
                      fontSize: '1.15rem',
                      fontWeight: 850,
                      color: isDark ? '#f8fafc' : '#0f172a',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {PERSONAL.name}
                  </span>
                  <CheckCircle2 size={15} style={{ color: '#38bdf8' }} title="Verified Developer" />
                </div>

                <div
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: '#f59e0b',
                    marginBottom: 6,
                  }}
                >
                  Front-End AI Engineer @ FlyRank
                </div>

                <div
                  style={{
                    fontSize: '0.72rem',
                    color: isDark ? '#94a3b8' : '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <MapPin size={11} style={{ color: isDark ? '#64748b' : '#94a3b8' }} />
                  <span>{PERSONAL.location}</span>
                </div>
              </div>
            </div>

            {/* Micro Tech Tags Strip */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 6,
                padding: '12px 14px',
                borderRadius: 14,
                background: isDark ? 'rgba(255, 255, 255, 0.03)' : '#f8fafc',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid #e2e8f0',
                marginBottom: 16,
              }}
            >
              {['React', 'TypeScript', 'Next.js', 'AI Workflows', 'Tailwind', 'Figma'].map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    padding: '3px 9px',
                    borderRadius: 6,
                    background: isDark ? 'rgba(255,255,255,0.06)' : '#fff',
                    border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e2e8f0',
                    color: isDark ? '#cbd5e1' : '#334155',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* One-Click Copy Email Bar */}
            <button
              onClick={handleCopyEmail}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: 12,
                background: isDark
                  ? 'linear-gradient(135deg, rgba(245,158,11,0.15) 0%, rgba(249,115,22,0.1) 100%)'
                  : 'linear-gradient(135deg, #fef3c7 0%, #fffbeb 100%)',
                border: isDark ? '1px solid rgba(245,158,11,0.35)' : '1px solid rgba(245,158,11,0.4)',
                cursor: 'pointer',
                color: isDark ? '#f8fafc' : '#78350f',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-1px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = '')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.76rem', fontWeight: 650 }}>
                <span style={{ color: '#f59e0b', fontWeight: 800 }}>Email:</span>
                <span style={{ opacity: 0.9 }}>{CONTACT.email}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  color: '#f59e0b',
                }}
              >
                {copied ? (
                  <>
                    <Check size={12} style={{ color: '#22c55e' }} />
                    <span style={{ color: '#22c55e' }}>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    <span>Copy</span>
                  </>
                )}
              </div>
            </button>
          </div>
        )}

        {/* ── Tab 2: Syntax Highlighted Developer Spec (spec.ts) ── */}
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
            <div style={{ color: '#64748b', marginBottom: 6 }}>// Developer Specification</div>
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
              <span style={{ color: '#94a3b8' }}>passion</span>:{' '}
              <span style={{ color: '#f59e0b' }}>'AI-Driven UI & High-Impact Web'</span>,
            </div>
            <div style={{ paddingLeft: 16 }}>
              <span style={{ color: '#94a3b8' }}>status</span>:{' '}
              <span style={{ color: '#34d399' }}>'Ready to Collaborate'</span>
            </div>
            <div>&#125;;</div>
          </div>
        )}

        {/* ── Tab 3: Tech Stack Matrix ── */}
        {activeTab === 'stack' && (
          <div style={{ padding: '20px 22px' }}>
            <div
              style={{
                fontSize: '0.7rem',
                fontWeight: 800,
                color: isDark ? '#94a3b8' : '#64748b',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: 12,
              }}
            >
              Primary Proficiencies & Tools
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
                    borderRadius: 10,
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
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: isDark ? '#f8fafc' : '#0f172a',
                    }}
                  >
                    {badge.name}
                  </span>
                  <span
                    style={{
                      width: 7,
                      height: 7,
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
