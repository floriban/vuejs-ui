<script setup lang="ts">
withDefaults(defineProps<{ variant?: 'elevated' | 'outline' }>(), { variant: 'outline' })
</script>

<template>
  <article class="app-card" :class="`app-card--${variant}`">
    <header v-if="$slots.header" class="app-card__header"><slot name="header" /></header>
    <div class="app-card__body"><slot /></div>
    <footer v-if="$slots.footer" class="app-card__footer"><slot name="footer" /></footer>
  </article>
</template>
