<template>
  <section class="testimonials" id="testimonios">
    <div class="container">
      <div class="section-header">
        <span class="section-badge">Testimonios</span>
        <h2 class="section-title">Lo que dicen nuestros clientes</h2>
      </div>

      <div class="testimonials__grid">
        <div v-for="testimonial in testimonials" :key="testimonial.id" class="testimonial-card">
          <div class="testimonial-card__stars">⭐⭐⭐⭐⭐</div>
          <p class="testimonial-card__text">"{{ testimonial.text }}"</p>
          <div class="testimonial-card__author">
            <div class="testimonial-card__avatar">{{ testimonial.initials }}</div>
            <div>
              <strong>{{ testimonial.name }}</strong>
              <span>{{ testimonial.company }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const testimonials = [
  {
    id: 1,
    text: 'Excelente servicio. Implementaron nuestro programa de reciclaje en tiempo récord. El equipo es muy profesional y comprometido.',
    name: 'María González',
    company: 'Directora de Operaciones, EcoFabrica S.A.',
    initials: 'MG',
  },
  {
    id: 2,
    text: 'Gracias a su consultoría ambiental logramos certificarnos y reducir nuestros costos operativos. Muy recomendados.',
    name: 'Carlos Mendoza',
    company: 'Gerente General, Industrias Verde',
    initials: 'CM',
  },
  {
    id: 3,
    text: 'El servicio de recolección es puntual y el reporte mensual que envían nos ayuda a mostrar nuestro impacto ambiental.',
    name: 'Ana Ramírez',
    company: 'Responsable RSE, Grupo Comercial Norte',
    initials: 'AR',
  },
]
</script>

<style scoped>
.testimonials {
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
}

.testimonials__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.testimonial-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 2.5rem;
  border: 1px solid rgba(46, 213, 115, 0.15);
  transition: all 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(46, 213, 115, 0.12);
}

.testimonial-card__stars {
  font-size: 1rem;
  margin-bottom: 1rem;
}

.testimonial-card__text {
  font-size: 0.95rem;
  color: #444;
  line-height: 1.7;
  font-style: italic;
  margin-bottom: 1.5rem;
}

.testimonial-card__author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.testimonial-card__avatar {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2ed573, #1a7a3c);
  color: #ffffff;
  font-weight: 700;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.testimonial-card__author strong {
  display: block;
  font-size: 0.95rem;
  color: #0a2e1a;
}

.testimonial-card__author span {
  font-size: 0.8rem;
  color: #888;
}
</style>
