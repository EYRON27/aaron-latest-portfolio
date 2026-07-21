import { useState, useEffect } from 'react';
import { Mail, Github, Linkedin, MapPin, ArrowUpRight, Send } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { CONTACT, PERSONAL } from '../../data/portfolio';

// ─── Magnetic link card ───────────────────────────────────────────────────────
const SocialCard = ({ icon: Icon, label, value, href, color }: { icon: any; label: string; value: string; href: string; color: string }) => {
  const [hovered, setHovered] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [shine, setShine] = useState({ x: 50, y: 50 });

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setShine({ x: x * 100, y: y * 100 });
    setOffset({ x: (x - 0.5) * 6, y: (y - 0.5) * 6 });
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center gap-4 p-4 rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        border: `1px solid ${hovered ? color + '40' : 'rgba(128,128,128,0.13)'}`,
        background: hovered ? color + '06' : 'transparent',
        transform: `translate(${offset.x}px, ${offset.y}px) ${hovered ? 'scale(1.02)' : 'scale(1)'}`,
        transition: hovered ? 'transform 0.1s, border-color 0.3s, background 0.3s, box-shadow 0.3s' : 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
        boxShadow: hovered ? `0 12px 32px ${color}15` : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setOffset({ x: 0, y: 0 }); }}
      onMouseMove={onMove}
    >
      {/* Shine */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.05), transparent 60%)`,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s',
        }}
      />

      {/* Icon circle */}
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
        style={{
          background: hovered ? color + '18' : 'rgba(128,128,128,0.08)',
          border: `1px solid ${hovered ? color + '40' : 'transparent'}`,
          boxShadow: hovered ? `0 0 16px ${color}30` : 'none',
        }}
      >
        <Icon className="w-4 h-4 transition-all duration-300" style={{ color: hovered ? color : undefined, transform: hovered ? 'scale(1.15)' : 'none' }} />
      </div>

      <div className="flex-1 min-w-0 relative z-10">
        <div className="text-[10px] font-semibold tracking-widest uppercase text-neutral-400 mb-0.5">{label}</div>
        <div className="text-sm font-medium truncate" style={{ color: hovered ? color : undefined, transition: 'color 0.3s' }}>{value}</div>
      </div>

      <ArrowUpRight
        className="w-4 h-4 flex-shrink-0 text-neutral-400 transition-all duration-300"
        style={{
          color: hovered ? color : undefined,
          transform: hovered ? 'translate(2px,-2px) scale(1.1)' : 'none',
        }}
      />
    </a>
  );
};

// ─── Contact ──────────────────────────────────────────────────────────────────
const Contact = () => {
  const { ref: headRef, visible: headVisible } = useScrollReveal(0.1);
  const { ref: contentRef, visible: contentVisible } = useScrollReveal(0.1);
  const [emailHovered, setEmailHovered] = useState(false);
  const [hueShift, setHueShift] = useState(0);

  // Slowly morphing gradient hue on email button
  useEffect(() => {
    const t = setInterval(() => setHueShift(h => (h + 0.5) % 30), 50);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="contact" className="py-24 border-t border-neutral-200 dark:border-neutral-800 relative overflow-hidden">
      {/* Animated background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 70% at 50% 110%, rgba(245,158,11,0.07), transparent)' }}
      />
      {/* Morphing orb */}
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 65%)',
          transform: 'translate(30%, 30%)',
          animation: 'orb-drift 12s ease-in-out infinite',
        }}
      />
      {/* Top shimmer line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.5) 50%, transparent)' }} />

      <div className="max-w-6xl mx-auto px-6">
        {/* Label */}
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className={`flex items-center gap-3 mb-12 transition-all duration-700 ${headVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
        >
          <div className="h-px w-12 bg-amber-500" />
          <span className="text-amber-500 text-sm font-medium tracking-widest uppercase">Contact</span>
        </div>

        <div ref={contentRef as React.RefObject<HTMLDivElement>} className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <h2
              className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-6 transition-all duration-700 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '100ms' }}
            >
              Let's work<br />together<span className="text-amber-500">.</span>
            </h2>

            <p
              className={`text-neutral-500 dark:text-neutral-400 text-lg leading-relaxed mb-10 transition-all duration-700 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '200ms' }}
            >
              I'm currently looking for new opportunities. Whether you have a project, an internship, or just want to connect — my inbox is open.
            </p>

            {/* Email CTA */}
            <div
              className={`mb-8 transition-all duration-700 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '300ms' }}
            >
              <a
                href={`mailto:${CONTACT.email}`}
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold overflow-hidden"
                style={{
                  background: `linear-gradient(${135 + hueShift}deg, hsl(${38 + hueShift}, 90%, 50%), hsl(${28 + hueShift}, 85%, 42%))`,
                  color: 'white',
                  boxShadow: emailHovered
                    ? '0 20px 60px rgba(245,158,11,0.45), 0 0 0 1px rgba(245,158,11,0.3)'
                    : '0 8px 30px rgba(245,158,11,0.25)',
                  transform: emailHovered ? 'translateY(-3px) scale(1.02)' : 'none',
                  transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s',
                }}
                onMouseEnter={() => setEmailHovered(true)}
                onMouseLeave={() => setEmailHovered(false)}
              >
                {/* Shine sweep */}
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)',
                    transform: emailHovered ? 'translateX(200%)' : 'translateX(-200%)',
                    transition: 'transform 0.6s ease',
                  }}
                />
                <Mail className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                <span className="relative z-10 text-sm sm:text-base">{CONTACT.email}</span>
                <Send className="w-4 h-4 relative z-10 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </a>
            </div>

            {/* Status */}
            <div
              className={`flex items-center gap-3 transition-all duration-700 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '450ms' }}
            >
              <div className="relative w-2.5 h-2.5">
                <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-60" />
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
              </div>
              <span className="text-neutral-500 text-sm">Currently available for opportunities</span>
            </div>
          </div>

          {/* Right: social cards */}
          <div
            className={`space-y-3 transition-all duration-700 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '200ms' }}
          >
            {[
              { icon: Github,  label: CONTACT.github.label,   value: CONTACT.github.handle,   href: CONTACT.github.url,   color: '#f59e0b', delay: 250 },
              { icon: Linkedin, label: CONTACT.linkedin.label, value: CONTACT.linkedin.handle, href: CONTACT.linkedin.url, color: '#0ea5e9', delay: 350 },
              { icon: MapPin,  label: 'Location',              value: PERSONAL.location,        href: '#',                  color: '#10b981', delay: 450 },
            ].map((link) => (
              <div
                key={link.label}
                className={`transition-all duration-700 ${contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                style={{ transitionDelay: `${link.delay}ms` }}
              >
                <SocialCard {...link} />
              </div>
            ))}

            {/* Quote card */}
            <div
              className={`relative p-5 rounded-2xl overflow-hidden transition-all duration-700 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{
                transitionDelay: '550ms',
                border: '1px solid rgba(245,158,11,0.2)',
                background: 'rgba(245,158,11,0.03)',
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.5), transparent)' }} />
              <div className="text-3xl text-amber-500/30 font-serif leading-none mb-2">"</div>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed italic">
                Every great product starts with a conversation. Let's start ours.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className={`mt-20 pt-8 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-4 transition-all duration-700 ${contentVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: '700ms' }}
        >
          <p className="text-neutral-400 text-sm">© 2025 Aaron M. Cañada</p>
          <img src="/aarvievewatermark.png" alt="Aarvieve" className="w-12 opacity-20 hover:opacity-50 transition-opacity duration-500 hover:scale-110 transition-transform" />
        </div>
      </div>

      <style>{`
        @keyframes orb-drift {
          0%, 100% { transform: translate(30%, 30%) scale(1); }
          50% { transform: translate(20%, 20%) scale(1.2); }
        }
      `}</style>
    </section>
  );
};

export default Contact;
