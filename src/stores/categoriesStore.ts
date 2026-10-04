import { defineStore } from 'pinia'
import { ref } from 'vue'
import { categoriesService } from '../services/categories'
import type { Category } from '../types'

export const useCategoriesStore = defineStore('categories', () => {
  const categories = ref<Category[]>([])
  const currentCategory = ref<Category | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchCategories = async (skip: number = 0, limit: number = 50) => {
    loading.value = true
    error.value = null
    try {
      categories.value = await categoriesService.getAll(skip, limit)
    } catch (err: any) {
      error.value = err.message || 'Error al cargar categorías'
    } finally {
      loading.value = false
    }
  }

  const fetchCategoryById = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      currentCategory.value = await categoriesService.getById(id)
    } catch (err: any) {
      error.value = err.message || 'Error al cargar categoría'
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
    currentCategory,
    loading,
    error,
    fetchCategories,
    fetchCategoryById,
    fetchCategoryCount,
  }
})
