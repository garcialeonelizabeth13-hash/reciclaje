<template>
  <div class="layout">
    <Navbar />
    <main class="layout-main">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navbar from './Navbar.vue'
import Footer from './Footer.vue'
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.layout-main {
  flex: 1;
  width: 100%;
  padding-top: 80px;
}

@media (max-width: 768px) {
  .layout-main {
    padding-top: 70px;
  }
}
</style>
