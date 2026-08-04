<script setup>
import TimelineList from './TimelineList.vue'
import { experience } from '@/data/experience.js'
</script>

<template>
  <section class="hero">
    <h1 class="headline">
      I'm Duart, a UI/UX designer who builds <em>real</em> products.
    </h1>
    <TimelineList :experience="experience" />
  </section>
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: var(--space-4);
  align-items: start;
  margin-top: 136px;
}

.headline {
  font-family: var(--font-serif);
  font-size: clamp(2.25rem, 5vw, 3.5rem);
  line-height: 1.15;
  font-weight: 400;
}

.headline em {
  font-style: italic;
}

@media (max-width: 768px) {
  .hero {
    grid-template-columns: 1fr;
    margin-top: 56px;
  }
}
</style>
