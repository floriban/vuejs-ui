<script setup lang="ts">
import AppToast from './AppToast.vue'
import { useToast } from '../../composables/useToast'
import type { ToastItem, ToastPosition } from '../../types/toast'

withDefaults(
  defineProps<{
    position?: ToastPosition
  }>(),
  {
    position: 'top-right',
  },
)

const toast = useToast()

function handleAction(item: ToastItem) {
  item.action?.onClick?.()
  toast.dismiss(item.id)
}
</script>

<template>
  <Teleport to="body">
    <div class="app-toast-viewport" :class="'app-toast-viewport--' + position" aria-label="Notificaciones">
      <TransitionGroup name="app-toast-list">
        <AppToast
          v-for="item in toast.toasts.value"
          :key="item.id"
          :toast="item"
          @close="toast.dismiss"
          @action="handleAction"
        />
      </TransitionGroup>
    </div>
  </Teleport>
</template>
