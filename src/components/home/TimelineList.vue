<script setup>
defineProps({
  experience: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <ul class="timeline-list">
    <li v-for="item in experience" :key="item.company" class="timeline-row">
      <span class="year">{{ item.year }}</span>
      <a :href="item.url" class="company">{{ item.company }}</a>
      <span class="role">{{ item.role }}</span>
    </li>
  </ul>
</template>

<style scoped>
.timeline-list {
  display: grid;
  grid-template-columns: auto auto auto;
  justify-content: start;
  column-gap: var(--space-4);
  row-gap: 12px;
  font-family: var(--font-mono);
  font-size: 13px;
}

.timeline-row {
  display: contents;
}

.year {
  color: var(--color-text-secondary);
  white-space: nowrap;
}

.company {
  transition: color 0.15s ease;
}

.company:hover {
  color: var(--color-accent);
}

.role {
  color: var(--color-text-muted);
  text-align: left;
  white-space: nowrap;
}

@media (max-width: 640px) {
  .timeline-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .timeline-row {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .role {
    text-align: left;
    white-space: normal;
  }
}
</style>
