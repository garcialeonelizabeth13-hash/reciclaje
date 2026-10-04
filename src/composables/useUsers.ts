import { ref } from 'vue'
import { userService } from '@/services/user.service'
import type { User, UserCreate, UserUpdate } from '@/types/user.types'
import { useApi } from './useApi'

/**
 * Composable para manejar operaciones de usuarios
 */
export function useUsers() {
  const users = ref<User[]>([])
  const currentUser = ref<User | null>(null)
  const { loading, error, execute } = useApi<User | User[]>()

  /**
   * Obtener todos los usuarios
   */
  const fetchUsers = async (skip: number = 0, limit: number = 100) => {
    const result = await execute(() => userService.getAll(skip, limit))
    if (result) {
      users.value = result as User[]
    }
    return result
  }

  /**
   * Obtener un usuario por ID
   */
  const fetchUserById = async (id: number) => {
    const result = await execute(() => userService.getById(id))
    if (result) {
      currentUser.value = result as User
    }
    return result
  }

  /**
   * Crear un nuevo usuario
   */
  const createUser = async (userData: UserCreate) => {
    const result = await execute(() => userService.create(userData))
    if (result) {
      users.value.push(result as User)
    }
    return result
  }

  /**
   * Actualizar un usuario
   */
  const updateUser = async (id: number, userData: UserUpdate) => {
    const result = await execute(() => userService.update(id, userData))
    if (result) {
      const index = users.value.findIndex((u) => u.id === id)
      if (index !== -1) {
        users.value[index] = result as User
      }
    }
    return result
  }

  /**
   * Eliminar un usuario
   */
  const deleteUser = async (id: number) => {
    try {
      await userService.delete(id)
      users.value = users.value.filter((u) => u.id !== id)
      return true
    } catch (err) {
      error.value = err as Error
      return false
    }
  }

  return {
    users,
    currentUser,
    loading,
    error,
    fetchUsers,
    fetchUserById,
    createUser,
    updateUser,
    deleteUser,
  }
}
