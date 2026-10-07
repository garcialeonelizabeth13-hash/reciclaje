<template>
  <Layout>
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <div class="hero-icon">
          <i class="mdi mdi-chart-box-multiple"></i>
        </div>
        <h1>Observatorio de Contenidos</h1>
        <p>
          Centro integral de monitoreo y análisis de información sobre reciclaje e impacto ambiental
        </p>
        <RouterLink to="/observatorio" class="btn btn-primary">
          <i class="mdi mdi-arrow-right"></i>
          Explorar Observatorio
        </RouterLink>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <StatCard icon="file-document-multiple" label="Artículos" value="250+" :change="12" />
          <StatCard icon="folder-multiple" label="Categorías" value="15" :change="5" />
          <StatCard icon="eye" label="Vistas" value="50K+" :change="18" />
          <StatCard icon="star" label="Destacados" value="32" :change="8" />
        </div>
      </div>
    </section>

    <!-- Recent Articles -->
    <section class="recent-section">
      <div class="container">
        <div class="section-header">
          <div class="header-title">
            <i class="mdi mdi-clock"></i>
            <h2>Últimas Publicaciones</h2>
          </div>
          <RouterLink to="/articulos" class="view-all">
            Ver todas
            <i class="mdi mdi-chevron-right"></i>
          </RouterLink>
        </div>
        <div v-if="recentArticles.length > 0" class="articles-preview">
          <ArticleCard v-for="article in recentArticles" :key="article.id" :article="article" />
        </div>
        <div v-else class="no-content">
          <i class="mdi mdi-inbox"></i>
          <p>No hay artículos disponibles</p>
        </div>
      </div>
    </section>
  </Layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import Layout from '../components/shared/Layout.vue'
import StatCard from '../components/StatCard.vue'
import ArticleCard from '../components/ArticleCard.vue'
import { articlesService } from '../services/articles'
import type { Article } from '../types'

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
/* Hero Section */
.hero {
  background: linear-gradient(135deg, #003399 0%, #002266 100%);
  color: #fff;
  padding: 8rem 1.5rem;
  text-align: center;
  margin-top: 80px;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -10%;
  width: 500px;
  height: 500px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  z-index: 0;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.hero-icon {
  font-size: 5rem;
  margin-bottom: 1.5rem;
  display: inline-block;
  animation: float 3s ease-in-out infinite;
  line-height: 1;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.hero-content h1 {
  font-size: 3.5rem;
  font-weight: 700;
  margin: 0 0 1rem;
  line-height: 1.2;
}

.hero-content p {
  font-size: 1.25rem;
  margin: 0 0 2.5rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 2.5rem;
  border-radius: 8px;
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
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.btn i {
  font-size: 1.2rem;
}

/* Stats Section */
.stats-section {
  padding: 5rem 1.5rem;
  background: linear-gradient(to bottom, #f8f9fa, #fff);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* Recent Section */
.recent-section {
  padding: 5rem 1.5rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  gap: 2rem;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-title i {
  font-size: 2rem;
  color: #003399;
}

.header-title h2 {
  font-size: 2rem;
  color: #003399;
  margin: 0;
  font-weight: 700;
}

.view-all {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #003399;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
  padding: 0.5rem 1rem;
}

.view-all:hover {
  color: #002266;
  gap: 1rem;
}

.view-all i {
  font-size: 1.2rem;
}

.articles-preview {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 2rem;
}

.no-content {
  text-align: center;
  padding: 4rem 2rem;
  background: #f8f9fa;
  border-radius: 12px;
  border: 2px dashed #ddd;
}

.no-content i {
  font-size: 3rem;
  color: #ccc;
  display: block;
  margin-bottom: 1rem;
}

.no-content p {
  color: #999;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .hero {
    padding: 4rem 1.5rem;
    margin-top: 70px;
  }

  .hero-icon {
    font-size: 3rem;
  }

  .hero-content h1 {
    font-size: 2rem;
  }

  .hero-content p {
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
