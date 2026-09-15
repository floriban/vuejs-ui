<script setup lang="ts">
import { Eye, MoreHorizontal, Pencil } from '@lucide/vue'
import DocsPageHeader from '../components/docs/DocsPageHeader.vue'
import AppButton from '../components/ui/AppButton.vue'
import AppButtonGroup from '../components/ui/AppButtonGroup.vue'
import AppTable from '../components/ui/AppTable.vue'

const projects = [
  { id: 1, name: 'Portal de clientes', owner: 'Ana Torres', updated: 'Hoy, 10:24', status: 'Activo', tone: 'success' },
  { id: 2, name: 'Panel de ventas', owner: 'Luis Vega', updated: 'Ayer, 16:40', status: 'En revisión', tone: 'warning' },
  { id: 3, name: 'Inventario central', owner: 'María Soto', updated: '5 sep. 2026', status: 'Activo', tone: 'success' },
  { id: 4, name: 'Sitio corporativo', owner: 'Carlos Ruiz', updated: '2 sep. 2026', status: 'Pausado', tone: 'neutral' },
]
</script>

<template>
  <DocsPageHeader
    eyebrow="Componentes / Tablas"
    title="Tablas"
    description="Presentación clara de registros, estados y acciones en espacios administrativos."
  />

  <section class="component-section">
    <div class="section-heading">
      <div><span>01</span><h2>Tabla básica</h2></div>
      <p>Encabezados, estados y acciones por fila.</p>
    </div>
    <div class="showcase-panel table-showcase">
      <AppTable label="Listado de proyectos">
        <thead>
          <tr>
            <th>Proyecto</th>
            <th>Responsable</th>
            <th>Última actualización</th>
            <th>Estado</th>
            <th><span class="sr-only">Acciones</span></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="project in projects" :key="project.id">
            <td><strong>{{ project.name }}</strong><small>#PRJ-00{{ project.id }}</small></td>
            <td>{{ project.owner }}</td>
            <td>{{ project.updated }}</td>
            <td><span class="table-status" :class="`table-status--${project.tone}`">{{ project.status }}</span></td>
            <td class="table-actions">
              <AppButtonGroup :attached="false" :label="`Acciones de ${project.name}`">
                <AppButton icon-only size="sm" variant="ghost" aria-label="Ver proyecto"><Eye :size="16" /></AppButton>
                <AppButton icon-only size="sm" variant="ghost" aria-label="Editar proyecto"><Pencil :size="16" /></AppButton>
                <AppButton icon-only size="sm" variant="ghost" aria-label="Más acciones"><MoreHorizontal :size="16" /></AppButton>
              </AppButtonGroup>
            </td>
          </tr>
        </tbody>
      </AppTable>
    </div>
  </section>

  <section class="component-section">
    <div class="section-heading">
      <div><span>02</span><h2>Compacta y alternada</h2></div>
      <p>Mayor densidad para listados extensos.</p>
    </div>
    <div class="showcase-panel table-showcase">
      <AppTable label="Listado compacto de proyectos" striped compact>
        <thead><tr><th>Proyecto</th><th>Responsable</th><th>Estado</th></tr></thead>
        <tbody>
          <tr v-for="project in projects" :key="project.id">
            <td>{{ project.name }}</td>
            <td>{{ project.owner }}</td>
            <td><span class="table-status" :class="`table-status--${project.tone}`">{{ project.status }}</span></td>
          </tr>
        </tbody>
      </AppTable>
    </div>
  </section>
</template>
