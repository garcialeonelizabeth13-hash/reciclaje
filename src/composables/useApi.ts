import { ref, type Ref } from 'vue'

/**
 * Composable genérico para manejar peticiones a la API
 */
export function useApi<T>() {
  const data: Ref<T | null> = ref(null)
  const loading = ref(false)
  const error: Ref<Error | null> = ref(null)

  /**
   * Ejecutar una petición a la API
   */
  const execute = async (apiCall: () => Promise<T>): Promise<T | null> => {
    loading.value = true
    error.value = null
    
    try {
      const result = await apiCall()
      data.value = result
      return result
    } catch (err) {
      error.value = err as Error
      console.error('Error en la petición:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  /**
   * Resetear el estado
   */
  const reset = () => {
    data.value = null
    loading.value = false
    error.value = null
  }

  return {
    data,
    loading,
    error,
    execute,
    reset,
  }
}
