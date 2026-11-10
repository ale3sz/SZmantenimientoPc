import './_group.css';
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
  return <a href={whatsapp} target="_blank" rel="noreferrer" aria-label={label} data-testid="link-whatsapp" className={className}>{children}</a>;
}

export function Current() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  return (
    <main className="grain overflow-hidden">
      <header className="site-header">
        <div className="header-inner">
          <a href="#inicio" className="brand" aria-label="SZ Mantenimiento de PC, inicio">
            <img src={brandLogo} alt="Mascota de SZ Mantenimiento de PC" />
            <span><b>SZ</b><small>MANTENIMIENTO DE PC</small></span>
          </a>
          <button type="button" className="menu-toggle" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setMenuOpen(!menuOpen)} data-testid="button-menu">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <nav className={menuOpen ? 'main-nav open' : 'main-nav'} aria-label="Navegación principal">
            <a href="#servicios" onClick={closeMenu}>Servicios</a>
            <a href="#mantenimiento" onClick={closeMenu}>Mantenimiento</a>
            <a href="#contacto" onClick={closeMenu}>Contacto</a>
            <WhatsappLink className="nav-cta" label="Contactar por WhatsApp">
              <MessageCircle size={16} /> Hablemos
            </WhatsappLink>
          </nav>
        </div>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="eyebrow reveal"><span className="eyebrow-dot" /> TALLER DE PC · ATENCIÓN PERSONALIZADA</div>
            <h1 className="reveal reveal-delay">Tu compu,<br /><em>en buenas</em><br />manos.</h1>
            <p className="hero-intro reveal reveal-late">Armado, limpieza y puesta a punto para que tu PC vuelva a estar a la altura de tus días.</p>
            <div className="hero-actions reveal reveal-late">
              <WhatsappLink className="button button-red"><MessageCircle size={18} /> Consultar por WhatsApp <ArrowRight size={17} /></WhatsappLink>
              <a className="text-link" href="#servicios">Ver servicios <ArrowDown size={15} /></a>
            </div>
            <div className="hero-foot reveal reveal-late"><span className="mono">341 258 0840</span><span className="foot-rule" /> <span>Hablemos de tu equipo</span></div>
          </div>
          <div className="hero-art">
            <div className="art-rings" />
            <div className="hero-sticker"><img src={brandLogo} alt="La mascota técnica de SZ" /></div>
            <div className="hero-label label-top"><span>01 / SERVICIO CERCANO</span><span className="label-star">+</span></div>
            <div className="hero-label label-bottom"><span>LISTA PARA VOLVER<br />AL TRABAJO</span><ArrowRight size={21} /></div>
            <div className="hero-screw screw-one" /><div className="hero-screw screw-two" />
          </div>
        </div>
        <div className="hero-bottom"><span>REPARACIÓN · CONFIGURACIÓN · ARMADO</span><span className="scroll-cue">DESLIZÁ PARA VER <ArrowDown size={13} /></span></div>
      </section>

      <section className="services section-wrap" id="servicios">
        <div className="section-heading">
          <div>
            <div className="eyebrow"><span className="section-index">01</span> LO QUE HACEMOS</div>
            <h2>Manos a la PC.<br /><em>Soluciones claras.</em></h2>
          </div>
          <p className="section-lede">Contanos qué necesita tu equipo. Revisamos juntos el próximo paso, sin vueltas.</p>
        </div>
        <div className="service-list">
          {services.map((service) => {
            const Icon = service.icon;
            return <article className="service-card" key={service.n}>
              <div className="service-number mono">{service.n}</div>
              <div className="service-icon"><Icon size={21} strokeWidth={1.7} /></div>
              <div className="service-copy"><span className="service-tag mono">{service.tag}</span><h3>{service.title}</h3><p>{service.text}</p></div>
              <WhatsappLink className="service-arrow" label={`Consultar por ${service.title}`}><ArrowRight size={19} /></WhatsappLink>
            </article>;
          })}
        </div>
        <div className="services-endnote"><span>¿No sabés por dónde empezar?</span><WhatsappLink className="inline-contact">Contanos qué le pasa a tu PC <ArrowRight size={15} /></WhatsappLink></div>
      </section>

      <section className="feature-section" id="mantenimiento">
        <div className="feature-layout">
          <div className="feature-copy">
            <div className="eyebrow light-eyebrow"><span className="section-index">02</span> CUANDO EL RUIDO AVISA</div>
            <h2>¿Tu PC está lenta<br />o hace <em>mucho ruido?</em></h2>
            <p>El polvo y el calor pueden afectar el funcionamiento del equipo. Una limpieza interna y el cambio de pasta térmica son parte del mantenimiento.</p>
            <div className="feature-points">
              <div><span className="checkmark"><Check size={14} /></span> Limpieza interna</div>
              <div><span className="checkmark"><Check size={14} /></span> Reemplazo de pasta térmica</div>
              <div><span className="checkmark"><Check size={14} /></span> Atención al ruido y la temperatura</div>
            </div>
            <WhatsappLink className="button button-cream"><MessageCircle size={17} /> Consultar mantenimiento <ArrowRight size={16} /></WhatsappLink>
          </div>
          <div className="feature-poster image-frame">
            <img src={cleaningAd} alt="Publicidad de limpieza interna y cambio de pasta térmica de SZ" />
            <span className="poster-caption">CUIDADO INTERNO / SZ TALLER</span>
          </div>
        </div>
      </section>

      <section className="assembly section-wrap">
        <div className="assembly-art image-frame">
          <img src={assemblyAd} alt="Publicidad de armado y optimización de PC con los servicios de SZ" />
          <span className="assembly-sticker"><img src={mascotSticker} alt="Sticker circular de la mascota SZ" /></span>
        </div>
        <div className="assembly-copy">
          <div className="eyebrow"><span className="section-index">03</span> ARMADO CON CRITERIO</div>
          <h2>Una PC armada<br /><em>para tu mundo.</em></h2>
          <p>Gaming o trabajo: te ayudamos a pensar el armado y a elegir componentes que tengan sentido para el uso que le vas a dar.</p>
          <div className="build-note"><span className="note-mark">SZ</span><span>Primero entendemos<br />qué necesitás.</span></div>
          <WhatsappLink className="button button-red"><MessageCircle size={17} /> Consultar un armado <ArrowRight size={16} /></WhatsappLink>
        </div>
      </section>

      <section className="contact-band" id="contacto">
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
      <footer className="footer">
        <a href="#inicio" className="footer-brand"><img src={brandLogo} alt="" /> <span>SZ <small>MANTENIMIENTO DE PC</small></span></a>
        <span>Un taller para que tu PC siga andando.</span>
        <a href="#inicio" className="back-top">VOLVER ARRIBA ↑</a>
      </footer>
      <WhatsappLink className="floating-whatsapp" label="Abrir WhatsApp para contactar"><MessageCircle size={22} /><span>Escribinos</span></WhatsappLink>
    </main>
  );
}
