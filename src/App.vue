<script setup>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import CustomCursor from '@/components/layout/CustomCursor.vue'
import AskDuartPanel from '@/components/chat/AskDuartPanel.vue'
import { useAskDuart } from '@/composables/useAskDuart'

const { isOpen } = useAskDuart()
</script>

<template>
  <div class="app-shell" :class="{ 'panel-open': isOpen }">
    <CustomCursor />
    <AppHeader />
    <main class="app-main">
      <RouterView />
    </main>
    <AppFooter />
  </div>
  <AskDuartPanel />
</template>

<style scoped>
.app-shell {
  transition: margin-right 0.35s ease;
}

.app-shell.panel-open {
  margin-right: 400px;
}

.app-main {
  padding: var(--space-6) var(--container-pad);
}

@media (max-width: 768px) {
  .app-main {
    padding: var(--space-5) var(--container-pad);
  }
}

@media (max-width: 640px) {
  .app-shell.panel-open {
    margin-right: 0;
  }
}
</style>
