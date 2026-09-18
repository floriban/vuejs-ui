<script setup lang="ts">
import { ref } from 'vue'
import { Bell, CreditCard, LayoutDashboard, Settings, Shield, UserRound } from '@lucide/vue'
import DocsCodeBlock from '../components/docs/DocsCodeBlock.vue'
import DocsPageHeader from '../components/docs/DocsPageHeader.vue'
import DocsTabsReference from '../components/docs/DocsTabsReference.vue'
import AppCard from '../components/ui/AppCard.vue'
import AppCheckbox from '../components/ui/AppCheckbox.vue'
import AppField from '../components/ui/AppField.vue'
import AppTabs from '../components/ui/AppTabs.vue'
import { tabExamples } from '../docs/tabExamples'
import type { TabItem } from '../types/tabs'

const standardTabs: TabItem[] = [
  { value: 'overview', label: 'Resumen' },
  { value: 'activity', label: 'Actividad' },
  { value: 'settings', label: 'Configuración' },
]

const richTabs: TabItem[] = [
  { value: 'profile', label: 'Perfil', description: 'Datos personales', icon: UserRound },
  { value: 'security', label: 'Seguridad', description: 'Acceso y sesiones', icon: Shield, badge: 2 },
  { value: 'notifications', label: 'Notificaciones', icon: Bell, badge: 8 },
  { value: 'billing', label: 'Facturación', icon: CreditCard, disabled: true },
]

const content: Record<string, string> = {
  overview: 'Consulta un resumen general de la cuenta y su actividad reciente.',
  activity: 'Revisa cambios, inicios de sesión y operaciones realizadas.',
  settings: 'Modifica el idioma, la zona horaria y otras preferencias.',
  profile: 'Actualiza el nombre, la fotografía y los datos públicos del perfil.',
  security: 'Administra la contraseña, sesiones abiertas y verificación en dos pasos.',
  notifications: 'Elige qué eventos deben enviarse por correo o notificación push.',
  billing: 'Consulta facturas, métodos de pago y datos fiscales.',
}

const basicActive = ref('overview')
const pillActive = ref('overview')
const boxedActive = ref('activity')
const richActive = ref('profile')
const verticalActive = ref('profile')
const interactiveActive = ref('overview')
const interactiveVariant = ref<'line' | 'pill' | 'boxed'>('line')
const interactiveOrientation = ref<'horizontal' | 'vertical'>('horizontal')
const interactiveFitted = ref(false)
</script>

<template>
  <DocsPageHeader eyebrow="Componentes / Tabs" title="Tabs"
    description="Organiza secciones relacionadas y permite cambiar de contexto sin abandonar la página." />

  <section class="component-section">
    <div class="section-heading">
      <div><span>01</span><h2>Pestañas básicas</h2></div>
      <p>Navegación horizontal con indicador activo.</p>
    </div>
    <AppCard title="Configuración de cuenta">
      <AppTabs v-model="basicActive" :tabs="standardTabs" label="Configuración de cuenta">
        <template #default="{ activeTab }">
          <div class="tabs-demo-panel"><h3>{{ activeTab.label }}</h3><p>{{ content[activeTab.value] }}</p></div>
        </template>
      </AppTabs>
    </AppCard>
    <DocsCodeBlock :code="tabExamples.basic" />
  </section>

  <section class="component-section">
    <div class="section-heading">
      <div><span>02</span><h2>Variantes visuales</h2></div>
      <p>Line, pill y boxed para distintos niveles de separación.</p>
    </div>
    <div class="card-grid">
      <AppCard title="Pill">
        <AppTabs v-model="pillActive" :tabs="standardTabs" label="Ejemplo pill" variant="pill">
          <template #default="{ activeTab }"><p>{{ content[activeTab.value] }}</p></template>
        </AppTabs>
      </AppCard>
      <AppCard title="Boxed">
        <AppTabs v-model="boxedActive" :tabs="standardTabs" label="Ejemplo boxed" variant="boxed">
          <template #default="{ activeTab }"><p>{{ content[activeTab.value] }}</p></template>
        </AppTabs>
      </AppCard>
    </div>
    <DocsCodeBlock :code="tabExamples.variants" />
  </section>

  <section class="component-section">
    <div class="section-heading">
      <div><span>03</span><h2>Iconos, badges y deshabilitado</h2></div>
      <p>Información adicional sin perder el patrón de navegación.</p>
    </div>
    <AppCard title="Preferencias" :icon="Settings">
      <AppTabs v-model="richActive" :tabs="richTabs" label="Preferencias con indicadores">
        <template #default="{ activeTab }">
          <div class="tabs-demo-panel"><h3>{{ activeTab.label }}</h3><p>{{ content[activeTab.value] }}</p></div>
        </template>
      </AppTabs>
    </AppCard>
    <DocsCodeBlock :code="tabExamples.rich" />
  </section>

  <section class="component-section">
    <div class="section-heading">
      <div><span>04</span><h2>Orientación vertical</h2></div>
      <p>Útil para configuraciones con varias categorías.</p>
    </div>
    <AppCard title="Centro de configuración" :icon="LayoutDashboard" icon-color="info">
      <AppTabs v-model="verticalActive" :tabs="richTabs" label="Centro de configuración" orientation="vertical">
        <template #default="{ activeTab }">
          <div class="tabs-demo-panel"><h3>{{ activeTab.label }}</h3><p>{{ content[activeTab.value] }}</p></div>
        </template>
      </AppTabs>
    </AppCard>
    <DocsCodeBlock :code="tabExamples.vertical" />
  </section>

  <section class="component-section">
    <div class="section-heading">
      <div><span>05</span><h2>Prueba interactiva</h2></div>
      <p>Combina variante, orientación y distribución completa.</p>
    </div>
    <div class="showcase-panel docs-tabs-controls">
      <div class="form-showcase">
        <AppField label="Variante" for-id="tabs-demo-variant">
          <select id="tabs-demo-variant" v-model="interactiveVariant" class="app-control app-control--md">
            <option value="line">line</option><option value="pill">pill</option><option value="boxed">boxed</option>
          </select>
        </AppField>
        <AppField label="Orientación" for-id="tabs-demo-orientation">
          <select id="tabs-demo-orientation" v-model="interactiveOrientation" class="app-control app-control--md">
            <option value="horizontal">horizontal</option><option value="vertical">vertical</option>
          </select>
        </AppField>
      </div>
      <AppCheckbox v-model="interactiveFitted" label="Ocupar todo el ancho" />
      <AppTabs v-model="interactiveActive" :tabs="standardTabs" label="Vista previa de pestañas"
        :variant="interactiveVariant" :orientation="interactiveOrientation" :fitted="interactiveFitted">
        <template #default="{ activeTab }">
          <div class="tabs-demo-panel"><h3>{{ activeTab.label }}</h3><p>{{ content[activeTab.value] }}</p></div>
        </template>
      </AppTabs>
    </div>
    <DocsCodeBlock :code="tabExamples.interactive" />
  </section>

  <DocsTabsReference />
</template>
