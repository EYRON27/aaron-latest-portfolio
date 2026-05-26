import { useEffect, useRef, useState } from 'react';

// ─── Custom Magnetic Cursor with Trailing Orb ──────────────────────────────
const Cursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement[]>([]);
  const [clicked, setClicked] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let orbX = mouseX;
    let orbY = mouseY;
    const trails: { x: number; y: number; life: number }[] = [];
    let raf: number;

    const TRAIL_COUNT = 8;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      trails.unshift({ x: mouseX, y: mouseY, life: 1 });
      if (trails.length > TRAIL_COUNT) trails.pop();

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
      }
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);

    const onEnterLink = () => setHovering(true);
    const onLeaveLink = () => setHovering(false);

    const addLinkListeners = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', onEnterLink);
        el.addEventListener('mouseleave', onLeaveLink);
      });
    };

    addLinkListeners();
    const observer = new MutationObserver(addLinkListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    const animate = () => {
      // Smooth orb follow
      orbX += (mouseX - orbX) * 0.1;
      orbY += (mouseY - orbY) * 0.1;

      if (orbRef.current) {
        const scale = hovering ? 2.5 : clicked ? 0.7 : 1;
        orbRef.current.style.transform = `translate(${orbX - 20}px, ${orbY - 20}px) scale(${scale})`;
      }

      // Update trail divs
      trailsRef.current.forEach((el, i) => {
        if (!el || !trails[i]) return;
        const t = trails[i];
        const size = 6 - i * 0.5;
        const alpha = (1 - i / TRAIL_COUNT) * 0.6;
        el.style.transform = `translate(${t.x - size / 2}px, ${t.y - size / 2}px)`;
        el.style.opacity = String(alpha);
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
      });

      raf = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    animate();

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [hovering, clicked]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]" style={{ mixBlendMode: 'difference' }}>
      {/* Sharp dot */}
      <div
        ref={dotRef}
        className="fixed w-2 h-2 rounded-full bg-white"
        style={{ top: 0, left: 0, willChange: 'transform' }}
      />
      {/* Soft orb */}
      <div
        ref={orbRef}
        className="fixed w-10 h-10 rounded-full border border-white/60"
        style={{
          top: 0,
          left: 0,
          willChange: 'transform',
          transition: 'transform 0.15s ease-out, opacity 0.3s',
          background: hovering ? 'rgba(245,158,11,0.15)' : 'transparent',
          borderColor: hovering ? 'rgba(245,158,11,0.8)' : 'rgba(255,255,255,0.6)',
        }}
      />
      {/* Trails */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          ref={el => { if (el) trailsRef.current[i] = el; }}
          className="fixed rounded-full bg-amber-400"
          style={{ top: 0, left: 0, willChange: 'transform, opacity' }}
        />
      ))}
    </div>
  );
};

// ─── Click Particle Burst ───────────────────────────────────────────────────
type Particle = { id: number; x: number; y: number; vx: number; vy: number; color: string; size: number };

const ClickBurst = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    const colors = ['#f59e0b', '#d97706', '#fbbf24', '#fde68a', '#ffffff', '#a78bfa'];
    const onClick = (e: MouseEvent) => {
      const burst: Particle[] = Array.from({ length: 14 }, (_, i) => {
        const angle = (i / 14) * Math.PI * 2 + Math.random() * 0.4;
        const speed = Math.random() * 5 + 2;
        return {
          id: nextId.current++,
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 5 + 2,
        };
      });
      setParticles(prev => [...prev, ...burst]);
      setTimeout(() => {
        setParticles(prev => prev.filter(p => !burst.find(b => b.id === p.id)));
      }, 700);
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
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 6px ${p.color}`,
            animation: `particle-burst 0.7s cubic-bezier(0,0.9,0.57,1) forwards`,
            '--vx': `${p.vx * 12}px`,
            '--vy': `${p.vy * 12}px`,
          } as React.CSSProperties}
        />
      ))}
      <style>{`
        @keyframes particle-burst {
          0%   { opacity: 1; transform: translate(0,0) scale(1); }
          100% { opacity: 0; transform: translate(var(--vx), var(--vy)) scale(0); }
        }
      `}</style>
    </div>
  );
};

// ─── Floating Ambient Particles (whole page) ─────────────────────────────────
const AmbientParticles = () => {
  type Dot = { id: number; x: number; size: number; delay: number; duration: number; color: string };
  const dots: Dot[] = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 8,
    duration: Math.random() * 12 + 10,
    color: Math.random() > 0.5 ? '#f59e0b' : '#8b5cf6',
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {dots.map(d => (
        <div
          key={d.id}
          className="absolute rounded-full opacity-30 dark:opacity-20"
          style={{
            left: `${d.x}%`,
            bottom: '-10px',
            width: d.size,
            height: d.size,
            background: d.color,
            boxShadow: `0 0 ${d.size * 3}px ${d.color}`,
            animation: `ambient-float ${d.duration}s ${d.delay}s ease-in-out infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes ambient-float {
          0%   { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
          10%  { opacity: 0.4; }
          50%  { transform: translateY(-50vh) translateX(${Math.random() > 0.5 ? 40 : -40}px) scale(1.2); }
          90%  { opacity: 0.2; }
          100% { transform: translateY(-100vh) translateX(0) scale(0.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export { Cursor, ClickBurst, AmbientParticles };
