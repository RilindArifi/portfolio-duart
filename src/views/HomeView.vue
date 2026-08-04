<script setup>
import HeroSection from '@/components/home/HeroSection.vue'
import ProjectGrid from '@/components/home/ProjectGrid.vue'
import { projects } from '@/data/projects.js'
</script>

<template>
  <HeroSection />
  <ProjectGrid :projects="projects" />
</template>
