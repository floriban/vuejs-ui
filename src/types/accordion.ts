import type { Component } from 'vue'

export interface AccordionItem {
  value: string
  title: string
  description?: string
  icon?: Component
  disabled?: boolean
}
