import { useEffect, useRef } from 'react';

interface SectionTheme {
  orbs: Array<{ h: number; s: number; l: number }>;
  gridHue: number;
}

const SECTIONS: SectionTheme[] = [
  { orbs: [{ h: 36, s: 90, l: 55 }, { h: 270, s: 70, l: 60 }, { h: 36, s: 80, l: 45 }], gridHue: 36 },
  { orbs: [{ h: 200, s: 80, l: 55 }, { h: 240, s: 70, l: 60 }, { h: 180, s: 60, l: 50 }], gridHue: 200 },
  { orbs: [{ h: 280, s: 75, l: 55 }, { h: 320, s: 65, l: 55 }, { h: 260, s: 70, l: 50 }], gridHue: 280 },
  { orbs: [{ h: 160, s: 75, l: 45 }, { h: 180, s: 70, l: 50 }, { h: 140, s: 65, l: 45 }], gridHue: 160 },
  { orbs: [{ h: 36, s: 90, l: 55 }, { h: 15, s: 80, l: 55 }, { h: 270, s: 70, l: 60 }], gridHue: 36 },
  { orbs: [{ h: 220, s: 80, l: 55 }, { h: 190, s: 75, l: 50 }, { h: 250, s: 70, l: 58 }], gridHue: 220 },
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

const ScrollBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const scrollRef = useRef(0);
  const targetScrollRef = useRef(0);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let W = 0, H = 0;

    type OrbState = {
      x: number; y: number; vx: number; vy: number;
      baseR: number; h: number; s: number; l: number;
      tOff: number; layer: number;
    };
    let orbs: OrbState[] = [];

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      orbs = Array.from({ length: 9 }, (_, i) => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.3,
        baseR: W * (0.18 + Math.random() * 0.22),
        h: 36, s: 80, l: 55,
        tOff: Math.random() * Math.PI * 2,
        layer: i % 3,
      }));
    };

    resize();
    window.addEventListener('resize', resize);

    const onScroll = () => { targetScrollRef.current = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });

    const getSectionProgress = () => {
      const scrollY = scrollRef.current;
      const docH = document.documentElement.scrollHeight;
      const viewH = window.innerHeight;
      const maxScroll = Math.max(docH - viewH, 1);
      const progress = Math.min(scrollY / maxScroll, 1);
      const count = SECTIONS.length;
      const slot = progress * (count - 1);
      const idxA = Math.min(Math.floor(slot), count - 2);
      const idxB = idxA + 1;
      const t = Math.pow(slot - idxA, 0.7);
      return { themeA: SECTIONS[idxA], themeB: SECTIONS[idxB] || SECTIONS[count - 1], t };
    };

    const draw = () => {
      tRef.current += 0.006;
      const t = tRef.current;
      scrollRef.current = lerp(scrollRef.current, targetScrollRef.current, 0.06);
      const scrollY = scrollRef.current;
      const { themeA, themeB, t: sT } = getSectionProgress();
      const isDark = document.documentElement.classList.contains('dark');
      ctx.clearRect(0, 0, W, H);

      const orbColors = themeA.orbs.map((ca, i) => {
        const cb = themeB.orbs[i] || ca;
        return { h: lerp(ca.h, cb.h, sT), s: lerp(ca.s, cb.s, sT), l: lerp(ca.l, cb.l, sT) };
      });
      const gridHue = lerp(themeA.gridHue, themeB.gridHue, sT);

      orbs.forEach((orb, i) => {
        orb.x += orb.vx; orb.y += orb.vy;
        const paralaxRate = orb.layer === 0 ? 0.06 : orb.layer === 1 ? 0.12 : 0.2;
        if (orb.x < -orb.baseR) orb.x = W + orb.baseR;
        if (orb.x > W + orb.baseR) orb.x = -orb.baseR;
        if (orb.y < -orb.baseR) orb.y = H + orb.baseR;
        if (orb.y > H + orb.baseR) orb.y = -orb.baseR;
        const target = orbColors[i % orbColors.length];
        orb.h = lerp(orb.h, target.h, 0.015);
        orb.s = lerp(orb.s, target.s, 0.015);
        orb.l = lerp(orb.l, target.l, 0.015);
        const pulse = Math.sin(t * 0.7 + orb.tOff) * 0.12 + 1;
        const r = orb.baseR * pulse;
        const scrollOffset = scrollY * paralaxRate;
        const drawY = orb.y - (scrollOffset % (H + orb.baseR * 2));
        const alpha = isDark
          ? (orb.layer === 0 ? 0.10 : orb.layer === 1 ? 0.13 : 0.08)
          : (orb.layer === 0 ? 0.05 : orb.layer === 1 ? 0.07 : 0.04);
        const grad = ctx.createRadialGradient(orb.x, drawY, 0, orb.x, drawY, r);
        grad.addColorStop(0, `hsla(${orb.h},${orb.s}%,${orb.l}%,${alpha})`);
        grad.addColorStop(0.5, `hsla(${orb.h},${orb.s}%,${orb.l}%,${alpha * 0.4})`);
        grad.addColorStop(1, `hsla(${orb.h},${orb.s}%,${orb.l}%,0)`);
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(orb.x, drawY, r, 0, Math.PI * 2); ctx.fill();
      });

      if (isDark) {
        const gridAlpha = 0.035 + Math.sin(t * 0.5) * 0.01;
        const gridOffset = (scrollY * 0.3) % 60;
        ctx.strokeStyle = `hsla(${gridHue},75%,55%,${gridAlpha})`;
        ctx.lineWidth = 0.5;
        for (let i = 0; i <= 22; i++) {
          const x = (i / 22) * W;
          const wave = Math.sin(t * 0.4 + i * 0.3) * 3;
          ctx.beginPath(); ctx.moveTo(x + wave, 0); ctx.lineTo(x + wave, H); ctx.stroke();
        }
        for (let j = 0; j <= 17; j++) {
          const y = ((j / 16) * H - gridOffset + H) % H;
          const wave = Math.sin(t * 0.3 + j * 0.4) * 4;
          ctx.beginPath(); ctx.moveTo(0, y + wave); ctx.lineTo(W, y + wave); ctx.stroke();
        }
        for (let b = 0; b < 3; b++) {
          const rHue = gridHue + b * 25;
          const by = H * 0.1 + b * 50 + Math.sin(t + b * 2.1) * 25 - scrollY * 0.04 * (b + 1);
          const ag = ctx.createLinearGradient(0, by - 40, 0, by + 40);
          ag.addColorStop(0, `hsla(${rHue},80%,60%,0)`);
          ag.addColorStop(0.5, `hsla(${rHue},80%,60%,0.045)`);
          ag.addColorStop(1, `hsla(${rHue},80%,60%,0)`);
          ctx.fillStyle = ag; ctx.fillRect(0, by - 40, W, 80);
        }
        if (Math.random() < 0.003) {
          const sx = Math.random() * W * 0.7, sy = Math.random() * H * 0.4;
          const len = Math.random() * 120 + 60;
          const sg = ctx.createLinearGradient(sx, sy, sx + len, sy + len * 0.45);
          sg.addColorStop(0, 'rgba(255,255,255,0)');
          sg.addColorStop(0.5, `hsla(${gridHue},90%,75%,0.9)`);
          sg.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.strokeStyle = sg; ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx + len, sy + len * 0.45); ctx.stroke();
        }
      } else {
        for (let r = 0; r < 4; r++) {
          const phase = (t * 0.3 + r * (Math.PI * 2 / 4) + scrollY * 0.001) % (Math.PI * 2);
          const radius = W * 0.15 + Math.sin(phase) * W * 0.1 + r * W * 0.08;
          const alpha = (0.03 - r * 0.005) * Math.max(0, Math.sin(phase));
          ctx.strokeStyle = `hsla(${gridHue},70%,50%,${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.arc(W / 2, H / 2 - scrollY * 0.1, radius, 0, Math.PI * 2); ctx.stroke();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
      aria-hidden="true"
    />
  );
};

export default ScrollBackground;
