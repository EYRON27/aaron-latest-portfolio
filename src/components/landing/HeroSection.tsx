import { HeroLeftPanel } from './HeroLeftPanel';
import { HeroRightPanel } from './HeroRightPanel';

export function HeroSection() {
  return (
    <section
      id="home"
      style={{
        paddingTop: 64,
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '55fr 45fr',
      }}
    >
      <HeroLeftPanel />
      <HeroRightPanel />
    </section>
  );
}
