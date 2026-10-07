<template>
  <Layout>
    <PageHero
      title="📰 Artículos y Noticias"
      subtitle="Descubre todas las publicaciones sobre reciclaje e impacto ambiental"
    />

    <div class="container">
      <!-- Advanced Filters Section -->
      <section class="filters-section">
        <div class="filters-header">
          <h3><i class="mdi mdi-filter"></i> Filtros de búsqueda</h3>
          <button v-if="isFiltered" @click="clearFilters" class="btn-clear">
            <i class="mdi mdi-close"></i> Limpiar filtros
          </button>
        </div>

        <div class="filters-grid">
          <div class="filter-item">
            <label>Búsqueda</label>
            <div class="search-box">
              <i class="mdi mdi-magnify"></i>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Buscar por título o contenido..."
                class="search-input"
                @input="resetPage"
              />
            </div>
          </div>

          <div class="filter-item">
            <label>Categoría</label>
            <select v-model="selectedCategory" @change="resetPage" class="select">
              <option value="">Todas las categorías</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.title }}
              </option>
            </select>
          </div>

          <div class="filter-item">
            <label>Ordenar por</label>
            <select v-model="sortBy" @change="resetPage" class="select">
              <option value="newest">Más recientes</option>
              <option value="oldest">Más antiguos</option>
              <option value="popular">Más populares</option>
            </select>
          </div>
        </div>
      </section>

      <!-- Results Info -->
      <div class="results-info" v-if="!loading && filteredArticles.length > 0">
        <span
          >📊 Se encontraron <strong>{{ filteredArticles.length }}</strong> artículos</span
        >
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Cargando artículos...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredArticles.length === 0" class="empty-state">
        <i class="mdi mdi-inbox-multiple"></i>
        <h3>No hay artículos disponibles</h3>
        <p>Intenta ajustar tus filtros de búsqueda</p>
      </div>

      <!-- Articles Grid -->
      <div v-else class="articles-grid">
        <ArticleCard v-for="article in paginatedArticles" :key="article.id" :article="article" />
      </div>

      <!-- Pagination -->
      <div v-if="filteredArticles.length > pageSize" class="pagination-section">
        <div class="pagination">
          <button v-if="currentPage > 0" @click="previousPage" class="pagination-btn">
            <i class="mdi mdi-chevron-left"></i> Anterior
          </button>

          <div class="page-info">
            Página <strong>{{ currentPage + 1 }}</strong> de <strong>{{ totalPages }}</strong>
          </div>

          <button v-if="currentPage < totalPages - 1" @click="nextPage" class="pagination-btn">
            Siguiente <i class="mdi mdi-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Layout from '../components/shared/Layout.vue'
import PageHero from '../components/PageHero.vue'
import ArticleCard from '../components/ArticleCard.vue'
import { articlesService } from '../services/articles'
import { categoriesService } from '../services/categories'
import type { Article, Category } from '../types'

const articles = ref<Article[]>([])
const categories = ref<Category[]>([])
const loading = ref(false)
const searchQuery = ref('')
const selectedCategory = ref<string>('')
const sortBy = ref('newest')
const currentPage = ref(0)
const pageSize = ref(12)

const isFiltered = computed(() => {
  return searchQuery.value !== '' || selectedCategory.value !== '' || sortBy.value !== 'newest'
})

const filteredAndSortedArticles = computed(() => {
  let result = articles.value.filter((article) => {
    const matchesSearch =
      searchQuery.value === '' ||
      article.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      article.introtext.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesCategory =
      selectedCategory.value === '' || article.catid === parseInt(selectedCategory.value)

    return matchesSearch && matchesCategory && article.state === 1
  })

  // Aplicar ordenamiento
  if (sortBy.value === 'newest') {
    result.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
  } else if (sortBy.value === 'oldest') {
    result.sort((a, b) => new Date(a.created).getTime() - new Date(b.created).getTime())
  } else if (sortBy.value === 'popular') {
    result.sort((a, b) => (b.hits || 0) - (a.hits || 0))
  }

  return result
})

const filteredArticles = computed(() => {
  return filteredAndSortedArticles.value
})

const totalPages = computed(() => {
  return Math.ceil(filteredArticles.value.length / pageSize.value)
})

const paginatedArticles = computed(() => {
  const start = currentPage.value * pageSize.value
  const end = start + pageSize.value
  return filteredArticles.value.slice(start, end)
})

const fetchArticles = async () => {
  loading.value = true
  try {
    const result = await articlesService.getAll(0, 100)
    articles.value = result
  } catch (error) {
    console.error('Error loading articles:', error)
  } finally {
    loading.value = false
  }
}

const fetchCategories = async () => {
  try {
    categories.value = await categoriesService.getAll(0, 100)
  } catch (error) {
    console.error('Error loading categories:', error)
  }
}

const resetPage = () => {
  currentPage.value = 0
}

const nextPage = () => {
  if (currentPage.value < totalPages.value - 1) {
    currentPage.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const previousPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  sortBy.value = 'newest'
  resetPage()
}

onMounted(async () => {
  await fetchCategories()
  await fetchArticles()
})
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
}

/* Filters Section */
.filters-section {
  background: linear-gradient(135deg, #f0f7f0 0%, #ffffff 50%, #f5f5f5 100%);
  padding: 2.5rem;
  border-radius: 16px;
  margin-bottom: 2rem;
  border: 2px solid #e0f0e0;
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.08);
}

.filters-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e0e0e0;
}

.filters-header h3 {
  font-size: 1.3rem;
  color: #1a472a;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.filters-header i {
  font-size: 1.5rem;
  color: #4caf50;
}

.btn-clear {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  background: linear-gradient(135deg, #ff6b6b, #ff5252);
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
  font-size: 0.9rem;
  box-shadow: 0 2px 8px rgba(255, 107, 107, 0.2);
}

.btn-clear:hover {
  background: linear-gradient(135deg, #ff5252, #ff3333);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
}

.filters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

.filter-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-item label {
  font-size: 0.9rem;
  color: #1a472a;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-box i {
  position: absolute;
  left: 1rem;
  color: #4caf50;
  font-size: 1.3rem;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 0.85rem 1rem 0.85rem 3rem;
  border: 2px solid #ddd;
  border-radius: 10px;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s;
  background: #fff;
}

.search-input:focus {
  outline: none;
  border-color: #4caf50;
  box-shadow: 0 0 0 4px rgba(76, 175, 80, 0.15);
  background: #f9fff9;
}

.select {
  padding: 0.85rem 1rem;
  border: 2px solid #ddd;
  border-radius: 10px;
  font-size: 1rem;
  font-family: inherit;
  background: #fff;
  cursor: pointer;
  transition: all 0.3s;
  color: #333;
  font-weight: 500;
}

.select:focus {
  outline: none;
  border-color: #4caf50;
  box-shadow: 0 0 0 4px rgba(76, 175, 80, 0.15);
  background: #f9fff9;
}

/* Results Info */
.results-info {
  padding: 1.2rem 1.8rem;
  background: linear-gradient(135deg, #f0f7f0 0%, #e8f5e9 100%);
  border-left: 5px solid #4caf50;
  border-radius: 10px;
  color: #1a472a;
  margin-bottom: 2rem;
  font-weight: 600;
  font-size: 0.95rem;
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.1);
}

/* Loading State */
.loading-state {
  text-align: center;
  padding: 6rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.spinner {
  width: 60px;
  height: 60px;
  border: 5px solid #f0f0f0;
  border-top: 5px solid #4caf50;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-state p {
  color: #666;
  font-size: 1.1rem;
  font-weight: 500;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #f5f5f5, #f9f9f9);
  border-radius: 16px;
  border: 3px dashed #ddd;
}

.empty-state i {
  font-size: 5rem;
  color: #ccc;
  display: block;
  margin-bottom: 1rem;
}

.empty-state h3 {
  font-size: 1.6rem;
  color: #333;
  margin: 0 0 0.5rem;
  font-weight: 600;
}

.empty-state p {
  color: #999;
  margin: 0;
  font-size: 1rem;
}

/* Articles Grid */
.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 2.5rem;
  margin-bottom: 3rem;
}

/* Pagination */
.pagination-section {
  display: flex;
  justify-content: center;
  padding: 2.5rem 0;
}

.pagination {
  display: flex;
  align-items: center;
  gap: 2.5rem;
  background: linear-gradient(135deg, #f0f7f0 0%, #ffffff 100%);
  padding: 1.75rem 2.5rem;
  border-radius: 12px;
  border: 2px solid #e0f0e0;
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.08);
}

.pagination-btn {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.8rem 1.8rem;
  background: linear-gradient(135deg, #4caf50, #45a049);
  color: #fff;
  border: none;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.95rem;
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.2);
}

.pagination-btn:hover {
  background: linear-gradient(135deg, #45a049, #3d8b40);
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(76, 175, 80, 0.3);
}

.pagination-btn i {
  font-size: 1.2rem;
}

.page-info {
  color: #1a472a;
  font-size: 1rem;
  white-space: nowrap;
  font-weight: 600;
}

.page-info strong {
  font-weight: 800;
  color: #4caf50;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .container {
    padding: 1.5rem 1.5rem;
  }

  .filters-grid {
    grid-template-columns: 1fr;
  }

  .filters-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .articles-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .pagination {
    flex-direction: column;
    gap: 1rem;
  }

  .page-info {
    white-space: normal;
  }
}
</style>
