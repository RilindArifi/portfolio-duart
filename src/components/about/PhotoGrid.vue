<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <section class="photo-section">
    <span class="label">{{ label }}</span>
    <div class="photo-row">
      <img v-for="src in images" :key="src" :src="src" alt="" />
    </div>
  </section>
</template>

<style scoped>
.photo-section {
  margin-top: var(--space-5);
}

.label {
  display: block;
  font-family: var(--font-mono);
  text-transform: uppercase;
  font-size: 12.5px;
  color: var(--color-text-secondary);
  margin-bottom: var(--space-3);
}

.photo-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-3);
}

.photo-row img {
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  border-radius: var(--radius-sm);
}

@media (max-width: 768px) {
  .photo-row {
    grid-template-columns: 1fr;
  }
}
</style>
