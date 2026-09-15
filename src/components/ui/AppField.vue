<script setup lang="ts">
defineProps<{
  label: string
  forId?: string
  help?: string
  error?: string
  required?: boolean
}>()
</script>

<template>
  <div class="app-field" :class="{ 'app-field--invalid': error }">
    <label class="app-field__label" :for="forId">
      {{ label }}
      <span v-if="required" class="app-field__required" aria-hidden="true">*</span>
    </label>
    <slot />
    <p v-if="error" class="app-field__message app-field__message--error">{{ error }}</p>
    <p v-else-if="help" class="app-field__message">{{ help }}</p>
  </div>
</template>
