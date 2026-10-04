import { apiService } from './api'
import type { Attachment } from '../types'

export const attachmentsService = {
  getAll: (skip: number = 0, limit: number = 20) =>
    apiService.get<Attachment[]>('/attachments', { skip, limit }),

  getById: (id: number) => apiService.get<Attachment>(`/attachments/${id}`),

  getByArticle: (articleId: number) =>
    apiService.get<Attachment[]>(`/attachments/article/${articleId}`),

  getStats: () => apiService.get<any>('/attachments/stats/downloads'),
}
