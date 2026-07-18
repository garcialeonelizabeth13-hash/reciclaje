<template>
  <section class="about-hero">
    <div class="about-hero__overlay"></div>
    <div class="container">
      <div class="about-hero__content">
        <span class="section-badge">Quiénes Somos</span>
        <h1 class="about-hero__title">
          Más de <span class="about-hero__title--green">10 años</span><br />
          cuidando el planeta
        </h1>
        <p class="about-hero__text">
          Somos una empresa líder en gestión integral de residuos y reciclaje.
          Nacimos con la convicción de que los residuos no son basura,
          sino recursos que esperan una segunda oportunidad.
        </p>
        <div class="about-hero__chips">
          <span class="chip">🏆 Certificados ISO 14001</span>
          <span class="chip">🌍 Operamos en 5 ciudades</span>
          <span class="chip">♻️ +500 ton/mes recicladas</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-hero {
  position: relative;
  background: linear-gradient(135deg, #0a2e1a 0%, #1a5c32 60%, #0d3d20 100%);
  padding: 130px 2rem 7rem;
  overflow: hidden;
}

.about-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 80% 40%, rgba(46, 213, 115, 0.15) 0%, transparent 60%);
}

.about-hero::after {
  content: '♻️';
  position: absolute;
  right: 8%;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16rem;
  opacity: 0.06;
  line-height: 1;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.about-hero__content {
  max-width: 680px;
}

.section-badge {
  display: inline-block;
  background: rgba(46, 213, 115, 0.2);
  border: 1px solid rgba(46, 213, 115, 0.4);
  color: #2ed573;
  padding: 6px 16px;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.about-hero__title {
  font-size: clamp(2rem, 4.5vw, 3.5rem);
  font-weight: 800;
  color: #ffffff;
  line-height: 1.15;
  margin-bottom: 1.5rem;
}

.about-hero__title--green {
  color: #2ed573;
}

.about-hero__text {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.75;
  margin-bottom: 2.5rem;
  max-width: 560px;
}

.about-hero__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.chip {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(46, 213, 115, 0.3);
  color: rgba(255, 255, 255, 0.85);
  padding: 8px 18px;
  border-radius: 50px;
  font-size: 0.88rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .about-hero { text-align: center; }
  .about-hero__text { margin: 0 auto 2.5rem; }
  .about-hero__chips { justify-content: center; }
}
</style>
