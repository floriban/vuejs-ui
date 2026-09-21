<script setup lang="ts">
import { ref } from 'vue'
import AppState from '../components/ui/AppState.vue'
import DocsApiReference from '../components/docs/DocsApiReference.vue'
import DocsCodeBlock from '../components/docs/DocsCodeBlock.vue'
import DocsPageHeader from '../components/docs/DocsPageHeader.vue'

const retried = ref(false)
const code = `<AppState
  state="error"
  title="No pudimos cargar los pedidos"
  description="Revisa tu conexión e inténtalo nuevamente."
  action-label="Reintentar"
  @action="reload"
/>`
const rows = [
  ['state', 'loading | empty | error', '—', 'Define la semántica, el icono y el anuncio accesible.'],
  ['title', 'string', 'según estado', 'Título que describe la situación.'],
  ['description', 'string', 'según estado', 'Explica qué ocurre y qué puede hacer el usuario.'],
  ['actionLabel', 'string', '—', 'Muestra una acción para estados vacío o error.'],
  ['icon', 'Component', 'según estado', 'Reemplaza el icono predeterminado.'],
  ['compact', 'boolean', 'false', 'Reduce el espaciado para tarjetas y paneles.'],
] as const
</script>

<template>
  <DocsPageHeader eyebrow="Feedback y capas / Estados" title="Estados de contenido" description="Patrones consistentes para carga, ausencia de datos y errores recuperables." />
  <section class="component-section">
    <div class="section-heading"><div><span>01</span><h2>Estados principales</h2></div><p>Cada estado incluye semántica y mensajes adecuados.</p></div>
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <AppState state="loading" title="Cargando pedidos" description="Consultando la información más reciente." />
      <AppState state="empty" title="Aún no hay pedidos" description="Los nuevos pedidos aparecerán en este espacio." action-label="Crear pedido" />
      <AppState state="error" title="No pudimos cargar los pedidos" description="Revisa tu conexión e inténtalo nuevamente." action-label="Reintentar" @action="retried = true" />
    </div>
    <p v-if="retried" class="docs-value-preview" role="status">La acción de reintento fue ejecutada.</p>
  </section>
  <section class="component-section">
    <div class="section-heading"><div><span>02</span><h2>Variante compacta</h2></div><p>Para tarjetas y zonas secundarias.</p></div>
    <div class="showcase-panel"><AppState state="empty" compact title="No hay actividad reciente" description="La actividad aparecerá cuando se realicen cambios." /></div>
  </section>
  <DocsCodeBlock :code="code" />
  <DocsApiReference component-name="AppState" :rows="rows" note="El estado error usa role=alert; carga y vacío usan role=status. Evita mostrar varios estados simultáneamente para una misma región." />
</template>
