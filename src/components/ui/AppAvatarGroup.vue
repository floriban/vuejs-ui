<script setup lang="ts">
withDefaults(defineProps<{ label?: string }>(), { label: 'Grupo de usuarios' })
</script>

<template>
  <div class="app-avatar-group" role="group" :aria-label="label">
    <slot />
  </div>
</template>
