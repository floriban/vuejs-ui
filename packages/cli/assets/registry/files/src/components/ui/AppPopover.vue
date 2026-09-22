<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, useId, watch } from 'vue'
import { ChevronDown, X } from '@lucide/vue'

type Placement = 'top' | 'bottom' | 'left' | 'right'
type Align = 'start' | 'center' | 'end'

const props = withDefaults(
  defineProps<{
    label: string
    title: string
    description?: string
    placement?: Placement
    align?: Align
    width?: 'sm' | 'md' | 'lg'
    offset?: number
    disabled?: boolean
    showClose?: boolean
    triggerVariant?: 'solid' | 'outline' | 'soft' | 'ghost'
    triggerColor?: 'primary' | 'neutral' | 'info' | 'success' | 'warning' | 'danger'
    triggerSize?: 'sm' | 'md' | 'lg'
    iconOnly?: boolean
  }>(),
  {
    description: undefined,
    placement: 'bottom',
    align: 'center',
    width: 'md',
    offset: 9,
    disabled: false,
    showClose: true,
    triggerVariant: 'outline',
    triggerColor: 'neutral',
    triggerSize: 'md',
    iconOnly: false,
  },
)

const model = defineModel<boolean>({ default: false })
const emit = defineEmits<{ open: []; close: [] }>()
const triggerRef = ref<HTMLButtonElement | null>(null)
const panelRef = ref<HTMLElement | null>(null)
const positioned = ref(false)
const resolvedPlacement = ref<Placement>(props.placement)
const panelStyle = ref<Record<string, string>>({})
const panelId = 'popover-' + useId()
const titleId = panelId + '-title'
const descriptionId = panelId + '-description'
let restoreFocus = true

const focusableSelector = 'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

function calculatePosition() {
  if (!triggerRef.value || !panelRef.value) return

  const trigger = triggerRef.value.getBoundingClientRect()
  const panel = panelRef.value.getBoundingClientRect()
  const padding = 8
  const spaces = {
    top: trigger.top,
    bottom: window.innerHeight - trigger.bottom,
    left: trigger.left,
    right: window.innerWidth - trigger.right,
  }
  const required = props.placement === 'top' || props.placement === 'bottom' ? panel.height : panel.width
  let placement = props.placement

  if (spaces[placement] < required + props.offset) {
    const opposite: Record<Placement, Placement> = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' }
    if (spaces[opposite[placement]] > spaces[placement]) placement = opposite[placement]
  }

  let top = trigger.bottom + props.offset
  let left = trigger.left + trigger.width / 2 - panel.width / 2

  if (placement === 'top') top = trigger.top - panel.height - props.offset
  if (placement === 'left' || placement === 'right') {
    top = props.align === 'start'
      ? trigger.top
      : props.align === 'end'
        ? trigger.bottom - panel.height
        : trigger.top + trigger.height / 2 - panel.height / 2
    left = placement === 'left' ? trigger.left - panel.width - props.offset : trigger.right + props.offset
  } else {
    left = props.align === 'start'
      ? trigger.left
      : props.align === 'end'
        ? trigger.right - panel.width
        : trigger.left + trigger.width / 2 - panel.width / 2
  }

  top = Math.max(padding, Math.min(top, window.innerHeight - panel.height - padding))
  left = Math.max(padding, Math.min(left, window.innerWidth - panel.width - padding))

  resolvedPlacement.value = placement
  panelStyle.value = { top: Math.round(top) + 'px', left: Math.round(left) + 'px' }
  positioned.value = true
}

function openPopover() {
  if (!props.disabled) {
    restoreFocus = true
    model.value = true
  }
}

function closePopover(shouldRestore = true) {
  restoreFocus = shouldRestore
  model.value = false
}

function togglePopover() {
  if (model.value) closePopover()
  else openPopover()
}

function handleOutside(event: PointerEvent) {
  const target = event.target as Node
  if (triggerRef.value?.contains(target) || panelRef.value?.contains(target)) return
  closePopover(false)
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && model.value) {
    event.preventDefault()
    closePopover()
  }
}

function addListeners() {
  document.addEventListener('pointerdown', handleOutside)
  document.addEventListener('keydown', handleKeydown)
  window.addEventListener('resize', calculatePosition)
  window.addEventListener('scroll', calculatePosition, true)
}

function removeListeners() {
  document.removeEventListener('pointerdown', handleOutside)
  document.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('resize', calculatePosition)
  window.removeEventListener('scroll', calculatePosition, true)
}

watch(model, async (open) => {
  if (open) {
    positioned.value = false
    addListeners()
    await nextTick()
    calculatePosition()
    await nextTick()
    const preferred = panelRef.value?.querySelector<HTMLElement>('[data-popover-initial]')
    const first = panelRef.value?.querySelector<HTMLElement>(focusableSelector)
    ;(preferred ?? first ?? panelRef.value)?.focus()
    emit('open')
  } else {
    removeListeners()
    if (restoreFocus) await nextTick(() => triggerRef.value?.focus())
    emit('close')
  }
})

onBeforeUnmount(removeListeners)
</script>

<template>
  <span class="app-popover">
    <button
      ref="triggerRef"
      type="button"
      class="app-button app-popover__trigger"
      :class="[
        'app-button--' + triggerVariant,
        'app-button--' + triggerColor,
        'app-button--' + triggerSize,
        { 'app-button--icon-only': iconOnly },
      ]"
      :disabled="disabled"
      :aria-label="iconOnly ? label : undefined"
      aria-haspopup="dialog"
      :aria-expanded="model"
      :aria-controls="model ? panelId : undefined"
      @click="togglePopover"
    >
      <slot name="trigger">{{ label }}</slot>
      <ChevronDown v-if="!iconOnly" :size="16" aria-hidden="true" />
    </button>

    <Teleport to="body">
      <Transition name="app-popover-panel">
        <section
          v-if="model"
          :id="panelId"
          ref="panelRef"
          class="app-popover__panel"
          :class="[
            'app-popover__panel--' + width,
            'app-popover__panel--' + resolvedPlacement,
            { 'app-popover__panel--positioned': positioned },
          ]"
          :style="panelStyle"
          role="dialog"
          aria-modal="false"
          :aria-labelledby="titleId"
          :aria-describedby="description ? descriptionId : undefined"
          tabindex="-1"
        >
          <header class="app-popover__header">
            <div>
              <h3 :id="titleId">{{ title }}</h3>
              <p v-if="description" :id="descriptionId">{{ description }}</p>
            </div>
            <button v-if="showClose" type="button" class="app-popover__close" :aria-label="'Cerrar ' + title" @click="closePopover()">
              <X :size="17" aria-hidden="true" />
            </button>
          </header>
          <div class="app-popover__body"><slot /></div>
          <footer v-if="$slots.footer" class="app-popover__footer"><slot name="footer" :close="closePopover" /></footer>
        </section>
      </Transition>
    </Teleport>
  </span>
</template>
