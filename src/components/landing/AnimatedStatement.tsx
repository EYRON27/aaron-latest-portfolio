import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { REPO_STATEMENTS } from '../../data/portfolio';

export const AnimatedStatement = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [displayedFrom, setDisplayedFrom] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const current = REPO_STATEMENTS[activeIdx] || REPO_STATEMENTS[0];

  useEffect(() => {
    if (isPaused) return;
    const target = current.from;
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayedFrom.length < target.length) {
          setDisplayedFrom(target.slice(0, displayedFrom.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 3200);
        }
      } else {
        if (displayedFrom.length > 0) {
          setDisplayedFrom((prev) => prev.slice(0, -1));
        } else {
          setIsDeleting(false);
          setActiveIdx((prev) => (prev + 1) % REPO_STATEMENTS.length);
        }
      }
    }, isDeleting ? 25 : 50);

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
      style={{ marginBottom: 30, maxWidth: 640 }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── Main Dynamic Statement Text ── */}
      <p
        style={{
          fontSize: 'clamp(1.18rem, 2.1vw, 1.4rem)',
          lineHeight: 1.75,
          color: '#334155',
          margin: '0 0 18px',
          fontWeight: 450,
          minHeight: '4.6rem',
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
            background: current.bgLight || 'rgba(245, 158, 11, 0.12)',
            border: `1.5px solid ${current.borderColor || 'rgba(245, 158, 11, 0.35)'}`,
            padding: '3px 12px',
            borderRadius: '8px',
            whiteSpace: 'nowrap',
            verticalAlign: 'middle',
            boxShadow: `0 4px 14px ${current.color}15`,
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

      {/* ── Minimal Project Indicator Bar ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
        {/* Project Tag Pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '6px 14px',
            borderRadius: 8,
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderLeft: `3.5px solid ${current.color}`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          }}
        >
          <span
            style={{
              fontSize: '0.68rem',
              color: '#64748b',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            {current.tag || 'Project'}
          </span>
          <span style={{ width: 1, height: 12, background: '#e2e8f0', display: 'inline-block' }} />
          <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f172a' }}>
            {current.project}
          </span>
        </div>

        {/* Stepper + Arrows Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button
            onClick={handlePrev}
            style={{
              width: 26,
              height: 26,
              borderRadius: '50%',
              border: '1px solid #e2e8f0',
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#64748b',
              padding: 0,
              transition: 'all 0.2s',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            }}
            title="Previous project"
          >
            <ChevronLeft size={13} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {REPO_STATEMENTS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => {
                  setActiveIdx(i);
                  setDisplayedFrom(s.from);
                  setIsDeleting(false);
                }}
                title={s.project}
                style={{
                  width: i === activeIdx ? 22 : 6,
                  height: 6,
                  borderRadius: 99,
                  background: i === activeIdx ? current.color : '#e2e8f0',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            style={{
              width: 26,
              height: 26,
              borderRadius: '50%',
              border: '1px solid #e2e8f0',
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#64748b',
              padding: 0,
              transition: 'all 0.2s',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            }}
            title="Next project"
          >
            <ChevronRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};
