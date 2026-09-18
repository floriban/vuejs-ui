<script setup lang="ts">
import { ref } from 'vue'
import { CircleHelp, Copy, Info, Settings } from '@lucide/vue'
import DocsCodeBlock from '../components/docs/DocsCodeBlock.vue'
import DocsPageHeader from '../components/docs/DocsPageHeader.vue'
import AppCard from '../components/ui/AppCard.vue'
import AppCheckbox from '../components/ui/AppCheckbox.vue'
import AppField from '../components/ui/AppField.vue'
import AppTable from '../components/ui/AppTable.vue'
import AppTooltip from '../components/ui/AppTooltip.vue'
import { tooltipExamples } from '../docs/tooltipExamples'

type Placement = NonNullable<InstanceType<typeof AppTooltip>['$props']['placement']>

const placement = ref<Placement>('top')
const delay = ref(250)
const disabled = ref(false)

const properties = [
  ['text', 'string', 'requerido', 'Contenido breve del tooltip.'],
  ['label', 'string', 'requerido', 'Texto del disparador o nombre accesible si solo contiene un icono.'],
  ['placement', 'top | bottom | left | right', 'top', 'Ubicación preferida con cambio automático.'],
  ['delay', 'number', '250', 'Espera antes de mostrar al hacer hover.'],
  ['offset', 'number', '9', 'Separación respecto del disparador.'],
  ['disabled', 'boolean', 'false', 'Deshabilita el disparador y el tooltip.'],
  ['iconOnly', 'boolean', 'false', 'Usa un botón cuadrado y label como nombre accesible.'],
]
</script>

<template>
  <DocsPageHeader eyebrow="Componentes / Tooltip" title="Tooltips"
    description="Ayuda breve asociada a controles mediante hover, foco y posicionamiento automático." />

  <section class="component-section">
    <div class="section-heading"><div><span>01</span><h2>Posiciones</h2></div><p>Arriba, derecha, abajo e izquierda.</p></div>
    <AppCard title="Ubicación preferida">
      <div class="component-row tooltip-placement-demo">
        <AppTooltip placement="top" label="Arriba" text="Tooltip en la parte superior">Arriba</AppTooltip>
        <AppTooltip placement="right" label="Derecha" text="Tooltip en el lado derecho">Derecha</AppTooltip>
        <AppTooltip placement="bottom" label="Abajo" text="Tooltip en la parte inferior">Abajo</AppTooltip>
        <AppTooltip placement="left" label="Izquierda" text="Tooltip en el lado izquierdo">Izquierda</AppTooltip>
      </div>
    </AppCard>
    <DocsCodeBlock :code="tooltipExamples.placements" />
  </section>

  <section class="component-section">
    <div class="section-heading"><div><span>02</span><h2>Botones con iconos</h2></div><p>Explican acciones compactas sin añadir texto permanente.</p></div>
    <AppCard title="Acciones">
      <div class="component-row">
        <AppTooltip icon-only label="Copiar enlace" text="Copiar enlace al portapapeles" trigger-variant="soft" trigger-color="primary"><Copy :size="18" aria-hidden="true" /></AppTooltip>
        <AppTooltip icon-only label="Información" text="Consulta los detalles del registro"><Info :size="18" aria-hidden="true" /></AppTooltip>
        <AppTooltip icon-only label="Configuración" text="Abrir la configuración avanzada"><Settings :size="18" aria-hidden="true" /></AppTooltip>
        <AppTooltip icon-only label="Ayuda" text="Este texto puede explicar una acción con más detalle"><CircleHelp :size="18" aria-hidden="true" /></AppTooltip>
      </div>
    </AppCard>
    <DocsCodeBlock :code="tooltipExamples.icons" />
  </section>

  <section class="component-section">
    <div class="section-heading"><div><span>03</span><h2>Prueba interactiva</h2></div><p>Configura la posición, espera y disponibilidad.</p></div>
    <div class="showcase-panel docs-tooltip-controls">
      <div class="form-showcase">
        <AppField label="Posición" for-id="tooltip-placement"><select id="tooltip-placement" v-model="placement" class="app-control app-control--md"><option>top</option><option>right</option><option>bottom</option><option>left</option></select></AppField>
        <AppField label="Espera" for-id="tooltip-delay"><select id="tooltip-delay" v-model.number="delay" class="app-control app-control--md"><option :value="0">Sin espera</option><option :value="250">250 ms</option><option :value="700">700 ms</option></select></AppField>
      </div>
      <AppCheckbox v-model="disabled" label="Deshabilitado" />
      <div><AppTooltip label="Probar tooltip" text="Vista previa del tooltip configurable" :placement="placement" :delay="delay" :disabled="disabled" trigger-color="primary">Probar tooltip</AppTooltip></div>
    </div>
    <DocsCodeBlock :code="tooltipExamples.interactive" />
  </section>

  <section class="component-section">
    <div class="section-heading"><div><span>04</span><h2>Referencia de AppTooltip</h2></div><p>Propiedades y comportamiento accesible.</p></div>
    <AppCard title="API del componente"><AppTable label="Propiedades de AppTooltip" compact>
      <thead><tr><th>Propiedad</th><th>Tipo</th><th>Por defecto</th><th>Descripción</th></tr></thead>
      <tbody><tr v-for="item in properties" :key="item[0]"><td><code>{{ item[0] }}</code></td><td><code>{{ item[1] }}</code></td><td><code>{{ item[2] }}</code></td><td>{{ item[3] }}</td></tr></tbody>
    </AppTable><p class="docs-reference-note">El tooltip usa <code>role="tooltip"</code>, se relaciona mediante <code>aria-describedby</code>, aparece con foco y se cierra con Escape.</p></AppCard>
  </section>
</template>
