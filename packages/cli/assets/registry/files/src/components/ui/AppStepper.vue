<script setup lang="ts">
import { computed } from 'vue'
import { Check, X } from '@lucide/vue'

export interface StepperItem {
  id: string | number
  label: string
  description?: string
  status?: 'pending' | 'active' | 'completed' | 'error'
  disabled?: boolean
}

const props = withDefaults(defineProps<{
  steps: StepperItem[]
  orientation?: 'horizontal' | 'vertical'
  clickable?: boolean
  label?: string
}>(), { orientation: 'horizontal', clickable: false, label: 'Progreso por pasos' })
const emit = defineEmits<{ select: [step: StepperItem, index: number] }>()
const model = defineModel<number>({ default: 1 })

const normalizedSteps = computed(() => props.steps.map((step, index) => ({
  ...step,
  status: step.status ?? (index + 1 < model.value ? 'completed' : index + 1 === model.value ? 'active' : 'pending'),
})))

function selectStep(step: StepperItem, index: number) {
  if (!props.clickable || step.disabled) return
  model.value = index + 1
  emit('select', step, index)
}
</script>

<template>
  <ol class="app-stepper" :class="`app-stepper--${orientation}`" :aria-label="label">
    <li v-for="(step, index) in normalizedSteps" :key="step.id" class="app-stepper__item" :class="[`app-stepper__item--${step.status}`, { 'is-disabled': step.disabled }]">
      <button type="button" :disabled="!clickable || step.disabled" :aria-current="step.status === 'active' ? 'step' : undefined" @click="selectStep(step, index)">
        <span class="app-stepper__marker" aria-hidden="true"><Check v-if="step.status === 'completed'" :size="16" /><X v-else-if="step.status === 'error'" :size="16" /><span v-else>{{ index + 1 }}</span></span>
        <span class="app-stepper__content"><strong>{{ step.label }}</strong><small v-if="step.description">{{ step.description }}</small></span>
      </button>
    </li>
  </ol>
</template>