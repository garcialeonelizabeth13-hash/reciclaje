import { apiClient } from './api'

export const statsService = {
  async getOverview(): Promise<any> {
    return apiClient.get('/stats/overview')
  },

  async getPopularContent(limit: number = 10): Promise<any> {
    return apiClient.get(`/stats/content/popular?limit=${limit}`)
  },

  async getRecentContent(limit: number = 10): Promise<any> {
    return apiClient.get(`/stats/content/recent?limit=${limit}`)
  },

  async getDatabaseHealth(): Promise<any> {
    return apiClient.get('/stats/database/health')
  },
}
