<script setup lang="ts">
import { ref } from 'vue'
import { Bell, Share2 } from '@lucide/vue'
import DocsCodeBlock from '../components/docs/DocsCodeBlock.vue'
import DocsPageHeader from '../components/docs/DocsPageHeader.vue'
import AppButton from '../components/ui/AppButton.vue'
import AppCard from '../components/ui/AppCard.vue'
import AppCheckbox from '../components/ui/AppCheckbox.vue'
import AppField from '../components/ui/AppField.vue'
import AppPopover from '../components/ui/AppPopover.vue'
import AppTable from '../components/ui/AppTable.vue'
import { popoverExamples } from '../docs/popoverExamples'

type Placement = NonNullable<InstanceType<typeof AppPopover>['$props']['placement']>
type Align = NonNullable<InstanceType<typeof AppPopover>['$props']['align']>
type Width = NonNullable<InstanceType<typeof AppPopover>['$props']['width']>

const infoOpen = ref(false)
const shareOpen = ref(false)
const formOpen = ref(false)
const interactiveOpen = ref(false)
const placement = ref<Placement>('bottom')
const align = ref<Align>('center')
const width = ref<Width>('md')
const showClose = ref(true)
const disabled = ref(false)
const result = ref('')

const properties = [
  ['v-model', 'boolean', 'false', 'Controla si el panel está abierto.'],
  ['label', 'string', 'requerido', 'Texto o nombre accesible del disparador.'],
  ['title', 'string', 'requerido', 'Título accesible del diálogo no modal.'],
  ['description', 'string', 'undefined', 'Texto secundario del encabezado.'],
  ['placement', 'top | bottom | left | right', 'bottom', 'Lado preferido con cambio automático.'],
  ['align', 'start | center | end', 'center', 'Alineación respecto del disparador.'],
  ['width', 'sm | md | lg', 'md', 'Ancho del panel.'],
  ['showClose', 'boolean', 'true', 'Muestra el cierre del encabezado.'],
  ['disabled', 'boolean', 'false', 'Deshabilita el disparador.'],
]
</script>

<template>
  <DocsPageHeader eyebrow="Componentes / Popover" title="Popovers"
    description="Paneles contextuales no modales para información, formularios breves y acciones." />

  <section class="component-section">
    <div class="section-heading"><div><span>01</span><h2>Información contextual</h2></div><p>Contenido estructurado que necesita más espacio que un tooltip.</p></div>
    <AppCard title="Detalles del registro">
      <AppPopover v-model="infoOpen" label="Ver información" title="Información del registro" description="Actualizado hace cinco minutos">
        <p>Este proyecto pertenece al equipo de operaciones y tiene doce colaboradores activos.</p>
      </AppPopover>
    </AppCard>
    <DocsCodeBlock :code="popoverExamples.basic" />
  </section>

  <section class="component-section">
    <div class="section-heading"><div><span>02</span><h2>Acciones y formularios</h2></div><p>Contenido enfocable con acciones en el pie.</p></div>
    <div class="card-grid">
      <AppCard title="Compartir proyecto" :icon="Share2">
        <AppPopover v-model="shareOpen" label="Compartir" title="Compartir proyecto" description="Envía acceso a un colaborador" trigger-color="primary">
          <label class="app-field" for="popover-email"><span class="app-field__label">Correo electrónico</span><input id="popover-email" data-popover-initial class="app-control app-control--md" type="email" placeholder="nombre@empresa.com" /></label>
          <template #footer="{ close }"><AppButton variant="ghost" color="neutral" size="sm" @click="close()">Cancelar</AppButton><AppButton size="sm" @click="result = 'Invitación enviada'; shareOpen = false">Enviar</AppButton></template>
        </AppPopover>
      </AppCard>
      <AppCard title="Preferencias rápidas" :icon="Bell" icon-color="warning">
        <AppPopover v-model="formOpen" label="Configurar avisos" title="Notificaciones" description="Preferencias rápidas" width="sm">
          <AppCheckbox label="Avisos por correo" /><AppCheckbox label="Notificaciones push" />
          <template #footer="{ close }"><AppButton size="sm" @click="close()">Listo</AppButton></template>
        </AppPopover>
      </AppCard>
    </div>
    <p v-if="result" class="popover-result" role="status">{{ result }}</p>
    <DocsCodeBlock :code="popoverExamples.actions" />
  </section>

  <section class="component-section">
    <div class="section-heading"><div><span>03</span><h2>Posición y alineación</h2></div><p>El panel cambia de lado automáticamente cuando falta espacio.</p></div>
    <AppCard title="Ubicaciones">
      <div class="component-row popover-placement-demo">
        <AppPopover label="Arriba" title="Popover superior" placement="top" align="start" width="sm"><p>Alineado al inicio.</p></AppPopover>
        <AppPopover label="Derecha" title="Popover derecho" placement="right" width="sm"><p>Centrado en el lateral.</p></AppPopover>
        <AppPopover label="Abajo" title="Popover inferior" placement="bottom" align="end" width="sm"><p>Alineado al final.</p></AppPopover>
        <AppPopover label="Izquierda" title="Popover izquierdo" placement="left" width="sm"><p>Centrado en el lateral.</p></AppPopover>
      </div>
    </AppCard>
    <DocsCodeBlock :code="popoverExamples.placements" />
  </section>

  <section class="component-section">
    <div class="section-heading"><div><span>04</span><h2>Prueba interactiva</h2></div><p>Configura ubicación, alineación, ancho y cierre.</p></div>
    <div class="showcase-panel docs-popover-controls">
      <div class="form-showcase">
        <AppField label="Posición" for-id="popover-placement"><select id="popover-placement" v-model="placement" class="app-control app-control--md"><option>top</option><option>right</option><option>bottom</option><option>left</option></select></AppField>
        <AppField label="Alineación" for-id="popover-align"><select id="popover-align" v-model="align" class="app-control app-control--md"><option>start</option><option>center</option><option>end</option></select></AppField>
        <AppField label="Ancho" for-id="popover-width"><select id="popover-width" v-model="width" class="app-control app-control--md"><option>sm</option><option>md</option><option>lg</option></select></AppField>
      </div>
      <div class="component-row"><AppCheckbox v-model="showClose" label="Mostrar cierre" /><AppCheckbox v-model="disabled" label="Deshabilitado" /></div>
      <div><AppPopover v-model="interactiveOpen" label="Probar popover" title="Vista previa" description="Configuración interactiva" :placement="placement" :align="align" :width="width" :show-close="showClose" :disabled="disabled" trigger-variant="soft" trigger-color="info">
        <p>Este panel refleja los controles seleccionados.</p>
        <template #footer="{ close }"><AppButton size="sm" @click="close()">Aceptar</AppButton></template>
      </AppPopover></div>
    </div>
    <DocsCodeBlock :code="popoverExamples.interactive" />
  </section>

  <section class="component-section">
    <div class="section-heading"><div><span>05</span><h2>Referencia de AppPopover</h2></div><p>Propiedades, slots y comportamiento accesible.</p></div>
    <AppCard title="API del componente"><AppTable label="Propiedades de AppPopover" compact>
      <thead><tr><th>Propiedad</th><th>Tipo</th><th>Por defecto</th><th>Descripción</th></tr></thead>
      <tbody><tr v-for="item in properties" :key="item[0]"><td><code>{{ item[0] }}</code></td><td><code>{{ item[1] }}</code></td><td><code>{{ item[2] }}</code></td><td>{{ item[3] }}</td></tr></tbody>
    </AppTable><p class="docs-reference-note">Los slots son <code>trigger</code>, contenido por defecto y <code>footer</code>. El footer recibe una función <code>close</code>. Escape restaura el foco y el clic exterior conserva el nuevo foco.</p></AppCard>
  </section>
</template>
