import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Mail, Github, Linkedin } from 'lucide-react';

// ── Animated canvas background ────────────────────────────────────────────────
const CinematicCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    let raf: number;
    let w = 0, h = 0;

    // Stars
    type Star = { x: number; y: number; r: number; speed: number; opacity: number; twinkleSpeed: number; twinkleOffset: number };
    let stars: Star[] = [];

    // Particles (floating orbs)
    type Particle = { x: number; y: number; vx: number; vy: number; r: number; hue: number; opacity: number };
    let particles: Particle[] = [];

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      stars = Array.from({ length: 160 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.3,
        speed: Math.random() * 0.12 + 0.02,
        opacity: Math.random() * 0.6 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
      }));
      particles = Array.from({ length: 18 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 120 + 60,
        hue: Math.random() < 0.5 ? 36 : 270, // amber or purple
        opacity: Math.random() * 0.06 + 0.02,
      }));
    };

    let t = 0;
    const draw = () => {
      t += 0.006;
      ctx.clearRect(0, 0, w, h);

      // Dark gradient sky
      const isDark = document.documentElement.classList.contains('dark');
      if (isDark) {
        const grad = ctx.createRadialGradient(w * 0.4, 0, 0, w * 0.5, h * 0.5, Math.max(w, h));
        grad.addColorStop(0, 'rgba(10,0,30,0)');
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      // Floating ambient orbs
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -p.r) p.x = w + p.r;
        if (p.x > w + p.r) p.x = -p.r;
        if (p.y < -p.r) p.y = h + p.r;
        if (p.y > h + p.r) p.y = -p.r;

        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        const alpha = isDark ? p.opacity : p.opacity * 0.4;
        g.addColorStop(0, `hsla(${p.hue},80%,60%,${alpha})`);
        g.addColorStop(1, `hsla(${p.hue},80%,60%,0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      if (!isDark) { raf = requestAnimationFrame(draw); return; }

      // Stars (dark mode only)
      stars.forEach(s => {
        s.y += s.speed;
        if (s.y > h) { s.y = 0; s.x = Math.random() * w; }
        const twinkle = Math.sin(t * 60 * s.twinkleSpeed + s.twinkleOffset) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.opacity * twinkle})`;
        ctx.fill();
      });

      // Shooting star
      if (Math.random() < 0.003) {
        const sx = Math.random() * w * 0.7;
        const sy = Math.random() * h * 0.4;
        const len = Math.random() * 120 + 60;
        const grad = ctx.createLinearGradient(sx, sy, sx + len, sy + len * 0.4);
        grad.addColorStop(0, 'rgba(255,255,255,0)');
        grad.addColorStop(0.5, 'rgba(255,255,255,0.7)');
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx + len, sy + len * 0.4);
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

// ── 3D Tilt card wrapper ───────────────────────────────────────────────────────
const Tilt3D = ({ children, className = '', intensity = 12 }: { children: React.ReactNode; className?: string; intensity?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({});

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle({
      transform: `perspective(800px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) scale(1.02)`,
      transition: 'transform 0.1s ease-out',
    });
  };

  const handleLeave = () => {
    setStyle({ transform: 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)', transition: 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)' });
  };

  return (
    <div ref={ref} className={className} style={style} onMouseMove={handleMove} onMouseLeave={handleLeave}>
      {children}
    </div>
  );
};

// ── Typewriter text ────────────────────────────────────────────────────────────
const TypewriterText = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length - 1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIndex(i => i + 1);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, index, words]);

  return (
    <span className="text-amber-500">
      {displayed}
      <span className="animate-cursor-blink border-r-2 border-amber-500 ml-0.5" />
    </span>
  );
};

// ── Main Hero ─────────────────────────────────────────────────────────────────
const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const parallaxX = (mousePos.x - 0.5) * 20;
  const parallaxY = (mousePos.y - 0.5) * 12;

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
      {/* Canvas */}
      <CinematicCanvas />

      {/* Mouse-tracked gradient orb */}
      <div
        className="absolute w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)',
          left: `${mousePos.x * 100}%`,
          top: `${mousePos.y * 100}%`,
          transform: 'translate(-50%, -50%)',
          transition: 'left 0.8s ease-out, top 0.8s ease-out',
          zIndex: 1,
        }}
      />

      <div className="max-w-6xl mx-auto px-6 py-32 w-full relative" style={{ zIndex: 2 }}>
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">

          {/* Text content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Label */}
            <div
              className={`flex items-center gap-3 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '100ms' }}
            >
              <div className="h-px w-12 bg-amber-500" />
              <span className="text-amber-500 text-sm font-medium tracking-wider uppercase">
                IT Student & Developer
              </span>
            </div>

            {/* Name */}
            <div className="space-y-1">
              <h1
                className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{
                  transitionDelay: '200ms',
                  transform: mounted ? `perspective(1000px) translateX(${parallaxX * 0.3}px) translateY(${parallaxY * 0.3}px)` : undefined,
                  transition: 'transform 0.1s ease-out, opacity 0.7s, translate 0.7s',
                  textShadow: '0 0 60px rgba(245,158,11,0.15)',
                }}
              >
                Aaron M.
              </h1>
              <h1
                className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{
                  transitionDelay: '320ms',
                  transform: mounted ? `perspective(1000px) translateX(${parallaxX * 0.4}px) translateY(${parallaxY * 0.4}px)` : undefined,
                  transition: 'transform 0.12s ease-out, opacity 0.7s, translate 0.7s',
                  textShadow: '0 0 80px rgba(245,158,11,0.2)',
                }}
              >
                Cañada<span className="text-amber-500">.</span>
              </h1>
            </div>

            {/* Typewriter subtitle */}
            <p
              className={`text-xl md:text-2xl font-light transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '440ms' }}
            >
              <TypewriterText words={['Front End Developer', 'UI/UX Designer', 'Web Craftsman', 'Problem Solver']} />
            </p>

            {/* Description */}
            <p
              className={`text-neutral-500 dark:text-neutral-400 text-lg leading-relaxed max-w-lg transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '560ms' }}
            >
              Crafting fast, accessible, and visually compelling web experiences with a passion for clean design and modern technology.
            </p>

            {/* CTAs */}
            <div
              className={`flex flex-wrap gap-3 pt-2 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '680ms' }}
            >
              <a
                href="#contact"
                onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-sm overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}
              >
                <span className="relative z-10 flex items-center gap-2 text-white">
                  <Mail className="w-4 h-4" />
                  Get In Touch
                </span>
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute -inset-1 bg-amber-500/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
              </a>
              <a
                href="#projects"
                onClick={e => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="group inline-flex items-center gap-2 border border-neutral-300 dark:border-neutral-700 px-7 py-3.5 rounded-full font-medium text-sm hover:border-amber-500/60 hover:text-amber-500 transition-all duration-300 backdrop-blur-sm"
              >
                <span className="relative">View Projects</span>
                <span className="text-xs opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300">→</span>
              </a>
            </div>

            {/* Social links */}
            <div
              className={`flex items-center gap-5 pt-2 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '800ms' }}
            >
              {[
                { href: 'https://github.com/EYRON27', Icon: Github, label: 'GitHub' },
                { href: 'https://www.linkedin.com/in/ca%C3%B1ada-aaron-m-352572352/', Icon: Linkedin, label: 'LinkedIn' },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-2.5 rounded-full text-neutral-400 hover:text-amber-500 transition-colors duration-300"
                >
                  <Icon className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 rounded-full bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-0 group-hover:scale-100" />
                </a>
              ))}
            </div>
          </div>

          {/* Photo — 3D card */}
          <div
            className={`lg:col-span-2 flex justify-center lg:justify-end transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            style={{ transitionDelay: '400ms' }}
          >
            <Tilt3D intensity={10} className="relative">
              {/* Outer glow rings */}
              <div className="absolute -inset-6 rounded-3xl opacity-40"
                style={{ background: 'conic-gradient(from 0deg, transparent 0%, rgba(245,158,11,0.3) 30%, transparent 60%, rgba(139,92,246,0.2) 80%, transparent 100%)', animation: 'spin-slow 8s linear infinite' }} />
              <div className="absolute -inset-3 rounded-3xl blur-2xl opacity-30"
                style={{ background: 'radial-gradient(ellipse, rgba(245,158,11,0.5), rgba(139,92,246,0.3), transparent)' }} />

              {/* Card frame */}
              <div className="relative w-64 h-72 sm:w-72 sm:h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden"
                style={{
                  border: '1px solid rgba(245,158,11,0.3)',
                  boxShadow: '0 25px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
                  transform: `translateX(${parallaxX * -0.6}px) translateY(${parallaxY * -0.6}px)`,
                  transition: 'transform 0.15s ease-out',
                }}>
                <img
                  src="/aaron.jpg"
                  alt="Aaron M. Cañada"
                  className="w-full h-full object-cover"
                />
                {/* Overlay shimmer */}
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%, rgba(245,158,11,0.05) 100%)' }} />
                {/* Bottom name badge */}
                <div className="absolute bottom-0 left-0 right-0 p-4"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}>
                  <p className="text-white text-xs font-medium tracking-wider opacity-80">Aaron M. Cañada</p>
                  <p className="text-amber-400 text-[10px] tracking-widest uppercase">Developer · Designer</p>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-3 -right-3 px-3 py-1.5 rounded-full text-xs font-semibold text-white"
                style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', boxShadow: '0 4px 20px rgba(245,158,11,0.4)' }}>
                Available for hire ✦
              </div>
            </Tilt3D>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-400 hover:text-amber-500 transition-all duration-700 group ${mounted ? 'opacity-100' : 'opacity-0'}`}
        style={{ transitionDelay: '1200ms', zIndex: 2 }}
      >
        <span className="text-[10px] tracking-widest uppercase opacity-50 group-hover:opacity-100 transition-opacity">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-current flex items-start justify-center pt-1.5 overflow-hidden">
          <div className="w-1 h-1.5 rounded-full bg-current" style={{ animation: 'scroll-dot 1.6s ease-in-out infinite' }} />
        </div>
        <ArrowDown className="w-4 h-4" style={{ animation: 'bounce-soft 2s ease-in-out infinite' }} />
      </button>

      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes bounce-soft { 0%,100% { transform:translateY(0); } 50% { transform:translateY(4px); } }
        @keyframes scroll-dot { 0% { transform:translateY(-8px); opacity:0; } 50% { opacity:1; } 100% { transform:translateY(8px); opacity:0; } }
        @keyframes cursor-blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
        .animate-cursor-blink { animation: cursor-blink 1s step-end infinite; }
      `}</style>
    </section>
  );
};

export default Hero;
