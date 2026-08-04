<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useMouse, useRafFn } from '@vueuse/core'

const showCursor = window.matchMedia('(pointer: fine)').matches
if (!showCursor) {
  document.body.style.cursor = 'auto'
}

const outerEl = ref(null)
const isHoveringLink = ref(false)
const isHoveringProject = ref(false)
const { x, y } = useMouse({ type: 'client' })
const pos = { x: 0, y: 0 }

function handleMouseOver(event) {
  if (event.target.closest('.project-card')) {
    isHoveringProject.value = true
    isHoveringLink.value = false
  } else if (event.target.closest('a, button')) {
    isHoveringLink.value = true
    isHoveringProject.value = false
  }
}

function handleMouseOut(event) {
  if (event.target.closest('.project-card')) {
    isHoveringProject.value = false
  } else if (event.target.closest('a, button')) {
    isHoveringLink.value = false
  }
}

if (showCursor) {
  useRafFn(() => {
    pos.x += (x.value - pos.x) * 0.25
    pos.y += (y.value - pos.y) * 0.25
    if (outerEl.value) {
      outerEl.value.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
    }
  })

  onMounted(() => {
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)
  })

  onUnmounted(() => {
    document.removeEventListener('mouseover', handleMouseOver)
    document.removeEventListener('mouseout', handleMouseOut)
  })
}
</script>

<template>
  <div v-if="showCursor" ref="outerEl" class="cursor-outer">
    <div
      class="cursor-dot"
      :class="{ 'is-hovering': isHoveringLink, 'is-hidden': isHoveringProject }"
    />
    <div class="cursor-label" :class="{ 'is-visible': isHoveringProject }">
      <svg
        viewBox="0 0 24 24"
        width="14"
        height="14"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      <span>View overview</span>
    </div>
  </div>
</template>

<style scoped>
.cursor-outer {
  position: fixed;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  pointer-events: none;
  z-index: 9999;
  will-change: transform;
}

.cursor-dot {
  position: absolute;
  top: 0;
  left: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--color-accent);
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}

.cursor-dot.is-hovering {
  transform: translate(-50%, -50%) scale(2.5);
  opacity: 0.6;
}

.cursor-dot.is-hidden {
  transform: translate(-50%, -50%) scale(0);
  opacity: 0;
}

.cursor-label {
  position: absolute;
  top: 0;
  left: -8px;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  white-space: nowrap;
  padding: 6px var(--space-3);
  background: var(--color-accent);
  border-radius: 999px;
  color: #fff;
  font-family: var(--font-mono);
  text-transform: uppercase;
  font-size: 12px;
  transform-origin: left center;
  transform: translateY(-50%) scale(0);
  opacity: 0;
  transition:
    transform 0.45s ease,
    opacity 0.35s ease;
}

.cursor-label.is-visible {
  transform: translateY(-50%) scale(1);
  opacity: 1;
}
</style>
