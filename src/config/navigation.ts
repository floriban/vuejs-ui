import type { Component } from 'vue'
import { Compass, Database, FormInput, LayoutDashboard, MessagesSquare, Shapes } from '@lucide/vue'

export interface NavigationItem {
  name: string
  label: string
}

export interface NavigationGroup {
  id: string
  label: string
  description: string
  icon: Component
  items: NavigationItem[]
}

export const dashboardItem = { name: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }

export const navigationGroups: NavigationGroup[] = [
  {
    id: 'elements',
    label: 'Elementos visuales',
    description: 'Piezas de presentación, identidad y contenido.',
    icon: Shapes,
    items: [
      { name: 'buttons', label: 'Botones' },
      { name: 'cards', label: 'Tarjetas' },
      { name: 'badges', label: 'Badges' },
      { name: 'avatars', label: 'Avatares' },
      { name: 'timeline', label: 'Timeline' },
    ],
  },
  {
    id: 'forms',
    label: 'Formularios',
    description: 'Controles para capturar, buscar y seleccionar datos.',
    icon: FormInput,
    items: [
      { name: 'forms', label: 'Controles base' },
      { name: 'datepicker', label: 'DatePicker' },
      { name: 'timepicker', label: 'TimePicker' },
      { name: 'autocomplete', label: 'Autocomplete' },
      { name: 'input-mask', label: 'Input Mask' },
      { name: 'select2', label: 'Select2' },
    ],
  },
  {
    id: 'data',
    label: 'Datos',
    description: 'Presentación y recorrido de colecciones de información.',
    icon: Database,
    items: [
      { name: 'tables', label: 'Tablas' },
      { name: 'pagination', label: 'Pagination' },
    ],
  },
  {
    id: 'navigation',
    label: 'Navegación',
    description: 'Patrones para cambiar de contexto y organizar contenido.',
    icon: Compass,
    items: [
      { name: 'dropdowns', label: 'Dropdowns' },
      { name: 'tabs', label: 'Tabs' },
      { name: 'accordion', label: 'Accordion' },
      { name: 'breadcrumbs', label: 'Breadcrumbs' },
      { name: 'stepper', label: 'Stepper' },
    ],
  },
  {
    id: 'feedback',
    label: 'Feedback y capas',
    description: 'Estados, mensajes y contenido temporal superpuesto.',
    icon: MessagesSquare,
    items: [
      { name: 'alerts', label: 'Alertas' },
      { name: 'modals', label: 'Modales' },
      { name: 'toasts', label: 'Notificaciones' },
      { name: 'progress', label: 'Progress' },
      { name: 'spinners', label: 'Spinners' },
      { name: 'skeleton', label: 'Skeleton' },
      { name: 'tooltips', label: 'Tooltips' },
      { name: 'popovers', label: 'Popovers' },
      { name: 'sweetalert2', label: 'SweetAlert2' },
    ],
  },
]

export function findNavigationItem(name: unknown) {
  if (name === dashboardItem.name) return dashboardItem
  return navigationGroups.flatMap((group) => group.items).find((item) => item.name === name)
}
