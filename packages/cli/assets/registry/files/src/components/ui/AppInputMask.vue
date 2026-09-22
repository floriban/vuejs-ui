<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  id?: string
  mask?: string
  placeholder?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  required?: boolean
  invalid?: boolean
}>(), { mask: '(000) 000-0000', size: 'md' })

const model = defineModel<string>({ default: '' })
const hint = computed(() => props.placeholder ?? props.mask.replace(/0/g, '0').replace(/A/g, 'A').replace(/\*/g, '•'))

function matches(token: string, value: string) {
  if (token === '0') return /\d/.test(value)
  if (token === 'A') return /[a-záéíóúñ]/i.test(value)
  return /[a-záéíóúñ0-9]/i.test(value)
}

function format(rawValue: string) {
  const raw = rawValue.replace(/[^a-záéíóúñ0-9]/gi, '')
  let result = ''
  let rawIndex = 0
  for (const token of props.mask) {
    if (!['0', 'A', '*'].includes(token)) {
      if (rawIndex > 0 || raw.length > 0) result += token
      continue
    }
    while (rawIndex < raw.length && !matches(token, raw[rawIndex] ?? '')) rawIndex += 1
    if (rawIndex >= raw.length) break
    result += raw[rawIndex]
    rawIndex += 1
  }
  return result
}

function onInput(event: Event) {
  const input = event.target as HTMLInputElement
  const formatted = format(input.value)
  model.value = formatted
  input.value = formatted
}
</script>

<template>
  <input :value="model" class="app-control" :class="`app-control--${size}`" :id="id" type="text" inputmode="text" :placeholder="hint" :disabled="disabled" :required="required" :aria-invalid="invalid || undefined" @input="onInput" />
</template>