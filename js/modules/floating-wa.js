/**
 * Módulo del botón flotante de WhatsApp.
 * Aparece luego del Hero y se oculta cuando se llega a la sección de Contacto.
 */
export function initFloatingWhatsApp() {
  const floating = document.getElementById('floatingWa');
  const heroActions = document.getElementById('heroActions');
  const contact = document.getElementById('contacto');

  if (!floating) return;

  if ('IntersectionObserver' in window && heroActions && contact) {
    const state = { hero: true, contact: false };

    function update() {
      floating.classList.toggle('is-hidden', state.hero || state.contact);
    }

    const obsHero = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        state.hero = entry.isIntersecting;
      });
      update();
    }, { threshold: 0.15 });

    const obsContact = new IntersectionObserver(function (entries) {
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
