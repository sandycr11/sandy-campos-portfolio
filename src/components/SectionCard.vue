<script setup>
import Icon from './Icon.vue'

defineProps({
  file: { type: String, required: true },   // e.g. "experience.ts"
  title: { type: String, required: true },  // human title
  hint: { type: String, default: '' },      // small comment-style note
})
</script>

<template>
  <div class="card">
    <header class="card__head">
      <div class="card__file">
        <Icon name="file" class="card__icon" />
        <span class="mono">{{ file }}</span>
      </div>
      <div class="card__title">{{ title }}</div>
      <span v-if="hint" class="card__hint mono">{{ hint }}</span>
    </header>
    <div class="card__body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.card {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  overflow: hidden;
}
.card__head {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.85rem 1.25rem;
  border-bottom: 1px solid var(--border);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.025), transparent);
  flex-wrap: wrap;
}
.card__file {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.82rem;
  color: var(--syn-property);
}
.card__icon { width: 15px; height: 15px; color: var(--accent-teal); }
.card__title {
  font-family: var(--font-ui);
  font-weight: 700;
  font-size: 1.02rem;
  color: var(--fg-bright);
  letter-spacing: -0.01em;
}
.card__hint {
  margin-left: auto;
  font-size: 0.76rem;
  color: var(--syn-comment);
  font-style: italic;
}
.card__body { padding: 1.5rem; }

@media (max-width: 560px) {
  .card__body { padding: 1.1rem; }
  .card__hint { display: none; }
}
</style>
