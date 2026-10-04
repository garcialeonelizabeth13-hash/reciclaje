<template>
  <div class="article-detail">
    <div class="container">
      <!-- Breadcrumb -->
      <nav class="breadcrumb">
        <router-link to="/">Home</router-link> /
        <router-link to="/articles">Artículos</router-link> /
        <span>Detalle</span>
      </nav>

      <!-- Loading -->
      <div v-if="loading" class="loading">Cargando artículo...</div>

      <!-- Error -->
      <div v-else-if="error" class="error">⚠️ {{ error }}</div>

      <!-- Article -->
      <div v-else-if="article" class="article">
        <header class="article-header">
          <h1>{{ article.title }}</h1>
          <div class="meta">
            <span class="date">📅 {{ formatDate(article.created) }}</span>
            <span class="hits">👁️ {{ article.hits }} vistas</span>
            <span class="category">
              <router-link :to="`/articles?category=${article.catid}`">
                {{ getCategoryName(article.catid) }}
              </router-link>
            </span>
          </div>
        </header>

        <!-- Content -->
        <div class="content">
          <div v-html="article.fulltext" class="article-body"></div>
        </div>

        <!-- Attachments -->
        <div v-if="attachments.length > 0" class="section attachments">
          <h2>📎 Archivos Adjuntos</h2>
          <ul class="attachments-list">
            <li v-for="att in attachments" :key="att.id">
              <a :href="att.url" target="_blank" rel="noopener">
                {{ att.display_name || att.filename }}
              </a>
              <span class="file-info">({{ formatFileSize(att.file_size) }})</span>
            </li>
          </ul>
        </div>

        <!-- Comments -->
        <div class="section comments">
          <h2>💬 Comentarios ({{ comments.length }})</h2>

          <!-- Comments List -->
          <div v-if="comments.length > 0" class="comments-list">
            <div v-for="comment in comments" :key="comment.id" class="comment">
              <div class="comment-header">
                <strong>{{ comment.name }}</strong>
                <span class="comment-date">{{ formatDate(comment.date) }}</span>
              </div>
              <p>{{ comment.comment }}</p>
            </div>
          </div>
          <p v-else class="no-comments">Sin comentarios aún</p>

          <!-- Comment Form -->
          <div class="comment-form">
            <h3>Dejar un comentario</h3>
            <form @submit.prevent="submitComment">
              <input
                v-model="newComment.name"
                type="text"
                placeholder="Tu nombre"
                required
                class="form-input"
              />
              <input
                v-model="newComment.email"
                type="email"
                placeholder="Tu email"
                required
                class="form-input"
              />
              <textarea
                v-model="newComment.comment"
                placeholder="Tu comentario"
                required
                rows="4"
                class="form-input"
              ></textarea>
              <button type="submit" class="btn-submit" :disabled="commentLoading">
                {{ commentLoading ? 'Enviando...' : 'Enviar Comentario' }}
              </button>
            </form>
            <p v-if="commentSuccess" class="success">✅ Comentario enviado exitosamente</p>
            <p v-if="commentError" class="error">❌ {{ commentError }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { articlesService } from '../services/articles'
import { categoriesService } from '../services/categories'
import { attachmentsService } from '../services/attachments'
import { commentsService } from '../services/comments'
import type { Article, Attachment, Comment, Category } from '../types'

const route = useRoute()

const articleId = computed(() => parseInt(route.params.id as string))
const article = ref<Article | null>(null)
const loading = ref(false)
const error = ref('')

const attachments = ref<Attachment[]>([])
const comments = ref<Comment[]>([])
const categories = ref<Category[]>([])
const newComment = ref({ name: '', email: '', comment: '' })
const commentLoading = ref(false)
const commentSuccess = ref(false)
const commentError = ref('')

onMounted(async () => {
  await fetchArticle()
  await fetchCategories()
  await loadAttachments()
  await loadComments()
})

const fetchArticle = async () => {
  loading.value = true
  error.value = ''
  try {
    article.value = await articlesService.getById(articleId.value)
  } catch (err: any) {
    error.value = err.message || 'Error cargando artículo'
  } finally {
    loading.value = false
  }
}

const fetchCategories = async () => {
  try {
    categories.value = await categoriesService.getAll()
  } catch (err) {
    console.error('Error loading categories:', err)
  }
}

const loadAttachments = async () => {
  try {
    attachments.value = await attachmentsService.getByArticle(articleId.value)
  } catch (err) {
    console.error('Error loading attachments:', err)
  }
}

const loadComments = async () => {
  try {
    comments.value = await commentsService.getByArticle(articleId.value, 0, 100)
  } catch (err) {
    console.error('Error loading comments:', err)
  }
}

const getCategoryName = (catId: number): string => {
  const category = categories.value.find((c) => c.id === catId)
  return category?.title || 'Sin categoría'
}

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const formatFileSize = (bytes: number | undefined): string => {
  if (!bytes) return 'N/A'
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i]
}

const submitComment = async () => {
  commentLoading.value = true
  commentError.value = ''
  commentSuccess.value = false

  try {
    await commentsService.create({
      contentid: articleId.value,
      ...newComment.value,
    })
    commentSuccess.value = true
    newComment.value = { name: '', email: '', comment: '' }
    await loadComments()
  } catch (err: any) {
    commentError.value = err.message || 'Error al enviar comentario'
  } finally {
    commentLoading.value = false
  }
}
</script>

<style scoped>
.article-detail {
  padding: 40px 0;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

.breadcrumb {
  margin-bottom: 30px;
  font-size: 0.9rem;
  color: #666;
}

.breadcrumb a {
  color: #1976d2;
  text-decoration: none;
  transition: color 0.2s;
}

.breadcrumb a:hover {
  color: #1565c0;
}

.loading,
.error {
  text-align: center;
  padding: 40px;
  background: white;
  border-radius: 8px;
}

.error {
  color: #d32f2f;
  background: #ffebee;
}

.article-header {
  background: white;
  padding: 30px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.article-header h1 {
  font-size: 2.5rem;
  margin-bottom: 15px;
  color: #333;
}

.meta {
  display: flex;
  gap: 20px;
  font-size: 0.9rem;
  color: #666;
  flex-wrap: wrap;
}

.category a {
  color: #1976d2;
  text-decoration: none;
}

.content {
  background: white;
  padding: 30px;
  border-radius: 8px;
  margin-bottom: 30px;
  line-height: 1.8;
}

.article-body {
  font-size: 1.1rem;
  color: #333;
}

.article-body h2 {
  margin-top: 30px;
  margin-bottom: 15px;
  font-size: 1.5rem;
}

.article-body p {
  margin-bottom: 15px;
}

.article-body img {
  max-width: 100%;
  height: auto;
  margin: 20px 0;
}

.section {
  background: white;
  padding: 30px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.section h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #333;
}

.attachments-list {
  list-style: none;
  padding: 0;
}

.attachments-list li {
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}

.attachments-list li:last-child {
  border-bottom: none;
}

.attachments-list a {
  color: #1976d2;
  text-decoration: none;
  font-weight: 500;
}

.attachments-list a:hover {
  text-decoration: underline;
}

.file-info {
  color: #999;
  font-size: 0.9rem;
  margin-left: 10px;
}

.comments-list {
  margin-bottom: 30px;
}

.comment {
  padding: 20px;
  background: #f9f9f9;
  border-radius: 4px;
  margin-bottom: 15px;
  border-left: 4px solid #1976d2;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 0.9rem;
}

.comment-date {
  color: #999;
}

.comment p {
  color: #333;
  line-height: 1.6;
}

.no-comments {
  color: #999;
  font-style: italic;
}

.comment-form {
  border-top: 2px solid #eee;
  padding-top: 30px;
}

.comment-form h3 {
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.form-input {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
  font-size: 1rem;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #1976d2;
  box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.1);
}

.btn-submit {
  background: #1976d2;
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s;
}

.btn-submit:hover:not(:disabled) {
  background: #1565c0;
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.success {
  color: #2e7d32;
  background: #f1f8e9;
  padding: 12px;
  border-radius: 4px;
  margin-top: 15px;
}

@media (max-width: 768px) {
  .article-header h1 {
    font-size: 1.8rem;
  }

  .meta {
    flex-direction: column;
    gap: 10px;
  }

  .content,
  .section {
    padding: 20px;
  }
}
</style>
