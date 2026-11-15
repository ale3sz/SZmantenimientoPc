/**
 * SZ MANTENIMIENTO DE PC — SCRIPT PRINCIPAL
 * Orquestador modular de interactividad, animaciones retro, privacidad y analítica
 */

(function () {
  'use strict';

  /* ==========================================================
     CONFIGURACIÓN DE ANALÍTICA Y PRIVACIDAD
     ========================================================== */
  var ANALYTICS_CONFIG = {
    // Reemplaza con tu Measurement ID de Google Analytics 4 si deseas activarlo
    gaMeasurementId: 'G-SZPCROSAR1',
    storageKey: 'sz_cookie_consent_v1'
  };

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

    // Precarga de imagen limpia optimizada en WebP
    var preloadAfter = new Image();
    preloadAfter.src = './graficas/limpieza_despues.webp';

    var views = {
      before: {
        src: './graficas/limpieza_antes.webp',
        alt: 'Interior de una PC antes de la limpieza: polvo acumulado en gabinete, fuente y cables',
        badge: 'Antes · polvo acumulado y riesgo térmico',
        badgeClass: 'before-badge',
        note: 'Estado inicial: flujo de aire tapado y temperaturas altas'
      },
      after: {
        src: './graficas/limpieza_despues.webp',
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
     6. GESTIÓN DE CONSENTIMIENTO DE COOKIES & PRIVACIDAD
     ========================================================== */
  function initCookieConsent() {
    var banner = document.getElementById('cookieBanner');
    var btnAccept = document.getElementById('cookieAcceptBtn');
    var btnReject = document.getElementById('cookieRejectBtn');
    var btnConfig = document.getElementById('cookieConfigBtn');
    var configModal = document.getElementById('cookieConfigModal');
    var saveConfigBtn = document.getElementById('saveCookieConfigBtn');
    var chkAnalytics = document.getElementById('cookieChkAnalytics');
    var openCookieLinks = document.querySelectorAll('[data-open-cookies]');

    var savedConsent = null;
    try {
      savedConsent = localStorage.getItem(ANALYTICS_CONFIG.storageKey);
    } catch (e) {
      console.warn('localStorage inaccesible');
    }

    function applyConsent(consentLevel) {
      try {
        localStorage.setItem(ANALYTICS_CONFIG.storageKey, consentLevel);
      } catch (e) {}

      if (banner) {
        banner.classList.add('is-hidden');
        setTimeout(function () {
          banner.hidden = true;
        }, 300);
      }

      if (consentLevel === 'all' || consentLevel === 'analytics') {
        loadAnalytics();
      }
    }

    if (!savedConsent) {
      if (banner) {
        banner.hidden = false;
        banner.classList.remove('is-hidden');
      }
    } else if (savedConsent === 'all' || savedConsent === 'analytics') {
      loadAnalytics();
    }

    if (btnAccept) {
      btnAccept.addEventListener('click', function () {
        applyConsent('all');
        trackEvent('cookie_consent', { status: 'accepted_all' });
      });
    }

    if (btnReject) {
      btnReject.addEventListener('click', function () {
        applyConsent('essential');
        trackEvent('cookie_consent', { status: 'rejected_non_essential' });
      });
    }

    if (btnConfig) {
      btnConfig.addEventListener('click', function () {
        openModal(configModal);
      });
    }

    openCookieLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        openModal(configModal);
      });
    });

    if (saveConfigBtn && chkAnalytics) {
      saveConfigBtn.addEventListener('click', function () {
        var choice = chkAnalytics.checked ? 'analytics' : 'essential';
        applyConsent(choice);
        closeModal(configModal);
        trackEvent('cookie_consent', { status: 'custom_' + choice });
      });
    }
  }

  /* ==========================================================
     7. MODALES LEGALES ACCESIBLES (AVISO LEGAL & PRIVACIDAD)
     ========================================================== */
  function openModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.add('is-active');
    modalEl.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    var closeBtn = modalEl.querySelector('.retro-modal-close');
    if (closeBtn) closeBtn.focus();
  }

  function closeModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.remove('is-active');
    modalEl.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function initLegalModals() {
    var modalTriggers = document.querySelectorAll('[data-modal-target]');
    var backdrops = document.querySelectorAll('.retro-modal-backdrop');

    modalTriggers.forEach(function (trigger) {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        var targetId = trigger.getAttribute('data-modal-target');
        var modal = document.getElementById(targetId);
        if (modal) openModal(modal);
      });
    });

    backdrops.forEach(function (backdrop) {
      backdrop.addEventListener('click', function (e) {
        if (e.target === backdrop) {
          closeModal(backdrop);
        }
      });

      var closeButtons = backdrop.querySelectorAll('.retro-modal-close, .retro-modal-close-icon, [data-modal-close]');
      closeButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          closeModal(backdrop);
        });
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        backdrops.forEach(function (backdrop) {
          if (backdrop.classList.contains('is-active')) {
            closeModal(backdrop);
          }
        });
      }
    });
  }

  /* ==========================================================
     8. ANALÍTICA Y MEDICIÓN DE CONVERSIÓN
     ========================================================== */
  var analyticsLoaded = false;

  function loadAnalytics() {
    if (analyticsLoaded) return;
    analyticsLoaded = true;

    // Inicialización dinámica y respetuosa de Google Analytics 4
    if (ANALYTICS_CONFIG.gaMeasurementId && !window.gtag) {
      var script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=' + ANALYTICS_CONFIG.gaMeasurementId;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag() { window.dataLayer.push(arguments); }
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', ANALYTICS_CONFIG.gaMeasurementId, {
        anonymize_ip: true,
        cookie_flags: 'SameSite=None;Secure'
      });
    }
  }

  function trackEvent(eventName, params) {
    try {
      if (window.gtag) {
        window.gtag('event', eventName, params || {});
      }
      if (window.SZ_DEBUG) {
        console.log('[SZ Analytics Event]', eventName, params);
      }
    } catch (e) {}
  }

  function initAnalyticsAndTracking() {
    // Rastrear todos los clics a WhatsApp categorizados por sección
    var waButtons = document.querySelectorAll('.wa-cta, a[href*="wa.me"]');
    waButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var testId = btn.getAttribute('data-testid') || 'unknown';
        var label = btn.textContent.trim().replace(/\s+/g, ' ');
        trackEvent('whatsapp_click', {
          cta_id: testId,
          cta_label: label,
          page_location: window.location.href
        });
      });
    });
  }

  /* ==========================================================
     9. FORMULARIO DE CONSULTA RÁPIDA (CON HONEYPOT ANTISPAM)
     ========================================================== */
  function initContactForm() {
    var form = document.getElementById('quickQuoteForm');
    var feedback = document.getElementById('formFeedback');

    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var honeypot = form.querySelector('[name="_sz_antispam_hp"]');
      if (honeypot && honeypot.value.trim() !== '') {
        console.warn('Spam detectado por trampa honeypot.');
        if (feedback) {
          feedback.textContent = 'Mensaje recibido correctamente.';
          feedback.className = 'form-feedback is-success';
        }
        form.reset();
        return;
      }

      var nameInput = form.querySelector('[name="nombre"]');
      var telInput = form.querySelector('[name="telefono"]');
      var serviceSelect = form.querySelector('[name="servicio"]');
      var messageInput = form.querySelector('[name="mensaje"]');

      var name = nameInput ? nameInput.value.trim() : '';
      var tel = telInput ? telInput.value.trim() : '';
      var service = serviceSelect ? serviceSelect.value : '';
      var message = messageInput ? messageInput.value.trim() : '';

      if (!name || !tel || !message) {
        if (feedback) {
          feedback.textContent = 'Por favor completá los campos obligatorios (*).';
          feedback.className = 'form-feedback is-error';
        }
        return;
      }

      // Mensaje estructurado para WhatsApp
      var waMessage = 'Hola SZ Mantenimiento! Mi nombre es ' + name +
        (tel ? ' (Tel: ' + tel + ')' : '') + '.' +
        (service ? '\nServicio de interés: ' + service : '') +
        '\nConsulta: ' + message;

      var waUrl = 'https://wa.me/5493412580840?text=' + encodeURIComponent(waMessage);

      trackEvent('form_submission', {
        service_requested: service,
        has_phone: Boolean(tel)
      });

      if (feedback) {
        feedback.textContent = '¡Excelente! Abriendo WhatsApp con tus datos...';
        feedback.className = 'form-feedback is-success';
      }

      setTimeout(function () {
        window.open(waUrl, '_blank', 'noopener,noreferrer');
        form.reset();
      }, 400);
    });
  }

  /* ==========================================================
     INICIALIZACIÓN GENERAL
     ========================================================== */
  document.addEventListener('DOMContentLoaded', function () {
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    initHeader();
    initStamps(reduceMotion);
    initMaintenance(reduceMotion);
    initAssembly(reduceMotion);
    initFloatingWhatsApp();
    initCookieConsent();
    initLegalModals();
    initAnalyticsAndTracking();
    initContactForm();
    if (window.initMascot) window.initMascot(reduceMotion);
  });
})();