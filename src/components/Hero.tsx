import { useEffect, useRef, useState, useCallback, lazy, Suspense } from 'react';
import { Mail, Github, Linkedin } from 'lucide-react';
const Avatar3DViewer = lazy(() => import('./Avatar3DViewer'));

// ── Detect mobile / low-end device ────────────────────────────────────────────
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(max-width: 768px), (pointer: coarse)').matches;
  });
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px), (pointer: coarse)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isMobile;
}

// ── Canvas: starfield + grid + aurora (desktop only) ──────────────────────────
const CinematicCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let raf: number;
    let w = 0, h = 0, t = 0;

    type Star = { x: number; y: number; r: number; speed: number; opacity: number; tOff: number };
    type Orb = { x: number; y: number; vx: number; vy: number; r: number; hue: number; alpha: number };
    let stars: Star[] = [];
    let orbs: Orb[] = [];

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      stars = Array.from({ length: 180 }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        r: Math.random() * 1.5 + 0.3,
        speed: Math.random() * 0.15 + 0.02,
        opacity: Math.random() * 0.7 + 0.2,
        tOff: Math.random() * Math.PI * 2,
      }));
      orbs = Array.from({ length: 22 }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 140 + 70,
        hue: Math.random() < 0.5 ? 36 : 270,
        alpha: Math.random() * 0.07 + 0.02,
      }));
    };

    const draw = () => {
      t += 0.005;
      ctx.clearRect(0, 0, w, h);
      const isDark = document.documentElement.classList.contains('dark');

      // ── Grid lines (cinematic perspective grid) ──
      if (isDark) {
        const gridAlpha = 0.04 + Math.sin(t * 0.7) * 0.01;
        ctx.strokeStyle = `rgba(245,158,11,${gridAlpha})`;
        ctx.lineWidth = 0.5;
        const cols = 20, rows = 14;
        for (let i = 0; i <= cols; i++) {
          ctx.beginPath();
          ctx.moveTo((i / cols) * w, 0);
          ctx.lineTo((i / cols) * w, h);
          ctx.stroke();
        }
        for (let j = 0; j <= rows; j++) {
          ctx.beginPath();
          ctx.moveTo(0, (j / rows) * h);
          ctx.lineTo(w, (j / rows) * h);
          ctx.stroke();
        }
        // ── Aurora bands ──
        for (let b = 0; b < 3; b++) {
          const by = h * 0.15 + b * 40 + Math.sin(t + b * 1.5) * 20;
          const ag = ctx.createLinearGradient(0, by - 30, 0, by + 30);
          const hue = 200 + b * 40 + Math.sin(t * 0.4) * 30;
          ag.addColorStop(0, `hsla(${hue},80%,60%,0)`);
          ag.addColorStop(0.5, `hsla(${hue},80%,60%,0.04)`);
          ag.addColorStop(1, `hsla(${hue},80%,60%,0)`);
          ctx.fillStyle = ag;
          ctx.fillRect(0, by - 30, w, 60);
        }
      }

      // ── Ambient orbs ──
      orbs.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -p.r) p.x = w + p.r;
        if (p.x > w + p.r) p.x = -p.r;
        if (p.y < -p.r) p.y = h + p.r;
        if (p.y > h + p.r) p.y = -p.r;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        const a = isDark ? p.alpha : p.alpha * 0.35;
        g.addColorStop(0, `hsla(${p.hue},80%,60%,${a})`);
        g.addColorStop(1, `hsla(${p.hue},80%,60%,0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      if (!isDark) { raf = requestAnimationFrame(draw); return; }

      // ── Stars (dark only) ──
      stars.forEach(s => {
        s.y += s.speed;
        if (s.y > h) { s.y = 0; s.x = Math.random() * w; }
        const twinkle = Math.sin(t * 60 * 0.015 + s.tOff) * 0.35 + 0.65;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.opacity * twinkle})`;
        ctx.fill();
      });

      // ── Shooting stars ──
      if (Math.random() < 0.004) {
        const sx = Math.random() * w * 0.6;
        const sy = Math.random() * h * 0.35;
        const len = Math.random() * 140 + 60;
        const g = ctx.createLinearGradient(sx, sy, sx + len, sy + len * 0.5);
        g.addColorStop(0, 'rgba(255,255,255,0)');
        g.addColorStop(0.4, 'rgba(255,255,255,0.8)');
        g.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx + len, sy + len * 0.5);
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} />;
};

// ── Mobile static background (replaces canvas on phones) ──────────────────────
const MobileBackground = () => (
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      background: 'radial-gradient(ellipse 80% 60% at 20% 30%, rgba(245,158,11,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 70%, rgba(139,92,246,0.07) 0%, transparent 60%)',
      zIndex: 0,
    }}
  />
);

// ── Text Scramble / Glitch effect ─────────────────────────────────────────────
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*';
const ScrambleText = ({ text, trigger }: { text: string; trigger: boolean }) => {
  const [displayed, setDisplayed] = useState(text);

  useEffect(() => {
    if (!trigger) return;
    let iter = 0;
    const interval = setInterval(() => {
      setDisplayed(
        text.split('').map((ch, i) => {
          if (ch === ' ') return ' ';
          if (i < iter) return text[i];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join('')
      );
      iter += 0.4;
      if (iter >= text.length) {
        setDisplayed(text);
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [trigger, text]);

  return <>{displayed}</>;
};

// ── Glitch text (random glitch flicker, desktop only) ───────────────────────
const GlitchText = ({ children, disabled = false }: { children: string; disabled?: boolean }) => {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    if (disabled) return;
    const scheduleGlitch = () => {
      const delay = 2000 + Math.random() * 5000;
      return setTimeout(() => {
        setGlitching(true);
        setTimeout(() => {
          setGlitching(false);
          scheduleGlitch();
        }, 200 + Math.random() * 300);
      }, delay);
    };
    const t = scheduleGlitch();
    return () => clearTimeout(t);
  }, [disabled]);

  return (
    <span className="relative inline-block">
      {children}
      {glitching && !disabled && (
        <>
          <span
            className="absolute inset-0 text-amber-400"
            style={{
              clipPath: `inset(${Math.random() * 40}% 0 ${Math.random() * 40}% 0)`,
              transform: `translate(${(Math.random() - 0.5) * 8}px, ${(Math.random() - 0.5) * 4}px)`,
              mixBlendMode: 'screen',
            }}
          >
            {children}
          </span>
          <span
            className="absolute inset-0 text-purple-400"
            style={{
              clipPath: `inset(${Math.random() * 50 + 20}% 0 ${Math.random() * 20}% 0)`,
              transform: `translate(${(Math.random() - 0.5) * -6}px, 0)`,
              mixBlendMode: 'screen',
            }}
          >
            {children}
          </span>
        </>
      )}
    </span>
  );
};

// ── Magnetic Button (desktop) / plain wrapper (mobile) ────────────────────────
const MagneticButton = ({
  children, className, style, onClick, href, disabled = false,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler;
  href?: string;
  disabled?: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    if (disabled) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setOffset({ x: (e.clientX - cx) * 0.35, y: (e.clientY - cy) * 0.35 });
  };

  const onLeave = () => setOffset({ x: 0, y: 0 });

  const Tag = href ? 'a' : 'div';
  const props = href ? { href } : {};

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="inline-block">
      <Tag
        {...props}
        onClick={onClick as any}
        className={className}
        style={{
          ...style,
          transform: disabled ? undefined : `translate(${offset.x}px, ${offset.y}px)`,
          transition: disabled ? undefined : (offset.x === 0 ? 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)' : 'transform 0.1s ease-out'),
          display: 'inline-flex',
        }}
      >
        {children}
      </Tag>
    </div>
  );
};

// ── Typewriter ──────────────────────────────────────────────────────────────
const TypewriterText = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 75);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length - 1)), 40);
    } else {
      setDeleting(false);
      setIndex(i => i + 1);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, index, words]);

  return (
    <span className="text-amber-500 font-light">
      {displayed}
      <span
        className="inline-block w-0.5 h-[1em] bg-amber-500 ml-1 align-middle"
        style={{ animation: 'caret-blink 0.9s step-end infinite' }}
      />
    </span>
  );
};

// ── 3D Tilt Photo Card (disabled on mobile for performance) ───────────────────
const Tilt3D = ({ children, className = '', intensity = 10, disabled = false }: { children: React.ReactNode; className?: string; intensity?: number; disabled?: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [s, setS] = useState({ rx: 0, ry: 0, sx: 50, sy: 50 });
  const [h, setH] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    if (disabled) return;
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    setS({ rx: (y - 0.5) * -intensity, ry: (x - 0.5) * intensity, sx: x * 100, sy: y * 100 });
  };

  const onLeave = () => { setS({ rx: 0, ry: 0, sx: 50, sy: 50 }); setH(false); };

  return (
    <div
      ref={ref}
      className={className}
      style={disabled ? undefined : {
        transform: `perspective(900px) rotateX(${s.rx}deg) rotateY(${s.ry}deg) scale(${h ? 1.03 : 1})`,
        transition: h ? 'transform 0.1s ease-out' : 'transform 0.6s cubic-bezier(0.34,1.56,0.64,1)',
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={onMove}
      onMouseEnter={() => !disabled && setH(true)}
      onMouseLeave={onLeave}
    >
      {children}
      {/* Specular shine */}
      {!disabled && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${s.sx}% ${s.sy}%, rgba(255,255,255,0.12), transparent 65%)`,
            opacity: h ? 1 : 0,
            transition: 'opacity 0.3s',
          }}
        />
      )}
    </div>
  );
};

// ── Count-up stat number ─────────────────────────────────────────────────────
const CountUp = ({ target, suffix = '' }: { target: number; suffix?: string }) => {
  const [val, setVal] = useState(0);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const dur = 1200;
    const step = 16;
    const inc = target / (dur / step);
    const t = setInterval(() => {
      start += inc;
      if (start >= target) { setVal(target); clearInterval(t); }
      else setVal(Math.floor(start));
    }, step);
    return () => clearInterval(t);
  }, [inView, target]);

  return <span ref={ref as any}>{val}{suffix}</span>;
};

// simple inline inView hook
function useInView() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

// ── Particle Canvas (orbiting sparks around avatar) ───────────────────────────
const AvatarParticles = ({ accent = '#f59e0b' }: { accent?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = 420, H = 420;
    canvas.width = W; canvas.height = H;
    let raf: number;
    let t = 0;

    type Particle = { angle: number; speed: number; radius: number; size: number; opacity: number; hue: number; layer: number };
    const particles: Particle[] = Array.from({ length: 55 }, (_, i) => ({
      angle: (i / 55) * Math.PI * 2 + Math.random() * 0.5,
      speed: (Math.random() * 0.004 + 0.002) * (Math.random() < 0.5 ? 1 : -1),
      radius: 130 + Math.random() * 70,
      size: Math.random() * 2.5 + 0.5,
      opacity: Math.random() * 0.7 + 0.2,
      hue: Math.random() < 0.6 ? 36 : 270,
      layer: Math.random(),
    }));

    const draw = () => {
      t += 0.008;
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2, cy = H / 2;

      // Outer glow ring
      const ringGrad = ctx.createRadialGradient(cx, cy, 90, cx, cy, 200);
      ringGrad.addColorStop(0, 'rgba(0,0,0,0)');
      ringGrad.addColorStop(0.7, `hsla(36,95%,55%,0.04)`);
      ringGrad.addColorStop(0.85, `hsla(36,95%,55%,0.10)`);
      ringGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = ringGrad;
      ctx.beginPath(); ctx.arc(cx, cy, 200, 0, Math.PI * 2); ctx.fill();

      // Particles
      particles.forEach(p => {
        p.angle += p.speed;
        const x = cx + Math.cos(p.angle + Math.sin(t * 0.5) * 0.3) * (p.radius + Math.sin(t * 1.2 + p.angle) * 8);
        const y = cy + Math.sin(p.angle + Math.cos(t * 0.4) * 0.3) * (p.radius * 0.55 + Math.cos(t * 0.9 + p.angle) * 6);
        const twinkle = Math.abs(Math.sin(t * 2 + p.angle * 3)) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(x, y, p.size * twinkle, 0, Math.PI * 2);
        const col = p.hue === 36 ? `rgba(245,158,11,${p.opacity * twinkle})` : `rgba(167,139,250,${p.opacity * twinkle * 0.8})`;
        ctx.fillStyle = col;
        ctx.fill();
        // glow halo on bigger particles
        if (p.size > 1.8) {
          const g = ctx.createRadialGradient(x, y, 0, x, y, p.size * 4);
          g.addColorStop(0, p.hue === 36 ? `rgba(245,158,11,0.4)` : `rgba(167,139,250,0.3)`);
          g.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(x, y, p.size * 4, 0, Math.PI * 2); ctx.fill();
        }
      });

      // Shooting sparks (rare)
      if (Math.random() < 0.02) {
        const sa = Math.random() * Math.PI * 2;
        const sr = 130 + Math.random() * 60;
        const sx = cx + Math.cos(sa) * sr;
        const sy = cy + Math.sin(sa) * sr * 0.55;
        const ex = cx + Math.cos(sa + 0.4) * (sr + 40);
        const ey = cy + Math.sin(sa + 0.4) * ((sr + 40) * 0.55);
        const sg = ctx.createLinearGradient(sx, sy, ex, ey);
        sg.addColorStop(0, 'rgba(245,158,11,0)');
        sg.addColorStop(0.5, 'rgba(245,158,11,0.9)');
        sg.addColorStop(1, 'rgba(245,158,11,0)');
        ctx.strokeStyle = sg;
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, [accent]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: '50%', left: '50%',
        width: 420, height: 420,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

// ── Animated 3D Avatar Scene ──────────────────────────────────────────────────
const Avatar3D = ({
  mouse,
  isMobile,
  px,
  py,
}: {
  mouse: { x: number; y: number };
  isMobile: boolean;
  px: number;
  py: number;
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [hovered, setHovered] = useState(false);

  // Mouse-reactive tilt for the whole scene
  const onMove = useCallback((e: React.MouseEvent) => {
    if (isMobile) return;
    const el = wrapRef.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    setTilt({ rx: (y - 0.5) * -18, ry: (x - 0.5) * 22 });
  }, [isMobile]);

  const onLeave = useCallback(() => {
    setTilt({ rx: 0, ry: 0 });
    setHovered(false);
  }, []);

  // Global mouse parallax (gentle, for desktop)
  const gx = isMobile ? 0 : (mouse.x - 0.5) * 14;
  const gy = isMobile ? 0 : (mouse.y - 0.5) * 10;

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'relative',
        width: isMobile ? 280 : 340,
        height: isMobile ? 340 : 420,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
    >
      {/* Particle canvas layer */}
      {!isMobile && <AvatarParticles />}

      {/* 3D scene wrapper — perspective tilt from mouse */}
      <div
        style={{
          position: 'relative',
          transformStyle: 'preserve-3d',
          transform: isMobile
            ? 'none'
            : `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: hovered
            ? 'transform 0.08s ease-out'
            : 'transform 0.7s cubic-bezier(0.34,1.56,0.64,1)',
          zIndex: 1,
        }}
      >
        {/* ── Spinning holographic rings ── */}
        {!isMobile && (
          <>
            {/* Outer ring */}
            <div style={{
              position: 'absolute',
              top: '50%', left: '50%',
              width: 320, height: 320,
              marginTop: -160, marginLeft: -160,
              borderRadius: '50%',
              border: '1px solid transparent',
              backgroundImage: 'conic-gradient(from 0deg, transparent 0%, rgba(245,158,11,0.8) 20%, transparent 40%, rgba(139,92,246,0.6) 60%, transparent 80%, rgba(245,158,11,0.4) 100%)',
              backgroundOrigin: 'border-box',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              animation: 'spin-slow 8s linear infinite',
              opacity: 0.7,
              zIndex: 2,
            }} />
            {/* Inner ring — counter spin */}
            <div style={{
              position: 'absolute',
              top: '50%', left: '50%',
              width: 240, height: 240,
              marginTop: -120, marginLeft: -120,
              borderRadius: '50%',
              border: '1px solid transparent',
              backgroundImage: 'conic-gradient(from 90deg, rgba(139,92,246,0.7) 0%, transparent 30%, rgba(245,158,11,0.5) 60%, transparent 80%)',
              backgroundOrigin: 'border-box',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              animation: 'spin-slow-rev 6s linear infinite',
              opacity: 0.5,
              zIndex: 2,
            }} />
            {/* Innermost ring — glow */}
            <div style={{
              position: 'absolute',
              top: '50%', left: '50%',
              width: 190, height: 190,
              marginTop: -95, marginLeft: -95,
              borderRadius: '50%',
              boxShadow: '0 0 0 1px rgba(245,158,11,0.25), 0 0 20px rgba(245,158,11,0.15)',
              animation: 'ring-pulse 3s ease-in-out infinite',
              zIndex: 2,
            }} />
          </>
        )}

        {/* ── Deep glow behind avatar ── */}
        {!isMobile && (
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            width: 260, height: 260,
            marginTop: -130, marginLeft: -130,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245,158,11,0.22) 0%, rgba(139,92,246,0.14) 50%, transparent 75%)',
            filter: 'blur(24px)',
            animation: 'glow-pulse 4s ease-in-out infinite',
            zIndex: 0,
          }} />
        )}

        {/* ── Avatar image with floating animation ── */}
        <div
          style={{
            position: 'relative',
            width: isMobile ? 240 : 280,
            height: isMobile ? 280 : 320,
            animation: isMobile ? undefined : 'float-avatar 6s ease-in-out infinite',
            zIndex: 3,
            filter: 'drop-shadow(0 30px 50px rgba(0,0,0,0.5)) drop-shadow(0 0 30px rgba(245,158,11,0.2))',
            transform: isMobile ? undefined : `translateX(${gx * -0.3}px) translateY(${gy * -0.3}px)`,
            transition: 'transform 0.15s ease-out',
          }}
        >
          <img
            src="/3d-avatar.png"
            alt="Aaron M. Cañada"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              borderRadius: 20,
            }}
          />

          {/* Holographic overlay on hover */}
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 20,
            background: 'linear-gradient(135deg, rgba(245,158,11,0.08), rgba(139,92,246,0.06), rgba(6,182,212,0.05))',
            backgroundSize: '200% 200%',
            animation: hovered ? 'holo-drift 3s linear infinite' : undefined,
            pointerEvents: 'none',
          }} />

          {/* Bottom name card */}
          <div style={{
            position: 'absolute',
            bottom: 8, left: 8, right: 8,
            background: 'rgba(5,5,15,0.75)',
            backdropFilter: 'blur(12px)',
            borderRadius: 12,
            padding: '8px 12px',
            border: '1px solid rgba(245,158,11,0.2)',
          }}>
            <p style={{ color: '#fff', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em' }}>Aaron M. Cañada</p>
            <p style={{ color: '#f59e0b', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 2 }}>Developer · Designer</p>
          </div>
        </div>

        {/* ── Floating stat badges ── */}
        {isMobile ? (
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 16, position: 'absolute', bottom: -56, left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}>
            <div style={{ background: 'rgba(10,10,20,0.9)', border: '1px solid rgba(245,158,11,0.35)', borderRadius: 12, padding: '8px 14px', backdropFilter: 'blur(12px)' }}>
              <div style={{ color: '#f59e0b', fontWeight: 700, fontSize: '1.1rem', lineHeight: 1 }}><CountUp target={9} suffix="+" /></div>
              <div style={{ color: 'rgba(160,160,180,0.8)', fontSize: '0.65rem', marginTop: 3 }}>Projects</div>
            </div>
            <div style={{ background: 'rgba(10,10,20,0.9)', border: '1px solid rgba(139,92,246,0.35)', borderRadius: 12, padding: '8px 14px', backdropFilter: 'blur(12px)' }}>
              <div style={{ color: '#a78bfa', fontWeight: 700, fontSize: '1.1rem', lineHeight: 1 }}><CountUp target={9} suffix="+" /></div>
              <div style={{ color: 'rgba(160,160,180,0.8)', fontSize: '0.65rem', marginTop: 3 }}>Certs</div>
            </div>
          </div>
        ) : (
          <>
            {/* Left badge */}
            <div style={{
              position: 'absolute',
              left: -36, top: '25%',
              background: 'rgba(8,8,20,0.9)',
              backdropFilter: 'blur(14px)',
              border: '1px solid rgba(245,158,11,0.35)',
              borderRadius: 14,
              padding: '10px 14px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 12px rgba(245,158,11,0.1)',
              animation: 'badge-float-l 4s 0.5s ease-in-out infinite',
              zIndex: 5,
              minWidth: 72,
            }}>
              <div style={{ color: '#f59e0b', fontWeight: 700, fontSize: '1.25rem', lineHeight: 1 }}><CountUp target={9} suffix="+" /></div>
              <div style={{ color: 'rgba(160,160,180,0.75)', fontSize: '0.65rem', marginTop: 4, letterSpacing: '0.05em' }}>Projects</div>
            </div>
            {/* Right badge */}
            <div style={{
              position: 'absolute',
              right: -36, top: '55%',
              background: 'rgba(8,8,20,0.9)',
              backdropFilter: 'blur(14px)',
              border: '1px solid rgba(139,92,246,0.35)',
              borderRadius: 14,
              padding: '10px 14px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 12px rgba(139,92,246,0.1)',
              animation: 'badge-float-r 5s 1.2s ease-in-out infinite',
              zIndex: 5,
              minWidth: 72,
            }}>
              <div style={{ color: '#a78bfa', fontWeight: 700, fontSize: '1.25rem', lineHeight: 1 }}><CountUp target={9} suffix="+" /></div>
              <div style={{ color: 'rgba(160,160,180,0.75)', fontSize: '0.65rem', marginTop: 4, letterSpacing: '0.05em' }}>Certs</div>
            </div>
          </>
        )}
      </div>

      {/* ── "Available for hire" floating badge ── */}
      <div style={{
        position: 'absolute',
        bottom: isMobile ? -10 : 4,
        left: '50%',
        background: 'linear-gradient(135deg, #f59e0b, #d97706)',
        borderRadius: 999,
        padding: '7px 18px',
        fontSize: '0.72rem',
        fontWeight: 700,
        color: '#fff',
        whiteSpace: 'nowrap',
        boxShadow: '0 6px 28px rgba(245,158,11,0.55), 0 2px 0 rgba(255,255,255,0.15) inset',
        animation: isMobile ? undefined : 'bottom-badge 3.5s 0.8s ease-in-out infinite',
        zIndex: 10,
      }}>
        ✦ Available for hire
      </div>
    </div>
  );
};

// ── HERO ─────────────────────────────────────────────────────────────────────
const Hero = () => {
  const isMobile = useIsMobile();
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [mounted, setMounted] = useState(false);
  const [scramble, setScramble] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeout(() => setScramble(true), 600);
    if (isMobile) return; // skip mouse tracking on mobile
    const m = (e: MouseEvent) => setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener('mousemove', m, { passive: true });
    return () => window.removeEventListener('mousemove', m);
  }, [isMobile]);

  // Zero-out parallax on mobile
  const px = isMobile ? 0 : (mouse.x - 0.5) * 22;
  const py = isMobile ? 0 : (mouse.y - 0.5) * 14;

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
      {/* Canvas only on desktop; static gradient on mobile */}
      {isMobile ? <MobileBackground /> : <CinematicCanvas />}

      {/* Mouse orbs — desktop only */}
      {!isMobile && (
        <>
          <div
            className="absolute w-[800px] h-[800px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 65%)',
              left: `${mouse.x * 100}%`, top: `${mouse.y * 100}%`,
              transform: 'translate(-50%,-50%)',
              transition: 'left 1s ease-out, top 1s ease-out',
              zIndex: 1,
            }}
          />
          <div
            className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 65%)',
              left: `${(1 - mouse.x) * 100}%`, top: `${(1 - mouse.y) * 100}%`,
              transform: 'translate(-50%,-50%)',
              transition: 'left 1.4s ease-out, top 1.4s ease-out',
              zIndex: 1,
            }}
          />
        </>
      )}

      <div className="max-w-6xl mx-auto px-6 py-32 w-full relative" style={{ zIndex: 2 }}>
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">

          {/* ── Left: text ── */}
          <div className="lg:col-span-3 space-y-8">

            {/* Eyebrow */}
            <div
              className={`flex items-center gap-3 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '80ms' }}
            >
              <div className="h-px w-12 bg-gradient-to-r from-amber-500 to-amber-300" style={{ animation: 'expand-line 1s 0.3s both' }} />
              <span className="text-amber-500 text-sm font-medium tracking-widest uppercase" style={{ animation: 'fade-in-up 0.6s 0.4s both' }}>
                IT Student &amp; Developer
              </span>
            </div>

            {/* Name — Glitch + Scramble */}
            <div className="space-y-1 relative">
              <h1
                className={`text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[0.88] transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{
                  transitionDelay: '200ms',
                  transform: `perspective(1200px) translateX(${px * 0.25}px) translateY(${py * 0.25}px)`,
                  transition: 'transform 0.08s linear, opacity 0.7s, translate 0.7s',
                  textShadow: '0 0 80px rgba(245,158,11,0.18)',
                }}
              >
                <GlitchText disabled={isMobile}>Aaron M.</GlitchText>
              </h1>
              <h1
                className={`text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[0.88] transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{
                  transitionDelay: '320ms',
                  transform: isMobile ? undefined : `perspective(1200px) translateX(${px * 0.4}px) translateY(${py * 0.4}px)`,
                  transition: isMobile ? 'opacity 0.7s' : 'transform 0.1s linear, opacity 0.7s, translate 0.7s',
                  textShadow: '0 0 100px rgba(245,158,11,0.22)',
                }}
              >
                <ScrambleText text="Cañada" trigger={scramble} />
                <span className="text-amber-500">.</span>
              </h1>

              {/* Decorative underline */}
              <div
                className="h-0.5 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, rgba(245,158,11,0.8), rgba(139,92,246,0.4), transparent)',
                  animation: `expand-line 1.2s 0.8s both`,
                  width: '70%',
                }}
              />
            </div>

            {/* Typewriter */}
            <p
              className={`text-2xl md:text-3xl font-light min-h-[2.5rem] transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '440ms' }}
            >
              <TypewriterText words={['Front End Developer', 'UI/UX Designer', 'Web Craftsman', 'Creative Coder', 'Problem Solver']} />
            </p>

            {/* Description */}
            <p
              className={`text-neutral-500 dark:text-neutral-400 text-lg leading-relaxed max-w-lg transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '560ms' }}
            >
              Crafting fast, accessible, and visually compelling web experiences — where every pixel tells a story.
            </p>

            {/* CTAs — Magnetic */}
            <div
              className={`flex flex-wrap gap-4 pt-2 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '680ms' }}
            >
              <MagneticButton
                href="#contact"
                disabled={isMobile}
                onClick={e => { (e as any).preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="group relative items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm overflow-hidden text-white"
                style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', boxShadow: '0 0 30px rgba(245,158,11,0.3)' }}
              >
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/15 transition-colors duration-300 rounded-full" />
                {!isMobile && <div className="absolute -inset-1 bg-amber-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />}
                <Mail className="w-4 h-4 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                <span className="relative z-10">Get In Touch</span>
              </MagneticButton>

              <MagneticButton
                href="#projects"
                disabled={isMobile}
                onClick={e => { (e as any).preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="group relative items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm overflow-hidden border border-neutral-300 dark:border-neutral-700 hover:border-amber-500/60 transition-all duration-300"
              >
                <span className="group-hover:text-amber-500 transition-colors duration-300">View Projects</span>
                <span className="text-xs opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 group-hover:text-amber-500">→</span>
              </MagneticButton>
            </div>

            {/* Social */}
            <div
              className={`flex items-center gap-4 pt-2 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '800ms' }}
            >
              {[
                { href: 'https://github.com/EYRON27', Icon: Github, label: 'GitHub' },
                { href: 'https://www.linkedin.com/in/ca%C3%B1ada-aaron-m-352572352/', Icon: Linkedin, label: 'LinkedIn' },
              ].map(({ href, Icon, label }) => (
                <MagneticButton key={label} href={href} disabled={isMobile}>
                  <a
                    href={href} target="_blank" rel="noopener noreferrer"
                    className="group relative p-3 rounded-full text-neutral-400 hover:text-amber-500 transition-colors duration-300"
                  >
                    <div className="absolute inset-0 rounded-full bg-amber-500/0 group-hover:bg-amber-500/10 transition-colors duration-300 scale-0 group-hover:scale-100" />
                    <Icon className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                  </a>
                </MagneticButton>
              ))}

              {/* Available badge */}
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/5 ml-2"
                style={{ animation: 'fade-in-scale 0.5s 1.2s both' }}
              >
                <div className="relative w-2 h-2">
                  <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-70" />
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                </div>
                <span className="text-green-500 text-xs font-medium">Open to work</span>
              </div>
            </div>
          </div>

          {/* ── Right: 3D Model Viewer ── */}
          <div
            className={`lg:col-span-2 flex flex-col items-center gap-4 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
            style={{ transitionDelay: '400ms' }}
          >
            <Suspense fallback={
              <div style={{ width: isMobile ? 300 : 420, height: isMobile ? 300 : 420, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(10,10,20,0.5)', borderRadius: 20, border: '1px solid rgba(245,158,11,0.15)' }}>
                <div style={{ color: '#f59e0b', fontSize: '0.7rem', letterSpacing: '0.15em', opacity: 0.6 }}>LOADING 3D MODEL…</div>
              </div>
            }>
              <Avatar3DViewer size={isMobile ? 300 : 420} />
            </Suspense>
            {/* Floating stat badges below the viewer */}
            <div style={{ display: 'flex', gap: 12, alignItems: 'stretch' }}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'rgba(10,10,20,0.9)', border: '1px solid rgba(245,158,11,0.35)', borderRadius: 12, padding: '8px 16px', backdropFilter: 'blur(12px)', textAlign: 'center' }}>
                <div style={{ color: '#f59e0b', fontWeight: 700, fontSize: '1.15rem', lineHeight: 1 }}><CountUp target={9} suffix="+" /></div>
                <div style={{ color: 'rgba(160,160,180,0.75)', fontSize: '0.65rem', marginTop: 4 }}>Projects</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'rgba(10,10,20,0.9)', border: '1px solid rgba(139,92,246,0.35)', borderRadius: 12, padding: '8px 16px', backdropFilter: 'blur(12px)', textAlign: 'center' }}>
                <div style={{ color: '#a78bfa', fontWeight: 700, fontSize: '1.15rem', lineHeight: 1 }}><CountUp target={9} suffix="+" /></div>
                <div style={{ color: 'rgba(160,160,180,0.75)', fontSize: '0.65rem', marginTop: 4 }}>Certs</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'linear-gradient(135deg, #f59e0b, #d97706)', borderRadius: 12, padding: '8px 20px', textAlign: 'center', boxShadow: '0 4px 20px rgba(245,158,11,0.4)' }}>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.05em', whiteSpace: 'nowrap', lineHeight: 1 }}>✦ Available</div>
                <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.65rem', marginTop: 4, whiteSpace: 'nowrap', lineHeight: 1 }}>for hire</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-400 hover:text-amber-500 transition-all duration-300 group ${mounted ? 'opacity-100' : 'opacity-0'}`}
        style={{ transitionDelay: '1400ms', zIndex: 2 }}
      >
        <span className="text-[9px] tracking-widest uppercase opacity-40 group-hover:opacity-100 transition-opacity">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-current flex items-start justify-center pt-1.5 overflow-hidden">
          <div className="w-1 h-2 rounded-full bg-current" style={{ animation: 'scroll-dot 1.5s ease-in-out infinite' }} />
        </div>
      </button>

      <style>{`
        @keyframes expand-line   { from { width: 0; opacity: 0; } to { opacity: 1; } }
        @keyframes fade-in-up    { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
        @keyframes fade-in-scale { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: scale(1); } }
        @keyframes spin-slow     { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin-slow-rev { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes glow-pulse    { 0%,100% { opacity: 0.6; transform: scale(1); } 50% { opacity: 1; transform: scale(1.06); } }
        @keyframes float-avatar  { 0%,100% { transform: translateY(0px) rotateZ(0deg); } 33% { transform: translateY(-14px) rotateZ(0.5deg); } 66% { transform: translateY(-7px) rotateZ(-0.5deg); } }
        @keyframes float-soft    { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-9px); } }
        @keyframes scroll-dot    { 0% { transform: translateY(-8px); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateY(8px); opacity: 0; } }
        @keyframes caret-blink   { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes ring-pulse    { 0%,100% { opacity: 0.5; transform: scale(1); } 50% { opacity: 0.9; transform: scale(1.04); } }
        @keyframes holo-drift    { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes badge-float-l { 0%,100% { transform: translateY(0) translateX(0); } 50% { transform: translateY(-8px) translateX(3px); } }
        @keyframes badge-float-r { 0%,100% { transform: translateY(0) translateX(0); } 50% { transform: translateY(-10px) translateX(-3px); } }
        @keyframes spark-orbit   { from { transform: rotate(0deg) translateX(120px) rotate(0deg); } to { transform: rotate(360deg) translateX(120px) rotate(-360deg); } }
        @keyframes spark-orbit2  { from { transform: rotate(180deg) translateX(140px) rotate(-180deg); } to { transform: rotate(540deg) translateX(140px) rotate(-540deg); } }
        @keyframes bottom-badge  { 0%,100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(-6px); } }
      `}</style>
    </section>
  );
};

export default Hero;
