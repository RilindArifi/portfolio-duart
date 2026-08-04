<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { projects } from '@/data/projects.js'
import { caseStudySections, sectionCopy } from '@/data/caseStudy.js'

const route = useRoute()
const project = computed(() => projects.find((p) => p.slug === route.params.slug))
</script>

<template>
  <div v-if="project" class="project-detail">
    <RouterLink to="/" class="back-link">← Back</RouterLink>

    <div class="detail-layout">
      <aside class="toc">
        <nav>
          <a v-for="section in caseStudySections" :key="section.id" :href="`#${section.id}`">
            {{ section.label }}
          </a>
        </nav>
      </aside>

      <div class="content">
        <p class="meta">{{ project.company }} • {{ project.status }} {{ project.year }}</p>
        <h1 class="headline">{{ project.tagline }}</h1>

        <div class="hero-image">
          <img :src="project.image" :alt="project.title" />
        </div>

        <div class="info-grid">
          <div class="info-col">
            <span class="label">Role</span>
            <p>{{ project.role }}</p>
          </div>
          <div class="info-col">
            <span class="label">Timeline</span>
            <p>{{ project.timeline }}</p>
          </div>
          <div class="info-col">
            <span class="label">Team</span>
            <p>{{ project.team }}</p>
          </div>
          <div class="info-col">
            <span class="label">Skills</span>
            <p v-for="skill in project.skills" :key="skill">{{ skill }}</p>
          </div>
        </div>

        <section
          v-for="section in caseStudySections"
          :id="section.id"
          :key="section.id"
          class="case-section"
        >
          <h2>{{ section.label }}</h2>
          <p>{{ sectionCopy[section.id](project) }}</p>
        </section>
      </div>
    </div>
  </div>

  <div v-else class="not-found">
    <p>Project not found.</p>
    <RouterLink to="/">← Back to work</RouterLink>
  </div>
</template>

<style scoped>
.back-link {
  display: inline-block;
  font-family: var(--font-mono);
  text-transform: uppercase;
  font-size: 13px;
  color: var(--color-text-secondary);
  transition: color 0.15s ease;
}

.back-link:hover {
  color: var(--color-accent);
}

.detail-layout {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: var(--space-6);
  margin-top: var(--space-6);
}

.toc nav {
  position: sticky;
  top: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.toc a {
  font-family: var(--font-sans);
  font-size: 14px;
  color: var(--color-text-secondary);
  transition: color 0.15s ease;
}

.toc a:hover {
  color: var(--color-accent);
}

.meta {
  font-family: var(--font-mono);
  text-transform: uppercase;
  font-size: 13px;
  color: var(--color-text-secondary);
}

.headline {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.15;
  font-weight: 400;
  margin-top: var(--space-3);
}

.hero-image {
  margin-top: var(--space-5);
  aspect-ratio: 16 / 9;
  border-radius: var(--radius-md);
  overflow: hidden;
}

.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-4);
  margin-top: var(--space-6);
}

.info-col .label {
  display: block;
  font-family: var(--font-mono);
  text-transform: uppercase;
  font-size: 12.5px;
  color: var(--color-text-secondary);
  margin-bottom: var(--space-2);
}

.info-col p {
  font-family: var(--font-sans);
  font-size: 14.5px;
}

.case-section {
  max-width: 700px;
  margin-top: var(--space-7);
  scroll-margin-top: var(--space-6);
}

.case-section h2 {
  font-family: var(--font-serif);
  font-size: 1.75rem;
  font-weight: 400;
  margin-bottom: var(--space-3);
}

.case-section p {
  font-family: var(--font-sans);
  line-height: 1.7;
  color: var(--color-text-primary);
}

.not-found {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-3);
}

@media (max-width: 768px) {
  .detail-layout {
    grid-template-columns: 1fr;
  }

  .toc nav {
    position: static;
    flex-direction: row;
    flex-wrap: wrap;
    gap: var(--space-3) var(--space-4);
  }

  .info-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
