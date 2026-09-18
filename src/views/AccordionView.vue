<script setup lang="ts">
import { ref, watch } from 'vue'
import { Bell, CircleHelp, CreditCard, PackageCheck, ShieldCheck, Truck } from '@lucide/vue'
import DocsAccordionReference from '../components/docs/DocsAccordionReference.vue'
import DocsCodeBlock from '../components/docs/DocsCodeBlock.vue'
import DocsPageHeader from '../components/docs/DocsPageHeader.vue'
import AppAccordion from '../components/ui/AppAccordion.vue'
import AppCard from '../components/ui/AppCard.vue'
import AppCheckbox from '../components/ui/AppCheckbox.vue'
import AppField from '../components/ui/AppField.vue'
import { accordionExamples } from '../docs/accordionExamples'
import type { AccordionItem } from '../types/accordion'

const faqItems: AccordionItem[] = [
  { value: 'account', title: '¿Cómo actualizo mi cuenta?', icon: CircleHelp },
  { value: 'security', title: '¿Cómo activo la verificación en dos pasos?', icon: ShieldCheck },
  { value: 'billing', title: '¿Dónde encuentro mis facturas?', icon: CreditCard },
]

const deliveryItems: AccordionItem[] = [
  { value: 'preparation', title: 'Preparación del pedido', description: 'Validación y empaquetado', icon: PackageCheck },
  { value: 'shipping', title: 'Envío', description: 'Traslado hacia el destino', icon: Truck },
  { value: 'notifications', title: 'Notificaciones', description: 'Avisos sobre cada cambio', icon: Bell },
]

const restrictedItems: AccordionItem[] = [
  { value: 'general', title: 'Configuración general' },
  { value: 'permissions', title: 'Permisos del equipo' },
  { value: 'advanced', title: 'Opciones avanzadas', disabled: true },
]

const answers: Record<string, string> = {
  account: 'Abre tu perfil, modifica los datos necesarios y guarda los cambios.',
  security: 'Ve a Seguridad, activa la verificación y registra un segundo método de acceso.',
  billing: 'Las facturas están disponibles en Facturación y pueden descargarse en PDF.',
  preparation: 'Comprobamos los artículos y preparamos un paquete seguro para el transporte.',
  shipping: 'El transportista recoge el pedido y actualiza el seguimiento durante el recorrido.',
  notifications: 'Puedes elegir avisos por correo y notificaciones push desde tus preferencias.',
  general: 'Define el nombre, idioma y zona horaria principal del espacio de trabajo.',
  permissions: 'Asigna roles y permisos de acuerdo con las responsabilidades del equipo.',
  advanced: 'Estas opciones requieren permisos administrativos.',
}

const basicOpen = ref<string | string[]>('account')
const multipleOpen = ref<string | string[]>(['preparation', 'shipping'])
const separatedOpen = ref<string | string[]>('shipping')
const requiredOpen = ref<string | string[]>('general')
const interactiveOpen = ref<string | string[]>('account')
const interactiveMultiple = ref(false)
const interactiveCollapsible = ref(true)
const interactiveVariant = ref<'default' | 'separated'>('default')

watch(interactiveMultiple, (multiple) => {
  interactiveOpen.value = multiple ? ['account'] : 'account'
})
</script>

<template>
  <DocsPageHeader eyebrow="Componentes / Accordion" title="Accordion"
    description="Presenta información progresivamente y permite abrir uno o varios paneles." />

  <section class="component-section">
    <div class="section-heading">
      <div><span>01</span><h2>Apertura única</h2></div>
      <p>Un panel abierto a la vez con cierre opcional.</p>
    </div>
    <AppCard title="Preguntas frecuentes">
      <AppAccordion v-model="basicOpen" :items="faqItems">
        <template #default="{ item }"><p>{{ answers[item.value] }}</p></template>
      </AppAccordion>
    </AppCard>
    <DocsCodeBlock :code="accordionExamples.basic" />
  </section>

  <section class="component-section">
    <div class="section-heading">
      <div><span>02</span><h2>Apertura múltiple</h2></div>
      <p>Mantiene varios paneles visibles para comparar información.</p>
    </div>
    <AppCard title="Estado del envío" subtitle="multiple = true" :icon="Truck">
      <AppAccordion v-model="multipleOpen" :items="deliveryItems" multiple>
        <template #default="{ item }"><p>{{ answers[item.value] }}</p></template>
      </AppAccordion>
    </AppCard>
    <DocsCodeBlock :code="accordionExamples.multiple" />
  </section>

  <section class="component-section">
    <div class="section-heading">
      <div><span>03</span><h2>Elementos separados</h2></div>
      <p>Cada sección se presenta como una tarjeta independiente.</p>
    </div>
    <AppAccordion v-model="separatedOpen" :items="deliveryItems" variant="separated">
      <template #default="{ item }"><p>{{ answers[item.value] }}</p></template>
    </AppAccordion>
    <DocsCodeBlock :code="accordionExamples.separated" />
  </section>

  <section class="component-section">
    <div class="section-heading">
      <div><span>04</span><h2>Panel requerido y deshabilitado</h2></div>
      <p>Conserva siempre una sección abierta y bloquea opciones no disponibles.</p>
    </div>
    <AppCard title="Configuración del espacio">
      <AppAccordion v-model="requiredOpen" :items="restrictedItems" :collapsible="false">
        <template #default="{ item }"><p>{{ answers[item.value] }}</p></template>
      </AppAccordion>
    </AppCard>
    <DocsCodeBlock :code="accordionExamples.required" />
  </section>

  <section class="component-section">
    <div class="section-heading">
      <div><span>05</span><h2>Prueba interactiva</h2></div>
      <p>Alterna el modo, el cierre y la separación de los elementos.</p>
    </div>
    <div class="showcase-panel docs-accordion-controls">
      <div class="form-showcase">
        <AppField label="Variante" for-id="accordion-demo-variant">
          <select id="accordion-demo-variant" v-model="interactiveVariant" class="app-control app-control--md">
            <option value="default">default</option><option value="separated">separated</option>
          </select>
        </AppField>
      </div>
      <div class="component-row">
        <AppCheckbox v-model="interactiveMultiple" label="Permitir varios abiertos" />
        <AppCheckbox v-model="interactiveCollapsible" label="Permitir cerrar todos" />
      </div>
      <AppAccordion v-model="interactiveOpen" :items="faqItems" :multiple="interactiveMultiple"
        :collapsible="interactiveCollapsible" :variant="interactiveVariant">
        <template #default="{ item }"><p>{{ answers[item.value] }}</p></template>
      </AppAccordion>
    </div>
    <DocsCodeBlock :code="accordionExamples.interactive" />
  </section>

  <DocsAccordionReference />
</template>
