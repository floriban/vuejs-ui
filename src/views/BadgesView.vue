<script setup lang="ts">
import { ref } from 'vue'
import { Check, Star } from '@lucide/vue'
import DocsCodeBlock from '../components/docs/DocsCodeBlock.vue'
import DocsPageHeader from '../components/docs/DocsPageHeader.vue'
import AppBadge from '../components/ui/AppBadge.vue'
import AppButton from '../components/ui/AppButton.vue'
import AppCard from '../components/ui/AppCard.vue'
import AppCheckbox from '../components/ui/AppCheckbox.vue'
import AppField from '../components/ui/AppField.vue'
import AppTable from '../components/ui/AppTable.vue'
import { badgeExamples } from '../docs/badgeExamples'

type BadgeColor = NonNullable<InstanceType<typeof AppBadge>['$props']['color']>
type BadgeVariant = NonNullable<InstanceType<typeof AppBadge>['$props']['variant']>
type BadgeSize = NonNullable<InstanceType<typeof AppBadge>['$props']['size']>

const colors: BadgeColor[] = ['primary', 'neutral', 'info', 'success', 'warning', 'danger']
const color = ref<BadgeColor>('primary')
const variant = ref<BadgeVariant>('soft')
const size = ref<BadgeSize>('md')
const rounded = ref(false)
const dot = ref(false)
const closable = ref(false)
const badgeKey = ref(0)

const properties = [
  ['color', 'primary | neutral | info | success | warning | danger', 'primary', 'Color semántico.'],
  ['variant', 'soft | solid | outline', 'soft', 'Nivel de énfasis visual.'],
  ['size', 'sm | md | lg', 'md', 'Altura y tipografía.'],
  ['rounded', 'boolean', 'false', 'Usa bordes completamente redondeados.'],
  ['dot', 'boolean', 'false', 'Muestra un punto de estado antes del texto.'],
  ['icon', 'Component', 'undefined', 'Icono Lucide opcional.'],
  ['closable', 'boolean', 'false', 'Añade una acción para quitar el badge.'],
]
</script>

<template>
  <DocsPageHeader eyebrow="Componentes / Badge" title="Badges"
    description="Etiquetas compactas para estados, categorías, contadores y filtros." />

  <section class="component-section">
    <div class="section-heading"><div><span>01</span><h2>Colores semánticos</h2></div><p>Comunican estado con una superficie ligera.</p></div>
    <AppCard title="Estados">
      <div class="component-row"><AppBadge v-for="item in colors" :key="item" :color="item">{{ item }}</AppBadge></div>
    </AppCard>
    <DocsCodeBlock :code="badgeExamples.colors" />
  </section>

  <section class="component-section">
    <div class="section-heading"><div><span>02</span><h2>Variantes y contenido</h2></div><p>Soft, solid, outline, iconos, puntos y cierre.</p></div>
    <div class="card-grid">
      <AppCard title="Énfasis">
        <div class="component-row">
          <AppBadge variant="soft">Soft</AppBadge><AppBadge variant="solid">Solid</AppBadge>
          <AppBadge variant="outline">Outline</AppBadge>
        </div>
      </AppCard>
      <AppCard title="Contenido">
        <div class="component-row">
          <AppBadge dot color="success" rounded>En línea</AppBadge>
          <AppBadge :icon="Star" color="warning">Favorito</AppBadge>
          <AppBadge :icon="Check" color="info" closable close-label="Quitar filtro verificado">Verificado</AppBadge>
        </div>
      </AppCard>
    </div>
    <DocsCodeBlock :code="badgeExamples.content" />
  </section>

  <section class="component-section">
    <div class="section-heading"><div><span>03</span><h2>Prueba interactiva</h2></div><p>Configura apariencia, tamaño y contenido auxiliar.</p></div>
    <div class="showcase-panel docs-badge-controls">
      <div class="form-showcase">
        <AppField label="Color" for-id="badge-color"><select id="badge-color" v-model="color" class="app-control app-control--md"><option v-for="item in colors" :key="item">{{ item }}</option></select></AppField>
        <AppField label="Variante" for-id="badge-variant"><select id="badge-variant" v-model="variant" class="app-control app-control--md"><option>soft</option><option>solid</option><option>outline</option></select></AppField>
        <AppField label="Tamaño" for-id="badge-size"><select id="badge-size" v-model="size" class="app-control app-control--md"><option>sm</option><option>md</option><option>lg</option></select></AppField>
      </div>
      <div class="component-row">
        <AppCheckbox v-model="rounded" label="Redondeado" /><AppCheckbox v-model="dot" label="Mostrar punto" />
        <AppCheckbox v-model="closable" label="Permitir cierre" />
      </div>
      <div class="component-row"><AppBadge :key="badgeKey" :color="color" :variant="variant" :size="size" :rounded="rounded" :dot="dot" :closable="closable">Vista previa</AppBadge><AppButton size="sm" variant="ghost" color="neutral" @click="badgeKey++">Restablecer badge</AppButton></div>
    </div>
    <DocsCodeBlock :code="badgeExamples.interactive" />
  </section>

  <section class="component-section">
    <div class="section-heading"><div><span>04</span><h2>Referencia de AppBadge</h2></div><p>Propiedades y evento de cierre.</p></div>
    <AppCard title="API del componente"><AppTable label="Propiedades de AppBadge" compact>
      <thead><tr><th>Propiedad</th><th>Tipo</th><th>Por defecto</th><th>Descripción</th></tr></thead>
      <tbody><tr v-for="item in properties" :key="item[0]"><td><code>{{ item[0] }}</code></td><td><code>{{ item[1] }}</code></td><td><code>{{ item[2] }}</code></td><td>{{ item[3] }}</td></tr></tbody>
    </AppTable><p class="docs-reference-note">El slot por defecto contiene la etiqueta y el evento <code>close</code> se emite antes de ocultar el badge.</p></AppCard>
  </section>
</template>
