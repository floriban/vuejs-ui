<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'
import { Check, ChevronDown, Search, X } from '@lucide/vue'
import { useFloatingPanel } from '../../composables/useFloatingPanel'

export interface AdvancedSelectOption {
  label: string
  value: string
  description?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<{
  id?: string
  options: AdvancedSelectOption[]
  placeholder?: string
  searchPlaceholder?: string
  multiple?: boolean
  clearable?: boolean
  disabled?: boolean
  required?: boolean
  invalid?: boolean
  describedBy?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'compact' | 'expanded'
}>(), { placeholder: 'Selecciona una opción', searchPlaceholder: 'Buscar...', size: 'md', variant: 'compact' })

const emit = defineEmits<{ clear: [] }>()
const model = defineModel<string | string[]>({ default: '' })
const root = ref<HTMLElement>()
const anchorRef = ref<HTMLElement>()
const searchRef = ref<HTMLInputElement>()
const open = ref(false)
const query = ref('')
const activeIndex = ref(-1)
const generatedId = useId()
const controlId = computed(() => props.id ?? generatedId)
const listId = computed(() => `${controlId.value}-listbox`)
const values = computed(() => Array.isArray(model.value) ? model.value : model.value ? [model.value] : [])
const selected = computed(() => props.options.filter((option) => values.value.includes(option.value)))
const visibleSelected = computed(() => props.variant === 'expanded' ? selected.value : selected.value.slice(0, 2))
const hiddenCount = computed(() => props.variant === 'compact' ? Math.max(0, selected.value.length - 2) : 0)
const filtered = computed(() => {
  const search = query.value.trim().toLocaleLowerCase()
  return search ? props.options.filter((option) => `${option.label} ${option.description ?? ''}`.toLocaleLowerCase().includes(search)) : props.options
})
const activeOptionId = computed(() => activeIndex.value >= 0 ? `${listId.value}-${activeIndex.value}` : undefined)
const { panel: panelRef, panelStyle, placement, update } = useFloatingPanel(anchorRef, open)
watch(filtered, () => {
  activeIndex.value = filtered.value.findIndex((option) => !option.disabled)
  nextTick(update)
})

function isSelected(value: string) { return values.value.includes(value) }
function toggle(option: AdvancedSelectOption) {
  if (option.disabled) return
  if (props.multiple) model.value = isSelected(option.value) ? values.value.filter((value) => value !== option.value) : [...values.value, option.value]
  else { model.value = option.value; open.value = false }
}
function clear() {
  model.value = props.multiple ? [] : ''
  query.value = ''
  open.value = false
  emit('clear')
}
async function toggleOpen() {
  if (props.disabled) return
  open.value = !open.value
  if (open.value) {
    query.value = ''
    activeIndex.value = filtered.value.findIndex((option) => !option.disabled)
    await nextTick()
    searchRef.value?.focus()
  }
}
function moveActive(step: 1 | -1) {
  if (!filtered.value.length) return
  let next = activeIndex.value
  for (let attempt = 0; attempt < filtered.value.length; attempt += 1) {
    next = (next + step + filtered.value.length) % filtered.value.length
    if (!filtered.value[next]?.disabled) { activeIndex.value = next; return }
  }
}
function selectActive() {
  const option = filtered.value[activeIndex.value]
  if (option) toggle(option)
}
function closeFromOutside(event: MouseEvent) {
  const target = event.target as Node
  if (!root.value?.contains(target) && !panelRef.value?.contains(target)) open.value = false
}
onMounted(() => document.addEventListener('mousedown', closeFromOutside))
onBeforeUnmount(() => document.removeEventListener('mousedown', closeFromOutside))
</script>

<template>
  <div ref="root" class="app-advanced-select" :class="[`app-advanced-select--${variant}`, { 'is-open': open, 'is-disabled': disabled, 'has-clear': clearable && selected.length }]">
    <button :id="controlId" ref="anchorRef" class="app-control app-advanced-select__trigger" :class="`app-control--${size}`" type="button" role="combobox" :disabled="disabled" :aria-expanded="open" :aria-controls="listId" :aria-describedby="describedBy" :aria-invalid="invalid || undefined" :aria-required="required || undefined" aria-haspopup="listbox" @click="toggleOpen" @keydown.esc="open = false">
      <span v-if="multiple && selected.length" class="app-advanced-select__tags">
        <span v-for="option in visibleSelected" :key="option.value" class="app-advanced-select__tag">{{ option.label }}</span>
        <span v-if="hiddenCount" class="app-advanced-select__count">+{{ hiddenCount }}</span>
      </span>
      <span v-else-if="selected[0]" class="app-advanced-select__value">{{ selected[0].label }}</span>
      <span v-else class="app-advanced-select__placeholder">{{ placeholder }}</span>
      <span class="app-advanced-select__actions"><ChevronDown :size="17" aria-hidden="true" /></span>
    </button>
    <button v-if="clearable && selected.length" type="button" class="app-advanced-select__clear" aria-label="Limpiar toda la selección" :disabled="disabled" @mousedown.stop @click.stop="clear"><X :size="15" /></button>
    <Teleport to="body">
      <div v-if="open" ref="panelRef" class="app-advanced-select__menu app-floating-menu" :class="`app-floating-menu--${placement}`" :style="panelStyle">
        <label class="app-advanced-select__search"><Search :size="16" aria-hidden="true" /><input ref="searchRef" v-model="query" type="search" :placeholder="searchPlaceholder" aria-label="Buscar opciones" :aria-controls="listId" :aria-activedescendant="activeOptionId" aria-autocomplete="list" @keydown.esc="open = false" @keydown.down.prevent="moveActive(1)" @keydown.up.prevent="moveActive(-1)" @keydown.enter.prevent="selectActive" /></label>
        <ul :id="listId" class="app-option-menu app-advanced-select__options" role="listbox" :aria-multiselectable="multiple || undefined">
          <li v-for="(option, index) in filtered" :id="`${listId}-${index}`" :key="option.value" :class="{ 'is-selected': isSelected(option.value), 'is-disabled': option.disabled, 'is-active': activeIndex === index }" role="option" :aria-selected="isSelected(option.value)" :aria-disabled="option.disabled || undefined" @mouseenter="activeIndex = index" @click="toggle(option)">
            <span><strong>{{ option.label }}</strong><small v-if="option.description">{{ option.description }}</small></span><Check v-if="isSelected(option.value)" :size="17" aria-hidden="true" />
          </li>
          <li v-if="!filtered.length" class="app-option-menu__empty">Sin resultados</li>
        </ul>
      </div>
    </Teleport>
  </div>
</template>
