import { ChevronDown, Mail, Github, Linkedin, Code2 } from 'lucide-react';

const Hero = () => {
  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative">
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
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full"></div>
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden border-4 border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
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
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-cyan-500 dark:text-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors animate-bounce"
      >
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2">Scroll Down</span>
          <ChevronDown className="w-6 h-6" />
        </div>
      </button>
    </section>
  );
};

export default Hero;
