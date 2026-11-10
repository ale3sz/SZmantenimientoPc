import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { WhatsappLink } from './WhatsappLink';
import { servicesData } from './services-data';

export function Services() {
  const [servicesStamped, setServicesStamped] = useState(false);
  const servicesStampRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      setServicesStamped(true);
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setServicesStamped(true);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    if (servicesStampRef.current) obs.observe(servicesStampRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="retro-services on-light" id="servicios">
      <div className="services-heading">
        <div>
          <h2 className="display section-title">Manos a la PC.<br /><em>Soluciones claras.</em></h2>
        </div>
        <p>Contanos qué necesita tu equipo. Revisamos juntos el próximo paso, sin vueltas.</p>
        <div ref={servicesStampRef} className={`services-stamp${servicesStamped ? ' is-stamped' : ''}`} aria-hidden="true">
          SIN VUELTAS
        </div>
      </div>
      <div className="service-sheet">
        <div className="sheet-label">
          <span className="tag-pill">Servicios para PC</span>
          <span>Atención cercana · SZ</span>
        </div>
        {servicesData.map((service) => {
          const Icon = service.icon;
          return (
            <article className="retro-service" key={service.n} data-testid={`card-service-${service.n}`}>
              <div className="service-number" aria-hidden="true">{service.n}</div>
              <div className="service-icon" aria-hidden="true"><Icon size={22} strokeWidth={1.8} /></div>
              <div className="service-copy">
                <span className="service-tag">{service.tag}</span>
                <h3 data-testid={`text-service-title-${service.n}`}>{service.title}</h3>
                <p>{service.text}</p>
              </div>
              <WhatsappLink
                className="service-arrow"
                label={`Consultar por WhatsApp: ${service.title}`}
                testId={`link-whatsapp-service-${service.n}`}
                message={service.msg}
              >
                <ArrowRight size={20} />
              </WhatsappLink>
            </article>
          );
        })}
        <div className="sheet-bottom">
          <span>¿No sabés por dónde empezar?</span>
          <WhatsappLink
            className="inline-contact"
            label="Contanos qué le pasa a tu PC"
            testId="link-whatsapp-services"
            message="Hola SZ Mantenimiento PC! Quiero contarte qué le pasa a mi PC."
          >
            Contanos qué le pasa a tu PC <ArrowRight size={16} />
          </WhatsappLink>
        </div>
      </div>
    </section>
  );
}
