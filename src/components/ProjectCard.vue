<script setup>
import { computed } from 'vue'
import Icon from './Icon.vue'
import SkillBadge from './SkillBadge.vue'

const props = defineProps({
  project: { type: Object, required: true },
})

// "https://abaintake.com/" → "abaintake.com"
const domain = computed(() =>
  (props.project.url ?? '').replace(/^https?:\/\//, '').replace(/\/+$/, ''),
)
</script>

<template>
  <article class="proj">
    <component
      :is="project.url ? 'a' : 'div'"
      class="proj__head"
      :href="project.url || null"
      :target="project.url ? '_blank' : null"
      :rel="project.url ? 'noopener' : null"
    >
      <Icon name="folder" class="proj__folder" />
      <h3 class="proj__name mono">{{ project.name }}</h3>
      <span v-if="domain" class="proj__domain mono">
        {{ domain }}<Icon name="external" class="proj__ext" />
      </span>
    </component>

    <p class="proj__desc">{{ project.description }}</p>

    <div class="proj__stack">
      <SkillBadge v-for="s in project.stack" :key="s" :label="s" />
    </div>
  </article>
</template>

<style scoped>
.proj {
  background: var(--bg-inset);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius);
  padding: 1.05rem 1.15rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  transition: border-color 0.2s var(--ease);
}
.proj:hover { border-color: rgba(0, 122, 204, 0.45); }

.proj__head {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: inherit;
}
.proj__folder { width: 16px; height: 16px; color: var(--accent-amber); flex: none; }
.proj__name { font-size: 1rem; font-weight: 700; color: var(--fg-bright); }
.proj__domain {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  margin-left: auto;
  font-size: 0.74rem;
  color: var(--fg-dim);
  transition: color 0.15s var(--ease);
}
.proj__ext { width: 12px; height: 12px; }
a.proj__head:hover .proj__domain { color: var(--accent-teal); }
a.proj__head:hover .proj__name { color: var(--accent-teal); }

.proj__desc {
  font-size: 0.88rem;
  color: var(--fg-muted);
  line-height: 1.6;
}
.proj__stack { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: auto; }
</style>
