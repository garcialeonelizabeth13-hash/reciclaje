<template>
  <Layout>
    <PageHero
      title="📊 Observatorio de Contenidos"
      subtitle="Análisis integral de artículos, noticias y recursos del ecosistema ISDE"
    />

    <div class="container">
      <!-- Stats Cards -->
      <section class="stats-cards">
        <StatCard
          icon="📰"
          label="Total Artículos"
          :value="totalArticles.toString()"
          :change="12"
        />
        <StatCard
          icon="👁️"
          label="Vistas Totales"
          :value="totalViews.toLocaleString()"
          :change="18"
        />
        <StatCard icon="⭐" label="Destacados" :value="featuredCount.toString()" :change="5" />
        <StatCard icon="🏆" label="Trending" :value="trendingCount.toString()" :change="22" />
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
import type { Article } from '../types'

const articles = ref<Article[]>([])
const loading = ref(false)

const totalArticles = computed(() => articles.value.filter((a) => a.state === 1).length)
const totalViews = computed(() => articles.value.reduce((sum, a) => sum + (a.hits || 0), 0))
const featuredCount = computed(() => articles.value.filter((a) => a.featured === 1).length)
const trendingCount = computed(() => articles.value.filter((a) => (a.hits || 0) > 100).length)

const fetchArticles = async () => {
  loading.value = true
  try {
    const result = await articlesService.getAll(0, 100)
    articles.value = result
  } catch (error) {
    console.error('Error loading articles:', error)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await fetchArticles()
})
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Stats Cards */
.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
  padding-top: 3rem;
}

@media (max-width: 768px) {
  .stats-cards {
    grid-template-columns: 1fr;
  }
}
</style>
