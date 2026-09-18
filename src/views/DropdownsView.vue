<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Archive, Copy, Download, Edit3, Ellipsis, Eye, Share2, Trash2, UserPlus } from '@lucide/vue'
import DocsCodeBlock from '../components/docs/DocsCodeBlock.vue'
import DocsDropdownReference from '../components/docs/DocsDropdownReference.vue'
import DocsPageHeader from '../components/docs/DocsPageHeader.vue'
import AppCard from '../components/ui/AppCard.vue'
import AppCheckbox from '../components/ui/AppCheckbox.vue'
import AppDropdown from '../components/ui/AppDropdown.vue'
import AppDropdownItem from '../components/ui/AppDropdownItem.vue'
import AppDropdownSeparator from '../components/ui/AppDropdownSeparator.vue'
import AppField from '../components/ui/AppField.vue'
import AppTable from '../components/ui/AppTable.vue'
import { dropdownExamples } from '../docs/dropdownExamples'

const lastAction = ref('Ninguna acción ejecutada.')
const interactiveAlign = ref<'start' | 'end'>('start')
const interactiveSide = ref<'top' | 'bottom'>('bottom')
const interactiveVariant = ref<'solid' | 'outline' | 'soft' | 'ghost'>('outline')
const interactiveCloseOnSelect = ref(true)
const interactiveDisabled = ref(false)
const interactiveSelection = ref('Ninguna opción seleccionada.')
const preferences = reactive({
  email: true,
  push: false,
  weekly: true,
})

const projects = [
  { id: 1, name: 'Portal de clientes', owner: 'Ana Torres', status: 'Activo' },
  { id: 2, name: 'Panel financiero', owner: 'Luis Vega', status: 'En revisión' },
  { id: 3, name: 'Centro de ayuda', owner: 'María Paz', status: 'Borrador' },
]

function registerAction(action: string) {
  lastAction.value = action
}
</script>

<template>
  <DocsPageHeader
    eyebrow="Componentes / Dropdown"
    title="Dropdown y menús de acciones"
    description="Menús contextuales para agrupar acciones sin ocupar espacio permanente en la interfaz."
  />

  <section class="component-section">
    <div class="section-heading">
      <div><span>01</span><h2>Menú básico</h2></div>
      <p>Acciones frecuentes, separación visual y una opción destructiva.</p>
    </div>

    <AppCard title="Acciones de documento" subtitle="El menú se cierra después de seleccionar">
      <div class="dropdown-demo-row">
        <AppDropdown label="Acciones básicas">
          <AppDropdownItem @select="registerAction('Editar documento')">Editar</AppDropdownItem>
          <AppDropdownItem @select="registerAction('Duplicar documento')">Duplicar</AppDropdownItem>
          <AppDropdownSeparator />
          <AppDropdownItem danger @select="registerAction('Eliminar documento')">Eliminar</AppDropdownItem>
        </AppDropdown>
        <span class="dropdown-action-status" role="status">{{ lastAction }}</span>
      </div>
    </AppCard>

    <DocsCodeBlock :code="dropdownExamples.basic" />
  </section>

  <section class="component-section">
    <div class="section-heading">
      <div><span>02</span><h2>Iconos, grupos y estados</h2></div>
      <p>Iconos Lucide, descripción, atajos, opciones deshabilitadas y acciones peligrosas.</p>
    </div>

    <AppCard title="Opciones del archivo" subtitle="Menú con mayor densidad de información">
      <AppDropdown label="Opciones del archivo" align="end" trigger-variant="soft" trigger-color="primary">
        <div class="app-dropdown__label">Documento</div>
        <AppDropdownItem :icon="Eye" shortcut="E" @select="registerAction('Vista previa')">Vista previa</AppDropdownItem>
        <AppDropdownItem :icon="Download" description="Formato PDF" @select="registerAction('Descargar PDF')">
          Descargar
        </AppDropdownItem>
        <AppDropdownItem :icon="Share2" @select="registerAction('Compartir documento')">Compartir</AppDropdownItem>
        <AppDropdownItem :icon="Archive" disabled>Archivar</AppDropdownItem>
        <AppDropdownSeparator />
        <AppDropdownItem :icon="Trash2" danger @select="registerAction('Eliminar archivo')">Eliminar archivo</AppDropdownItem>
      </AppDropdown>
    </AppCard>

    <DocsCodeBlock :code="dropdownExamples.icons" />
  </section>

  <section class="component-section">
    <div class="section-heading">
      <div><span>03</span><h2>Alineación y posición</h2></div>
      <p>El menú puede alinearse a cada borde y abrir hacia arriba o abajo.</p>
    </div>

    <AppCard title="Ubicación del menú" subtitle="El lado cambia automáticamente cuando no existe espacio suficiente">
      <div class="component-row dropdown-position-demo">
        <AppDropdown label="Inicio · abajo" align="start" side="bottom">
          <AppDropdownItem :icon="Copy">Copiar enlace</AppDropdownItem>
          <AppDropdownItem :icon="Download">Descargar</AppDropdownItem>
        </AppDropdown>

        <AppDropdown label="Final · abajo" align="end" side="bottom">
          <AppDropdownItem :icon="Copy">Copiar enlace</AppDropdownItem>
          <AppDropdownItem :icon="Download">Descargar</AppDropdownItem>
        </AppDropdown>

        <AppDropdown label="Final · arriba" align="end" side="top">
          <AppDropdownItem :icon="Copy">Copiar enlace</AppDropdownItem>
          <AppDropdownItem :icon="Download">Descargar</AppDropdownItem>
        </AppDropdown>
      </div>
    </AppCard>

    <DocsCodeBlock :code="dropdownExamples.position" />
  </section>

  <section class="component-section">
    <div class="section-heading">
      <div><span>04</span><h2>Opciones seleccionables</h2></div>
      <p>Un menú puede permanecer abierto para activar varias preferencias.</p>
    </div>

    <AppCard title="Canales de notificación" subtitle="closeOnSelect = false">
      <AppDropdown label="Configurar canales" :close-on-select="false">
        <div class="app-dropdown__label">Recibir avisos por</div>
        <AppDropdownItem :checked="preferences.email" @select="preferences.email = !preferences.email">
          Correo electrónico
        </AppDropdownItem>
        <AppDropdownItem :checked="preferences.push" @select="preferences.push = !preferences.push">
          Notificaciones push
        </AppDropdownItem>
        <AppDropdownItem :checked="preferences.weekly" @select="preferences.weekly = !preferences.weekly">
          Resumen semanal
        </AppDropdownItem>
      </AppDropdown>
      <p class="dropdown-selection-summary" role="status">
        {{ Object.values(preferences).filter(Boolean).length }} canales activos
      </p>
    </AppCard>

    <DocsCodeBlock :code="dropdownExamples.selection" />
  </section>

  <section class="component-section">
    <div class="section-heading">
      <div><span>05</span><h2>Menú de acciones en tabla</h2></div>
      <p>Disparadores compactos para operar sobre cada registro.</p>
    </div>

    <AppCard title="Proyectos recientes" subtitle="Acciones asociadas a cada fila">
      <AppTable label="Proyectos con menú de acciones">
        <thead>
          <tr><th scope="col">Proyecto</th><th scope="col">Responsable</th><th scope="col">Estado</th><th scope="col"><span class="sr-only">Acciones</span></th></tr>
        </thead>
        <tbody>
          <tr v-for="project in projects" :key="project.id">
            <td><strong>{{ project.name }}</strong></td>
            <td>{{ project.owner }}</td>
            <td><span class="status-badge">{{ project.status }}</span></td>
            <td class="dropdown-table-action">
              <AppDropdown
                :label="'Acciones de ' + project.name"
                menu-label="Acciones del proyecto"
                icon-only
                align="end"
                trigger-variant="ghost"
                trigger-size="sm"
              >
                <template #trigger><Ellipsis :size="18" aria-hidden="true" /></template>
                <AppDropdownItem :icon="Eye" @select="registerAction('Ver ' + project.name)">Ver detalle</AppDropdownItem>
                <AppDropdownItem :icon="Edit3" @select="registerAction('Editar ' + project.name)">Editar</AppDropdownItem>
                <AppDropdownItem :icon="UserPlus" @select="registerAction('Compartir ' + project.name)">Compartir</AppDropdownItem>
                <AppDropdownSeparator />
                <AppDropdownItem :icon="Trash2" danger @select="registerAction('Eliminar ' + project.name)">Eliminar</AppDropdownItem>
              </AppDropdown>
            </td>
          </tr>
        </tbody>
      </AppTable>
      <template #footer><span role="status">{{ lastAction }}</span></template>
    </AppCard>

    <DocsCodeBlock :code="dropdownExamples.actions" />
  </section>

  <section class="component-section">
    <div class="section-heading">
      <div><span>06</span><h2>Prueba interactiva</h2></div>
      <p>Cambia la alineación, el lado, la variante y el comportamiento de selección.</p>
    </div>

    <div class="showcase-panel docs-dropdown-controls">
      <div class="form-showcase">
        <AppField label="Alineación" for-id="dropdown-demo-align">
          <select id="dropdown-demo-align" v-model="interactiveAlign" class="app-control app-control--md">
            <option value="start">start</option><option value="end">end</option>
          </select>
        </AppField>
        <AppField label="Lado preferido" for-id="dropdown-demo-side">
          <select id="dropdown-demo-side" v-model="interactiveSide" class="app-control app-control--md">
            <option value="bottom">bottom</option><option value="top">top</option>
          </select>
        </AppField>
        <AppField label="Variante del botón" for-id="dropdown-demo-variant">
          <select id="dropdown-demo-variant" v-model="interactiveVariant" class="app-control app-control--md">
            <option value="solid">solid</option><option value="outline">outline</option>
            <option value="soft">soft</option><option value="ghost">ghost</option>
          </select>
        </AppField>
      </div>
      <div class="component-row">
        <AppCheckbox v-model="interactiveCloseOnSelect" label="Cerrar al seleccionar" />
        <AppCheckbox v-model="interactiveDisabled" label="Deshabilitar disparador" />
      </div>
      <div class="dropdown-demo-row">
        <AppDropdown
          label="Probar menú"
          :align="interactiveAlign"
          :side="interactiveSide"
          :trigger-variant="interactiveVariant"
          :close-on-select="interactiveCloseOnSelect"
          :disabled="interactiveDisabled"
        >
          <AppDropdownItem :icon="Eye" @select="interactiveSelection = 'Vista previa seleccionada'">Vista previa</AppDropdownItem>
          <AppDropdownItem :icon="Copy" @select="interactiveSelection = 'Duplicar seleccionado'">Duplicar</AppDropdownItem>
          <AppDropdownSeparator />
          <AppDropdownItem :icon="Trash2" danger @select="interactiveSelection = 'Eliminar seleccionado'">Eliminar</AppDropdownItem>
        </AppDropdown>
        <span class="dropdown-action-status" role="status">{{ interactiveSelection }}</span>
      </div>
    </div>

    <DocsCodeBlock :code="dropdownExamples.interactive" />
  </section>
  <DocsDropdownReference />
</template>
