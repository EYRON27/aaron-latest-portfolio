import { ArrowDown, Mail, Github, Linkedin } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
      {/* Subtle ambient gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent dark:from-amber-500/8"></div>

      <div className="max-w-6xl mx-auto px-6 py-32 w-full">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Text content */}
          <div className="lg:col-span-3 space-y-8">
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-amber-500"></div>
              <span className="text-amber-500 text-sm font-medium tracking-wider uppercase">IT Student & Developer</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9]">
                Aaron M.
              </h1>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9]">
                Cañada<span className="text-amber-500">.</span>
              </h1>
            </div>

            <p className="text-neutral-500 dark:text-neutral-400 text-lg md:text-xl leading-relaxed max-w-lg">
              Front End Developer & UI/UX Designer crafting fast, accessible, and visually compelling web experiences.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 px-6 py-3 rounded-full font-medium text-sm hover:opacity-80 transition-opacity"
              >
                <Mail className="w-4 h-4" />
                Get In Touch
              </a>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 border border-neutral-300 dark:border-neutral-700 px-6 py-3 rounded-full font-medium text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
              >
                View Projects
              </a>
            </div>

            <div className="flex items-center gap-5 pt-2">
              <a href="https://github.com/EYRON27" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/ca%C3%B1ada-aaron-m-352572352/" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Photo */}
          <div className="lg:col-span-2 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-4 bg-amber-500/20 rounded-3xl blur-2xl"></div>
              <div className="relative w-64 h-72 sm:w-72 sm:h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden border-2 border-neutral-200 dark:border-neutral-800">
                <img
                  src="/aaron.jpg"
                  alt="Aaron M. Cañada"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-neutral-400 hover:text-amber-500 transition-colors"
      >
        <ArrowDown className="w-5 h-5 animate-bounce" />
      </button>
    </section>
  );
};

export default Hero;
