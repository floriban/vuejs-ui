<script setup lang="ts">
import { Info, CircleCheck, CircleX, TriangleAlert, X } from '@lucide/vue'
import { computed, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    status?: 'info' | 'success' | 'warning' | 'danger' | 'error'
    variant?: 'soft' | 'solid' | 'outline'
    title?: string
    closable?: boolean
  }>(),
  { status: 'info', variant: 'soft', closable: false },
)

const visible = ref(true)

const indicatorIcon = computed(() => {
  const icons = {
    info: Info,
    success: CircleCheck,
    warning: TriangleAlert,
    danger: CircleX,
    error: CircleX,
  }

  return icons[props.status]
})
</script>

<template>
  <div v-if="visible" class="app-alert" :class="[`app-alert--${status}`, `app-alert--${variant}`]" role="alert">
    <span class="app-alert__indicator" aria-hidden="true">
      <component :is="indicatorIcon" :size="22" :stroke-width="2" />
    </span>
    <div class="app-alert__content">
      <strong v-if="title">{{ title }}</strong>
      <div class="app-alert__description">
        <slot />
      </div>
    </div>
    <button v-if="closable" class="app-alert__close" type="button" aria-label="Cerrar alerta" @click="visible = false">
      <X :size="17" aria-hidden="true" />
    </button>
  </div>
</template>
