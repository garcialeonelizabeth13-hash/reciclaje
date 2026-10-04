<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useArticles } from '@/composables/useArticles'

const { articles, categories, loading, error, fetchArticles, fetchCategories } = useArticles()

const selectedCategory = ref<number | null>(null)
const searchQuery = ref('')

// Cargar datos al montar
onMounted(async () => {
  await fetchCategories()
  await fetchArticles()
})

// Filtrar artículos
const handleFilterByCategory = async (categoryId: number | null) => {
  selectedCategory.value = categoryId
  if (categoryId) {
    await fetchArticles({ category_id: categoryId })
  } else {
    await fetchArticles()
  }
}

// Limpiar texto HTML
const stripHtml = (html: string) => {
  const tmp = document.createElement('div')
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ''
}

// Formatear fecha
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template>
  <div class="articles-view">
    <div class="container">
      <!-- Header -->
      <div class="header">
        <h1>📰 Artículos del Observatorio</h1>
        <p class="subtitle">Base de datos Joomla - {{ articles.length }} artículos</p>
      </div>

      <!-- Filtros -->
      <div class="filters">
        <div class="filter-categories">
          <button 
            @click="handleFilterByCategory(null)" 
            :class="['filter-btn', { active: selectedCategory === null }]"
          >
            Todos
          </button>
          <button 
            v-for="category in categories" 
            :key="category.id"
            @click="handleFilterByCategory(category.id)" 
            :class="['filter-btn', { active: selectedCategory === category.id }]"
          >
            {{ category.title }}
          </button>
        </div>
      </div>

      <!-- Error -->
      <div v-if="error" class="error-message">
        <p>❌ Error: {{ error.message }}</p>
        <p class="error-hint">
          Asegúrate de que el backend esté corriendo y la base de datos 'observatorio' esté importada
        </p>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>Cargando artículos...</p>
      </div>

      <!-- Artículos -->
      <div v-else-if="articles.length > 0" class="articles-grid">
        <article v-for="article in articles" :key="article.id" class="article-card">
          <div class="article-header">
            <span v-if="article.featured" class="badge featured">⭐ Destacado</span>
            <span class="badge date">{{ formatDate(article.created) }}</span>
          </div>
          
          <h2 class="article-title">{{ article.title }}</h2>
          
          <div class="article-intro" v-html="article.introtext.substring(0, 200) + '...'"></div>
          
          <div class="article-footer">
            <span class="article-meta">👁️ {{ article.hits }} vistas</span>
            <span class="article-meta">📁 Cat. ID: {{ article.catid }}</span>
          </div>
        </article>
      </div>

      <!-- Sin resultados -->
      <div v-else-if="!loading" class="empty-state">
        <p>📭 No se encontraron artículos</p>
      </div>

      <!-- Info de conexión -->
      <div class="connection-info">
        <p>
          🔗 Backend: <code>{{ import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000' }}</code>
        </p>
        <p>
          🗄️ Base de datos: <code>observatorio (Joomla)</code>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.articles-view {
  min-height: 100vh;
  padding: 2rem 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  color: white;
  margin-bottom: 2rem;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
}

.filters {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.filter-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.filter-btn {
  padding: 0.5rem 1rem;
  border: 2px solid #e0e0e0;
  background: white;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 600;
  color: #666;
}

.filter-btn:hover {
  border-color: #667eea;
  color: #667eea;
}

.filter-btn.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.error-message {
  background: #ffebee;
  color: #c62828;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  border-left: 4px solid #f44336;
}

.error-hint {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  opacity: 0.8;
}

.loading {
  text-align: center;
  color: white;
  padding: 3rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.article-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
}

.article-header {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.badge.featured {
  background: #fff3cd;
  color: #856404;
}

.badge.date {
  background: #e3f2fd;
  color: #1976d2;
}

.article-title {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #333;
  line-height: 1.4;
}

.article-intro {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.article-footer {
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid #e0e0e0;
}

.article-meta {
  font-size: 0.85rem;
  color: #999;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 12px;
  color: #666;
  font-size: 1.2rem;
}

.connection-info {
  margin-top: 2rem;
  text-align: center;
  color: white;
  font-size: 0.9rem;
}

.connection-info p {
  margin: 0.5rem 0;
}

.connection-info code {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  .articles-grid {
    grid-template-columns: 1fr;
  }

  .filter-categories {
    justify-content: center;
  }
}
</style>
