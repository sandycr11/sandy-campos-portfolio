<script setup>
defineProps({
  tabs: { type: Array, required: true }, // [{ id, file }]
  active: { type: String, default: '' },
})
defineEmits(['select'])
</script>

<template>
  <div class="tabs" role="tablist" aria-label="Sections">
    <button
      v-for="t in tabs"
      :key="t.id"
      class="tab mono"
      :class="{ 'tab--active': active === t.id }"
      role="tab"
      :aria-selected="active === t.id"
      @click="$emit('select', t.id)"
    >
      <span class="tab__ts">TS</span>
      <span class="tab__name">{{ t.file }}</span>
      <span class="tab__dot" aria-hidden="true" />
    </button>
  </div>
</template>

<style scoped>
.tabs {
  display: flex;
  overflow-x: auto;
  background: var(--bg-tabs);
  border-bottom: 1px solid var(--border);
  scrollbar-width: none;
}
.tabs::-webkit-scrollbar { display: none; }

.tab {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1rem;
  font-size: 0.84rem;
  color: var(--fg-dim);
  border-right: 1px solid var(--border-soft);
  background: transparent;
  white-space: nowrap;
  transition: color 0.16s var(--ease), background 0.16s var(--ease);
}
.tab:hover { color: var(--fg-muted); background: rgba(255, 255, 255, 0.02); }

.tab--active {
  color: var(--fg-bright);
  background: var(--bg-tab-active);
}
.tab--active::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: var(--accent);
}

.tab__ts {
  font-size: 0.62rem;
  font-weight: 700;
  color: var(--syn-keyword);
  background: rgba(86, 156, 214, 0.16);
  border-radius: 3px;
  padding: 0.05rem 0.28rem;
  letter-spacing: 0.04em;
}
.tab__dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--fg-dim);
  opacity: 0;
  transition: opacity 0.16s var(--ease);
}
.tab--active .tab__dot { opacity: 0; }
.tab:not(.tab--active) .tab__dot { opacity: 0.45; }

@media (max-width: 560px) {
  .tab { padding: 0.6rem 0.75rem; font-size: 0.78rem; }
  .tab__ts { display: none; }
}
</style>
