<template>
  <section class="page-hero">
    <div class="page-hero-content">
      <h1 class="page-hero-title">{{ title }}</h1>
      <p class="page-hero-subtitle">{{ subtitle }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  title: string
  subtitle: string
}

defineProps<Props>()
</script>

<style scoped>
.page-hero {
  background: linear-gradient(135deg, #003399 0%, #002266 100%);
  color: #fff;
  padding: 6rem 1.5rem;
  text-align: center;
  margin-top: 80px;
}

.page-hero-content {
  max-width: 1200px;
  margin: 0 auto;
}

.page-hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin: 0 0 1rem;
  line-height: 1.2;
}

.page-hero-subtitle {
  font-size: 1.2rem;
  margin: 0;
  color: rgba(255, 255, 255, 0.9);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 768px) {
  .page-hero {
    padding: 3rem 1.5rem;
    margin-top: 70px;
  }

  .page-hero-title {
    font-size: 2rem;
  }

  .page-hero-subtitle {
    font-size: 1rem;
  }
}
</style>
