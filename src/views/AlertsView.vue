<script setup lang="ts">
import DocsPageHeader from '../components/docs/DocsPageHeader.vue'
import AppAlert from '../components/ui/AppAlert.vue'

const statuses = [
  { value: 'info', title: 'Información disponible', message: 'Hay una nueva actualización para revisar.' },
  { value: 'success', title: 'Registro guardado', message: 'La información se guardó correctamente.' },
  { value: 'warning', title: 'Revisión pendiente', message: 'Faltan datos antes de publicar el registro.' },
  { value: 'danger', title: 'No se pudo guardar', message: 'Revisa la conexión e inténtalo nuevamente.' },
] as const
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
      <AppAlert v-for="alert in statuses" :key="alert.value" :status="alert.value" :title="alert.title">
        {{ alert.message }}
      </AppAlert>
    </div>
  </section>

  <section class="component-section">
    <div class="section-heading">
      <div><span>02</span><h2>Variantes</h2></div>
      <p>Distintos niveles de énfasis para el mismo estado.</p>
    </div>
    <div class="alert-grid showcase-panel">
      <AppAlert status="success" variant="soft" title="Soft">Adecuada para mensajes dentro del contenido.</AppAlert>
      <AppAlert status="success" variant="outline" title="Outline">Útil cuando el fondo debe mantenerse neutral.</AppAlert>
      <AppAlert status="success" variant="solid" title="Solid">Mayor énfasis para una confirmación importante.</AppAlert>
    </div>
  </section>

  <section class="component-section">
    <div class="section-heading">
      <div><span>03</span><h2>Descartable</h2></div>
      <p>El usuario puede cerrar mensajes temporales.</p>
    </div>
    <div class="showcase-panel">
      <AppAlert status="info" title="Preferencias actualizadas" closable>
        Puedes cerrar este mensaje cuando termines de leerlo.
      </AppAlert>
    </div>
  </section>
</template>
