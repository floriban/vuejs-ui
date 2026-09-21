<script setup lang="ts">
import { ref } from 'vue'
import { Copy, Search, Send } from '@lucide/vue'
import DocsApiReference from '../components/docs/DocsApiReference.vue'
import DocsCodeBlock from '../components/docs/DocsCodeBlock.vue'
import DocsPageHeader from '../components/docs/DocsPageHeader.vue'
import AppButton from '../components/ui/AppButton.vue'
import AppField from '../components/ui/AppField.vue'
import AppInput from '../components/ui/AppInput.vue'
import AppInputGroup from '../components/ui/AppInputGroup.vue'
import AppSelect from '../components/ui/AppSelect.vue'

const search = ref('')
const email = ref('')
const amount = ref<number | string>('')
const documentType = ref('dni')
const documentNumber = ref('')
const country = ref('pe')
const phone = ref('')
const copied = ref(false)
const documentOptions = [
  { value: 'dni', label: 'DNI' },
  { value: 'ce', label: 'C. extranjería' },
  { value: 'passport', label: 'Pasaporte' },
]
const countryOptions = [
  { value: 'pe', label: 'PE +51' },
  { value: 'co', label: 'CO +57' },
  { value: 'mx', label: 'MX +52' },
]
const basicCode = `<AppInputGroup>
  <span class="app-input-group__addon">S/</span>
  <AppInput v-model="amount" type="number" />
  <span class="app-input-group__addon">PEN</span>
</AppInputGroup>`
const mixedCode = `<AppInputGroup class="app-input-group--responsive">
  <AppSelect v-model="documentType" :options="documentOptions" />
  <AppInput v-model="documentNumber" placeholder="Número de documento" />
  <AppButton>Consultar</AppButton>
</AppInputGroup>`
const rows = [
  ['size', 'sm | md | lg', 'md', 'Alinea la altura de complementos y controles.'],
  ['disabled', 'boolean', 'false', 'Desactiva la interacción de todo el grupo.'],
  ['invalid', 'boolean', 'false', 'Aplica el estado de error al conjunto.'],
  ['default slot', 'VNode[]', '—', 'Acepta inputs, selects, botones y complementos.'],
] as const
</script>

<template>
  <DocsPageHeader eyebrow="Formularios / Input Group" title="Input Group" description="Agrupa campos, complementos y acciones que forman una sola entrada de datos." />

  <section class="component-section">
    <div class="section-heading"><div><span>01</span><h2>Complementos</h2></div><p>Contexto antes o después del valor sin ocupar otra línea.</p></div>
    <div class="showcase-panel grid grid-cols-1 md:grid-cols-2 gap-6">
      <AppField label="Importe" for-id="group-amount" help="El importe será registrado en soles.">
        <AppInputGroup><span class="app-input-group__addon">S/</span><AppInput id="group-amount" v-model="amount" type="number" placeholder="0.00" /><span class="app-input-group__addon">PEN</span></AppInputGroup>
      </AppField>
      <AppField label="Correo corporativo" for-id="group-email">
        <AppInputGroup><AppInput id="group-email" v-model="email" placeholder="usuario" /><span class="app-input-group__addon">@empresa.com</span></AppInputGroup>
      </AppField>
    </div>
    <DocsCodeBlock :code="basicCode" />
  </section>

  <section class="component-section">
    <div class="section-heading"><div><span>02</span><h2>Input con acción</h2></div><p>El botón ejecuta una acción directamente relacionada con el valor.</p></div>
    <div class="showcase-panel grid grid-cols-1 md:grid-cols-2 gap-6">
      <AppField label="Buscar productos" for-id="group-search">
        <AppInputGroup><AppInput id="group-search" v-model="search" type="search" placeholder="Nombre o código" /><AppButton aria-label="Buscar"><Search :size="17" />Buscar</AppButton></AppInputGroup>
      </AppField>
      <AppField label="Enlace para compartir" for-id="group-copy" :help="copied ? 'Enlace copiado.' : 'Copia el enlace con una sola acción.'">
        <AppInputGroup><AppInput id="group-copy" model-value="https://app.dev/invitacion/72A" readonly /><AppButton color="neutral" aria-label="Copiar enlace" @click="copied = true"><Copy :size="17" />Copiar</AppButton></AppInputGroup>
      </AppField>
    </div>
  </section>

  <section class="component-section">
    <div class="section-heading"><div><span>03</span><h2>Select + input</h2></div><p>Controles relacionados que se completan como una sola unidad.</p></div>
    <div class="showcase-panel grid grid-cols-1 md:grid-cols-2 gap-6">
      <AppField label="Documento" for-id="group-document">
        <AppInputGroup class="app-input-group--responsive"><AppSelect v-model="documentType" :options="documentOptions" aria-label="Tipo de documento" /><AppInput id="group-document" v-model="documentNumber" placeholder="Número de documento" /><AppButton>Consultar</AppButton></AppInputGroup>
      </AppField>
      <AppField label="Teléfono" for-id="group-phone">
        <AppInputGroup><AppSelect v-model="country" :options="countryOptions" aria-label="País y prefijo" /><AppInput id="group-phone" v-model="phone" type="tel" placeholder="999 123 456" /></AppInputGroup>
      </AppField>
    </div>
    <DocsCodeBlock :code="mixedCode" />
  </section>

  <section class="component-section">
    <div class="section-heading"><div><span>04</span><h2>Tamaños y estados</h2></div><p>Variantes alineadas con los demás controles del sistema.</p></div>
    <div class="showcase-panel grid grid-cols-1 md:grid-cols-3 gap-6">
      <AppField v-for="size in (['sm', 'md', 'lg'] as const)" :key="size" :label="`Tamaño ${size}`" :for-id="`group-${size}`"><AppInputGroup :size="size"><span class="app-input-group__addon">https://</span><AppInput :id="`group-${size}`" :size="size" placeholder="dominio.com" /></AppInputGroup></AppField>
      <AppField label="Deshabilitado" for-id="group-disabled"><AppInputGroup disabled><span class="app-input-group__addon">S/</span><AppInput id="group-disabled" model-value="120.00" disabled /></AppInputGroup></AppField>
      <AppField label="Con error" for-id="group-invalid" error="Ingresa un destinatario válido." v-slot="{ invalid, describedBy }"><AppInputGroup :invalid="invalid"><AppInput id="group-invalid" model-value="correo-incompleto" :invalid="invalid" :aria-describedby="describedBy" /><AppButton><Send :size="17" />Enviar</AppButton></AppInputGroup></AppField>
    </div>
  </section>

  <DocsApiReference component-name="AppInputGroup" :rows="rows" index="05" note="Mantén una sola etiqueta visible para el valor principal. Los selects y botones auxiliares deben tener aria-label cuando su propósito no sea evidente." />
</template>
