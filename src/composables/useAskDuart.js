import { ref } from 'vue'
import { ASKDUART_API_URL } from '@/config/askduart'

const INITIAL_SUGGESTIONS = [
  'What are you working on right now?',
  'Tell me about Pulsewave',
  "What's the story behind Quietroute?",
]

const isOpen = ref(false)
const messages = ref([])
const suggestions = ref([...INITIAL_SUGGESTIONS])
const isLoading = ref(false)
const rateLimited = ref(false)

function open() {
  isOpen.value = true
}

function close() {
  isOpen.value = false
}

function toggle() {
  isOpen.value = !isOpen.value
}

function reset() {
  messages.value = []
  suggestions.value = [...INITIAL_SUGGESTIONS]
  isLoading.value = false
  rateLimited.value = false
}

async function sendMessage(text) {
  const trimmed = text.trim()
  if (!trimmed || isLoading.value) return

  messages.value.push({ role: 'user', text: trimmed })
  suggestions.value = []
  isLoading.value = true

  const history = messages.value
    .slice(0, -1)
    .slice(-6)
    .map((m) => ({ role: m.role, text: m.text }))

  try {
    const response = await fetch(`${ASKDUART_API_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: trimmed, history }),
    })

    if (response.status === 429) {
      rateLimited.value = true
      messages.value.push({
        role: 'system',
        text: "You've reached the hourly limit for AskDuart — try again in a bit.",
      })
      return
    }

    if (!response.ok) {
      messages.value.push({
        role: 'system',
        text: 'AskDuart is having trouble thinking right now — try again shortly.',
      })
      return
    }

    const data = await response.json()
    messages.value.push({ role: 'assistant', text: data.reply })
    suggestions.value = Array.isArray(data.suggestions) ? data.suggestions.slice(0, 3) : []
  } catch {
    messages.value.push({
      role: 'system',
      text: 'AskDuart is having trouble thinking right now — try again shortly.',
    })
  } finally {
    isLoading.value = false
  }
}

export function useAskDuart() {
  return {
    isOpen,
    messages,
    suggestions,
    isLoading,
    rateLimited,
    open,
    close,
    toggle,
    reset,
    sendMessage,
  }
}
