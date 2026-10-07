<template>
  <Layout>
    <PageHero
      title="📊 Observatorio de Contenidos"
      subtitle="Dashboard en tiempo real con análisis integral de artículos, noticias y recursos"
      icon="chart-line"
    />

    <div class="container">
      <!-- Timeline / Date Selector -->
      <section class="date-section">
        <div class="date-info">
          <i class="mdi mdi-calendar-today"></i>
          <div>
            <p class="date-label">Datos actualizados al</p>
            <p class="current-date">{{ currentDate }}</p>
          </div>
        </div>
        <button class="btn-refresh" @click="refreshData">
          <i class="mdi mdi-refresh"></i>
          Actualizar datos
        </button>
      </section>

      <!-- Primary Stats Cards -->
      <section class="stats-showcase">
        <div class="stats-container">
          <StatCard
            icon="file-document-multiple"
            label="Total Artículos"
            :value="totalArticles.toString()"
            :change="12"
          />
          <StatCard
            icon="eye"
            label="Vistas Totales"
            :value="totalViews.toLocaleString()"
            :change="18"
          />
          <StatCard icon="star" label="Destacados" :value="featuredCount.toString()" :change="5" />
          <StatCard icon="fire" label="Trending" :value="trendingCount.toString()" :change="22" />
        </div>
      </section>

      <!-- Tabs Section -->
      <section class="tabs-section">
        <div class="tabs-header">
          <button
            v-for="tab in tabs"
            :key="tab"
            :class="['tab-btn', { active: activeTab === tab }]"
            @click="activeTab = tab"
          >
            <i :class="getTabIcon(tab)"></i>
            {{ getTabLabel(tab) }}
          </button>
        </div>

        <!-- Tab Content: Overview -->
        <div v-show="activeTab === 'overview'" class="tab-content">
          <!-- Additional Info Cards -->
          <section class="info-cards-grid">
            <div class="info-card">
              <div class="card-icon active">
                <i class="mdi mdi-check-circle"></i>
              </div>
              <h3>Contenido Activo</h3>
              <p class="card-value">{{ activeCount }}</p>
              <p class="card-description">Artículos publicados y disponibles</p>
            </div>

            <div class="info-card">
              <div class="card-icon trending">
                <i class="mdi mdi-trending-up"></i>
              </div>
              <h3>Más Visitados</h3>
              <p class="card-value">{{ topArticles }}</p>
              <p class="card-description">Artículos con más de 100 vistas</p>
            </div>

            <div class="info-card">
              <div class="card-icon featured">
                <i class="mdi mdi-crown"></i>
              </div>
              <h3>Contenido Destacado</h3>
              <p class="card-value">{{ featuredCount }}</p>
              <p class="card-description">Artículos con marca de destacado</p>
            </div>

            <div class="info-card">
              <div class="card-icon category">
                <i class="mdi mdi-folder"></i>
              </div>
              <h3>Organización</h3>
              <p class="card-value">{{ categoriesCount }}</p>
              <p class="card-description">Categorías disponibles</p>
            </div>
          </section>
        </div>

        <!-- Tab Content: Categories -->
        <div v-show="activeTab === 'categories'" class="tab-content">
          <section class="categories-breakdown">
            <h3>Artículos por Categoría</h3>
            <div class="categories-list">
              <div v-for="cat in categoriesSummary" :key="cat.id" class="category-item">
                <div class="cat-info">
                  <h4>{{ cat.title }}</h4>
                  <p>{{ cat.count }} artículos</p>
                </div>
                <div class="cat-bar">
                  <div class="cat-progress" :style="{ width: cat.percentage + '%' }"></div>
                </div>
                <span class="cat-percentage">{{ cat.percentage }}%</span>
              </div>
            </div>
          </section>
        </div>

        <!-- Tab Content: Top Articles -->
        <div v-show="activeTab === 'top'" class="tab-content">
          <section class="top-articles">
            <h3>Artículos más vistos</h3>
            <div class="articles-list">
              <div
                v-for="(article, index) in topArticlesList"
                :key="article.id"
                class="article-item"
              >
                <div class="rank">
                  <span>{{ index + 1 }}</span>
                </div>
                <div class="article-info">
                  <h4>{{ article.title }}</h4>
                  <p>{{ article.hits || 0 }} vistas</p>
                </div>
                <div class="article-badge">
                  <i class="mdi mdi-eye"></i>
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- Tab Content: Statistics -->
        <div v-show="activeTab === 'stats'" class="tab-content">
          <section class="stats-grid">
            <div class="stat-item">
              <h4>Promedio de Vistas</h4>
              <p class="stat-value">{{ averageViews }}</p>
              <small>por artículo</small>
            </div>
            <div class="stat-item">
              <h4>Artículos Recientes</h4>
              <p class="stat-value">{{ recentArticles }}</p>
              <small>últimos 30 días</small>
            </div>
            <div class="stat-item">
              <h4>Tasa de Actualización</h4>
              <p class="stat-value">{{ updateRate }}%</p>
              <small>contenido activo</small>
            </div>
            <div class="stat-item">
              <h4>Categorías Activas</h4>
              <p class="stat-value">{{ categoriesCount }}</p>
              <small>en total</small>
            </div>
          </section>
        </div>
      </section>

      <!-- Info Banner -->
      <section class="info-banner">
        <div class="banner-icon">
          <i class="mdi mdi-information-outline"></i>
        </div>
        <div class="banner-content">
          <h3>Observatorio Actualizado en Tiempo Real</h3>
          <p>
            Los datos mostrados se actualizan automáticamente. Accede a la sección de Artículos para
            explorar el contenido completo o utiliza los filtros para búsquedas específicas.
          </p>
        </div>
        <router-link to="/articulos" class="banner-link">
          Ir a Artículos <i class="mdi mdi-arrow-right"></i>
        </router-link>
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
import { articlesService } from '../services/articles'
import { categoriesService } from '../services/categories'
import type { Article, Category } from '../types'

const articles = ref<Article[]>([])
const categories = ref<Category[]>([])
const currentDate = ref('')
const activeTab = ref('overview')

const tabs = ['overview', 'categories', 'top', 'stats']

const getTabIcon = (tab: string) => {
  const icons: Record<string, string> = {
    overview: 'mdi mdi-home-analytics',
    categories: 'mdi mdi-folder-multiple',
    top: 'mdi mdi-trending-up',
    stats: 'mdi mdi-chart-box',
  }
  return icons[tab]
}

const getTabLabel = (tab: string) => {
  const labels: Record<string, string> = {
    overview: 'Resumen',
    categories: 'Categorías',
    top: 'Más Vistos',
    stats: 'Estadísticas',
  }
  return labels[tab]
}

const totalArticles = computed(() => articles.value.filter((a) => a.state === 1).length)
const totalViews = computed(() => articles.value.reduce((sum, a) => sum + (a.hits || 0), 0))
const featuredCount = computed(() => articles.value.filter((a) => a.featured === 1).length)
const trendingCount = computed(() => articles.value.filter((a) => (a.hits || 0) > 100).length)
const activeCount = computed(() => articles.value.filter((a) => a.state === 1).length)
const topArticles = computed(() => articles.value.filter((a) => (a.hits || 0) > 100).length)
const categoriesCount = computed(() => categories.value.length)

const averageViews = computed(() => {
  if (totalArticles.value === 0) return 0
  return Math.round(totalViews.value / totalArticles.value)
})

const recentArticles = computed(() => {
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  return articles.value.filter((a) => new Date(a.created) > thirtyDaysAgo).length
})

const updateRate = computed(() => {
  return totalArticles.value > 0 ? Math.round((activeCount.value / totalArticles.value) * 100) : 0
})

const categoriesSummary = computed(() => {
  const maxArticles = Math.max(
    ...categories.value.map((c) => {
      const count = articles.value.filter((a) => a.catid === c.id && a.state === 1).length
      return count
    }),
  )

  return categories.value.map((c) => {
    const count = articles.value.filter((a) => a.catid === c.id && a.state === 1).length
    const percentage = maxArticles > 0 ? Math.round((count / maxArticles) * 100) : 0
    return {
      ...c,
      count,
      percentage,
    }
  })
})

const topArticlesList = computed(() => {
  return articles.value
    .filter((a) => a.state === 1)
    .sort((a, b) => (b.hits || 0) - (a.hits || 0))
    .slice(0, 5)
})

const fetchArticles = async () => {
  try {
    const result = await articlesService.getAll(0, 100)
    articles.value = result
  } catch (error) {
    console.error('Error loading articles:', error)
  }
}

const fetchCategories = async () => {
  try {
    categories.value = await categoriesService.getAll(0, 100)
  } catch (error) {
    console.error('Error loading categories:', error)
  }
}

const formatCurrentDate = () => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  currentDate.value = new Date().toLocaleDateString('es-ES', options)
}

const refreshData = async () => {
  await fetchArticles()
  formatCurrentDate()
}

onMounted(async () => {
  formatCurrentDate()
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

/* Date Section */
.date-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: linear-gradient(135deg, #f0f7f0 0%, #f9f9f9 100%);
  border-radius: 12px;
  margin: 2rem 0;
  border: 2px solid #e0e0e0;
}

.date-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.date-info i {
  font-size: 1.8rem;
  color: #4caf50;
}

.date-label {
  margin: 0;
  font-size: 0.85rem;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
}

.current-date {
  margin: 0;
  font-size: 1.3rem;
  color: #1a472a;
  font-weight: 700;
}

.btn-refresh {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #4caf50;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-refresh:hover {
  background: #45a049;
  transform: translateY(-2px);
}

.btn-refresh i {
  font-size: 1.1rem;
}

/* Stats Showcase */
.stats-showcase {
  padding: 2rem 0;
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

/* Tabs Section */
.tabs-section {
  margin: 3rem 0;
}

.tabs-header {
  display: flex;
  gap: 1rem;
  border-bottom: 2px solid #e0e0e0;
  margin-bottom: 2rem;
  overflow-x: auto;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  color: #999;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.95rem;
  white-space: nowrap;
}

.tab-btn i {
  font-size: 1.2rem;
}

.tab-btn:hover {
  color: #1a472a;
}

.tab-btn.active {
  color: #4caf50;
  border-bottom-color: #4caf50;
}

.tab-content {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Info Cards Grid */
.info-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
}

.info-card {
  background: linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%);
  padding: 2.5rem 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  text-align: center;
  border-top: 5px solid #4caf50;
  position: relative;
  overflow: hidden;
}

.info-card::before {
  content: '';
  position: absolute;
  top: 0;
  right: -50px;
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, rgba(76, 175, 80, 0.1), transparent);
  border-radius: 50%;
}

.info-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 28px rgba(76, 175, 80, 0.15);
  border-top-color: #45a049;
}

.card-icon {
  width: 70px;
  height: 70px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  font-size: 2.2rem;
  position: relative;
  z-index: 1;
}

.card-icon.active {
  background: linear-gradient(135deg, #d1fae5, #a7d8a7);
  color: #059669;
  box-shadow: 0 4px 12px rgba(5, 150, 105, 0.2);
}

.card-icon.trending {
  background: linear-gradient(135deg, #fef3c7, #fed7aa);
  color: #d97706;
  box-shadow: 0 4px 12px rgba(217, 119, 6, 0.2);
}

.card-icon.featured {
  background: linear-gradient(135deg, #fce7f3, #fbcfe8);
  color: #be185d;
  box-shadow: 0 4px 12px rgba(190, 24, 93, 0.2);
}

.card-icon.category {
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  color: #0284c7;
  box-shadow: 0 4px 12px rgba(2, 132, 199, 0.2);
}

.info-card h3 {
  font-size: 1.2rem;
  color: #1a472a;
  margin: 0 0 0.75rem;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.card-value {
  font-size: 2.5rem;
  font-weight: 800;
  color: #4caf50;
  margin: 0.75rem 0;
  letter-spacing: -1px;
}

.card-description {
  font-size: 0.85rem;
  color: #999;
  margin: 0;
  font-weight: 500;
}

/* Categories Breakdown */
.categories-breakdown {
  background: linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%);
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.categories-breakdown h3 {
  font-size: 1.4rem;
  color: #1a472a;
  margin: 0 0 2rem;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.categories-list {
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
}

.category-item {
  display: grid;
  grid-template-columns: 200px 1fr 70px;
  gap: 1.5rem;
  align-items: center;
  padding: 1.2rem;
  background: linear-gradient(135deg, #f9f9f9, #ffffff);
  border-radius: 12px;
  border-left: 4px solid #4caf50;
  transition: all 0.3s;
}

.category-item:hover {
  background: linear-gradient(135deg, #f0f7f0, #f5f5f5);
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.1);
}

.cat-info h4 {
  margin: 0 0 0.3rem;
  color: #1a472a;
  font-weight: 700;
  font-size: 1rem;
}

.cat-info p {
  margin: 0;
  color: #999;
  font-size: 0.9rem;
  font-weight: 500;
}

.cat-bar {
  background: #e0e0e0;
  height: 10px;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
}

.cat-progress {
  background: linear-gradient(90deg, #4caf50, #66bb6a);
  height: 100%;
  border-radius: 6px;
  transition: width 0.5s ease;
  box-shadow: 0 0 8px rgba(76, 175, 80, 0.3);
}

.cat-percentage {
  text-align: right;
  font-weight: 700;
  color: #4caf50;
  font-size: 0.95rem;
}

/* Top Articles */
.top-articles {
  background: linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%);
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.top-articles h3 {
  font-size: 1.4rem;
  color: #1a472a;
  margin: 0 0 2rem;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.articles-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.article-item {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1.3rem 1.5rem;
  background: linear-gradient(135deg, #f9f9f9, #ffffff);
  border-radius: 12px;
  border-left: 4px solid #4caf50;
  transition: all 0.3s;
}

.article-item:hover {
  background: linear-gradient(135deg, #f0f7f0, #f5f5f5);
  transform: translateX(6px);
  box-shadow: 0 6px 16px rgba(76, 175, 80, 0.12);
}

.rank {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4caf50, #66bb6a);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1.2rem;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
}

.article-info {
  flex: 1;
  min-width: 0;
}

.article-info h4 {
  margin: 0 0 0.3rem;
  color: #1a472a;
  font-weight: 700;
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.article-info p {
  margin: 0;
  color: #999;
  font-size: 0.9rem;
  font-weight: 500;
}

.article-badge {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: linear-gradient(135deg, #e8f5e9, #d1fae5);
  color: #4caf50;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 1.3rem;
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.15);
}

/* Statistics Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.stat-item {
  background: linear-gradient(135deg, #f0f7f0 0%, #f9f9f9 100%);
  padding: 2rem;
  border-radius: 12px;
  border: 2px solid #e0e0e0;
  text-align: center;
  transition: all 0.2s;
}

.stat-item:hover {
  border-color: #4caf50;
  transform: translateY(-4px);
}

.stat-item h4 {
  margin: 0 0 0.5rem;
  color: #1a472a;
  font-size: 0.95rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-value {
  margin: 0 0 0.5rem;
  font-size: 2.5rem;
  font-weight: 800;
  color: #4caf50;
}

.stat-item small {
  color: #999;
  font-size: 0.85rem;
}

/* Info Banner */
.info-banner {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
  padding: 2rem;
  border-radius: 12px;
  border-left: 4px solid #4caf50;
  margin: 3rem 0;
}

.banner-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: #4caf50;
  color: #fff;
  border-radius: 50%;
  font-size: 1.5rem;
}

.banner-content {
  flex: 1;
}

.banner-content h3 {
  color: #1a472a;
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
}

.banner-content p {
  color: #666;
  margin: 0;
  line-height: 1.6;
}

.banner-link {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #4caf50;
  color: #fff;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  transition: all 0.2s;
  white-space: nowrap;
}

.banner-link:hover {
  background: #45a049;
  transform: translateY(-2px);
}

.banner-link i {
  font-size: 1.1rem;
}

@media (max-width: 968px) {
  .date-section {
    flex-direction: column;
    gap: 1rem;
  }

  .category-item {
    grid-template-columns: 1fr;
  }

  .cat-percentage {
    text-align: left;
  }

  .info-banner {
    flex-direction: column;
  }

  .banner-link {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }

  .tabs-header {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .tab-btn {
    padding: 0.75rem 1rem;
    font-size: 0.85rem;
  }

  .info-cards-grid {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .date-section {
    padding: 1rem;
  }
}
</style>
