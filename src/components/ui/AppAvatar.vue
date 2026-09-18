<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    src?: string
    alt?: string
    name?: string
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    shape?: 'circle' | 'rounded' | 'square'
    color?: 'primary' | 'neutral' | 'info' | 'success' | 'warning' | 'danger'
    status?: 'online' | 'offline' | 'away' | 'busy'
    statusLabel?: string
  }>(),
  {
    src: undefined,
    alt: undefined,
    name: undefined,
    size: 'md',
    shape: 'circle',
    color: 'primary',
    status: undefined,
    statusLabel: undefined,
  },
)

const imageFailed = ref(false)

const initials = computed(() => {
  const parts = props.name?.trim().split(/\s+/).filter(Boolean) ?? []
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0]?.slice(0, 2).toLocaleUpperCase()
  return ((parts[0]?.[0] ?? '') + (parts.at(-1)?.[0] ?? '')).toLocaleUpperCase()
})

const accessibleName = computed(() => props.alt ?? props.name ?? 'Avatar')
const resolvedStatusLabel = computed(() => {
  if (props.statusLabel) return props.statusLabel

  return {
    online: 'En línea',
    offline: 'Desconectado',
    away: 'Ausente',
    busy: 'Ocupado',
  }[props.status ?? 'offline']
})

watch(() => props.src, () => {
  imageFailed.value = false
})
</script>

<template>
  <span class="app-avatar-wrap">
    <span
      class="app-avatar"
      :class="['app-avatar--' + size, 'app-avatar--' + shape, 'app-avatar--' + color]"
    >
      <img v-if="src && !imageFailed" :src="src" :alt="accessibleName" @error="imageFailed = true" />
      <span v-else class="app-avatar__fallback" role="img" :aria-label="accessibleName">{{ initials }}</span>
    </span>
    <span
      v-if="status"
      class="app-avatar__status"
      :class="'app-avatar__status--' + status"
      :aria-label="resolvedStatusLabel"
      role="status"
    ></span>
  </span>
</template>
