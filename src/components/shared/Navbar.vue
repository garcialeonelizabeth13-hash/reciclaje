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
        <li class="nav-item">
          <RouterLink to="/" class="navbar-link" @click="mobileMenuOpen = false">
            <i class="mdi mdi-home"></i>
            Inicio
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/observatorio" class="navbar-link" @click="mobileMenuOpen = false">
            <i class="mdi mdi-chart-line"></i>
            Observatorio
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/articulos" class="navbar-link" @click="mobileMenuOpen = false">
            <i class="mdi mdi-file-document-multiple"></i>
            Artículos
          </RouterLink>
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
  background: linear-gradient(135deg, #1a472a 0%, #2d5f3d 100%);
  padding: 0.75rem 0;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.navbar--scrolled {
  padding: 0.5rem 0;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  background: linear-gradient(135deg, #164a2a 0%, #265635 100%);
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
  font-weight: 800;
  color: #fff;
  font-size: 1.3rem;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.navbar-brand:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.navbar-brand-icon {
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.navbar-brand-text {
  letter-spacing: -0.5px;
}

.navbar-menu {
  display: flex;
  list-style: none;
  gap: 1rem;
  margin: 0;
  padding: 0;
  align-items: center;
}

.nav-item {
  position: relative;
}

.navbar-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  border-radius: 6px;
  font-size: 0.95rem;
  white-space: nowrap;
}

.navbar-link i {
  font-size: 1.1rem;
}

.navbar-link:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  transform: translateY(-2px);
}

.navbar-link.router-link-active {
  background: rgba(76, 175, 80, 0.3);
  color: #fff;
  border: 1px solid rgba(76, 175, 80, 0.5);
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
  height: 2.5px;
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

  .navbar-brand-text {
    display: none;
  }

  .navbar-menu {
    position: fixed;
    top: 60px;
    right: -100%;
    width: 100%;
    max-width: 100%;
    height: calc(100vh - 60px);
    background: linear-gradient(135deg, #1a472a 0%, #2d5f3d 100%);
    flex-direction: column;
    gap: 0;
    transition: right 0.3s ease;
    overflow-y: auto;
    box-shadow: -4px 0 12px rgba(0, 0, 0, 0.2);
    padding: 1rem 0;
  }

  .navbar-menu.active {
    right: 0;
  }

  .nav-item {
    width: 100%;
  }

  .navbar-link {
    width: 100%;
    border-radius: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding: 1rem 1.5rem;
    justify-content: flex-start;
  }

  .navbar-link:hover {
    background: rgba(76, 175, 80, 0.2);
    transform: none;
  }

  .navbar-link.router-link-active {
    background: rgba(76, 175, 80, 0.3);
    border: none;
    border-left: 4px solid #4caf50;
  }
}
</style>
