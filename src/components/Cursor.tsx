import { useEffect, useRef, useState } from 'react';

// ─── Section emoji map ─────────────────────────────────────────────────────────
const SECTION_CURSORS: Record<string, { emoji: string; label: string; color: string }> = {
  home:      { emoji: '🚀', label: 'Launch',   color: '#f59e0b' },
  about:     { emoji: '✨', label: 'About',    color: '#a78bfa' },
  education: { emoji: '🎓', label: 'Learn',    color: '#34d399' },
  skills:    { emoji: '⚡', label: 'Power',    color: '#06b6d4' },
  projects:  { emoji: '🔥', label: 'Build',    color: '#f43f5e' },
  contact:   { emoji: '📡', label: 'Connect',  color: '#10b981' },
};

// ─── Cursor ────────────────────────────────────────────────────────────────────
export const Cursor = () => {
  const dotRef    = useRef<HTMLDivElement>(null);
  const orbRef    = useRef<HTMLDivElement>(null);
  const emojiRef  = useRef<HTMLDivElement>(null);
  const labelRef  = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeSection, setActiveSection] = useState('home');
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [visible,  setVisible]  = useState(false);

  useEffect(() => {
    let mX = -200, mY = -200;
    let oX = -200, oY = -200;
    const TRAIL_LEN = 10;
    const trail: { x: number; y: number }[] = Array(TRAIL_LEN).fill({ x: -200, y: -200 });
    let raf: number;
    let isHov = false;

    // ── IntersectionObserver for section ─────────────────────────────────
    const sections = Array.from(document.querySelectorAll('section[id]'));
    const secObs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting && e.intersectionRatio >= 0.25) {
          setActiveSection(e.target.id);
        }
      }),
      { threshold: 0.25 }
    );
    sections.forEach(s => secObs.observe(s));

    // ── Hover detection ────────────────────────────────────────────────
    const attachHover = () => {
      document.querySelectorAll('a, button, [role="button"]').forEach(el => {
        (el as HTMLElement).onmouseenter = () => { isHov = true; setHovering(true);  };
        (el as HTMLElement).onmouseleave = () => { isHov = false; setHovering(false); };
      });
    };
    attachHover();
    const mutObs = new MutationObserver(attachHover);
    mutObs.observe(document.body, { childList: true, subtree: true });

    // ── Mouse events ───────────────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      mX = e.clientX; mY = e.clientY;
      setVisible(true);
    };
    const onDown   = () => setClicking(true);
    const onUp     = () => setClicking(false);
    const onLeave  = () => setVisible(false);
    const onEnter2 = () => setVisible(true);

    window.addEventListener('mousemove',      onMove,   { passive: true });
    window.addEventListener('mousedown',      onDown);
    window.addEventListener('mouseup',        onUp);
    document.addEventListener('mouseleave',   onLeave);
    document.addEventListener('mouseenter',   onEnter2);

    // ── RAF loop ────────────────────────────────────────────────────────
    const animate = () => {
      oX += (mX - oX) * 0.13;
      oY += (mY - oY) * 0.13;

      trail.unshift({ x: mX, y: mY });
      if (trail.length > TRAIL_LEN) trail.pop();

      // Dot (instant)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mX}px,${mY}px) translate(-50%,-50%)`;
      }
      // Orb (lagging)
      if (orbRef.current) {
        const sc = clicking ? 0.6 : isHov ? 2 : 1;
        orbRef.current.style.transform = `translate(${oX}px,${oY}px) translate(-50%,-50%) scale(${sc})`;
      }
      // Emoji + label (instant, offset right)
      if (emojiRef.current) {
        emojiRef.current.style.transform = `translate(${mX + 14}px,${mY - 22}px)`;
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate(${mX + 18}px,${mY + 8}px)`;
      }
      // Trails
      trailRefs.current.forEach((el, i) => {
        if (!el || !trail[i]) return;
        const sz    = Math.max(1, 7 - i * 0.55);
        const alpha = Math.max(0, (1 - i / TRAIL_LEN) * 0.55);
        el.style.transform = `translate(${trail[i].x}px,${trail[i].y}px) translate(-50%,-50%)`;
        el.style.opacity   = String(alpha);
        el.style.width     = `${sz}px`;
        el.style.height    = `${sz}px`;
      });

      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove',    onMove);
      window.removeEventListener('mousedown',    onDown);
      window.removeEventListener('mouseup',      onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter2);
      secObs.disconnect();
      mutObs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [clicking]);

  const c = SECTION_CURSORS[activeSection] ?? SECTION_CURSORS.home;

  return (
    <>
      {/* Force cursor:none on everything */}
      <style>{`*, *::before, *::after { cursor: none !important; }`}</style>

      <div
        className="fixed inset-0 pointer-events-none z-[9999]"
        style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.4s' }}
      >
        {/* ── Sharp dot ── */}
        <div
          ref={dotRef}
          className="fixed"
          style={{
            top: 0, left: 0,
            width: clicking ? 3 : 5,
            height: clicking ? 3 : 5,
            borderRadius: '50%',
            background: 'white',
            mixBlendMode: 'difference',
            willChange: 'transform',
            transition: 'width 0.1s, height 0.1s',
          }}
        />

        {/* ── Lagging orb ── */}
        <div
          ref={orbRef}
          className="fixed"
          style={{
            top: 0, left: 0,
            width: 38, height: 38,
            borderRadius: '50%',
            border: `1.5px solid ${hovering ? c.color : 'rgba(255,255,255,0.45)'}`,
            background: hovering ? c.color + '14' : 'transparent',
            boxShadow: hovering ? `0 0 22px ${c.color}55` : 'none',
            willChange: 'transform',
            transition: 'border-color 0.35s, background 0.35s, box-shadow 0.35s, transform 0.18s ease-out',
          }}
        />

        {/* ── Trail dots ── */}
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            ref={el => { trailRefs.current[i] = el; }}
            className="fixed rounded-full"
            style={{
              top: 0, left: 0,
              background: c.color,
              pointerEvents: 'none',
              willChange: 'transform, opacity',
            }}
          />
        ))}

        {/* ── Section emoji ── */}
        <div
          ref={emojiRef}
          className="fixed select-none leading-none"
          style={{
            top: 0, left: 0,
            fontSize: hovering ? '22px' : '17px',
            willChange: 'transform',
            filter: `drop-shadow(0 2px 8px ${c.color}90)`,
            transition: 'font-size 0.25s cubic-bezier(0.34,1.56,0.64,1)',
            animation: 'emoji-float 2.5s ease-in-out infinite',
          }}
        >
          {c.emoji}
        </div>

        {/* ── Section label ── */}
        <div
          ref={labelRef}
          className="fixed select-none px-2 py-0.5 rounded-full text-[9px] font-bold tracking-widest uppercase whitespace-nowrap"
          style={{
            top: 0, left: 0,
            color: c.color,
            background: c.color + '1a',
            border: `1px solid ${c.color}35`,
            opacity: hovering ? 0 : 0.85,
            backdropFilter: 'blur(4px)',
            transition: 'opacity 0.25s, color 0.4s, background 0.4s',
          }}
        >
          {c.label}
        </div>
      </div>

      <style>{`
        @keyframes emoji-float {
          0%, 100% { transform: translate(14px,-22px) rotate(-6deg) scale(1); }
          30%       { transform: translate(14px,-26px) rotate(4deg)  scale(1.1); }
          70%       { transform: translate(14px,-20px) rotate(-2deg) scale(0.95); }
        }
      `}</style>
    </>
  );
};

// ─── Click Particle Burst ──────────────────────────────────────────────────────
type Particle = { id: number; x: number; y: number; vx: number; vy: number; color: string; size: number };

export const ClickBurst = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    const COLORS = ['#f59e0b', '#fbbf24', '#fde68a', '#ffffff', '#a78bfa', '#34d399', '#f43f5e'];
    const onClick = (e: MouseEvent) => {
      const burst: Particle[] = Array.from({ length: 14 }, (_, i) => {
        const angle = (i / 14) * Math.PI * 2 + (Math.random() - 0.5) * 0.6;
        const speed = Math.random() * 6 + 2;
        return {
          id: idRef.current++,
          x: e.clientX, y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          size: Math.random() * 6 + 2,
        };
      });
      setParticles(p => [...p, ...burst]);
      setTimeout(() => setParticles(p => p.filter(x => !burst.find(b => b.id === x.id))), 800);
    };
    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998]">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.x, top: p.y,
            width: p.size, height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            transform: 'translate(-50%,-50%)',
            animation: 'click-burst 0.8s cubic-bezier(0,0.9,0.57,1) forwards',
            '--tx': `${p.vx * 14}px`,
            '--ty': `${p.vy * 14}px`,
          } as React.CSSProperties}
        />
      ))}
      <style>{`
        @keyframes click-burst {
          0%   { opacity:1; transform:translate(-50%,-50%) scale(1); }
          100% { opacity:0; transform:translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0.15); }
        }
      `}</style>
    </div>
  );
};

// ─── Ambient Floating Particles ────────────────────────────────────────────────
export const AmbientParticles = () => {
  const dots = Array.from({ length: 20 }, (_, i) => ({
    id:       i,
    x:        Math.random() * 100,
    size:     Math.random() * 3 + 1,
    delay:    Math.random() * 10,
    duration: Math.random() * 14 + 10,
    color:    ['#f59e0b', '#8b5cf6', '#06b6d4'][i % 3],
    drift:    (Math.random() - 0.5) * 70,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {dots.map(d => (
        <div
          key={d.id}
          className="absolute rounded-full"
          style={{
            left:     `${d.x}%`,
            bottom:   '-8px',
            width:    d.size,
            height:   d.size,
            background: d.color,
            boxShadow: `0 0 ${d.size * 4}px ${d.color}`,
            animation: `ambient-rise ${d.duration}s ${d.delay}s ease-in-out infinite`,
            '--drift': `${d.drift}px`,
          } as React.CSSProperties}
        />
      ))}
      <style>{`
        @keyframes ambient-rise {
          0%   { opacity:0; transform:translateY(0) translateX(0) scale(0.6); }
          12%  { opacity:0.45; }
          85%  { opacity:0.1; }
          100% { opacity:0; transform:translateY(-100vh) translateX(var(--drift)) scale(1.4); }
        }
      `}</style>
    </div>
  );
};
