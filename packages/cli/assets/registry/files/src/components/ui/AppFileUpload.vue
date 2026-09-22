<script setup lang="ts">
import { computed, ref, useId, watch } from 'vue'
import { File as FileIcon, FileImage, UploadCloud, X } from '@lucide/vue'

export interface FileRejection {
  file: globalThis.File
  reason: string
}

const props = withDefaults(defineProps<{
  id?: string
  accept?: string
  multiple?: boolean
  maxSizeMb?: number
  maxFiles?: number
  disabled?: boolean
  invalid?: boolean
  title?: string
  description?: string
}>(), {
  accept: '', multiple: false, maxSizeMb: 5, maxFiles: 0, disabled: false, invalid: false,
  title: 'Selecciona o arrastra archivos',
})

const emit = defineEmits<{
  change: [files: globalThis.File[]]
  reject: [rejections: FileRejection[]]
  remove: [file: globalThis.File, index: number]
}>()
const model = defineModel<globalThis.File[]>({ default: () => [] })
const input = ref<HTMLInputElement>()
const dragging = ref(false)
const rejections = ref<FileRejection[]>([])
const generatedId = useId()
const inputId = computed(() => props.id ?? generatedId)
const hint = computed(() => props.description ?? [
  props.accept ? `Formatos: ${props.accept}` : 'Todos los formatos',
  props.maxSizeMb > 0 ? `hasta ${props.maxSizeMb} MB por archivo` : '',
].filter(Boolean).join(' · '))

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 ** 2).toFixed(1)} MB`
}

function acceptsFile(file: globalThis.File) {
  if (!props.accept.trim()) return true
  return props.accept.split(',').map((value) => value.trim().toLowerCase()).some((rule) => {
    if (rule.startsWith('.')) return file.name.toLowerCase().endsWith(rule)
    if (rule.endsWith('/*')) return file.type.toLowerCase().startsWith(rule.slice(0, -1))
    return file.type.toLowerCase() === rule
  })
}

function validationMessage(file: globalThis.File, current: globalThis.File[]) {
  if (!acceptsFile(file)) return 'El formato no está permitido.'
  if (props.maxSizeMb > 0 && file.size > props.maxSizeMb * 1024 ** 2) return `Supera el límite de ${props.maxSizeMb} MB.`
  if (current.some((item) => item.name === file.name && item.size === file.size && item.lastModified === file.lastModified)) return 'El archivo ya fue agregado.'
  const limit = props.multiple ? props.maxFiles : 1
  if (limit > 0 && current.length >= limit) return `Solo puedes agregar ${limit} archivo${limit === 1 ? '' : 's'}.`
}

function addFiles(fileList: FileList | globalThis.File[]) {
  if (props.disabled) return
  const incoming = Array.from(fileList)
  const next = props.multiple ? [...model.value] : []
  const rejected: FileRejection[] = []

  for (const file of props.multiple ? incoming : incoming.slice(0, 1)) {
    const reason = validationMessage(file, next)
    if (reason) rejected.push({ file, reason })
    else next.push(file)
  }

  model.value = next
  rejections.value = rejected
  emit('change', next)
  if (rejected.length) emit('reject', rejected)
}

watch(() => [props.multiple, props.accept, props.maxSizeMb, props.maxFiles] as const, ([multiple]) => {
  rejections.value = []
  if (!multiple && model.value.length > 1) {
    model.value = model.value.slice(0, 1)
    emit('change', model.value)
  }
})

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files) addFiles(target.files)
  target.value = ''
}

function onDrop(event: DragEvent) {
  dragging.value = false
  if (event.dataTransfer?.files) addFiles(event.dataTransfer.files)
}

function openPicker() {
  if (!props.disabled) input.value?.click()
}

function removeFile(index: number) {
  const file = model.value[index]
  if (!file || props.disabled) return
  model.value = model.value.filter((_, itemIndex) => itemIndex !== index)
  rejections.value = []
  emit('remove', file, index)
  emit('change', model.value)
}
</script>

<template>
  <div class="app-file-upload" :class="{ 'is-disabled': disabled, 'is-invalid': invalid || rejections.length }">
    <input ref="input" :id="inputId" class="app-file-upload__input" type="file" :accept="accept || undefined"
      :multiple="multiple" :disabled="disabled" tabindex="-1" @change="onInput" />
    <div class="app-file-upload__dropzone" :class="{ 'is-dragging': dragging }" role="button"
      :tabindex="disabled ? -1 : 0" :aria-disabled="disabled || undefined" :aria-controls="inputId"
      @click="openPicker" @keydown.enter.prevent="openPicker" @keydown.space.prevent="openPicker"
      @dragenter.prevent="dragging = true" @dragover.prevent="dragging = true" @dragleave.self="dragging = false"
      @drop.prevent="onDrop">
      <span class="app-file-upload__icon"><UploadCloud :size="24" /></span>
      <span class="app-file-upload__copy"><strong>{{ title }}</strong><small>{{ hint }}</small></span>
      <span class="app-file-upload__action">Explorar</span>
    </div>

    <ul v-if="model.length" class="app-file-upload__files" aria-label="Archivos seleccionados">
      <li v-for="(file, index) in model" :key="`${file.name}-${file.size}-${file.lastModified}`">
        <span class="app-file-upload__file-icon" aria-hidden="true">
          <FileImage v-if="file.type.startsWith('image/')" :size="19" />
          <FileIcon v-else :size="19" />
        </span>
        <span class="app-file-upload__file-copy"><strong>{{ file.name }}</strong><small>{{ formatSize(file.size) }}</small></span>
        <button type="button" :disabled="disabled" :aria-label="`Quitar ${file.name}`" @click="removeFile(index)">
          <X :size="17" aria-hidden="true" />
        </button>
      </li>
    </ul>

    <ul v-if="rejections.length" class="app-file-upload__errors" aria-live="polite">
      <li v-for="item in rejections" :key="`${item.file.name}-${item.reason}`"><strong>{{ item.file.name }}:</strong> {{ item.reason }}</li>
    </ul>
  </div>
</template>
