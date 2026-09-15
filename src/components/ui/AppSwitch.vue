<script setup lang="ts">
defineProps<{
  label: string
  disabled?: boolean
}>()

const model = defineModel<boolean>({ default: false })
</script>

<template>
  <label class="app-switch" :class="{ 'app-choice--disabled': disabled }">
    <button
      type="button"
      role="switch"
      class="app-switch__control"
      :aria-checked="model"
      :disabled="disabled"
      @click="model = !model"
    >
      <span class="app-switch__thumb"></span>
    </button>
    <span>{{ label }}</span>
  </label>
</template>
