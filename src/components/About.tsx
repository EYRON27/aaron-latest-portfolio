import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const StatCard = ({ number, label, delay }: { number: string; label: string; delay: number }) => {
  const { ref, visible } = useScrollReveal(0.2);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`relative group cursor-default transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Glow bg */}
      <div
        className="absolute -inset-3 rounded-2xl transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle, rgba(245,158,11,0.15), transparent)',
          opacity: hovered ? 1 : 0,
        }}
      />
      <div
        className="relative p-6 rounded-2xl border transition-all duration-500"
        style={{
          borderColor: hovered ? 'rgba(245,158,11,0.4)' : 'rgba(128,128,128,0.15)',
          background: hovered ? 'rgba(245,158,11,0.05)' : 'transparent',
          transform: hovered ? 'translateY(-4px) scale(1.03)' : 'translateY(0) scale(1)',
          boxShadow: hovered ? '0 20px 40px rgba(245,158,11,0.12)' : 'none',
        }}
      >
        <div
          className="text-4xl sm:text-5xl font-bold mb-1 transition-all duration-300"
          style={{ color: hovered ? '#f59e0b' : undefined }}
        >
          {number}
        </div>
        <div className="text-neutral-500 text-sm font-medium">{label}</div>
        <div
          className="absolute bottom-0 left-4 right-4 h-px rounded-full transition-all duration-500"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.6), transparent)', transform: hovered ? 'scaleX(1)' : 'scaleX(0)' }}
        />
      </div>
    </div>
  );
};

const About = () => {
  const { ref: headRef, visible: headVisible } = useScrollReveal(0.1);
  const { ref: textRef, visible: textVisible } = useScrollReveal(0.1);

  const stats = [
    { number: '9+', label: 'Projects Built', delay: 100 },
    { number: '11+', label: 'Certifications', delay: 220 },
    { number: '9+', label: 'Courses Taken', delay: 340 },
  ];

  return (
    <section id="about" className="py-24 border-t border-neutral-200 dark:border-neutral-800 relative overflow-hidden">
      {/* Ambient blob */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />

      <div className="max-w-6xl mx-auto px-6">
        {/* Label */}
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className={`flex items-center gap-3 mb-12 transition-all duration-700 ${headVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}
        >
          <div className="h-px w-12 bg-amber-500" />
          <span className="text-amber-500 text-sm font-medium tracking-wider uppercase">About Me</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: headline + stats */}
          <div>
            <h2
              className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-10 leading-tight transition-all duration-800 ${headVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '100ms', textShadow: '0 0 40px rgba(245,158,11,0.1)' }}
            >
              I build things<br />for the web<span className="text-amber-500">.</span>
            </h2>

            <div className="grid grid-cols-3 gap-4">
              {stats.map((s, i) => <StatCard key={i} {...s} />)}
            </div>

            {/* Decorative horizontal rule with glow */}
            <div
              className={`mt-10 h-px w-full transition-all duration-1000 ${headVisible ? 'opacity-100' : 'opacity-0'}`}
              style={{
                transitionDelay: '600ms',
                background: 'linear-gradient(90deg, rgba(245,158,11,0.6), rgba(245,158,11,0.1), transparent)',
              }}
            />
          </div>

          {/* Right: text */}
          <div
            ref={textRef as React.RefObject<HTMLDivElement>}
            className={`space-y-5 text-neutral-600 dark:text-neutral-400 leading-relaxed transition-all duration-700 ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '200ms' }}
          >
            {[
              "I'm a web development student who loves learning new technologies and building responsive, accessible, and efficient websites and applications. Currently pursuing a Bachelor of Science in Information Technology at Quezon City University.",
              "When I'm not coding or studying, I like exploring new tech, building side projects, and connecting with other students who share the same passion for development. I believe in creating digital experiences that matter — balancing functionality with aesthetics.",
              "I'm particularly passionate about front-end development and UI/UX design, always striving to create web experiences that are not only visually stunning but also fast and accessible to everyone.",
            ].map((text, i) => (
              <p
                key={i}
                className={`transition-all duration-700 ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: `${300 + i * 120}ms` }}
              >
                {text}
              </p>
            ))}

            {/* Tech stack pills */}
            <div
              className={`flex flex-wrap gap-2 pt-2 transition-all duration-700 ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: '700ms' }}
            >
              {['React', 'TypeScript', 'Tailwind CSS', 'Flutter', 'Node.js', 'Figma'].map(tech => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-medium rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:border-amber-500/60 hover:text-amber-500 transition-all duration-300 cursor-default hover:scale-105"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
