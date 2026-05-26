import { useEffect, useRef, useState } from 'react';

// ─── Mobile Detection Hook ───────────────────────────────────────────────────
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768 || ('ontouchstart' in window));
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
};

// ─── Types ─────────────────────────────────────────────────────────────────────
type Spark = { x:number; y:number; vx:number; vy:number; life:number; maxLife:number; size:number; R:number; G:number; B:number };
type Wave  = { x:number; y:number; r:number; maxR:number; life:number; R:number; G:number; B:number };

// ─── Section Themes ────────────────────────────────────────────────────────────
const THEMES: Record<string, {
  label: string; size: number;
  c0:string; c1:string; c2:string; c3:string;
  t: [number,number,number][];
  gR:number; gG:number; gB:number;
}> = {
  home:      { label:'☄ METEOR',   size:28, c0:'#fff',c1:'#c8e4ff',c2:'#3366ff',c3:'#000d33', t:[[120,180,255],[50,100,255],[20,40,200]],  gR:80, gG:140,gB:255 },
  about:     { label:'🌋 ENTERING', size:30, c0:'#fff',c1:'#fff5cc',c2:'#ff9900',c3:'#331100', t:[[255,230,100],[255,120,20],[200,50,0]],   gR:255,gG:150,gB:30  },
  education: { label:'💫 LEARNING', size:26, c0:'#fff',c1:'#eeffaa',c2:'#77cc00',c3:'#113300', t:[[190,255,80],[110,200,20],[50,150,0]],    gR:110,gG:200,gB:50  },
  skills:    { label:'⚡ CHARGING', size:29, c0:'#fff',c1:'#ccffff',c2:'#00ccff',c3:'#001133', t:[[100,240,255],[0,180,255],[0,80,200]],     gR:0,  gG:200,gB:255 },
  projects:  { label:'💥 IMPACT',   size:32, c0:'#fff',c1:'#ffccaa',c2:'#ff3300',c3:'#220000', t:[[255,170,60],[255,60,0],[180,0,0]],        gR:255,gG:80, gB:0   },
  contact:   { label:'🪐 LANDING',  size:26, c0:'#fff',c1:'#eebbff',c2:'#9933ff',c3:'#110022', t:[[200,120,255],[150,60,255],[80,0,200]],   gR:160,gG:80, gB:255 },
};

// ─── Cursor ────────────────────────────────────────────────────────────────────
export const Cursor = () => {
  const isMobile = useIsMobile();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelRef  = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState('home');
  const activeSectionRef = useRef('home');

  useEffect(() => {
    const canvas = canvasRef.current!;
    const label  = labelRef.current!;
    const ctx    = canvas.getContext('2d')!;

    let W = window.innerWidth, H = window.innerHeight;
    canvas.width = W; canvas.height = H;

    let mx = -300, my = -300;
    let vx = 0, vy = 0;
    let pvx = 0, pvy = 0;
    let visible = false;
    let t = 0;
    let raf: number;

    const sparks: Spark[] = [];
    const waves:  Wave[]  = [];

    // Smooth theme transition
    let curTheme = { ...THEMES.home };
    let targetTheme = { ...THEMES.home };
    let themeBlend = 1;

    // ── Resize ─────────────────────────────────────────────────────────────
    const onResize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    // ── Section Tracker (Instant) ───────────────────────────────────────────
    const sections = Array.from(document.querySelectorAll('section[id]'));
    const checkSection = () => {
      const middle = window.innerHeight * 0.4;
      let newSectionId = activeSectionRef.current;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const rect = sections[i].getBoundingClientRect();
        if (rect.top <= middle) {
          newSectionId = sections[i].id;
          break;
        }
      }
      
      if (window.scrollY < 100 && sections.length > 0) {
        newSectionId = sections[0].id;
      }

      if (newSectionId !== activeSectionRef.current) {
        const id = newSectionId;
        activeSectionRef.current = id;
        setActiveSection(id);
        const newTheme = THEMES[id] ?? THEMES.home;
        targetTheme = newTheme;
        themeBlend = 0;
        
        // Impact wave burst (only if mouse is on screen)
        if (mx > 0) {
          const { gR, gG, gB } = newTheme;
          for (let i = 0; i < 3; i++) {
            waves.push({ x: mx, y: my, r: 5, maxR: 180 + i * 60, life: 55 - i * 10, R: gR, G: gG, B: gB });
          }
          // Spark burst on section change
          for (let i = 0; i < 24; i++) {
            const a = (i / 24) * Math.PI * 2;
            const sp = Math.random() * 6 + 3;
            sparks.push({
              x: mx, y: my,
              vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 2,
              life: 35 + Math.random() * 20, maxLife: 55,
              size: Math.random() * 4 + 1.5,
              R: gR, G: gG, B: gB,
            });
          }
        }
      }
    };

    window.addEventListener('scroll', checkSection, { passive: true });
    checkSection();

    // ── Mouse events ────────────────────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      vx = (e.clientX - mx) * 0.7 + pvx * 0.3;
      vy = (e.clientY - my) * 0.7 + pvy * 0.3;
      pvx = vx; pvy = vy;
      mx = e.clientX; my = e.clientY;
      visible = true;

      // Emit sparks when moving fast
      const speed = Math.sqrt(vx*vx + vy*vy);
      if (speed > 5 && Math.random() < 0.4) {
        const th = targetTheme;
        const [R, G, B] = th.t[0];
        const angle = Math.atan2(vy, vx) + Math.PI + (Math.random() - 0.5) * 1.2;
        sparks.push({
          x: mx, y: my,
          vx: Math.cos(angle) * (Math.random() * 4 + 1),
          vy: Math.sin(angle) * (Math.random() * 4 + 1) - 1,
          life: 18 + Math.random() * 14, maxLife: 32,
          size: Math.random() * 3 + 1,
          R, G, B,
        });
      }

      // Position label
      label.style.transform = `translate(${mx + 26}px, ${my + 16}px)`;
    };

    const onLeave  = () => { visible = false; };
    const onEnter2 = () => { visible = true;  };

    window.addEventListener('mousemove',      onMove,   { passive: true });
    document.addEventListener('mouseleave',   onLeave);
    document.addEventListener('mouseenter',   onEnter2);

    // ── Main draw loop ──────────────────────────────────────────────────────
    const draw = () => {
      t += 0.025;
      ctx.clearRect(0, 0, W, H);

      // Velocity decay
      vx *= 0.78;
      vy *= 0.78;

      // Blend theme
      if (themeBlend < 1) {
        themeBlend = Math.min(1, themeBlend + 0.04);
        const b = themeBlend;
        const ib = 1 - b;
        curTheme = {
          ...targetTheme,
          size: curTheme.size * ib + targetTheme.size * b,
          gR:   curTheme.gR * ib + targetTheme.gR * b,
          gG:   curTheme.gG * ib + targetTheme.gG * b,
          gB:   curTheme.gB * ib + targetTheme.gB * b,
        };
      } else {
        curTheme = { ...targetTheme };
      }

      if (!visible || mx < 0) { raf = requestAnimationFrame(draw); return; }

      const speed = Math.sqrt(vx*vx + vy*vy);
      const angle = Math.atan2(vy, vx);
      const sz    = curTheme.size;
      const { gR, gG, gB } = curTheme;
      const [T0, T1, T2] = curTheme.t;

      // ── 1. Impact shockwaves ───────────────────────────────────────────
      for (let i = waves.length - 1; i >= 0; i--) {
        const w = waves[i];
        const a = (w.life / 60) * 0.7;
        ctx.strokeStyle = `rgba(${w.R},${w.G},${w.B},${a})`;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(w.x, w.y, w.r, 0, Math.PI * 2);
        ctx.stroke();
        w.r += (w.maxR - w.r) * 0.1;
        w.life--;
        if (w.life <= 0) waves.splice(i, 1);
      }

      // ── 2. Atmosphere glow (large aura) ───────────────────────────────
      {
        const ar = sz * 5;
        const ag = ctx.createRadialGradient(mx, my, sz * 0.3, mx, my, ar);
        ag.addColorStop(0,   `rgba(${gR},${gG},${gB},0.38)`);
        ag.addColorStop(0.4, `rgba(${gR},${gG},${gB},0.12)`);
        ag.addColorStop(1,   `rgba(${gR},${gG},${gB},0)`);
        ctx.fillStyle = ag;
        ctx.beginPath();
        ctx.arc(mx, my, ar, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── 3. Fire / plasma trail ────────────────────────────────────────
      const trailLen = speed > 0.8
        ? Math.min(speed * 14 + 80, 260)
        : speed * 30;
      if (trailLen > 8) {
        const SEGS = 32;
        const perpCos = Math.cos(angle + Math.PI * 0.5);
        const perpSin = Math.sin(angle + Math.PI * 0.5);
        for (let i = SEGS; i >= 0; i--) {
          const p  = i / SEGS;
          const tx = mx + Math.cos(angle + Math.PI) * trailLen * p;
          const ty = my + Math.sin(angle + Math.PI) * trailLen * p;
          const wob = Math.sin(p * 6 + t * 5) * sz * 0.38 * p;
          const tsx = tx + perpCos * wob;
          const tsy = ty + perpSin * wob;
          const ts  = (1 - p) * sz * 0.94 + 1.5;
          const ta  = (1 - p) * 0.82;

          const tg = ctx.createRadialGradient(tsx, tsy, 0, tsx, tsy, ts);
          tg.addColorStop(0,   `rgba(${T0[0]},${T0[1]},${T0[2]},${ta})`);
          tg.addColorStop(0.5, `rgba(${T1[0]},${T1[1]},${T1[2]},${ta * 0.55})`);
          tg.addColorStop(1,   `rgba(${T2[0]},${T2[1]},${T2[2]},0)`);
          ctx.fillStyle = tg;
          ctx.beginPath();
          ctx.arc(tsx, tsy, ts, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ── 4. Spark tails ───────────────────────────────────────────────
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        const a = s.life / s.maxLife;
        // Tail line
        ctx.globalAlpha = a * 0.55;
        ctx.strokeStyle = `rgb(${s.R},${s.G},${s.B})`;
        ctx.lineWidth   = s.size * 0.55 * a;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * 4, s.y - s.vy * 4);
        ctx.stroke();
        // Head
        ctx.globalAlpha = a;
        ctx.fillStyle = `rgb(${s.R},${s.G},${s.B})`;
        ctx.shadowColor = `rgba(${s.R},${s.G},${s.B},0.8)`;
        ctx.shadowBlur  = s.size * 2;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * a + 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        // Physics
        s.x  += s.vx; s.y  += s.vy;
        s.vy += 0.2;  s.vx *= 0.97;
        s.life--;
        if (s.life <= 0) sparks.splice(i, 1);
      }
      ctx.globalAlpha = 1;

      // ── 5. Rock body ─────────────────────────────────────────────────
      {
        const hx = mx - sz * 0.3, hy = my - sz * 0.3;
        const bg = ctx.createRadialGradient(hx, hy, sz * 0.06, mx, my, sz);
        bg.addColorStop(0,    curTheme.c0);
        bg.addColorStop(0.18, curTheme.c1);
        bg.addColorStop(0.56, curTheme.c2);
        bg.addColorStop(1,    curTheme.c3);

        ctx.shadowColor = `rgba(${gR},${gG},${gB},0.9)`;
        ctx.shadowBlur  = sz * 1.4;
        ctx.fillStyle = bg;
        ctx.beginPath();
        ctx.arc(mx, my, sz, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // ── 6. Surface cracks (clipped to rock circle) ───────────────────
      ctx.save();
      ctx.beginPath();
      ctx.arc(mx, my, sz, 0, Math.PI * 2);
      ctx.clip();
      ctx.strokeStyle = 'rgba(0,0,0,0.22)';
      ctx.lineWidth   = 1.1;
      const CRACKS = [[0.4,0.84],[1.9,0.7],[3.2,0.78],[4.8,0.65],[5.6,0.72]] as const;
      CRACKS.forEach(([a, reach]) => {
        const ex  = mx + Math.cos(a) * sz * reach;
        const ey  = my + Math.sin(a) * sz * reach;
        const cpx = mx + Math.cos(a + 0.35) * sz * reach * 0.52;
        const cpy = my + Math.sin(a + 0.35) * sz * reach * 0.52;
        ctx.beginPath();
        ctx.moveTo(mx + Math.cos(a) * sz * 0.12, my + Math.sin(a) * sz * 0.12);
        ctx.quadraticCurveTo(cpx, cpy, ex, ey);
        ctx.stroke();
      });
      ctx.restore();

      // ── 7. Specular / glint highlight ────────────────────────────────
      {
        const hx = mx - sz * 0.3, hy = my - sz * 0.3;
        const sg = ctx.createRadialGradient(hx, hy, 0, hx, hy, sz * 0.55);
        sg.addColorStop(0,   'rgba(255,255,255,0.82)');
        sg.addColorStop(0.35,'rgba(255,255,255,0.18)');
        sg.addColorStop(1,   'rgba(255,255,255,0)');
        ctx.fillStyle = sg;
        ctx.beginPath();
        ctx.arc(mx, my, sz, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('scroll',    checkSection);
      window.removeEventListener('resize',    onResize);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter2);
      cancelAnimationFrame(raf);
    };
  }, []);

  const theme = THEMES[activeSection] ?? THEMES.home;

  if (isMobile) return null;

  return (
    <>
      {/* Force hide native cursor */}
      <style>{`*, *::before, *::after { cursor: none !important; }`}</style>

      {/* Canvas — full viewport, draws the meteor */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 9999 }}
      />

      {/* Section label tag */}
      <div
        ref={labelRef}
        className="fixed top-0 left-0 pointer-events-none select-none px-2.5 py-1 rounded-full text-[10px] font-black tracking-widest uppercase whitespace-nowrap"
        style={{
          zIndex: 9999,
          color: `rgb(${theme.gR},${theme.gG},${theme.gB})`,
          background: `rgba(${theme.gR},${theme.gG},${theme.gB},0.12)`,
          border: `1px solid rgba(${theme.gR},${theme.gG},${theme.gB},0.35)`,
          backdropFilter: 'blur(4px)',
          transition: 'color 0.5s, background 0.5s, border-color 0.5s',
          textShadow: `0 0 10px rgba(${theme.gR},${theme.gG},${theme.gB},0.8)`,
        }}
      >
        {theme.label}
      </div>
    </>
  );
};

// ─── Click Particle Burst ──────────────────────────────────────────────────────
type Particle = { id:number; x:number; y:number; vx:number; vy:number; color:string; size:number };

export const ClickBurst = () => {
  const isMobile = useIsMobile();
  const [particles, setParticles] = useState<Particle[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    const COLORS = ['#f59e0b','#fbbf24','#fde68a','#ffffff','#a78bfa','#34d399','#f43f5e','#38bdf8'];
    const onClick = (e: MouseEvent) => {
      const burst: Particle[] = Array.from({ length: 18 }, (_, i) => {
        const angle = (i / 18) * Math.PI * 2 + (Math.random() - 0.5) * 0.6;
        const speed = Math.random() * 7 + 2.5;
        return {
          id: idRef.current++,
          x: e.clientX, y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          size: Math.random() * 7 + 2,
        };
      });
      setParticles(p => [...p, ...burst]);
      setTimeout(() => setParticles(p => p.filter(x => !burst.find(b => b.id === x.id))), 900);
    };
    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, []);

  if (isMobile) return null;

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 9998 }}>
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
            animation: 'click-burst 0.9s cubic-bezier(0,0.9,0.57,1) forwards',
            '--tx': `${p.vx * 16}px`,
            '--ty': `${p.vy * 16}px`,
          } as React.CSSProperties}
        />
      ))}
      <style>{`
        @keyframes click-burst {
          0%   { opacity:1; transform:translate(-50%,-50%) scale(1); }
          100% { opacity:0; transform:translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0.1); }
        }
      `}</style>
    </div>
  );
};

// ─── Ambient Floating Particles ────────────────────────────────────────────────
export const AmbientParticles = () => {
  const dots = Array.from({ length: 22 }, (_, i) => ({
    id:       i,
    x:        Math.random() * 100,
    size:     Math.random() * 3 + 1,
    delay:    Math.random() * 10,
    duration: Math.random() * 14 + 10,
    color:    ['#f59e0b','#8b5cf6','#06b6d4','#f43f5e','#34d399'][i % 5],
    drift:    (Math.random() - 0.5) * 70,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {dots.map(d => (
        <div
          key={d.id}
          className="absolute rounded-full"
          style={{
            left: `${d.x}%`, bottom: '-8px',
            width: d.size, height: d.size,
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
