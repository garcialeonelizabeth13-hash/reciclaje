<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useUsers } from '@/composables/useUsers'
import type { UserCreate } from '@/types/user.types'

const {
  users,
  loading,
  error,
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} = useUsers()

const showCreateForm = ref(false)
const editingUserId = ref<number | null>(null)

const newUser = ref<UserCreate>({
  email: '',
  username: '',
  password: '',
  full_name: '',
})

// Cargar usuarios al montar el componente
onMounted(async () => {
  await fetchUsers()
})

// Crear nuevo usuario
const handleCreateUser = async () => {
  if (!newUser.value.email || !newUser.value.username || !newUser.value.password) {
    alert('Por favor completa los campos requeridos')
    return
  }

  const result = await createUser(newUser.value)
  if (result) {
    alert('Usuario creado exitosamente')
    showCreateForm.value = false
    resetForm()
  } else {
    alert('Error al crear usuario')
  }
}

// Eliminar usuario
const handleDeleteUser = async (id: number) => {
  if (!confirm('¿Estás seguro de eliminar este usuario?')) return

  const result = await deleteUser(id)
  if (result) {
    alert('Usuario eliminado exitosamente')
  } else {
    alert('Error al eliminar usuario')
  }
}

// Resetear formulario
const resetForm = () => {
  newUser.value = {
    email: '',
    username: '',
    password: '',
    full_name: '',
  }
  editingUserId.value = null
}

// Recargar usuarios
const handleRefresh = async () => {
  await fetchUsers()
}
</script>

<template>
  <div class="users-view">
    <div class="container">
      <div class="header">
        <h1>Gestión de Usuarios</h1>
        <p class="subtitle">Ejemplo de integración Frontend ↔ Backend</p>
      </div>

      <div class="actions">
        <button @click="showCreateForm = !showCreateForm" class="btn btn-primary">
          {{ showCreateForm ? 'Cancelar' : 'Nuevo Usuario' }}
        </button>
        <button @click="handleRefresh" class="btn btn-secondary" :disabled="loading">
          {{ loading ? 'Cargando...' : 'Recargar' }}
        </button>
      </div>

      <!-- Formulario de creación -->
      <div v-if="showCreateForm" class="create-form">
        <h2>Crear Nuevo Usuario</h2>
        <form @submit.prevent="handleCreateUser">
          <div class="form-group">
            <label for="email">Email *</label>
            <input
              id="email"
              v-model="newUser.email"
              type="email"
              required
              placeholder="usuario@ejemplo.com"
            />
          </div>

          <div class="form-group">
            <label for="username">Username *</label>
            <input
              id="username"
              v-model="newUser.username"
              type="text"
              required
              placeholder="nombreusuario"
            />
          </div>

          <div class="form-group">
            <label for="password">Password *</label>
            <input
              id="password"
              v-model="newUser.password"
              type="password"
              required
              placeholder="••••••••"
            />
          </div>

          <div class="form-group">
            <label for="fullName">Nombre Completo</label>
            <input
              id="fullName"
              v-model="newUser.full_name"
              type="text"
              placeholder="Nombre Apellido"
            />
          </div>

          <button type="submit" class="btn btn-success" :disabled="loading">
            {{ loading ? 'Creando...' : 'Crear Usuario' }}
          </button>
        </form>
      </div>

      <!-- Mensaje de error -->
      <div v-if="error" class="error-message">
        <p>❌ Error: {{ error.message }}</p>
        <p class="error-hint">
          Asegúrate de que el backend esté corriendo en http://localhost:8000
        </p>
      </div>

      <!-- Loading -->
      <div v-if="loading && !showCreateForm" class="loading">
        <p>⏳ Cargando usuarios...</p>
      </div>

      <!-- Lista de usuarios -->
      <div v-else-if="users.length > 0" class="users-list">
        <h2>Usuarios ({{ users.length }})</h2>
        <div class="users-grid">
          <div v-for="user in users" :key="user.id" class="user-card">
            <div class="user-info">
              <h3>{{ user.full_name || user.username }}</h3>
              <p class="user-email">{{ user.email }}</p>
              <p class="user-username">@{{ user.username }}</p>
              <span :class="['user-status', user.is_active ? 'active' : 'inactive']">
                {{ user.is_active ? '✓ Activo' : '✗ Inactivo' }}
              </span>
            </div>
            <div class="user-actions">
              <button @click="handleDeleteUser(user.id)" class="btn btn-danger btn-sm">
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Sin usuarios -->
      <div v-else-if="!loading" class="empty-state">
        <p>📭 No hay usuarios registrados</p>
        <button @click="showCreateForm = true" class="btn btn-primary">
          Crear Primer Usuario
        </button>
      </div>

      <!-- Info de conexión -->
      <div class="connection-info">
        <p>
          🔗 Conectado a:
          <code>{{ import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000' }}</code>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.users-view {
  min-height: 100vh;
  padding: 2rem 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  color: white;
  margin-bottom: 2rem;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 600;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background: #4caf50;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #45a049;
  transform: translateY(-2px);
}

.btn-secondary {
  background: white;
  color: #667eea;
}

.btn-secondary:hover:not(:disabled) {
  background: #f0f0f0;
  transform: translateY(-2px);
}

.btn-success {
  background: #2196f3;
  color: white;
  width: 100%;
}

.btn-success:hover:not(:disabled) {
  background: #1976d2;
}

.btn-danger {
  background: #f44336;
  color: white;
}

.btn-danger:hover {
  background: #da190b;
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}

.create-form {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.create-form h2 {
  margin-bottom: 1.5rem;
  color: #333;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: 600;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
}

.error-message {
  background: #ffebee;
  color: #c62828;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  border-left: 4px solid #f44336;
}

.error-hint {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  opacity: 0.8;
}

.loading {
  text-align: center;
  color: white;
  font-size: 1.2rem;
  padding: 3rem;
}

.users-list {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.users-list h2 {
  margin-bottom: 1.5rem;
  color: #333;
}

.users-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.user-card {
  background: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
  border: 2px solid #e0e0e0;
  transition: all 0.3s;
}

.user-card:hover {
  border-color: #667eea;
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
}

.user-info h3 {
  margin-bottom: 0.5rem;
  color: #333;
}

.user-email {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.user-username {
  color: #999;
  font-size: 0.85rem;
  margin-bottom: 0.75rem;
}

.user-status {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.user-status.active {
  background: #e8f5e9;
  color: #2e7d32;
}

.user-status.inactive {
  background: #ffebee;
  color: #c62828;
}

.user-actions {
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 12px;
  color: #666;
}

.empty-state p {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
}

.connection-info {
  margin-top: 2rem;
  text-align: center;
  color: white;
  font-size: 0.9rem;
}

.connection-info code {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  .users-grid {
    grid-template-columns: 1fr;
  }

  .actions {
    flex-direction: column;
  }
}
</style>
