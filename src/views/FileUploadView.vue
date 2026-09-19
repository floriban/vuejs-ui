<script setup lang="ts">
import { computed, ref } from 'vue'
import DocsApiReference from '../components/docs/DocsApiReference.vue'
import DocsCodeBlock from '../components/docs/DocsCodeBlock.vue'
import DocsPageHeader from '../components/docs/DocsPageHeader.vue'
import AppButton from '../components/ui/AppButton.vue'
import AppCard from '../components/ui/AppCard.vue'
import AppCheckbox from '../components/ui/AppCheckbox.vue'
import AppField from '../components/ui/AppField.vue'
import AppFileUpload from '../components/ui/AppFileUpload.vue'

const singleFile = ref<File[]>([])
const galleryFiles = ref<File[]>([
  new File([new Uint8Array(128_000)], 'portada-dashboard.png', { type: 'image/png', lastModified: 1 }),
  new File([new Uint8Array(76_000)], 'avatar-equipo.jpg', { type: 'image/jpeg', lastModified: 2 }),
])
const demoFiles = ref<File[]>([])
const accept = ref('image/*,.pdf')
const multiple = ref(true)
const maxSizeMb = ref(2)
const selectionSummary = computed(() => demoFiles.value.length
  ? `${demoFiles.value.length} archivo${demoFiles.value.length === 1 ? '' : 's'} · ${demoFiles.value.map((file) => file.name).join(', ')}`
  : 'Ningún archivo seleccionado')
const code = `<AppFileUpload v-model="files" accept="image/*,.pdf" multiple :max-size-mb="5" :max-files="4" />`
const properties = [
  ['v-model', 'File[]', '[]', 'Archivos aceptados por el componente.'],
  ['accept', 'string', "''", 'Tipos MIME o extensiones permitidas, separados por comas.'],
  ['multiple', 'boolean', 'false', 'Permite mantener más de un archivo.'],
  ['maxSizeMb', 'number', '5', 'Tamaño máximo de cada archivo en megabytes; 0 elimina el límite.'],
  ['maxFiles', 'number', '0', 'Cantidad máxima en modo múltiple; 0 no establece límite.'],
  ['disabled', 'boolean', 'false', 'Bloquea selección, arrastre y eliminación.'],
  ['invalid', 'boolean', 'false', 'Aplica el estado visual inválido desde el formulario.'],
  ['title / description', 'string', 'texto predeterminado', 'Personaliza el mensaje del área de carga.'],
] as const
</script>

<template>
  <DocsPageHeader eyebrow="Formularios / File Upload" title="File Upload"
    description="Carga archivos mediante el selector del sistema o arrastrándolos, con validación y listado accesible." />

  <section class="component-section">
    <div class="section-heading"><div><span>01</span><h2>Archivo único y múltiple</h2></div><p>Usos habituales con restricciones claras.</p></div>
    <div class="docs-file-upload-grid">
      <AppCard title="Documento único" subtitle="PDF de hasta 5 MB">
        <AppFileUpload v-model="singleFile" accept=".pdf,application/pdf" title="Adjunta un documento PDF" />
      </AppCard>
      <AppCard title="Galería de imágenes" subtitle="Selección múltiple con archivos cargados">
        <AppFileUpload v-model="galleryFiles" accept="image/*" multiple :max-files="4" :max-size-mb="3" />
      </AppCard>
    </div>
    <DocsCodeBlock :code="code" />
  </section>

  <section class="component-section">
    <div class="section-heading"><div><span>02</span><h2>Prueba interactiva</h2></div><p>Configura las reglas y prueba selección, arrastre y eliminación.</p></div>
    <div class="showcase-panel docs-file-upload-demo">
      <div class="form-showcase">
        <AppField label="Formatos permitidos" for-id="upload-accept">
          <input id="upload-accept" v-model="accept" class="app-control app-control--md" placeholder="image/*,.pdf" />
        </AppField>
        <AppField label="Tamaño máximo por archivo" for-id="upload-size">
          <select id="upload-size" v-model.number="maxSizeMb" class="app-control app-control--md">
            <option :value="1">1 MB</option><option :value="2">2 MB</option><option :value="5">5 MB</option>
          </select>
        </AppField>
      </div>
      <AppCheckbox v-model="multiple" label="Permitir varios archivos" />
      <AppFileUpload v-model="demoFiles" :accept="accept" :multiple="multiple" :max-size-mb="maxSizeMb"
        :max-files="multiple ? 4 : 1" />
      <div class="docs-value-preview">Selección: <strong>{{ selectionSummary }}</strong></div>
      <div><AppButton variant="outline" color="neutral" size="sm" :disabled="!demoFiles.length" @click="demoFiles = []">Limpiar archivos</AppButton></div>
    </div>
  </section>

  <DocsApiReference component-name="AppFileUpload" :rows="properties"
    note="Emite change con la selección válida, reject con los archivos descartados y remove al quitar un elemento." />
</template>
