<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  value: { type: Number, required: true }, // drives the bar fill (value / max)
  max: { type: Number, default: 4 },
  display: { type: String, default: '' }, // shown text; falls back to "<value>x"
  delay: { type: Number, default: 0 },
})

const el = ref(null)
const fill = ref(0) // 0..1

let observer
onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            fill.value = Math.min(props.value / props.max, 1)
          }, props.delay)
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.4 },
  )
  if (el.value) observer.observe(el.value)
})
onBeforeUnmount(() => observer && observer.disconnect())
</script>

<template>
  <div ref="el" class="metric">
    <div class="metric__top">
      <span class="metric__label">{{ label }}</span>
      <span class="metric__val mono">{{ display || `${value}x` }}</span>
    </div>
    <div class="metric__track">
      <div
        class="metric__fill"
        :style="{ width: fill * 100 + '%', transitionDelay: delay + 'ms' }"
      />
    </div>
  </div>
</template>

<style scoped>
.metric { padding: 0.2rem 0; }
.metric__top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.5rem;
  gap: 1rem;
}
.metric__label {
  font-family: var(--font-ui);
  font-size: 0.92rem;
  color: var(--fg);
  font-weight: 500;
}
.metric__val {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--accent-amber);
}
.metric__track {
  height: 9px;
  border-radius: 999px;
  background: var(--bg-inset);
  border: 1px solid var(--border-soft);
  overflow: hidden;
}
.metric__fill {
  height: 100%;
  width: 0;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--accent-teal), var(--accent));
  box-shadow: 0 0 14px var(--accent-glow);
  transition: width 1.1s var(--ease);
}
</style>
