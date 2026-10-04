import { defineStore } from 'pinia'
import { ref } from 'vue'
import { statsService } from '../services/stats'
import type { StatsOverview, PopularArticle, RecentContent } from '../types'

export const useStatsStore = defineStore('stats', () => {
  const overview = ref<StatsOverview | null>(null)
  const popular = ref<PopularArticle[]>([])
  const recent = ref<RecentContent | null>(null)
  const categoriesActivity = ref<any>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchOverview = async () => {
    loading.value = true
    error.value = null
    try {
      overview.value = await statsService.getOverview()
    } catch (err: any) {
      error.value = err.message || 'Error al cargar estadísticas'
    } finally {
      loading.value = false
    }
  }

  const fetchPopularContent = async (limit: number = 10) => {
    try {
      const data = await statsService.getPopularContent(limit)
      popular.value = data.popular_articles
    } catch (err: any) {
      error.value = err.message || 'Error al cargar contenido popular'
    }
  }

  const fetchRecentContent = async (limit: number = 10) => {
    try {
      recent.value = await statsService.getRecentContent(limit)
    } catch (err: any) {
      error.value = err.message || 'Error al cargar contenido reciente'
    }
  }

  const fetchCategoriesActivity = async () => {
    try {
      categoriesActivity.value = await statsService.getCategoriesActivity()
    } catch (err: any) {
      error.value = err.message || 'Error al cargar actividad de categorías'
    }
  }

  return {
    overview,
    popular,
    recent,
    categoriesActivity,
    loading,
    error,
    fetchOverview,
    fetchPopularContent,
    fetchRecentContent,
    fetchCategoriesActivity,
  }
})
