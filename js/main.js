/**
 * SZ MANTENIMIENTO DE PC — SCRIPT PRINCIPAL
 * Orquestador modular de interactividad y animaciones retro
 */

(function () {
  'use strict';

  /* ==========================================================
     1. CABECERA Y MENÚ MÓVIL
     ========================================================== */
  function initHeader() {
    var header = document.getElementById('retroHeader');
    var menuToggle = document.getElementById('menuToggle');
    var retroNav = document.getElementById('retroNav');
    var iconOpen = document.getElementById('menuIconOpen');
    var iconClose = document.getElementById('menuIconClose');

    if (!header || !menuToggle || !retroNav) return;

    var isOpen = false;

    function onScroll() {
      header.classList.toggle('is-scrolled', window.scrollY > 24);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    function setMenu(open) {
      isOpen = open;
      retroNav.classList.toggle('is-open', open);
      header.classList.toggle('menu-open', open);
      if (iconOpen) iconOpen.hidden = open;
      if (iconClose) iconClose.hidden = !open;
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    }

    menuToggle.addEventListener('click', function () {
      setMenu(!isOpen);
    });

    retroNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (isOpen) setMenu(false);
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) {
        setMenu(false);
        menuToggle.focus();
      }
    });

    document.addEventListener('click', function (e) {
      if (isOpen && !header.contains(e.target)) {
        setMenu(false);
      }
    });

    window.matchMedia('(min-width: 861px)').addEventListener('change', function (mq) {
      if (mq.matches && isOpen) {
        setMenu(false);
      }
    });
  }

  /* ==========================================================
     2. IMPACTO DE SELLOS (HERO & SERVICIOS)
     ========================================================== */
  function initStamps(reduceMotion) {
    if (!('IntersectionObserver' in window) || reduceMotion) return;

    var stampObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-stamped');
          stampObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    var heroStamp = document.querySelector('.hero-stamp');
    var servicesStamp = document.querySelector('.services-stamp');

    if (heroStamp) stampObs.observe(heroStamp);
    if (servicesStamp) stampObs.observe(servicesStamp);
  }

  /* ==========================================================
     3. VISOR ANTES / DESPUÉS CON EXPLOSIÓN DE POLVO
     ========================================================== */
  function initMaintenance(reduceMotion) {
    var cleaningImg = document.getElementById('cleaningImg');
    var cleaningContainer = document.getElementById('cleaningContainer');
    var dustPrompt = document.getElementById('dustPrompt');
    var cleanSparkle = document.getElementById('cleanSparkle');
    var badge = document.getElementById('cleaningBadge');
    var footnote = document.getElementById('cleaningFootNote');
    var toggles = document.querySelectorAll('.cleaning-toggle-btn');

    if (!cleaningImg || !toggles.length) return;

    var currentView = 'before';

    // Precarga de imagen limpia en memoria
    var preloadAfter = new Image();
    preloadAfter.src = './graficas/limpieza_despues.jfif';

    var views = {
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

    function burstDust(container, originX, originY) {
      if (!container || reduceMotion) return;

      var rect = container.getBoundingClientRect();
      var x = typeof originX === 'number' ? originX : rect.width * 0.5;
      var y = typeof originY === 'number' ? originY : rect.height * 0.45;

      var colors = ['#f5ebd6', '#e9dfc8', '#cfc2a6', '#dcd0b8', '#a89b80', '#8a7b68', '#4a443a'];
      var particleCount = 28;

      // 1. Partículas de polvo individuales
      for (var i = 0; i < particleCount; i++) {
        var p = document.createElement('span');
        p.className = 'dust-mote';

        var size = 3 + Math.random() * 7;
        var color = colors[Math.floor(Math.random() * colors.length)];

        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.backgroundColor = color;
        p.style.left = x + 'px';
        p.style.top = y + 'px';
        p.style.marginLeft = -size / 2 + 'px';
        p.style.marginTop = -size / 2 + 'px';

        container.appendChild(p);

        var angle = Math.random() * Math.PI * 2;
        var distance = 45 + Math.random() * 140;
        var tx = Math.cos(angle) * distance;
        var ty = Math.sin(angle) * distance - (20 + Math.random() * 35);
        var duration = 520 + Math.random() * 350;

        if (p.animate) {
          var anim = p.animate([
            { transform: 'translate3d(0, 0, 0) scale(1)', opacity: 0.95 },
            { transform: 'translate3d(' + (tx * 0.6) + 'px, ' + (ty * 0.6) + 'px, 0) scale(' + (1.1 + Math.random() * 0.4) + ')', opacity: 0.8, offset: 0.4 },
            { transform: 'translate3d(' + tx + 'px, ' + ty + 'px, 0) scale(0.25)', opacity: 0 }
          ], {
            duration: duration,
            easing: 'cubic-bezier(0.12, 0.85, 0.35, 1)',
            fill: 'forwards'
          });
          anim.onfinish = (function (elem) {
            return function () { elem.remove(); };
          })(p);
        } else {
          setTimeout((function (elem) {
            return function () { elem.remove(); };
          })(p), duration);
        }
      }

      // 2. Mini nubecitas de polvo retro
      for (var j = 0; j < 5; j++) {
        var puff = document.createElement('span');
        puff.className = 'dust-puff';
        var puffSize = 20 + Math.random() * 24;
        puff.style.width = puffSize + 'px';
        puff.style.height = puffSize + 'px';
        puff.style.left = x + 'px';
        puff.style.top = y + 'px';
        puff.style.marginLeft = -puffSize / 2 + 'px';
        puff.style.marginTop = -puffSize / 2 + 'px';

        container.appendChild(puff);

        var pAngle = Math.random() * Math.PI * 2;
        var pDist = 35 + Math.random() * 80;
        var ptx = Math.cos(pAngle) * pDist;
        var pty = Math.sin(pAngle) * pDist - 30;
        var pDur = 620 + Math.random() * 250;

        if (puff.animate) {
          var pAnim = puff.animate([
            { transform: 'translate3d(0, 0, 0) scale(0.35)', opacity: 0.75 },
            { transform: 'translate3d(' + (ptx * 0.5) + 'px, ' + (pty * 0.5) + 'px, 0) scale(1.35)', opacity: 0.45, offset: 0.45 },
            { transform: 'translate3d(' + ptx + 'px, ' + pty + 'px, 0) scale(1.7)', opacity: 0 }
          ], {
            duration: pDur,
            easing: 'cubic-bezier(0.16, 0.8, 0.3, 1)',
            fill: 'forwards'
          });
          pAnim.onfinish = (function (elem) {
            return function () { elem.remove(); };
          })(puff);
        } else {
          setTimeout((function (elem) {
            return function () { elem.remove(); };
          })(puff), pDur);
        }
      }
    }

    function showView(view, originX, originY) {
      var data = views[view];
      if (!data) return;

      var isTransitionToClean = (currentView === 'before' && view === 'after');
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

    // Clic en la imagen llena de polvo para limpiarla al instante
    if (cleaningContainer) {
      cleaningContainer.addEventListener('click', function (e) {
        if (currentView === 'before') {
          var rect = cleaningContainer.getBoundingClientRect();
          var x = e.clientX - rect.left;
          var y = e.clientY - rect.top;
          showView('after', x, y);
        }
      });
    }

    toggles.forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (btn.dataset.view !== currentView) {
          showView(btn.dataset.view);
        }
      });
    });
  }

  /* ==========================================================
     4. LÁMINA ANIMADA DE ARMADO (LOOP EN VIEWPORT)
     ========================================================== */
  function initAssembly(reduceMotion) {
    var videoEl = document.getElementById('assemblyVideo');
    if (!videoEl) return;

    if (reduceMotion) {
      videoEl.pause();
      videoEl.removeAttribute('autoplay');
      return;
    }

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
          videoEl.play().catch(function () {});
        } else {
          videoEl.pause();
        }
      }, { threshold: 0.15 });

      observer.observe(videoEl);
    }
  }

  /* ==========================================================
     5. WHATSAPP FLOTANTE
     ========================================================== */
  function initFloatingWhatsApp() {
    var floating = document.getElementById('floatingWa');
    var heroActions = document.getElementById('heroActions');
    var contact = document.getElementById('contacto');

    if (!floating) return;

    if ('IntersectionObserver' in window && heroActions && contact) {
      var state = { hero: true, contact: false };

      var update = function () {
        floating.classList.toggle('is-hidden', state.hero || state.contact);
      };

      var obsHero = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          state.hero = entry.isIntersecting;
        });
        update();
      }, { threshold: 0.15 });

      var obsContact = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          state.contact = entry.isIntersecting;
        });
        update();
      }, { threshold: 0.25 });

      obsHero.observe(heroActions);
      obsContact.observe(contact);
    } else {
      floating.classList.remove('is-hidden');
    }
  }

  /* ==========================================================
     INICIALIZACIÓN
     ========================================================== */
  document.addEventListener('DOMContentLoaded', function () {
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    initHeader();
    initStamps(reduceMotion);
    initMaintenance(reduceMotion);
    initAssembly(reduceMotion);
    initFloatingWhatsApp();
  });
})();
