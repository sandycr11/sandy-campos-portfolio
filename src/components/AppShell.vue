<script setup>
import { computed } from 'vue'
import Icon from './Icon.vue'
import { useTheme } from '../composables/useTheme.js'

defineProps({
  activeFile: { type: String, default: 'profile.cs' },
  activeLang: { type: String, default: 'C#' },
})
const emit = defineEmits(['open-palette'])

const { theme, toggle: toggleTheme } = useTheme()

const isMac =
  typeof navigator !== 'undefined' && /Mac|iPhone|iPad|iPod/.test(navigator.platform)
const metaKey = computed(() => (isMac ? '⌘' : 'Ctrl'))
</script>

<template>
  <div class="shell">
    <!-- ── Top bar: breadcrumb · tabs · actions ─────────────────────────── -->
    <header class="shell__topbar">
      <div class="topbar__chrome">
        <div class="shell__brand mono">
          <Icon name="folder" class="shell__brand-icon" />
          <span>sandy-campos</span>
          <Icon name="chevron" class="shell__brand-sep" />
          <span class="shell__brand-file">{{ activeFile }}</span>
        </div>

        <div class="shell__actions">
          <button class="shell__cmd mono" title="Command palette" @click="emit('open-palette')">
            <Icon name="search" />
            <span class="shell__cmd-label">Go to…</span>
            <kbd class="shell__cmd-kbd">{{ metaKey }} P</kbd>
          </button>
          <button
            class="shell__iconbtn"
            :aria-label="`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`"
            :title="`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`"
            @click="toggleTheme"
          >
            <Icon :name="theme === 'dark' ? 'sun' : 'moon'" />
          </button>
        </div>
      </div>

      <div class="shell__tabs"><slot name="tabs" /></div>
    </header>

    <!-- ── Editor: scrollable content column ────────────────────────────── -->
    <main class="shell__editor">
      <slot />
    </main>

    <!-- ── Status bar ───────────────────────────────────────────────────── -->
    <div class="shell__status mono">
      <div class="status__left">
        <span class="status__item status__item--accent"><Icon name="git" /> main</span>
        <span class="status__item status__hide-sm">
          <Icon name="check" /> available for opportunities
        </span>
      </div>
      <div class="status__right">
        <button class="status__item status__btn" title="Command palette" @click="emit('open-palette')">
          <Icon name="command" /> {{ metaKey }} P
        </button>
        <span class="status__item">{{ activeLang }}</span>
        <span class="status__item">{{ activeFile }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shell {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: var(--maxw);
  margin: 0 auto;
  border-left: 1px solid var(--border);
  border-right: 1px solid var(--border);
  overflow: hidden;
}

/* ── Top bar ───────────────────────────────────────────────────────────── */
.shell__topbar { flex: none; background: var(--bg-tabs); }
.topbar__chrome {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.55rem 0.9rem;
}
.shell__brand {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  color: var(--fg-dim);
  min-width: 0;
}
.shell__brand-icon { width: 15px; height: 15px; color: var(--accent-amber); flex: none; }
.shell__brand-sep { width: 13px; height: 13px; opacity: 0.6; flex: none; }
.shell__brand-file { color: var(--syn-property); }

.shell__actions { display: flex; align-items: center; gap: 0.5rem; flex: none; }
.shell__cmd {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem 0.6rem;
  font-size: 0.74rem;
  color: var(--fg-dim);
  background: var(--bg-inset);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-sm);
  transition: border-color 0.15s var(--ease), color 0.15s var(--ease);
}
.shell__cmd:hover { border-color: var(--accent); color: var(--fg-muted); }
.shell__cmd svg { width: 14px; height: 14px; flex: none; }
.shell__cmd-label { color: var(--fg-muted); }
.shell__cmd-kbd {
  color: var(--fg-dim);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 0.05rem 0.35rem;
  font-size: 0.68rem;
}
.shell__iconbtn {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: var(--radius-sm);
  color: var(--fg-muted);
  transition: background 0.15s var(--ease), color 0.15s var(--ease);
}
.shell__iconbtn:hover { background: var(--bg-hover); color: var(--fg-bright); }
.shell__iconbtn svg { width: 17px; height: 17px; }

/* ── Editor ────────────────────────────────────────────────────────────── */
.shell__editor {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 2.75rem clamp(1rem, 4vw, 3rem) 4rem;
  scroll-behavior: smooth;
}

/* ── Status bar ────────────────────────────────────────────────────────── */
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
.status__btn {
  color: #fff;
  border-radius: 4px;
  padding: 0 0.35rem;
  transition: background 0.15s var(--ease);
}
.status__btn:hover { background: rgba(255, 255, 255, 0.18); }

/* ── Responsive ───────────────────────────────────────────────────────── */
@media (max-width: 720px) {
  .shell { border-left: none; border-right: none; }
  .shell__brand-file { display: none; }
  .shell__cmd-label { display: none; }
  .status__hide-sm { display: none; }
}
</style>
