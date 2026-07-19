<template>
  <section class="hero">
    <div class="hero__overlay"></div>
    <div class="hero__content">
      <span class="hero__badge">♻️ Empresa de Reciclaje</span>
      <h1 class="hero__title">
        Transformamos <span class="hero__title--green">residuos</span><br />
        en recursos valiosos
      </h1>
      <p class="hero__subtitle">
        Somos líderes en la recolección, clasificación y reciclaje de productos. Juntos construimos
        un planeta más limpio y sostenible.
      </p>
      <div class="hero__actions">
        <a href="#contacto" class="btn btn--primary">Contáctanos</a>
        <a href="#servicios" class="btn btn--outline">Nuestros Servicios</a>
      </div>
      <div class="hero__stats">
        <div class="hero__stat">
          <strong>+{{ animatedStats.tons }}</strong>
          <span>Toneladas recicladas</span>
        </div>
        <div class="hero__stat">
          <strong>+{{ animatedStats.companies }}</strong>
          <span>Empresas aliadas</span>
        </div>
        <div class="hero__stat">
          <strong>{{ animatedStats.years }}+</strong>
          <span>Años de experiencia</span>
        </div>
      </div>
    </div>
    <div class="hero__image">
      <div class="hero__image-circle">
        <span class="hero__icon">♻️</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const animatedStats = ref({
  tons: 0,
  companies: 0,
  years: 0,
})

const targetStats = {
  tons: 500,
  companies: 200,
  years: 10,
}

const animateValue = (
  key: keyof typeof animatedStats.value,
  start: number,
  end: number,
  duration: number,
) => {
  const startTime = performance.now()

  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    // Ease out cubic para una animación más suave
    const easeOut = 1 - Math.pow(1 - progress, 3)

    animatedStats.value[key] = Math.floor(start + (end - start) * easeOut)

    if (progress < 1) {
      requestAnimationFrame(animate)
    } else {
      animatedStats.value[key] = end
    }
  }

  requestAnimationFrame(animate)
}

onMounted(() => {
  // Pequeño delay antes de iniciar las animaciones
  setTimeout(() => {
    animateValue('tons', 0, targetStats.tons, 2000)
    animateValue('companies', 0, targetStats.companies, 2200)
    animateValue('years', 0, targetStats.years, 1800)
  }, 300)
})
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #0a2e1a 0%, #1a5c32 50%, #0d3d20 100%);
  overflow: hidden;
  padding: 100px 2rem 4rem;
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 70% 50%, rgba(46, 213, 115, 0.15) 0%, transparent 60%);
}

.hero__content {
  position: relative;
  z-index: 2;
  max-width: 640px;
  flex: 1;
}

.hero__badge {
  display: inline-block;
  background: rgba(46, 213, 115, 0.2);
  border: 1px solid rgba(46, 213, 115, 0.4);
  color: #2ed573;
  padding: 6px 16px;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  margin-bottom: 1.5rem;
}

.hero__title {
  font-size: clamp(2.2rem, 5vw, 3.8rem);
  font-weight: 800;
  color: #ffffff;
  line-height: 1.15;
  margin-bottom: 1.5rem;
}

.hero__title--green {
  color: #2ed573;
}

.hero__subtitle {
  font-size: 1.15rem;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.7;
  margin-bottom: 2.5rem;
  max-width: 520px;
}

.hero__actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 3rem;
}

.btn {
  padding: 14px 32px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.btn--primary {
  background: #2ed573;
  color: #0a2e1a;
  border: 2px solid #2ed573;
}

.btn--primary:hover {
  background: #26c065;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(46, 213, 115, 0.4);
}

.btn--outline {
  background: transparent;
  color: #ffffff;
  border: 2px solid rgba(255, 255, 255, 0.4);
}

.btn--outline:hover {
  border-color: #2ed573;
  color: #2ed573;
  transform: translateY(-2px);
}

.hero__stats {
  display: flex;
  gap: 2.5rem;
  flex-wrap: wrap;
}

.hero__stat {
  display: flex;
  flex-direction: column;
}

.hero__stat strong {
  font-size: 1.8rem;
  font-weight: 800;
  color: #2ed573;
  line-height: 1;
}

.hero__stat span {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 4px;
}

.hero__image {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.hero__image-circle {
  width: 380px;
  height: 380px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(46, 213, 115, 0.25) 0%, rgba(46, 213, 115, 0.05) 70%);
  border: 2px solid rgba(46, 213, 115, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulse 4s ease-in-out infinite;
}

.hero__icon {
  font-size: 10rem;
  animation: spin 20s linear infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(46, 213, 115, 0.2);
  }
  50% {
    transform: scale(1.03);
    box-shadow: 0 0 60px 20px rgba(46, 213, 115, 0.1);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 900px) {
  .hero {
    flex-direction: column;
    text-align: center;
    padding: 120px 1.5rem 4rem;
  }

  .hero__subtitle {
    margin: 0 auto 2.5rem;
  }
  .hero__actions {
    justify-content: center;
  }
  .hero__stats {
    justify-content: center;
  }
  .hero__image {
    margin-top: 3rem;
  }
  .hero__image-circle {
    width: 260px;
    height: 260px;
  }
  .hero__icon {
    font-size: 7rem;
  }
}
</style>
