import { defineStore } from 'pinia'
import { ref } from 'vue'
import { contactsService } from '../services/contacts'
import type { Contact } from '../types'

export const useContactsStore = defineStore('contacts', () => {
  const contacts = ref<Contact[]>([])
  const currentContact = ref<Contact | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const searchQuery = ref('')

  const fetchContacts = async (skip: number = 0, limit: number = 34) => {
    loading.value = true
    error.value = null
    try {
      contacts.value = await contactsService.getAll(skip, limit)
    } catch (err: any) {
      error.value = err.message || 'Error al cargar contactos'
    } finally {
      loading.value = false
    }
  }

  const fetchContactById = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      currentContact.value = await contactsService.getById(id)
    } catch (err: any) {
      error.value = err.message || 'Error al cargar contacto'
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
    currentContact,
    loading,
    error,
    searchQuery,
    fetchContacts,
    fetchContactById,
    search,
  }
})
