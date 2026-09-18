<script setup lang="ts">
import { ref } from 'vue'
import DocsCodeBlock from '../components/docs/DocsCodeBlock.vue'
import DocsPageHeader from '../components/docs/DocsPageHeader.vue'
import AppButton from '../components/ui/AppButton.vue'
import AppCard from '../components/ui/AppCard.vue'
import AppField from '../components/ui/AppField.vue'
import AppSpinner from '../components/ui/AppSpinner.vue'

type SpinnerType = 'border' | 'dots' | 'pulse'
type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type SpinnerColor = 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'neutral'
const type = ref<SpinnerType>('border'); const size = ref<SpinnerSize>('md'); const color = ref<SpinnerColor>('primary'); const loading = ref(true)
const code = `<AppSpinner type="border" size="md" color="primary" label="Cargando datos" />`
</script>

<template>
  <DocsPageHeader eyebrow="Componentes / Spinners" title="Spinners" description="Indicadores de espera en tres estilos, cinco tamaños y colores semánticos." />
  <section class="component-section"><div class="section-heading"><div><span>01</span><h2>Estilos y tamaños</h2></div><p>Indicadores para controles y bloques de contenido.</p></div><AppCard title="Variantes"><div v-for="kind in (['border','dots','pulse'] as const)" :key="kind" class="component-row docs-spinner-grid"><div v-for="itemSize in (['xs','sm','md','lg','xl'] as const)" :key="itemSize" class="docs-spinner-item"><AppSpinner :type="kind" :size="itemSize" /><span>{{ kind }} · {{ itemSize }}</span></div></div></AppCard><DocsCodeBlock :code="code" /></section>
  <section class="component-section"><div class="section-heading"><div><span>02</span><h2>Prueba interactiva</h2></div><p>Combina estilo, tamaño y color.</p></div><div class="showcase-panel"><div class="form-showcase"><AppField label="Estilo" for-id="spinner-type"><select id="spinner-type" v-model="type" class="app-control app-control--md"><option>border</option><option>dots</option><option>pulse</option></select></AppField><AppField label="Tamaño" for-id="spinner-size"><select id="spinner-size" v-model="size" class="app-control app-control--md"><option>xs</option><option>sm</option><option>md</option><option>lg</option><option>xl</option></select></AppField><AppField label="Color" for-id="spinner-color"><select id="spinner-color" v-model="color" class="app-control app-control--md"><option>primary</option><option>info</option><option>success</option><option>warning</option><option>danger</option><option>neutral</option></select></AppField></div><div class="component-row"><AppSpinner :type="type" :size="size" :color="color" label="Vista previa" /><AppButton :loading="loading" @click="loading = !loading">{{ loading ? 'Procesando' : 'Iniciar proceso' }}</AppButton></div></div></section>
</template>