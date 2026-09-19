<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'

const props = withDefaults(defineProps<{
  variant?: 'text' | 'rectangle' | 'circle'
  width?: string | number
  height?: string | number
  lines?: number
  animated?: boolean
  label?: string
}>(), { variant: 'text', lines: 1, animated: true, label: 'Cargando contenido' })

function unit(value: string | number | undefined) { return typeof value === 'number' ? `${value}px` : value }
const style = computed<CSSProperties>(() => ({ width: unit(props.width), height: unit(props.height) }))
</script>

<template>
  <div class="app-skeleton-group" :class="{ 'app-skeleton-group--animated': animated }" role="status" :aria-label="label" aria-busy="true">
    <template v-if="variant === 'text'">
      <span v-for="line in lines" :key="line" class="app-skeleton app-skeleton--text" :class="{ 'app-skeleton--last': line === lines && lines > 1 }" :style="style" aria-hidden="true"></span>
    </template>
    <span v-else class="app-skeleton" :class="`app-skeleton--${variant}`" :style="style" aria-hidden="true"></span>
  </div>
</template>