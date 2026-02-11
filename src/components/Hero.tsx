import { ChevronDown, Mail, Github, Linkedin, Code2 } from 'lucide-react';

const Hero = () => {
  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative pb-16 sm:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="text-center md:text-left space-y-4 sm:space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center space-x-2 bg-cyan-500/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-cyan-500/20">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
              <span className="text-cyan-400 text-xs sm:text-sm font-medium">IT Student</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              <span className="text-gray-900 dark:text-white">Hello, I'm </span>
              <span className="text-cyan-500 dark:text-cyan-400">Aaron M.</span>
              <br />
              <span className="text-cyan-500 dark:text-cyan-400">Cañada</span>
            </h1>

            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg md:text-xl leading-relaxed max-w-xl mx-auto md:mx-0">
              Front End Developer & UI/UX Designer. I craft fast, accessible, and visually stunning 
              web experiences through modern front-end development.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center md:justify-start">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center space-x-2 bg-cyan-500 hover:bg-cyan-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium transition-all duration-200 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 text-sm sm:text-base"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Get In Touch</span>
              </a>

              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center space-x-2 bg-transparent hover:bg-slate-800 text-cyan-400 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium border-2 border-cyan-500/50 hover:border-cyan-500 transition-all duration-200 text-sm sm:text-base"
              >
                <span>View Projects</span>
              </a>
            </div>

            <div className="flex items-center justify-center md:justify-start space-x-4 pt-2 sm:pt-4">
              <a href="https://github.com/EYRON27" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/ca%C3%B1ada-aaron-m-352572352/" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div className="flex justify-center animate-fade-in-up animation-delay-200 mt-8 md:mt-0">
            <div className="relative" style={{ perspective: '1000px' }}>
              {/* Ambient glow */}
              <div className="absolute inset-[-30%] bg-cyan-500/15 blur-[80px] rounded-full animate-pulse-slow"></div>

              {/* Outer orbital ring */}
              <div className="absolute inset-[-18%] rounded-full border border-cyan-500/20 animate-spin-slow"></div>
              <div className="absolute inset-[-18%] rounded-full">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/60 animate-spin-slow"></div>
              </div>

              {/* Middle orbital ring */}
              <div className="absolute inset-[-10%] rounded-full border border-cyan-400/15 animate-spin-reverse"></div>
              <div className="absolute inset-[-10%] rounded-full animate-spin-reverse">
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/60"></div>
              </div>

              {/* 3D floating container */}
              <div className="relative animate-float-3d" style={{ transformStyle: 'preserve-3d' }}>
                {/* Reflection/shadow underneath */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[70%] h-6 bg-cyan-500/20 blur-xl rounded-full"></div>

                {/* Outer glow ring */}
                <div className="absolute inset-[-4px] rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-cyan-400 p-[2px] shadow-[0_0_40px_rgba(6,182,212,0.3)]">
                  <div className="w-full h-full rounded-full bg-slate-900"></div>
                </div>

                {/* Inner glow ring */}
                <div className="absolute inset-[2px] rounded-full bg-gradient-to-tr from-cyan-500/50 via-transparent to-blue-500/50 p-[2px]">
                  <div className="w-full h-full rounded-full bg-slate-900"></div>
                </div>

                {/* Main image */}
                <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden border-2 border-cyan-400/40 shadow-[0_0_60px_rgba(6,182,212,0.25),inset_0_0_30px_rgba(6,182,212,0.1)]" style={{ transform: 'translateZ(40px)' }}>
                  <img 
                    src="/aaron.jpg" 
                    alt="Aaron M. Cañada" 
                    className="w-full h-full object-cover"
                  />
                  {/* Cinematic light overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-blue-500/5 pointer-events-none"></div>
                  <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-slate-900/20 pointer-events-none"></div>
                </div>

                {/* Top-left light accent */}
                <div className="absolute top-[10%] left-[5%] w-8 h-8 bg-cyan-400/20 blur-lg rounded-full"></div>
              </div>

              {/* Decorative dots */}
              <div className="absolute -right-4 top-1/4 w-2 h-2 bg-cyan-400/60 rounded-full animate-pulse"></div>
              <div className="absolute -left-6 bottom-1/3 w-1.5 h-1.5 bg-blue-400/50 rounded-full animate-pulse animation-delay-400"></div>
              <div className="absolute right-1/4 -bottom-6 w-1 h-1 bg-cyan-300/40 rounded-full animate-pulse animation-delay-200"></div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToAbout}
        className="absolute bottom-6 sm:bottom-8 left-0 right-0 mx-auto w-fit text-cyan-500 dark:text-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors animate-bounce"
      >
        <div className="flex flex-col items-center">
          <span className="text-xs sm:text-sm mb-1 sm:mb-2">Scroll Down</span>
          <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
      </button>
    </section>
  );
};

export default Hero;
