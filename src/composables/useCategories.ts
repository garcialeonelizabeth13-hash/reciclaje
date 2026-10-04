import { ref } from 'vue'
import { categoriesService } from '../services/categories'
import type { Category } from '../types'

export function useCategories() {
  const categories = ref<Category[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchCategories = async () => {
    loading.value = true
    error.value = null
    try {
      categories.value = await categoriesService.getAll(0, 50)
    } catch (err: any) {
      error.value = err.message || 'Error al cargar categorías'
    } finally {
      loading.value = false
    }
  }

  const fetchCategoryCount = async (id: number) => {
    try {
      return await categoriesService.getCount(id)
    } catch (err: any) {
      error.value = err.message || 'Error al contar artículos'
      return null
    }
  }

  return {
    categories,
    loading,
    error,
    fetchCategories,
    fetchCategoryCount,
  }
}
