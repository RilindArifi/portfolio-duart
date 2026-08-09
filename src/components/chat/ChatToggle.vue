<script setup>
import { useAskDuart } from '@/composables/useAskDuart'

const { isOpen, toggle } = useAskDuart()
</script>

<template>
  <button class="chat-toggle" :class="{ 'is-open': isOpen }" aria-label="Open AskDuart" @click="toggle">
    <span class="chat-toggle-badge">
      <svg class="chat-toggle-icon" viewBox="0 0 24 24" fill="currentColor">
        <path
          d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z"
        />
      </svg>
    </span>
    <span class="chat-toggle-label">Ask Duart</span>
  </button>
</template>

<style scoped>
.chat-toggle {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-accent);
  transition: color 0.15s ease;
}

.chat-toggle-label {
  font-family: var(--font-mono);
  text-transform: uppercase;
  font-size: 13px;
  line-height: 1;
  color: var(--color-text-primary);
  transition:
    color 0.15s ease,
    opacity 0.2s ease;
}

.chat-toggle-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: transparent;
  transition:
    width 0.2s ease,
    height 0.2s ease,
    background 0.2s ease;
}

.chat-toggle-icon {
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  transition: width 0.2s ease, height 0.2s ease;
}

.chat-toggle.is-open .chat-toggle-label {
  display: none;
}

.chat-toggle.is-open .chat-toggle-badge {
  width: 44px;
  height: 44px;
  background: rgba(226, 103, 46, 0.12);
}

.chat-toggle.is-open .chat-toggle-icon {
  width: 20px;
  height: 20px;
}

.chat-toggle:hover {
  color: var(--color-accent-hover);
}

.chat-toggle:hover .chat-toggle-label {
  color: var(--color-accent-hover);
}

@media (max-width: 640px) {
  .chat-toggle-label {
    display: none;
  }
}
</style>
