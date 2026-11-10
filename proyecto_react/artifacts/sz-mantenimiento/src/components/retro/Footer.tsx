import { ArrowUp } from 'lucide-react';
import brandLogoDark from '@assets/logo_sz_transparente_negro.png';

export function Footer() {
  return (
    <footer className="retro-footer">
      <a href="#inicio" className="footer-brand" data-testid="link-home-footer">
        <img src={brandLogoDark} alt="SZ" width={58} height={40} />
        <span><small>MANTENIMIENTO<br />DE PC</small></span>
      </a>
      <span>Un taller para que tu PC siga andando.</span>
      <a href="#inicio" className="back-top" data-testid="link-back-to-top">
        VOLVER ARRIBA <ArrowUp size={14} />
      </a>
    </footer>
  );
}
