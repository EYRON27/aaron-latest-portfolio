import {
  Github, Linkedin, ArrowUpRight,
  Briefcase, MapPin, Code2, Terminal
} from 'lucide-react';
import { PERSONAL, CONTACT } from '../../data/portfolio';

export const HeroRightPanel = () => {
  return (
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
      {/* ── Ambient Glow & Grid ── */}
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
            <span
              style={{
                fontSize: '0.66rem',
                fontWeight: 800,
                color: '#64748b',
                marginLeft: 6,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
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
            <div
              style={{
                fontSize: '0.66rem',
                fontWeight: 700,
                color: '#64748b',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: 8,
                display: 'flex',
                alignItems: 'center',
                gap: 5,
              }}
            >
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
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = '#fff';
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.12)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = '#94a3b8';
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
              }}
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
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = '#38bdf8';
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.12)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = '#94a3b8';
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
              }}
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
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = '#f97316';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = '#f59e0b';
            }}
          >
            Get in touch <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </div>
  );
};
