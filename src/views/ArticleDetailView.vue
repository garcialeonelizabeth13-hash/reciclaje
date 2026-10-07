<template>
  <Layout>
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Cargando artículo...</p>
    </div>

    <div v-else-if="article" class="article-detail">
      <!-- Article Header -->
      <div class="article-header-section">
        <div class="header-background"></div>
        <div class="container">
          <nav class="breadcrumb">
            <RouterLink to="/articulos">Artículos</RouterLink>
            <span>/</span>
            <span class="current">{{ article.title }}</span>
          </nav>
          <div class="header-content">
            <span class="category-badge" :style="{ background: categoryColor }">{{
              categoryName
            }}</span>
            <h1>{{ article.title }}</h1>
            <div class="article-meta">
              <div class="meta-item">
                <i class="mdi mdi-calendar"></i>
                <span>{{ formatDate(article.created) }}</span>
              </div>
              <div class="meta-item">
                <i class="mdi mdi-eye"></i>
                <span>{{ article.hits || 0 }} vistas</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Article Content -->
      <div class="article-content-section">
        <div class="container">
          <div class="article-layout">
            <main class="article-main">
              <article class="article-body">
                <div v-html="article.introtext" class="intro"></div>
                <div v-html="article.fulltext" class="body"></div>
              </article>

              <!-- Article Actions -->
              <div class="article-actions">
                <div class="action-group">
                  <button class="action-btn">
                    <i class="mdi mdi-share-variant"></i>
                    Compartir
                  </button>
                  <button class="action-btn">
                    <i class="mdi mdi-bookmark"></i>
                    Guardar
                  </button>
                </div>
              </div>

              <!-- Navigation -->
              <nav class="article-nav">
                <RouterLink to="/articulos" class="nav-back">
                  <i class="mdi mdi-arrow-left"></i>
                  Volver a Artículos
                </RouterLink>
              </nav>
            </main>

            <!-- Sidebar -->
            <aside class="article-sidebar">
              <div class="sidebar-widget">
                <h3>Información</h3>
                <div class="info-list">
                  <div class="info-item">
                    <label>Categoría</label>
                    <p>{{ categoryName }}</p>
                  </div>
                  <div class="info-item">
                    <label>Publicado</label>
                    <p>{{ formatDate(article.created) }}</p>
                  </div>
                  <div class="info-item">
                    <label>Vistas</label>
                    <p>{{ (article.hits || 0).toLocaleString() }}</p>
                  </div>
                </div>
              </div>

              <div class="sidebar-widget">
                <h3>Categorías Relacionadas</h3>
                <div class="related-categories">
                  <a href="#" class="category-link">Reciclaje</a>
                  <a href="#" class="category-link">Impacto Ambiental</a>
                  <a href="#" class="category-link">Puntos Limpios</a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="not-found">
      <div class="container">
        <div class="not-found-content">
          <i class="mdi mdi-file-not-found"></i>
          <h2>Artículo no encontrado</h2>
          <p>El artículo que buscas no existe o ha sido eliminado</p>
          <RouterLink to="/articulos" class="btn btn-primary">
            <i class="mdi mdi-arrow-left"></i>
            Volver a Artículos
          </RouterLink>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { RouterLink } from 'vue-router'
import Layout from '../components/shared/Layout.vue'
import { articlesService } from '../services/articles'
import { categoriesService } from '../services/categories'
import type { Article, Category } from '../types'

const route = useRoute()
const article = ref<Article | null>(null)
const categories = ref<Category[]>([])
const loading = ref(true)

const categoryName = computed(() => {
  const category = categories.value.find((c) => c.id === article.value?.catid)
  return category?.title || 'General'
})

const categoryColor = computed(() => {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F']
  return colors[article.value?.catid ? article.value.catid % colors.length : 0]
})

const formatDate = (date: string | Date) => {
  const d = new Date(date)
  return d.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

onMounted(async () => {
  try {
    const articleId = parseInt(route.params.id as string)
    article.value = await articlesService.getById(articleId)
    categories.value = await categoriesService.getAll(0, 100)
    if (article.value) {
      document.title = `${article.value.title} - Observatorio ISDE`
    }
  } catch (error) {
    console.error('Error loading article:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.loading-state {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f0f0f0;
  border-top: 4px solid #4caf50;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Header Section */
.article-header-section {
  position: relative;
  padding: 4rem 1.5rem 3rem;
  background: linear-gradient(135deg, #1a472a 0%, #2d5f3d 100%);
  color: #fff;
  margin-top: 80px;
}

.header-background {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 50%, rgba(76, 175, 80, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(76, 175, 80, 0.05) 0%, transparent 50%);
  pointer-events: none;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.8);
}

.breadcrumb a {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  transition: color 0.2s;
}

.breadcrumb a:hover {
  color: #fff;
}

.breadcrumb .current {
  color: #fff;
  font-weight: 500;
}

.header-content {
  z-index: 2;
}

.category-badge {
  display: inline-block;
  padding: 0.35rem 0.85rem;
  border-radius: 20px;
  color: #fff;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 1rem;
  letter-spacing: 0.5px;
}

.header-content h1 {
  font-size: 2.8rem;
  color: #fff;
  margin: 0 0 1.5rem;
  line-height: 1.25;
  font-weight: 700;
}

.article-meta {
  display: flex;
  gap: 2rem;
  font-size: 0.95rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.85);
}

.meta-item i {
  font-size: 1.1rem;
}

/* Content Section */
.article-content-section {
  padding: 3rem 1.5rem;
  background: #fff;
}

.article-layout {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 3rem;
}

.article-main {
  min-width: 0;
}

.article-body {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;
}

.intro {
  margin-bottom: 2rem;
  font-size: 1.25rem;
  font-weight: 500;
  color: #1a472a;
}

.body {
  margin-bottom: 3rem;
}

.body :deep(p) {
  margin-bottom: 1.5rem;
}

.body :deep(h2) {
  font-size: 1.8rem;
  color: #1a472a;
  margin: 2rem 0 1rem;
  font-weight: 600;
}

.body :deep(h3) {
  font-size: 1.4rem;
  color: #2d5f3d;
  margin: 1.5rem 0 0.75rem;
  font-weight: 600;
}

.body :deep(ul),
.body :deep(ol) {
  margin: 1.5rem 0;
  padding-left: 2rem;
}

.body :deep(li) {
  margin-bottom: 0.5rem;
}

.body :deep(img) {
  max-width: 100%;
  height: auto;
  margin: 1.5rem 0;
  border-radius: 8px;
}

.body :deep(blockquote) {
  border-left: 4px solid #4caf50;
  padding-left: 1.5rem;
  margin: 1.5rem 0;
  font-style: italic;
  color: #666;
}

/* Article Actions */
.article-actions {
  padding: 2rem 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  margin: 3rem 0;
}

.action-group {
  display: flex;
  gap: 1rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #f5f5f5;
  border: none;
  border-radius: 6px;
  color: #333;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover {
  background: #4caf50;
  color: #fff;
}

.action-btn i {
  font-size: 1.2rem;
}

/* Navigation */
.article-nav {
  margin-top: 3rem;
}

.nav-back {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #4caf50;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s;
  padding: 0.5rem 1rem;
  margin-left: -1rem;
}

.nav-back:hover {
  color: #45a049;
  gap: 1rem;
}

.nav-back i {
  font-size: 1.2rem;
}

/* Sidebar */
.article-sidebar {
  height: fit-content;
  position: sticky;
  top: 100px;
}

.sidebar-widget {
  background: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.sidebar-widget h3 {
  font-size: 1.1rem;
  color: #1a472a;
  margin: 0 0 1rem;
  font-weight: 600;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-item {
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 0.75rem;
}

.info-item:last-child {
  border-bottom: none;
}

.info-item label {
  display: block;
  font-size: 0.85rem;
  color: #999;
  text-transform: uppercase;
  margin-bottom: 0.25rem;
  font-weight: 600;
}

.info-item p {
  color: #333;
  margin: 0;
  font-weight: 500;
}

.related-categories {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.category-link {
  display: inline-block;
  padding: 0.5rem 0.75rem;
  background: rgba(76, 175, 80, 0.1);
  color: #4caf50;
  text-decoration: none;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s;
  border: 1px solid transparent;
}

.category-link:hover {
  background: rgba(76, 175, 80, 0.2);
  border-color: #4caf50;
}

/* Not Found */
.not-found {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.not-found-content {
  text-align: center;
  max-width: 500px;
}

.not-found-content i {
  font-size: 4rem;
  color: #ccc;
  display: block;
  margin-bottom: 1rem;
}

.not-found-content h2 {
  font-size: 1.8rem;
  color: #333;
  margin: 0 0 0.5rem;
}

.not-found-content p {
  color: #999;
  margin: 0 0 2rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.9rem 2rem;
  background: #4caf50;
  color: #fff;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  transition: all 0.2s;
  border: none;
  cursor: pointer;
}

.btn-primary:hover {
  background: #45a049;
  transform: translateY(-2px);
}

.btn i {
  font-size: 1.1rem;
}

/* Responsive */
@media (max-width: 968px) {
  .article-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .article-sidebar {
    position: static;
  }
}

@media (max-width: 768px) {
  .article-header-section {
    padding: 2rem 1.5rem;
    margin-top: 70px;
  }

  .header-content h1 {
    font-size: 1.75rem;
  }

  .article-meta {
    flex-wrap: wrap;
    gap: 1rem;
  }

  .article-body {
    font-size: 1rem;
  }

  .action-group {
    flex-direction: column;
  }

  .action-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
