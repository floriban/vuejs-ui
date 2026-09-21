<script setup lang="ts">
import { useId } from 'vue'

defineProps<{
  size?: 'sm' | 'md' | 'lg'
  id?: string
  label: string
  disabled?: boolean
  describedBy?: string
  invalid?: boolean
}>()

const model = defineModel<boolean>({ default: false })
const generatedId = useId()
</script>

<template>
  <div class="app-switch" :class="[{ 'app-choice--disabled': disabled }, `app-choice-size--${size ?? 'md'}`]">
    <button
      :id="id ?? generatedId"
      type="button"
      role="switch"
      class="app-switch__control"
      :aria-checked="model"
      :aria-labelledby="`${id ?? generatedId}-label`"
      :aria-describedby="describedBy"
      :aria-invalid="invalid || undefined"
      :disabled="disabled"
      @click="model = !model"
    >
      <span class="app-switch__thumb"></span>
    </button>
    <span :id="`${id ?? generatedId}-label`">{{ label }}</span>
  </div>
</template>
