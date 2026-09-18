import type { Component } from 'vue'

export interface TabItem {
  value: string
  label: string
  description?: string
  icon?: Component
  badge?: string | number
  disabled?: boolean
}
