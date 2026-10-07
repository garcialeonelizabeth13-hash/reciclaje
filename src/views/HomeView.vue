<template>
  <Layout>
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <div class="hero-text">
          <h1>Observatorio de Contenidos</h1>
          <p>
            Centro integral de monitoreo y análisis de información sobre reciclaje e impacto
            ambiental
          </p>
          <RouterLink to="/observatorio" class="btn btn-primary"
            >Explorar Observatorio →</RouterLink
          >
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <StatCard icon="📰" label="Artículos" value="250+" :change="12" />
          <StatCard icon="🏷️" label="Categorías" value="15" :change="5" />
          <StatCard icon="👁️" label="Vistas" value="50K+" :change="18" />
          <StatCard icon="⭐" label="Destacados" value="32" :change="8" />
        </div>
      </div>
    </section>

    <!-- Recent Articles -->
    <section class="recent-section">
      <div class="container">
        <div class="section-header">
          <h2>Últimas Publicaciones</h2>
          <RouterLink to="/articulos" class="view-all">Ver todas →</RouterLink>
        </div>
        <div class="articles-preview">
          <ArticleCard v-for="article in recentArticles" :key="article.id" :article="article" />
        </div>
      </div>
    </section>
  </Layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import Layout from '../components/shared/Layout.vue'
import StatCard from '../components/StatCard.vue'
import ArticleCard from '../components/ArticleCard.vue'
import { articlesService } from '../services/articles'
import type { Article } from '../types'

const router = useRouter()
const recentArticles = ref<Article[]>([])

onMounted(async () => {
  try {
    const articles = await articlesService.getAll(0, 6)
    recentArticles.value = articles
  } catch (error) {
    console.error('Error loading home data:', error)
  }
})
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, #003399 0%, #002266 100%);
  color: #fff;
  padding: 8rem 1.5rem;
  text-align: center;
  margin-top: 80px;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
}

.hero-text h1 {
  font-size: 3.5rem;
  font-weight: 700;
  margin: 0 0 1rem;
  line-height: 1.2;
}

.hero-text p {
  font-size: 1.25rem;
  margin: 0 0 2rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
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
  font-size: 1rem;
}

.btn-primary {
  background: #fff;
  color: #003399;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* Stats Section */
.stats-section {
  padding: 4rem 1.5rem;
  background: #f8f9fa;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

/* Recent Section */
.recent-section {
  padding: 4rem 1.5rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2rem;
  color: #003399;
  margin: 0;
}

.view-all {
  color: #003399;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease;
}

.view-all:hover {
  color: #002266;
}

.articles-preview {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

@media (max-width: 768px) {
  .hero {
    padding: 4rem 1.5rem;
    margin-top: 70px;
  }

  .hero-text h1 {
    font-size: 2rem;
  }

  .hero-text p {
    font-size: 1rem;
  }

  .section-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .articles-preview {
    grid-template-columns: 1fr;
  }
}
</style>
