<template>
  <div class="article-card">
    <div class="article-header">
      <span v-if="article.featured" class="badge featured">Destacado</span>
    </div>
    <h3 class="article-title">
      <router-link :to="`/articles/${article.id}`">{{ article.title }}</router-link>
    </h3>
    <p class="article-summary">{{ truncate(article.introtext, 150) }}</p>
    <div class="article-meta">
      <span class="date">{{ formatDate(article.created) }}</span>
      <span class="hits">👁️ {{ article.hits }} vistas</span>
    </div>
    <router-link :to="`/articles/${article.id}`" class="read-more">Leer más →</router-link>
  </div>
</template>

<script setup lang="ts">
import type { Article } from '../types'

defineProps<{
  article: Article
}>()

const truncate = (text: string, length: number): string => {
  const plain = text.replace(/<[^>]*>/g, '')
  return plain.length > length ? plain.substring(0, length) + '...' : plain
}

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<style scoped>
.article-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  display: flex;
  flex-direction: column;
}

.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.article-header {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.badge.featured {
  background: #ffd700;
  color: #333;
}

.article-title {
  margin: 12px 0;
  font-size: 1.25rem;
  line-height: 1.4;
}

.article-title a {
  color: #333;
  text-decoration: none;
  transition: color 0.2s;
}

.article-title a:hover {
  color: #1976d2;
}

.article-summary {
  color: #666;
  margin: 12px 0;
  line-height: 1.5;
  flex-grow: 1;
}

.article-meta {
  display: flex;
  gap: 16px;
  font-size: 0.875rem;
  color: #999;
  margin: 12px 0;
}

.read-more {
  color: #1976d2;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
  align-self: flex-start;
}

.read-more:hover {
  color: #1565c0;
}
</style>
