<template>
  <Layout>
    <PageHero title="📰 Artículos y Noticias" subtitle="Descubre todas las publicaciones sobre reciclaje e impacto ambiental" />

    <div class="container">
      <!-- Filters -->
      <section class="filters">
        <div class="search-box">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="🔍 Buscar artículos..."
            class="search-input"
            @input="resetPage"
          />
        </div>

        <div class="category-filter">
          <select v-model="selectedCategory" @change="resetPage" class="select">
            <option value="">Todas las categorías</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.title }}
            </option>
          </select>
        </div>
      </section>

      <!-- Loading / Empty -->
      <div v-if="loading" class="loading">Cargando artículos...</div>

      <div v-else-if="filteredArticles.length === 0" class="no-content">
        <p>📭 No hay artículos disponibles</p>
      </div>

      <!-- Articles Grid -->
      <div v-else class="articles-grid">
        <ArticleCard v-for="article in filteredArticles" :key="article.id" :article="article" />
      </div>

      <!-- Load More -->
      <div v-if="hasMore && !loading" class="load-more">
        <button @click="loadMore" class="btn btn-primary">Cargar más artículos</button>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Layout from '../components/shared/Layout.vue'
import PageHero from '../components/PageHero.vue'
import ArticleCard from '../components/ArticleCard.vue'
import { articlesService } from '../services/articles'
import { categoriesService } from '../services/categories'
import type { Article, Category } from '../types'

const articles = ref<Article[]>([])
const categories = ref<Category[]>([])
const loading = ref(false)
const searchQuery = ref('')
const selectedCategory = ref<string>('')
const currentPage = ref(0)
const pageSize = ref(12)
const hasMore = ref(true)

const filteredArticles = computed(() => {
  return articles.value.filter((article) => {
    const matchesSearch =
      searchQuery.value === '' ||
      article.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      article.introtext.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesCategory =
      selectedCategory.value === '' || article.catid === parseInt(selectedCategory.value)

    return matchesSearch && matchesCategory && article.state === 1
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

const resetPage = () => {
  currentPage.value = 0
}

const loadMore = () => {
  currentPage.value++
  fetchArticles()
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
  padding: 3rem 1.5rem;
}

.filters {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
  margin-bottom: 3rem;
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.search-input,
.select {
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  font-family: inherit;
}

.search-input:focus,
.select:focus {
  outline: none;
  border-color: #003399;
  box-shadow: 0 0 0 3px rgba(0, 51, 153, 0.1);
}

.loading,
.no-content {
  text-align: center;
  padding: 4rem 2rem;
  background: #f8f9fa;
  border-radius: 8px;
  color: #666;
  font-size: 1.1rem;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.load-more {
  text-align: center;
  padding: 2rem;
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
}

.btn-primary {
  background: #003399;
  color: #fff;
}

.btn-primary:hover {
  background: #002266;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .container {
    padding: 1.5rem 1.5rem;
  }

  .filters {
    grid-template-columns: 1fr;
  }

  .articles-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
