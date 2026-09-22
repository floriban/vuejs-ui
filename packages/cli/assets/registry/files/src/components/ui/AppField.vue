<script setup lang="ts">
import { computed, useId } from 'vue'

const props = defineProps<{
  label: string
  forId?: string
  help?: string
  error?: string
  required?: boolean
}>()

const generatedId = useId()
const messageId = computed(() => `${props.forId ?? generatedId}-message`)
const describedBy = computed(() => (props.error || props.help ? messageId.value : undefined))
</script>

<template>
  <div class="app-field" :class="{ 'app-field--invalid': error }">
    <label class="app-field__label" :for="forId">
      {{ label }}
      <span v-if="required" class="app-field__required" aria-hidden="true">*</span>
    </label>
    <slot :described-by="describedBy" :invalid="Boolean(error)" />
    <p v-if="error" :id="messageId" class="app-field__message app-field__message--error">{{ error }}</p>
    <p v-else-if="help" :id="messageId" class="app-field__message">{{ help }}</p>
  </div>
</template>
