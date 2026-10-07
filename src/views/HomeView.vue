<template>
  <Layout>
    <!-- Hero Section - Mejorado -->
    <section class="hero">
      <div class="hero-container">
        <div class="hero-content">
          <div class="hero-badge">Bienvenido</div>
          <h1>Centro de Observatorio de Reciclaje</h1>
          <p>
            Explora recursos, artículos e información sobre puntos limpios, reciclaje e impacto
            ambiental en tu región
          </p>
          <div class="hero-actions">
            <RouterLink to="/observatorio" class="btn btn-primary btn-lg">
              <i class="mdi mdi-chart-line"></i>
              Ver Estadísticas
            </RouterLink>
            <RouterLink to="/articulos" class="btn btn-secondary btn-lg">
              <i class="mdi mdi-file-document-multiple"></i>
              Explorar Artículos
            </RouterLink>
          </div>
        </div>
        <div class="hero-visual">
          <div class="hero-shape hero-shape-1"></div>
          <div class="hero-shape hero-shape-2"></div>
          <i class="mdi mdi-recycle"></i>
        </div>
      </div>
    </section>

    <!-- Quick Stats -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <StatCard icon="file-document-multiple" label="Artículos" value="250+" :change="12" />
          <StatCard icon="map-marker-multiple" label="Puntos Limpios" value="180+" :change="15" />
          <StatCard icon="eye" label="Vistas" value="50K+" :change="18" />
          <StatCard icon="chart-line" label="Provincias" value="15" :change="2" />
        </div>
      </div>
    </section>

    <!-- Featured Categories Section -->
    <section class="categories-section">
      <div class="container">
        <div class="section-intro">
          <h2>Categorías Destacadas</h2>
          <p>Encuentra información organizada por tema</p>
        </div>
        <div class="categories-grid">
          <div class="category-card">
            <div class="category-icon leaf">
              <i class="mdi mdi-leaf"></i>
            </div>
            <h3>Reciclaje</h3>
            <p>Información sobre procesos y mejores prácticas</p>
          </div>
          <div class="category-card">
            <div class="category-icon globe">
              <i class="mdi mdi-earth"></i>
            </div>
            <h3>Impacto Ambiental</h3>
            <p>Análisis y datos sobre sostenibilidad</p>
          </div>
          <div class="category-card">
            <div class="category-icon location">
              <i class="mdi mdi-map-marker"></i>
            </div>
            <h3>Puntos Limpios</h3>
            <p>Ubicación y servicios disponibles</p>
          </div>
          <div class="category-card">
            <div class="category-icon chart">
              <i class="mdi mdi-chart-box"></i>
            </div>
            <h3>Estadísticas</h3>
            <p>Datos y tendencias del observatorio</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Recent Articles -->
    <section class="recent-section">
      <div class="container">
        <div class="section-intro">
          <h2>Últimas Publicaciones</h2>
          <p>Novedades y artículos recientes</p>
          <RouterLink to="/articulos" class="view-all">
            Ver todas
            <i class="mdi mdi-arrow-right"></i>
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

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>¿Necesitas encontrar un punto limpio?</h2>
          <p>Accede al directorio completo de puntos de recolección en tu provincia</p>
          <RouterLink to="/observatorio" class="btn btn-light btn-lg">
            <i class="mdi mdi-map-search"></i>
            Buscar Puntos Limpios
          </RouterLink>
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
/* Hero Section - Moderno */
.hero {
  background: linear-gradient(135deg, #1a472a 0%, #2d5f3d 50%, #1f4d2f 100%);
  color: #fff;
  padding: 6rem 1.5rem;
  position: relative;
  overflow: hidden;
  margin-top: 80px;
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 50%, rgba(76, 175, 80, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(76, 175, 80, 0.05) 0%, transparent 50%);
  pointer-events: none;
}

.hero-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.hero-content {
  z-index: 2;
}

.hero-badge {
  display: inline-block;
  background: rgba(76, 175, 80, 0.2);
  color: #a7d8a7;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(76, 175, 80, 0.3);
}

.hero-content h1 {
  font-size: 3.5rem;
  font-weight: 800;
  margin: 0 0 1.5rem;
  line-height: 1.15;
  letter-spacing: -1px;
}

.hero-content p {
  font-size: 1.2rem;
  margin: 0 0 2.5rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.7;
  max-width: 500px;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.95rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  font-size: 1rem;
}

.btn-lg {
  padding: 1.1rem 2.5rem;
  font-size: 1.05rem;
}

.btn-primary {
  background: #4caf50;
  color: #fff;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
}

.btn-primary:hover {
  background: #45a049;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(76, 175, 80, 0.4);
}

.btn-secondary {
  background: transparent;
  color: #fff;
  border: 2px solid #fff;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.btn-light {
  background: #fff;
  color: #1a472a;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.btn-light:hover {
  background: rgba(255, 255, 255, 0.95);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.btn i {
  font-size: 1.2rem;
}

/* Hero Visual */
.hero-visual {
  position: relative;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-visual i {
  font-size: 15rem;
  color: rgba(255, 255, 255, 0.1);
  z-index: 1;
}

.hero-shape {
  position: absolute;
  border-radius: 50%;
}

.hero-shape-1 {
  width: 200px;
  height: 200px;
  background: rgba(76, 175, 80, 0.1);
  top: 20%;
  right: 10%;
  animation: float 4s ease-in-out infinite;
}

.hero-shape-2 {
  width: 150px;
  height: 150px;
  background: rgba(76, 175, 80, 0.05);
  bottom: 20%;
  left: 10%;
  animation: float 5s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-30px);
  }
}

/* Stats Section */
.stats-section {
  padding: 5rem 1.5rem;
  background: linear-gradient(to bottom, #f5f5f5, #fff);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

/* Categories Section */
.categories-section {
  padding: 5rem 1.5rem;
  background: #fff;
}

.section-intro {
  text-align: center;
  margin-bottom: 4rem;
}

.section-intro h2 {
  font-size: 2.5rem;
  color: #1a472a;
  margin: 0 0 0.75rem;
  font-weight: 700;
}

.section-intro p {
  font-size: 1.1rem;
  color: #666;
  margin: 0;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
}

.category-card {
  background: #fff;
  padding: 2.5rem 2rem;
  border-radius: 12px;
  text-align: center;
  transition: all 0.3s ease;
  border: 2px solid #f0f0f0;
}

.category-card:hover {
  border-color: #4caf50;
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(76, 175, 80, 0.15);
}

.category-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  font-size: 2.5rem;
}

.category-icon.leaf {
  background: rgba(76, 175, 80, 0.1);
  color: #4caf50;
}

.category-icon.globe {
  background: rgba(33, 150, 243, 0.1);
  color: #2196f3;
}

.category-icon.location {
  background: rgba(255, 152, 0, 0.1);
  color: #ff9800;
}

.category-icon.chart {
  background: rgba(156, 39, 176, 0.1);
  color: #9c27b0;
}

.category-card h3 {
  font-size: 1.3rem;
  color: #333;
  margin: 0 0 0.75rem;
  font-weight: 600;
}

.category-card p {
  color: #999;
  margin: 0;
  font-size: 0.95rem;
}

/* Recent Section */
.recent-section {
  padding: 5rem 1.5rem;
  background: #f9f9f9;
}

.section-intro {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 3rem;
  gap: 2rem;
}

.section-intro > div:first-child {
  flex: 1;
}

.view-all {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #4caf50;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
  padding: 0.5rem 1rem;
  white-space: nowrap;
  flex-shrink: 0;
}

.view-all:hover {
  color: #45a049;
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
  background: #fff;
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

/* CTA Section */
.cta-section {
  padding: 5rem 1.5rem;
  background: linear-gradient(135deg, #1a472a 0%, #2d5f3d 100%);
  color: #fff;
}

.cta-content {
  text-align: center;
}

.cta-content h2 {
  font-size: 2.5rem;
  margin: 0 0 1rem;
  font-weight: 700;
}

.cta-content p {
  font-size: 1.1rem;
  margin: 0 0 2.5rem;
  color: rgba(255, 255, 255, 0.9);
}

/* Responsive */
@media (max-width: 968px) {
  .hero-container {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .hero-visual {
    height: 300px;
  }

  .hero-visual i {
    font-size: 10rem;
  }

  .hero-content h1 {
    font-size: 2.5rem;
  }

  .section-intro {
    flex-direction: column;
  }

  .view-all {
    flex-shrink: auto;
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 3rem 1.5rem;
    margin-top: 70px;
  }

  .hero-content h1 {
    font-size: 2rem;
  }

  .hero-content p {
    font-size: 1rem;
  }

  .hero-actions {
    flex-direction: column;
  }

  .btn,
  .btn-lg {
    width: 100%;
    justify-content: center;
  }

  .section-intro h2 {
    font-size: 2rem;
  }

  .section-intro p {
    font-size: 1rem;
  }

  .categories-grid {
    grid-template-columns: 1fr;
  }

  .articles-preview {
    grid-template-columns: 1fr;
  }

  .cta-content h2 {
    font-size: 1.75rem;
  }
}
</style>
