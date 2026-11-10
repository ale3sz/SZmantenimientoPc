/**
 * Módulo de cabecera y menú de navegación móvil.
 */
export function initHeader() {
  const header = document.getElementById('retroHeader');
  const menuToggle = document.getElementById('menuToggle');
  const retroNav = document.getElementById('retroNav');
  const iconOpen = document.getElementById('menuIconOpen');
  const iconClose = document.getElementById('menuIconClose');

  if (!header || !menuToggle || !retroNav) return;

  let isOpen = false;

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
