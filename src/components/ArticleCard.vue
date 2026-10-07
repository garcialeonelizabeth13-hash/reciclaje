<template>
  <article class="article-card">
    <div class="article-card-header">
      <span class="article-category" :style="{ background: categoryColor }">
        <i class="mdi mdi-folder-outline"></i>
        {{ categoryName }}
      </span>
      <span class="article-date">
        <i class="mdi mdi-calendar-today"></i>
        {{ formatDate }}
      </span>
    </div>

    <div class="article-card-body">
      <h3 class="article-card-title">{{ article.title }}</h3>
      <p class="article-card-excerpt">{{ excerpt }}</p>
    </div>

    <div class="article-card-footer">
      <div class="article-meta">
        <span class="meta-item">
          <i class="mdi mdi-eye-outline"></i>
          {{ article.hits || 0 }}
        </span>
        <span class="meta-item" v-if="article.featured">
          <i class="mdi mdi-star"></i>
          Destacado
        </span>
      </div>
      <RouterLink :to="`/articulos/${article.id}`" class="read-link">
        Leer más
        <i class="mdi mdi-arrow-right"></i>
      </RouterLink>
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
  background: linear-gradient(135deg, #fff 0%, #f9fafb 100%);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid #f0f0f0;
}

.article-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 32px rgba(0, 51, 153, 0.15);
  border-color: #e0e7ff;
}

.article-card-header {
  padding: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  border-bottom: 1px solid #f0f0f0;
}

.article-category {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.9rem;
  border-radius: 20px;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  flex-shrink: 0;
}

.article-category i {
  font-size: 0.95rem;
  line-height: 1;
}

.article-date {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.8rem;
  color: #999;
  white-space: nowrap;
  flex-shrink: 0;
}

.article-date i {
  font-size: 1rem;
  line-height: 1;
}

.article-card-body {
  padding: 1.5rem 1.25rem;
  flex-grow: 1;
}

.article-card-title {
  margin: 0 0 0.75rem;
  font-size: 1.15rem;
  font-weight: 600;
  color: #003399;
  line-height: 1.4;
  transition: color 0.2s ease;
}

.article-card:hover .article-card-title {
  color: #002266;
}

.article-card-excerpt {
  margin: 0;
  font-size: 0.9rem;
  color: #666;
  line-height: 1.6;
}

.article-card-footer {
  padding: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-top: 1px solid #f0f0f0;
  background: rgba(0, 51, 153, 0.02);
}

.article-meta {
  display: flex;
  gap: 1.25rem;
  font-size: 0.8rem;
  color: #999;
}

.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.meta-item i {
  font-size: 1rem;
  color: #003399;
  line-height: 1;
}

.read-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: #003399;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  white-space: nowrap;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
}

.read-link:hover {
  color: #002266;
  background: rgba(0, 51, 153, 0.08);
  gap: 0.7rem;
}

.read-link i {
  font-size: 1.1rem;
  line-height: 1;
}

@media (max-width: 768px) {
  .article-card-header {
    flex-wrap: wrap;
  }

  .article-card-title {
    font-size: 1rem;
  }

  .article-card-footer {
    flex-direction: column;
    align-items: flex-start;
  }

  .read-link {
    width: 100%;
    justify-content: center;
  }
}
</style>
