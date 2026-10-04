import { ref, computed } from 'vue'
import { articlesService } from '../services/articles'
import { categoriesService } from '../services/categories'
import type { Article, Category } from '../types'

export function useArticles() {
  const articles = ref<Article[]>([])
  const categories = ref<Category[]>([])
  const loading = ref(false)

  const fetchArticles = async (skip: number = 0, limit: number = 20) => {
    loading.value = true
    try {
      const result = await articlesService.getAll(skip, limit)
      articles.value.push(...result)
      return result
    } catch (error) {
      console.error('Error fetching articles:', error)
      return []
    } finally {
      loading.value = false
    }
  }

  const fetchCategories = async () => {
    try {
      categories.value = await categoriesService.getAll(0, 100)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  return {
    articles,
    categories,
    loading,
    fetchArticles,
    fetchCategories,
  }
}
