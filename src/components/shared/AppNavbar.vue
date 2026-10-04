<template>
  <header class="navbar" :class="{ 'navbar--scrolled': isScrolled }">
    <div class="navbar__container">
      <RouterLink to="/" class="navbar__logo">
        <img src="/img/logo.png" alt="ISDE Logo" class="navbar__logo-img" />
        <span class="navbar__logo-text">Observatorio ISDE</span>
      </RouterLink>

      <nav class="navbar__nav" :class="{ 'navbar__nav--open': menuOpen }">
        <RouterLink to="/" class="navbar__link" @click="menuOpen = false">Inicio</RouterLink>
        <RouterLink to="/articles" class="navbar__link" @click="menuOpen = false"
          >📰 Noticias</RouterLink
        >
        <RouterLink to="/categories" class="navbar__link" @click="menuOpen = false"
          >🏷️ Categorías</RouterLink
        >
        <RouterLink to="/contacts" class="navbar__link" @click="menuOpen = false"
          >👥 Contactos</RouterLink
        >
      </nav>

      <button
        class="navbar__burger"
        :class="{ 'navbar__burger--open': menuOpen }"
        @click="menuOpen = !menuOpen"
        aria-label="Menú"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

const isScrolled = ref(false)
const menuOpen = ref(false)

function handleScroll() {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1.2rem 2rem;
  transition: all 0.3s ease;
  background: rgba(0, 51, 153, 0.98);
  backdrop-filter: blur(8px);
}

.navbar--scrolled {
  background: rgba(0, 51, 153, 0.99);
  padding: 0.8rem 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.navbar__container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar__logo {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  text-decoration: none;
}

.navbar__logo-img {
  height: 40px;
  width: auto;
  object-fit: contain;
}

.navbar__logo-text {
  font-size: 1.2rem;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.5px;
}

.navbar__nav {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.navbar__link {
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  padding: 8px 14px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.navbar__link:hover,
.navbar__link.router-link-active {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
}

.navbar__burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.navbar__burger span {
  display: block;
  width: 24px;
  height: 2px;
  background: #ffffff;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.navbar__burger--open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.navbar__burger--open span:nth-child(2) {
  opacity: 0;
}

.navbar__burger--open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

@media (max-width: 768px) {
  .navbar__burger {
    display: flex;
  }

  .navbar__nav {
    position: fixed;
    top: 0;
    right: -100%;
    width: 75%;
    max-width: 300px;
    height: 100vh;
    background: #003399;
    flex-direction: column;
    align-items: flex-start;
    padding: 5rem 2rem 2rem;
    gap: 0.5rem;
    transition: right 0.3s ease;
    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.3);
  }

  .navbar__nav--open {
    right: 0;
  }

  .navbar__link {
    width: 100%;
    font-size: 1rem;
  }
}
</style>
