# 🔗 Integración Frontend ↔ Backend

Guía completa para probar la conexión entre el frontend Vue 3 y el backend FastAPI.

## 📋 Requisitos Previos

- **Backend corriendo**: El backend debe estar ejecutándose en `http://localhost:8000`
- **Base de datos**: MySQL/MariaDB configurada con la base de datos `observatorio`
- **Node.js**: Instalado para ejecutar el frontend

## 🚀 Cómo Probar la Integración

### 1. Iniciar el Backend

```bash
# En el directorio: d:\Proyectos\Empresa\isdebackend

# Activar entorno virtual (si usas venv)
venv\Scripts\activate

# O si usas .venv
.venv\Scripts\activate

# Iniciar el servidor
python main.py
```

El backend estará disponible en: **http://localhost:8000**

Verifica que funciona visitando:
- API: http://localhost:8000
- Documentación: http://localhost:8000/docs

### 2. Iniciar el Frontend

```bash
# En el directorio: d:\Proyectos\Empresa\reciclaje

# Instalar dependencias (si no lo has hecho)
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El frontend estará disponible en: **http://localhost:5173**

### 3. Probar la Integración

1. Abre el navegador en `http://localhost:5173`
2. Haz clic en **"Usuarios"** en el navbar
3. Verás la vista de gestión de usuarios que se conecta al backend

## 🎯 Funcionalidades Disponibles

### En la Vista de Usuarios (`/users`)

✅ **Listar usuarios**: Se cargan automáticamente desde el backend  
✅ **Crear usuario**: Formulario que envía datos al backend  
✅ **Eliminar usuario**: Elimina usuarios con confirmación  
✅ **Recargar**: Actualiza la lista de usuarios  
✅ **Manejo de errores**: Muestra mensajes si el backend no está disponible  

## 📁 Archivos Creados para la Integración

### Configuración
- `.env.development` - Variables de entorno para desarrollo
- `.env.production` - Variables de entorno para producción
- `src/config/api.config.ts` - Configuración de endpoints

### Servicios
- `src/services/api.service.ts` - Servicio centralizado con Axios
- `src/services/user.service.ts` - Servicio específico de usuarios

### Tipos
- `src/types/user.types.ts` - Interfaces TypeScript para usuarios

### Composables
- `src/composables/useApi.ts` - Composable genérico para peticiones
- `src/composables/useUsers.ts` - Composable específico para usuarios

### Vistas
- `src/views/UsersView.vue` - Ejemplo de integración con el backend

## 🔧 Configuración

### Variables de Entorno

El frontend usa variables de entorno para la URL del backend:

**Desarrollo** (`.env.development`):
```env
VITE_API_BASE_URL=http://localhost:8000
```

**Producción** (`.env.production`):
```env
VITE_API_BASE_URL=https://tu-dominio-backend.com
```

### CORS en el Backend

El backend ya está configurado para aceptar peticiones del frontend:

```python
# En: app/config.py
ALLOWED_ORIGINS: List[str] = [
    "http://localhost:5173",  # Vite dev server
    "http://127.0.0.1:5173",
    # ... otros orígenes
]
```

## 💡 Cómo Usar en Otros Componentes

### Ejemplo 1: Obtener Usuarios

```vue
<script setup lang="ts">
import { onMounted } from 'vue'
import { useUsers } from '@/composables/useUsers'

const { users, loading, error, fetchUsers } = useUsers()

onMounted(async () => {
  await fetchUsers()
})
</script>

<template>
  <div>
    <p v-if="loading">Cargando...</p>
    <p v-else-if="error">Error: {{ error.message }}</p>
    <ul v-else>
      <li v-for="user in users" :key="user.id">
        {{ user.username }} - {{ user.email }}
      </li>
    </ul>
  </div>
</template>
```

### Ejemplo 2: Crear Usuario

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useUsers } from '@/composables/useUsers'

const { createUser, loading } = useUsers()

const newUser = ref({
  email: '',
  username: '',
  password: '',
  full_name: ''
})

const handleSubmit = async () => {
  const result = await createUser(newUser.value)
  if (result) {
    alert('Usuario creado!')
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="newUser.email" type="email" placeholder="Email" />
    <input v-model="newUser.username" type="text" placeholder="Username" />
    <input v-model="newUser.password" type="password" placeholder="Password" />
    <button type="submit" :disabled="loading">
      {{ loading ? 'Creando...' : 'Crear' }}
    </button>
  </form>
</template>
```

### Ejemplo 3: Petición Personalizada

```typescript
import { apiService } from '@/services/api.service'

// GET
const data = await apiService.get('/endpoint')

// POST
const result = await apiService.post('/endpoint', { data: 'value' })

// PUT
const updated = await apiService.put('/endpoint/1', { data: 'new-value' })

// DELETE
await apiService.delete('/endpoint/1')
```

## 🐛 Solución de Problemas

### Error: "No se recibió respuesta del servidor"

**Solución**: Verifica que el backend esté corriendo en `http://localhost:8000`

```bash
# Prueba manualmente
curl http://localhost:8000/health
```

### Error: CORS

**Solución**: Asegúrate de que el frontend esté en puerto 5173 y que el backend tenga configurado CORS correctamente.

### Error 401/403

**Solución**: Estos errores son de autenticación. Si implementas JWT, agrega el token en `localStorage`:

```typescript
localStorage.setItem('access_token', 'tu-token-aqui')
```

## 📚 Próximos Pasos

- [ ] Agregar autenticación JWT
- [ ] Crear servicios para otros endpoints del backend
- [ ] Agregar más vistas que consuman la API
- [ ] Implementar paginación en listas grandes
- [ ] Agregar notificaciones toast para acciones exitosas/errores
- [ ] Implementar caché local con Pinia

## 🆘 Necesitas Ayuda?

1. Revisa la documentación del backend en: http://localhost:8000/docs
2. Revisa los logs del backend en la terminal
3. Abre DevTools (F12) en el navegador para ver errores de consola
4. Verifica la pestaña "Network" para ver las peticiones HTTP

---

✨ **¡La integración está lista!** Ahora puedes crear más vistas y componentes que se conecten con el backend.
