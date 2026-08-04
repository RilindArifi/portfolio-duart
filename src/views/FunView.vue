<script setup>
import ProjectGrid from '@/components/home/ProjectGrid.vue'
import PhotoGrid from '@/components/about/PhotoGrid.vue'
import { funProjects } from '@/data/fun.js'
</script>

<template>
  <section class="fun-intro">
    <h1 class="headline">Outside of work, <em>this</em> is what I'm into.</h1>
    <p class="paragraph">
      A running log of side projects and hobbies — competitive CS2, markets,
      and the gym. Mostly for me, but you're welcome to look.
    </p>
  </section>

  <ProjectGrid :projects="funProjects" />

  <PhotoGrid
    label="04. GYM"
    :images="['/images/gym-01.svg', '/images/gym-02.svg', '/images/gym-03.svg']"
  />
</template>

<style scoped>
.headline {
  font-family: var(--font-serif);
  font-size: clamp(2.25rem, 5vw, 3.5rem);
  line-height: 1.15;
}

.headline em {
  font-style: italic;
}

.paragraph {
  max-width: 600px;
  margin-top: var(--space-4);
  font-family: var(--font-sans);
  line-height: 1.6;
}
</style>
