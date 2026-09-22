import Swal, {
  type SweetAlertIcon,
  type SweetAlertOptions,
  type SweetAlertPosition,
  type SweetAlertResult,
} from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

export const appSweetAlertDefaults: SweetAlertOptions = {
  buttonsStyling: false,
  position: 'center',
  customClass: {
    popup: 'app-swal',
    confirmButton: 'app-button app-button--solid app-button--primary app-button--md',
    cancelButton: 'app-button app-button--outline app-button--neutral app-button--md',
    actions: 'app-swal__actions',
  },
}

export interface AppSweetAlertMessage {
  title: string
  description?: string
  icon?: SweetAlertIcon
  confirmLabel?: string
}

export interface AppSweetAlertConfirm extends AppSweetAlertMessage {
  cancelLabel?: string
  danger?: boolean
}

export interface AppSweetAlertToast {
  title: string
  icon?: SweetAlertIcon
  position?: SweetAlertPosition
  timer?: number
}

function mergeOptions(options: SweetAlertOptions): SweetAlertOptions {
  const customClass = {
    ...(appSweetAlertDefaults.customClass as Record<string, string>),
    ...(options.customClass as Record<string, string> | undefined),
  }

  return { ...appSweetAlertDefaults, ...options, customClass } as SweetAlertOptions
}

export function useSweetAlert() {
  function fire(options: SweetAlertOptions): Promise<SweetAlertResult> {
    return Swal.fire(mergeOptions(options))
  }

  function message(options: AppSweetAlertMessage) {
    return fire({
      icon: options.icon ?? 'info',
      title: options.title,
      text: options.description,
      confirmButtonText: options.confirmLabel ?? 'Entendido',
    })
  }

  async function confirm(options: AppSweetAlertConfirm) {
    const result = await fire({
      icon: options.icon ?? 'warning',
      title: options.title,
      text: options.description,
      showCancelButton: true,
      confirmButtonText: options.confirmLabel ?? 'Confirmar',
      cancelButtonText: options.cancelLabel ?? 'Cancelar',
      reverseButtons: true,
      customClass: options.danger
        ? { confirmButton: 'app-button app-button--solid app-button--danger app-button--md' }
        : undefined,
    })

    return result.isConfirmed
  }

  function toast(options: AppSweetAlertToast) {
    return Swal.fire({
      toast: true,
      position: options.position ?? 'top-end',
      icon: options.icon ?? 'success',
      title: options.title,
      showConfirmButton: false,
      timer: options.timer ?? 2400,
      timerProgressBar: true,
    })
  }

  return {
    fire,
    message,
    confirm,
    toast,
    close: () => Swal.close(),
  }
}


