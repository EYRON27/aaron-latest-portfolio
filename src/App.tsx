import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Chatbot from './components/Chatbot';
import { Cursor, ClickBurst, AmbientParticles } from './components/Cursor';

function App() {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
      {/* Global cinematic overlays */}
      <Cursor />
      <ClickBurst />
      <AmbientParticles />

      <Navigation />
      <Hero />
      <About />
      <Education />
      <Skills />
      <Projects />
      <Contact />
      <Chatbot />
    </div>
  );
}

export default App;
