<script setup lang="ts">
withDefaults(defineProps<{
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'neutral' | 'current'
  type?: 'border' | 'dots' | 'pulse'
  label?: string
}>(), { size: 'md', color: 'primary', type: 'border', label: 'Cargando' })
</script>

<template>
  <span class="app-spinner" :class="[`app-spinner--${size}`, `app-spinner--${color}`, `app-spinner--${type}`]" role="status" :aria-label="label">
    <template v-if="type === 'dots'">
      <i></i><i></i><i></i>
    </template>
    <i v-else aria-hidden="true"></i>
  </span>
</template>