<script setup lang="ts">
withDefaults(
  defineProps<{
    id?: string
    type?: 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url'
    placeholder?: string
    size?: 'sm' | 'md' | 'lg'
    disabled?: boolean
    readonly?: boolean
    required?: boolean
    invalid?: boolean
  }>(),
  { type: 'text', size: 'md' },
)

const model = defineModel<string | number>({ default: '' })
</script>

<template>
  <input
    v-model="model"
    class="app-control"
    :class="`app-control--${size}`"
    :id="id"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :required="required"
    :aria-invalid="invalid || undefined"
  />
</template>
