<template>
  <div class="home">
    <!-- Hero -->
    <section class="hero">
      <div class="hero__container">
        <div class="hero__content">
          <h1 class="hero__title">Observatorio ISDE</h1>
          <p class="hero__subtitle">
            Tu fuente de información sobre innovación, ingeniería y reciclaje sostenible
          </p>
          <router-link to="/articles" class="hero__cta">Ver Noticias</router-link>
        </div>
      </div>
    </section>

    <!-- Últimas Noticias -->
    <section class="latest-news">
      <div class="container">
        <h2 class="section-title">Últimas Noticias</h2>
        <div v-if="loadingArticles" class="loading">Cargando noticias...</div>
        <div v-else-if="articles.length === 0" class="no-content">No hay noticias disponibles</div>
        <div v-else class="articles-grid">
          <article-card
            v-for="article in articles.slice(0, 6)"
            :key="article.id"
            :article="article"
          />
        </div>
        <div class="section-footer">
          <router-link to="/articles" class="btn-secondary">Ver Todas las Noticias →</router-link>
        </div>
      </div>
    </section>

    <!-- Categorías -->
    <section class="categories-section">
      <div class="container">
        <h2 class="section-title">Categorías</h2>
        <div v-if="loadingCategories" class="loading">Cargando categorías...</div>
        <div v-else-if="categories.length === 0" class="no-content">
          No hay categorías disponibles
        </div>
        <div v-else class="categories-grid">
          <router-link
            v-for="category in categories.slice(0, 6)"
            :key="category.id"
            :to="`/articles?category=${category.id}`"
            class="category-card"
          >
            <span class="category-name">{{ category.title }}</span>
            <span class="category-count">{{ getCategoryCount(category.id) }}</span>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Estadísticas -->
    <section v-if="stats" class="stats-section">
      <div class="container">
        <h2 class="section-title">En Números</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <span class="stat-number">{{ stats.content.published_articles }}</span>
            <span class="stat-label">Noticias Publicadas</span>
          </div>
          <div class="stat-card">
            <span class="stat-number">{{ stats.categories.active_categories }}</span>
            <span class="stat-label">Categorías</span>
          </div>
          <div class="stat-card">
            <span class="stat-number">{{ stats.comments.published_comments }}</span>
            <span class="stat-label">Comentarios</span>
          </div>
          <div class="stat-card">
            <span class="stat-number">{{ stats.attachments.total_files }}</span>
            <span class="stat-label">Recursos</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Contacto -->
    <section class="contact-section">
      <div class="container">
        <h2 class="section-title">¿Preguntas?</h2>
        <p class="contact-description">
          Contáctanos para más información sobre nuestras noticias y actualizaciones
        </p>
        <router-link to="/contacts" class="btn-secondary">Ver Contactos</router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { articlesService } from '../services/articles'
import { categoriesService } from '../services/categories'
import { statsService } from '../services/stats'
import ArticleCard from '../components/ArticleCard.vue'
import type { Article, Category, StatsOverview } from '../types'

const articles = ref<Article[]>([])
const categories = ref<Category[]>([])
const stats = ref<StatsOverview | null>(null)
const loadingArticles = ref(false)
const loadingCategories = ref(false)

onMounted(async () => {
  await loadArticles()
  await loadCategories()
  await loadStats()
})

const loadArticles = async () => {
  loadingArticles.value = true
  try {
    articles.value = await articlesService.getAll(0, 50)
  } catch (err) {
    console.error('Error loading articles:', err)
  } finally {
    loadingArticles.value = false
  }
}

const loadCategories = async () => {
  loadingCategories.value = true
  try {
    categories.value = await categoriesService.getAll(0, 50)
  } catch (err) {
    console.error('Error loading categories:', err)
  } finally {
    loadingCategories.value = false
  }
}

const loadStats = async () => {
  try {
    stats.value = await statsService.getOverview()
  } catch (err) {
    console.error('Error loading stats:', err)
  }
}

const getCategoryCount = (categoryId: number): number => {
  return articles.value.filter((a) => a.catid === categoryId).length
}
</script>

<style scoped>
.home {
  width: 100%;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Hero */
.hero {
  background: linear-gradient(135deg, #003399 0%, #005acc 100%);
  color: white;
  padding: 100px 20px;
  text-align: center;
}

.hero__container {
  max-width: 1200px;
  margin: 0 auto;
}

.hero__title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.hero__subtitle {
  font-size: 1.3rem;
  margin-bottom: 30px;
  opacity: 0.95;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero__cta {
  display: inline-block;
  background: #dc3545;
  color: white;
  padding: 14px 40px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 700;
  transition: all 0.3s ease;
}

.hero__cta:hover {
  background: #c82333;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(220, 53, 69, 0.4);
}

/* Sections */
.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 40px;
  color: #003399;
  text-align: center;
}

.latest-news {
  padding: 80px 0;
  background: #f8f9fa;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.section-footer {
  text-align: center;
}

.btn-secondary {
  display: inline-block;
  background: #003399;
  color: white;
  padding: 12px 30px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: #002266;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 51, 153, 0.3);
}

/* Categorías */
.categories-section {
  padding: 80px 0;
  background: white;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.category-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 30px;
  background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s ease;
  text-align: center;
  min-height: 150px;
}

.category-card:hover {
  background: linear-gradient(135deg, #bbdefb 0%, #e1bee7 100%);
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 51, 153, 0.15);
}

.category-name {
  font-size: 1rem;
  font-weight: 700;
  color: #003399;
}

.category-count {
  font-size: 0.85rem;
  color: #666;
}

/* Stats */
.stats-section {
  padding: 80px 0;
  background: linear-gradient(135deg, #003399 0%, #005acc 100%);
  color: white;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 10px;
}

.stat-label {
  font-size: 1rem;
  opacity: 0.9;
}

/* Contact */
.contact-section {
  padding: 80px 0;
  background: #f8f9fa;
  text-align: center;
}

.contact-description {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 30px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* Loading & No Content */
.loading,
.no-content {
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .hero__title {
    font-size: 2rem;
  }

  .hero__subtitle {
    font-size: 1rem;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .articles-grid {
    grid-template-columns: 1fr;
  }

  .hero {
    padding: 60px 20px;
  }
}
</style>
