import { ref } from 'vue'
import { contactsService } from '../services/contacts'
import type { Contact } from '../types'

export function useContacts() {
  const contacts = ref<Contact[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchContacts = async () => {
    loading.value = true
    error.value = null
    try {
      contacts.value = await contactsService.getAll(0, 50)
    } catch (err: any) {
      error.value = err.message || 'Error al cargar contactos'
    } finally {
      loading.value = false
    }
  }

  const search = async (query: string) => {
    if (!query.trim()) {
      contacts.value = []
      return
    }
    loading.value = true
    error.value = null
    try {
      contacts.value = await contactsService.search(query)
    } catch (err: any) {
      error.value = err.message || 'Error en búsqueda de contactos'
    } finally {
      loading.value = false
    }
  }

  return {
    contacts,
    loading,
    error,
    fetchContacts,
    search,
  }
}
