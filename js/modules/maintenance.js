/**
 * Módulo del comparador Antes / Después en Mantenimiento con
 * simulación de partículas de polvo al limpiar.
 */
export function initMaintenance() {
  const cleaningImg = document.getElementById('cleaningImg');
  const cleaningContainer = document.getElementById('cleaningContainer');
  const dustPrompt = document.getElementById('dustPrompt');
  const cleanSparkle = document.getElementById('cleanSparkle');
  const badge = document.getElementById('cleaningBadge');
  const footnote = document.getElementById('cleaningFootNote');
  const toggles = document.querySelectorAll('.cleaning-toggle-btn');

  if (!cleaningImg || !toggles.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let currentView = 'before';

  // Precarga real en memoria para que el cambio sea instantáneo
  const preloadAfter = new Image();
  preloadAfter.src = './graficas/limpieza_despues.jfif';

  const views = {
    before: {
      src: './graficas/web/limpieza%20antes%20reemplazo.png',
      alt: 'Interior de una PC antes de la limpieza: polvo acumulado en gabinete, fuente y cables',
      badge: 'Antes · polvo acumulado y riesgo térmico',
      badgeClass: 'before-badge',
      note: 'Estado inicial: flujo de aire tapado y temperaturas altas'
    },
    after: {
      src: './graficas/limpieza_despues.jfif',
      alt: 'La misma PC después de la limpieza: gabinete y componentes sin polvo',
      badge: 'Después · pasta térmica nueva y coolers limpios',
      badgeClass: 'after-badge',
      note: 'Trabajo terminado: limpieza completa y pasta térmica Arctic MX-4'
    }
  };

  /**
   * Dispara una explosión de partículas de polvo físico desde el punto de origen.
   */
  function burstDust(container, originX, originY) {
    if (!container || reduceMotion) return;

    const rect = container.getBoundingClientRect();
    const x = typeof originX === 'number' ? originX : rect.width * 0.5;
    const y = typeof originY === 'number' ? originY : rect.height * 0.45;

    const colors = ['#f5ebd6', '#e9dfc8', '#cfc2a6', '#dcd0b8', '#a89b80', '#8a7b68', '#4a443a'];
    const particleCount = 28;

    // 1. Partículas de polvo individuales
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
      // Deriva hacia arriba simulando polvo flotante en el aire
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance - (20 + Math.random() * 35);
      const duration = 520 + Math.random() * 350;

      if (p.animate) {
        const anim = p.animate([
          { transform: 'translate3d(0, 0, 0) scale(1)', opacity: 0.95 },
          { transform: `translate3d(${tx * 0.6}px, ${ty * 0.6}px, 0) scale(${1.1 + Math.random() * 0.4})`, opacity: 0.8, offset: 0.4 },
          { transform: `translate3d(${tx}px, ${ty}px, 0) scale(0.25)`, opacity: 0 }
        ], {
          duration: duration,
          easing: 'cubic-bezier(0.12, 0.85, 0.35, 1)',
          fill: 'forwards'
        });
        anim.onfinish = () => p.remove();
      } else {
        setTimeout(() => p.remove(), duration);
      }
    }

    // 2. Mini nubecitas de polvo / soplido retro
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

  function showView(view, originX, originY) {
    const data = views[view];
    if (!data) return;

    const isTransitionToClean = (currentView === 'before' && view === 'after');
    currentView = view;

    cleaningImg.src = data.src;
    cleaningImg.alt = data.alt;
    if (badge) {
      badge.textContent = data.badge;
      badge.className = 'cleaning-badge ' + data.badgeClass;
    }
    if (footnote) {
      footnote.textContent = data.note;
    }

    toggles.forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.dataset.view === view));
    });

    if (cleaningContainer) {
      if (view === 'after') {
        cleaningContainer.classList.remove('is-dusty');
        if (dustPrompt) dustPrompt.style.opacity = '0';
        if (cleanSparkle) {
          cleanSparkle.classList.remove('is-shining');
          void cleanSparkle.offsetWidth;
          cleanSparkle.classList.add('is-shining');
        }
      } else {
        cleaningContainer.classList.add('is-dusty');
        if (dustPrompt) dustPrompt.style.opacity = '1';
        if (cleanSparkle) cleanSparkle.classList.remove('is-shining');
      }

      if (!reduceMotion) {
        cleaningContainer.classList.remove('is-switching');
        void cleaningContainer.offsetWidth;
        cleaningContainer.classList.add('is-switching');
      }

      if (isTransitionToClean) {
        burstDust(cleaningContainer, originX, originY);
      }
    }
  }

  // Clic en la foto llena de polvo para limpiarla al instante con partículas
  if (cleaningContainer) {
    cleaningContainer.addEventListener('click', function (e) {
      if (currentView === 'before') {
        const rect = cleaningContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        showView('after', x, y);
      }
    });
  }

  // Clic en los botones de alternar Antes / Después
  toggles.forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (btn.dataset.view !== currentView) {
        showView(btn.dataset.view);
      }
    });
  });
}
