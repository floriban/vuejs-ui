<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from 'vue'
import { Bell, CircleCheck, CircleX, TriangleAlert, X } from '@lucide/vue'
import type { ToastItem } from '../../types/toast'

const props = defineProps<{
  toast: ToastItem
}>()

const emit = defineEmits<{
  close: [id: number]
  action: [toast: ToastItem]
}>()

let timer: ReturnType<typeof setTimeout> | undefined
let remaining = props.toast.duration
let startedAt = 0

const indicatorIcon = computed(() => {
  const icons = {
    info: Bell,
    success: CircleCheck,
    warning: TriangleAlert,
    danger: CircleX,
  }

  return icons[props.toast.status]
})

function startTimer() {
  if (props.toast.duration <= 0 || remaining <= 0) return

  startedAt = Date.now()
  timer = setTimeout(() => emit('close', props.toast.id), remaining)
}

function pauseTimer() {
  if (!timer) return

  clearTimeout(timer)
  timer = undefined
  remaining = Math.max(0, remaining - (Date.now() - startedAt))
}

function resumeTimer() {
  if (!timer && remaining > 0) startTimer()
}

function handleFocusOut(event: FocusEvent) {
  const currentTarget = event.currentTarget as HTMLElement
  const nextTarget = event.relatedTarget as Node | null

  if (!nextTarget || !currentTarget.contains(nextTarget)) resumeTimer()
}

onMounted(startTimer)
onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
})
</script>

<template>
  <article
    class="app-toast"
    :class="'app-toast--' + toast.status"
    :role="toast.status === 'danger' ? 'alert' : 'status'"
    :aria-atomic="true"
    @mouseenter="pauseTimer"
    @mouseleave="resumeTimer"
    @focusin="pauseTimer"
    @focusout="handleFocusOut"
  >
    <span class="app-toast__indicator" aria-hidden="true">
      <component :is="indicatorIcon" :size="21" :stroke-width="2" />
    </span>

    <div class="app-toast__content">
      <strong v-if="toast.title">{{ toast.title }}</strong>
      <p>{{ toast.message }}</p>
      <button v-if="toast.action" type="button" class="app-toast__action" @click="emit('action', toast)">
        {{ toast.action.label }}
      </button>
    </div>

    <button
      v-if="toast.closable"
      type="button"
      class="app-toast__close"
      :aria-label="'Cerrar notificación: ' + (toast.title ?? toast.message)"
      @click="emit('close', toast.id)"
    >
      <X :size="17" aria-hidden="true" />
    </button>

    <span
      v-if="toast.duration > 0"
      class="app-toast__progress"
      :style="{ '--toast-duration': toast.duration + 'ms' }"
      aria-hidden="true"
    />
  </article>
</template>
