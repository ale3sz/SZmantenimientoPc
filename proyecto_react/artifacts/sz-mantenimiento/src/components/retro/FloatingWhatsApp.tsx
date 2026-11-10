import { MessageCircle } from 'lucide-react';
import { WhatsappLink } from './WhatsappLink';

export function FloatingWhatsApp() {
  return (
    <WhatsappLink
      className="floating-whatsapp"
      label="Escribinos por WhatsApp"
      testId="link-whatsapp-floating"
      message="Hola SZ Mantenimiento PC! Te escribo desde la página web."
    >
      <MessageCircle size={22} />
      <span>Escribinos</span>
    </WhatsappLink>
  );
}
