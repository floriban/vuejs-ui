<script setup lang="ts">
import type { Component } from 'vue'

withDefaults(
  defineProps<{
    variant?: 'elevated' | 'outline'
    title?: string
    subtitle?: string
    icon?: Component
    iconColor?: 'primary' | 'neutral' | 'success' | 'info' | 'warning' | 'danger'
  }>(),
  { variant: 'outline', iconColor: 'primary' },
)
</script>

<template>
  <article class="app-card" :class="'app-card--' + variant">
    <header v-if="$slots.header || title || subtitle || icon || $slots.icon || $slots.toolbar" class="app-card__header">
      <slot name="header">
        <div v-if="title || subtitle || icon || $slots.icon" class="app-card__heading">
          <span v-if="icon || $slots.icon" class="app-card__icon" :class="'app-card__icon--' + iconColor" aria-hidden="true">
            <slot name="icon"><component :is="icon" :size="24" :stroke-width="1.8" /></slot>
          </span>
          <div v-if="title || subtitle" class="app-card__labels">
            <h3 v-if="title" class="app-card__title">{{ title }}</h3>
            <p v-if="subtitle" class="app-card__subtitle">{{ subtitle }}</p>
          </div>
        </div>
        <div v-if="$slots.toolbar" class="app-card__toolbar"><slot name="toolbar" /></div>
      </slot>
    </header>
    <div class="app-card__body"><slot /></div>
    <footer v-if="$slots.footer" class="app-card__footer"><slot name="footer" /></footer>
  </article>
</template>
