import { apiService } from './api'
import type { StatsOverview, PopularArticle, RecentContent } from '../types'

export const statsService = {
  getOverview: () => apiService.get<StatsOverview>('/stats/overview'),

  getPopularContent: (limit: number = 10) =>
    apiService.get<{ popular_articles: PopularArticle[] }>('/stats/content/popular', { limit }),

  getRecentContent: (limit: number = 10) =>
    apiService.get<RecentContent>('/stats/content/recent', { limit }),

  getCategoriesActivity: () => apiService.get<any>('/stats/categories/activity'),

  getDatabaseHealth: () => apiService.get<any>('/stats/database/health'),
}
