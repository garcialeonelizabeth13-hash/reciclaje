import { apiService } from './api'
import type { Comment } from '../types'

export const commentsService = {
  getAll: (skip: number = 0, limit: number = 20) =>
    apiService.get<Comment[]>('/comments', { skip, limit }),

  getById: (id: number) => apiService.get<Comment>(`/comments/${id}`),

  getByArticle: (articleId: number, skip: number = 0, limit: number = 50) =>
    apiService.get<Comment[]>(`/comments/article/${articleId}`, { skip, limit }),

  create: (data: {
    contentid: number
    name: string
    email: string
    comment: string
    title?: string
    website?: string
    parentid?: number
  }) => apiService.post<Comment>('/comments', data),

  getStats: () => apiService.get<any>('/comments/stats/summary'),
}
