import './FlyerRetro.css';
import { type ReactNode, useState } from 'react';
import { ArrowDown, ArrowRight, Check, Cpu, HardDrive, Menu, MessageCircle, Settings2, Sparkles, X } from 'lucide-react';

const brandLogo = '/__mockup/images/sz-mascot-logo.jpeg';
const cleaningAd = '/__mockup/images/sz-cleaning-ad.jpeg';
const mascotSticker = '/__mockup/images/sz-mascot-sticker.jpeg';
const assemblyAd = '/__mockup/images/sz-assembly-ad.jpeg';
const whatsapp = 'https://wa.me/5493412580840';

const services = [
  { n: '01', title: 'Armado gamer y de oficina', text: 'Un equipo pensado para lo que necesitás: juego, trabajo o uso diario.', icon: Cpu, tag: 'ARMADO DE PC' },
  { n: '02', title: 'Windows y programas', text: 'Instalación y configuración de Windows y software.', icon: Settings2, tag: 'INSTALACIÓN' },
  { n: '03', title: 'Limpieza interna + pasta térmica', text: 'Limpieza de componentes y reemplazo de pasta térmica.', icon: Sparkles, tag: 'MANTENIMIENTO' },
  { n: '04', title: 'Optimización del sistema', text: 'Ajustes para que el sistema funcione de manera más fluida.', icon: HardDrive, tag: 'PUESTA A PUNTO' },
  { n: '05', title: 'Asesoramiento en componentes', text: 'Orientación para elegir componentes compatibles con tu equipo.', icon: Cpu, tag: 'CONSULTA' },
];

function WhatsappLink({ children, className = '', label = 'Escribinos por WhatsApp' }: { children: ReactNode; className?: string; label?: string }) {
  return <a href={whatsapp} target="_blank" rel="noreferrer" aria-label={label} className={className}>{children}</a>;
}

export function FlyerRetro() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="flyer-retro">
      <header className="retro-header">
        <div className="retro-header-inner">
          <a href="#inicio" className="retro-brand" aria-label="SZ Mantenimiento de PC, inicio">
            <img src={brandLogo} alt="Mascota de SZ Mantenimiento de PC" />
            <span><b>SZ</b><small>MANTENIMIENTO DE PC</small></span>
          </a>
          <button type="button" className="retro-menu-toggle" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
          <nav className={menuOpen ? 'retro-nav is-open' : 'retro-nav'} aria-label="Navegación principal">
            <a href="#servicios" onClick={closeMenu}>Servicios</a>
            <a href="#mantenimiento" onClick={closeMenu}>Mantenimiento</a>
            <a href="#contacto" onClick={closeMenu}>Contacto</a>
            <WhatsappLink className="retro-nav-cta" label="Contactar por WhatsApp"><MessageCircle size={16} /> Hablemos</WhatsappLink>
          </nav>
        </div>
      </header>

      <section className="retro-hero" id="inicio">
        <div className="hero-paper">
          <div className="hero-topline"><span>TALLER DE PC · ATENCIÓN PERSONALIZADA</span><span className="issue-mark">SZ / 01</span></div>
          <div className="hero-content">
            <div className="hero-copy">
              <div className="hero-stamp">SERVICIO<br />DE CONFIANZA</div>
              <p className="hero-kicker">REPARACIÓN · CONFIGURACIÓN · ARMADO</p>
              <h1>Tu compu,<br /><span>en buenas</span><br />manos.</h1>
              <p className="hero-intro">Armado, limpieza y puesta a punto para que tu PC vuelva a estar a la altura de tus días.</p>
              <div className="hero-actions">
                <WhatsappLink className="retro-button red-button"><MessageCircle size={18} /> Consultar por WhatsApp <ArrowRight size={17} /></WhatsappLink>
                <a className="retro-text-link" href="#servicios">Ver servicios <ArrowDown size={15} /></a>
              </div>
              <div className="hero-phone"><span>ESCRIBINOS</span><b>341 258 0840</b></div>
            </div>
            <div className="hero-mascot-wrap">
              <div className="sunburst" aria-hidden="true" />
              <div className="mascot-frame"><img src={brandLogo} alt="La mascota técnica de SZ lista para ayudarte" /></div>
              <div className="mascot-ribbon">¡TU EQUIPO<br />TIENE ARREGLO!</div>
              <div className="mascot-side-note">HECHO CON<br />CUIDADO<br /><b>SZ</b></div>
              <span className="print-star star-one">✦</span><span className="print-star star-two">✦</span>
            </div>
          </div>
          <div className="hero-footerline"><span>EL TALLER QUE TU PC ESTABA PIDIENDO</span><a href="#servicios">DESLIZÁ <ArrowDown size={13} /></a></div>
        </div>
      </section>

      <section className="retro-services" id="servicios">
        <div className="services-heading">
          <div className="section-kicker"><span>01</span> TRABAJO DE TALLER</div>
          <h2>Manos a la PC.<br /><em>Soluciones claras.</em></h2>
          <p>Contanos qué necesita tu equipo. Revisamos juntos el próximo paso, sin vueltas.</p>
          <div className="services-burst">SIN<br />VUELTAS</div>
        </div>
        <div className="service-sheet">
          <div className="sheet-label"><span>CATÁLOGO DE SERVICIOS</span><span>ATENCIÓN CERCANA · SZ</span></div>
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article className="retro-service" key={service.n}>
                <div className="service-number">{service.n}</div>
                <div className="service-icon"><Icon size={21} strokeWidth={1.8} /></div>
                <div className="service-copy">
                  <span className="service-tag">{service.tag}</span>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </div>
                <WhatsappLink className="service-arrow" label={`Consultar por ${service.title}`}><ArrowRight size={19} /></WhatsappLink>
              </article>
            );
          })}
          <div className="sheet-bottom"><span>¿NO SABÉS POR DÓNDE EMPEZAR?</span><WhatsappLink className="inline-contact">Contanos qué le pasa a tu PC <ArrowRight size={15} /></WhatsappLink></div>
        </div>
      </section>

      <section className="retro-maintenance" id="mantenimiento">
        <div className="maintenance-layout">
          <div className="maintenance-copy">
            <div className="section-kicker light-kicker"><span>02</span> CUANDO EL RUIDO AVISA</div>
            <h2>¿Tu PC está lenta<br />o hace <em>mucho ruido?</em></h2>
            <p>El polvo y el calor pueden afectar el funcionamiento del equipo. Una limpieza interna y el cambio de pasta térmica son parte del mantenimiento.</p>
            <div className="maintenance-points">
              <div><span className="point-check"><Check size={14} /></span>Limpieza interna</div>
              <div><span className="point-check"><Check size={14} /></span>Reemplazo de pasta térmica</div>
              <div><span className="point-check"><Check size={14} /></span>Atención al ruido y la temperatura</div>
            </div>
            <WhatsappLink className="retro-button cream-button"><MessageCircle size={17} /> Consultar mantenimiento <ArrowRight size={16} /></WhatsappLink>
          </div>
          <div className="cleaning-poster">
            <div className="poster-tape">TALLER SZ · CUIDADO INTERNO</div>
            <img src={cleaningAd} alt="Publicidad de limpieza interna y cambio de pasta térmica de SZ" />
            <span>DIAGNÓSTICO VISUAL / MANTENIMIENTO</span>
          </div>
        </div>
      </section>

      <section className="retro-assembly">
        <div className="assembly-poster">
          <img src={assemblyAd} alt="Publicidad de armado y optimización de PC con los servicios de SZ" />
          <span className="assembly-sticker"><img src={mascotSticker} alt="Sticker circular de la mascota SZ" /></span>
          <span className="poster-corner">HECHO EN EL<br />TALLER SZ</span>
        </div>
        <div className="assembly-copy">
          <div className="section-kicker"><span>03</span> ARMADO CON CRITERIO</div>
          <h2>Una PC armada<br /><em>para tu mundo.</em></h2>
          <p>Gaming o trabajo: te ayudamos a pensar el armado y a elegir componentes que tengan sentido para el uso que le vas a dar.</p>
          <div className="build-note"><span className="note-mark">SZ</span><span>Primero entendemos<br />qué necesitás.</span></div>
          <WhatsappLink className="retro-button red-button"><MessageCircle size={17} /> Consultar un armado <ArrowRight size={16} /></WhatsappLink>
        </div>
      </section>

      <section className="retro-contact" id="contacto">
        <div className="contact-inner">
          <div className="contact-topline"><span>EL PRÓXIMO PASO ES SIMPLE</span><span className="contact-dash" /></div>
          <div className="contact-main">
            <div><h2>Contanos qué<br /><em>necesita tu PC.</em></h2><p>Escribinos y conversamos sobre tu equipo.</p></div>
            <WhatsappLink className="contact-button">
              <span className="contact-icon"><MessageCircle size={24} /></span>
              <span className="contact-number"><small>WHATSAPP</small><strong>341 258 0840</strong></span>
              <ArrowRight className="contact-arrow" size={24} />
            </WhatsappLink>
          </div>
          <div className="contact-bottom"><span>SZ MANTENIMIENTO DE PC</span><span>REPARAR · CUIDAR · ARMAR</span></div>
        </div>
      </section>
      <footer className="retro-footer">
        <a href="#inicio" className="footer-brand"><img src={brandLogo} alt="" /><span>SZ <small>MANTENIMIENTO DE PC</small></span></a>
        <span>Un taller para que tu PC siga andando.</span>
        <a href="#inicio" className="back-top">VOLVER ARRIBA ↑</a>
      </footer>
      <WhatsappLink className="floating-whatsapp" label="Abrir WhatsApp para contactar"><MessageCircle size={21} /><span>Escribinos</span></WhatsappLink>
    </main>
  );
}
