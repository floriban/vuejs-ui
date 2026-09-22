<script setup lang="ts">
import { computed, ref } from 'vue'
import DocsCodeBlock from '../components/docs/DocsCodeBlock.vue'
import DocsPageHeader from '../components/docs/DocsPageHeader.vue'
import DocsApiReference from '../components/docs/DocsApiReference.vue'
import AppCard from '../components/ui/AppCard.vue'
import AppDatePicker from '../components/ui/AppDatePicker.vue'
import AppField from '../components/ui/AppField.vue'
const date = ref('2026-09-17'); const min = ref('2026-09-01'); const max = ref('2026-12-31'); const required = ref(false)
const readable = computed(() => date.value ? new Intl.DateTimeFormat('es-PE', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${date.value}T00:00:00Z`)) : 'Sin fecha')
const code = `<AppDatePicker v-model="date" min="2026-09-01" max="2026-12-31" />`
const properties = [
  ['v-model', 'string', "''", 'Fecha seleccionada en formato YYYY-MM-DD.'],
  ['min', 'string', '—', 'Primera fecha seleccionable.'],
  ['max', 'string', '—', 'Última fecha seleccionable.'],
  ['size', 'sm | md | lg', 'md', 'Tamaño del control.'],
  ['disabled', 'boolean', 'false', 'Deshabilita la selección.'],
  ['required', 'boolean', 'false', 'Marca el campo como obligatorio.'],
  ['invalid', 'boolean', 'false', 'Expone el estado inválido.'],
  ['disableMobile', 'boolean', 'true', 'Mantiene Flatpickr también en dispositivos móviles.'],
] as const
</script>
<template>
  <DocsPageHeader eyebrow="Integraciones / Flatpickr" title="DatePicker" description="Selector de fecha accesible, compatible con límites y estados de formulario." />
  <section class="component-section"><div class="section-heading"><div><span>01</span><h2>Uso básico</h2></div><p>Calendario uniforme con localización española.</p></div><AppCard title="Programar entrega"><div class="narrow-showcase"><AppField label="Fecha de entrega" for-id="date-basic" help="Disponible desde septiembre"><AppDatePicker id="date-basic" v-model="date" :min="min" :max="max" /></AppField><div class="docs-value-preview">Fecha seleccionada: <strong>{{ readable }}</strong></div></div></AppCard><DocsCodeBlock :code="code" /></section>
  <section class="component-section"><div class="section-heading"><div><span>02</span><h2>Prueba interactiva</h2></div><p>Ajusta límites y valor.</p></div><div class="showcase-panel form-showcase"><AppField label="Fecha" for-id="date-demo" :required="required"><AppDatePicker id="date-demo" v-model="date" :min="min" :max="max" :required="required" /></AppField><AppField label="Fecha mínima" for-id="date-min"><AppDatePicker id="date-min" v-model="min" /></AppField><AppField label="Fecha máxima" for-id="date-max"><AppDatePicker id="date-max" v-model="max" /></AppField></div></section>
  <DocsApiReference component-name="AppDatePicker" :rows="properties" note="Flatpickr se localiza en español y el modelo conserva un formato estable para enviar al servidor." />
</template>
