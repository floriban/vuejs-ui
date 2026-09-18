<script setup lang="ts">
import { computed, ref } from 'vue'
import DocsCodeBlock from '../components/docs/DocsCodeBlock.vue'
import DocsPageHeader from '../components/docs/DocsPageHeader.vue'
import AppCard from '../components/ui/AppCard.vue'
import AppField from '../components/ui/AppField.vue'
import AppInputMask from '../components/ui/AppInputMask.vue'
const value = ref(''); const mask = ref('(000) 000-0000')
const raw = computed(() => value.value.replace(/[^a-záéíóúñ0-9]/gi, ''))
const code = `<AppInputMask v-model="phone" mask="(000) 000-0000" />`
</script>
<template>
  <DocsPageHeader eyebrow="Formularios / Input Mask" title="Input Mask" description="Aplica patrones mientras el usuario escribe teléfonos, documentos, códigos o fechas." />
  <section class="component-section"><div class="section-heading"><div><span>01</span><h2>Patrones</h2></div><p>0 acepta números, A letras y * caracteres alfanuméricos.</p></div><div class="docs-form-component-grid"><AppCard title="Teléfono"><AppField label="Número" for-id="mask-phone"><AppInputMask id="mask-phone" mask="(000) 000-0000" placeholder="(999) 123-4567" /></AppField></AppCard><AppCard title="Código de envío"><AppField label="Código" for-id="mask-code"><AppInputMask id="mask-code" mask="AA-0000-**" placeholder="PE-2048-X9" /></AppField></AppCard></div><DocsCodeBlock :code="code" /></section>
  <section class="component-section"><div class="section-heading"><div><span>02</span><h2>Prueba interactiva</h2></div><p>Cambia el patrón y observa el valor limpio.</p></div><div class="showcase-panel"><div class="form-showcase"><AppField label="Patrón"><select v-model="mask" class="app-control app-control--md" @change="value = ''"><option>(000) 000-0000</option><option>0000-0000-0000-0000</option><option>AA-0000-**</option><option>00/00/0000</option></select></AppField><AppField label="Valor" for-id="mask-demo"><AppInputMask id="mask-demo" v-model="value" :mask="mask" /></AppField></div><div class="docs-value-preview">Valor sin formato: <strong>{{ raw || 'vacío' }}</strong></div></div></section>
</template>