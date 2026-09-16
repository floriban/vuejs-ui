<script setup lang="ts">
import { useId } from 'vue'

defineProps<{
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
  <label class="app-choice" :class="{ 'app-choice--disabled': disabled }" :for="id ?? generatedId">
    <input
      v-model="model"
      :id="id ?? generatedId"
      type="checkbox"
      :disabled="disabled"
      :aria-describedby="describedBy"
      :aria-invalid="invalid || undefined"
    />
    <span class="app-checkbox" aria-hidden="true">
      <svg viewBox="0 0 16 16" fill="none">
        <path d="m3.5 8 3 3 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </span>
    <span>{{ label }}</span>
  </label>
</template>
