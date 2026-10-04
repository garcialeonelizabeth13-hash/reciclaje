<template>
  <div class="articles-view">
    <div class="container">
      <!-- Header -->
      <header class="page-header">
        <h1>Noticias</h1>
        <p>Accede a todas las noticias e información del observatorio</p>
      </header>

      <!-- Filtros -->
      <div class="filters-section">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="🔍 Buscar noticias..."
          class="search-input"
          @keyup.debounce="performSearch"
        />

        <select v-model="selectedCategory" class="category-filter" @change="filterByCategory">
          <option value="">Todas las categorías</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.title }}
          </option>
        </select>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="loading">Cargando noticias...</div>

      <!-- No Content -->
      <div v-else-if="articles.length === 0" class="no-content">
        <p>📭 No hay noticias disponibles</p>
      </div>

      <!-- Articles List -->
      <div v-else class="articles-list">
        <article-card v-for="article in articles" :key="article.id" :article="article" />
      </div>

      <!-- Pagination -->
      <div v-if="articles.length > 0 && hasMore" class="pagination">
        <button @click="loadMore" class="btn-load-more">Cargar más noticias</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { articlesService } from '../services/articles'
import { categoriesService } from '../services/categories'
import ArticleCard from '../components/ArticleCard.vue'
import type { Article, Category } from '../types'

const articles = ref<Article[]>([])
const categories = ref<Category[]>([])
const searchQuery = ref('')
const selectedCategory = ref<number | ''>('')
const loading = ref(false)
const currentPage = ref(0)
const pageSize = ref(20)
const hasMore = ref(true)

onMounted(async () => {
  await fetchCategories()
  await fetchArticles()
})

const fetchCategories = async () => {
  try {
    categories.value = await categoriesService.getAll(0, 100)
  } catch (err) {
    console.error('Error loading categories:', err)
  }
}

const fetchArticles = async () => {
  loading.value = true
  try {
    const skip = currentPage.value * pageSize.value

    let result: Article[]
    if (selectedCategory.value) {
      result = await articlesService.getByCategory(
        selectedCategory.value as number,
        skip,
        pageSize.value,
      )
    } else {
      result = await articlesService.getAll(skip, pageSize.value)
    }

    if (currentPage.value === 0) {
      articles.value = result
    } else {
      articles.value.push(...result)
    }

    hasMore.value = result.length === pageSize.value
  } catch (err) {
    console.error('Error loading articles:', err)
  } finally {
    loading.value = false
  }
}

const filterByCategory = async () => {
  currentPage.value = 0
  await fetchArticles()
}

const performSearch = async () => {
  if (searchQuery.value.trim().length === 0) {
    currentPage.value = 0
    await fetchArticles()
  }
  // La búsqueda completa se implementaría aquí si es necesario
}

const loadMore = async () => {
  currentPage.value++
  await fetchArticles()
}
</script>

<style scoped>
.articles-view {
  min-height: 100vh;
  background: #f8f9fa;
  padding: 40px 0;
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

/* Filters */
.filters-section {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 15px;
  margin-bottom: 40px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.search-input,
.category-filter {
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  font-family: inherit;
}

.search-input:focus,
.category-filter:focus {
  outline: none;
  border-color: #003399;
  box-shadow: 0 0 0 3px rgba(0, 51, 153, 0.1);
}

/* Articles List */
.articles-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
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

/* Pagination */
.pagination {
  text-align: center;
  margin: 60px 0 40px;
}

.btn-load-more {
  background: #003399;
  color: white;
  border: none;
  padding: 14px 40px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-load-more:hover {
  background: #002266;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 51, 153, 0.3);
}

@media (max-width: 768px) {
  .page-header h1 {
    font-size: 2rem;
  }

  .filters-section {
    grid-template-columns: 1fr;
  }

  .articles-list {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>
