<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'solid' | 'outline' | 'soft' | 'ghost'
    color?: 'primary' | 'neutral' | 'info' | 'success' | 'warning' | 'danger'
    size?: 'sm' | 'md' | 'lg'
    loading?: boolean
    disabled?: boolean
    block?: boolean
    iconOnly?: boolean
    type?: 'button' | 'submit' | 'reset'
  }>(),
  {
    variant: 'solid',
    color: 'primary',
    size: 'md',
    loading: false,
    disabled: false,
    block: false,
    iconOnly: false,
    type: 'button',
  },
)
</script>

<template>
  <button
    class="app-button"
    :class="[
      `app-button--${variant}`,
      `app-button--${color}`,
      `app-button--${size}`,
      {
        'app-button--block': block,
        'app-button--icon-only': iconOnly,
      },
    ]"
    :type="type"
    :disabled="disabled || loading"
    :aria-busy="loading || undefined"
  >
    <span v-if="loading" class="app-button__spinner" aria-hidden="true"></span>
    <slot />
  </button>
</template>
