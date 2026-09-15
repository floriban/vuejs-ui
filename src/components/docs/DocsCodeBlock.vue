<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { Check, Copy } from '@lucide/vue'

const props = withDefaults(defineProps<{ code: string; label?: string }>(), { label: 'Ver código' })
const copied = ref(false)
const error = ref('')
let resetTimer: ReturnType<typeof setTimeout> | undefined

async function copyCode() {
  error.value = ''
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    clearTimeout(resetTimer)
    resetTimer = setTimeout(() => { copied.value = false }, 2000)
  } catch {
    error.value = 'Selecciona el código y cópialo manualmente.'
  }
}
onBeforeUnmount(() => clearTimeout(resetTimer))
</script>

<template>
  <details class="docs-code">
    <summary>{{ label }}</summary>
    <div class="docs-code__toolbar">
      <span>Vue</span>
      <button type="button" @click="copyCode" :aria-label="copied ? 'Código copiado' : 'Copiar código'">
        <component :is="copied ? Check : Copy" :size="15" aria-hidden="true" />
        {{ copied ? 'Copiado' : 'Copiar' }}
      </button>
    </div>
    <pre tabindex="0" aria-label="Ejemplo de código Vue"><code>{{ code }}</code></pre>
    <p class="docs-code__status" role="status">{{ error || (copied ? 'Código copiado al portapapeles.' : '') }}</p>
  </details>
</template>
