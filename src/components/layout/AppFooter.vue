<script setup></script>

<template>
  <footer class="app-footer">
    <div class="footer-inner">
      <span class="signature">designed + coded with ♥ by duart</span>
      <div class="socials">
        <a href="https://www.linkedin.com/in/duartkasapollii/" target="_blank" rel="noopener">LinkedIn</a>
        <a href="mailto:kasapolliduart@gmail.com">Email</a>
        <a href="https://dribbble.com" target="_blank" rel="noopener">Dribbble</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  border-top: 1px solid var(--color-border);
}

.footer-inner {
  max-width: var(--container-max);
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-4);
  padding: var(--container-pad);
}

.signature {
  font-family: var(--font-mono);
  text-transform: uppercase;
  font-size: 15px;
  font-weight: 400;
  color: #32404f95;
}

.socials {
  display: flex;
  flex-direction: row;
  gap: var(--space-4);
  font-family: var(--font-mono);
  text-transform: uppercase;
  font-size: 15px;
}

.socials a {
  color: #32404f95;
  transition: color 0.15s ease;
}

.socials a:hover {
  color: var(--color-accent);
}

@media (max-width: 640px) {
  .footer-inner {
    flex-direction: column;
    align-items: flex-start;
  }

  .socials {
    flex-direction: column;
    gap: var(--space-3);
  }
}
</style>
