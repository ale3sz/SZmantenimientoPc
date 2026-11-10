import './FlyerRetro.css';
import { Header } from './components/retro/Header';
import { Hero } from './components/retro/Hero';
import { Services } from './components/retro/Services';
import { Maintenance } from './components/retro/Maintenance';
import { Assembly } from './components/retro/Assembly';
import { Contact } from './components/retro/Contact';
import { Footer } from './components/retro/Footer';
import { FloatingWhatsApp } from './components/retro/FloatingWhatsApp';

export function FlyerRetro() {
  return (
    <main className="flyer-retro">
      <Header />
      <Hero />
      <Services />
      <Maintenance />
      <Assembly />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
