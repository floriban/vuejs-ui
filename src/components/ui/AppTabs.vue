<script setup lang="ts">
import { computed, nextTick, ref, useId, watch } from 'vue'
import type { TabItem } from '../../types/tabs'

const props = withDefaults(
  defineProps<{
    tabs: TabItem[]
    label: string
    variant?: 'line' | 'pill' | 'boxed'
    orientation?: 'horizontal' | 'vertical'
    fitted?: boolean
  }>(),
  {
    variant: 'line',
    orientation: 'horizontal',
    fitted: false,
  },
)

const model = defineModel<string>({ default: '' })
const baseId = 'tabs-' + useId()
const tabRefs = ref<Array<HTMLButtonElement | null>>([])

const activeTab = computed(() => props.tabs.find((tab) => tab.value === model.value))

function enabledIndexes() {
  return props.tabs.map((tab, index) => ({ tab, index })).filter(({ tab }) => !tab.disabled)
}

function ensureSelection() {
  const current = props.tabs.find((tab) => tab.value === model.value && !tab.disabled)
  if (!current) model.value = props.tabs.find((tab) => !tab.disabled)?.value ?? ''
}

function selectTab(tab: TabItem) {
  if (!tab.disabled) model.value = tab.value
}

function focusAndSelect(index: number) {
  const tab = props.tabs[index]
  if (!tab || tab.disabled) return

  model.value = tab.value
  nextTick(() => tabRefs.value[index]?.focus())
}

function handleKeydown(event: KeyboardEvent, currentIndex: number) {
  const enabled = enabledIndexes()
  const enabledPosition = enabled.findIndex(({ index }) => index === currentIndex)
  const previousKey = props.orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft'
  const nextKey = props.orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight'
  let targetIndex: number | undefined

  if (event.key === 'Home') targetIndex = enabled[0]?.index
  else if (event.key === 'End') targetIndex = enabled.at(-1)?.index
  else if (event.key === nextKey) targetIndex = enabled[(enabledPosition + 1) % enabled.length]?.index
  else if (event.key === previousKey) targetIndex = enabled[(enabledPosition - 1 + enabled.length) % enabled.length]?.index

  if (targetIndex !== undefined) {
    event.preventDefault()
    focusAndSelect(targetIndex)
  }
}

function tabId(index: number) {
  return baseId + '-tab-' + index
}

function panelId(index: number) {
  return baseId + '-panel-' + index
}

watch(() => props.tabs, ensureSelection, { immediate: true, deep: true })
watch(model, ensureSelection)
</script>

<template>
  <div
    class="app-tabs"
    :class="[
      'app-tabs--' + variant,
      'app-tabs--' + orientation,
      { 'app-tabs--fitted': fitted },
    ]"
  >
    <div class="app-tabs__list" role="tablist" :aria-label="label" :aria-orientation="orientation">
      <button
        v-for="(tab, index) in tabs"
        :id="tabId(index)"
        :key="tab.value"
        :ref="(element) => (tabRefs[index] = element as HTMLButtonElement | null)"
        type="button"
        class="app-tabs__tab"
        role="tab"
        :aria-selected="model === tab.value"
        :aria-controls="panelId(index)"
        :tabindex="model === tab.value ? 0 : -1"
        :disabled="tab.disabled"
        @click="selectTab(tab)"
        @keydown="handleKeydown($event, index)"
      >
        <component :is="tab.icon" v-if="tab.icon" :size="18" aria-hidden="true" />
        <span class="app-tabs__label">
          <strong>{{ tab.label }}</strong>
          <small v-if="tab.description">{{ tab.description }}</small>
        </span>
        <span v-if="tab.badge !== undefined" class="app-tabs__badge">{{ tab.badge }}</span>
      </button>
    </div>

    <div
      v-if="activeTab"
      :id="panelId(tabs.findIndex((tab) => tab.value === activeTab?.value))"
      class="app-tabs__panel"
      role="tabpanel"
      :aria-labelledby="tabId(tabs.findIndex((tab) => tab.value === activeTab?.value))"
      tabindex="0"
    >
      <slot :active-tab="activeTab" />
    </div>
  </div>
</template>
