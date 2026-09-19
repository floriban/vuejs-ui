<script setup lang="ts">
import { ref } from 'vue'
import DocsApiReference from '../components/docs/DocsApiReference.vue'
import DocsCodeBlock from '../components/docs/DocsCodeBlock.vue'
import DocsPageHeader from '../components/docs/DocsPageHeader.vue'
import AppBreadcrumbs, { type BreadcrumbItem } from '../components/ui/AppBreadcrumbs.vue'
import AppCard from '../components/ui/AppCard.vue'
import AppField from '../components/ui/AppField.vue'

const items: BreadcrumbItem[] = [
  { label: 'Dashboard', to: { name: 'dashboard' } },
  { label: 'Navegación', to: { name: 'tabs' } },
  { label: 'Componentes', to: { name: 'accordion' } },
  { label: 'Breadcrumbs' },
]
const separator = ref<'chevron' | 'slash' | 'dot'>('chevron')
const maxItems = ref(0)
const code = `<AppBreadcrumbs :items="items" separator="chevron" />`
const properties = [
  ['items', 'BreadcrumbItem[]', 'requerido', 'Elementos con label y destino opcional.'],
  ['label', 'string', 'Ruta de navegación', 'Nombre accesible del nav.'],
  ['separator', 'chevron | slash | dot', 'chevron', 'Separador visual entre niveles.'],
  ['maxItems', 'number', '0', 'Cantidad máxima visible; 0 muestra toda la ruta.'],
] as const
</script>

<template>
  <DocsPageHeader eyebrow="Navegación / Breadcrumbs" title="Breadcrumbs" description="Muestra la posición actual dentro de una jerarquía y permite volver a niveles anteriores." />
  <section class="component-section"><div class="section-heading"><div><span>01</span><h2>Separadores</h2></div><p>Tres estilos para distintos niveles de densidad.</p></div><AppCard title="Rutas jerárquicas"><div class="color-groups"><div v-for="kind in (['chevron','slash','dot'] as const)" :key="kind" class="color-group"><span>{{ kind }}</span><AppBreadcrumbs :items="items" :separator="kind" /></div></div></AppCard><DocsCodeBlock :code="code" /></section>
  <section class="component-section"><div class="section-heading"><div><span>02</span><h2>Prueba interactiva</h2></div><p>Cambia el separador y colapsa niveles intermedios.</p></div><div class="showcase-panel docs-component-controls"><div class="form-showcase"><AppField label="Separador"><select id="breadcrumb-separator" v-model="separator" class="app-control app-control--md"><option>chevron</option><option>slash</option><option>dot</option></select></AppField><AppField label="Máximo de elementos"><select id="breadcrumb-max" v-model.number="maxItems" class="app-control app-control--md"><option :value="0">Todos</option><option :value="3">3 elementos</option><option :value="4">4 elementos</option></select></AppField></div><div class="docs-component-preview"><AppBreadcrumbs :items="items" :separator="separator" :max-items="maxItems" /></div></div></section>
  <DocsApiReference component-name="AppBreadcrumbs" :rows="properties" note="El último elemento recibe aria-current=page y los enlaces internos utilizan Vue Router." />
</template>