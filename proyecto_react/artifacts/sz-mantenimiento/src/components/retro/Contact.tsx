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
            <div className="contact-bonified-badge" aria-label="Beneficio: Diagnóstico bonificado">
              <img src="/graficas/mascota_diagnostico_lupa.webp" alt="" className="bonified-mascot-img" width="32" height="36" loading="lazy" aria-hidden="true" />
              <span><strong>DIAGNÓSTICO 100% BONIFICADO</strong> · Si reparás con nosotros, la revisión es gratis</span>
            </div>
            <h2 className="display">Escribinos.<br /><em>Te respondemos</em><br />rápido.</h2>
            <p>Atención por WhatsApp para consultas, turnos y presupuestos.</p>
          </div>

          <div className="contact-cta-wrapper">
            <div className="mascot-wa-pointer" aria-hidden="true">
              <img src="/graficas/mascota_whatsapp_cta.webp" alt="" className="mascot-pointer-img" width="80" height="46" loading="lazy" />
              <span className="pointer-bubble">¡Escribinos directo! 💬</span>
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
        </div>

        <div className="contact-bottom">
          <span>Lunes a viernes 9 a 18 hs · Sábados 9 a 13 hs</span>
          <span>Rosario, Santa Fe</span>
        </div>
      </div>
    </section>
  );
}
