<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ChatToggle from '@/components/chat/ChatToggle.vue'

const route = useRoute()
const isWorkActive = computed(
  () => route.name === 'home' || route.name === 'project-detail',
)
</script>

<template>
  <header class="app-header">
    <div class="header-inner">
      <RouterLink to="/" class="identity">
        <span class="avatar-wrap">
          <img class="avatar avatar-default" src="/images/header-avatar.png" alt="Duart Kasapolli" />
          <img class="avatar avatar-hover" src="/images/header-avatar-hover.png" alt="Duart Kasapolli" />
        </span>
        <span class="name">Duart Kasapolli</span>
        <span class="role">Product Designer</span>
      </RouterLink>
      <nav class="header-nav">
        <RouterLink to="/" :class="{ 'router-link-active': isWorkActive }">Work</RouterLink>
        <RouterLink to="/fun">Fun</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <a href="/Duart_CV.pdf" target="_blank" rel="noopener">Resume</a>
      </nav>
      <div class="header-actions">
        <ChatToggle />
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
}

.header-inner {
  max-width: var(--container-max);
  margin: 0 auto;
  min-height: 65px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: var(--space-2) var(--container-pad);
}

.identity {
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: var(--font-mono);
  justify-self: start;
}

.avatar-wrap {
  position: relative;
  width: 70px;
  height: 70px;
  flex-shrink: 0;
}

.avatar {
  position: absolute;
  inset: 0;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  transition: opacity 0.25s ease;
}

.avatar-hover {
  opacity: 0;
}

.identity:hover .avatar-hover {
  opacity: 1;
}

.name {
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 400;
  letter-spacing: 0.02em;
}

.role {
  color: var(--color-text-secondary);
  font-size: 16px;
  text-transform: uppercase;
  transition: color 0.25s ease;
}

.identity:hover .role {
  color: var(--color-accent);
}

.role::before {
  content: '•';
  margin-right: var(--space-2);
  color: var(--color-text-muted);
}

.header-right {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.header-nav {
  display: flex;
  align-items: center;
  justify-self: center;
  gap: 32px;
  font-family: var(--font-mono);
  text-transform: uppercase;
  font-size: 13px;
  line-height: 1;
}

.header-actions {
  display: flex;
  align-items: center;
  justify-self: end;
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
