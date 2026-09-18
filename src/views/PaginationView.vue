<script setup lang="ts">
import { ref } from 'vue'
import DocsCodeBlock from '../components/docs/DocsCodeBlock.vue'
import DocsPageHeader from '../components/docs/DocsPageHeader.vue'
import AppCard from '../components/ui/AppCard.vue'
import AppCheckbox from '../components/ui/AppCheckbox.vue'
import AppField from '../components/ui/AppField.vue'
import AppPagination from '../components/ui/AppPagination.vue'
import AppTable from '../components/ui/AppTable.vue'
import { paginationExamples } from '../docs/paginationExamples'

const basicPage = ref(1)
const largePage = ref(18)
const compactPage = ref(2)
const interactivePage = ref(4)
const totalItems = ref(180)
const pageSize = ref(10)
const siblings = ref(1)
const showEdges = ref(true)
const disabled = ref(false)
const changes = ref(0)

const properties = [
  ['v-model', 'number', '1', 'Página activa.'],
  ['totalItems', 'number', 'requerido', 'Cantidad total de registros.'],
  ['pageSize', 'number', '10', 'Registros por página.'],
  ['siblingCount', 'number', '1', 'Páginas vecinas visibles.'],
  ['showEdges', 'boolean', 'true', 'Muestra controles de primera y última página.'],
  ['disabled', 'boolean', 'false', 'Deshabilita toda la navegación.'],
  ['label', 'string', 'Paginación', 'Nombre accesible del nav.'],
]
</script>

<template>
  <DocsPageHeader eyebrow="Componentes / Pagination" title="Pagination"
    description="Navegación entre conjuntos de datos con elipsis y controles accesibles." />

  <section class="component-section">
    <div class="section-heading"><div><span>01</span><h2>Paginación básica</h2></div><p>Páginas, anterior, siguiente y extremos.</p></div>
    <AppCard title="Resultados"><AppPagination v-model="basicPage" :total-items="120" />
      <template #footer><span role="status">Página actual: {{ basicPage }}</span></template>
    </AppCard>
    <DocsCodeBlock :code="paginationExamples.basic" />
  </section>

  <section class="component-section">
    <div class="section-heading"><div><span>02</span><h2>Conjuntos extensos</h2></div><p>Elipsis y páginas vecinas alrededor de la selección.</p></div>
    <AppCard title="400 resultados"><AppPagination v-model="largePage" :total-items="400" :sibling-count="2" /></AppCard>
    <DocsCodeBlock :code="paginationExamples.siblings" />
  </section>

  <section class="component-section">
    <div class="section-heading"><div><span>03</span><h2>Versión compacta</h2></div><p>Oculta los controles de primera y última página.</p></div>
    <AppCard title="Listado corto"><AppPagination v-model="compactPage" :total-items="48" :show-edges="false" /></AppCard>
    <DocsCodeBlock :code="paginationExamples.compact" />
  </section>

  <section class="component-section">
    <div class="section-heading"><div><span>04</span><h2>Prueba interactiva</h2></div><p>Configura datos, densidad y estado.</p></div>
    <div class="showcase-panel docs-pagination-controls">
      <div class="form-showcase">
        <AppField label="Total de registros" for-id="pagination-total"><select id="pagination-total" v-model.number="totalItems" class="app-control app-control--md"><option :value="48">48</option><option :value="180">180</option><option :value="500">500</option></select></AppField>
        <AppField label="Por página" for-id="pagination-size"><select id="pagination-size" v-model.number="pageSize" class="app-control app-control--md"><option :value="5">5</option><option :value="10">10</option><option :value="25">25</option></select></AppField>
        <AppField label="Vecinas" for-id="pagination-siblings"><select id="pagination-siblings" v-model.number="siblings" class="app-control app-control--md"><option :value="0">0</option><option :value="1">1</option><option :value="2">2</option></select></AppField>
      </div>
      <div class="component-row"><AppCheckbox v-model="showEdges" label="Mostrar extremos" /><AppCheckbox v-model="disabled" label="Deshabilitada" /></div>
      <AppPagination v-model="interactivePage" :total-items="totalItems" :page-size="pageSize" :sibling-count="siblings" :show-edges="showEdges" :disabled="disabled" label="Vista previa de paginación" @change="changes++" />
      <p role="status">Página {{ interactivePage }} · cambios emitidos: {{ changes }}</p>
    </div>
    <DocsCodeBlock :code="paginationExamples.interactive" />
  </section>

  <section class="component-section">
    <div class="section-heading"><div><span>05</span><h2>Referencia de AppPagination</h2></div><p>Propiedades y evento de navegación.</p></div>
    <AppCard title="API del componente"><AppTable label="Propiedades de AppPagination" compact>
      <thead><tr><th>Propiedad</th><th>Tipo</th><th>Por defecto</th><th>Descripción</th></tr></thead>
      <tbody><tr v-for="item in properties" :key="item[0]"><td><code>{{ item[0] }}</code></td><td><code>{{ item[1] }}</code></td><td><code>{{ item[2] }}</code></td><td>{{ item[3] }}</td></tr></tbody>
    </AppTable><p class="docs-reference-note">El evento <code>change</code> emite la página después de una navegación válida. La página activa usa <code>aria-current="page"</code>.</p></AppCard>
  </section>
</template>
