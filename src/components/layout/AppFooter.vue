<script setup></script>

<template>
  <footer class="app-footer">
    <span class="signature">designed + coded with ♥ by duart</span>
    <div class="socials">
      <a href="https://linkedin.com" target="_blank" rel="noopener">LinkedIn</a>
      <a href="mailto:hello@duart.dev">Email</a>
      <a href="https://github.com" target="_blank" rel="noopener">GitHub</a>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-3);
  padding: var(--container-pad);
  border-top: 1px solid var(--color-border);
}

.signature {
  font-family: var(--font-mono);
  text-transform: uppercase;
  font-size: 12.5px;
  color: var(--color-text-secondary);
}

.socials {
  display: flex;
  gap: 24px;
  font-family: var(--font-mono);
  text-transform: uppercase;
  font-size: 12.5px;
}

.socials a {
  color: var(--color-text-primary);
  transition: color 0.15s ease;
}

.socials a:hover {
  color: var(--color-accent);
}
</style>
