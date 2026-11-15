import mascotAnimated from '@assets/mascota_animada.webp';

export function MascotStrip() {
  return (
    <aside className="mascot-walk-strip" aria-label="Mascota en camino al taller SZ">
      <div className="walk-strip-content">
        <div className="walk-strip-mascot-box">
          <img
            src={mascotAnimated}
            alt="Mascota animada caminando al taller SZ"
            width={96}
            height={86}
            loading="lazy"
          />
          <div className="walk-strip-bubble">¡En marcha al taller! ⚡</div>
        </div>
        <div className="walk-strip-info">
          <span className="walk-strip-badge">SERVICIO EN ACCIÓN</span>
          <strong className="walk-strip-title">DIAGNÓSTICO PRECISO Y REPARACIÓN EN ROSARIO</strong>
          <span className="walk-strip-sub">Atención personalizada y honesta para que tu equipo vuelva a rendir al 100%.</span>
        </div>
      </div>
    </aside>
  );
}
