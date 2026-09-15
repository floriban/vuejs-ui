<script setup lang="ts">
import { ref } from 'vue'
import DocsPageHeader from '../components/docs/DocsPageHeader.vue'
import DocsCodeBlock from '../components/docs/DocsCodeBlock.vue'
import DocsAlertReference from '../components/docs/DocsAlertReference.vue'
import AppAlert from '../components/ui/AppAlert.vue'
import AppButton from '../components/ui/AppButton.vue'
import AppCheckbox from '../components/ui/AppCheckbox.vue'
import AppField from '../components/ui/AppField.vue'
import { alertExamples } from '../docs/alertExamples'

const statuses = [
  { value: 'info', title: 'Información disponible', message: 'Hay una nueva actualización para revisar.' },
  { value: 'success', title: 'Registro guardado', message: 'La información se guardó correctamente.' },
  { value: 'warning', title: 'Revisión pendiente', message: 'Faltan datos antes de publicar el registro.' },
  { value: 'danger', title: 'No se pudo guardar', message: 'Revisa la conexión e inténtalo nuevamente.' },
  { value: 'error', title: 'Error de validación', message: 'Revisa los campos obligatorios. error tiene la misma apariencia que danger.' },
] as const

const status = ref<NonNullable<InstanceType<typeof AppAlert>['$props']['status']>>('info')
const variant = ref<NonNullable<InstanceType<typeof AppAlert>['$props']['variant']>>('soft')
const closable = ref(true)
const showTitle = ref(true)
const alertKey = ref(0)
const dismissibleKey = ref(0)
</script>

<template>
  <DocsPageHeader
    eyebrow="Componentes / Alertas"
    title="Alertas"
    description="Mensajes contextuales con estados y niveles visuales para cada situación."
  />

  <section class="component-section">
    <div class="section-heading">
      <div><span>01</span><h2>Estados</h2></div>
      <p>Información, confirmación, advertencia y error.</p>
    </div>
    <div class="alert-grid showcase-panel">
      <AppAlert v-for="alert in statuses" :key="alert.value" :status="alert.value" :title="alert.title" role="status">
        {{ alert.message }}
      </AppAlert>
    </div>
    <DocsCodeBlock :code="alertExamples.states" />
  </section>

  <section class="component-section">
    <div class="section-heading">
      <div><span>02</span><h2>Variantes</h2></div>
      <p>Distintos niveles de énfasis para el mismo estado.</p>
    </div>
    <div class="alert-grid showcase-panel">
      <AppAlert status="success" variant="soft" title="Soft" role="status">Adecuada para mensajes dentro del contenido.</AppAlert>
      <AppAlert status="success" variant="outline" title="Outline" role="status">Útil cuando el fondo debe mantenerse neutral.</AppAlert>
      <AppAlert status="success" variant="solid" title="Solid" role="status">Mayor énfasis para una confirmación importante.</AppAlert>
    </div>
    <DocsCodeBlock :code="alertExamples.variants" />
  </section>

  <section class="component-section">
    <div class="section-heading">
      <div><span>03</span><h2>Descartable</h2></div>
      <p>Cierra el mensaje y vuelve a mostrarlo.</p>
    </div>
    <div class="showcase-panel docs-alert-demo">
      <AppAlert :key="dismissibleKey" status="info" title="Preferencias actualizadas" closable role="status">
        Puedes cerrar este mensaje cuando termines de leerlo.
      </AppAlert>
      <div><AppButton variant="outline" @click="dismissibleKey++">Volver a mostrar</AppButton></div>
    </div>
    <DocsCodeBlock :code="alertExamples.dismissible" />
  </section>

  <section class="component-section">
    <div class="section-heading">
      <div><span>04</span><h2>Título y contenido</h2></div>
      <p>Mensajes breves o contenido personalizado mediante el slot.</p>
    </div>
    <div class="alert-grid showcase-panel docs-alert-content">
      <AppAlert status="info" role="status">Mensaje breve sin título.</AppAlert>
      <AppAlert status="warning" title="Antes de continuar" role="status">
        <p>Revisa estos datos del registro:</p>
        <ul><li>Nombre y correo de contacto.</li><li>Permisos del usuario.</li></ul>
      </AppAlert>
    </div>
    <DocsCodeBlock :code="alertExamples.content" />
  </section>

  <section class="component-section">
    <div class="section-heading">
      <div><span>05</span><h2>Prueba interactiva</h2></div>
      <p>Combina estados, variantes, título y cierre.</p>
    </div>
    <div class="showcase-panel docs-alert-demo">
      <div class="form-showcase">
        <AppField label="Estado de la alerta" for-id="alert-demo-status">
          <select id="alert-demo-status" v-model="status" class="app-control app-control--md">
            <option v-for="item in statuses" :key="item.value" :value="item.value">{{ item.value }}</option>
          </select>
        </AppField>
        <AppField label="Variante de la alerta" for-id="alert-demo-variant">
          <select id="alert-demo-variant" v-model="variant" class="app-control app-control--md">
            <option value="soft">soft</option><option value="outline">outline</option><option value="solid">solid</option>
          </select>
        </AppField>
      </div>
      <div class="component-row">
        <AppCheckbox v-model="closable" label="Permitir cierre" />
        <AppCheckbox v-model="showTitle" label="Mostrar título" />
      </div>
      <AppAlert :key="alertKey" :status="status" :variant="variant" :closable="closable"
        :title="showTitle ? 'Vista previa de alerta' : undefined" role="status">
        Cambia los controles para explorar las combinaciones.
      </AppAlert>
      <div><AppButton variant="outline" @click="alertKey++">Restablecer alerta</AppButton></div>
      <p class="docs-alert-hint">Si cierras la alerta, pulsa «Restablecer alerta» para verla otra vez con la configuración seleccionada.</p>
    </div>
    <DocsCodeBlock :code="alertExamples.interactive" />
  </section>
  <DocsAlertReference />
</template>
