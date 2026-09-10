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
    <div class="hero-copy">
      <h1 class="headline">
        I'm Duart, a product designer who turns
        <br class="wide-break" />
        complexity into
        <br class="type-break" />
        <span class="typewriter"
          >{{ typedWord }}<span v-show="showPeriod">.</span><span class="cursor"></span
        ></span>
      </h1>
      <a
        class="book-call-btn"
        href="https://cal.com/duart-kasapolli-design/30min"
        target="_blank"
        rel="noopener"
      >
        Book a call
      </a>
    </div>
    <TimelineList :experience="experience" />
  </section>
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
  align-items: start;
  /* Matches the reference's 26vh hero offset, minus .app-main's own top padding. */
  margin-top: calc(26vh - var(--space-6));
}

.hero-copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-4);
}

.headline {
  font-family: var(--font-serif);
  font-size: clamp(1.5rem, 2.55vw, 2.5rem);
  line-height: 1.25;
  font-weight: 400;
}

.book-call-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border-radius: 999px;
  background: var(--color-accent);
  color: #fff;
  font-family: var(--font-mono);
  text-transform: uppercase;
  font-size: 13px;
  letter-spacing: 0.02em;
  transition: background 0.15s ease;
}

.book-call-btn:hover {
  background: var(--color-accent-hover);
}

.wide-break {
  display: none;
}

/* The typed word only drops to its own line on phones. */
.type-break {
  display: none;
}

/* Only wide enough here for the designed two-line break after "turns". */
@media (min-width: 1440px) {
  .wide-break {
    display: block;
  }
}

@media (max-width: 640px) {
  .type-break {
    display: block;
  }
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
    font-size: 2.75rem;
    line-height: 1.1;
    letter-spacing: -0.02em;
  }
}
</style>
