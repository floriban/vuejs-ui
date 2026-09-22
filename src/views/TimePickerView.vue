<script setup lang="ts">
import { ref } from 'vue'
import DocsCodeBlock from '../components/docs/DocsCodeBlock.vue'
import DocsPageHeader from '../components/docs/DocsPageHeader.vue'
import DocsApiReference from '../components/docs/DocsApiReference.vue'
import AppCard from '../components/ui/AppCard.vue'
import AppField from '../components/ui/AppField.vue'
import AppTimePicker from '../components/ui/AppTimePicker.vue'
const time = ref('14:30')
const min = ref('08:00')
const max = ref('18:00')
const step = ref(900)
const hourFormat = ref<'24h' | '12h'>('12h')
const code = `<AppTimePicker v-model="time" hour-format="12h" min="08:00" max="18:00" :step="900" />`
const properties = [
  ['v-model', 'string', "''", 'Hora canónica en formato HH:mm, incluso cuando se muestra AM/PM.'],
  ['min', 'string', '—', 'Hora mínima permitida.'],
  ['max', 'string', '—', 'Hora máxima permitida.'],
  ['step', 'number', '60', 'Intervalo en segundos convertido a minutos.'],
  ['hourFormat', '24h | 12h', '24h', 'Muestra reloj de 24 horas o selector AM/PM.'],
  ['size', 'sm | md | lg', 'md', 'Tamaño del control.'],
  ['disabled', 'boolean', 'false', 'Deshabilita la selección.'],
  ['required', 'boolean', 'false', 'Marca el campo como obligatorio.'],
  ['invalid', 'boolean', 'false', 'Expone el estado inválido.'],
  ['disableMobile', 'boolean', 'true', 'Mantiene Flatpickr también en dispositivos móviles.'],
] as const
</script>
<template>
  <DocsPageHeader eyebrow="Integraciones / Flatpickr" title="TimePicker" description="Selector de hora con rango, intervalos y formatos de 24 horas o AM/PM." />
  <section class="component-section"><div class="section-heading"><div><span>01</span><h2>Formatos de hora</h2></div><p>La vista puede cambiar sin modificar el valor interno.</p></div><div class="docs-form-component-grid"><AppCard title="Formato AM/PM"><AppField label="Hora" for-id="time-basic-12" help="El modelo se conserva como 14:30"><AppTimePicker id="time-basic-12" v-model="time" :min="min" :max="max" :step="step" hour-format="12h" /></AppField></AppCard><AppCard title="Formato 24 horas"><AppField label="Hora" for-id="time-basic-24"><AppTimePicker id="time-basic-24" v-model="time" :min="min" :max="max" :step="step" hour-format="24h" /></AppField></AppCard></div><DocsCodeBlock :code="code" /></section>
  <section class="component-section"><div class="section-heading"><div><span>02</span><h2>Prueba interactiva</h2></div><p>Configura formato, rango e intervalo.</p></div><div class="showcase-panel form-showcase"><AppField label="Hora" for-id="time-demo"><AppTimePicker id="time-demo" v-model="time" :min="min" :max="max" :step="step" :hour-format="hourFormat" /></AppField><AppField label="Formato"><select id="time-format" v-model="hourFormat" class="app-control app-control--md"><option value="24h">24 horas</option><option value="12h">12 horas (AM/PM)</option></select></AppField><AppField label="Intervalo"><select v-model.number="step" class="app-control app-control--md"><option :value="60">1 minuto</option><option :value="300">5 minutos</option><option :value="900">15 minutos</option><option :value="1800">30 minutos</option></select></AppField><AppField label="Desde" for-id="time-min"><AppTimePicker id="time-min" v-model="min" /></AppField><AppField label="Hasta" for-id="time-max"><AppTimePicker id="time-max" v-model="max" /></AppField></div></section>
  <DocsApiReference component-name="AppTimePicker" :rows="properties" note="El formato de visualización puede cambiar entre 24 horas y AM/PM sin alterar el valor HH:mm del modelo." />
</template>
