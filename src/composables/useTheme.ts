import { ref } from 'vue'

type Theme = 'light' | 'dark'
const theme = ref<Theme>('light')
const storageKey = 'app-ui-theme'

function applyTheme(value: Theme) {
  theme.value = value
  document.documentElement.dataset.theme = value
  document.documentElement.style.colorScheme = value
}

export function initializeTheme() {
  let saved: string | null = null
  try { saved = localStorage.getItem(storageKey) } catch { /* Storage is optional. */ }
  applyTheme(saved === 'light' || saved === 'dark' ? saved
    : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
}

export function useTheme() {
  function toggleTheme() {
    applyTheme(theme.value === 'dark' ? 'light' : 'dark')
    try { localStorage.setItem(storageKey, theme.value) } catch { /* Storage is optional. */ }
  }
  return { theme, toggleTheme }
}
