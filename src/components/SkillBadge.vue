<script setup>
defineProps({
  label: { type: String, required: true },
  tone: { type: String, default: 'default' }, // default | accent
})
</script>

<template>
  <span class="badge mono" :class="`badge--${tone}`">
    <span class="badge__quote">"</span>{{ label }}<span class="badge__quote">"</span>
  </span>
</template>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0.32rem 0.62rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  background: var(--bg-inset);
  color: var(--syn-string);
  transition: transform 0.16s var(--ease), border-color 0.16s var(--ease),
    color 0.16s var(--ease);
  white-space: nowrap;
}
.badge:hover {
  transform: translateY(-2px);
  border-color: var(--accent);
}
.badge__quote { color: var(--syn-punct); opacity: 0.55; }
.badge--accent {
  color: var(--accent-teal);
  border-color: var(--accent-teal-border);
  background: var(--accent-teal-soft);
}
.badge--accent .badge__quote { color: var(--accent-teal); opacity: 0.5; }
</style>
