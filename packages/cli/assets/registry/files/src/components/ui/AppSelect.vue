<script setup lang="ts">
export interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}

defineProps<{
  id?: string
  options: SelectOption[]
  placeholder?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  required?: boolean
  invalid?: boolean
}>()

const model = defineModel<string>({ default: '' })
</script>

<template>
  <select
    v-model="model"
    class="app-control app-select"
    :class="`app-control--${size ?? 'md'}`"
    :id="id"
    :disabled="disabled"
    :required="required"
    :aria-invalid="invalid || undefined"
  >
    <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
      :disabled="option.disabled"
    >
      {{ option.label }}
    </option>
  </select>
</template>
