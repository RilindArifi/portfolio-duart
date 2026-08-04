<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isWorkActive = computed(
  () => route.name === 'home' || route.name === 'project-detail',
)
</script>

<template>
  <header class="app-header">
    <div class="identity">
      <span class="name">Duart</span>
      <span class="role">UI/UX Designer</span>
    </div>
    <nav class="header-nav">
      <RouterLink to="/" :class="{ 'router-link-active': isWorkActive }">Work</RouterLink>
      <RouterLink to="/fun">Fun</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <a href="/Duart_CV.pdf" target="_blank" rel="noopener">Resume</a>
    </nav>
  </header>
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4) var(--container-pad);
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
}

.identity {
  display: flex;
  align-items: baseline;
  gap: var(--space-3);
  font-family: var(--font-mono);
}

.name {
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.role {
  color: var(--color-text-secondary);
  font-size: 12.5px;
  text-transform: uppercase;
}

.header-nav {
  display: flex;
  align-items: center;
  gap: 32px;
  font-family: var(--font-mono);
  text-transform: uppercase;
  font-size: 13px;
}

.header-nav a {
  color: var(--color-text-primary);
  transition: color 0.15s ease;
}

.header-nav a:hover {
  color: var(--color-accent-hover);
}

.header-nav a.router-link-active {
  color: var(--color-accent);
}

@media (max-width: 640px) {
  .role {
    display: none;
  }
}
</style>
