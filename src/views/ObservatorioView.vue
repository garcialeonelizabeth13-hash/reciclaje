<template>
  <Layout>
    <PageHero
      title="Observatorio de Contenidos"
      subtitle="Análisis integral de artículos, noticias y recursos del ecosistema ISDE"
      icon="chart-line"
    />

    <div class="container">
      <!-- Section Header -->
      <div class="section-header">
        <div class="header-content">
          <h2><i class="mdi mdi-chart-line"></i> Indicadores Principales</h2>
          <p>Métricas en tiempo real del contenido disponible</p>
        </div>
        <div class="header-date">
          <i class="mdi mdi-calendar-today"></i>
          <span>{{ currentDate }}</span>
        </div>
      </div>

      <!-- Stats Cards -->
      <section class="stats-cards">
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
      </section>

      <!-- Additional Info Cards -->
      <section class="info-cards">
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

      <!-- Empty State Info -->
      <section class="info-section">
        <div class="info-box">
          <div class="info-icon">
            <i class="mdi mdi-information"></i>
          </div>
          <div class="info-text">
            <h3>Observatorio Actualizado</h3>
            <p>
              Los datos mostrados se actualizan en tiempo real. Accede a la sección de Artículos
              para explorar el contenido completo.
            </p>
          </div>
        </div>
      </section>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Layout from '../components/shared/Layout.vue'
import PageHero from '../components/PageHero.vue'
import StatCard from '../components/StatCard.vue'
import { articlesService } from '../services/articles'
import { categoriesService } from '../services/categories'
import type { Article, Category } from '../types'

const articles = ref<Article[]>([])
const categories = ref<Category[]>([])
const currentDate = ref('')

const totalArticles = computed(() => articles.value.filter((a) => a.state === 1).length)
const totalViews = computed(() => articles.value.reduce((sum, a) => sum + (a.hits || 0), 0))
const featuredCount = computed(() => articles.value.filter((a) => a.featured === 1).length)
const trendingCount = computed(() => articles.value.filter((a) => (a.hits || 0) > 100).length)
const activeCount = computed(() => articles.value.filter((a) => a.state === 1).length)
const topArticles = computed(() => articles.value.filter((a) => (a.hits || 0) > 100).length)
const categoriesCount = computed(() => categories.value.length)

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

/* Section Header */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 3rem;
  margin-bottom: 3rem;
  gap: 2rem;
}

.header-content h2 {
  font-size: 2rem;
  color: #003399;
  margin: 0 0 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 700;
}

.header-content h2 i {
  font-size: 2.2rem;
}

.header-content p {
  color: #666;
  margin: 0;
  font-size: 0.95rem;
}

.header-date {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: #f0f4ff;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  color: #003399;
  font-weight: 500;
  white-space: nowrap;
}

.header-date i {
  font-size: 1.3rem;
}

/* Stats Cards */
.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

/* Info Cards */
.info-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  margin-bottom: 4rem;
}

.info-card {
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  text-align: center;
  border-top: 4px solid #003399;
}

.info-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.card-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  font-size: 1.8rem;
}

.card-icon.active {
  background: #d1fae5;
  color: #059669;
}

.card-icon.trending {
  background: #fef3c7;
  color: #d97706;
}

.card-icon.featured {
  background: #fce7f3;
  color: #be185d;
}

.card-icon.category {
  background: #dbeafe;
  color: #0284c7;
}

.info-card h3 {
  font-size: 1.1rem;
  color: #333;
  margin: 0 0 0.5rem;
  font-weight: 600;
}

.card-value {
  font-size: 2rem;
  font-weight: 700;
  color: #003399;
  margin: 0.5rem 0;
}

.card-description {
  font-size: 0.85rem;
  color: #999;
  margin: 0;
}

/* Info Section */
.info-section {
  margin-bottom: 3rem;
}

.info-box {
  background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
  padding: 2rem;
  border-radius: 12px;
  border-left: 4px solid #003399;
  display: flex;
  gap: 1.5rem;
}

.info-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: #003399;
  color: #fff;
  border-radius: 50%;
  font-size: 1.5rem;
}

.info-text h3 {
  color: #003399;
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
}

.info-text p {
  color: #666;
  margin: 0;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-date {
    align-self: flex-start;
  }

  .stats-cards {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .info-cards {
    grid-template-columns: 1fr;
  }

  .info-box {
    flex-direction: column;
  }
}
</style>
