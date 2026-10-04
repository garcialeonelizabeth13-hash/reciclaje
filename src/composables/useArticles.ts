import { ref } from 'vue'
import { articleService, categoryService } from '@/services/article.service'
import type { Article, ArticleDetail, Category } from '@/types/article.types'
import { useApi } from './useApi'

/**
 * Composable para manejar operaciones de artículos
 */
export function useArticles() {
  const articles = ref<Article[]>([])
  const currentArticle = ref<ArticleDetail | null>(null)
  const categories = ref<Category[]>([])
  const { loading, error, execute } = useApi<Article | Article[] | ArticleDetail | Category[]>()

  /**
   * Obtener todos los artículos
   */
  const fetchArticles = async (params?: {
    skip?: number
    limit?: number
    category_id?: number
    featured?: boolean
  }) => {
    const result = await execute(() => articleService.getAll(params))
    if (result) {
      articles.value = result as Article[]
    }
    return result
  }

  /**
   * Obtener un artículo por ID
   */
  const fetchArticleById = async (id: number) => {
    const result = await execute(() => articleService.getById(id))
    if (result) {
      currentArticle.value = result as ArticleDetail
    }
    return result
  }

  /**
   * Obtener artículos destacados
   */
  const fetchFeaturedArticles = async (limit: number = 10) => {
    const result = await execute(() => articleService.getFeatured(0, limit))
    if (result) {
      articles.value = result as Article[]
    }
    return result
  }

  /**
   * Buscar artículos
   */
  const searchArticles = async (query: string) => {
    const result = await execute(() => articleService.search(query))
    if (result) {
      articles.value = result as Article[]
    }
    return result
  }

  /**
   * Obtener categorías
   */
  const fetchCategories = async () => {
    const result = await execute(() => categoryService.getAll())
    if (result) {
      categories.value = result as Category[]
    }
    return result
  }

  return {
    articles,
    currentArticle,
    categories,
    loading,
    error,
    fetchArticles,
    fetchArticleById,
    fetchFeaturedArticles,
    searchArticles,
    fetchCategories,
  }
}
