import axios, { AxiosInstance, AxiosError } from 'axios'

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

class ApiService {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Interceptor para errores
    this.client.interceptors.response.use(
      response => response,
      error => {
        console.error('API Error:', error.response?.data || error.message)
        return Promise.reject(error)
      }
    )
  }

  async get<T>(url: string, params?: any): Promise<T> {
    try {
      const response = await this.client.get<T>(url, { params })
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  async post<T>(url: string, data?: any): Promise<T> {
    try {
      const response = await this.client.post<T>(url, data)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  async put<T>(url: string, data?: any): Promise<T> {
    try {
      const response = await this.client.put<T>(url, data)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  async delete<T>(url: string): Promise<T> {
    try {
      const response = await this.client.delete<T>(url)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  private handleError(error: any) {
    if (error.response) {
      return new Error(`Error ${error.response.status}: ${error.response.data?.detail || error.response.statusText}`)
    } else if (error.request) {
      return new Error('No response from server')
    } else {
      return error
    }
  }
}

export const apiService = new ApiService()