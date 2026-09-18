<script setup lang="ts">
import { computed, nextTick, ref, useId, watch } from 'vue'
import { ChevronDown } from '@lucide/vue'
import type { AccordionItem } from '../../types/accordion'

const props = withDefaults(
  defineProps<{
    items: AccordionItem[]
    multiple?: boolean
    collapsible?: boolean
    variant?: 'default' | 'separated'
    headingLevel?: 2 | 3 | 4 | 5 | 6
  }>(),
  {
    multiple: false,
    collapsible: true,
    variant: 'default',
    headingLevel: 3,
  },
)

const model = defineModel<string | string[]>({ default: '' })
const baseId = 'accordion-' + useId()
const buttonRefs = ref<Array<HTMLButtonElement | null>>([])
const headingTag = computed(() => 'h' + props.headingLevel)

function isOpen(value: string) {
  return Array.isArray(model.value) ? model.value.includes(value) : model.value === value
}

function normalizeModel() {
  const enabledValues = props.items.filter((item) => !item.disabled).map((item) => item.value)

  if (props.multiple) {
    const current = Array.isArray(model.value) ? model.value : model.value ? [model.value] : []
    model.value = current.filter((value) => enabledValues.includes(value))
  } else {
    const current = Array.isArray(model.value) ? model.value[0] ?? '' : model.value
    if (current && enabledValues.includes(current)) model.value = current
    else model.value = props.collapsible ? '' : enabledValues[0] ?? ''
  }
}

function toggle(item: AccordionItem) {
  if (item.disabled) return

  if (props.multiple) {
    const current = Array.isArray(model.value) ? model.value : []
    model.value = current.includes(item.value)
      ? current.filter((value) => value !== item.value)
      : [...current, item.value]
    return
  }

  if (model.value === item.value) {
    if (props.collapsible) model.value = ''
  } else {
    model.value = item.value
  }
}

function enabledIndexes() {
  return props.items.map((item, index) => ({ item, index })).filter(({ item }) => !item.disabled)
}

function handleKeydown(event: KeyboardEvent, currentIndex: number) {
  const enabled = enabledIndexes()
  const position = enabled.findIndex(({ index }) => index === currentIndex)
  let targetIndex: number | undefined

  if (event.key === 'Home') targetIndex = enabled[0]?.index
  else if (event.key === 'End') targetIndex = enabled.at(-1)?.index
  else if (event.key === 'ArrowDown') targetIndex = enabled[(position + 1) % enabled.length]?.index
  else if (event.key === 'ArrowUp') targetIndex = enabled[(position - 1 + enabled.length) % enabled.length]?.index

  if (targetIndex !== undefined) {
    event.preventDefault()
    nextTick(() => buttonRefs.value[targetIndex]?.focus())
  }
}

function triggerId(index: number) {
  return baseId + '-trigger-' + index
}

function panelId(index: number) {
  return baseId + '-panel-' + index
}

watch(
  [() => props.multiple, () => props.collapsible, () => props.items],
  normalizeModel,
  { immediate: true, deep: true },
)
</script>

<template>
  <div class="app-accordion" :class="'app-accordion--' + variant">
    <div
      v-for="(item, index) in items"
      :key="item.value"
      class="app-accordion__item"
      :class="{ 'app-accordion__item--open': isOpen(item.value) }"
    >
      <component :is="headingTag" class="app-accordion__heading">
        <button
          :id="triggerId(index)"
          :ref="(element) => (buttonRefs[index] = element as HTMLButtonElement | null)"
          type="button"
          class="app-accordion__trigger"
          :aria-expanded="isOpen(item.value)"
          :aria-controls="panelId(index)"
          :disabled="item.disabled"
          @click="toggle(item)"
          @keydown="handleKeydown($event, index)"
        >
          <span v-if="item.icon" class="app-accordion__icon">
            <component :is="item.icon" :size="19" aria-hidden="true" />
          </span>
          <span class="app-accordion__title">
            <slot name="title" :item="item" :open="isOpen(item.value)">
              <strong>{{ item.title }}</strong>
              <small v-if="item.description">{{ item.description }}</small>
            </slot>
          </span>
          <ChevronDown class="app-accordion__chevron" :size="19" aria-hidden="true" />
        </button>
      </component>

      <Transition name="app-accordion-panel">
        <div
          v-show="isOpen(item.value)"
          :id="panelId(index)"
          class="app-accordion__panel"
          role="region"
          :aria-labelledby="triggerId(index)"
        >
          <div class="app-accordion__content">
            <slot :item="item" :open="isOpen(item.value)" />
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>
