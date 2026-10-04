<template>
  <div class="contacts-view">
    <div class="container">
      <h1>👥 Contactos</h1>

      <input
        v-model="searchQuery"
        type="text"
        placeholder="🔍 Buscar contactos..."
        class="search-input"
        @keyup="performSearch"
      />

      <div v-if="loading" class="loading">Cargando contactos...</div>
      <div v-else-if="error" class="error">⚠️ {{ error }}</div>

      <div v-else class="contacts-list">
        <div v-for="contact in contacts" :key="contact.id" class="contact-card">
          <h3>{{ contact.name }}</h3>
          <p v-if="contact.con_position" class="position">{{ contact.con_position }}</p>
          <div class="contact-info">
            <p v-if="contact.email_to">
              📧 <a :href="`mailto:${contact.email_to}`">{{ contact.email_to }}</a>
            </p>
            <p v-if="contact.telephone">📞 {{ contact.telephone }}</p>
            <p v-if="contact.mobile">📱 {{ contact.mobile }}</p>
            <p v-if="contact.webpage">
              🌐 <a :href="contact.webpage" target="_blank">{{ contact.webpage }}</a>
            </p>
            <p v-if="contact.address">📍 {{ contact.address }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useContacts } from '../composables/useContacts'

const { contacts, loading, error, fetchContacts, search } = useContacts()
const searchQuery = ref('')

onMounted(async () => {
  await fetchContacts()
})

const performSearch = async () => {
  if (searchQuery.value.trim()) {
    await search(searchQuery.value)
  } else {
    await fetchContacts()
  }
}
</script>

<style scoped>
.contacts-view {
  padding: 40px 0;
  background: #f5f5f5;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #333;
}

.search-input {
  width: 100%;
  max-width: 400px;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  margin-bottom: 30px;
}

.loading,
.error {
  text-align: center;
  padding: 40px;
  background: white;
  border-radius: 8px;
}

.contacts-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
}

.contact-card {
  background: white;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.contact-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.contact-card h3 {
  font-size: 1.3rem;
  margin-bottom: 5px;
  color: #333;
}

.contact-card .position {
  color: #1976d2;
  font-weight: 600;
  margin-bottom: 15px;
  font-size: 0.95rem;
}

.contact-info {
  font-size: 0.95rem;
  color: #666;
  line-height: 1.8;
}

.contact-info p {
  margin: 8px 0;
}

.contact-info a {
  color: #1976d2;
  text-decoration: none;
}

.contact-info a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }

  .contacts-list {
    grid-template-columns: 1fr;
  }

  .search-input {
    max-width: 100%;
  }
}
</style>
