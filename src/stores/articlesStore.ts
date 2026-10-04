import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { articlesService } from '../services/articles'
import type { Article } from '../types'

export const useArticlesStore = defineStore('articles', () => {
  const articles = ref<Article[]>([])
  const currentArticle = ref<Article | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const searchQuery = ref('')
  const selectedCategory = ref<number | null>(null)
  const currentPage = ref(1)
  const pageSize = ref(20)
  const totalArticles = ref(0)

  const filteredArticles = computed(() => {
    return articles.value.filter((article) => {
      if (selectedCategory.value && article.catid !== selectedCategory.value) return false
      if (
        searchQuery.value &&
        !article.title.toLowerCase().includes(searchQuery.value.toLowerCase())
      ) {
        return false
      }
      return true
    })
  })

  const fetchArticles = async (skip: number = 0, limit: number = 20) => {
    loading.value = true
    error.value = null
    try {
      articles.value = await articlesService.getAll(skip, limit)
      totalArticles.value = articles.value.length
    } catch (err: any) {
      error.value = err.message || 'Error al cargar artículos'
    } finally {
      loading.value = false
    }
  }

  const fetchArticleById = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      currentArticle.value = await articlesService.getById(id)
    } catch (err: any) {
      error.value = err.message || 'Error al cargar artículo'
    } finally {
      loading.value = false
    }
  }

  const fetchByCategory = async (categoryId: number, skip: number = 0, limit: number = 20) => {
    loading.value = true
    error.value = null
    try {
      articles.value = await articlesService.getByCategory(categoryId, skip, limit)
    } catch (err: any) {
      error.value = err.message || 'Error al cargar artículos por categoría'
    } finally {
      loading.value = false
    }
  }

  const fetchFeatured = async () => {
    loading.value = true
    error.value = null
    try {
      articles.value = await articlesService.getFeatured()
    } catch (err: any) {
      error.value = err.message || 'Error al cargar artículos destacados'
    } finally {
      loading.value = false
    }
  }

  const search = async (query: string, skip: number = 0, limit: number = 20) => {
    if (!query.trim()) {
      articles.value = []
      return
    }
    loading.value = true
    error.value = null
    try {
      articles.value = await articlesService.search(query, skip, limit)
    } catch (err: any) {
      error.value = err.message || 'Error en búsqueda'
    } finally {
      loading.value = false
    }
  }

  return {
    articles,
    currentArticle,
    loading,
    error,
    searchQuery,
    selectedCategory,
    currentPage,
    pageSize,
    totalArticles,
    filteredArticles,
    fetchArticles,
    fetchArticleById,
    fetchByCategory,
    fetchFeatured,
    search,
  }
})
