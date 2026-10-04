import { apiClient } from './api'
import type { Category } from '../types'

export const categoriesService = {
  async getAll(skip: number = 0, limit: number = 100): Promise<Category[]> {
    return apiClient.get(`/categories?skip=${skip}&limit=${limit}`)
  },

  async getById(id: number): Promise<Category> {
    return apiClient.get(`/categories/${id}`)
  },

  async getActivity(): Promise<any> {
    return apiClient.get('/stats/categories/activity')
  },
}
