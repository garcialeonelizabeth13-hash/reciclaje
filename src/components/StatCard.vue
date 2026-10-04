<template>
  <div class="stat-card">
    <div class="stat-icon">{{ icon }}</div>
    <div class="stat-content">
      <p class="stat-label">{{ label }}</p>
      <p class="stat-value">{{ value }}</p>
      <p class="stat-change" :class="{ positive: change >= 0, negative: change < 0 }">
        {{ change > 0 ? '↑' : '↓' }} {{ Math.abs(change) }}%
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  icon: string
  label: string
  value: string
  change?: number
}

withDefaults(defineProps<Props>(), {
  change: 0,
})
</script>

<style scoped>
.stat-card {
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.stat-icon {
  font-size: 2.5rem;
  min-width: 60px;
  text-align: center;
}

.stat-content {
  flex: 1;
}

.stat-label {
  margin: 0 0 0.5rem;
  font-size: 0.85rem;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
}

.stat-value {
  margin: 0 0 0.75rem;
  font-size: 2rem;
  font-weight: 700;
  color: #003399;
}

.stat-change {
  margin: 0;
  font-size: 0.85rem;
  font-weight: 600;
}

.stat-change.positive {
  color: #10b981;
}

.stat-change.negative {
  color: #ef4444;
}

@media (max-width: 768px) {
  .stat-card {
    gap: 1rem;
    padding: 1rem;
  }

  .stat-icon {
    font-size: 2rem;
  }

  .stat-value {
    font-size: 1.5rem;
  }
}
</style>
