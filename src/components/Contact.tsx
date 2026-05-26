import { useState } from 'react';
import { Mail, Github, Linkedin, MapPin, ArrowUpRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Contact = () => {
  const { ref: headRef, visible: headVisible } = useScrollReveal(0.1);
  const { ref: contentRef, visible: contentVisible } = useScrollReveal(0.1);
  const [emailHovered, setEmailHovered] = useState(false);

  const links = [
    { icon: Github, label: 'GitHub', value: '@EYRON27', href: 'https://github.com/EYRON27' },
    { icon: Linkedin, label: 'LinkedIn', value: 'Aaron Cañada', href: 'https://www.linkedin.com/in/ca%C3%B1ada-aaron-m-352572352/' },
  ];

  return (
    <section id="contact" className="py-24 border-t border-neutral-200 dark:border-neutral-800 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 100%, rgba(245,158,11,0.06) 0%, transparent 100%)' }}
      />
      {/* Top shimmer line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(245,158,11,0.4) 50%, transparent 100%)' }} />

      <div className="max-w-6xl mx-auto px-6">
        {/* Label */}
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className={`flex items-center gap-3 mb-12 transition-all duration-700 ${headVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}
        >
          <div className="h-px w-12 bg-amber-500" />
          <span className="text-amber-500 text-sm font-medium tracking-wider uppercase">Contact</span>
        </div>

        <div
          ref={contentRef as React.RefObject<HTMLDivElement>}
          className="max-w-2xl"
        >
          {/* Headline */}
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 transition-all duration-700 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '100ms' }}
          >
            Let's work together<span className="text-amber-500">.</span>
          </h2>

          <p
            className={`text-neutral-500 dark:text-neutral-400 text-lg leading-relaxed mb-10 transition-all duration-700 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '200ms' }}
          >
            I'm currently looking for new opportunities. Whether you have a project, an internship, or just want to connect — my inbox is open.
          </p>

          {/* Email CTA */}
          <div
            className={`mb-12 transition-all duration-700 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '300ms' }}
          >
            <a
              href="mailto:canada.aaron.mulat@gmail.com"
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium text-base sm:text-lg overflow-hidden"
              style={{
                background: emailHovered
                  ? 'linear-gradient(135deg, #d97706, #b45309)'
                  : 'linear-gradient(135deg, #f59e0b, #d97706)',
                color: 'white',
                boxShadow: emailHovered ? '0 20px 60px rgba(245,158,11,0.4), 0 0 0 1px rgba(245,158,11,0.3)' : '0 8px 30px rgba(245,158,11,0.2)',
                transform: emailHovered ? 'translateY(-2px) scale(1.02)' : 'none',
                transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
              }}
              onMouseEnter={() => setEmailHovered(true)}
              onMouseLeave={() => setEmailHovered(false)}
            >
              {/* Shine sweep */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)',
                  transform: emailHovered ? 'translateX(100%)' : 'translateX(-100%)',
                  transition: 'transform 0.5s ease',
                }}
              />
              <Mail className="w-5 h-5 relative z-10" />
              <span className="relative z-10">canada.aaron.mulat@gmail.com</span>
            </a>
          </div>

          {/* Social links */}
          <div
            className={`flex flex-col sm:flex-row gap-6 mb-12 transition-all duration-700 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '400ms' }}
          >
            {links.map((link, i) => {
              const Icon = link.icon;
              return (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-all duration-300"
                >
                  <div className="w-9 h-9 rounded-full border border-neutral-200 dark:border-neutral-700 flex items-center justify-center group-hover:border-amber-500/50 group-hover:bg-amber-500/5 transition-all duration-300">
                    <Icon className="w-4 h-4 group-hover:text-amber-500 transition-colors duration-300" />
                  </div>
                  <span className="text-sm font-medium">{link.value}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </a>
              );
            })}

            <div className="flex items-center gap-3 text-neutral-400">
              <div className="w-9 h-9 rounded-full border border-neutral-200 dark:border-neutral-700 flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="text-sm">Quezon City, Philippines</span>
            </div>
          </div>

          {/* Status badge */}
          <div
            className={`flex items-center gap-3 transition-all duration-700 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '500ms' }}
          >
            <div className="relative">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
              <div className="absolute inset-0 w-2.5 h-2.5 bg-green-500 rounded-full animate-ping opacity-60" />
            </div>
            <span className="text-neutral-500 text-sm">Currently available for opportunities</span>
          </div>
        </div>

        {/* Footer */}
        <div
          className={`mt-20 pt-8 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-4 transition-all duration-700 ${contentVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: '700ms' }}
        >
          <p className="text-neutral-400 text-sm">
            © 2025 Aaron M. Cañada
          </p>
          <img src="/aarvievewatermark.png" alt="Aarvieve" className="w-12 opacity-20 hover:opacity-40 transition-opacity duration-300" />
        </div>
      </div>
    </section>
  );
};

export default Contact;
