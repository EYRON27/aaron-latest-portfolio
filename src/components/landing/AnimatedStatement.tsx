import { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ExternalLink, ChevronRight, Zap } from 'lucide-react';
import { REPO_STATEMENTS } from '../../data/portfolio';
import { useTheme } from '../../context/ThemeContext';

export const AnimatedStatement = () => {
  const { isDark } = useTheme();
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const current = REPO_STATEMENTS[activeIdx] || REPO_STATEMENTS[0];

  // Auto-advance timer with smooth progress bar
  useEffect(() => {
    if (isPaused) return;

    const interval = 50; // update progress every 50ms
    const totalDuration = 4500; // 4.5 seconds per slide
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
        marginBottom: 32,
        maxWidth: 680,
        width: '100%',
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── Outer Glass Showcase Card ── */}
      <div
        style={{
          background: isDark
            ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.75) 0%, rgba(13, 19, 31, 0.85) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%)',
          border: isDark
            ? '1px solid rgba(255, 255, 255, 0.1)'
            : '1px solid rgba(226, 232, 240, 0.9)',
          borderRadius: 20,
          padding: '20px 22px',
          boxShadow: isDark
            ? `0 20px 45px -10px rgba(0, 0, 0, 0.5), 0 0 25px ${current.color}18, inset 0 1px 0 rgba(255,255,255,0.08)`
            : `0 16px 36px -8px rgba(15, 23, 42, 0.08), 0 0 20px ${current.color}12, inset 0 1px 0 rgba(255,255,255,0.9)`,
          backdropFilter: 'blur(20px)',
          position: 'relative',
          overflow: 'hidden',
          transition: 'box-shadow 0.4s ease, border-color 0.4s ease',
        }}
      >
        {/* Top Active Ambient Glow Line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${current.color}, transparent)`,
            transition: 'background 0.4s ease',
          }}
        />

        {/* ── Interactive Project Tabs Bar ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            overflowX: 'auto',
            paddingBottom: 14,
            marginBottom: 16,
            borderBottom: isDark
              ? '1px solid rgba(255, 255, 255, 0.07)'
              : '1px solid rgba(226, 232, 240, 0.8)',
            scrollbarWidth: 'none',
          }}
        >
          <span
            style={{
              fontSize: '0.66rem',
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
            <Sparkles size={11} style={{ color: current.color }} />
            Impact
          </span>

          {REPO_STATEMENTS.map((item, idx) => {
            const isActive = idx === activeIdx;
            return (
              <button
                key={item.id}
                onClick={() => selectTab(idx)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '5px 12px',
                  borderRadius: 99,
                  fontSize: '0.74rem',
                  fontWeight: isActive ? 800 : 600,
                  color: isActive
                    ? '#fff'
                    : isDark
                    ? '#94a3b8'
                    : '#475569',
                  background: isActive
                    ? current.color
                    : isDark
                    ? 'rgba(255, 255, 255, 0.04)'
                    : 'rgba(241, 245, 249, 0.8)',
                  border: isActive
                    ? `1px solid ${current.color}`
                    : isDark
                    ? '1px solid rgba(255, 255, 255, 0.06)'
                    : '1px solid #e2e8f0',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
                  boxShadow: isActive ? `0 4px 14px ${current.color}40` : 'none',
                  flexShrink: 0,
                }}
              >
                <span>{item.project}</span>
                {isActive && (
                  <span
                    style={{
                      fontSize: '0.62rem',
                      background: 'rgba(0,0,0,0.2)',
                      padding: '1px 6px',
                      borderRadius: 99,
                      fontWeight: 700,
                    }}
                  >
                    {item.tag}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ── Transformation Flow Block ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Top: Before -> After Transformation Pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              flexWrap: 'wrap',
              fontSize: 'clamp(0.92rem, 1.6vw, 1.05rem)',
              lineHeight: 1.5,
            }}
          >
            <span
              style={{
                color: isDark ? '#94a3b8' : '#64748b',
                fontWeight: 500,
              }}
            >
              Turning
            </span>

            {/* Before (Problem) */}
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '4px 12px',
                borderRadius: 8,
                background: isDark ? 'rgba(239, 68, 68, 0.12)' : 'rgba(239, 68, 68, 0.08)',
                border: isDark ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(239, 68, 68, 0.25)',
                color: isDark ? '#fca5a5' : '#b91c1c',
                fontWeight: 650,
                fontSize: '0.86rem',
                textDecoration: 'line-through',
                textDecorationColor: isDark ? 'rgba(252, 165, 165, 0.6)' : 'rgba(185, 28, 28, 0.4)',
              }}
            >
              {current.from}
            </span>

            <ArrowRight size={14} style={{ color: current.color, flexShrink: 0 }} />

            {/* After (Solution) */}
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '4px 12px',
                borderRadius: 8,
                background: isDark ? `${current.color}20` : `${current.color}14`,
                border: `1px solid ${current.color}50`,
                color: isDark ? '#f8fafc' : '#0f172a',
                fontWeight: 800,
                fontSize: '0.92rem',
                boxShadow: `0 4px 16px ${current.color}18`,
              }}
            >
              <Zap size={13} style={{ color: current.color }} />
              {current.to}
            </span>
          </div>

          {/* Bottom: Result / Value Delivered */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              flexWrap: 'wrap',
              marginTop: 4,
              paddingTop: 12,
              borderTop: isDark ? '1px dashed rgba(255,255,255,0.07)' : '1px dashed #e2e8f0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: isDark ? '#94a3b8' : '#64748b',
                }}
              >
                Delivering:
              </span>
              <span
                style={{
                  fontSize: '0.92rem',
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
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  color: isDark ? '#cbd5e1' : '#475569',
                  textDecoration: 'none',
                  padding: '3px 10px',
                  borderRadius: 6,
                  background: isDark ? 'rgba(255,255,255,0.05)' : '#f1f5f9',
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
                View Project <ExternalLink size={11} />
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
            height: 2.5,
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
