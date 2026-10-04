/**
 * Configuración de la API
 */
export const apiConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
}

/**
 * Endpoints de la API
 */
export const API_ENDPOINTS = {
  // Health
  health: '/health',
  healthDb: '/health/db',

  // Users
  users: '/users',
  userById: (id: number) => `/users/${id}`,

  // Articles
  articles: '/articles',
  articleById: (id: number) => `/articles/${id}`,
  articlesByCategory: (categoryId: number) => `/articles/category/${categoryId}`,
  featuredArticles: '/articles/featured/list',
  searchArticles: (query: string) => `/articles/search/${query}`,

  // Categories
  categories: '/categories',
  categoryById: (id: number) => `/categories/${id}`,
  categoryCount: (id: number) => `/categories/${id}/count`,
} as const
