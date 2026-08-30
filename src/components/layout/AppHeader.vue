<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ChatToggle from '@/components/chat/ChatToggle.vue'

const route = useRoute()
const isWorkActive = computed(
  () => route.name === 'home' || route.name === 'project-detail',
)

const isMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
}

watch(() => route.fullPath, closeMenu)
</script>

<template>
  <header class="app-header">
    <div class="header-inner">
      <RouterLink to="/" class="identity">
        <span class="avatar-wrap">
          <img class="avatar avatar-default" src="/images/header-avatar.png" alt="Duart Kasapolli" />
          <img class="avatar avatar-hover" src="/images/header-avatar-hover.png" alt="Duart Kasapolli" />
        </span>
        <span class="identity-text">
          <span class="name">Duart Kasapolli</span>
          <span class="role">Product Designer</span>
        </span>
      </RouterLink>
      <nav class="header-nav">
        <RouterLink to="/" :class="{ 'router-link-active': isWorkActive }">Work</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <a href="/Duart_CV.pdf" target="_blank" rel="noopener">Resume</a>
      </nav>
      <div class="header-actions">
        <ChatToggle />
        <button
          class="menu-toggle"
          :class="{ 'is-open': isMenuOpen }"
          aria-label="Toggle menu"
          :aria-expanded="isMenuOpen"
          @click="toggleMenu"
        >
          <span class="menu-toggle-bar"></span>
          <span class="menu-toggle-bar"></span>
          <span class="menu-toggle-bar"></span>
        </button>
      </div>
    </div>
    <div class="mobile-nav-wrap" :class="{ 'is-open': isMenuOpen }">
      <nav class="mobile-nav">
        <RouterLink to="/" :class="{ 'router-link-active': isWorkActive }">Work</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <a href="/Duart_CV.pdf" target="_blank" rel="noopener">Resume</a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  position: relative;
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
  gap: 15px;
  font-family: var(--font-mono);
  justify-self: start;
}

.avatar-wrap {
  position: relative;
  width: 60px;
  height: 60px;
  flex-shrink: 0;
}

.avatar {
  position: absolute;
  inset: 0;
  width: 60px;
  height: 60px;
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

.identity-text {
  display: flex;
  align-items: center;
}

.name {
  font-size: 15px;
  text-transform: uppercase;
  font-weight: 400;
  letter-spacing: 0.02em;
}

.role {
  color: var(--color-text-secondary);
  font-size: 15px;
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
  font-size: 15px;
  line-height: 1;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  justify-self: end;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 32px;
  height: 32px;
}

.menu-toggle-bar {
  width: 20px;
  height: 2px;
  border-radius: 1px;
  background: var(--color-text-primary);
  transition:
    transform 0.3s ease,
    opacity 0.2s ease,
    background 0.15s ease;
}

.menu-toggle:hover .menu-toggle-bar {
  background: var(--color-accent);
}

.menu-toggle.is-open .menu-toggle-bar:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.menu-toggle.is-open .menu-toggle-bar:nth-child(2) {
  opacity: 0;
}

.menu-toggle.is-open .menu-toggle-bar:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

.mobile-nav-wrap {
  display: none;
}

.header-nav a {
  color: var(--color-text-secondary);
  transition: color 0.15s ease;
}

.header-nav a:hover {
  color: var(--color-accent-hover);
}

.header-nav a.router-link-active {
  color: var(--color-accent);
}

@media (max-width: 640px) {
  .identity-text {
    align-items: flex-start;
    flex-direction: column;
    gap: 2px;
  }

  .role {
    font-size: 15px;
    font-weight: 400;
    color: #32404f95;
  }

  .role::before {
    content: none;
  }
}

@media (max-width: 768px) {
  .header-inner {
    grid-template-columns: 1fr auto;
  }

  .header-nav {
    display: none;
  }

  .menu-toggle {
    display: inline-flex;
  }

  .mobile-nav-wrap {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    display: grid;
    grid-template-rows: 0fr;
    background: var(--color-bg);
    border-bottom: 1px solid var(--color-border);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.06);
    z-index: 30;
    transition: grid-template-rows 0.3s ease;
  }

  .mobile-nav-wrap.is-open {
    grid-template-rows: 1fr;
  }

  .mobile-nav {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    padding: 0 var(--container-pad);
    font-family: var(--font-mono);
    text-transform: uppercase;
    font-size: 15px;
  }

  .mobile-nav-wrap.is-open .mobile-nav {
    padding: var(--space-4) var(--container-pad) var(--space-5);
  }

  .mobile-nav a {
    color: var(--color-text-secondary);
    transition: color 0.15s ease;
  }

  .mobile-nav a:hover {
    color: var(--color-accent-hover);
  }

  .mobile-nav a.router-link-active {
    color: var(--color-accent);
  }
}
</style>
