import { useEffect, useRef } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import mascotSeal from '@assets/sello.jfif';
import assemblyVideo from '@assets/ensamble_pc_web.mp4';
import { WhatsappLink } from './WhatsappLink';

export function Assembly() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      videoEl.pause();
      return;
    }
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          videoEl.play().catch(() => {});
        } else {
          videoEl.pause();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(videoEl);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="retro-assembly on-light" id="armado">
      <figure className="assembly-poster">
        <div className="poster-corner">ENSAMBLE SZ ROSARIO</div>
        <video
          ref={videoRef}
          src={assemblyVideo}
          loop
          muted
          playsInline
          aria-label="Animación ilustrada del proceso de armado de PC en taller SZ"
        />
        <div className="assembly-sticker" aria-hidden="true">
          <img src={mascotSeal} alt="Mascota oficial de SZ" width={96} height={96} />
        </div>
      </figure>

      <div className="assembly-copy">
        <h2 className="display section-title">Armamos la PC<br />que <em>necesitás.</em></h2>
        <p>Gamer, oficina o trabajo profesional. Te asesoramos para que cada componente rinda y sea compatible, con presupuesto a tu medida.</p>

        <ul className="build-tags">
          <li>Gamer</li>
          <li>Oficina</li>
          <li>Edición y Render</li>
          <li>Upgrades a medida</li>
        </ul>

        <div className="build-note">
          <span className="note-mark">SZ</span>
          <span>Armado prolijo, gestión de cables y pruebas de temperatura antes de la entrega.</span>
        </div>

        <WhatsappLink
          className="retro-button red-button"
          testId="link-whatsapp-assembly"
          message="Hola SZ Mantenimiento PC! Quiero armar una PC / hacer un upgrade."
        >
          <MessageCircle size={18} /> Pedir presupuesto <ArrowRight size={16} />
        </WhatsappLink>
      </div>
    </section>
  );
}
