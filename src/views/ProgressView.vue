<script setup lang="ts">
import { ref } from 'vue'
import DocsCodeBlock from '../components/docs/DocsCodeBlock.vue'
import DocsPageHeader from '../components/docs/DocsPageHeader.vue'
import AppCard from '../components/ui/AppCard.vue'
import AppCheckbox from '../components/ui/AppCheckbox.vue'
import AppField from '../components/ui/AppField.vue'
import AppProgress from '../components/ui/AppProgress.vue'
import AppTable from '../components/ui/AppTable.vue'
import { progressExamples } from '../docs/progressExamples'

type ProgressColor = NonNullable<InstanceType<typeof AppProgress>['$props']['color']>
type ProgressSize = NonNullable<InstanceType<typeof AppProgress>['$props']['size']>
type ProgressType = NonNullable<InstanceType<typeof AppProgress>['$props']['type']>

const value = ref(64)
const color = ref<ProgressColor>('primary')
const size = ref<ProgressSize>('md')
const type = ref<ProgressType>('linear')
const striped = ref(false)
const animated = ref(false)
const showValue = ref(true)
const indeterminate = ref(false)

const properties = [
  ['value', 'number', '0', 'Valor actual.'],
  ['max', 'number', '100', 'Valor máximo usado para calcular el porcentaje.'],
  ['label', 'string', 'requerido', 'Nombre accesible del progreso.'],
  ['color', 'color semántico', 'primary', 'Color del indicador.'],
  ['size', 'sm | md | lg', 'md', 'Grosor lineal o diámetro circular.'],
  ['type', 'linear | circular', 'linear', 'Representación visual.'],
  ['striped', 'boolean', 'false', 'Añade franjas al progreso lineal.'],
  ['animated', 'boolean', 'false', 'Anima las franjas.'],
  ['showValue', 'boolean', 'false', 'Muestra el porcentaje calculado.'],
  ['indeterminate', 'boolean', 'false', 'Representa una tarea sin porcentaje conocido.'],
]
</script>

<template>
  <DocsPageHeader eyebrow="Componentes / Progress" title="Progress"
    description="Indicadores lineales y circulares para tareas con porcentaje conocido o indeterminado." />

  <section class="component-section">
    <div class="section-heading"><div><span>01</span><h2>Colores y tamaños</h2></div><p>Progreso semántico en tres densidades.</p></div>
    <AppCard title="Indicadores lineales"><div class="progress-demo-list">
      <AppProgress :value="28" label="Carga pequeña" size="sm" color="info" />
      <AppProgress :value="56" label="Carga media" show-value />
      <AppProgress :value="82" label="Carga grande" size="lg" color="success" show-value />
      <AppProgress :value="36" label="Carga con advertencia" color="warning" />
      <AppProgress :value="18" label="Carga con error" color="danger" />
    </div></AppCard>
    <DocsCodeBlock :code="progressExamples.colors" />
  </section>

  <section class="component-section">
    <div class="section-heading"><div><span>02</span><h2>Franjas e indeterminado</h2></div><p>Movimiento para tareas activas y duración desconocida.</p></div>
    <AppCard title="Procesos activos"><div class="progress-demo-list">
      <AppProgress :value="68" label="Carga animada" striped animated show-value />
      <AppProgress label="Procesando archivos" color="info" indeterminate />
    </div></AppCard>
    <DocsCodeBlock :code="progressExamples.styles" />
  </section>

  <section class="component-section">
    <div class="section-heading"><div><span>03</span><h2>Progreso circular</h2></div><p>Alternativa compacta para métricas individuales.</p></div>
    <AppCard title="Resumen">
      <div class="component-row docs-progress-circles">
        <AppProgress type="circular" :value="32" label="32 por ciento" size="sm" show-value />
        <AppProgress type="circular" :value="68" label="68 por ciento" color="info" show-value />
        <AppProgress type="circular" :value="91" label="91 por ciento" size="lg" color="success" show-value />
        <AppProgress type="circular" label="Sin porcentaje" color="warning" indeterminate />
      </div>
    </AppCard>
    <DocsCodeBlock :code="progressExamples.circular" />
  </section>

  <section class="component-section">
    <div class="section-heading"><div><span>04</span><h2>Prueba interactiva</h2></div><p>Modifica el porcentaje y la presentación.</p></div>
    <div class="showcase-panel docs-progress-controls">
      <div class="form-showcase">
        <AppField label="Valor" for-id="progress-value"><input id="progress-value" v-model.number="value" class="app-control app-control--md" type="range" min="0" max="100" /></AppField>
        <AppField label="Color" for-id="progress-color"><select id="progress-color" v-model="color" class="app-control app-control--md"><option>primary</option><option>neutral</option><option>info</option><option>success</option><option>warning</option><option>danger</option></select></AppField>
        <AppField label="Tamaño" for-id="progress-size"><select id="progress-size" v-model="size" class="app-control app-control--md"><option>sm</option><option>md</option><option>lg</option></select></AppField>
        <AppField label="Tipo" for-id="progress-type"><select id="progress-type" v-model="type" class="app-control app-control--md"><option>linear</option><option>circular</option></select></AppField>
      </div>
      <div class="component-row"><AppCheckbox v-model="striped" label="Franjas" /><AppCheckbox v-model="animated" label="Animado" /><AppCheckbox v-model="showValue" label="Mostrar valor" /><AppCheckbox v-model="indeterminate" label="Indeterminado" /></div>
      <AppProgress :value="value" :color="color" :size="size" :type="type" :striped="striped" :animated="animated" :show-value="showValue" :indeterminate="indeterminate" label="Vista previa del progreso" />
    </div>
    <DocsCodeBlock :code="progressExamples.interactive" />
  </section>

  <section class="component-section">
    <div class="section-heading"><div><span>05</span><h2>Referencia de AppProgress</h2></div><p>Propiedades y semántica del indicador.</p></div>
    <AppCard title="API del componente"><AppTable label="Propiedades de AppProgress" compact>
      <thead><tr><th>Propiedad</th><th>Tipo</th><th>Por defecto</th><th>Descripción</th></tr></thead>
      <tbody><tr v-for="item in properties" :key="item[0]"><td><code>{{ item[0] }}</code></td><td><code>{{ item[1] }}</code></td><td><code>{{ item[2] }}</code></td><td>{{ item[3] }}</td></tr></tbody>
    </AppTable><p class="docs-reference-note">El componente expone <code>role="progressbar"</code>. En modo indeterminado omite los valores numéricos y anuncia «En progreso».</p></AppCard>
  </section>
</template>
