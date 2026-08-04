<script setup>
import PhotoGrid from '@/components/about/PhotoGrid.vue'
import { aboutHeadingLines, aboutParagraph, aboutInterests } from '@/data/about.js'
import { photoSections } from '@/data/photos.js'
</script>

<template>
  <section class="about-intro">
    <h1 class="headline">
      <span v-for="line in aboutHeadingLines" :key="line">{{ line }}<br /></span>
    </h1>
    <p class="paragraph">{{ aboutParagraph }}</p>
    <ul class="interests">
      <li v-for="interest in aboutInterests" :key="interest">{{ interest }}</li>
    </ul>
  </section>

  <PhotoGrid
    v-for="section in photoSections"
    :key="section.label"
    :label="section.label"
    :images="section.images"
  />
</template>

<style scoped>
.headline {
  font-family: var(--font-serif);
  font-size: clamp(2.25rem, 5vw, 3.5rem);
  line-height: 1.15;
  font-weight: 400;
}

.paragraph {
  max-width: 600px;
  margin-top: var(--space-4);
  font-family: var(--font-sans);
  line-height: 1.6;
}

.interests {
  max-width: 600px;
  margin-top: var(--space-4);
  padding-left: 1.25em;
  font-family: var(--font-sans);
}

.interests li {
  list-style: disc;
  line-height: 1.8;
}
</style>
