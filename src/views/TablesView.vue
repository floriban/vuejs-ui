<script setup lang="ts">
import { ref } from 'vue'
import { Eye } from '@lucide/vue'
import DocsPageHeader from '../components/docs/DocsPageHeader.vue'
import DocsCodeBlock from '../components/docs/DocsCodeBlock.vue'
import DocsTableReference from '../components/docs/DocsTableReference.vue'
import AppButton from '../components/ui/AppButton.vue'
import AppCard from '../components/ui/AppCard.vue'
import AppCheckbox from '../components/ui/AppCheckbox.vue'
import AppTable from '../components/ui/AppTable.vue'
import { tableExamples } from '../docs/tableExamples'

const projects = [
  { id: 1, name: 'Portal de clientes', owner: 'Ana Torres', updated: 'Hoy, 10:24', status: 'Activo', tone: 'success' },
  { id: 2, name: 'Panel de ventas', owner: 'Luis Vega', updated: 'Ayer, 16:40', status: 'En revisión', tone: 'warning' },
  { id: 3, name: 'Inventario central', owner: 'María Soto', updated: '5 sep. 2026', status: 'Activo', tone: 'success' },
  { id: 4, name: 'Sitio corporativo', owner: 'Carlos Ruiz', updated: '2 sep. 2026', status: 'Pausado', tone: 'neutral' },
]
const selected = ref<(typeof projects)[number]>()
const striped = ref(false)
const hoverable = ref(true)
const compact = ref(false)
const empty = ref(false)
</script>

<template>
  <DocsPageHeader eyebrow="Componentes / Tablas" title="Tablas"
    description="Tablas dentro de tarjetas, con encabezado, cuerpo y pie independientes para organizar cada listado." />

  <section class="component-section">
    <div class="section-heading">
      <div><span>01</span><h2>Tabla básica</h2></div>
      <p>La tarjeta organiza el contenido; la tabla presenta los registros.</p>
    </div>
    <AppCard>
      <template #header>
        <div><span class="card-kicker">Equipo</span><h3>Proyectos del equipo</h3></div>
        <span class="status-badge">{{ projects.length }} proyectos</span>
      </template>
      <p class="docs-table-intro">Consulta responsables, estados y la última actualización de cada proyecto.</p>
      <AppTable label="Listado de proyectos">
        <caption class="sr-only">Proyectos del equipo, responsables, actualización y estado</caption>
        <thead><tr>
          <th scope="col">Proyecto</th><th scope="col">Responsable</th>
          <th scope="col">Última actualización</th><th scope="col">Estado</th>
          <th scope="col"><span class="sr-only">Acciones</span></th>
        </tr></thead>
        <tbody>
          <tr v-for="project in projects" :key="project.id">
            <td><strong>{{ project.name }}</strong><small>#PRJ-00{{ project.id }}</small></td>
            <td>{{ project.owner }}</td><td>{{ project.updated }}</td>
            <td><span class="table-status" :class="'table-status--' + project.tone">{{ project.status }}</span></td>
            <td class="table-actions">
              <AppButton icon-only size="sm" variant="ghost" :aria-label="'Ver ' + project.name" @click="selected = project">
                <Eye :size="16" aria-hidden="true" />
              </AppButton>
            </td>
          </tr>
        </tbody>
      </AppTable>
      <template #footer>
        <p class="docs-table-feedback" role="status">{{ selected ? selected.name + ' · ' + selected.owner + ' · ' + selected.status : 'Pulsa el icono de una fila para consultar su resumen.' }}</p>
      </template>
    </AppCard>
    <DocsCodeBlock :code="tableExamples.basic" />
  </section>

  <section class="component-section">
    <div class="section-heading">
      <div><span>02</span><h2>Compacta y alternada</h2></div>
      <p>Menos espaciado y filas alternadas dentro del cuerpo de la tarjeta.</p>
    </div>
    <AppCard variant="elevated">
      <template #header><h3>Resumen de proyectos</h3></template>
      <AppTable label="Listado compacto de proyectos" striped compact>
        <caption class="sr-only">Resumen de proyectos con filas compactas y alternadas</caption>
        <thead><tr><th scope="col">Proyecto</th><th scope="col">Responsable</th><th scope="col">Estado</th></tr></thead>
        <tbody>
          <tr v-for="project in projects" :key="project.id">
            <td>{{ project.name }}</td><td>{{ project.owner }}</td>
            <td><span class="table-status" :class="'table-status--' + project.tone">{{ project.status }}</span></td>
          </tr>
        </tbody>
      </AppTable>
      <template #footer><span>{{ projects.length }} proyectos · Vista compacta</span></template>
    </AppCard>
    <DocsCodeBlock :code="tableExamples.compact" />
  </section>

  <section class="component-section">
    <div class="section-heading">
      <div><span>03</span><h2>Estado vacío</h2></div>
      <p>Conserva los encabezados y explica la ausencia de registros.</p>
    </div>
    <AppCard>
      <template #header><h3>Proyectos archivados</h3></template>
      <AppTable label="Proyectos archivados" :hoverable="false">
        <caption class="sr-only">Proyectos archivados y responsables</caption>
        <thead><tr><th scope="col">Proyecto</th><th scope="col">Responsable</th><th scope="col">Estado</th></tr></thead>
        <tbody><tr><td colspan="3" class="docs-table-empty">No hay proyectos archivados.</td></tr></tbody>
      </AppTable>
      <template #footer><span>0 proyectos</span></template>
    </AppCard>
    <DocsCodeBlock :code="tableExamples.empty" />
  </section>

  <section class="component-section">
    <div class="section-heading">
      <div><span>04</span><h2>Prueba interactiva</h2></div>
      <p>Combina las opciones visuales y prueba el estado sin registros.</p>
    </div>
    <AppCard>
      <template #header><h3>Vista previa de tabla</h3></template>
      <div class="docs-table-controls">
        <AppCheckbox v-model="striped" label="Filas alternadas" />
        <AppCheckbox v-model="hoverable" label="Resaltar al pasar el cursor" />
        <AppCheckbox v-model="compact" label="Modo compacto" />
        <AppCheckbox v-model="empty" label="Sin registros" />
      </div>
      <AppTable label="Vista previa de proyectos" :striped="striped" :hoverable="hoverable" :compact="compact">
        <caption class="sr-only">Vista previa de proyectos, responsables y estados</caption>
        <thead><tr><th scope="col">Proyecto</th><th scope="col">Responsable</th><th scope="col">Estado</th></tr></thead>
        <tbody>
          <tr v-if="empty"><td colspan="3" class="docs-table-empty">No hay registros para mostrar.</td></tr>
          <template v-else>
            <tr v-for="project in projects" :key="project.id">
              <td>{{ project.name }}</td><td>{{ project.owner }}</td><td>{{ project.status }}</td>
            </tr>
          </template>
        </tbody>
      </AppTable>
      <template #footer><span role="status">{{ empty ? 0 : projects.length }} proyectos</span></template>
    </AppCard>
    <DocsCodeBlock :code="tableExamples.interactive" />
  </section>
  <DocsTableReference />
</template>
