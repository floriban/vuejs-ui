<script setup lang="ts">
import { ref } from 'vue'
import { AlignVerticalJustifyCenter, FileClock, Maximize2, ShieldAlert, TriangleAlert } from '@lucide/vue'
import DocsCodeBlock from '../components/docs/DocsCodeBlock.vue'
import DocsModalReference from '../components/docs/DocsModalReference.vue'
import DocsPageHeader from '../components/docs/DocsPageHeader.vue'
import AppButton from '../components/ui/AppButton.vue'
import AppCard from '../components/ui/AppCard.vue'
import AppCheckbox from '../components/ui/AppCheckbox.vue'
import AppField from '../components/ui/AppField.vue'
import AppModal from '../components/ui/AppModal.vue'
import { modalExamples } from '../docs/modalExamples'

type ModalSize = 'sm' | 'md' | 'lg' | 'xl'

const basicOpen = ref(false)
const sizeOpen = ref(false)
const activeSize = ref<ModalSize>('md')
const topOpen = ref(false)
const persistentOpen = ref(false)
const scrollOpen = ref(false)
const confirmOpen = ref(false)
const lastAction = ref('')
const interactiveOpen = ref(false)
const interactiveSize = ref<ModalSize>('md')
const interactiveTone = ref<NonNullable<InstanceType<typeof AppModal>['$props']['tone']>>('primary')
const interactiveCentered = ref(true)
const interactiveScrollable = ref(false)
const interactiveBackdrop = ref(true)
const interactiveEscape = ref(true)
const interactiveClose = ref(true)

function openSize(size: ModalSize) {
  activeSize.value = size
  sizeOpen.value = true
}

function confirmDelete() {
  confirmOpen.value = false
  lastAction.value = 'Proyecto de demostración eliminado.'
}
</script>

<template>
  <DocsPageHeader
    eyebrow="Componentes / Modales"
    title="Modales"
    description="Diálogos para tareas enfocadas, confirmaciones y contenido extenso, con tamaños y comportamiento configurables."
  />

  <section class="component-section">
    <div class="section-heading">
      <div><span>01</span><h2>Modal básico</h2></div>
      <p>Encabezado, contenido, cierre y acciones en el pie.</p>
    </div>

    <AppCard title="Ejemplo interactivo" subtitle="El foco vuelve al botón al cerrar">
      <p>Abre el diálogo para editar información sin abandonar la página actual.</p>
      <template #footer>
        <AppButton data-testid="open-basic-modal" @click="basicOpen = true">Abrir modal</AppButton>
      </template>
    </AppCard>

    <DocsCodeBlock :code="modalExamples.basic" />

    <AppModal
      v-model="basicOpen"
      title="Actualizar perfil"
      description="Revisa la información antes de guardarla."
      :icon="AlignVerticalJustifyCenter"
      tone="primary"
    >
      <p>Los cambios se aplicarán a la información pública de tu cuenta.</p>
      <template #footer>
        <AppButton variant="ghost" color="neutral" @click="basicOpen = false">Cancelar</AppButton>
        <AppButton @click="basicOpen = false">Guardar cambios</AppButton>
      </template>
    </AppModal>
  </section>

  <section class="component-section">
    <div class="section-heading">
      <div><span>02</span><h2>Tamaños</h2></div>
      <p>Cuatro anchos para adaptar el diálogo a la complejidad del contenido.</p>
    </div>

    <AppCard title="sm, md, lg y xl" subtitle="Todos conservan el ancho disponible en pantallas pequeñas" :icon="Maximize2">
      <div class="component-row">
        <AppButton v-for="size in (['sm', 'md', 'lg', 'xl'] as ModalSize[])" :key="size"
          variant="soft" :data-testid="'open-size-' + size" @click="openSize(size)">
          Tamaño {{ size }}
        </AppButton>
      </div>
    </AppCard>

    <DocsCodeBlock :code="modalExamples.sizes" />

    <AppModal v-model="sizeOpen" :size="activeSize" :title="'Modal tamaño ' + activeSize">
      <p>Este panel usa el ancho <strong>{{ activeSize }}</strong>. El contenido sigue siendo fluido y se ajusta al viewport.</p>
      <template #footer><AppButton @click="sizeOpen = false">Entendido</AppButton></template>
    </AppModal>
  </section>

  <section class="component-section">
    <div class="section-heading">
      <div><span>03</span><h2>Posición y fondo estático</h2></div>
      <p>Alinea el panel arriba o exige una acción explícita antes de cerrarlo.</p>
    </div>

    <div class="card-grid">
      <AppCard title="Alineado arriba" subtitle="centered = false" :icon="AlignVerticalJustifyCenter">
        <p>Útil cuando el contenido debe aparecer cerca del inicio del viewport.</p>
        <template #footer><AppButton variant="soft" @click="topOpen = true">Ver variante</AppButton></template>
      </AppCard>

      <AppCard title="Fondo estático" subtitle="No cierra con fondo ni Escape" :icon="ShieldAlert" icon-color="warning">
        <p>Indicado para procesos que necesitan una decisión mediante los botones del diálogo.</p>
        <template #footer>
          <AppButton data-testid="open-persistent-modal" variant="soft" color="warning" @click="persistentOpen = true">
            Ver variante
          </AppButton>
        </template>
      </AppCard>
    </div>

    <DocsCodeBlock :code="modalExamples.behavior" />

    <AppModal v-model="topOpen" :centered="false" title="Modal alineado arriba">
      <p>El panel conserva un margen superior y permite desplazar el fondo del diálogo si el contenido crece.</p>
      <template #footer><AppButton @click="topOpen = false">Cerrar</AppButton></template>
    </AppModal>

    <AppModal
      v-model="persistentOpen"
      title="Confirma tu decisión"
      description="Selecciona una opción para continuar."
      :icon="ShieldAlert"
      tone="warning"
      :close-on-backdrop="false"
      :close-on-escape="false"
    >
      <p>El fondo y la tecla Escape no cierran esta variante. El usuario debe elegir una acción visible.</p>
      <template #footer>
        <AppButton variant="ghost" color="neutral" @click="persistentOpen = false">Volver</AppButton>
        <AppButton color="warning" @click="persistentOpen = false">Continuar</AppButton>
      </template>
    </AppModal>
  </section>

  <section class="component-section">
    <div class="section-heading">
      <div><span>04</span><h2>Contenido desplazable</h2></div>
      <p>El encabezado y las acciones permanecen visibles mientras se desplaza el cuerpo.</p>
    </div>

    <AppCard title="Historial del proyecto" subtitle="Cuerpo con scroll independiente" :icon="FileClock" icon-color="info">
      <p>Adecuado para historiales, condiciones o formularios largos.</p>
      <template #footer>
        <AppButton variant="soft" color="info" @click="scrollOpen = true">Abrir historial</AppButton>
      </template>
    </AppCard>

    <DocsCodeBlock :code="modalExamples.scrollable" />

    <AppModal v-model="scrollOpen" scrollable size="lg" title="Historial del proyecto" :icon="FileClock" tone="info">
      <div class="modal-history">
        <article v-for="item in 12" :key="item">
          <strong>Actualización {{ 13 - item }}</strong>
          <span>Se registró un cambio en la configuración y se notificó al equipo responsable.</span>
        </article>
      </div>
      <template #footer><AppButton @click="scrollOpen = false">Listo</AppButton></template>
    </AppModal>
  </section>

  <section class="component-section">
    <div class="section-heading">
      <div><span>05</span><h2>Confirmación crítica</h2></div>
      <p>Icono y tono semántico para comunicar el impacto de la acción.</p>
    </div>

    <AppCard title="Eliminar un proyecto" subtitle="Patrón de confirmación destructiva" :icon="TriangleAlert" icon-color="danger">
      <p>Reserva este patrón para acciones con consecuencias claras y difíciles de revertir.</p>
      <p v-if="lastAction" class="modal-action-status" role="status">{{ lastAction }}</p>
      <template #footer>
        <AppButton data-testid="open-confirm-modal" color="danger" @click="confirmOpen = true">Eliminar proyecto</AppButton>
      </template>
    </AppCard>

    <DocsCodeBlock :code="modalExamples.confirmation" />

    <AppModal
      v-model="confirmOpen"
      size="sm"
      title="Eliminar proyecto"
      description="Esta acción no se puede deshacer."
      :icon="TriangleAlert"
      tone="danger"
      initial-focus="[data-cancel-delete]"
    >
      <p>Se eliminarán el proyecto de demostración y todos sus datos asociados.</p>
      <template #footer>
        <AppButton data-cancel-delete variant="ghost" color="neutral" @click="confirmOpen = false">Cancelar</AppButton>
        <AppButton color="danger" @click="confirmDelete">Eliminar</AppButton>
      </template>
    </AppModal>
  </section>

  <section class="component-section">
    <div class="section-heading">
      <div><span>06</span><h2>Prueba interactiva</h2></div>
      <p>Combina tamaño, color, posición, scroll y opciones de cierre.</p>
    </div>

    <div class="showcase-panel docs-modal-controls">
      <div class="form-showcase">
        <AppField label="Tamaño" for-id="modal-demo-size">
          <select id="modal-demo-size" v-model="interactiveSize" class="app-control app-control--md">
            <option value="sm">sm</option><option value="md">md</option>
            <option value="lg">lg</option><option value="xl">xl</option>
          </select>
        </AppField>
        <AppField label="Color del icono" for-id="modal-demo-tone">
          <select id="modal-demo-tone" v-model="interactiveTone" class="app-control app-control--md">
            <option value="default">default</option><option value="primary">primary</option>
            <option value="success">success</option><option value="info">info</option>
            <option value="warning">warning</option><option value="danger">danger</option>
          </select>
        </AppField>
      </div>
      <div class="component-row">
        <AppCheckbox v-model="interactiveCentered" label="Centrado" />
        <AppCheckbox v-model="interactiveScrollable" label="Cuerpo desplazable" />
        <AppCheckbox v-model="interactiveBackdrop" label="Cerrar con fondo" />
        <AppCheckbox v-model="interactiveEscape" label="Cerrar con Escape" />
        <AppCheckbox v-model="interactiveClose" label="Mostrar cierre" />
      </div>
      <div><AppButton data-testid="open-interactive-modal" @click="interactiveOpen = true">Probar configuración</AppButton></div>
    </div>

    <DocsCodeBlock :code="modalExamples.interactive" />

    <AppModal
      v-model="interactiveOpen"
      :size="interactiveSize"
      :tone="interactiveTone"
      :centered="interactiveCentered"
      :scrollable="interactiveScrollable"
      :close-on-backdrop="interactiveBackdrop"
      :close-on-escape="interactiveEscape"
      :show-close="interactiveClose"
      :icon="Maximize2"
      title="Vista previa del modal"
      description="Esta ventana refleja los controles seleccionados."
    >
      <p v-for="paragraph in (interactiveScrollable ? 8 : 1)" :key="paragraph">
        Contenido de demostración {{ paragraph }}. Cambia las opciones y vuelve a abrir para comparar el comportamiento.
      </p>
      <template #footer>
        <AppButton variant="ghost" color="neutral" @click="interactiveOpen = false">Cancelar</AppButton>
        <AppButton @click="interactiveOpen = false">Aceptar</AppButton>
      </template>
    </AppModal>
  </section>
  <DocsModalReference />
</template>
