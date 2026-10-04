import { apiService } from './api'
import type { Contact } from '../types'

export const contactsService = {
  getAll: (skip: number = 0, limit: number = 34) =>
    apiService.get<Contact[]>('/contacts', { skip, limit }),

  getById: (id: number) => apiService.get<Contact>(`/contacts/${id}`),

  getByCategory: (categoryId: number, skip: number = 0, limit: number = 20) =>
    apiService.get<Contact[]>(`/contacts/category/${categoryId}`, { skip, limit }),

  search: (query: string, skip: number = 0, limit: number = 20) =>
    apiService.get<Contact[]>(`/contacts/search/${query}`, { skip, limit }),
}
