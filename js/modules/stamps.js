/**
 * Módulo de sellos con efecto de impacto al hacer scroll.
 */
export function initStamps() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!('IntersectionObserver' in window) || reduceMotion) return;

  const stampObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-stamped');
        stampObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  const heroStamp = document.querySelector('.hero-stamp');
  const servicesStamp = document.querySelector('.services-stamp');

  if (heroStamp) stampObs.observe(heroStamp);
  if (servicesStamp) stampObs.observe(servicesStamp);
}
