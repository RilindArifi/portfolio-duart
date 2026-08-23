<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import TimelineList from './TimelineList.vue'
import { experience } from '@/data/experience.js'

const words = ['clarity', 'design']
const typedWord = ref('')
const showPeriod = ref(false)
let wordIndex = 0
let charIndex = 0
let isDeleting = false
let timeoutId

function tick() {
  const currentWord = words[wordIndex]

  if (!isDeleting) {
    charIndex++
    typedWord.value = currentWord.slice(0, charIndex)
    if (charIndex === currentWord.length) {
      isDeleting = true
      showPeriod.value = true
      timeoutId = setTimeout(tick, 1400)
      return
    }
  } else {
    showPeriod.value = false
    charIndex--
    typedWord.value = currentWord.slice(0, charIndex)
    if (charIndex === 0) {
      isDeleting = false
      wordIndex = (wordIndex + 1) % words.length
    }
  }

  timeoutId = setTimeout(tick, isDeleting ? 60 : 90)
}

onMounted(() => {
  timeoutId = setTimeout(tick, 600)
})

onUnmounted(() => clearTimeout(timeoutId))
</script>

<template>
  <section class="hero">
    <h1 class="headline">
      I'm Duart, a product designer who turns<br />
      complexity into
      <span class="typewriter"
        >{{ typedWord }}<span v-show="showPeriod">.</span><span class="cursor"></span
      ></span>
    </h1>
    <TimelineList :experience="experience" />
  </section>
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
  align-items: start;
  margin-top: 136px;
}

.headline {
  font-family: var(--font-serif);
  font-size: clamp(1.5rem, 2.6vw, 2.5rem);
  line-height: 1.25;
  font-weight: 400;
}

.typewriter {
  font-style: italic;
  color: var(--color-accent);
}

.cursor {
  display: inline-block;
  width: 2px;
  height: 0.85em;
  margin-left: 2px;
  vertical-align: -0.1em;
  background: var(--color-accent);
  animation: blink 0.8s step-end infinite;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

@media (max-width: 768px) {
  .hero {
    grid-template-columns: 1fr;
    gap: var(--space-6);
    margin-top: 56px;
  }

  .headline {
    font-size: clamp(1.85rem, 7vw, 2.5rem);
  }
}
</style>
