<script setup lang="ts">
import { ref, type Component } from 'vue'
import { X } from '@lucide/vue'

withDefaults(
  defineProps<{
    color?: 'primary' | 'neutral' | 'info' | 'success' | 'warning' | 'danger'
    variant?: 'soft' | 'solid' | 'outline'
    size?: 'sm' | 'md' | 'lg'
    rounded?: boolean
    dot?: boolean
    icon?: Component
    closable?: boolean
    closeLabel?: string
  }>(),
  {
    color: 'primary',
    variant: 'soft',
    size: 'md',
    rounded: false,
    dot: false,
    icon: undefined,
    closable: false,
    closeLabel: 'Quitar badge',
  },
)

const emit = defineEmits<{ close: [] }>()
const visible = ref(true)

function close() {
  visible.value = false
  emit('close')
}
</script>

<template>
  <span
    v-if="visible"
    class="app-badge"
    :class="[
      'app-badge--' + color,
      'app-badge--' + variant,
      'app-badge--' + size,
      { 'app-badge--rounded': rounded },
    ]"
  >
    <span v-if="dot" class="app-badge__dot" aria-hidden="true"></span>
    <component :is="icon" v-else-if="icon" class="app-badge__icon" :size="14" aria-hidden="true" />
    <span class="app-badge__label"><slot /></span>
    <button v-if="closable" type="button" class="app-badge__close" :aria-label="closeLabel" @click="close">
      <X :size="13" aria-hidden="true" />
    </button>
  </span>
</template>
