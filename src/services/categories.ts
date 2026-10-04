import { apiService } from './api'
import type { Category } from '../types'

export const categoriesService = {
  getAll: (skip: number = 0, limit: number = 50) =>
    apiService.get<Category[]>('/categories', { skip, limit }),

  getById: (id: number) => apiService.get<Category>(`/categories/${id}`),

  getCount: (id: number) =>
    apiService.get<{ category_id: number; category_name: string; article_count: number }>(
      `/categories/${id}/count`,
    ),
}
