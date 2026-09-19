<script setup lang="ts">
import { ref } from 'vue'
import DocsApiReference from '../components/docs/DocsApiReference.vue'
import DocsCodeBlock from '../components/docs/DocsCodeBlock.vue'
import DocsPageHeader from '../components/docs/DocsPageHeader.vue'
import AppCard from '../components/ui/AppCard.vue'
import AppCheckbox from '../components/ui/AppCheckbox.vue'
import AppField from '../components/ui/AppField.vue'
import AppStepper, { type StepperItem } from '../components/ui/AppStepper.vue'

const steps: StepperItem[] = [
  { id: 'account', label: 'Cuenta', description: 'Datos de acceso' },
  { id: 'profile', label: 'Perfil', description: 'Información personal' },
  { id: 'plan', label: 'Plan', description: 'Preferencias' },
  { id: 'confirm', label: 'Confirmación', description: 'Revisar y guardar' },
]
const errorSteps: StepperItem[] = steps.map((step, index) => index === 1 ? { ...step, status: 'error' } : step)
const current = ref(2)
const orientation = ref<'horizontal' | 'vertical'>('horizontal')
const clickable = ref(true)
const code = `<AppStepper v-model="currentStep" :steps="steps" clickable />`
const properties = [
  ['v-model', 'number', '1', 'Paso activo usando numeración desde 1.'],
  ['steps', 'StepperItem[]', 'requerido', 'Pasos, descripciones y estados opcionales.'],
  ['orientation', 'horizontal | vertical', 'horizontal', 'Dirección del flujo.'],
  ['clickable', 'boolean', 'false', 'Permite cambiar de paso pulsando el indicador.'],
  ['label', 'string', 'Progreso por pasos', 'Nombre accesible de la secuencia.'],
] as const
</script>

<template>
  <DocsPageHeader eyebrow="Navegación / Stepper" title="Stepper" description="Representa procesos secuenciales con pasos activos, completados, pendientes o con error." />
  <section class="component-section"><div class="section-heading"><div><span>01</span><h2>Estados y orientación</h2></div><p>Flujos horizontales, verticales y validación.</p></div><div class="docs-form-component-grid"><AppCard title="Proceso horizontal"><AppStepper :steps="steps" :model-value="3" /></AppCard><AppCard title="Estado de error"><AppStepper :steps="errorSteps" :model-value="2" orientation="vertical" /></AppCard></div><DocsCodeBlock :code="code" /></section>
  <section class="component-section"><div class="section-heading"><div><span>02</span><h2>Prueba interactiva</h2></div><p>Navega entre pasos y cambia la orientación.</p></div><div class="showcase-panel docs-component-controls"><div class="form-showcase"><AppField label="Paso activo"><input id="stepper-current" v-model.number="current" class="app-control app-control--md" type="range" min="1" :max="steps.length" /></AppField><AppField label="Orientación"><select id="stepper-orientation" v-model="orientation" class="app-control app-control--md"><option>horizontal</option><option>vertical</option></select></AppField></div><AppCheckbox v-model="clickable" label="Permitir navegación directa" /><div class="docs-component-preview"><AppStepper v-model="current" :steps="steps" :orientation="orientation" :clickable="clickable" /></div><div class="docs-value-preview">Paso actual: <strong>{{ current }} · {{ steps[current - 1]?.label }}</strong></div></div></section>
  <DocsApiReference component-name="AppStepper" :rows="properties" note="Emite select al activar un paso navegable y utiliza aria-current=step para el paso activo." />
</template>