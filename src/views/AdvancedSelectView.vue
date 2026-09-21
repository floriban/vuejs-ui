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
const single = ref<string | string[]>('vue')
const multiple = ref<string | string[]>(['vue', 'typescript', 'vite', 'tailwind'])
const demoValue = ref<string | string[]>(['vue', 'typescript', 'vite', 'tailwind'])
const isMultiple = ref(true)
const clearable = ref(true)
const variant = ref<'compact' | 'expanded'>('compact')
function resetDemo() { demoValue.value = isMultiple.value ? ['vue', 'typescript', 'vite', 'tailwind'] : 'vue' }
const code = `<AppAdvancedSelect v-model="skills" :options="options" multiple clearable variant="expanded" />`
const properties = [
  ['v-model', 'string | string[]', "''", 'Valor simple o lista de valores seleccionados.'],
  ['options', 'AdvancedSelectOption[]', 'requerido', 'Opciones con etiqueta, valor y descripción.'],
  ['placeholder', 'string', 'Selecciona una opción', 'Texto sin selección.'],
  ['searchPlaceholder', 'string', 'Buscar...', 'Ayuda del buscador interno.'],
  ['multiple', 'boolean', 'false', 'Activa la selección múltiple.'],
  ['clearable', 'boolean', 'false', 'Muestra un botón que elimina toda la selección.'],
  ['variant', 'compact | expanded', 'compact', 'Resume etiquetas después de dos o muestra todas.'],
  ['disabled', 'boolean', 'false', 'Deshabilita el selector.'],
  ['required', 'boolean', 'false', 'Comunica que el selector es obligatorio.'],
  ['invalid', 'boolean', 'false', 'Expone el estado inválido a tecnologías de asistencia.'],
  ['describedBy', 'string', 'undefined', 'Asocia mensajes de ayuda o error mediante su id.'],
  ['size', 'sm | md | lg', 'md', 'Tamaño del control.'],
] as const
</script>
<template>
  <DocsPageHeader eyebrow="Formularios / Select avanzado" title="Select avanzado" description="Selector Vue con búsqueda, opciones enriquecidas, selección múltiple y limpieza." />
  <section class="component-section"><div class="section-heading"><div><span>01</span><h2>Compacto y ampliado</h2></div><p>Resume la selección o muestra todas las etiquetas.</p></div><div class="docs-form-component-grid"><AppCard title="Variante compacta" subtitle="Muestra dos etiquetas y resume las demás"><AppField label="Tecnologías" for-id="advanced-select-compact"><AppAdvancedSelect id="advanced-select-compact" v-model="multiple" :options="options" multiple clearable variant="compact" /></AppField></AppCard><AppCard title="Variante ampliada" subtitle="El control crece para mostrar toda la selección"><AppField label="Tecnologías" for-id="advanced-select-expanded"><AppAdvancedSelect id="advanced-select-expanded" v-model="multiple" :options="options" multiple clearable variant="expanded" /></AppField></AppCard><AppCard title="Selección simple"><AppField label="Tecnología" for-id="advanced-select-single"><AppAdvancedSelect id="advanced-select-single" v-model="single" :options="options" clearable /></AppField></AppCard></div><DocsCodeBlock :code="code" /></section>
  <section class="component-section"><div class="section-heading"><div><span>02</span><h2>Prueba interactiva</h2></div><p>Alterna el modo, presentación y botón para limpiar.</p></div><div class="showcase-panel docs-component-controls"><div class="form-showcase"><AppField label="Modo"><select v-model="isMultiple" class="app-control app-control--md" @change="resetDemo"><option :value="false">Simple</option><option :value="true">Múltiple</option></select></AppField><AppField label="Presentación"><select v-model="variant" class="app-control app-control--md"><option value="compact">Compacta</option><option value="expanded">Ampliada</option></select></AppField><AppField label="Botón para limpiar" help="Elimina toda la selección con una sola acción."><select v-model="clearable" class="app-control app-control--md"><option :value="true">Mostrar</option><option :value="false">Ocultar</option></select></AppField></div><AppField label="Tecnologías" for-id="advanced-select-demo"><AppAdvancedSelect id="advanced-select-demo" v-model="demoValue" :options="options" :multiple="isMultiple" :clearable="clearable" :variant="variant" /></AppField><div class="docs-value-preview">Modelo: <strong>{{ JSON.stringify(demoValue) }}</strong></div></div></section>
  <DocsApiReference component-name="AppAdvancedSelect" :rows="properties" note="Emite clear cuando se elimina toda la selección. El menú se teletransporta al body y ajusta su dirección según el espacio visible." />
</template>
