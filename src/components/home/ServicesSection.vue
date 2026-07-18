<template>
  <section class="services" id="servicios">
    <div class="container">
      <div class="section-header">
        <span class="section-badge">Nuestros Servicios</span>
        <h2 class="section-title">¿Qué hacemos por el planeta?</h2>
        <p class="section-subtitle">
          Ofrecemos soluciones integrales de reciclaje para empresas y hogares,
          contribuyendo a una economía circular y sostenible.
        </p>
      </div>

      <div class="services__grid">
        <div v-for="service in services" :key="service.id" class="service-card">
          <div class="service-card__icon">{{ service.icon }}</div>
          <h3 class="service-card__title">{{ service.title }}</h3>
          <p class="service-card__desc">{{ service.description }}</p>
          <a href="#contacto" class="service-card__link">Saber más →</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const services = [
  {
    id: 1,
    icon: '🗂️',
    title: 'Recolección de Residuos',
    description: 'Servicio de recolección programada en empresas, industrias y hogares. Contamos con flota propia y personal capacitado.',
  },
  {
    id: 2,
    icon: '🔄',
    title: 'Clasificación y Separación',
    description: 'Separamos y clasificamos papel, cartón, plástico, vidrio, metales y residuos electrónicos para su correcto tratamiento.',
  },
  {
    id: 3,
    icon: '🏭',
    title: 'Procesamiento Industrial',
    description: 'Transformamos los materiales reciclados en materia prima secundaria lista para reintegrarse al ciclo productivo.',
  },
  {
    id: 4,
    icon: '🌿',
    title: 'Reciclaje Orgánico',
    description: 'Compostaje y tratamiento de residuos orgánicos para la producción de abono natural y biogás.',
  },
  {
    id: 5,
    icon: '💻',
    title: 'Residuos Electrónicos',
    description: 'Gestión responsable de e-waste: computadoras, celulares y electrodomésticos con certificación ambiental.',
  },
  {
    id: 6,
    icon: '📋',
    title: 'Consultoría Ambiental',
    description: 'Asesoramos a empresas en la implementación de programas de gestión de residuos y certificaciones ambientales.',
  },
]
</script>

<style scoped>
.services {
  padding: 6rem 2rem;
  background: #f8fdf9;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-badge {
  display: inline-block;
  background: rgba(46, 213, 115, 0.15);
  color: #1a7a3c;
  padding: 6px 16px;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.section-title {
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  font-weight: 800;
  color: #0a2e1a;
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.05rem;
  color: #555;
  max-width: 580px;
  margin: 0 auto;
  line-height: 1.7;
}

.services__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.service-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 2.5rem 2rem;
  border: 1px solid rgba(46, 213, 115, 0.15);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #2ed573, #1a7a3c);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.service-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 50px rgba(46, 213, 115, 0.15);
  border-color: rgba(46, 213, 115, 0.3);
}

.service-card:hover::before {
  transform: scaleX(1);
}

.service-card__icon {
  font-size: 2.8rem;
  margin-bottom: 1.2rem;
}

.service-card__title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #0a2e1a;
  margin-bottom: 0.8rem;
}

.service-card__desc {
  font-size: 0.95rem;
  color: #666;
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.service-card__link {
  color: #1a7a3c;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  transition: color 0.2s;
}

.service-card__link:hover {
  color: #2ed573;
}
</style>
