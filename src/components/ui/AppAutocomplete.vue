<script setup lang="ts">
import { computed, nextTick, ref, useId, watch } from 'vue'
import { Search, X } from '@lucide/vue'
import { useFloatingPanel } from '../../composables/useFloatingPanel'

export interface AutocompleteOption {
  label: string
  value: string
  description?: string
}

const props = withDefaults(defineProps<{
  id?: string
  options: AutocompleteOption[]
  placeholder?: string
  minChars?: number
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  invalid?: boolean
  noResultsText?: string
}>(), { minChars: 0, size: 'md', noResultsText: 'Sin resultados' })

const emit = defineEmits<{ select: [option: AutocompleteOption] }>()
const model = defineModel<string>({ default: '' })
const generatedId = useId()
const inputId = computed(() => props.id ?? generatedId)
const listId = computed(() => `${inputId.value}-listbox`)
const open = ref(false)
const activeIndex = ref(-1)
const inputRef = ref<HTMLInputElement>()
const anchorRef = ref<HTMLElement>()
const filtered = computed(() => {
  const query = model.value.trim().toLocaleLowerCase()
  if (query.length < props.minChars) return []
  return props.options.filter((option) => `${option.label} ${option.description ?? ''}`.toLocaleLowerCase().includes(query)).slice(0, 8)
})
const { panel: panelRef, panelStyle, placement, update } = useFloatingPanel(anchorRef, open)
watch(filtered, () => nextTick(update))

function show() { if (!props.disabled) { open.value = true; activeIndex.value = filtered.value.length ? 0 : -1 } }
function close() { window.setTimeout(() => { open.value = false; activeIndex.value = -1 }, 120) }
function select(option: AutocompleteOption) { model.value = option.label; emit('select', option); open.value = false; activeIndex.value = -1; nextTick(() => inputRef.value?.focus()) }
function move(step: number) { if (!open.value) show(); if (filtered.value.length) activeIndex.value = (activeIndex.value + step + filtered.value.length) % filtered.value.length }
function chooseActive() { const option = filtered.value[activeIndex.value]; if (option) select(option) }
function clear() { model.value = ''; show(); nextTick(() => inputRef.value?.focus()) }
</script>

<template>
  <div class="app-autocomplete">
    <div ref="anchorRef" class="app-autocomplete__control">
      <Search :size="17" aria-hidden="true" />
      <input ref="inputRef" v-model="model" class="app-control" :class="`app-control--${size}`" :id="inputId" type="text" autocomplete="off" role="combobox" :placeholder="placeholder" :disabled="disabled" :aria-invalid="invalid || undefined" :aria-expanded="open" :aria-controls="listId" :aria-activedescendant="activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined" @focus="show" @input="show" @blur="close" @keydown.down.prevent="move(1)" @keydown.up.prevent="move(-1)" @keydown.enter.prevent="chooseActive" @keydown.esc="open = false" />
      <button v-if="model && !disabled" type="button" aria-label="Limpiar búsqueda" @mousedown.prevent @click="clear"><X :size="15" /></button>
    </div>
    <Teleport to="body">
      <ul v-if="open" :id="listId" ref="panelRef" class="app-option-menu app-floating-menu" :class="`app-floating-menu--${placement}`" :style="panelStyle" role="listbox">
        <li v-for="(option, index) in filtered" :id="`${listId}-${index}`" :key="option.value" :class="{ 'is-active': index === activeIndex }" role="option" :aria-selected="index === activeIndex" @mousedown.prevent="select(option)">
          <span><strong>{{ option.label }}</strong><small v-if="option.description">{{ option.description }}</small></span>
        </li>
        <li v-if="!filtered.length" class="app-option-menu__empty">{{ model.length < minChars ? `Escribe al menos ${minChars} caracteres` : noResultsText }}</li>
      </ul>
    </Teleport>
  </div>
</template>
