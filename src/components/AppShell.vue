<script setup>
import { ref } from 'vue'
import Icon from './Icon.vue'

defineProps({
  activeFile: { type: String, default: 'profile.ts' },
})

const sidebarOpen = ref(false)
const activityItems = ['explorer', 'search', 'git', 'extensions']
const activeActivity = ref('explorer')
</script>

<template>
  <div class="shell">
    <!-- Activity bar -->
    <div class="shell__activity">
      <button
        v-for="(item, i) in activityItems"
        :key="item"
        class="act"
        :class="{ 'act--active': activeActivity === item }"
        :aria-label="item"
        @click="activeActivity = item"
      >
        <Icon :name="item" />
      </button>
      <button class="act act--bottom" aria-label="settings">
        <Icon name="settings" />
      </button>
    </div>

    <!-- Sidebar -->
    <div class="shell__sidebar" :class="{ 'is-open': sidebarOpen }">
      <slot name="sidebar" />
    </div>
    <div
      v-if="sidebarOpen"
      class="shell__scrim"
      @click="sidebarOpen = false"
    />

    <!-- Main editor column -->
    <div class="shell__main">
      <div class="shell__topbar">
        <button class="shell__menu" aria-label="Toggle sidebar" @click="sidebarOpen = !sidebarOpen">
          <Icon :name="sidebarOpen ? 'close' : 'menu'" />
        </button>
        <div class="shell__tabs"><slot name="tabs" /></div>
      </div>

      <div class="shell__editor">
        <slot />
      </div>

      <!-- Status bar -->
      <div class="shell__status mono">
        <div class="status__left">
          <span class="status__item status__item--accent"><Icon name="git" /> main</span>
          <span class="status__item"><Icon name="check" /> 0 errors</span>
          <span class="status__item status__hide-sm">Available for opportunities</span>
        </div>
        <div class="status__right">
          <span class="status__item status__hide-sm">UTF-8</span>
          <span class="status__item status__hide-sm">LF</span>
          <span class="status__item">TypeScript</span>
          <span class="status__item">{{ activeFile }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shell {
  display: grid;
  grid-template-columns: var(--activity-w) var(--sidebar-w) 1fr;
  height: 100vh;
  max-width: var(--maxw);
  margin: 0 auto;
  border-left: 1px solid var(--border);
  border-right: 1px solid var(--border);
  overflow: hidden;
}

/* Activity bar */
.shell__activity {
  background: var(--bg-activity);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.6rem 0;
  gap: 0.25rem;
  border-right: 1px solid var(--border);
}
.act {
  width: 44px; height: 44px;
  display: grid; place-items: center;
  color: var(--fg-dim);
  border-left: 2px solid transparent;
  transition: color 0.15s var(--ease);
}
.act svg { width: 22px; height: 22px; }
.act:hover { color: var(--fg-muted); }
.act--active { color: var(--fg-bright); border-left-color: var(--fg-bright); }
.act--bottom { margin-top: auto; }

/* Sidebar */
.shell__sidebar {
  background: var(--bg-sidebar);
  border-right: 1px solid var(--border);
  overflow-y: auto;
}

/* Main */
.shell__main {
  display: flex;
  flex-direction: column;
  min-width: 0;
  background: var(--bg-app);
}
.shell__topbar { display: flex; align-items: stretch; }
.shell__menu {
  display: none;
  width: 46px;
  align-items: center;
  justify-content: center;
  color: var(--fg-muted);
  background: var(--bg-tabs);
  border-bottom: 1px solid var(--border);
  border-right: 1px solid var(--border-soft);
}
.shell__menu svg { width: 20px; height: 20px; }
.shell__tabs { flex: 1; min-width: 0; }

.shell__editor {
  flex: 1;
  overflow-y: auto;
  padding: 2.25rem clamp(1rem, 3vw, 2.75rem) 3rem;
  scroll-behavior: smooth;
}

/* Status bar */
.shell__status {
  height: 26px;
  background: var(--bg-statusbar);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.75rem;
  font-size: 0.74rem;
  flex: none;
}
.status__left, .status__right { display: flex; align-items: center; gap: 0.9rem; }
.status__item { display: inline-flex; align-items: center; gap: 0.3rem; opacity: 0.95; }
.status__item svg { width: 12px; height: 12px; }
.status__item--accent { font-weight: 600; }

.shell__scrim { display: none; }

/* ── Responsive ───────────────────────────────────────────────────────── */
@media (max-width: 900px) {
  .shell {
    grid-template-columns: var(--activity-w) 1fr;
    border-left: none;
    border-right: none;
  }
  .shell__sidebar {
    position: fixed;
    top: 0; bottom: 0;
    left: var(--activity-w);
    width: var(--sidebar-w);
    max-width: 82vw;
    z-index: 40;
    transform: translateX(-115%);
    transition: transform 0.28s var(--ease);
    box-shadow: 8px 0 30px rgba(0, 0, 0, 0.5);
  }
  .shell__sidebar.is-open { transform: translateX(0); }
  .shell__scrim {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 30;
    animation: fade 0.2s var(--ease);
  }
  .shell__menu { display: flex; }
  .status__hide-sm { display: none; }
}

@media (max-width: 560px) {
  .shell { grid-template-columns: 1fr; }
  .shell__activity { display: none; }
  .shell__sidebar { left: 0; }
}
</style>
