<template>
  <div class="contacts-view">
    <div class="container">
      <!-- Header -->
      <header class="page-header">
        <h1>Contactos</h1>
        <p>Contacta con nuestro equipo para más información</p>
      </header>

      <!-- Loading -->
      <div v-if="loading" class="loading">Cargando contactos...</div>

      <!-- No Content -->
      <div v-else-if="contacts.length === 0" class="no-content">
        <p>📭 No hay contactos disponibles</p>
      </div>

      <!-- Contacts Grid -->
      <div v-else class="contacts-grid">
        <div v-for="contact in contacts" :key="contact.id" class="contact-card">
          <h3>{{ contact.name }}</h3>

          <div v-if="contact.con_position" class="field">
            <span class="label">Puesto:</span>
            <span>{{ contact.con_position }}</span>
          </div>

          <div v-if="contact.email_to" class="field">
            <span class="label">Email:</span>
            <a :href="`mailto:${contact.email_to}`">{{ contact.email_to }}</a>
          </div>

          <div v-if="contact.telephone" class="field">
            <span class="label">Teléfono:</span>
            <a :href="`tel:${contact.telephone}`">{{ contact.telephone }}</a>
          </div>

          <div v-if="contact.mobile" class="field">
            <span class="label">Celular:</span>
            <a :href="`tel:${contact.mobile}`">{{ contact.mobile }}</a>
          </div>

          <div v-if="contact.address" class="field">
            <span class="label">Dirección:</span>
            <span>{{ contact.address }}</span>
          </div>

          <div v-if="contact.webpage" class="field">
            <span class="label">Web:</span>
            <a :href="contact.webpage" target="_blank" rel="noopener">{{ contact.webpage }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { contactsService } from '../services/contacts'
import type { Contact } from '../types'

const contacts = ref<Contact[]>([])
const loading = ref(false)

onMounted(async () => {
  await loadContacts()
})

const loadContacts = async () => {
  loading.value = true
  try {
    contacts.value = await contactsService.getAll(0, 100)
  } catch (err) {
    console.error('Error loading contacts:', err)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.contacts-view {
  min-height: 100vh;
  background: #f8f9fa;
  padding: 40px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 50px;
}

.page-header h1 {
  font-size: 3rem;
  font-weight: 800;
  color: #003399;
  margin-bottom: 15px;
}

.page-header p {
  font-size: 1.1rem;
  color: #666;
}

/* Grid */
.contacts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
}

.contact-card {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border-left: 4px solid #003399;
}

.contact-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 51, 153, 0.15);
}

.contact-card h3 {
  font-size: 1.4rem;
  font-weight: 700;
  color: #003399;
  margin: 0 0 20px 0;
}

.field {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 10px;
  margin-bottom: 15px;
  align-items: flex-start;
}

.label {
  font-weight: 600;
  color: #666;
  font-size: 0.9rem;
}

.field span,
.field a {
  color: #333;
  font-size: 0.95rem;
  word-break: break-word;
}

.field a {
  color: #003399;
  text-decoration: none;
  transition: color 0.2s;
}

.field a:hover {
  color: #005acc;
  text-decoration: underline;
}

/* States */
.loading,
.no-content {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 8px;
  font-size: 1.1rem;
  color: #666;
}

@media (max-width: 768px) {
  .contacts-view {
    margin-top: 80px;
  }

  .page-header h1 {
    font-size: 2rem;
  }

  .contacts-grid {
    grid-template-columns: 1fr;
  }

  .field {
    grid-template-columns: 1fr;
  }
}
</style>
