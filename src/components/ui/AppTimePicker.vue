<script setup lang="ts">
import { Clock3 } from '@lucide/vue'
import flatpickr from 'flatpickr'
import { Spanish } from 'flatpickr/dist/l10n/es.js'
import type { Instance } from 'flatpickr/dist/types/instance'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  id?: string
  min?: string
  max?: string
  step?: number
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  required?: boolean
  invalid?: boolean
  disableMobile?: boolean
}>(), { size: 'md', step: 60, disableMobile: true })

const model = defineModel<string>({ default: '' })
const inputRef = ref<HTMLInputElement>()
let picker: Instance | undefined
const minuteIncrement = () => Math.max(1, Math.round(props.step / 60))

onMounted(() => {
  if (!inputRef.value) return
  picker = flatpickr(inputRef.value, {
    locale: Spanish,
    enableTime: true,
    noCalendar: true,
    dateFormat: 'H:i',
    time_24hr: true,
    allowInput: true,
    disableMobile: props.disableMobile,
    defaultDate: model.value || undefined,
    minTime: props.min || undefined,
    maxTime: props.max || undefined,
    minuteIncrement: minuteIncrement(),
    onChange: (_dates, time) => { model.value = time },
  })
})
watch(model, (value) => { if (picker && picker.input.value !== value) value ? picker.setDate(value, false, 'H:i') : picker.clear(false) })
watch(() => props.min, (value) => picker?.set('minTime', value || undefined))
watch(() => props.max, (value) => picker?.set('maxTime', value || undefined))
watch(() => props.step, () => picker?.set('minuteIncrement', minuteIncrement()))
onBeforeUnmount(() => picker?.destroy())
</script>

<template>
  <span class="app-input-affix app-flatpickr">
    <Clock3 :size="18" aria-hidden="true" />
    <input ref="inputRef" class="app-control app-control--with-icon" :class="`app-control--${size}`" :id="id" type="text" :disabled="disabled" :required="required" :aria-invalid="invalid || undefined" />
  </span>
</template>
