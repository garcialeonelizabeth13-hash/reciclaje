<template>
  <div class="categories-view">
    <div class="container">
      <!-- Header -->
      <header class="page-header">
        <h1>Categorías</h1>
        <p>Explora todas las categorías de noticias disponibles</p>
      </header>

      <!-- Loading -->
      <div v-if="loading" class="loading">Cargando categorías...</div>

      <!-- No Content -->
      <div v-else-if="categories.length === 0" class="no-content">
        <p>📭 No hay categorías disponibles</p>
      </div>

      <!-- Categories Grid -->
      <div v-else class="categories-grid">
        <router-link
          v-for="category in categories"
          :key="category.id"
          :to="`/articles?category=${category.id}`"
          class="category-item"
        >
          <div class="category-card">
            <h3>{{ category.title }}</h3>
            <p v-if="category.description" class="description">{{ category.description }}</p>
            <span class="article-count">{{ getArticleCount(category.id) }} noticias</span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { categoriesService } from '../services/categories'
import { articlesService } from '../services/articles'
import type { Category, Article } from '../types'

const categories = ref<Category[]>([])
const articles = ref<Article[]>([])
const loading = ref(false)

onMounted(async () => {
  await loadCategories()
  await loadArticles()
})

const loadCategories = async () => {
  loading.value = true
  try {
    categories.value = await categoriesService.getAll(0, 100)
  } catch (err) {
    console.error('Error loading categories:', err)
  } finally {
    loading.value = false
  }
}

const loadArticles = async () => {
  try {
    articles.value = await articlesService.getAll(0, 500)
  } catch (err) {
    console.error('Error loading articles:', err)
  }
}

const getArticleCount = (categoryId: number): number => {
  return articles.value.filter((a) => a.catid === categoryId).length
}
</script>

<style scoped>
.categories-view {
  min-height: 100vh;
  background: #f8f9fa;
  padding: 40px 0;
  margin-top: 80px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 50px;
}

.page-header h1 {
  font-size: 3rem;
  font-weight: 800;
  color: #003399;
  margin-bottom: 15px;
}

.page-header p {
  font-size: 1.1rem;
  color: #666;
}

/* Grid */
.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
}

.category-item {
  text-decoration: none;
}

.category-card {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.category-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(0, 51, 153, 0.15);
  background: linear-gradient(135deg, #f0f4ff 0%, #fff5f9 100%);
}

.category-card h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #003399;
  margin: 0;
}

.description {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0;
}

.article-count {
  font-size: 0.9rem;
  color: #999;
  font-weight: 600;
}

/* States */
.loading,
.no-content {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 8px;
  font-size: 1.1rem;
  color: #666;
}

@media (max-width: 768px) {
  .categories-view {
    margin-top: 80px;
  }

  .page-header h1 {
    font-size: 2rem;
  }

  .categories-grid {
    grid-template-columns: 1fr;
  }
}
</style>
