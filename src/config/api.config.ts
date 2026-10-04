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
  
  // Aquí puedes agregar más endpoints según los vayas creando en el backend
} as const
