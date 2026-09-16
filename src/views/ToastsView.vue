<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { Bell, Layers, MapPin, MousePointerClick } from '@lucide/vue'
import DocsCodeBlock from '../components/docs/DocsCodeBlock.vue'
import DocsPageHeader from '../components/docs/DocsPageHeader.vue'
import DocsToastReference from '../components/docs/DocsToastReference.vue'
import AppButton from '../components/ui/AppButton.vue'
import AppCard from '../components/ui/AppCard.vue'
import AppCheckbox from '../components/ui/AppCheckbox.vue'
import AppField from '../components/ui/AppField.vue'
import AppToastViewport from '../components/ui/AppToastViewport.vue'
import { useToast } from '../composables/useToast'
import { toastExamples } from '../docs/toastExamples'
import type { ToastPosition, ToastStatus } from '../types/toast'

const toast = useToast()
const position = ref<ToastPosition>('top-right')
const interactiveStatus = ref<ToastStatus>('success')
const interactiveDuration = ref(4500)
const interactiveClosable = ref(true)
const actionResult = ref('')

const statuses = [
  { value: 'info', label: 'Información', title: 'Nueva actividad', message: 'Tienes tres mensajes pendientes.' },
  { value: 'success', label: 'Éxito', title: 'Cambios guardados', message: 'La información se actualizó correctamente.' },
  { value: 'warning', label: 'Advertencia', title: 'Sesión por vencer', message: 'Tu sesión vencerá en cinco minutos.' },
  { value: 'danger', label: 'Error', title: 'No se pudo guardar', message: 'Revisa tu conexión e inténtalo nuevamente.' },
] as const

const positions: Array<{ value: ToastPosition; label: string }> = [
  { value: 'top-left', label: 'Arriba izquierda' },
  { value: 'top-center', label: 'Arriba centro' },
  { value: 'top-right', label: 'Arriba derecha' },
  { value: 'bottom-left', label: 'Abajo izquierda' },
  { value: 'bottom-center', label: 'Abajo centro' },
  { value: 'bottom-right', label: 'Abajo derecha' },
]

function showStatus(item: (typeof statuses)[number]) {
  toast.show({
    status: item.value,
    title: item.title,
    message: item.message,
  })
}

function showActionToast() {
  actionResult.value = ''
  toast.info('La versión 2.4 está lista para instalar.', {
    title: 'Actualización disponible',
    duration: 0,
    action: {
      label: 'Actualizar ahora',
      onClick: () => {
        actionResult.value = 'Actualización iniciada.'
      },
    },
  })
}

function showPersistentToast() {
  toast.warning('Esta notificación permanece hasta que uses su botón de cierre.', {
    title: 'Revisión pendiente',
    duration: 0,
  })
}

function showPositionToast() {
  toast.info('La pila aparece en la posición seleccionada.', {
    title: positions.find((item) => item.value === position.value)?.label,
  })
}

function showStack() {
  toast.clear()
  toast.success('El archivo principal terminó de cargar.', { title: 'Archivo cargado', duration: 0 })
  toast.info('El sistema está procesando las imágenes.', { title: 'Procesando', duration: 0 })
  toast.warning('Dos campos aún necesitan revisión.', { title: 'Datos pendientes', duration: 0 })
}

function showInteractiveToast() {
  toast.show({
    title: 'Vista previa',
    message: 'Esta notificación usa la configuración seleccionada.',
    status: interactiveStatus.value,
    duration: interactiveDuration.value,
    closable: interactiveClosable.value,
  })
}

onBeforeUnmount(toast.clear)
</script>

<template>
  <DocsPageHeader
    eyebrow="Componentes / Toast"
    title="Toast y notificaciones"
    description="Mensajes breves que informan resultados sin interrumpir la tarea actual."
  />

  <section class="component-section">
    <div class="section-heading">
      <div><span>01</span><h2>Estados</h2></div>
      <p>Información, éxito, advertencia y error con iconos Lucide.</p>
    </div>

    <AppCard title="Notificaciones semánticas" subtitle="Cada mensaje desaparece automáticamente" :icon="Bell">
      <div class="component-row">
        <AppButton
          v-for="item in statuses"
          :key="item.value"
          :color="item.value"
          variant="soft"
          :data-testid="'toast-' + item.value"
          @click="showStatus(item)"
        >
          {{ item.label }}
        </AppButton>
      </div>
    </AppCard>

    <DocsCodeBlock :code="toastExamples.basic" />
  </section>

  <section class="component-section">
    <div class="section-heading">
      <div><span>02</span><h2>Acciones y duración persistente</h2></div>
      <p>Añade una acción breve o conserva el mensaje hasta que el usuario lo cierre.</p>
    </div>

    <div class="card-grid">
      <AppCard title="Notificación con acción" subtitle="duration = 0" :icon="MousePointerClick" icon-color="primary">
        <p>La acción ejecuta una función y retira la notificación de la pila.</p>
        <p v-if="actionResult" class="toast-action-result" role="status">{{ actionResult }}</p>
        <template #footer>
          <AppButton data-testid="toast-action-trigger" @click="showActionToast">Mostrar actualización</AppButton>
        </template>
      </AppCard>

      <AppCard title="Cierre manual" subtitle="Sin temporizador" :icon="Bell" icon-color="warning">
        <p>Úsala cuando el mensaje deba permanecer hasta ser reconocido.</p>
        <template #footer>
          <AppButton variant="soft" color="warning" @click="showPersistentToast">Mostrar persistente</AppButton>
        </template>
      </AppCard>
    </div>

    <DocsCodeBlock :code="toastExamples.action" />
  </section>

  <section class="component-section">
    <div class="section-heading">
      <div><span>03</span><h2>Posiciones</h2></div>
      <p>Seis ubicaciones que conservan margen respecto del viewport.</p>
    </div>

    <AppCard title="Posición de la pila" subtitle="Se adapta automáticamente en móvil" :icon="MapPin" icon-color="info">
      <div class="form-showcase">
        <AppField label="Ubicación" for-id="toast-position">
          <select id="toast-position" v-model="position" class="app-control app-control--md">
            <option v-for="item in positions" :key="item.value" :value="item.value">{{ item.label }}</option>
          </select>
        </AppField>
      </div>
      <template #footer>
        <AppButton data-testid="toast-position-trigger" variant="soft" color="info" @click="showPositionToast">
          Probar posición
        </AppButton>
      </template>
    </AppCard>

    <DocsCodeBlock :code="toastExamples.position" />
  </section>

  <section class="component-section">
    <div class="section-heading">
      <div><span>04</span><h2>Pila de notificaciones</h2></div>
      <p>Los nuevos mensajes se agrupan y el sistema conserva un máximo de cinco.</p>
    </div>

    <AppCard title="Múltiples eventos" subtitle="Entrada, salida y reordenamiento animados" :icon="Layers" icon-color="success">
      <p>Genera tres mensajes persistentes para revisar el espaciado y el orden de la pila.</p>
      <template #footer>
        <AppButton variant="ghost" color="neutral" @click="toast.clear">Limpiar pila</AppButton>
        <AppButton data-testid="toast-stack-trigger" color="success" @click="showStack">Generar pila</AppButton>
      </template>
    </AppCard>

    <DocsCodeBlock :code="toastExamples.stack" />
  </section>

  <section class="component-section">
    <div class="section-heading">
      <div><span>05</span><h2>Prueba interactiva</h2></div>
      <p>Configura el estado, la duración y el botón de cierre.</p>
    </div>

    <div class="showcase-panel docs-toast-controls">
      <div class="form-showcase">
        <AppField label="Estado" for-id="toast-demo-status">
          <select id="toast-demo-status" v-model="interactiveStatus" class="app-control app-control--md">
            <option v-for="item in statuses" :key="item.value" :value="item.value">{{ item.value }}</option>
          </select>
        </AppField>

        <AppField label="Duración" for-id="toast-demo-duration">
          <select id="toast-demo-duration" v-model.number="interactiveDuration" class="app-control app-control--md">
            <option :value="2500">2.5 segundos</option>
            <option :value="4500">4.5 segundos</option>
            <option :value="8000">8 segundos</option>
            <option :value="0">Persistente</option>
          </select>
        </AppField>
      </div>

      <AppCheckbox v-model="interactiveClosable" label="Mostrar botón de cierre" />
      <div>
        <AppButton data-testid="toast-interactive-trigger" @click="showInteractiveToast">Mostrar vista previa</AppButton>
      </div>
    </div>

    <DocsCodeBlock :code="toastExamples.setup" />
  </section>

  <DocsToastReference />
  <AppToastViewport :position="position" />
</template>
