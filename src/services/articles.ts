import { apiService } from './api'
import type { Article } from '../types'

export const articlesService = {
  getAll: (skip: number = 0, limit: number = 20) =>
    apiService.get<Article[]>('/articles', { skip, limit }),

  getById: (id: number) => apiService.get<Article>(`/articles/${id}`),

  getByCategory: (categoryId: number, skip: number = 0, limit: number = 20) =>
    apiService.get<Article[]>(`/articles/category/${categoryId}`, { skip, limit }),

  getFeatured: (skip: number = 0, limit: number = 10) =>
    apiService.get<Article[]>('/articles/featured/list', { skip, limit }),

  search: (query: string, skip: number = 0, limit: number = 20) =>
    apiService.get<Article[]>(`/articles/search/${query}`, { skip, limit }),
}
