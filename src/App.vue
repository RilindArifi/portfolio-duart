<script setup>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import CustomCursor from '@/components/layout/CustomCursor.vue'
</script>

<template>
  <CustomCursor />
  <AppHeader />
  <main class="app-main">
    <RouterView />
  </main>
  <AppFooter />
</template>

<style scoped>
.app-main {
  padding: var(--space-6) var(--container-pad);
}

@media (max-width: 768px) {
  .app-main {
    padding: var(--space-5) var(--container-pad);
  }
}
</style>
