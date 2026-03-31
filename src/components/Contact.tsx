import { Mail, Github, Linkedin, MapPin, ArrowUpRight } from 'lucide-react';

const Contact = () => {
  const links = [
    { icon: Github, label: 'GitHub', value: '@EYRON27', href: 'https://github.com/EYRON27' },
    { icon: Linkedin, label: 'LinkedIn', value: 'Aaron Cañada', href: 'https://www.linkedin.com/in/ca%C3%B1ada-aaron-m-352572352/' },
  ];

  return (
    <section id="contact" className="py-24 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-12">
          <div className="h-px w-12 bg-amber-500"></div>
          <span className="text-amber-500 text-sm font-medium tracking-wider uppercase">Contact</span>
        </div>

        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Let's work together<span className="text-amber-500">.</span>
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-lg leading-relaxed mb-10">
            I'm currently looking for new opportunities. Whether you have a project, an internship, or just want to connect — my inbox is open.
          </p>

          <a
            href="mailto:canada.aaron.mulat@gmail.com"
            className="inline-flex items-center gap-3 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 px-8 py-4 rounded-full font-medium hover:opacity-80 transition-opacity text-base sm:text-lg mb-12"
          >
            <Mail className="w-5 h-5" />
            canada.aaron.mulat@gmail.com
          </a>

          <div className="flex flex-col sm:flex-row gap-6 mb-8">
            {links.map((link, i) => {
              const Icon = link.icon;
              return (
                <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors group">
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{link.value}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              );
            })}
            <div className="flex items-center gap-3 text-neutral-400">
              <MapPin className="w-5 h-5" />
              <span className="text-sm">Quezon City, Philippines</span>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="mt-16 pt-8 flex items-center gap-3 mb-16">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-neutral-500 text-sm">Currently available for opportunities</span>
        </div>

        {/* Footer */}
        <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-4">
          <p className="text-neutral-400 text-sm">
            &copy; 2025 Aaron M. Cañada
          </p>
          <img src="/aarvievewatermark.png" alt="Aarvieve" className="w-12 opacity-20" />
        </div>
      </div>
    </section>
  );
};

export default Contact;
