<script setup lang="ts">
import { Inbox, LoaderCircle, RefreshCcw, TriangleAlert } from '@lucide/vue'
import type { Component } from 'vue'

type State = 'loading' | 'empty' | 'error'

const props = withDefaults(defineProps<{
  state: State
  title?: string
  description?: string
  actionLabel?: string
  icon?: Component
  compact?: boolean
}>(), { compact: false })

const emit = defineEmits<{ action: [] }>()
const defaults: Record<State, { title: string; description: string; icon: Component }> = {
  loading: { title: 'Cargando', description: 'Espera mientras preparamos el contenido.', icon: LoaderCircle },
  empty: { title: 'Sin resultados', description: 'No hay información disponible para mostrar.', icon: Inbox },
  error: { title: 'No pudimos cargar el contenido', description: 'Ocurrió un problema. Inténtalo nuevamente.', icon: TriangleAlert },
}
</script>

<template>
  <section
    class="app-state"
    :class="[`app-state--${state}`, { 'app-state--compact': compact }]"
    :role="state === 'error' ? 'alert' : 'status'"
    :aria-live="state === 'error' ? 'assertive' : 'polite'"
    :aria-busy="state === 'loading' || undefined"
  >
    <slot name="icon">
      <span class="app-state__icon" aria-hidden="true">
        <component :is="icon ?? defaults[props.state].icon" :size="compact ? 24 : 32" />
      </span>
    </slot>
    <div class="app-state__content">
      <h2>{{ title ?? defaults[state].title }}</h2>
      <p>{{ description ?? defaults[state].description }}</p>
    </div>
    <button v-if="actionLabel && state !== 'loading'" type="button" class="app-button app-button--outline app-button--primary app-button--sm" @click="emit('action')">
      <RefreshCcw :size="16" aria-hidden="true" />
      {{ actionLabel }}
    </button>
    <slot />
  </section>
</template>
