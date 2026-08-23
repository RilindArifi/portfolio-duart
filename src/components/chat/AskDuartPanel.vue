<script setup>
import { nextTick, ref, watch } from 'vue'
import { useAskDuart } from '@/composables/useAskDuart'

const { isOpen, messages, suggestions, isLoading, rateLimited, close, reset, sendMessage } =
  useAskDuart()

const inputText = ref('')
const listEl = ref(null)

function scrollToBottom() {
  nextTick(() => {
    if (listEl.value) listEl.value.scrollTop = listEl.value.scrollHeight
  })
}

watch(messages, scrollToBottom, { deep: true })

function handleSend() {
  if (!inputText.value.trim() || isLoading.value || rateLimited.value) return
  sendMessage(inputText.value)
  inputText.value = ''
}

function handleChip(text) {
  if (isLoading.value || rateLimited.value) return
  sendMessage(text)
}
</script>

<template>
  <Teleport to="body">
    <div class="askduart-catcher" :class="{ 'is-open': isOpen }" @click="close" />
    <aside class="askduart-panel" :class="{ 'is-open': isOpen }" :aria-hidden="!isOpen">
      <header class="panel-header">
        <span class="panel-title">Ask Duart</span>
        <div class="panel-actions">
          <button
            class="icon-btn"
            title="AskDuart is an AI assistant answering on Duart's behalf — it may be imprecise."
            aria-label="About AskDuart"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="9" />
              <line x1="12" y1="11" x2="12" y2="16" />
              <circle cx="12" cy="8" r="0.5" fill="currentColor" />
            </svg>
          </button>
          <button class="icon-btn" aria-label="Reset conversation" @click="reset">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 12a9 9 0 1 0 3-6.7" />
              <path d="M3 4v5h5" />
            </svg>
          </button>
          <button class="icon-btn" aria-label="Close AskDuart" @click="close">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="5" x2="19" y2="19" />
              <line x1="19" y1="5" x2="5" y2="19" />
            </svg>
          </button>
        </div>
      </header>

      <div ref="listEl" class="panel-body" :class="{ 'is-welcome': messages.length === 0 }">
        <div v-if="messages.length === 0" class="welcome">
          <p class="welcome-heading">Hey, ask away.</p>
        </div>

        <div
          v-for="(message, index) in messages"
          :key="index"
          class="bubble-row"
          :class="`role-${message.role}`"
        >
          <p class="bubble">{{ message.text }}</p>
        </div>

        <div v-if="isLoading" class="bubble-row role-assistant">
          <div class="typing">
            <span />
            <span />
            <span />
          </div>
        </div>

        <div v-if="suggestions.length && !isLoading" class="chips">
          <button
            v-for="(chip, index) in suggestions"
            :key="index"
            class="chip"
            @click="handleChip(chip)"
          >
            <span class="chip-arrow">&#8618;</span>
            <span>{{ chip }}</span>
          </button>
        </div>
      </div>

      <footer class="panel-footer">
        <input
          v-model="inputText"
          type="text"
          placeholder="Ask about Duart..."
          :disabled="rateLimited"
          @keydown.enter="handleSend"
        />
        <button
          class="send-btn"
          aria-label="Send"
          :disabled="isLoading || rateLimited || !inputText.trim()"
          @click="handleSend"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </footer>
    </aside>
  </Teleport>
</template>

<style scoped>
.askduart-catcher {
  position: fixed;
  inset: 0;
  z-index: 400;
  background: transparent;
  pointer-events: none;
  opacity: 0;
}

.askduart-catcher.is-open {
  pointer-events: auto;
  opacity: 1;
}

.askduart-panel {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 400px;
  z-index: 400;
  display: flex;
  flex-direction: column;
  background: var(--color-bg);
  border-left: 1px solid var(--color-border);
  transform: translateX(100%);
  transition: transform 0.35s ease;
  pointer-events: none;
}

.askduart-panel.is-open {
  transform: translateX(0);
  pointer-events: auto;
}

@media (max-width: 640px) {
  .askduart-panel {
    width: 100vw;
  }
}

.panel-header {
  height: 87px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-4);
  border-bottom: 1px solid var(--color-border);
}

.panel-title {
  font-family: var(--font-mono);
  text-transform: uppercase;
  font-weight: 400;
  font-size: 13px;
  color: var(--color-text-primary);
}

.panel-actions {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  color: var(--color-text-secondary);
  transition: color 0.15s ease;
}

.icon-btn:hover {
  color: var(--color-accent);
}

.panel-body {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.panel-body.is-welcome {
  justify-content: center;
}

.welcome-heading {
  font-family: var(--font-serif);
  font-size: 26px;
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}

.bubble-row {
  display: flex;
}

.bubble-row.role-user {
  justify-content: flex-end;
}

.bubble-row.role-assistant,
.bubble-row.role-system {
  justify-content: flex-start;
}

.bubble {
  max-width: 88%;
  font-family: var(--font-sans);
  font-size: 14px;
  line-height: 1.55;
}

.role-user .bubble {
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text-primary);
}

.role-assistant .bubble {
  color: var(--color-text-primary);
}

.role-system .bubble {
  color: var(--color-text-secondary);
  font-size: 13px;
  font-style: italic;
}

.typing {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: var(--space-2) 0;
}

.typing span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-text-muted);
  animation: pulse 1.2s infinite ease-in-out;
}

.typing span:nth-child(2) {
  animation-delay: 0.15s;
}

.typing span:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes pulse {
  0%,
  80%,
  100% {
    opacity: 0.3;
  }
  40% {
    opacity: 1;
  }
}

.chips {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin-top: var(--space-2);
  padding-top: var(--space-3);
  border-top: 1px solid var(--color-border);
}

.bubble-row:first-child + .chips,
.welcome + .chips {
  border-top: none;
  padding-top: 0;
  margin-top: 0;
}

.chip {
  display: flex;
  align-items: baseline;
  gap: var(--space-2);
  text-align: left;
  font-family: var(--font-sans);
  font-size: 14px;
  line-height: 1.4;
  color: var(--color-text-secondary);
  transition: color 0.15s ease;
}

.chip-arrow {
  color: var(--color-text-muted);
  flex-shrink: 0;
}

.chip:hover {
  color: var(--color-accent);
}

.panel-footer {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  border-top: 1px solid var(--color-border);
}

.panel-footer input {
  flex: 1;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: var(--space-2) var(--space-3);
  font-family: var(--font-sans);
  font-size: 14px;
  color: var(--color-text-primary);
  background: var(--color-surface);
}

.panel-footer input:disabled {
  opacity: 0.5;
}

.send-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  color: var(--color-accent);
  transition: color 0.15s ease;
}

.send-btn:hover:not(:disabled) {
  color: var(--color-accent-hover);
}

.send-btn:disabled {
  color: var(--color-text-muted);
}
</style>
