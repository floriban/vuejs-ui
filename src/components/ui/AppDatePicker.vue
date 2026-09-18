<script setup lang="ts">
import { CalendarDays } from '@lucide/vue'
import flatpickr from 'flatpickr'
import { Spanish } from 'flatpickr/dist/l10n/es.js'
import type { Instance } from 'flatpickr/dist/types/instance'
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  id?: string
  min?: string
  max?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  required?: boolean
  invalid?: boolean
  disableMobile?: boolean
}>(), { size: 'md', disableMobile: true })

const model = defineModel<string>({ default: '' })
const inputRef = ref<HTMLInputElement>()
let picker: Instance | undefined

function syncState() {
  if (!picker) return
  const visibleInput = picker.altInput ?? picker.input
  visibleInput.disabled = Boolean(props.disabled)
  visibleInput.required = Boolean(props.required)
  visibleInput.setAttribute('aria-invalid', props.invalid ? 'true' : 'false')
}

onMounted(() => {
  if (!inputRef.value) return
  picker = flatpickr(inputRef.value, {
    locale: Spanish,
    dateFormat: 'Y-m-d',
    altInput: true,
    altFormat: 'd/m/Y',
    allowInput: true,
    disableMobile: props.disableMobile,
    defaultDate: model.value || undefined,
    minDate: props.min || undefined,
    maxDate: props.max || undefined,
    onReady: (_dates, _date, instance) => {
      if (instance.altInput && props.id) instance.altInput.id = props.id
      syncState()
    },
    onChange: (_dates, date) => { model.value = date },
  })
})

watch(model, (value) => {
  if (picker && picker.input.value !== value) value ? picker.setDate(value, false, 'Y-m-d') : picker.clear(false)
})
watch(() => props.min, (value) => picker?.set('minDate', value || undefined))
watch(() => props.max, (value) => picker?.set('maxDate', value || undefined))
watch(() => [props.disabled, props.required, props.invalid], () => nextTick(syncState))
onBeforeUnmount(() => picker?.destroy())
</script>

<template>
  <span class="app-input-affix app-flatpickr">
    <CalendarDays :size="18" aria-hidden="true" />
    <input ref="inputRef" class="app-control app-control--with-icon" :class="`app-control--${size}`" :id="id ? `${id}-value` : undefined" type="text" :disabled="disabled" :required="required" :aria-invalid="invalid || undefined" />
  </span>
</template>
