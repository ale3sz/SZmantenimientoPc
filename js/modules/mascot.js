/**
 * SZ MANTENIMIENTO DE PC — MÓDULO DE LA MASCOTA ANIMADA
 * Gestiona los modos de previsualización (Hero, Divisor, Flotante WhatsApp, Todas)
 */

(function () {
  'use strict';

  var STORAGE_KEY = 'sz_mascot_preview_mode';

  function initMascot(reduceMotion) {
    var heroFrame = document.querySelector('.mascot-frame');
    var heroPicture = heroFrame ? heroFrame.querySelector('picture') : null;
    var heroImg = heroFrame ? heroFrame.querySelector('img') : null;
    var heroSource = heroFrame ? heroFrame.querySelector('source') : null;

    var walkStrip = document.getElementById('mascotWalkStrip');
    var floatingCompanion = document.getElementById('mascotFloatingCompanion');
    var switcherDock = document.getElementById('mascotSwitcherDock');
    var toggleBtn = document.getElementById('switcherToggleBtn');

    if (!heroFrame) return;

    // Guardar referencia al sello original estático
    var originalSrc = './graficas/sello_opt.jpg';
    var originalWebp = './graficas/sello.webp';
    var animatedWebp = './graficas/mascota_animada.webp';

    function setMode(mode) {
      // 1: Hero animado
      // 2: Divisor de sección
      // 3: Flotante WhatsApp
      // 'all': Todas

      var isHero = (mode === '1' || mode === 'all');
      var isStrip = (mode === '2' || mode === 'all');
      var isFloating = (mode === '3' || mode === 'all');

      // Actualizar Hero
      if (isHero) {
        heroFrame.classList.add('is-animated');
        if (heroSource) heroSource.srcset = animatedWebp;
        if (heroImg) {
          heroImg.src = animatedWebp;
          heroImg.alt = 'Mascota animada SZ Mantenimiento caminando con destornillador';
        }
      } else {
        heroFrame.classList.remove('is-animated');
        if (heroSource) heroSource.srcset = originalWebp;
        if (heroImg) {
          heroImg.src = originalSrc;
          heroImg.alt = 'Sello oficial SZ Mantenimiento';
        }
      }

      // Actualizar Divisor
      if (walkStrip) {
        walkStrip.classList.toggle('is-active', isStrip);
      }

      // Actualizar Flotante
      if (floatingCompanion) {
        floatingCompanion.classList.toggle('is-active', isFloating);
      }

      // Actualizar estado activo en los botones del dock
      if (switcherDock) {
        var pills = switcherDock.querySelectorAll('.switcher-pill');
        pills.forEach(function (pill) {
          var pillMode = pill.getAttribute('data-mascot-mode');
          pill.classList.toggle('active', pillMode === mode);
        });
      }

      try {
        localStorage.setItem(STORAGE_KEY, mode);
      } catch (e) {}
    }

    // Inicializar listeners del switcher
    if (switcherDock) {
      switcherDock.addEventListener('click', function (e) {
        var pill = e.target.closest('.switcher-pill');
        if (pill) {
          var selectedMode = pill.getAttribute('data-mascot-mode');
          setMode(selectedMode);
        }
      });

      if (toggleBtn) {
        toggleBtn.addEventListener('click', function () {
          var isCollapsed = switcherDock.classList.toggle('is-collapsed');
          toggleBtn.textContent = isCollapsed ? '+' : '—';
          toggleBtn.setAttribute('title', isCollapsed ? 'Expandir' : 'Minimizar');
        });
      }
    }

    // Modo inicial: URL param (?mascot=1|2|3|all) o localStorage o '1' por defecto
    var urlParams = new URLSearchParams(window.location.search);
    var urlMode = urlParams.get('mascot');
    var savedMode = urlMode || '1';
    if (!urlMode) {
      try {
        savedMode = localStorage.getItem(STORAGE_KEY) || '1';
      } catch (e) {}
    }

    setMode(savedMode);
  }

  // Exportar al ámbito global para main.js
  window.initMascot = initMascot;
})();
