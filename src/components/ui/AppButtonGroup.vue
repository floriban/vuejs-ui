<script setup lang="ts">
withDefaults(
  defineProps<{
    attached?: boolean
    orientation?: 'horizontal' | 'vertical'
    label?: string
  }>(),
  { attached: true, orientation: 'horizontal', label: 'Grupo de botones' },
)
</script>

<template>
  <div
    class="app-button-group"
    :class="[
      `app-button-group--${orientation}`,
      { 'app-button-group--attached': attached },
    ]"
    role="group"
    :aria-label="label"
  >
    <slot />
  </div>
</template>
