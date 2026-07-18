<template>
  <section class="mision-vision">
    <div class="container">
      <div class="mv__grid">
        <div class="mv__card mv__card--mision">
          <div class="mv__card-icon">🎯</div>
          <h2 class="mv__card-title">Nuestra Misión</h2>
          <p class="mv__card-text">
            Ofrecer soluciones integrales y sostenibles de gestión de residuos,
            fomentando una cultura de reciclaje que genere valor económico,
            social y ambiental en las comunidades donde operamos.
          </p>
          <ul class="mv__list">
            <li>✅ Recolección puntual y responsable</li>
            <li>✅ Máximo aprovechamiento de materiales</li>
            <li>✅ Cero residuos a rellenos sanitarios</li>
          </ul>
        </div>

        <div class="mv__card mv__card--vision">
          <div class="mv__card-icon">🔭</div>
          <h2 class="mv__card-title">Nuestra Visión</h2>
          <p class="mv__card-text">
            Ser la empresa de reciclaje más innovadora y confiable del país para 2030,
            liderando la transición hacia una economía circular donde ningún
            residuo termine como desperdicio.
          </p>
          <ul class="mv__list">
            <li>🌟 Expansión a 20 ciudades</li>
            <li>🌟 Tecnología de punta en procesamiento</li>
            <li>🌟 Referente en sustentabilidad nacional</li>
          </ul>
        </div>
      </div>

      <div class="historia">
        <div class="historia__text">
          <span class="section-badge">Nuestra Historia</span>
          <h2 class="historia__title">De un sueño verde a una empresa sólida</h2>
          <p>
            Fundada en 2014 por un grupo de ingenieros ambientales apasionados por el
            cuidado del planeta, comenzamos con un solo camión y la firme convicción
            de que los residuos podían convertirse en oportunidades.
          </p>
          <p>
            Hoy contamos con una flota de 30 vehículos, dos plantas de procesamiento
            y más de 150 colaboradores comprometidos con transformar la manera en que
            México gestiona sus residuos.
          </p>
        </div>
        <div class="historia__timeline">
          <div v-for="event in timeline" :key="event.year" class="timeline__item">
            <div class="timeline__year">{{ event.year }}</div>
            <div class="timeline__dot"></div>
            <div class="timeline__desc">{{ event.desc }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const timeline = [
  { year: '2014', desc: 'Fundación de la empresa con 1 camión y 5 colaboradores.' },
  { year: '2016', desc: 'Apertura de primera planta de clasificación.' },
  { year: '2018', desc: 'Certificación ISO 14001 y expansión a 3 ciudades.' },
  { year: '2021', desc: 'Lanzamiento del servicio de residuos electrónicos.' },
  { year: '2024', desc: '+200 empresas aliadas y 150 empleos directos generados.' },
]
</script>

<style scoped>
.mision-vision {
  padding: 6rem 2rem;
  background: #f8fdf9;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.mv__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 5rem;
}

.mv__card {
  border-radius: 20px;
  padding: 3rem 2.5rem;
  transition: transform 0.3s ease;
}

.mv__card:hover {
  transform: translateY(-4px);
}

.mv__card--mision {
  background: linear-gradient(135deg, #0a2e1a, #1a5c32);
  color: #ffffff;
}

.mv__card--vision {
  background: #ffffff;
  border: 2px solid rgba(46, 213, 115, 0.2);
  box-shadow: 0 8px 30px rgba(46, 213, 115, 0.08);
}

.mv__card-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.mv__card-title {
  font-size: 1.6rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

.mv__card--mision .mv__card-title { color: #2ed573; }
.mv__card--vision .mv__card-title { color: #0a2e1a; }

.mv__card-text {
  font-size: 0.97rem;
  line-height: 1.75;
  margin-bottom: 1.5rem;
}

.mv__card--mision .mv__card-text { color: rgba(255,255,255,0.8); }
.mv__card--vision .mv__card-text { color: #555; }

.mv__list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.mv__card--mision .mv__list li { color: rgba(255,255,255,0.85); font-size: 0.9rem; }
.mv__card--vision .mv__list li { color: #333; font-size: 0.9rem; }

/* Historia */
.historia {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.section-badge {
  display: inline-block;
  background: rgba(46, 213, 115, 0.15);
  color: #1a7a3c;
  padding: 6px 16px;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 1.2rem;
}

.historia__title {
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  font-weight: 800;
  color: #0a2e1a;
  margin-bottom: 1.2rem;
  line-height: 1.3;
}

.historia__text p {
  font-size: 0.97rem;
  color: #555;
  line-height: 1.75;
  margin-bottom: 1rem;
}

.historia__timeline {
  display: flex;
  flex-direction: column;
  gap: 0;
  position: relative;
  padding-left: 2rem;
}

.historia__timeline::before {
  content: '';
  position: absolute;
  left: 42px;
  top: 10px;
  bottom: 10px;
  width: 2px;
  background: linear-gradient(to bottom, #2ed573, #1a7a3c);
}

.timeline__item {
  display: grid;
  grid-template-columns: 60px 20px 1fr;
  gap: 0.8rem;
  align-items: center;
  padding: 0.8rem 0;
}

.timeline__year {
  font-weight: 800;
  color: #1a7a3c;
  font-size: 0.9rem;
  text-align: right;
}

.timeline__dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #2ed573;
  border: 3px solid #ffffff;
  box-shadow: 0 0 0 2px #2ed573;
  flex-shrink: 0;
}

.timeline__desc {
  font-size: 0.88rem;
  color: #555;
  line-height: 1.5;
}

@media (max-width: 900px) {
  .mv__grid, .historia {
    grid-template-columns: 1fr;
  }

  .historia__timeline::before {
    left: 42px;
  }
}
</style>
