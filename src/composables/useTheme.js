import { ref, watch } from 'vue'

// Module-level singleton so every component shares one source of truth.
const STORAGE_KEY = 'scp-theme'

function readInitial() {
  // The inline script in index.html already set <html data-theme="…"> before
  // paint; trust that value first, then localStorage, then default to dark.
  const fromDom =
    typeof document !== 'undefined'
      ? document.documentElement.getAttribute('data-theme')
      : null
  if (fromDom === 'light' || fromDom === 'dark') return fromDom

  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    /* localStorage unavailable — fall through */
  }
  return 'dark'
}

const theme = ref(readInitial())

watch(
  theme,
  (value) => {
    document.documentElement.setAttribute('data-theme', value)
    try {
      localStorage.setItem(STORAGE_KEY, value)
    } catch {
      /* ignore persistence errors (private mode, etc.) */
    }
  },
  { immediate: true },
)

export function useTheme() {
  const toggle = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }
  const set = (value) => {
    if (value === 'light' || value === 'dark') theme.value = value
  }
  return { theme, toggle, set }
}
