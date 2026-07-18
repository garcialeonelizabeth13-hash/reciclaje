<template>
  <section class="process" id="proceso">
    <div class="container">
      <div class="section-header">
        <span class="section-badge">Nuestro Proceso</span>
        <h2 class="section-title">¿Cómo trabajamos?</h2>
        <p class="section-subtitle">
          Un proceso claro, eficiente y comprometido con el medio ambiente
          desde la recolección hasta la transformación final.
        </p>
      </div>

      <div class="process__steps">
        <div v-for="(step, index) in steps" :key="step.id" class="process__step">
          <div class="process__step-number">{{ index + 1 }}</div>
          <div class="process__step-icon">{{ step.icon }}</div>
          <h3 class="process__step-title">{{ step.title }}</h3>
          <p class="process__step-desc">{{ step.description }}</p>
          <div v-if="index < steps.length - 1" class="process__arrow">→</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const steps = [
  {
    id: 1,
    icon: '📞',
    title: 'Solicitud',
    description: 'El cliente contacta para programar la recolección o entrega de materiales reciclables.',
  },
  {
    id: 2,
    icon: '🚛',
    title: 'Recolección',
    description: 'Nuestra flota de vehículos pasa a recoger los residuos en el punto acordado.',
  },
  {
    id: 3,
    icon: '🔍',
    title: 'Clasificación',
    description: 'Separamos y clasificamos los materiales por tipo: papel, plástico, vidrio, metal.',
  },
  {
    id: 4,
    icon: '⚙️',
    title: 'Procesamiento',
    description: 'Los materiales clasificados se transforman en materia prima para la industria.',
  },
  {
    id: 5,
    icon: '🌍',
    title: 'Impacto',
    description: 'Los materiales reciclados vuelven al ciclo productivo reduciendo el impacto ambiental.',
  },
]
</script>

<style scoped>
.process {
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
  max-width: 580px;
  margin: 0 auto;
  line-height: 1.7;
}

.process__steps {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 0;
  flex-wrap: wrap;
  position: relative;
}

.process__step {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1;
  min-width: 160px;
  max-width: 220px;
  padding: 0 1rem;
}

.process__step-number {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #2ed573;
  color: #0a2e1a;
  font-weight: 800;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  flex-shrink: 0;
}

.process__step-icon {
  font-size: 2.8rem;
  margin-bottom: 1rem;
}

.process__step-title {
  font-size: 1rem;
  font-weight: 700;
  color: #0a2e1a;
  margin-bottom: 0.6rem;
}

.process__step-desc {
  font-size: 0.85rem;
  color: #666;
  line-height: 1.6;
}

.process__arrow {
  position: absolute;
  top: 30px;
  right: -18px;
  font-size: 1.5rem;
  color: #2ed573;
  font-weight: 700;
  z-index: 2;
}

@media (max-width: 768px) {
  .process__steps {
    flex-direction: column;
    align-items: center;
  }

  .process__arrow {
    display: none;
  }

  .process__step {
    max-width: 100%;
    padding: 1rem;
  }
}
</style>
