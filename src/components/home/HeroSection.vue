<template>
  <section class="hero">
    <div class="hero__overlay"></div>
    <div class="hero__content">
      <span class="hero__badge">♻️ Empresa Estatal Socialista</span>
      <h1 class="hero__title">
        <span class="hero__title--highlight">ISDE</span><br />
        <span class="hero__title--main">Ingeniería del Reciclaje</span>
      </h1>
      <p class="hero__subtitle">
        <strong>Grupo Empresarial del Reciclaje</strong><br />
        Transformamos residuos en recursos valiosos. Líderes en recolección, clasificación y
        reciclaje industrial para construir un futuro sostenible.
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
  background: linear-gradient(135deg, #003399 0%, #0052cc 50%, #002266 100%);
  overflow: hidden;
  padding: 100px 2rem 4rem;
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 70% 50%, rgba(40, 167, 69, 0.15) 0%, transparent 60%);
}

.hero__content {
  position: relative;
  z-index: 2;
  max-width: 640px;
  flex: 1;
}

.hero__badge {
  display: inline-block;
  background: rgba(220, 53, 69, 0.2);
  border: 1px solid rgba(220, 53, 69, 0.5);
  color: #dc3545;
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
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

.hero__title--highlight {
  color: #ffffff;
  display: block;
}

.hero__title--main {
  color: #28a745;
  display: block;
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
  background: #dc3545;
  color: #ffffff;
  border: 2px solid #dc3545;
}

.btn--primary:hover {
  background: #c82333;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(220, 53, 69, 0.4);
}

.btn--outline {
  background: transparent;
  color: #ffffff;
  border: 2px solid rgba(255, 255, 255, 0.6);
}

.btn--outline:hover {
  border-color: #28a745;
  background: rgba(40, 167, 69, 0.1);
  color: #28a745;
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
  color: #28a745;
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
  background: radial-gradient(circle, rgba(40, 167, 69, 0.25) 0%, rgba(40, 167, 69, 0.05) 70%);
  border: 2px solid rgba(40, 167, 69, 0.3);
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
    box-shadow: 0 0 0 0 rgba(40, 167, 69, 0.2);
  }
  50% {
    transform: scale(1.03);
    box-shadow: 0 0 60px 20px rgba(40, 167, 69, 0.1);
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
