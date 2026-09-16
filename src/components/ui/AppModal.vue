<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, useId, watch, type Component } from 'vue'
import { X } from '@lucide/vue'
import { lockModalScroll, unlockModalScroll } from '../../composables/modalScrollLock'

type ModalCloseReason = 'close-button' | 'backdrop' | 'escape'
type ModalSize = 'sm' | 'md' | 'lg' | 'xl'
type ModalTone = 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger'

const props = withDefaults(
  defineProps<{
    title: string
    description?: string
    size?: ModalSize
    centered?: boolean
    scrollable?: boolean
    closeOnBackdrop?: boolean
    closeOnEscape?: boolean
    showClose?: boolean
    closeLabel?: string
    initialFocus?: string
    icon?: Component
    tone?: ModalTone
  }>(),
  {
    description: undefined,
    size: 'md',
    centered: true,
    scrollable: false,
    closeOnBackdrop: true,
    closeOnEscape: true,
    showClose: true,
    closeLabel: 'Cerrar modal',
    initialFocus: undefined,
    icon: undefined,
    tone: 'default',
  },
)

const model = defineModel<boolean>({ default: false })
const emit = defineEmits<{
  open: []
  close: [reason: ModalCloseReason]
}>()

const dialogRef = ref<HTMLElement | null>(null)
const titleId = 'modal-title-' + useId()
const descriptionId = 'modal-description-' + useId()
let triggerElement: HTMLElement | null = null
let scrollLocked = false

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

function getFocusableElements() {
  if (!dialogRef.value) return []

  return Array.from(dialogRef.value.querySelectorAll<HTMLElement>(focusableSelector)).filter(
    (element) => element.getClientRects().length > 0,
  )
}

function focusDialog() {
  let requestedElement: HTMLElement | null = null

  if (props.initialFocus && dialogRef.value) {
    try {
      requestedElement = dialogRef.value.querySelector<HTMLElement>(props.initialFocus)
    } catch {
      requestedElement = null
    }
  }

  requestedElement?.focus()

  if (document.activeElement === requestedElement) return

  const [firstElement] = getFocusableElements()
  ;(firstElement ?? dialogRef.value)?.focus()
}

function requestClose(reason: ModalCloseReason) {
  if (!model.value) return

  model.value = false
  emit('close', reason)
}

function handleBackdrop() {
  if (props.closeOnBackdrop) requestClose('backdrop')
}

function handleKeydown(event: KeyboardEvent) {
  if (!model.value) return

  if (event.key === 'Escape') {
    if (props.closeOnEscape) {
      event.preventDefault()
      requestClose('escape')
    }
    return
  }

  if (event.key !== 'Tab') return

  const elements = getFocusableElements()
  const firstElement = elements[0]
  const lastElement = elements.at(-1)

  if (!firstElement || !lastElement) {
    event.preventDefault()
    dialogRef.value?.focus()
    return
  }

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault()
    lastElement.focus()
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault()
    firstElement.focus()
  }
}

async function activateModal() {
  triggerElement = document.activeElement instanceof HTMLElement ? document.activeElement : null

  if (!scrollLocked) {
    lockModalScroll()
    scrollLocked = true
  }

  document.addEventListener('keydown', handleKeydown)
  await nextTick()
  focusDialog()
  emit('open')
}

function deactivateModal(restoreFocus = true) {
  document.removeEventListener('keydown', handleKeydown)

  if (scrollLocked) {
    unlockModalScroll()
    scrollLocked = false
  }

  if (restoreFocus) {
    nextTick(() => triggerElement?.focus())
  }
}

watch(
  model,
  (isOpen) => {
    if (typeof document === 'undefined') return

    if (isOpen) activateModal()
    else deactivateModal()
  },
  { immediate: true },
)

onBeforeUnmount(() => deactivateModal(false))
</script>

<template>
  <Teleport to="body">
    <Transition name="app-modal">
      <div
        v-if="model"
        class="app-modal__backdrop"
        :class="{ 'app-modal__backdrop--top': !centered }"
        @mousedown.self="handleBackdrop"
      >
        <section
          ref="dialogRef"
          class="app-modal"
          :class="[
            'app-modal--' + size,
            {
              'app-modal--scrollable': scrollable,
              'app-modal--centered': centered,
            },
          ]"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="titleId"
          :aria-describedby="description ? descriptionId : undefined"
          tabindex="-1"
          @mousedown.stop
        >
          <header class="app-modal__header">
            <div v-if="icon || $slots.icon" class="app-modal__icon" :class="'app-modal__icon--' + tone">
              <slot name="icon">
                <component :is="icon" :size="20" aria-hidden="true" />
              </slot>
            </div>

            <div class="app-modal__heading">
              <h2 :id="titleId" class="app-modal__title">
                <slot name="title">{{ title }}</slot>
              </h2>
              <p v-if="description" :id="descriptionId" class="app-modal__description">
                {{ description }}
              </p>
            </div>

            <button
              v-if="showClose"
              type="button"
              class="app-modal__close"
              :aria-label="closeLabel"
              @click="requestClose('close-button')"
            >
              <X :size="20" aria-hidden="true" />
            </button>
          </header>

          <div class="app-modal__body">
            <slot />
          </div>

          <footer v-if="$slots.footer" class="app-modal__footer">
            <slot name="footer" />
          </footer>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

