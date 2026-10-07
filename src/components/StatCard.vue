<template>
  <div class="stat-card">
    <div class="stat-icon-wrapper">
      <i :class="['mdi', `mdi-${icon}`]"></i>
    </div>
    <div class="stat-content">
      <p class="stat-label">{{ label }}</p>
      <p class="stat-value">{{ value }}</p>
      <p class="stat-change" :class="{ positive: change >= 0, negative: change < 0 }">
        <i :class="['mdi', change > 0 ? 'mdi-trending-up' : 'mdi-trending-down']"></i>
        {{ Math.abs(change) }}%
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
  background: linear-gradient(135deg, #fff 0%, #f9fafb 100%);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 51, 153, 0.15);
  border-color: #e0e7ff;
}

.stat-icon-wrapper {
  flex-shrink: 0;
  width: 70px;
  height: 70px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e0e7ff 0%, #f0f4ff 100%);
  color: #003399;
  font-size: 2.5rem;
  line-height: 1;
}

.stat-icon-wrapper i {
  display: block;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-card:hover .stat-icon-wrapper {
  background: linear-gradient(135deg, #003399 0%, #002266 100%);
  color: #fff;
  transform: scale(1.05);
}

.stat-content {
  flex: 1;
}

.stat-label {
  margin: 0 0 0.5rem;
  font-size: 0.8rem;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
}

.stat-value {
  margin: 0 0 0.75rem;
  font-size: 2.2rem;
  font-weight: 700;
  color: #003399;
}

.stat-change {
  margin: 0;
  font-size: 0.85rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.stat-change i {
  font-size: 0.95rem;
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
    padding: 1.5rem;
  }

  .stat-icon-wrapper {
    width: 60px;
    height: 60px;
    font-size: 1.8rem;
  }

  .stat-value {
    font-size: 1.75rem;
  }
}
</style>
