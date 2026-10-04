import { apiService } from './api.service'
import type { Article, ArticleDetail, Category } from '@/types/article.types'

/**
 * Servicio para operaciones con artículos
 */
export const articleService = {
  /**
   * Obtener todos los artículos
   */
  async getAll(params?: {
    skip?: number
    limit?: number
    category_id?: number
    featured?: boolean
    published?: boolean
  }): Promise<Article[]> {
    const response = await apiService.get<Article[]>('/articles', { params })
    return response.data
  },

  /**
   * Obtener un artículo por ID
   */
  async getById(id: number): Promise<ArticleDetail> {
    const response = await apiService.get<ArticleDetail>(`/articles/${id}`)
    return response.data
  },

  /**
   * Obtener artículos por categoría
   */
  async getByCategory(categoryId: number, skip: number = 0, limit: number = 20): Promise<Article[]> {
    const response = await apiService.get<Article[]>(`/articles/category/${categoryId}`, {
      params: { skip, limit }
    })
    return response.data
  },

  /**
   * Obtener artículos destacados
   */
  async getFeatured(skip: number = 0, limit: number = 10): Promise<Article[]> {
    const response = await apiService.get<Article[]>('/articles/featured/list', {
      params: { skip, limit }
    })
    return response.data
  },

  /**
   * Buscar artículos
   */
  async search(query: string, skip: number = 0, limit: number = 20): Promise<Article[]> {
    const response = await apiService.get<Article[]>(`/articles/search/${query}`, {
      params: { skip, limit }
    })
    return response.data
  }
}

/**
 * Servicio para operaciones con categorías
 */
export const categoryService = {
  /**
   * Obtener todas las categorías
   */
  async getAll(params?: {
    skip?: number
    limit?: number
    published?: boolean
  }): Promise<Category[]> {
    const response = await apiService.get<Category[]>('/categories', { params })
    return response.data
  },

  /**
   * Obtener una categoría por ID
   */
  async getById(id: number): Promise<Category> {
    const response = await apiService.get<Category>(`/categories/${id}`)
    return response.data
  },

  /**
   * Obtener contador de artículos de una categoría
   */
  async getArticleCount(id: number): Promise<{ category_id: number; category_name: string; article_count: number }> {
    const response = await apiService.get(`/categories/${id}/count`)
    return response.data
  }
}
