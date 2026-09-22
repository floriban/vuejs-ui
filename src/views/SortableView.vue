<script setup lang="ts">
import { ref } from 'vue'
import { ArrowDown, ArrowUp, GripVertical, RotateCcw } from '@lucide/vue'
import DocsApiReference from '../components/docs/DocsApiReference.vue'
import DocsCodeBlock from '../components/docs/DocsCodeBlock.vue'
import DocsPageHeader from '../components/docs/DocsPageHeader.vue'
import AppBadge from '../components/ui/AppBadge.vue'
import AppButton from '../components/ui/AppButton.vue'
import AppCheckbox from '../components/ui/AppCheckbox.vue'
import AppSortable from '../components/ui/AppSortable.vue'

const originalTasks = [
  { id: 1, title: 'Revisar propuesta', description: 'Validar alcance y componentes incluidos.', status: 'Pendiente' },
  { id: 2, title: 'Preparar demostración', description: 'Ordenar los ejemplos para el cliente.', status: 'En curso' },
  { id: 3, title: 'Publicar cambios', description: 'Generar la nueva versión del paquete.', status: 'Pendiente' },
  { id: 4, title: 'Actualizar documentación', description: 'Explicar los nuevos comandos de instalación.', status: 'Completado' },
]

const tasks = ref(originalTasks.map((task) => ({ ...task })))
const disabled = ref(false)

function reset() {
  tasks.value = originalTasks.map((task) => ({ ...task }))
}

function badgeColor(status: string) {
  if (status === 'Completado') return 'success'
  if (status === 'En curso') return 'info'
  return 'neutral'
}

const basicCode = `<script setup lang="ts">
import { ref } from 'vue'
import AppSortable from '@/components/ui/AppSortable.vue'

const tasks = ref([
  { id: 1, title: 'Diseñar' },
  { id: 2, title: 'Desarrollar' },
])
<\/script>

<template>
  <AppSortable v-model="tasks" item-key="id" handle=".drag-handle">
    <template #item="{ item }">
      <button class="drag-handle" aria-label="Arrastrar">⋮⋮</button>
      <span>{{ item.title }}</span>
    </template>
  </AppSortable>
</template>`

const properties = [
  ['v-model', 'unknown[]', 'requerido', 'Colección cuyo orden se actualiza al mover elementos.'],
  ['item-key', 'string', 'requerido', 'Propiedad única utilizada como key de Vue.'],
  ['group', 'Sortable group', 'undefined', 'Permite compartir elementos entre listas compatibles.'],
  ['handle', 'string', 'undefined', 'Selector del control utilizado para arrastrar.'],
  ['animation', 'number', '180', 'Duración de la animación en milisegundos.'],
  ['disabled', 'boolean', 'false', 'Desactiva el ordenamiento temporalmente.'],
] as const
</script>

<template>
  <DocsPageHeader
    eyebrow="Integraciones / SortableJS"
    title="Drag & Drop · SortableJS"
    description="Reordena colecciones mediante arrastre, controles accesibles y sincronización automática con v-model."
  />

  <section class="component-section">
    <div class="section-heading">
      <div><span>01</span><h2>Lista ordenable</h2></div>
      <p>Arrastra desde el control lateral o usa Alt + ↑/↓ con el control enfocado.</p>
    </div>

    <div class="showcase-panel docs-sortable-demo">
      <div class="docs-sortable-toolbar">
        <AppCheckbox v-model="disabled" label="Desactivar ordenamiento" />
        <AppButton size="sm" variant="outline" color="neutral" @click="reset">
          <RotateCcw :size="15" aria-hidden="true" /> Restablecer
        </AppButton>
      </div>

      <AppSortable v-model="tasks" item-key="id" handle=".docs-sortable-handle" :disabled="disabled" aria-label="Tareas del proyecto">
        <template #item="{ item, index, moveUp, moveDown, first, last }">
          <article class="docs-sortable-row">
            <button
              class="docs-sortable-handle"
              type="button"
              data-sortable-focus
              :disabled="disabled"
              :aria-label="`Mover ${item.title}. Usa Alt y las flechas verticales.`"
            >
              <GripVertical :size="20" aria-hidden="true" />
            </button>
            <span class="docs-sortable-position">{{ index + 1 }}</span>
            <div class="docs-sortable-content">
              <strong>{{ item.title }}</strong>
              <p>{{ item.description }}</p>
            </div>
            <AppBadge :color="badgeColor(item.status)" size="sm">{{ item.status }}</AppBadge>
            <div class="docs-sortable-actions">
              <AppButton icon-only size="sm" variant="ghost" color="neutral" :disabled="disabled || first" :aria-label="`Subir ${item.title}`" @click="moveUp">
                <ArrowUp :size="16" aria-hidden="true" />
              </AppButton>
              <AppButton icon-only size="sm" variant="ghost" color="neutral" :disabled="disabled || last" :aria-label="`Bajar ${item.title}`" @click="moveDown">
                <ArrowDown :size="16" aria-hidden="true" />
              </AppButton>
            </div>
          </article>
        </template>
      </AppSortable>
    </div>
    <DocsCodeBlock :code="basicCode" />
  </section>

  <DocsApiReference component-name="AppSortable" :rows="properties" note="El slot item también recibe moveUp, moveDown, first y last para ofrecer controles accesibles además del arrastre." />
</template>
