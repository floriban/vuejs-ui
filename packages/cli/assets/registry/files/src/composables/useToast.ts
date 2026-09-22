import { readonly, ref } from 'vue'
import type { ToastItem, ToastOptions, ToastStatus } from '../types/toast'

const items = ref<ToastItem[]>([])
let nextId = 0
const maximumVisible = 5

function showToast(options: ToastOptions | string) {
  const normalized = typeof options === 'string' ? { message: options } : options
  const item: ToastItem = {
    id: ++nextId,
    title: normalized.title,
    message: normalized.message,
    status: normalized.status ?? 'info',
    duration: normalized.duration ?? 4500,
    closable: normalized.closable ?? true,
    action: normalized.action,
  }

  items.value.push(item)

  if (items.value.length > maximumVisible) {
    items.value.splice(0, items.value.length - maximumVisible)
  }

  return item.id
}

function dismissToast(id: number) {
  items.value = items.value.filter((item) => item.id !== id)
}

function clearToasts() {
  items.value = []
}

function createStatusShortcut(status: ToastStatus) {
  return (message: string, options: Omit<ToastOptions, 'message' | 'status'> = {}) =>
    showToast({ ...options, message, status })
}

export function useToast() {
  return {
    toasts: readonly(items),
    show: showToast,
    info: createStatusShortcut('info'),
    success: createStatusShortcut('success'),
    warning: createStatusShortcut('warning'),
    danger: createStatusShortcut('danger'),
    dismiss: dismissToast,
    clear: clearToasts,
  }
}
