<script setup>
import Icon from './Icon.vue'
import SkillBadge from './SkillBadge.vue'

defineProps({
  project: { type: Object, required: true },
  index: { type: Number, default: 0 },
})
</script>

<template>
  <article class="proj">
    <div class="proj__head">
      <div class="proj__title-row">
        <Icon name="folder" class="proj__folder" />
        <h3 class="proj__name mono">{{ project.name }}</h3>
      </div>
      <span class="proj__type mono">{{ project.type }}</span>
    </div>

    <p class="proj__desc">{{ project.description }}</p>

    <div class="proj__stack">
      <SkillBadge v-for="s in project.stack" :key="s" :label="s" />
    </div>

    <ul class="proj__highlights">
      <li v-for="(h, i) in project.highlights" :key="i">
        <Icon name="check" class="proj__check" />
        <span>{{ h }}</span>
      </li>
    </ul>
  </article>
</template>

<style scoped>
.proj {
  background: var(--bg-inset);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius);
  padding: 1.35rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.95rem;
  transition: transform 0.2s var(--ease), border-color 0.2s var(--ease),
    box-shadow 0.2s var(--ease);
}
.proj:hover {
  transform: translateY(-4px);
  border-color: rgba(0, 122, 204, 0.5);
  box-shadow: var(--shadow-soft);
}
.proj__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  flex-wrap: wrap;
}
.proj__title-row { display: flex; align-items: center; gap: 0.55rem; }
.proj__folder { width: 18px; height: 18px; color: var(--accent-amber); }
.proj__name {
  font-size: 1.06rem;
  font-weight: 700;
  color: var(--fg-bright);
}
.proj__type {
  font-size: 0.72rem;
  color: var(--syn-comment);
  font-style: italic;
  border: 1px solid var(--border-soft);
  padding: 0.18rem 0.5rem;
  border-radius: 999px;
}
.proj__desc {
  font-size: 0.93rem;
  color: var(--fg-muted);
  line-height: 1.65;
}
.proj__stack { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.proj__highlights {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  margin-top: auto;
}
.proj__highlights li {
  display: flex;
  align-items: flex-start;
  gap: 0.55rem;
  font-size: 0.88rem;
  color: var(--fg);
  line-height: 1.55;
}
.proj__check {
  width: 16px;
  height: 16px;
  color: var(--accent-teal);
  flex: none;
  margin-top: 3px;
}
</style>
