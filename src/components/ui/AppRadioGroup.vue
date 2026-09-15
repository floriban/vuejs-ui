<script setup lang="ts">
import { useId } from 'vue'

export interface RadioOption {
  label: string
  value: string
  description?: string
  disabled?: boolean
}

const props = withDefaults(
  defineProps<{
    legend?: string
    name?: string
    options: RadioOption[]
    orientation?: 'horizontal' | 'vertical'
    disabled?: boolean
  }>(),
  { orientation: 'vertical', disabled: false },
)

const model = defineModel<string>({ default: '' })
const generatedName = useId()
</script>

<template>
  <fieldset class="app-radio-fieldset" :disabled="disabled">
    <legend v-if="legend" class="app-field__label">{{ legend }}</legend>
    <div class="app-radio-group" :class="`app-radio-group--${orientation}`">
      <label
        v-for="option in options"
        :key="option.value"
        class="app-radio"
        :class="{ 'app-choice--disabled': disabled || option.disabled }"
      >
        <input
          v-model="model"
          type="radio"
          :name="props.name ?? generatedName"
          :value="option.value"
          :disabled="disabled || option.disabled"
        />
        <span class="app-radio__control" aria-hidden="true"></span>
        <span class="app-radio__content">
          <strong>{{ option.label }}</strong>
          <small v-if="option.description">{{ option.description }}</small>
        </span>
      </label>
    </div>
  </fieldset>
</template>
