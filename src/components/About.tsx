import { useState, useEffect, useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

// ── Count-up ──────────────────────────────────────────────────────────────────
const CountUp = ({ target, suffix = '' }: { target: number; suffix?: string }) => {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let n = 0;
    const inc = target / 60;
    const t = setInterval(() => {
      n += inc;
      if (n >= target) { setVal(target); clearInterval(t); }
      else setVal(Math.floor(n));
    }, 20);
    return () => clearInterval(t);
  }, [inView, target]);

  return <span ref={ref}>{val}{suffix}</span>;
};

// ── 3D Stat Card with wave ripple ─────────────────────────────────────────────
const StatCard = ({ number, suffix, label, delay, color }: { number: number; suffix: string; label: string; delay: number; color: string }) => {
  const { ref, visible } = useScrollReveal(0.2);
  const [hovered, setHovered] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const nextId = useRef(0);

  const onMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setHovered(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setRipples(prev => [
      ...prev,
      { id: nextId.current++, x: e.clientX - rect.left, y: e.clientY - rect.top },
    ]);
  };

  useEffect(() => {
    if (ripples.length > 0) {
      const t = setTimeout(() => setRipples(prev => prev.slice(1)), 600);
      return () => clearTimeout(t);
    }
  }, [ripples]);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`relative overflow-hidden rounded-2xl cursor-default transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{
        transitionDelay: `${delay}ms`,
        border: `1px solid ${hovered ? color + '50' : 'rgba(128,128,128,0.12)'}`,
        background: hovered ? color + '08' : 'rgba(128,128,128,0.03)',
        transform: `${visible ? '' : 'translateY(40px)'} perspective(500px) rotateX(${hovered ? -4 : 0}deg) translateY(${hovered ? -6 : 0}px) scale(${hovered ? 1.04 : 1})`,
        transition: `transform 0.4s cubic-bezier(0.34,1.56,0.64,1), border-color 0.3s, background 0.3s, opacity 0.7s ${delay}ms`,
        boxShadow: hovered ? `0 20px 50px ${color}20, 0 0 0 1px ${color}25` : 'none',
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Ripple on hover enter */}
      {ripples.map(r => (
        <div
          key={r.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: r.x, top: r.y,
            width: 4, height: 4,
            transform: 'translate(-50%,-50%)',
            background: color + '40',
            animation: 'stat-ripple 0.6s ease-out forwards',
          }}
        />
      ))}

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
          transition: 'transform 0.4s',
        }}
      />

      <div className="p-6 relative z-10">
        <div
          className="text-4xl sm:text-5xl font-black mb-1 transition-all duration-300"
          style={{ color: hovered ? color : undefined, textShadow: hovered ? `0 0 30px ${color}60` : 'none' }}
        >
          <CountUp target={number} suffix={suffix} />
        </div>
        <div className="text-neutral-500 text-sm font-medium">{label}</div>
      </div>

      {/* Glow corner */}
      <div
        className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full transition-opacity duration-500"
        style={{ background: `radial-gradient(circle, ${color}30, transparent)`, opacity: hovered ? 1 : 0 }}
      />
      <style>{`@keyframes stat-ripple { to { width: 200px; height: 200px; opacity: 0; } }`}</style>
    </div>
  );
};

// ── Magnetic tech pill ─────────────────────────────────────────────────────────
const TechPill = ({ tech, delay, parentVisible }: { tech: string; delay: number; parentVisible: boolean }) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setOffset({ x: (e.clientX - cx) * 0.3, y: (e.clientY - cy) * 0.3 });
  };

  return (
    <span
      ref={ref}
      className={`px-3 py-1.5 text-xs font-semibold rounded-full cursor-default select-none transition-all duration-700
        ${parentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{
        transitionDelay: `${delay}ms`,
        border: `1px solid ${hovered ? 'rgba(245,158,11,0.5)' : 'rgba(128,128,128,0.2)'}`,
        color: hovered ? '#f59e0b' : undefined,
        background: hovered ? 'rgba(245,158,11,0.08)' : 'transparent',
        transform: `translate(${offset.x}px, ${offset.y}px) ${parentVisible ? '' : 'translateY(24px)'}`,
        boxShadow: hovered ? '0 6px 20px rgba(245,158,11,0.2)' : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setOffset({ x: 0, y: 0 }); }}
      onMouseMove={onMove}
    >
      {tech}
    </span>
  );
};

// ── About Section ─────────────────────────────────────────────────────────────
const About = () => {
  const { ref: headRef, visible: headVisible } = useScrollReveal(0.1);
  const { ref: textRef, visible: textVisible } = useScrollReveal(0.1);

  const stats = [
    { number: 9, suffix: '+', label: 'Projects Built', delay: 100, color: '#f59e0b' },
    { number: 9, suffix: '+', label: 'Certifications', delay: 220, color: '#8b5cf6' },
    { number: 9, suffix: '+', label: 'Courses Taken', delay: 340, color: '#06b6d4' },
  ];

  const techs = ['React', 'TypeScript', 'Tailwind CSS', 'Flutter', 'Node.js', 'Figma', 'Firebase', 'Git'];

  return (
    <section id="about" className="py-24 border-t border-neutral-200 dark:border-neutral-800 relative overflow-hidden">
      {/* Ambient orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 65%)', transform: 'translate(30%, -30%)' }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 65%)', transform: 'translate(-30%, 30%)' }} />

      <div className="max-w-6xl mx-auto px-6">
        {/* Label */}
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className={`flex items-center gap-3 mb-12 transition-all duration-700 ${headVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
        >
          <div
            className="h-px bg-gradient-to-r from-amber-500 to-transparent"
            style={{ width: headVisible ? '48px' : '0px', transition: 'width 0.8s 0.2s ease-out' }}
          />
          <span
            className="text-amber-500 text-sm font-medium tracking-widest uppercase"
            style={{
              opacity: headVisible ? 1 : 0,
              transform: headVisible ? 'none' : 'translateX(-10px)',
              transition: 'all 0.6s 0.3s',
            }}
          >
            About Me
          </span>
        </div>

        <div className="grid lg:grid-cols-[auto_1fr_1fr] gap-12 lg:gap-16 items-start">

          {/* ── Photo Column ── */}
          <div
            className={`transition-all duration-700 ${headVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '80ms' }}
          >
            <div className="relative w-52 mx-auto lg:mx-0">
              {/* Decorative corner accents */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-amber-500 rounded-tl-md" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-amber-500 rounded-br-md" />

              {/* Photo frame */}
              <div className="w-52 h-64 rounded-2xl overflow-hidden border-2 border-dashed border-amber-500/40 bg-neutral-100 dark:bg-neutral-800/60 flex flex-col items-center justify-center gap-3 relative">
                <div className="flex flex-col items-center gap-2 text-center px-4 select-none pointer-events-none">
                  <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                    <svg className="w-7 h-7 text-amber-500/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                    </svg>
                  </div>
                  <p className="text-xs text-neutral-400 dark:text-neutral-500 font-medium leading-snug">
                    Photo coming<br />soon
                  </p>
                </div>

                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-purple-500/5 rounded-2xl pointer-events-none" />
              </div>

              {/* Name tag */}
              <div className="mt-4 text-center">
                <p className="font-bold text-sm text-neutral-800 dark:text-neutral-100">Aaron</p>
                <p className="text-xs text-amber-500 font-medium tracking-wide mt-0.5">IT Student · Dev</p>
              </div>
            </div>
          </div>

          {/* ── Bio Text Column ── */}
          <div
            ref={textRef as React.RefObject<HTMLDivElement>}
            className={`space-y-5 text-neutral-600 dark:text-neutral-400 leading-relaxed transition-all duration-700 ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <h2
              className={`text-3xl sm:text-4xl font-black tracking-tight mb-6 leading-tight text-neutral-900 dark:text-neutral-100 transition-all duration-800 ${headVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '120ms', textShadow: '0 0 50px rgba(245,158,11,0.08)' }}
            >
              I build things<br />for the web<span className="text-amber-500">.</span>
            </h2>

            {[
              "I'm a web development student who loves learning new technologies and building responsive, accessible, and efficient websites and applications. Currently pursuing a Bachelor of Science in Information Technology at Quezon City University.",
              "When I'm not coding or studying, I explore new tech, build side projects, and connect with other students who share the same passion for development. I believe in creating digital experiences that matter.",
              "I'm particularly passionate about front-end development and UI/UX design — always striving to craft web experiences that are not only visually stunning but also fast and accessible.",
            ].map((text, i) => (
              <p
                key={i}
                className={`transition-all duration-700 ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                style={{ transitionDelay: `${300 + i * 130}ms` }}
              >
                {text}
              </p>
            ))}

            {/* Magnetic tech pills */}
            <div
              className={`flex flex-wrap gap-2 pt-3 transition-all duration-500 ${textVisible ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: '700ms' }}
            >
              {techs.map((tech, i) => (
                <TechPill key={tech} tech={tech} delay={720 + i * 50} parentVisible={textVisible} />
              ))}
            </div>
          </div>

          {/* ── Stats Column ── */}
          <div
            className={`grid grid-cols-1 gap-3 transition-all duration-700 ${headVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '300ms' }}
          >
            {stats.map((s, i) => <StatCard key={i} {...s} />)}

            <div
              className="mt-4 h-px rounded-full"
              style={{
                background: 'linear-gradient(90deg, rgba(245,158,11,0.7), rgba(139,92,246,0.3), transparent)',
                opacity: headVisible ? 1 : 0,
                transform: headVisible ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'left',
                transition: 'transform 1.2s 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.5s 0.6s',
              }}
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
