import { ref, computed } from 'vue'
import { articlesService } from '../services/articles'
import type { Article } from '../types'

export function useArticles() {
  const articles = ref<Article[]>([])
  const currentArticle = ref<Article | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchArticles = async (skip: number = 0, limit: number = 20) => {
    loading.value = true
    error.value = null
    try {
      articles.value = await articlesService.getAll(skip, limit)
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

  return {
    articles,
    currentArticle,
    loading,
    error,
    fetchArticles,
    fetchArticleById,
    fetchByCategory,
  }
}
