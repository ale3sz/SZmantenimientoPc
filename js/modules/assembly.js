/**
 * Módulo de la lámina animada de armado (video en loop al estar en pantalla).
 */
export function initAssembly() {
  const videoEl = document.getElementById('assemblyVideo');
  if (!videoEl) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    videoEl.pause();
    videoEl.removeAttribute('autoplay');
    return;
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        videoEl.play().catch(function () {});
      } else {
        videoEl.pause();
      }
    }, { threshold: 0.15 });

    observer.observe(videoEl);
  }
}
