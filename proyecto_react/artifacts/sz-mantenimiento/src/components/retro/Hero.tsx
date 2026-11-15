import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, MessageCircle } from 'lucide-react';
import mascotSeal from '@assets/sello.jfif';
import { WhatsappLink, whatsappBase } from './WhatsappLink';

export function Hero() {
  const [heroStamped, setHeroStamped] = useState(false);
  const heroStampRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      setHeroStamped(true);
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setHeroStamped(true);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    if (heroStampRef.current) obs.observe(heroStampRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="retro-hero on-dark" id="inicio">
      <div className="hero-paper">
        <div className="hero-topline">
          <span>Taller de PC en Rosario · Atención personalizada</span>
          <span className="issue-mark">SZ / 01</span>
        </div>
        <div className="hero-content">
          <div className="hero-copy">
            <h1 className="display">Tu compu,<br /><span>en buenas</span><br />manos.</h1>
            <div ref={heroStampRef} className={`hero-stamp${heroStamped ? ' is-stamped' : ''}`} aria-hidden="true">
              SERVICIO<br />DE CONFIANZA
            </div>
            <div className="hero-subbanner">Reparación · Configuración · Armado</div>
            <p className="hero-intro">Armado, limpieza y puesta a punto para que tu PC vuelva a estar a la altura de tus días.</p>
            <div className="hero-actions" id="heroActions">
              <WhatsappLink
                className="retro-button red-button ribbon-style"
                testId="link-whatsapp-hero"
                message="Hola SZ Mantenimiento PC! Quiero consultar por mi computadora."
              >
                <MessageCircle size={19} /> Consultar por WhatsApp <ArrowRight size={17} />
              </WhatsappLink>
              <a className="retro-text-link" href="#servicios" data-testid="link-see-services">
                Ver servicios <ArrowDown size={15} />
              </a>
            </div>
            <a className="hero-phone" href={whatsappBase} target="_blank" rel="noopener noreferrer">
              <span>Escribinos</span>
              <b>341 258 0840</b>
            </a>
          </div>
          <div className="hero-mascot-wrap">
            <svg className="circuit-backdrop" viewBox="0 0 400 400" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="200" cy="200" r="182" strokeDasharray="6 6" />
              <path d="M30 280h55l35-35h40M310 95h45l25-25M280 330h50l35-35h25M45 120h40l30 30" />
              <circle cx="30" cy="280" r="5" fill="currentColor" />
              <circle cx="380" cy="70" r="5" fill="currentColor" />
              <circle cx="390" cy="295" r="5" fill="currentColor" />
              <circle cx="45" cy="120" r="5" fill="currentColor" />
            </svg>
            <div className="mascot-frame">
              <img src={mascotSeal} alt="Sello oficial de SZ Mantenimiento de PC" width={360} height={360} />
            </div>
            <div className="mascot-ribbon" aria-hidden="true">¡TU EQUIPO<br />TIENE ARREGLO!</div>
            <div className="mascot-side-note" aria-hidden="true">HECHO CON<br />CUIDADO<b>SZ</b></div>
            <span className="print-star star-one" aria-hidden="true">✦</span>
            <span className="print-star star-two" aria-hidden="true">✦</span>
          </div>
        </div>
        <div className="hero-footerline">
          <span>Resultados reales. Proceso transparente.</span>
          <a href="#servicios" data-testid="link-scroll-services">
            Deslizá <ArrowDown size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
