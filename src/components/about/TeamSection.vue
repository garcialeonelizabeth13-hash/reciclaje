<template>
  <section class="team">
    <div class="container">
      <div class="section-header">
        <span class="section-badge">Nuestro Equipo</span>
        <h2 class="section-title">Las personas detrás del cambio</h2>
        <p class="section-subtitle">
          Un equipo multidisciplinario apasionado por la sostenibilidad y
          comprometido con construir un futuro más verde.
        </p>
      </div>

      <div class="team__grid">
        <div v-for="member in team" :key="member.id" class="team-card">
          <div class="team-card__avatar">{{ member.initials }}</div>
          <h3 class="team-card__name">{{ member.name }}</h3>
          <span class="team-card__role">{{ member.role }}</span>
          <p class="team-card__bio">{{ member.bio }}</p>
          <div class="team-card__socials">
            <span class="social-icon">💼</span>
            <span class="social-icon">📧</span>
          </div>
        </div>
      </div>

      <div class="team__cta">
        <p>¿Te apasiona el medio ambiente? Únete a nuestro equipo.</p>
        <a href="#contacto" class="btn btn--primary">Ver vacantes</a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const team = [
  {
    id: 1,
    initials: 'EG',
    name: 'Elizabeth García',
    role: 'CEO & Fundadora',
    bio: 'Ingeniera ambiental con 15 años de experiencia en gestión de residuos y economía circular.',
  },
  {
    id: 2,
    initials: 'RL',
    name: 'Roberto López',
    role: 'Director de Operaciones',
    bio: 'Especialista en logística y optimización de procesos industriales de reciclaje.',
  },
  {
    id: 3,
    initials: 'SM',
    name: 'Sandra Morales',
    role: 'Jefa de Consultoría Ambiental',
    bio: 'Auditora certificada ISO 14001 con experiencia en empresas de manufactura y servicios.',
  },
  {
    id: 4,
    initials: 'JR',
    name: 'Jorge Ramírez',
    role: 'Director de Tecnología',
    bio: 'Impulsa la digitalización del proceso de reciclaje con sistemas de trazabilidad de residuos.',
  },
]
</script>

<style scoped>
.team {
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
  max-width: 560px;
  margin: 0 auto;
  line-height: 1.7;
}

.team__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.team-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 2.5rem 2rem;
  text-align: center;
  border: 1px solid rgba(46, 213, 115, 0.12);
  transition: all 0.3s ease;
}

.team-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 50px rgba(46, 213, 115, 0.12);
  border-color: rgba(46, 213, 115, 0.3);
}

.team-card__avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2ed573, #1a5c32);
  color: #ffffff;
  font-size: 1.6rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.2rem;
}

.team-card__name {
  font-size: 1.1rem;
  font-weight: 700;
  color: #0a2e1a;
  margin-bottom: 0.3rem;
}

.team-card__role {
  display: inline-block;
  font-size: 0.82rem;
  color: #1a7a3c;
  font-weight: 600;
  background: rgba(46, 213, 115, 0.12);
  padding: 3px 12px;
  border-radius: 50px;
  margin-bottom: 1rem;
}

.team-card__bio {
  font-size: 0.88rem;
  color: #666;
  line-height: 1.65;
  margin-bottom: 1.2rem;
}

.team-card__socials {
  display: flex;
  justify-content: center;
  gap: 0.6rem;
}

.social-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.social-icon:hover {
  background: rgba(46, 213, 115, 0.2);
}

.team__cta {
  text-align: center;
  padding: 3rem;
  background: linear-gradient(135deg, #0a2e1a, #1a5c32);
  border-radius: 20px;
  color: #ffffff;
}

.team__cta p {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  color: rgba(255,255,255,0.85);
}

.btn--primary {
  display: inline-block;
  padding: 14px 36px;
  background: #2ed573;
  color: #0a2e1a;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn--primary:hover {
  background: #26c065;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(46, 213, 115, 0.4);
}
</style>
