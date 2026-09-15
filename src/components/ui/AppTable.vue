<script setup lang="ts">
withDefaults(
  defineProps<{
    striped?: boolean
    hoverable?: boolean
    compact?: boolean
    label?: string
  }>(),
  { striped: false, hoverable: true, compact: false, label: 'Tabla de datos' },
)
</script>

<template>
  <div class="app-table-wrap" role="region" :aria-label="label" tabindex="0">
    <table
      class="app-table"
      :class="{
        'app-table--striped': striped,
        'app-table--hoverable': hoverable,
        'app-table--compact': compact,
      }"
    >
      <slot />
    </table>
  </div>
</template>
