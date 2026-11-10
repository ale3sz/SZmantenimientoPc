import { useRef, useState } from 'react';
import { ArrowRight, Check, MessageCircle, Sparkles } from 'lucide-react';
import cleaningBefore from '@assets/limpieza antes reemplazo.png';
import cleaningAfter from '@assets/limpieza_despues.jfif';
import { WhatsappLink } from './WhatsappLink';

export function Maintenance() {
  const [cleaningView, setCleaningView] = useState<'before' | 'after'>('before');
  const [cleaningSwitching, setCleaningSwitching] = useState(false);
  const [isShining, setIsShining] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const isAfter = cleaningView === 'after';

  function burstDust(originX?: number, originY?: number) {
    const container = containerRef.current;
    if (!container) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const rect = container.getBoundingClientRect();
    const x = typeof originX === 'number' ? originX : rect.width * 0.5;
    const y = typeof originY === 'number' ? originY : rect.height * 0.45;

    const colors = ['#f5ebd6', '#e9dfc8', '#cfc2a6', '#dcd0b8', '#a89b80', '#8a7b68', '#4a443a'];
    const particleCount = 28;

    // Partículas de polvo
    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement('span');
      p.className = 'dust-mote';
      const size = 3 + Math.random() * 7;
      const color = colors[Math.floor(Math.random() * colors.length)];

      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.backgroundColor = color;
      p.style.left = x + 'px';
      p.style.top = y + 'px';
      p.style.marginLeft = -size / 2 + 'px';
      p.style.marginTop = -size / 2 + 'px';

      container.appendChild(p);

      const angle = Math.random() * Math.PI * 2;
      const distance = 45 + Math.random() * 140;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance - (20 + Math.random() * 35);
      const duration = 520 + Math.random() * 350;

      if (p.animate) {
        const anim = p.animate([
          { transform: 'translate3d(0, 0, 0) scale(1)', opacity: 0.95 },
          { transform: `translate3d(${tx * 0.6}px, ${ty * 0.6}px, 0) scale(${1.1 + Math.random() * 0.4})`, opacity: 0.8, offset: 0.4 },
          { transform: `translate3d(${tx}px, ${ty}px, 0) scale(0.25)`, opacity: 0 }
        ], {
          duration,
          easing: 'cubic-bezier(0.12, 0.85, 0.35, 1)',
          fill: 'forwards'
        });
        anim.onfinish = () => p.remove();
      } else {
        setTimeout(() => p.remove(), duration);
      }
    }

    // Mini nubecitas de polvo
    for (let j = 0; j < 5; j++) {
      const puff = document.createElement('span');
      puff.className = 'dust-puff';
      const puffSize = 20 + Math.random() * 24;
      puff.style.width = puffSize + 'px';
      puff.style.height = puffSize + 'px';
      puff.style.left = x + 'px';
      puff.style.top = y + 'px';
      puff.style.marginLeft = -puffSize / 2 + 'px';
      puff.style.marginTop = -puffSize / 2 + 'px';

      container.appendChild(puff);

      const pAngle = Math.random() * Math.PI * 2;
      const pDist = 35 + Math.random() * 80;
      const ptx = Math.cos(pAngle) * pDist;
      const pty = Math.sin(pAngle) * pDist - 30;
      const pDur = 620 + Math.random() * 250;

      if (puff.animate) {
        const pAnim = puff.animate([
          { transform: 'translate3d(0, 0, 0) scale(0.35)', opacity: 0.75 },
          { transform: `translate3d(${ptx * 0.5}px, ${pty * 0.5}px, 0) scale(1.35)`, opacity: 0.45, offset: 0.45 },
          { transform: `translate3d(${ptx}px, ${pty}px, 0) scale(1.7)`, opacity: 0 }
        ], {
          duration: pDur,
          easing: 'cubic-bezier(0.16, 0.8, 0.3, 1)',
          fill: 'forwards'
        });
        pAnim.onfinish = () => puff.remove();
      } else {
        setTimeout(() => puff.remove(), pDur);
      }
    }
  }

  const handleCleaningChange = (view: 'before' | 'after', originX?: number, originY?: number) => {
    if (view === cleaningView) return;
    if (view === 'after') {
      burstDust(originX, originY);
      setIsShining(true);
    } else {
      setIsShining(false);
    }
    setCleaningView(view);
    setCleaningSwitching(true);
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cleaningView === 'before' && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      handleCleaningChange('after', x, y);
    }
  };

  return (
    <section className="retro-maintenance on-dark" id="mantenimiento">
      <div className="maintenance-layout">
        <div className="maintenance-copy">
          <h2 className="display section-title">¿Tu PC está lenta<br />o hace <em>mucho ruido?</em></h2>
          <p>El polvo y el calor pueden afectar el funcionamiento del equipo. Una limpieza interna y el cambio de pasta térmica son parte del mantenimiento.</p>
          <ul className="maintenance-points">
            <li><span className="point-check"><Check size={14} /></span>Limpieza interna</li>
            <li><span className="point-check"><Check size={14} /></span>Reemplazo de pasta térmica</li>
            <li><span className="point-check"><Check size={14} /></span>Atención al ruido y la temperatura</li>
          </ul>
          <WhatsappLink
            className="retro-button cream-button"
            testId="link-whatsapp-maintenance"
            message="Hola SZ Mantenimiento PC! Quiero consultar por mantenimiento y ruido en mi equipo."
          >
            <MessageCircle size={18} /> Consultar mantenimiento <ArrowRight size={16} />
          </WhatsappLink>
        </div>
        <figure className="cleaning-poster">
          <div className="cleaning-view-toggle" role="group" aria-label="Ver el equipo antes o después de la limpieza">
            <button
              type="button"
              className="cleaning-toggle-btn"
              aria-pressed={!isAfter}
              onClick={() => handleCleaningChange('before')}
            >
              Antes (suciedad)
            </button>
            <button
              type="button"
              className="cleaning-toggle-btn"
              aria-pressed={isAfter}
              onClick={() => handleCleaningChange('after')}
            >
              Después (limpio)
            </button>
          </div>
          <div
            ref={containerRef}
            className={`cleaning-img-container${!isAfter ? ' is-dusty' : ''}${cleaningSwitching ? ' is-switching' : ''}`}
            onClick={handleContainerClick}
            onAnimationEnd={() => setCleaningSwitching(false)}
            role="region"
            aria-label="Foto interactiva de limpieza de PC"
          >
            {!isAfter && (
              <span className="dust-prompt" aria-hidden="true">
                <Sparkles size={14} />
                Tocá para limpiar el polvo
              </span>
            )}
            <span className={`clean-sparkle${isShining ? ' is-shining' : ''}`} aria-hidden="true">✦</span>
            <img
              src={isAfter ? cleaningAfter : cleaningBefore}
              alt={
                isAfter
                  ? 'La misma PC después de la limpieza: gabinete y componentes sin polvo'
                  : 'Interior de una PC antes de la limpieza: polvo acumulado en gabinete, fuente y cables'
              }
            />
            <span className={`cleaning-badge ${isAfter ? 'after-badge' : 'before-badge'}`} aria-live="polite">
              {isAfter ? 'Después · pasta térmica nueva y coolers limpios' : 'Antes · polvo acumulado y riesgo térmico'}
            </span>
          </div>
          <figcaption>
            {isAfter
              ? 'Trabajo terminado: limpieza completa y pasta térmica Arctic MX-4'
              : 'Estado inicial: flujo de aire tapado y temperaturas altas'}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
