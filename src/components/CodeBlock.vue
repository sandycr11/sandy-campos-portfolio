<script setup>
import { ref, onMounted, nextTick } from 'vue'

defineProps({
  /** optional label shown above the code (e.g. a path comment) */
  caption: { type: String, default: '' },
})

const codeRef = ref(null)
const lineCount = ref(1)

function count() {
  if (!codeRef.value) return
  const n = codeRef.value.querySelectorAll('.cl').length
  lineCount.value = Math.max(n, 1)
}

onMounted(async () => {
  await nextTick()
  count()
})
</script>

<template>
  <div class="codeblock">
    <div v-if="caption" class="codeblock__caption mono">{{ caption }}</div>
    <div class="codeblock__body">
      <div class="codeblock__gutter mono" aria-hidden="true">
        <span v-for="n in lineCount" :key="n">{{ n }}</span>
      </div>
      <pre class="codeblock__code mono"><code ref="codeRef"><slot /></code></pre>
    </div>
  </div>
</template>

<style scoped>
.codeblock {
  background: var(--bg-inset);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius);
  overflow: hidden;
}
.codeblock__caption {
  padding: 0.55rem 1rem;
  font-size: 0.78rem;
  color: var(--syn-comment);
  font-style: italic;
  border-bottom: 1px solid var(--border-soft);
  background: rgba(255, 255, 255, 0.015);
}
.codeblock__body {
  display: flex;
  overflow-x: auto;
}
.codeblock__gutter {
  flex: none;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 1rem 0.85rem 1rem 1rem;
  color: var(--line-number);
  font-size: 0.85rem;
  line-height: 1.75;
  user-select: none;
  border-right: 1px solid var(--border-soft);
  background: rgba(0, 0, 0, 0.12);
  min-width: 3.1rem;
}
.codeblock__code {
  margin: 0;
  padding: 1rem 1.25rem;
  font-size: 0.88rem;
  line-height: 1.75;
  color: var(--fg);
  overflow: visible;
  tab-size: 2;
  flex: 1;
}
.codeblock__code :deep(.cl) {
  white-space: pre;
  display: block;
}
.codeblock__code :deep(.indent) { display: inline-block; width: 1.6rem; }
.codeblock__code :deep(.indent-2) { display: inline-block; width: 3.2rem; }
.codeblock__code :deep(.indent-3) { display: inline-block; width: 4.8rem; }

@media (max-width: 560px) {
  .codeblock__code { font-size: 0.8rem; }
  .codeblock__gutter { font-size: 0.78rem; min-width: 2.6rem; }
}
</style>
