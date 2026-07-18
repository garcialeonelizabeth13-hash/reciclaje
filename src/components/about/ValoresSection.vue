<template>
  <section class="valores">
    <div class="container">
      <div class="section-header">
        <span class="section-badge">Nuestros Valores</span>
        <h2 class="section-title">Los principios que nos guían</h2>
        <p class="section-subtitle">
          Cada decisión que tomamos está respaldada por valores que ponen
          al planeta y a las personas en el centro.
        </p>
      </div>

      <div class="valores__grid">
        <div v-for="valor in valores" :key="valor.id" class="valor-card">
          <div class="valor-card__icon">{{ valor.icon }}</div>
          <h3 class="valor-card__title">{{ valor.title }}</h3>
          <p class="valor-card__desc">{{ valor.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const valores = [
  {
    id: 1,
    icon: '🌱',
    title: 'Sostenibilidad',
    description: 'Cada acción está pensada para preservar los recursos naturales y reducir la huella ambiental de nuestras operaciones.',
  },
  {
    id: 2,
    icon: '🤝',
    title: 'Compromiso',
    description: 'Cumplimos lo que prometemos, tanto a nuestros clientes como al medioambiente y las comunidades que servimos.',
  },
  {
    id: 3,
    icon: '💡',
    title: 'Innovación',
    description: 'Buscamos constantemente nuevas tecnologías y procesos que mejoren la eficiencia del reciclaje y minimicen los residuos.',
  },
  {
    id: 4,
    icon: '⚖️',
    title: 'Transparencia',
    description: 'Reportamos con honestidad el impacto ambiental generado y los resultados obtenidos en cada operación.',
  },
  {
    id: 5,
    icon: '👨‍👩‍👧‍👦',
    title: 'Comunidad',
    description: 'Generamos empleos dignos y trabajamos junto a las comunidades locales para crear conciencia ambiental.',
  },
  {
    id: 6,
    icon: '🏅',
    title: 'Calidad',
    description: 'Operamos bajo estándares internacionales que garantizan un procesamiento de residuos seguro, eficiente y certificado.',
  },
]
</script>

<style scoped>
.valores {
  padding: 6rem 2rem;
  background: #ffffff;
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
  max-width: 560px;
  margin: 0 auto;
  line-height: 1.7;
}

.valores__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.8rem;
}

.valor-card {
  background: #f8fdf9;
  border-radius: 16px;
  padding: 2.2rem 2rem;
  border: 1px solid rgba(46, 213, 115, 0.12);
  transition: all 0.3s ease;
  text-align: center;
}

.valor-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 16px 40px rgba(46, 213, 115, 0.12);
  border-color: rgba(46, 213, 115, 0.3);
  background: #ffffff;
}

.valor-card__icon {
  font-size: 2.8rem;
  margin-bottom: 1rem;
}

.valor-card__title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #0a2e1a;
  margin-bottom: 0.7rem;
}

.valor-card__desc {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.65;
}
</style>
