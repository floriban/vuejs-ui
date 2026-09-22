<script setup lang="ts">
import type { Component } from 'vue'

export interface TimelineItem {
  id: string | number
  title: string
  description?: string
  time?: string
  color?: 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'neutral'
  icon?: Component
}

withDefaults(defineProps<{
  items: TimelineItem[]
  align?: 'left' | 'alternate'
  compact?: boolean
}>(), { align: 'left', compact: false })
</script>

<template>
  <ol class="app-timeline" :class="[`app-timeline--${align}`, { 'app-timeline--compact': compact }]">
    <li v-for="item in items" :key="item.id" class="app-timeline__item" :class="`app-timeline__item--${item.color ?? 'primary'}`">
      <span class="app-timeline__marker" aria-hidden="true">
        <component :is="item.icon" v-if="item.icon" :size="14" :stroke-width="2" />
      </span>
      <div class="app-timeline__content">
        <time v-if="item.time" class="app-timeline__time">{{ item.time }}</time>
        <strong>{{ item.title }}</strong>
        <p v-if="item.description">{{ item.description }}</p>
        <slot name="item" :item="item" />
      </div>
    </li>
  </ol>
</template>