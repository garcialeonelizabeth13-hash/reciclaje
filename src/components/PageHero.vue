<template>
  <section class="page-hero">
    <div class="page-hero-bg"></div>
    <div class="page-hero-content">
      <div class="hero-icon-container" v-if="icon">
        <i :class="['mdi', `mdi-${icon}`]"></i>
      </div>
      <h1 class="page-hero-title">{{ title }}</h1>
      <p class="page-hero-subtitle">{{ subtitle }}</p>
      <div class="hero-accent"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  title: string
  subtitle: string
  icon?: string
}

withDefaults(defineProps<Props>(), {
  icon: '',
})
</script>

<style scoped>
.page-hero {
  background: linear-gradient(135deg, #003399 0%, #002266 100%);
  color: #fff;
  padding: 6rem 1.5rem;
  text-align: center;
  margin-top: 80px;
  position: relative;
  overflow: hidden;
}

.page-hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
  z-index: 0;
}

.page-hero-content {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.hero-icon-container {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  display: inline-block;
  animation: float 3s ease-in-out infinite;
  line-height: 1;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.page-hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin: 0 0 1rem;
  line-height: 1.2;
  letter-spacing: -0.5px;
}

.page-hero-subtitle {
  font-size: 1.2rem;
  margin: 0 0 2rem;
  color: rgba(255, 255, 255, 0.85);
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.hero-accent {
  width: 60px;
  height: 4px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.3) 0%,
    rgba(255, 255, 255, 0.7) 50%,
    rgba(255, 255, 255, 0.3) 100%
  );
  margin: 0 auto;
  border-radius: 2px;
}

@media (max-width: 768px) {
  .page-hero {
    padding: 3.5rem 1.5rem;
    margin-top: 70px;
  }

  .hero-icon-container {
    font-size: 2.5rem;
  }

  .page-hero-title {
    font-size: 2rem;
  }

  .page-hero-subtitle {
    font-size: 1rem;
  }
}
</style>
