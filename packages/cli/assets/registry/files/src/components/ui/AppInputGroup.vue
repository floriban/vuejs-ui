<script setup lang="ts">
withDefaults(defineProps<{
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  invalid?: boolean
}>(), { size: 'md', disabled: false, invalid: false })
</script>

<template>
  <div class="app-input-group" :class="[`app-input-group--${size}`, { 'is-disabled': disabled, 'is-invalid': invalid }]" role="group">
    <slot />
  </div>
</template>
