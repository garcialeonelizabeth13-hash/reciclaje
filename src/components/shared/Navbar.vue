<template>
  <nav class="navbar" :class="{ 'navbar--scrolled': scrolled }">
    <div class="navbar-container">
      <RouterLink to="/" class="navbar-brand">
        <span class="navbar-brand-icon">♻️</span>
        <span class="navbar-brand-text">Observatorio ISDE</span>
      </RouterLink>

      <button
        class="navbar-toggle"
        :class="{ active: mobileMenuOpen }"
        @click="mobileMenuOpen = !mobileMenuOpen"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul class="navbar-menu" :class="{ active: mobileMenuOpen }">
        <li>
          <RouterLink to="/" class="navbar-link" @click="mobileMenuOpen = false">Inicio</RouterLink>
        </li>
        <li>
          <RouterLink to="/observatorio" class="navbar-link" @click="mobileMenuOpen = false"
            >Observatorio</RouterLink
          >
        </li>
        <li>
          <RouterLink to="/articulos" class="navbar-link" @click="mobileMenuOpen = false"
            >Artículos</RouterLink
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

const scrolled = ref(false)
const mobileMenuOpen = ref(false)

const handleScroll = () => {
  scrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: linear-gradient(135deg, #003399 0%, #002266 100%);
  padding: 1rem 0;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar--scrolled {
  padding: 0.5rem 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  font-weight: 700;
  color: #fff;
  font-size: 1.25rem;
}

.navbar-brand-icon {
  font-size: 1.75rem;
}

.navbar-menu {
  display: flex;
  list-style: none;
  gap: 0;
  margin: 0;
  padding: 0;
}

.navbar-link {
  display: block;
  padding: 0.75rem 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  border-radius: 4px;
}

.navbar-link:hover,
.navbar-link.router-link-active {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
}

.navbar-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.navbar-toggle span {
  width: 24px;
  height: 2px;
  background: #fff;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.navbar-toggle.active span:nth-child(1) {
  transform: rotate(45deg) translateY(12px);
}

.navbar-toggle.active span:nth-child(2) {
  opacity: 0;
}

.navbar-toggle.active span:nth-child(3) {
  transform: rotate(-45deg) translateY(-12px);
}

@media (max-width: 768px) {
  .navbar-toggle {
    display: flex;
  }

  .navbar-menu {
    position: fixed;
    top: 60px;
    right: -100%;
    width: 100%;
    max-width: 300px;
    height: calc(100vh - 60px);
    background: linear-gradient(135deg, #003399 0%, #002266 100%);
    flex-direction: column;
    gap: 0;
    transition: right 0.3s ease;
    overflow-y: auto;
    box-shadow: -4px 0 12px rgba(0, 0, 0, 0.2);
  }

  .navbar-menu.active {
    right: 0;
  }

  .navbar-link {
    border-radius: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
}
</style>
