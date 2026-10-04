import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { apiConfig } from '@/config/api.config'

/**
 * Instancia de Axios configurada para la API
 */
class ApiService {
  private axiosInstance: AxiosInstance

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: apiConfig.baseURL,
      timeout: apiConfig.timeout,
      headers: apiConfig.headers,
    })

    // Interceptor para peticiones
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // Aquí puedes agregar tokens de autenticación
        const token = localStorage.getItem('access_token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Interceptor para respuestas
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        // Manejo global de errores
        if (error.response) {
          switch (error.response.status) {
            case 401:
              // No autorizado - redirigir a login
              console.error('No autorizado')
              break
            case 403:
              // Prohibido
              console.error('Acceso prohibido')
              break
            case 404:
              // No encontrado
              console.error('Recurso no encontrado')
              break
            case 500:
              // Error del servidor
              console.error('Error del servidor')
              break
            default:
              console.error('Error en la petición:', error.response.data)
          }
        } else if (error.request) {
          console.error('No se recibió respuesta del servidor')
        } else {
          console.error('Error al configurar la petición:', error.message)
        }
        return Promise.reject(error)
      }
    )
  }

  /**
   * GET request
   */
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get<T>(url, config)
  }

  /**
   * POST request
   */
  async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(url, data, config)
  }

  /**
   * PUT request
   */
  async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put<T>(url, data, config)
  }

  /**
   * DELETE request
   */
  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete<T>(url, config)
  }

  /**
   * PATCH request
   */
  async patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.patch<T>(url, data, config)
  }
}

// Exportar una instancia única (Singleton)
export const apiService = new ApiService()
