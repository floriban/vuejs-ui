<script setup lang="ts">
import { CalendarDays } from '@lucide/vue'

withDefaults(defineProps<{
  id?: string
  min?: string
  max?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  required?: boolean
  invalid?: boolean
}>(), { size: 'md' })

const model = defineModel<string>({ default: '' })
</script>

<template>
  <span class="app-input-affix">
    <CalendarDays :size="18" aria-hidden="true" />
    <input v-model="model" class="app-control app-control--with-icon" :class="`app-control--${size}`" :id="id" type="date" :min="min" :max="max" :disabled="disabled" :required="required" :aria-invalid="invalid || undefined" />
  </span>
</template>