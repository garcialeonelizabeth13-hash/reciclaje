<script setup lang="ts">
import AppNavbar from './components/shared/AppNavbar.vue'
import AppFooter from './components/shared/AppFooter.vue'
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'

// Forzar scroll al inicio cuando se monta el componente
onMounted(() => {
  window.scrollTo(0, 0)
})
</script>

<template>
  <AppNavbar />
  <RouterView />
  <AppFooter />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #ffffff;
  color: #333333;
  line-height: 1.6;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

img {
  max-width: 100%;
  height: auto;
}
</style>
