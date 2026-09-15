<script setup lang="ts">
withDefaults(
  defineProps<{
    id?: string
    placeholder?: string
    rows?: number
    size?: 'sm' | 'md' | 'lg'
    disabled?: boolean
    readonly?: boolean
    required?: boolean
    invalid?: boolean
  }>(),
  { rows: 4, size: 'md' },
)

const model = defineModel<string>({ default: '' })
</script>

<template>
  <textarea
    v-model="model"
    class="app-control app-textarea"
    :class="`app-control--${size}`"
    :id="id"
    :placeholder="placeholder"
    :rows="rows"
    :disabled="disabled"
    :readonly="readonly"
    :required="required"
    :aria-invalid="invalid || undefined"
  ></textarea>
</template>
