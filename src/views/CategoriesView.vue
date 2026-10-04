<template>
  <div class="categories-view">
    <div class="container">
      <h1>🏷️ Categorías</h1>

      <div v-if="loading" class="loading">Cargando categorías...</div>
      <div v-else-if="error" class="error">⚠️ {{ error }}</div>

      <div v-else class="categories-grid">
        <router-link
          v-for="cat in categories"
          :key="cat.id"
          :to="`/articles?category=${cat.id}`"
          class="category-card"
        >
          <h3>{{ cat.title }}</h3>
          <p v-if="cat.description" class="description">{{ cat.description }}</p>
          <p class="article-count">{{ getCategoryCount(cat.id) }} artículos</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useCategories } from '../composables/useCategories'

const { categories, loading, error, fetchCategories, fetchCategoryCount } = useCategories()
const categoryCount = ref<Record<number, number>>({})

onMounted(async () => {
  await fetchCategories()
  loadCategoryCounts()
})

const loadCategoryCounts = async () => {
  for (const cat of categories.value) {
    const result = await fetchCategoryCount(cat.id)
    if (result) {
      categoryCount.value[cat.id] = result.article_count
    }
  }
}

const getCategoryCount = (catId: number): number => {
  return categoryCount.value[catId] || 0
}
</script>

<style scoped>
.categories-view {
  padding: 40px 0;
  background: #f5f5f5;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #333;
}

.loading,
.error {
  text-align: center;
  padding: 40px;
  background: white;
  border-radius: 8px;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.category-card {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  border-left: 4px solid #1976d2;
}

.category-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.category-card h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #333;
}

.category-card .description {
  color: #666;
  margin-bottom: 15px;
  flex-grow: 1;
  font-size: 0.95rem;
  line-height: 1.4;
}

.category-card .article-count {
  color: #1976d2;
  font-weight: 600;
  margin: 0;
}

@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }

  .categories-grid {
    grid-template-columns: 1fr;
  }
}
</style>
