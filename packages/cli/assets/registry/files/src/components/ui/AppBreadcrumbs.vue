<script setup lang="ts">
import { computed } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import { ChevronRight, MoreHorizontal } from '@lucide/vue'

export interface BreadcrumbItem {
  label: string
  to?: RouteLocationRaw
  href?: string
}

type DisplayItem = BreadcrumbItem & { ellipsis?: boolean }
const props = withDefaults(defineProps<{
  items: BreadcrumbItem[]
  label?: string
  separator?: 'chevron' | 'slash' | 'dot'
  maxItems?: number
}>(), { label: 'Ruta de navegación', separator: 'chevron', maxItems: 0 })

const visibleItems = computed<DisplayItem[]>(() => {
  if (!props.maxItems || props.items.length <= props.maxItems || props.maxItems < 3) return props.items
  const tail = props.items.slice(-(props.maxItems - 2))
  return [props.items[0]!, { label: 'Elementos intermedios', ellipsis: true }, ...tail]
})
</script>

<template>
  <nav class="app-breadcrumbs" :aria-label="label">
    <ol>
      <li v-for="(item, index) in visibleItems" :key="item.ellipsis ? 'ellipsis' : `${item.label}-${index}`">
        <span v-if="index" class="app-breadcrumbs__separator" aria-hidden="true">
          <ChevronRight v-if="separator === 'chevron'" :size="15" />
          <span v-else>{{ separator === 'slash' ? '/' : '·' }}</span>
        </span>
        <span v-if="item.ellipsis" class="app-breadcrumbs__ellipsis" :aria-label="item.label"><MoreHorizontal :size="18" aria-hidden="true" /></span>
        <RouterLink v-else-if="item.to && index < visibleItems.length - 1" :to="item.to">{{ item.label }}</RouterLink>
        <a v-else-if="item.href && index < visibleItems.length - 1" :href="item.href">{{ item.label }}</a>
        <span v-else :aria-current="index === visibleItems.length - 1 ? 'page' : undefined">{{ item.label }}</span>
      </li>
    </ol>
  </nav>
</template>