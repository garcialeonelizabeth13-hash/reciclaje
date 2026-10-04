import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Article, Category } from '../types'
import { articlesService } from '../services/articles'
import { categoriesService } from '../services/categories'

export const useAppStore = defineStore('app', () => {
  const articles = ref<Article[]>([])
  const categories = ref<Category[]>([])
  const stats = ref({
    totalArticles: 0,
    totalViews: 0,
    totalCategories: 0,
  })

  const fetchArticles = async () => {
    try {
      articles.value = await articlesService.getAll(0, 1000)
      stats.value.totalArticles = articles.value.filter((a) => a.state === 1).length
      stats.value.totalViews = articles.value.reduce((sum, a) => sum + (a.hits || 0), 0)
    } catch (error) {
      console.error('Error fetching articles:', error)
    }
  }

  const fetchCategories = async () => {
    try {
      categories.value = await categoriesService.getAll(0, 100)
      stats.value.totalCategories = categories.value.length
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  return {
    articles,
    categories,
    stats,
    fetchArticles,
    fetchCategories,
  }
})
