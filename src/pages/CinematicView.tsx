import Navigation from '../components/Navigation';
import Hero from '../components/cinematic/Hero';
import About from '../components/cinematic/About';
import Skills from '../components/cinematic/Skills';
import Experience from '../components/cinematic/Experience';
import Projects from '../components/cinematic/Projects';
import Education from '../components/cinematic/Education';
import Contact from '../components/cinematic/Contact';
import Chatbot from '../components/Chatbot';
import { Cursor, ClickBurst, AmbientParticles } from '../components/Cursor';
import ScrollBackground from '../components/cinematic/ScrollBackground';

const CinematicView = () => (
  <div className="min-h-screen bg-stone-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
    <ScrollBackground />
    <Cursor />
    <ClickBurst />
    <AmbientParticles />
    <Navigation />
    <Hero />
    <About />
    <Education />
    <Skills />
    <Experience />
    <Projects />
    <Contact />
    <Chatbot />
  </div>
);

export default CinematicView;
