<script setup lang="ts">
import { ref } from 'vue'
import DocsPageHeader from '../components/docs/DocsPageHeader.vue'
import AppCheckbox from '../components/ui/AppCheckbox.vue'
import AppField from '../components/ui/AppField.vue'
import AppInput from '../components/ui/AppInput.vue'
import AppRadioGroup from '../components/ui/AppRadioGroup.vue'
import AppSelect from '../components/ui/AppSelect.vue'
import AppSwitch from '../components/ui/AppSwitch.vue'
import AppTextarea from '../components/ui/AppTextarea.vue'

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
</script>

<template>
  <DocsPageHeader
    eyebrow="Componentes / Formularios"
    title="Formularios"
    description="Controles nativos de Vue con etiquetas, ayuda, validación y estados accesibles."
  />

  <section class="component-section">
    <div class="section-heading">
      <div><span>01</span><h2>Campos básicos</h2></div>
      <p>Controles preparados para trabajar con v-model.</p>
    </div>
    <div class="showcase-panel form-showcase">
      <AppField label="Correo electrónico" for-id="email" help="Lo usaremos para las notificaciones del sistema." required>
        <AppInput id="email" v-model="email" type="email" placeholder="nombre@empresa.com" />
      </AppField>
      <AppField label="Rol del usuario" for-id="role">
        <AppSelect id="role" v-model="role" :options="roleOptions" placeholder="Selecciona un rol" />
      </AppField>
      <AppField label="Descripción" for-id="notes" :error="notes.length > 0 && notes.length < 10 ? 'Escribe al menos 10 caracteres.' : undefined">
        <AppTextarea id="notes" v-model="notes" placeholder="Añade una descripción breve" :invalid="notes.length > 0 && notes.length < 10" />
      </AppField>
      <AppField label="Campo deshabilitado" for-id="disabled-field">
        <AppInput id="disabled-field" model-value="No se puede editar" disabled />
      </AppField>
    </div>
  </section>

  <section class="component-section">
    <div class="section-heading">
      <div><span>02</span><h2>Tamaños</h2></div>
      <p>Alturas consistentes para distintas densidades de interfaz.</p>
    </div>
    <div class="showcase-panel input-sizes">
      <AppField label="Small" for-id="input-sm">
        <AppInput id="input-sm" size="sm" placeholder="Input pequeño" />
      </AppField>
      <AppField label="Medium" for-id="input-md">
        <AppInput id="input-md" size="md" placeholder="Input mediano" />
      </AppField>
      <AppField label="Large" for-id="input-lg">
        <AppInput id="input-lg" size="lg" placeholder="Input grande" />
      </AppField>
    </div>
  </section>

  <section class="component-section">
    <div class="section-heading">
      <div><span>03</span><h2>Selección</h2></div>
      <p>Decisiones binarias con etiquetas claras.</p>
    </div>
    <div class="showcase-panel choice-grid">
      <AppCheckbox id="terms" v-model="accepted" label="Acepto las condiciones" />
      <AppSwitch v-model="notifications" label="Recibir notificaciones" />
    </div>
  </section>

  <section class="component-section">
    <div class="section-heading">
      <div><span>04</span><h2>Radio buttons</h2></div>
      <p>Selección exclusiva entre varias opciones relacionadas.</p>
    </div>
    <div class="showcase-panel">
      <AppRadioGroup
        v-model="access"
        legend="Nivel de acceso"
        name="access-level"
        :options="accessOptions"
        orientation="horizontal"
      />
    </div>
  </section>
</template>
