import { apiClient } from './api'
import type { Article } from '../types'

export const articlesService = {
  async getAll(skip: number = 0, limit: number = 20): Promise<Article[]> {
    return apiClient.get(`/articles?skip=${skip}&limit=${limit}`)
  },

  async getById(id: number): Promise<Article> {
    return apiClient.get(`/articles/${id}`)
  },

  async getByCategory(categoryId: number, skip: number = 0, limit: number = 20): Promise<Article[]> {
    return apiClient.get(`/articles/category/${categoryId}?skip=${skip}&limit=${limit}`)
  },

  async getFeatured(skip: number = 0, limit: number = 10): Promise<Article[]> {
    return apiClient.get(`/articles/featured/list?skip=${skip}&limit=${limit}`)
  },

  async search(query: string, skip: number = 0, limit: number = 20): Promise<Article[]> {
    return apiClient.get(`/articles/search/${query}?skip=${skip}&limit=${limit}`)
  },
}
