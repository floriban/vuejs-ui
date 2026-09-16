<script setup lang="ts">
import { computed, ref } from 'vue'
import { ClipboardCheck } from '@lucide/vue'
import DocsPageHeader from '../components/docs/DocsPageHeader.vue'
import DocsCodeBlock from '../components/docs/DocsCodeBlock.vue'
import DocsFormReference from '../components/docs/DocsFormReference.vue'
import AppAlert from '../components/ui/AppAlert.vue'
import AppButton from '../components/ui/AppButton.vue'
import AppCard from '../components/ui/AppCard.vue'
import AppCheckbox from '../components/ui/AppCheckbox.vue'
import AppField from '../components/ui/AppField.vue'
import AppInput from '../components/ui/AppInput.vue'
import AppRadioGroup from '../components/ui/AppRadioGroup.vue'
import AppSelect from '../components/ui/AppSelect.vue'
import AppSwitch from '../components/ui/AppSwitch.vue'
import AppTextarea from '../components/ui/AppTextarea.vue'
import { formExamples } from '../docs/formExamples'

const email = ref('')
const role = ref('')
const notes = ref('')
const accepted = ref(true)
const notifications = ref(false)
const access = ref('editor')

const roleOptions = [
  { label: 'Administrador', value: 'admin' },
  { label: 'Editor', value: 'editor' },
  { label: 'Consulta', value: 'viewer' },
]
const accessOptions = [
  { label: 'Administrador', value: 'admin', description: 'Acceso completo al proyecto.' },
  { label: 'Editor', value: 'editor', description: 'Puede crear y modificar contenido.' },
  { label: 'Consulta', value: 'viewer', description: 'Puede revisar contenido sin editar.' },
]

const demoName = ref('')
const demoEmail = ref('')
const demoRole = ref('')
const demoNotes = ref('')
const demoTerms = ref(false)
const submitted = ref(false)
const demoNameError = computed(() => submitted.value && demoName.value.trim().length < 3 ? 'Escribe al menos 3 caracteres.' : undefined)
const demoEmailError = computed(() => submitted.value && !/^\S+@\S+\.\S+$/.test(demoEmail.value) ? 'Escribe un correo válido.' : undefined)
const demoRoleError = computed(() => submitted.value && !demoRole.value ? 'Selecciona un rol.' : undefined)
const demoTermsError = computed(() => submitted.value && !demoTerms.value ? 'Debes aceptar las condiciones.' : undefined)
const demoValid = computed(() => submitted.value && !demoNameError.value && !demoEmailError.value && !demoRoleError.value && !demoTermsError.value)

function resetDemo() {
  demoName.value = ''
  demoEmail.value = ''
  demoRole.value = ''
  demoNotes.value = ''
  demoTerms.value = false
  submitted.value = false
}
</script>

<template>
  <DocsPageHeader eyebrow="Componentes / Formularios" title="Formularios"
    description="Controles para capturar, validar y describir datos con v-model y asociaciones accesibles." />

  <section class="component-section">
    <div class="section-heading">
      <div><span>01</span><h2>Campos básicos</h2></div>
      <p>Input, select y textarea con etiquetas, ayuda y errores.</p>
    </div>
    <div class="showcase-panel form-showcase">
      <AppField label="Correo electrónico" for-id="email" help="Lo usaremos para las notificaciones del sistema." required
        v-slot="{ describedBy }">
        <AppInput id="email" v-model="email" type="email" placeholder="nombre@empresa.com" required
          :aria-describedby="describedBy" />
      </AppField>
      <AppField label="Rol del usuario" for-id="role">
        <AppSelect id="role" v-model="role" :options="roleOptions" placeholder="Selecciona un rol" />
      </AppField>
      <AppField label="Descripción" for-id="notes"
        :error="notes.length > 0 && notes.length < 10 ? 'Escribe al menos 10 caracteres.' : undefined"
        v-slot="{ describedBy, invalid }">
        <AppTextarea id="notes" v-model="notes" placeholder="Añade una descripción breve"
          :invalid="invalid" :aria-describedby="describedBy" />
      </AppField>
      <AppField label="Campo deshabilitado" for-id="disabled-field">
        <AppInput id="disabled-field" model-value="No se puede editar" disabled />
      </AppField>
    </div>
    <DocsCodeBlock :code="formExamples.basic" />
  </section>

  <section class="component-section">
    <div class="section-heading">
      <div><span>02</span><h2>Tamaños y estados</h2></div>
      <p>Alturas consistentes, solo lectura, bloqueo y error.</p>
    </div>
    <div class="showcase-panel input-sizes">
      <AppField label="Small" for-id="input-sm"><AppInput id="input-sm" size="sm" placeholder="Input pequeño" /></AppField>
      <AppField label="Medium" for-id="input-md"><AppInput id="input-md" size="md" placeholder="Input mediano" /></AppField>
      <AppField label="Large" for-id="input-lg"><AppInput id="input-lg" size="lg" placeholder="Input grande" /></AppField>
      <AppField label="Solo lectura" for-id="input-readonly"><AppInput id="input-readonly" model-value="Se puede seleccionar" readonly /></AppField>
      <AppField label="Deshabilitado" for-id="input-disabled"><AppInput id="input-disabled" model-value="No se puede editar" disabled /></AppField>
      <AppField label="Con error" for-id="input-error" error="Corrige este valor." v-slot="{ describedBy, invalid }">
        <AppInput id="input-error" model-value="Valor incorrecto" :invalid="invalid" :aria-describedby="describedBy" />
      </AppField>
    </div>
    <DocsCodeBlock :code="formExamples.sizes" />
  </section>

  <section class="component-section">
    <div class="section-heading">
      <div><span>03</span><h2>Selección binaria</h2></div>
      <p>Checkbox y switch con etiqueta programática.</p>
    </div>
    <div class="showcase-panel choice-grid">
      <AppCheckbox id="terms" v-model="accepted" label="Acepto las condiciones" />
      <AppSwitch id="notifications" v-model="notifications" label="Recibir notificaciones" />
      <AppCheckbox label="Opción deshabilitada" disabled />
      <AppSwitch label="Switch deshabilitado" disabled />
    </div>
    <DocsCodeBlock :code="formExamples.selection" />
  </section>

  <section class="component-section">
    <div class="section-heading">
      <div><span>04</span><h2>Radio buttons</h2></div>
      <p>Selección exclusiva con título y descripción por opción.</p>
    </div>
    <div class="showcase-panel">
      <AppRadioGroup v-model="access" legend="Nivel de acceso" name="access-level"
        :options="accessOptions" orientation="horizontal" />
    </div>
    <DocsCodeBlock :code="formExamples.radio" />
  </section>

  <section class="component-section">
    <div class="section-heading">
      <div><span>05</span><h2>Formulario interactivo</h2></div>
      <p>Envío, validación, mensajes asociados y restablecimiento.</p>
    </div>
    <AppCard title="Crear usuario" subtitle="Completa los campos obligatorios" :icon="ClipboardCheck">
      <form class="docs-form-demo" novalidate @submit.prevent="submitted = true">
        <div class="form-showcase">
          <AppField label="Nombre" for-id="demo-name" :error="demoNameError" required
            v-slot="{ describedBy, invalid }">
            <AppInput id="demo-name" v-model="demoName" required placeholder="Nombre del usuario"
              :invalid="invalid" :aria-describedby="describedBy" />
          </AppField>
          <AppField label="Correo" for-id="demo-email" :error="demoEmailError" required
            v-slot="{ describedBy, invalid }">
            <AppInput id="demo-email" v-model="demoEmail" type="email" required placeholder="nombre@empresa.com"
              :invalid="invalid" :aria-describedby="describedBy" />
          </AppField>
          <AppField label="Rol" for-id="demo-role" :error="demoRoleError" required
            v-slot="{ describedBy, invalid }">
            <AppSelect id="demo-role" v-model="demoRole" :options="roleOptions" placeholder="Selecciona un rol"
              required :invalid="invalid" :aria-describedby="describedBy" />
          </AppField>
          <AppField label="Notas" for-id="demo-notes" help="Campo opcional." v-slot="{ describedBy }">
            <AppTextarea id="demo-notes" v-model="demoNotes" placeholder="Información adicional"
              :aria-describedby="describedBy" />
          </AppField>
        </div>
        <div>
          <AppCheckbox id="demo-terms" v-model="demoTerms" label="Acepto las condiciones"
            :invalid="Boolean(demoTermsError)" :described-by="demoTermsError ? 'demo-terms-error' : undefined" />
          <p v-if="demoTermsError" id="demo-terms-error" class="app-field__message app-field__message--error">{{ demoTermsError }}</p>
        </div>
        <AppAlert v-if="submitted" :status="demoValid ? 'success' : 'danger'" role="status"
          :title="demoValid ? 'Formulario válido' : 'Revisa los campos'">
          {{ demoValid ? 'Los datos están listos para enviarse.' : 'Corrige los errores indicados antes de continuar.' }}
        </AppAlert>
        <div class="component-row">
          <AppButton type="submit">Validar formulario</AppButton>
          <AppButton type="button" variant="outline" @click="resetDemo">Restablecer</AppButton>
        </div>
      </form>
    </AppCard>
    <DocsCodeBlock :code="formExamples.validation" />
  </section>

  <DocsFormReference />
</template>
