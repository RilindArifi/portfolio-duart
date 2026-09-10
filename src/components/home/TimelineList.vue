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
      <div class="details">
        <a v-if="item.url" :href="item.url" class="company" target="_blank" rel="noopener">{{
          item.company
        }}</a>
        <span v-else class="company">{{ item.company }}</span>
        <span class="role">{{ item.role }}</span>
      </div>
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
  font-size: 15px;
}

.timeline-row {
  display: contents;
}

.details {
  display: contents;
}

.year {
  color: var(--color-text-secondary);
  white-space: nowrap;
}

.company {
  color: #32404f;
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

/* Tablet and below: stack company over role, like the single-column hero. */
@media (max-width: 768px) {
  .timeline-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .timeline-row {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    gap: var(--space-6);
  }

  .year {
    flex-shrink: 0;
    width: 88px;
  }

  .details {
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
