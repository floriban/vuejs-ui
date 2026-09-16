<script setup lang="ts">
import { ref } from 'vue'
import { ChartNoAxesCombined, FolderOpen, MessageSquare, RefreshCw, Star, UserRound } from '@lucide/vue'
import DocsPageHeader from '../components/docs/DocsPageHeader.vue'
import DocsCodeBlock from '../components/docs/DocsCodeBlock.vue'
import AppButton from '../components/ui/AppButton.vue'
import AppCard from '../components/ui/AppCard.vue'
import AppCheckbox from '../components/ui/AppCheckbox.vue'
import AppTable from '../components/ui/AppTable.vue'
import { cardExamples } from '../docs/cardExamples'

const favorite = ref(false)
const updates = ref(0)
const showIcon = ref(true)
const showSubtitle = ref(true)
const showToolbar = ref(true)
const variant = ref<'outline' | 'elevated'>('outline')
const iconColor = ref<NonNullable<InstanceType<typeof AppCard>['$props']['iconColor']>>('primary')
const properties = [
  ['variant', "'outline' | 'elevated'", "'outline'", 'Tarjeta con borde o sombra.'],
  ['title', 'string', 'undefined', 'Título del encabezado automático.'],
  ['subtitle', 'string', 'undefined', 'Texto secundario debajo del título.'],
  ['icon', 'Component', 'undefined', 'Componente de icono, por ejemplo un import de Lucide.'],
  ['iconColor', "'primary' | 'neutral' | 'success' | 'info' | 'warning' | 'danger'", "'primary'", 'Color del icono; usa icon-color en el template.'],
]
</script>

<template>
  <DocsPageHeader eyebrow="Componentes / Tarjetas" title="Tarjetas"
    description="Tarjetas con icono, título, subtítulo y acciones, siguiendo la línea visual de los encabezados clásicos." />

  <section class="component-section">
    <div class="section-heading">
      <div><span>01</span><h2>Tarjetas con iconos</h2></div>
      <p>Icono a la izquierda y título con texto secundario.</p>
    </div>
    <div class="card-grid">
      <AppCard title="Perfil de usuario" subtitle="Información de la cuenta" :icon="UserRound">
        <p>Administra la información visible y las preferencias generales de la cuenta.</p>
        <template #footer><span class="status-badge">Cuenta activa</span></template>
      </AppCard>
      <AppCard variant="elevated" title="Actividad del equipo" subtitle="Resumen de esta semana" :icon="ChartNoAxesCombined" icon-color="success">
        <div class="metric"><strong>12</strong><span>proyectos actualizados esta semana</span></div>
        <template #footer><span>Actualizado hoy</span></template>
      </AppCard>
    </div>
    <DocsCodeBlock :code="cardExamples.icon" />
  </section>

  <section class="component-section">
    <div class="section-heading">
      <div><span>02</span><h2>Acciones en el encabezado</h2></div>
      <p>Botones compactos alineados a la derecha.</p>
    </div>
    <AppCard title="Mensajes del equipo" subtitle="Acciones en el encabezado" :icon="MessageSquare">
      <template #toolbar>
        <AppButton icon-only size="sm" variant="soft" color="warning" :aria-pressed="favorite"
          aria-label="Marcar como favorito" @click="favorite = !favorite">
          <Star :size="17" :fill="favorite ? 'currentColor' : 'none'" aria-hidden="true" />
        </AppButton>
        <AppButton icon-only size="sm" variant="soft" aria-label="Actualizar resumen" @click="updates++">
          <RefreshCw :size="17" aria-hidden="true" />
        </AppButton>
      </template>
      <p>Marca esta tarjeta como favorita o actualiza el contador para probar sus acciones.</p>
      <template #footer><span role="status">Actualizaciones: {{ updates }} · {{ favorite ? 'En favoritos' : 'Sin marcar' }}</span></template>
    </AppCard>
    <DocsCodeBlock :code="cardExamples.toolbar" />
  </section>

  <section class="component-section">
    <div class="section-heading">
      <div><span>03</span><h2>Encabezados personalizados</h2></div>
      <p>Slots para adaptar el icono o reemplazar el encabezado completo.</p>
    </div>
    <div class="card-grid">
      <AppCard title="Documentos" subtitle="Icono personalizado" icon-color="info">
        <template #icon><FolderOpen :size="26" /></template>
        <p>El slot del icono permite ajustar su tamaño y presentación.</p>
      </AppCard>
      <AppCard>
        <template #header><h3>Encabezado personalizado</h3><span class="status-badge">Activo</span></template>
        <p>El slot header mantiene el control del contenido completo del encabezado.</p>
      </AppCard>
    </div>
    <DocsCodeBlock :code="cardExamples.custom" />
  </section>

  <section class="component-section">
    <div class="section-heading">
      <div><span>04</span><h2>Prueba interactiva</h2></div>
      <p>Activa los elementos del encabezado y cambia el color del icono.</p>
    </div>
    <div class="showcase-panel docs-card-controls">
      <label class="app-field" for="card-demo-variant"><span class="app-field__label">Variante de tarjeta</span>
        <select id="card-demo-variant" v-model="variant" class="app-control app-control--md"><option>outline</option><option>elevated</option></select>
      </label>
      <label class="app-field" for="card-demo-icon-color"><span class="app-field__label">Color del icono</span>
        <select id="card-demo-icon-color" v-model="iconColor" class="app-control app-control--md">
          <option>primary</option><option>neutral</option><option>success</option>
          <option>info</option><option>warning</option><option>danger</option>
        </select>
      </label>
      <div class="component-row">
        <AppCheckbox v-model="showIcon" label="Mostrar icono" />
        <AppCheckbox v-model="showSubtitle" label="Mostrar subtítulo" />
        <AppCheckbox v-model="showToolbar" label="Mostrar acciones" />
      </div>
    </div>
    <AppCard title="Vista previa de tarjeta" :subtitle="showSubtitle ? 'Resumen de la actividad reciente' : undefined"
      :icon="showIcon ? ChartNoAxesCombined : undefined" :icon-color="iconColor" :variant="variant">
      <template v-if="showToolbar" #toolbar><span class="status-badge">Activo</span></template>
      <p>El cuerpo conserva su espacio independiente del encabezado.</p>
      <template #footer><span>Información complementaria</span></template>
    </AppCard>
  </section>

  <section class="component-section">
    <div class="section-heading">
      <div><span>05</span><h2>Referencia de AppCard</h2></div>
      <p>Propiedades y slots de composición.</p>
    </div>
    <AppCard title="API del componente">
      <div class="docs-reference">
        <AppTable label="Propiedades de AppCard" compact>
          <thead><tr><th scope="col">Propiedad</th><th scope="col">Tipo</th><th scope="col">Por defecto</th><th scope="col">Descripción</th></tr></thead>
          <tbody><tr v-for="property in properties" :key="property[0]">
            <td><code>{{ property[0] }}</code></td><td><code>{{ property[1] }}</code></td>
            <td><code>{{ property[2] }}</code></td><td>{{ property[3] }}</td>
          </tr></tbody>
        </AppTable>
        <h3>Slots</h3>
        <ul>
          <li><code>default</code>: contenido del cuerpo, incluidas tablas y formularios.</li>
          <li><code>icon</code>: icono decorativo; tiene prioridad sobre la propiedad <code>icon</code>.</li>
          <li><code>toolbar</code>: acciones o indicadores a la derecha del encabezado automático.</li>
          <li><code>header</code>: reemplaza todo el encabezado, incluidos icono, título y toolbar automáticos.</li>
          <li><code>footer</code>: contenido opcional del pie.</li>
        </ul>
        <h3>Interacción y accesibilidad</h3>
        <p>AppCard no emite eventos personalizados. El padre controla las acciones de sus botones. Los iconos de encabezado son decorativos y están ocultos a lectores de pantalla; usa el título para comunicar su significado. No coloques controles interactivos en el slot icon. Los botones del toolbar deben tener etiquetas accesibles.</p>
      </div>
    </AppCard>
  </section>
</template>
