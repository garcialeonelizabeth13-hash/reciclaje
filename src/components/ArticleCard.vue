<template>
  <article class="article-card">
    <div class="article-card-header">
      <span class="article-category" :style="{ background: categoryColor }">{{ categoryName }}</span>
      <span class="article-date">{{ formatDate }}</span>
    </div>

    <h3 class="article-card-title">{{ article.title }}</h3>

    <p class="article-card-excerpt">{{ excerpt }}</p>

    <div class="article-card-footer">
      <div class="article-meta">
        <span class="meta-item">👁️ {{ article.hits || 0 }} vistas</span>
        <span class="meta-item" v-if="article.featured">⭐ Destacado</span>
      </div>
      <RouterLink :to="`/articulos/${article.id}`" class="read-link">Leer más →</RouterLink>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import type { Article } from '../types'

interface Props {
  article: Article
  categoryName?: string
}

const props = withDefaults(defineProps<Props>(), {
  categoryName: 'General',
})

const categoryColor = computed(() => {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F']
  return colors[props.article.catid % colors.length]
})

const formatDate = computed(() => {
  const date = new Date(props.article.created)
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
})

const excerpt = computed(() => {
  const text = props.article.introtext.replace(/<[^>]*>/g, '')
  return text.length > 150 ? text.substring(0, 150) + '...' : text
})
</script>

<style scoped>
.article-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.article-card-header {
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  border-bottom: 1px solid #f0f0f0;
}

.article-category {
  display: inline-block;
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  color: #fff;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}

.article-date {
  font-size: 0.85rem;
  color: #999;
  white-space: nowrap;
}

.article-card-title {
  padding: 1rem;
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #003399;
  line-height: 1.4;
  flex-grow: 1;
}

.article-card-excerpt {
  padding: 0 1rem;
  margin: 0;
  font-size: 0.95rem;
  color: #666;
  line-height: 1.5;
  flex-grow: 1;
}

.article-card-footer {
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-top: 1px solid #f0f0f0;
}

.article-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.85rem;
  color: #999;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.read-link {
  color: #003399;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s ease;
  white-space: nowrap;
}

.read-link:hover {
  color: #002266;
}

@media (max-width: 768px) {
  .article-card-header {
    flex-wrap: wrap;
  }

  .article-card-title {
    font-size: 1rem;
  }
}
</style>
