<template>
  <Layout>
    <PageHero title="📊 Observatorio de Contenidos" subtitle="Análisis integral de artículos, noticias y recursos del ecosistema ISDE" />

    <div class="container">
      <!-- Filtros -->
      <section class="filters-section">
        <div class="search-box">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="🔍 Buscar artículos..."
            class="search-input"
            @input="filterArticles"
          />
        </div>

        <div class="filter-buttons">
          <button
            v-for="cat in categories"
            :key="cat.id"
            @click="selectedCategory = selectedCategory === cat.id ? null : cat.id"
            :class="['filter-btn', { active: selectedCategory === cat.id }]"
          >
            {{ cat.title }}
          </button>
          <button v-if="selectedCategory" @click="clearFilters" class="filter-btn clear-btn">
            ✕ Limpiar
          </button>
        </div>
      </section>

      <!-- Stats Cards -->
      <section class="stats-cards">
        <StatCard icon="📰" label="Total Artículos" :value="totalArticles.toString()" :change="12" />
        <StatCard icon="👁️" label="Vistas Totales" :value="totalViews.toLocaleString()" :change="18" />
        <StatCard icon="⭐" label="Destacados" :value="featuredCount.toString()" :change="5" />
        <StatCard icon="🏆" label="Trending" :value="trendingCount.toString()" :change="22" />
      </section>

      <!-- Featured Article -->
      <section class="featured-section" v-if="featuredArticles.length > 0">
        <h2>Artículo Destacado</h2>
        <article class="featured-article">
          <div class="featured-content">
            <span class="featured-badge">DESTACADO</span>
            <h3>{{ featuredArticles[0].title }}</h3>
            <p>{{ truncateText(featuredArticles[0].introtext, 300) }}</p>
            <div class="featured-meta">
              <span>📅 {{ formatDate(featuredArticles[0].created) }}</span>
              <span>👁️ {{ featuredArticles[0].hits || 0 }} vistas</span>
            </div>
            <RouterLink :to="`/articulos/${featuredArticles[0].id}`" class="btn btn-primary">
              Leer artículo completo →
            </RouterLink>
          </div>
        </article>
      </section>

      <!-- Articles Grid -->
      <section class="articles-section">
        <h2>Contenidos del Observatorio</h2>

        <div v-if="loading" class="loading">Cargando artículos...</div>

        <div v-else-if="filteredArticles.length === 0" class="no-content">
          <p>📭 No hay artículos disponibles</p>
        </div>

        <div v-else class="articles-grid">
          <ArticleCard v-for="article in filteredArticles" :key="article.id" :article="article" />
        </div>

        <div v-if="hasMore" class="load-more">
          <button @click="loadMore" class="btn btn-secondary">Cargar más artículos</button>
        </div>
      </section>

      <!-- Categories Analysis -->
      <section class="analysis-section">
        <h2>Análisis por Categoría</h2>
        <div class="table-responsive">
          <table class="analysis-table">
            <thead>
              <tr>
                <th>Categoría</th>
                <th>Artículos</th>
                <th>Vistas Totales</th>
                <th>Promedio</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cat in categoryAnalysis" :key="cat.id">
                <td>{{ cat.name }}</td>
                <td class="center">{{ cat.articleCount }}</td>
                <td class="center"><strong>{{ cat.totalViews.toLocaleString() }}</strong></td>
                <td class="center">{{ cat.avgViews }}</td>
                <td class="center">
                  <span :class="['status', cat.status]">{{ cat.status === 'active' ? '✓ Activa' : '○ Inactiva' }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import Layout from '../components/shared/Layout.vue'
import PageHero from '../components/PageHero.vue'
import StatCard from '../components/StatCard.vue'
import ArticleCard from '../components/ArticleCard.vue'
import { articlesService } from '../services/articles'
import { categoriesService } from '../services/categories'
import type { Article, Category } from '../types'

const articles = ref<Article[]>([])
const categories = ref<Category[]>([])
const loading = ref(false)
const searchQuery = ref('')
const selectedCategory = ref<number | null>(null)
const currentPage = ref(0)
const pageSize = ref(12)
const hasMore = ref(true)

const totalArticles = computed(() => articles.value.filter((a) => a.state === 1).length)
const totalViews = computed(() => articles.value.reduce((sum, a) => sum + (a.hits || 0), 0))
const featuredCount = computed(() => articles.value.filter((a) => a.featured === 1).length)
const trendingCount = computed(() => articles.value.filter((a) => (a.hits || 0) > 100).length)

const featuredArticles = computed(() => articles.value.filter((a) => a.featured === 1).slice(0, 1))

const filteredArticles = computed(() => {
  return articles.value.filter((article) => {
    const matchesSearch =
      searchQuery.value === '' ||
      article.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      article.introtext.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesCategory = selectedCategory.value === null || article.catid === selectedCategory.value

    return matchesSearch && matchesCategory && article.state === 1
  })
})

const categoryAnalysis = computed(() => {
  return categories.value.map((cat) => {
    const catArticles = articles.value.filter((a) => a.catid === cat.id && a.state === 1)
    const totalViews = catArticles.reduce((sum, a) => sum + (a.hits || 0), 0)

    return {
      id: cat.id,
      name: cat.title,
      articleCount: catArticles.length,
      totalViews: totalViews,
      avgViews: catArticles.length > 0 ? Math.round(totalViews / catArticles.length) : 0,
      status: catArticles.length > 0 ? 'active' : 'inactive',
    }
  })
})

const fetchArticles = async () => {
  loading.value = true
  try {
    const skip = currentPage.value * pageSize.value
    const result = await articlesService.getAll(skip, pageSize.value)

    if (currentPage.value === 0) {
      articles.value = result
    } else {
      articles.value.push(...result)
    }

    hasMore.value = result.length === pageSize.value
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

const filterArticles = () => {
  currentPage.value = 0
}

const clearFilters = () => {
  selectedCategory.value = null
  searchQuery.value = ''
  currentPage.value = 0
}

const loadMore = () => {
  currentPage.value++
  fetchArticles()
}

const formatDate = (date: string | Date) => {
  const d = new Date(date)
  return d.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const truncateText = (text: string, length: number) => {
  const clean = text.replace(/<[^>]*>/g, '')
  return clean.length > length ? clean.substring(0, length) + '...' : clean
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
  padding: 0 1.5rem;
}

/* Filters */
.filters-section {
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.search-box {
  display: flex;
}

.search-input {
  flex: 1;
  padding: 0.75rem 1.5rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: #003399;
}

.filter-buttons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.5rem 1.25rem;
  border: 2px solid #ddd;
  background: #fff;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}

.filter-btn:hover {
  border-color: #003399;
  color: #003399;
}

.filter-btn.active {
  background: #003399;
  color: #fff;
  border-color: #003399;
}

.filter-btn.clear-btn {
  background: #ef4444;
  color: #fff;
  border-color: #ef4444;
}

/* Stats Cards */
.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

/* Featured Section */
.featured-section {
  margin-bottom: 4rem;
}

.featured-section h2 {
  font-size: 1.5rem;
  color: #003399;
  margin-bottom: 1.5rem;
}

.featured-article {
  background: linear-gradient(135deg, #003399 0%, #002266 100%);
  color: #fff;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 51, 153, 0.2);
}

.featured-content h3 {
  font-size: 2rem;
  margin: 1rem 0;
  line-height: 1.3;
}

.featured-content p {
  font-size: 1.05rem;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.featured-badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}

.featured-meta {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  font-size: 0.95rem;
}

.btn {
  display: inline-block;
  padding: 0.75rem 2rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
}

.btn-primary {
  background: #fff;
  color: #003399;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.btn-secondary {
  background: #003399;
  color: #fff;
  margin-top: 2rem;
}

.btn-secondary:hover {
  background: #002266;
}

/* Articles Section */
.articles-section {
  margin-bottom: 4rem;
}

.articles-section h2 {
  font-size: 1.5rem;
  color: #003399;
  margin-bottom: 2rem;
}

.loading,
.no-content {
  text-align: center;
  padding: 3rem;
  background: #f8f9fa;
  border-radius: 8px;
  color: #666;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.load-more {
  text-align: center;
}

/* Analysis Section */
.analysis-section {
  margin-bottom: 4rem;
}

.analysis-section h2 {
  font-size: 1.5rem;
  color: #003399;
  margin-bottom: 2rem;
}

.table-responsive {
  overflow-x: auto;
}

.analysis-table {
  width: 100%;
  border-collapse: collapse;
}

.analysis-table thead {
  background: #f8f9fa;
}

.analysis-table th {
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #333;
  border-bottom: 2px solid #ddd;
}

.analysis-table td {
  padding: 1rem;
  border-bottom: 1px solid #ddd;
  color: #555;
}

.analysis-table tr:hover {
  background: #f8f9fa;
}

.center {
  text-align: center;
}

.status {
  display: inline-block;
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.status.active {
  background: #d1fae5;
  color: #065f46;
}

.status.inactive {
  background: #fee2e2;
  color: #991b1b;
}

@media (max-width: 768px) {
  .filters-section {
    padding: 1.5rem 0;
  }

  .search-input {
    padding: 0.5rem 1rem;
    font-size: 16px;
  }

  .filter-buttons {
    gap: 0.5rem;
  }

  .filter-btn {
    padding: 0.4rem 1rem;
    font-size: 0.9rem;
  }

  .featured-article {
    padding: 1.5rem;
  }

  .featured-content h3 {
    font-size: 1.5rem;
  }

  .featured-meta {
    flex-direction: column;
    gap: 0.5rem;
  }

  .articles-grid {
    grid-template-columns: 1fr;
  }

  .table-responsive {
    font-size: 0.85rem;
  }

  .analysis-table th,
  .analysis-table td {
    padding: 0.5rem;
  }
}
</style>
