<template>
  <div class="articles-view">
    <div class="container">
      <h1>📰 Artículos</h1>

      <!-- Filtros y búsqueda -->
      <div class="filters">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="🔍 Buscar artículos..."
          class="search-input"
          @keyup="performSearch"
        />
      </div>

      <!-- Estado de carga -->
      <div v-if="loading" class="loading">
        <p>Cargando artículos...</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="error">
        <p>⚠️ {{ error }}</p>
      </div>

      <!-- Artículos -->
      <div v-else class="articles-grid">
        <ArticleCard v-for="article in articles" :key="article.id" :article="article" />
      </div>

      <!-- Paginación -->
      <div v-if="articles.length > 0" class="pagination">
        <button @click="previousPage" :disabled="currentPage === 1">← Anterior</button>
        <span>Página {{ currentPage }}</span>
        <button @click="nextPage" :disabled="articles.length < pageSize">Siguiente →</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useArticles } from '../composables/useArticles'
import { useCategories } from '../composables/useCategories'
import ArticleCard from '../components/ArticleCard.vue'

const { articles, loading, error, fetchArticles, fetchByCategory } = useArticles()
const { categories, fetchCategories } = useCategories()

const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = ref(20)

onMounted(async () => {
  await fetchCategories()
  await loadArticles()
})

const loadArticles = async () => {
  const skip = (currentPage.value - 1) * pageSize.value
  await fetchArticles(skip, pageSize.value)
}

const performSearch = async () => {
  currentPage.value = 1
  if (searchQuery.value.trim()) {
    // Implementar búsqueda si es necesario
    await loadArticles()
  } else {
    await loadArticles()
  }
}

const nextPage = async () => {
  currentPage.value++
  await loadArticles()
}

const previousPage = async () => {
  if (currentPage.value > 1) {
    currentPage.value--
    await loadArticles()
  }
}
</script>

<style scoped>
.articles-view {
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

.filters {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 15px;
  margin-bottom: 30px;
}

.search-input {
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.loading,
.error {
  text-align: center;
  padding: 40px;
  background: white;
  border-radius: 8px;
}

.error {
  color: #d32f2f;
  background: #ffebee;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 40px;
}

.pagination button {
  padding: 10px 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.pagination button:hover:not(:disabled) {
  background: #1976d2;
  color: white;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .filters {
    grid-template-columns: 1fr;
  }

  .articles-grid {
    grid-template-columns: 1fr;
  }

  h1 {
    font-size: 2rem;
  }
}
</style>
