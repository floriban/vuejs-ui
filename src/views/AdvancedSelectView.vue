<script setup lang="ts">
import { ref } from 'vue'
import DocsCodeBlock from '../components/docs/DocsCodeBlock.vue'
import DocsPageHeader from '../components/docs/DocsPageHeader.vue'
import DocsApiReference from '../components/docs/DocsApiReference.vue'
import AppAdvancedSelect, { type AdvancedSelectOption } from '../components/ui/AppAdvancedSelect.vue'
import AppCard from '../components/ui/AppCard.vue'
import AppField from '../components/ui/AppField.vue'
const options: AdvancedSelectOption[] = [
  { label: 'Vue.js', value: 'vue', description: 'Framework progresivo' }, { label: 'TypeScript', value: 'typescript', description: 'Tipado estático' }, { label: 'Vite', value: 'vite', description: 'Herramienta de compilación' }, { label: 'Tailwind CSS', value: 'tailwind', description: 'Utilidades CSS' }, { label: 'Pinia', value: 'pinia', description: 'Estado global' }, { label: 'Nuxt', value: 'nuxt', description: 'Framework full stack' }, { label: 'jQuery', value: 'jquery', description: 'Opción deshabilitada', disabled: true },
]
const single = ref<string | string[]>('vue'); const multiple = ref<string | string[]>(['vue', 'typescript']); const demoValue = ref<string | string[]>([]); const isMultiple = ref(true); const clearable = ref(true)
const code = `<AppAdvancedSelect v-model="skills" :options="options" multiple clearable />`
const properties = [
  ['v-model', 'string | string[]', "''", 'Valor simple o lista de valores seleccionados.'],
  ['options', 'AdvancedSelectOption[]', 'requerido', 'Opciones con etiqueta, valor y descripción.'],
  ['placeholder', 'string', 'Selecciona una opción', 'Texto sin selección.'],
  ['searchPlaceholder', 'string', 'Buscar...', 'Ayuda del buscador interno.'],
  ['multiple', 'boolean', 'false', 'Activa la selección múltiple.'],
  ['clearable', 'boolean', 'false', 'Muestra la acción para limpiar.'],
  ['disabled', 'boolean', 'false', 'Deshabilita el selector.'],
  ['size', 'sm | md | lg', 'md', 'Tamaño del control.'],
] as const
</script>
<template>
  <DocsPageHeader eyebrow="Formularios / Select avanzado" title="Select2" description="Selector Vue con búsqueda, opciones enriquecidas, selección múltiple y limpieza." />
  <section class="component-section"><div class="section-heading"><div><span>01</span><h2>Simple y múltiple</h2></div><p>Una alternativa Vue al patrón visual de Select2.</p></div><div class="docs-form-component-grid"><AppCard title="Selección simple"><AppField label="Tecnología" for-id="select2-single"><AppAdvancedSelect id="select2-single" v-model="single" :options="options" clearable /></AppField></AppCard><AppCard title="Selección múltiple"><AppField label="Tecnologías" for-id="select2-multiple"><AppAdvancedSelect id="select2-multiple" v-model="multiple" :options="options" multiple clearable /></AppField></AppCard></div><DocsCodeBlock :code="code" /></section>
  <section class="component-section"><div class="section-heading"><div><span>02</span><h2>Prueba interactiva</h2></div><p>Alterna el modo y la limpieza.</p></div><div class="showcase-panel docs-component-controls"><div class="form-showcase"><AppField label="Modo"><select v-model="isMultiple" class="app-control app-control--md" @change="demoValue = isMultiple ? [] : ''"><option :value="false">Simple</option><option :value="true">Múltiple</option></select></AppField><AppField label="Limpieza"><select v-model="clearable" class="app-control app-control--md"><option :value="true">Visible</option><option :value="false">Oculta</option></select></AppField></div><AppField label="Tecnologías" for-id="select2-demo"><AppAdvancedSelect id="select2-demo" v-model="demoValue" :options="options" :multiple="isMultiple" :clearable="clearable" /></AppField><div class="docs-value-preview">Modelo: <strong>{{ JSON.stringify(demoValue) }}</strong></div></div></section>
  <DocsApiReference component-name="AppAdvancedSelect" :rows="properties" note="El menú se teletransporta al body para evitar recortes y ajusta su dirección según el espacio visible." />
</template>
