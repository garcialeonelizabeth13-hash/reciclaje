<template>
  <Layout>
    <div v-if="loading" class="loading-state">
      <p>Cargando artículo...</p>
    </div>

    <div v-else-if="article" class="article-detail">
      <div class="container">
        <header class="article-header">
          <span class="category-badge" :style="{ background: categoryColor }">{{ categoryName }}</span>
          <h1>{{ article.title }}</h1>
          <div class="article-meta">
            <span>📅 {{ formatDate(article.created) }}</span>
            <span>👁️ {{ article.hits || 0 }} vistas</span>
          </div>
        </header>

        <div class="article-content">
          <div class="article-body">
            <div v-html="article.introtext" class="intro"></div>
            <div v-html="article.fulltext" class="body"></div>
          </div>
        </div>

        <nav class="article-nav">
          <RouterLink to="/articulos" class="nav-link">← Volver a artículos</RouterLink>
        </nav>
      </div>
    </div>

    <div v-else class="not-found">
      <p>📭 Artículo no encontrado</p>
      <RouterLink to="/articulos" class="btn btn-primary">Volver a artículos</RouterLink>
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
.loading-state,
.not-found {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.not-found p {
  font-size: 1.5rem;
  color: #666;
  margin-bottom: 2rem;
}

.btn {
  display: inline-block;
  padding: 0.75rem 2rem;
  border-radius: 6px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  font-size: 1rem;
  background: #003399;
  color: #fff;
}

.btn:hover {
  background: #002266;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
}

.article-header {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #f0f0f0;
}

.category-badge {
  display: inline-block;
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  color: #fff;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.article-header h1 {
  font-size: 2.5rem;
  color: #003399;
  margin: 0 0 1rem;
  line-height: 1.3;
}

.article-meta {
  display: flex;
  gap: 2rem;
  color: #999;
  font-size: 0.95rem;
}

.article-body {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;
}

.intro {
  margin-bottom: 2rem;
  font-size: 1.2rem;
  font-weight: 500;
}

.body {
  margin-bottom: 3rem;
}

.article-nav {
  padding-top: 2rem;
  border-top: 2px solid #f0f0f0;
  text-align: center;
}

.nav-link {
  color: #003399;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: #002266;
}

@media (max-width: 768px) {
  .article-header h1 {
    font-size: 1.75rem;
  }

  .article-meta {
    flex-direction: column;
    gap: 0.5rem;
  }

  .article-body {
    font-size: 1rem;
  }
}
</style>
