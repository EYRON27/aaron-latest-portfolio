import { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ExternalLink, Zap, Terminal } from 'lucide-react';
import { REPO_STATEMENTS } from '../../data/portfolio';
import { useTheme } from '../../context/ThemeContext';

export const AnimatedStatement = () => {
  const { isDark } = useTheme();
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const current = REPO_STATEMENTS[activeIdx] || REPO_STATEMENTS[0];

  // Auto-advance with smooth progress
  useEffect(() => {
    if (isPaused) return;

    const interval = 50;
    const totalDuration = 4800; // 4.8s per slide
    const increment = (interval / totalDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIdx((curr) => (curr + 1) % REPO_STATEMENTS.length);
          return 0;
        }
        return prev + increment;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isPaused, activeIdx]);

  const selectTab = (idx: number) => {
    setActiveIdx(idx);
    setProgress(0);
  };

  return (
    <div
      style={{
        marginBottom: 30,
        maxWidth: 680,
        width: '100%',
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── Classic Architectural Ledger Card ── */}
      <div
        style={{
          background: isDark
            ? 'linear-gradient(135deg, rgba(13, 19, 31, 0.85) 0%, rgba(10, 14, 23, 0.95) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.92) 100%)',
          border: isDark
            ? '1px solid rgba(255, 255, 255, 0.1)'
            : '1px solid rgba(226, 232, 240, 0.95)',
          borderRadius: 16,
          padding: '18px 20px',
          boxShadow: isDark
            ? `0 20px 45px -10px rgba(0, 0, 0, 0.6), 0 0 25px ${current.color}15, inset 0 1px 0 rgba(255,255,255,0.08)`
            : `0 16px 36px -8px rgba(15, 23, 42, 0.07), 0 0 20px ${current.color}10, inset 0 1px 0 rgba(255,255,255,0.9)`,
          backdropFilter: 'blur(20px)',
          position: 'relative',
          overflow: 'hidden',
          transition: 'box-shadow 0.35s ease, border-color 0.35s ease',
        }}
      >
        {/* Top Hairline Indicator */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${current.color}, transparent)`,
            transition: 'background 0.35s ease',
          }}
        />

        {/* ── Numbered Index Tabs Bar ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            overflowX: 'auto',
            paddingBottom: 12,
            marginBottom: 14,
            borderBottom: isDark
              ? '1px solid rgba(255, 255, 255, 0.08)'
              : '1px solid rgba(226, 232, 240, 0.85)',
            scrollbarWidth: 'none',
          }}
        >
          <span
            style={{
              fontSize: '0.64rem',
              fontFamily: "'Fira Code', 'Consolas', monospace",
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: isDark ? '#94a3b8' : '#64748b',
              marginRight: 6,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              flexShrink: 0,
            }}
          >
            <Terminal size={11} style={{ color: current.color }} />
            LOGS //
          </span>

          {REPO_STATEMENTS.map((item, idx) => {
            const isActive = idx === activeIdx;
            const num = String(idx + 1).padStart(2, '0');
            return (
              <button
                key={item.id}
                onClick={() => selectTab(idx)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  padding: '4px 10px',
                  borderRadius: 6,
                  fontSize: '0.72rem',
                  fontWeight: isActive ? 800 : 600,
                  fontFamily: isActive ? "'Fira Code', 'Consolas', monospace" : 'inherit',
                  color: isActive
                    ? '#fff'
                    : isDark
                    ? '#94a3b8'
                    : '#64748b',
                  background: isActive
                    ? current.color
                    : isDark
                    ? 'rgba(255, 255, 255, 0.03)'
                    : '#f1f5f9',
                  border: isActive
                    ? `1px solid ${current.color}`
                    : isDark
                    ? '1px solid rgba(255, 255, 255, 0.06)'
                    : '1px solid #e2e8f0',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
                  boxShadow: isActive ? `0 4px 14px ${current.color}35` : 'none',
                  flexShrink: 0,
                }}
              >
                <span style={{ opacity: 0.8, fontSize: '0.62rem' }}>{num}</span>
                <span>{item.project}</span>
              </button>
            );
          })}
        </div>

        {/* ── Transformation Flow ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* Problem -> Engineered Solution */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              flexWrap: 'wrap',
              fontSize: 'clamp(0.9rem, 1.5vw, 1.02rem)',
              lineHeight: 1.5,
            }}
          >
            <span style={{ color: isDark ? '#94a3b8' : '#64748b', fontWeight: 500 }}>
              Engineered
            </span>

            {/* Problem Before */}
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '3px 10px',
                borderRadius: 6,
                background: isDark ? 'rgba(239, 68, 68, 0.12)' : 'rgba(239, 68, 68, 0.08)',
                border: isDark ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(239, 68, 68, 0.25)',
                color: isDark ? '#fca5a5' : '#b91c1c',
                fontWeight: 650,
                fontSize: '0.84rem',
                textDecoration: 'line-through',
                textDecorationColor: isDark ? 'rgba(252, 165, 165, 0.6)' : 'rgba(185, 28, 28, 0.4)',
              }}
            >
              {current.from}
            </span>

            <ArrowRight size={13} style={{ color: current.color, flexShrink: 0 }} />

            {/* Solution After */}
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                padding: '3px 10px',
                borderRadius: 6,
                background: isDark ? `${current.color}18` : `${current.color}12`,
                border: `1px solid ${current.color}50`,
                color: isDark ? '#f8fafc' : '#0f172a',
                fontWeight: 800,
                fontSize: '0.9rem',
                boxShadow: `0 4px 14px ${current.color}15`,
              }}
            >
              <Zap size={12} style={{ color: current.color }} />
              {current.to}
            </span>
          </div>

          {/* Outcome & Launch Demo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 10,
              flexWrap: 'wrap',
              marginTop: 2,
              paddingTop: 10,
              borderTop: isDark ? '1px dashed rgba(255,255,255,0.07)' : '1px dashed #e2e8f0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span
                style={{
                  fontSize: '0.68rem',
                  fontFamily: "'Fira Code', 'Consolas', monospace",
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: isDark ? '#94a3b8' : '#64748b',
                }}
              >
                OUTCOME:
              </span>
              <span
                style={{
                  fontSize: '0.88rem',
                  fontWeight: 800,
                  color: current.color,
                  letterSpacing: '-0.01em',
                }}
              >
                {current.benefit}
              </span>
            </div>

            {/* Demo Link */}
            {current.demo && (
              <a
                href={current.demo}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: isDark ? '#cbd5e1' : '#475569',
                  textDecoration: 'none',
                  padding: '3px 9px',
                  borderRadius: 6,
                  background: isDark ? 'rgba(255,255,255,0.04)' : '#f1f5f9',
                  border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e2e8f0',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = current.color;
                  el.style.borderColor = current.color;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = isDark ? '#cbd5e1' : '#475569';
                  el.style.borderColor = isDark ? 'rgba(255,255,255,0.08)' : '#e2e8f0';
                }}
              >
                Inspect <ExternalLink size={11} />
              </a>
            )}
          </div>
        </div>

        {/* ── Slide Progress Bar ── */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              background: current.color,
              transition: 'width 0.05s linear',
            }}
          />
        </div>
      </div>
    </div>
  );
};
