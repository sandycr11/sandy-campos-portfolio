<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import Icon from './Icon.vue'

const props = defineProps({
  open: { type: Boolean, default: false },
  // [{ id, label, hint, icon, group, kbd?, run }]
  commands: { type: Array, required: true },
})
const emit = defineEmits(['update:open'])

const query = ref('')
const selected = ref(0)
const inputEl = ref(null)
const listEl = ref(null)

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  const list = q
    ? props.commands.filter((c) =>
        `${c.label} ${c.hint ?? ''} ${c.group ?? ''}`.toLowerCase().includes(q),
      )
    : props.commands
  // Flag the first row of each group so we can render section headers.
  let lastGroup = null
  return list.map((c) => {
    const showGroup = c.group && c.group !== lastGroup
    lastGroup = c.group
    return { ...c, showGroup }
  })
})

function close() {
  emit('update:open', false)
}

function runAt(i) {
  const item = filtered.value[i]
  if (!item) return
  close()
  // Defer so the overlay unmounts before navigation/side effects fire.
  nextTick(() => item.run?.())
}

function move(delta) {
  const n = filtered.value.length
  if (!n) return
  selected.value = (selected.value + delta + n) % n
}

function onKeydown(e) {
  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault()
      move(1)
      break
    case 'ArrowUp':
      e.preventDefault()
      move(-1)
      break
    case 'Enter':
      e.preventDefault()
      runAt(selected.value)
      break
    case 'Escape':
      e.preventDefault()
      close()
      break
  }
}

// Keep the active row in view as the user arrows through.
watch(selected, async () => {
  await nextTick()
  listEl.value
    ?.querySelector('[data-active="true"]')
    ?.scrollIntoView({ block: 'nearest' })
})

// Reset query/highlight and focus the input each time it opens.
watch(
  () => props.open,
  async (isOpen) => {
    if (!isOpen) return
    query.value = ''
    selected.value = 0
    await nextTick()
    inputEl.value?.focus()
  },
)

// Clamp the selection whenever the filtered set shrinks.
watch(filtered, () => {
  if (selected.value > filtered.value.length - 1) selected.value = 0
})
</script>

<template>
  <Teleport to="body">
    <Transition name="cp">
      <div v-if="open" class="cp" @keydown="onKeydown">
        <div class="cp__scrim" @click="close" />
        <div class="cp__panel" role="dialog" aria-modal="true" aria-label="Command palette">
          <div class="cp__search">
            <Icon name="search" class="cp__search-icon" />
            <input
              ref="inputEl"
              v-model="query"
              class="cp__input mono"
              type="text"
              placeholder="Type to jump to a section or run a command…"
              spellcheck="false"
              autocomplete="off"
            />
            <kbd class="cp__esc mono">esc</kbd>
          </div>

          <div ref="listEl" class="cp__list">
            <template v-for="(c, i) in filtered" :key="c.id">
              <div v-if="c.showGroup" class="cp__group mono">{{ c.group }}</div>
              <button
                class="cp__item"
                :class="{ 'cp__item--active': i === selected }"
                :data-active="i === selected"
                @click="runAt(i)"
                @mousemove="selected = i"
              >
                <Icon :name="c.icon" class="cp__item-icon" />
                <span class="cp__item-label">{{ c.label }}</span>
                <span v-if="c.hint" class="cp__item-hint mono">{{ c.hint }}</span>
                <kbd v-if="c.kbd" class="cp__item-kbd mono">{{ c.kbd }}</kbd>
                <Icon name="return" class="cp__item-enter" />
              </button>
            </template>

            <div v-if="!filtered.length" class="cp__empty mono">
              <span class="tok-com">// no matching commands</span>
            </div>
          </div>

          <div class="cp__footer mono">
            <span><kbd class="cp__fkbd">↑</kbd><kbd class="cp__fkbd">↓</kbd> navigate</span>
            <span><kbd class="cp__fkbd">↵</kbd> select</span>
            <span><kbd class="cp__fkbd">esc</kbd> dismiss</span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.cp {
  position: fixed;
  inset: 0;
  z-index: 80;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: clamp(3rem, 12vh, 8rem) 1rem 1rem;
}
.cp__scrim {
  position: absolute;
  inset: 0;
  background: var(--overlay-scrim);
  backdrop-filter: blur(2px);
}

.cp__panel {
  position: relative;
  width: min(620px, 100%);
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-height: min(60vh, 520px);
}

/* Search row */
.cp__search {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.85rem 1rem;
  border-bottom: 1px solid var(--border-soft);
}
.cp__search-icon { width: 18px; height: 18px; color: var(--fg-dim); flex: none; }
.cp__input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: var(--fg-bright);
  font-size: 0.95rem;
}
.cp__input::placeholder { color: var(--fg-dim); }
.cp__esc {
  font-size: 0.66rem;
  color: var(--fg-dim);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 0.12rem 0.4rem;
  flex: none;
}

/* List */
.cp__list { overflow-y: auto; padding: 0.4rem; }
.cp__group {
  font-size: 0.66rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--fg-dim);
  padding: 0.6rem 0.6rem 0.35rem;
}
.cp__item {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  width: 100%;
  text-align: left;
  padding: 0.55rem 0.65rem;
  border-radius: var(--radius-sm);
  color: var(--fg-muted);
}
.cp__item-icon { width: 16px; height: 16px; color: var(--fg-dim); flex: none; }
.cp__item-label { flex: 1; font-size: 0.9rem; color: var(--fg); }
.cp__item-hint { font-size: 0.74rem; color: var(--fg-dim); }
.cp__item-kbd {
  font-size: 0.68rem;
  color: var(--fg-muted);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 0.1rem 0.38rem;
}
.cp__item-enter { width: 14px; height: 14px; color: var(--accent); opacity: 0; flex: none; }

.cp__item--active {
  background: var(--accent-soft);
}
.cp__item--active .cp__item-icon,
.cp__item--active .cp__item-label { color: var(--fg-bright); }
.cp__item--active .cp__item-enter { opacity: 1; }

.cp__empty { padding: 1.25rem 0.7rem; font-size: 0.85rem; }

/* Footer */
.cp__footer {
  display: flex;
  gap: 1.1rem;
  padding: 0.55rem 0.9rem;
  border-top: 1px solid var(--border-soft);
  font-size: 0.7rem;
  color: var(--fg-dim);
  flex: none;
}
.cp__footer span { display: inline-flex; align-items: center; gap: 0.35rem; }
.cp__fkbd {
  min-width: 1.1rem;
  text-align: center;
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 0 0.25rem;
}

/* Transition */
.cp-enter-active,
.cp-leave-active { transition: opacity 0.18s var(--ease); }
.cp-enter-active .cp__panel,
.cp-leave-active .cp__panel { transition: transform 0.18s var(--ease), opacity 0.18s var(--ease); }
.cp-enter-from,
.cp-leave-to { opacity: 0; }
.cp-enter-from .cp__panel,
.cp-leave-to .cp__panel { transform: translateY(-10px) scale(0.985); opacity: 0; }

@media (prefers-reduced-motion: reduce) {
  .cp-enter-active,
  .cp-leave-active,
  .cp-enter-active .cp__panel,
  .cp-leave-active .cp__panel { transition: none; }
}
</style>
