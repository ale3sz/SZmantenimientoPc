import { ArrowRight, MessageCircle } from 'lucide-react';
import { WhatsappLink } from './WhatsappLink';

export function Contact() {
  return (
    <section className="retro-contact" id="contacto">
      <div className="contact-inner">
        <div className="contact-topline">
          <span>Contacto directo · Taller Rosario</span>
          <span className="contact-dash" />
          <span>SZ Mantenimiento</span>
        </div>

        <div className="contact-main">
          <div>
            <h2 className="display">Escribinos.<br /><em>Te respondemos</em><br />rápido.</h2>
            <p>Atención por WhatsApp para consultas, turnos y presupuestos.</p>
          </div>

          <WhatsappLink
            className="contact-button"
            label="Escribinos por WhatsApp al 341 258 0840"
            testId="link-whatsapp-contact"
            message="Hola SZ Mantenimiento PC! Quiero hacer una consulta por mi computadora."
          >
            <div className="contact-icon" aria-hidden="true"><MessageCircle size={28} /></div>
            <div className="contact-number">
              <small>WHATSAPP DIRECTO</small>
              <strong>341 258 0840</strong>
            </div>
            <ArrowRight size={26} className="contact-arrow" />
          </WhatsappLink>
        </div>

        <div className="contact-bottom">
          <span>Lunes a viernes 9 a 18 hs · Sábados 9 a 13 hs</span>
          <span>Rosario, Santa Fe</span>
        </div>
      </div>
    </section>
  );
}
