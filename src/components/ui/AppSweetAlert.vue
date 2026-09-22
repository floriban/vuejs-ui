<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import type {
  SweetAlertIcon,
  SweetAlertInput,
  SweetAlertOptions,
  SweetAlertPosition,
} from 'sweetalert2'
import { useSweetAlert } from '../../composables/useSweetAlert'

type SweetAlertMode = 'alert' | 'confirm' | 'prompt' | 'toast'

const props = withDefaults(
  defineProps<{
    mode?: SweetAlertMode
    variant?: SweetAlertIcon
    title: string
    description?: string
    confirmLabel?: string
    cancelLabel?: string
    input?: SweetAlertInput
    inputPlaceholder?: string
    inputValue?: string
    position?: SweetAlertPosition
    timer?: number
    danger?: boolean
    options?: SweetAlertOptions
  }>(),
  {
    mode: 'alert',
    variant: 'info',
    description: undefined,
    confirmLabel: undefined,
    cancelLabel: 'Cancelar',
    input: 'text',
    inputPlaceholder: undefined,
    inputValue: undefined,
    position: 'top-end',
    timer: 2400,
    danger: false,
    options: undefined,
  },
)

const model = defineModel<boolean>({ default: false })
const emit = defineEmits<{
  open: []
  confirm: [value: unknown]
  cancel: [reason: string]
  close: []
}>()

const sweetAlert = useSweetAlert()
const active = ref(false)

async function show() {
  if (active.value) return
  active.value = true
  emit('open')

  const isToast = props.mode === 'toast'
  const isPrompt = props.mode === 'prompt'
  const showCancelButton = props.mode === 'confirm' || isPrompt
  const customClass = props.danger
    ? { confirmButton: 'app-button app-button--solid app-button--danger app-button--md' }
    : undefined

  const options = {
    icon: props.variant,
    title: props.title,
    text: props.description,
    showCancelButton,
    confirmButtonText: props.confirmLabel ?? (showCancelButton ? 'Confirmar' : 'Entendido'),
    cancelButtonText: props.cancelLabel,
    reverseButtons: showCancelButton,
    input: isPrompt ? props.input : undefined,
    inputPlaceholder: isPrompt ? props.inputPlaceholder : undefined,
    inputValue: isPrompt ? props.inputValue : undefined,
    toast: isToast,
    position: isToast ? props.position : 'center',
    timer: isToast ? props.timer : undefined,
    timerProgressBar: isToast,
    showConfirmButton: !isToast,
    customClass,
    ...props.options,
  } as SweetAlertOptions

  const result = await sweetAlert.fire(options)

  active.value = false
  model.value = false

  if (result.isConfirmed) emit('confirm', result.value)
  else if (result.dismiss) emit('cancel', String(result.dismiss))
  emit('close')
}

watch(model, (isOpen) => {
  if (isOpen) void show()
  else if (active.value) sweetAlert.close()
}, { immediate: true })

onBeforeUnmount(() => {
  if (active.value) sweetAlert.close()
})
</script>

<template>
  <span class="app-sweet-alert-controller" aria-hidden="true"></span>
</template>


