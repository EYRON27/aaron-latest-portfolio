import { ChevronDown, Mail, Github, Linkedin, Code2 } from 'lucide-react';

const Hero = () => {
  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-left space-y-6">
            <div className="inline-flex items-center space-x-2 bg-cyan-500/10 px-4 py-2 rounded-full border border-cyan-500/20">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
              <span className="text-cyan-400 text-sm font-medium">IT Student</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold">
              <span className="text-white">Hello, I'm </span>
              <span className="text-cyan-400">John</span>
              <br />
              <span className="text-cyan-400">Anderson</span>
            </h1>

            <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-xl">
              A passionate Computer Science student specializing in full-stack development
              and cloud technologies. I build modern web applications with clean code and
              innovative solutions.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center space-x-2 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50"
              >
                <Mail className="w-5 h-5" />
                <span>Get In Touch</span>
              </a>

              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center space-x-2 bg-transparent hover:bg-slate-800 text-cyan-400 px-6 py-3 rounded-lg font-medium border-2 border-cyan-500/50 hover:border-cyan-500 transition-all duration-200"
              >
                <span>View Projects</span>
              </a>
            </div>

            <div className="flex items-center space-x-4 pt-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full"></div>
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
                <div className="w-full h-full bg-gradient-to-br from-cyan-400/20 to-blue-500/20 flex items-center justify-center">
                  <div className="text-center">
                    <Code2 className="w-32 h-32 text-cyan-400/60 mx-auto mb-4" />
                    <p className="text-gray-500 text-sm">Profile Image</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-cyan-400 hover:text-cyan-300 transition-colors animate-bounce"
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
