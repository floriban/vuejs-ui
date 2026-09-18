<script setup lang="ts">
import { ref } from 'vue'
import DocsCodeBlock from '../components/docs/DocsCodeBlock.vue'
import DocsPageHeader from '../components/docs/DocsPageHeader.vue'
import DocsApiReference from '../components/docs/DocsApiReference.vue'
import AppCard from '../components/ui/AppCard.vue'
import AppField from '../components/ui/AppField.vue'
import AppTimePicker from '../components/ui/AppTimePicker.vue'
const time = ref('14:30'); const min = ref('08:00'); const max = ref('18:00'); const step = ref(900)
const code = `<AppTimePicker v-model="time" min="08:00" max="18:00" :step="900" />`
const properties = [
  ['v-model', 'string', "''", 'Hora seleccionada en formato HH:mm.'],
  ['min', 'string', '—', 'Hora mínima permitida.'],
  ['max', 'string', '—', 'Hora máxima permitida.'],
  ['step', 'number', '60', 'Intervalo en segundos convertido a minutos.'],
  ['size', 'sm | md | lg', 'md', 'Tamaño del control.'],
  ['disabled', 'boolean', 'false', 'Deshabilita la selección.'],
  ['required', 'boolean', 'false', 'Marca el campo como obligatorio.'],
  ['invalid', 'boolean', 'false', 'Expone el estado inválido.'],
  ['disableMobile', 'boolean', 'true', 'Mantiene Flatpickr también en dispositivos móviles.'],
] as const
</script>
<template>
  <DocsPageHeader eyebrow="Formularios / TimePicker" title="TimePicker" description="Selector de hora con rango permitido e intervalos configurables." />
  <section class="component-section"><div class="section-heading"><div><span>01</span><h2>Uso básico</h2></div><p>Ideal para horarios, reservas y recordatorios.</p></div><AppCard title="Horario de reunión"><div class="narrow-showcase"><AppField label="Hora" for-id="time-basic" help="Atención de 08:00 a 18:00"><AppTimePicker id="time-basic" v-model="time" :min="min" :max="max" :step="step" /></AppField><div class="docs-value-preview">Hora seleccionada: <strong>{{ time || 'Sin hora' }}</strong></div></div></AppCard><DocsCodeBlock :code="code" /></section>
  <section class="component-section"><div class="section-heading"><div><span>02</span><h2>Prueba interactiva</h2></div><p>Configura rango e intervalo.</p></div><div class="showcase-panel form-showcase"><AppField label="Hora" for-id="time-demo"><AppTimePicker id="time-demo" v-model="time" :min="min" :max="max" :step="step" /></AppField><AppField label="Intervalo"><select v-model.number="step" class="app-control app-control--md"><option :value="60">1 minuto</option><option :value="300">5 minutos</option><option :value="900">15 minutos</option><option :value="1800">30 minutos</option></select></AppField><AppField label="Desde" for-id="time-min"><AppTimePicker id="time-min" v-model="min" /></AppField><AppField label="Hasta" for-id="time-max"><AppTimePicker id="time-max" v-model="max" /></AppField></div></section>
  <DocsApiReference component-name="AppTimePicker" :rows="properties" note="La interfaz utiliza reloj de 24 horas y localización española." />
</template>
