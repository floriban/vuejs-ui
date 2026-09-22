<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    value?: number
    max?: number
    label: string
    color?: 'primary' | 'neutral' | 'info' | 'success' | 'warning' | 'danger'
    size?: 'sm' | 'md' | 'lg'
    type?: 'linear' | 'circular'
    striped?: boolean
    animated?: boolean
    showValue?: boolean
    indeterminate?: boolean
  }>(),
  {
    value: 0,
    max: 100,
    color: 'primary',
    size: 'md',
    type: 'linear',
    striped: false,
    animated: false,
    showValue: false,
    indeterminate: false,
  },
)

const percentage = computed(() => {
  if (props.max <= 0) return 0
  return Math.min(100, Math.max(0, (props.value / props.max) * 100))
})
</script>

<template>
  <div
    class="app-progress"
    :class="[
      'app-progress--' + type,
      'app-progress--' + color,
      'app-progress--' + size,
      {
        'app-progress--striped': striped,
        'app-progress--animated': animated,
        'app-progress--indeterminate': indeterminate,
      },
    ]"
    role="progressbar"
    :aria-label="label"
    :aria-valuemin="indeterminate ? undefined : 0"
    :aria-valuemax="indeterminate ? undefined : max"
    :aria-valuenow="indeterminate ? undefined : value"
    :aria-valuetext="indeterminate ? 'En progreso' : Math.round(percentage) + '%'"
  >
    <template v-if="type === 'linear'">
      <div class="app-progress__track">
        <span class="app-progress__bar" :style="indeterminate ? undefined : { width: percentage + '%' }"></span>
      </div>
      <span v-if="showValue && !indeterminate" class="app-progress__value">{{ Math.round(percentage) }}%</span>
    </template>

    <template v-else>
      <svg class="app-progress__circle" viewBox="0 0 44 44" aria-hidden="true">
        <circle class="app-progress__circle-track" cx="22" cy="22" r="18" pathLength="100" />
        <circle
          class="app-progress__circle-value"
          cx="22"
          cy="22"
          r="18"
          pathLength="100"
          :style="indeterminate ? undefined : { strokeDashoffset: 100 - percentage }"
        />
      </svg>
      <span v-if="showValue && !indeterminate" class="app-progress__circle-label">{{ Math.round(percentage) }}%</span>
    </template>
  </div>
</template>
