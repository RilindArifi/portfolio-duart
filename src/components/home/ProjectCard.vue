<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  project: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <component
    :is="project.slug ? RouterLink : 'a'"
    v-bind="project.slug ? { to: `/work/${project.slug}` } : { href: project.url }"
    class="project-card"
  >
    <div class="image-wrap">
      <img :src="project.image" :alt="project.title" />
    </div>
    <div class="meta-row">
      <span class="title">{{ project.title }}</span>
      <span class="meta"
        >{{ project.company }} • {{ project.status }} {{ project.year }}</span
      >
    </div>
  </component>
</template>

<style scoped>
.project-card {
  display: block;
  position: relative;
}

.image-wrap {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.image-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.meta-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-3);
  margin-top: var(--space-3);
}

.title {
  font-family: var(--font-serif);
  font-size: 19px;
}

.meta {
  font-family: var(--font-mono);
  text-transform: uppercase;
  font-size: 12.5px;
  color: var(--color-text-secondary);
  white-space: nowrap;
}
</style>
