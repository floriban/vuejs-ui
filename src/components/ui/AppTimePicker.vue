<script setup lang="ts">
import { Clock3 } from '@lucide/vue'

withDefaults(defineProps<{
  id?: string
  min?: string
  max?: string
  step?: number
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  required?: boolean
  invalid?: boolean
}>(), { size: 'md', step: 60 })

const model = defineModel<string>({ default: '' })
</script>

<template>
  <span class="app-input-affix">
    <Clock3 :size="18" aria-hidden="true" />
    <input v-model="model" class="app-control app-control--with-icon" :class="`app-control--${size}`" :id="id" type="time" :min="min" :max="max" :step="step" :disabled="disabled" :required="required" :aria-invalid="invalid || undefined" />
  </span>
</template>