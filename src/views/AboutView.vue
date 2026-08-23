<script setup>
import PhotoGrid from '@/components/about/PhotoGrid.vue'
import { aboutHeadingLines, aboutParagraph, aboutInterests } from '@/data/about.js'
import { photoSections } from '@/data/photos.js'
</script>

<template>
  <section class="about-intro">
    <div class="intro-text">
      <h1 class="headline">
        <span v-for="line in aboutHeadingLines" :key="line">{{ line }}<br /></span>
      </h1>
      <p class="paragraph">{{ aboutParagraph }}</p>
      <ul class="interests">
        <li v-for="interest in aboutInterests" :key="interest">{{ interest }}</li>
      </ul>
    </div>
    <div class="intro-photo">
      <img class="photo-default" src="/images/about-photo.png" alt="Duart Kasapolli" />
      <img class="photo-hover" src="/images/about-photo-hover.png" alt="Duart Kasapolli" />
    </div>
  </section>

  <PhotoGrid
    v-for="section in photoSections"
    :key="section.label"
    :label="section.label"
    :images="section.images"
  />
</template>

<style scoped>
.about-intro {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-5);
  align-items: start;
}

.intro-photo {
  position: relative;
  aspect-ratio: 4 / 3;
}

.intro-photo img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
}

.intro-photo .photo-hover {
  opacity: 0;
}

.intro-photo:hover .photo-hover {
  opacity: 1;
}

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

@media (max-width: 768px) {
  .about-intro {
    grid-template-columns: 1fr;
  }

  .intro-photo {
    order: -1;
  }
}
</style>
