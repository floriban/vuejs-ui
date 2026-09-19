<script setup lang="ts">
import { ref } from 'vue'
import DocsApiReference from '../components/docs/DocsApiReference.vue'
import DocsCodeBlock from '../components/docs/DocsCodeBlock.vue'
import DocsPageHeader from '../components/docs/DocsPageHeader.vue'
import AppCard from '../components/ui/AppCard.vue'
import AppCheckbox from '../components/ui/AppCheckbox.vue'
import AppField from '../components/ui/AppField.vue'
import AppSkeleton from '../components/ui/AppSkeleton.vue'

const variant = ref<'text' | 'rectangle' | 'circle'>('text')
const lines = ref(4)
const animated = ref(true)
const code = `<AppSkeleton variant="text" :lines="4" />\n<AppSkeleton variant="circle" :width="48" :height="48" />`
const properties = [
  ['variant', 'text | rectangle | circle', 'text', 'Forma visual del marcador.'],
  ['width', 'string | number', 'automático', 'Ancho CSS o valor en píxeles.'],
  ['height', 'string | number', 'automático', 'Alto CSS o valor en píxeles.'],
  ['lines', 'number', '1', 'Cantidad de líneas en la variante text.'],
  ['animated', 'boolean', 'true', 'Activa el efecto shimmer.'],
  ['label', 'string', 'Cargando contenido', 'Descripción accesible del estado.'],
] as const
</script>

<template>
  <DocsPageHeader eyebrow="Feedback / Skeleton" title="Skeleton" description="Reserva la estructura del contenido mientras se cargan datos, imágenes o colecciones." />
  <section class="component-section"><div class="section-heading"><div><span>01</span><h2>Composiciones</h2></div><p>Texto, perfiles, cards y filas de datos.</p></div><div class="docs-form-component-grid"><AppCard title="Perfil"><div class="docs-skeleton-card"><AppSkeleton variant="circle" :width="52" :height="52" /><AppSkeleton :lines="2" /><AppSkeleton variant="rectangle" height="110px" /></div></AppCard><AppCard title="Tabla"><div class="docs-skeleton-table"><div v-for="row in 4" :key="row" class="docs-skeleton-table-row"><AppSkeleton /><AppSkeleton /><AppSkeleton /></div></div></AppCard></div><DocsCodeBlock :code="code" /></section>
  <section class="component-section"><div class="section-heading"><div><span>02</span><h2>Prueba interactiva</h2></div><p>Configura forma, líneas y animación.</p></div><div class="showcase-panel docs-component-controls"><div class="form-showcase"><AppField label="Variante"><select id="skeleton-variant" v-model="variant" class="app-control app-control--md"><option>text</option><option>rectangle</option><option>circle</option></select></AppField><AppField label="Líneas"><input id="skeleton-lines" v-model.number="lines" class="app-control app-control--md" type="range" min="1" max="6" :disabled="variant !== 'text'" /></AppField></div><AppCheckbox v-model="animated" label="Animación shimmer" /><div class="docs-component-preview"><AppSkeleton :variant="variant" :lines="lines" :animated="animated" :width="variant === 'circle' ? 72 : undefined" :height="variant === 'circle' ? 72 : variant === 'rectangle' ? 140 : undefined" /></div></div></section>
  <DocsApiReference component-name="AppSkeleton" :rows="properties" note="Expone role=status, aria-busy y desactiva la animación cuando el sistema solicita movimiento reducido." />
</template>