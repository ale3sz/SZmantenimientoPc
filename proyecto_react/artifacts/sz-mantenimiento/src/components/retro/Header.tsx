import { useEffect, useState } from 'react';
import { Menu, MessageCircle, X } from 'lucide-react';
import brandLogo from '@assets/logo_sz_transparente_crema.png';
import { WhatsappLink } from './WhatsappLink';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`retro-header${scrolled ? ' is-scrolled' : ''}`} id="retroHeader">
      <div className="retro-header-inner">
        <a href="#inicio" className="retro-brand" aria-label="SZ Mantenimiento de PC, inicio" data-testid="link-home-brand">
          <img src={brandLogo} alt="SZ" width={70} height={48} />
          <span><small>MANTENIMIENTO<br />DE PC</small></span>
        </a>
        <button
          type="button"
          className="retro-menu-toggle"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          data-testid="button-menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={menuOpen ? 'retro-nav is-open' : 'retro-nav'} aria-label="Navegación principal">
          <a href="#servicios" onClick={closeMenu} data-testid="link-nav-services">Servicios</a>
          <a href="#mantenimiento" onClick={closeMenu} data-testid="link-nav-maintenance">Mantenimiento</a>
          <a href="#armado" onClick={closeMenu} data-testid="link-nav-assembly">Armado</a>
          <a href="#contacto" onClick={closeMenu} data-testid="link-nav-contact">Contacto</a>
          <WhatsappLink className="retro-nav-cta" label="Contactar por WhatsApp" testId="link-whatsapp-header">
            <MessageCircle size={16} /> Hablemos
          </WhatsappLink>
        </nav>
      </div>
    </header>
  );
}
