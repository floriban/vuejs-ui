export type ToastStatus = 'info' | 'success' | 'warning' | 'danger'

export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'

export interface ToastAction {
  label: string
  onClick?: () => void
}

export interface ToastOptions {
  title?: string
  message: string
  status?: ToastStatus
  duration?: number
  closable?: boolean
  action?: ToastAction
}

export interface ToastItem extends Required<Omit<ToastOptions, 'title' | 'action'>> {
  id: number
  title?: string
  action?: ToastAction
}
