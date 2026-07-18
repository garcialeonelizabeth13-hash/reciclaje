<template>
  <section class="stats">
    <div class="container">
      <div class="stats__grid">
        <div v-for="stat in stats" :key="stat.id" class="stat-item">
          <span class="stat-item__icon">{{ stat.icon }}</span>
          <strong class="stat-item__number">{{ stat.number }}</strong>
          <span class="stat-item__label">{{ stat.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const stats = [
  { id: 1, icon: '♻️', number: '+500 ton', label: 'Recicladas al mes' },
  { id: 2, icon: '🏢', number: '+200', label: 'Empresas atendidas' },
  { id: 3, icon: '🌳', number: '+1,200', label: 'Árboles salvados' },
  { id: 4, icon: '👥', number: '+5,000', label: 'Familias beneficiadas' },
]
</script>

<style scoped>
.stats {
  background: linear-gradient(135deg, #0a2e1a, #1a5c32);
  padding: 5rem 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.stats__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  text-align: center;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 2rem 1rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(46, 213, 115, 0.2);
  transition: transform 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-4px);
  background: rgba(46, 213, 115, 0.1);
}

.stat-item__icon {
  font-size: 2.5rem;
}

.stat-item__number {
  font-size: 2.2rem;
  font-weight: 800;
  color: #2ed573;
  line-height: 1;
}

.stat-item__label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}
</style>
