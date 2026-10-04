import { apiService } from './api.service'
import { API_ENDPOINTS } from '@/config/api.config'
import type { User, UserCreate, UserUpdate } from '@/types/user.types'

/**
 * Servicio para operaciones relacionadas con usuarios
 */
export const userService = {
  /**
   * Obtener todos los usuarios
   */
  async getAll(skip: number = 0, limit: number = 100): Promise<User[]> {
    const response = await apiService.get<User[]>(API_ENDPOINTS.users, {
      params: { skip, limit },
    })
    return response.data
  },

  /**
   * Obtener un usuario por ID
   */
  async getById(id: number): Promise<User> {
    const response = await apiService.get<User>(API_ENDPOINTS.userById(id))
    return response.data
  },

  /**
   * Crear un nuevo usuario
   */
  async create(userData: UserCreate): Promise<User> {
    const response = await apiService.post<User>(API_ENDPOINTS.users, userData)
    return response.data
  },

  /**
   * Actualizar un usuario
   */
  async update(id: number, userData: UserUpdate): Promise<User> {
    const response = await apiService.put<User>(API_ENDPOINTS.userById(id), userData)
    return response.data
  },

  /**
   * Eliminar un usuario
   */
  async delete(id: number): Promise<void> {
    await apiService.delete(API_ENDPOINTS.userById(id))
  },
}
