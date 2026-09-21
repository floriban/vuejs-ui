<script setup lang="ts">
import { ref } from 'vue'
import AppEditor from '../components/ui/AppEditor.vue'
import DocsPageHeader from '../components/docs/DocsPageHeader.vue'
import DocsCodeBlock from '../components/docs/DocsCodeBlock.vue'
import DocsApiReference from '../components/docs/DocsApiReference.vue'
const initial = '<h2>Una experiencia hecha a tu medida</h2><p>Prepara descripciones de productos, comunicaciones y notas con un <strong>editor completo</strong> integrado en tu aplicación.</p><ul><li>Da formato al texto con la barra de herramientas.</li><li>Organiza tus ideas con listas, enlaces y tablas.</li><li>Prueba también el modo oscuro.</li></ul><blockquote><p>Selecciona un texto para ver sus formatos activos.</p></blockquote>'
const content = ref(initial)
const disabled = ref(false)
const rows = [['v-model', 'string', '—', 'Contenido HTML sincronizado en ambas direcciones.'], ['disabled', 'boolean', 'false', 'Activa solo lectura y deshabilita las herramientas.'], ['placeholder', 'string', 'Escribe aquí…', 'Texto orientativo cuando el editor está vacío.'], ['label', 'string', 'Editor de texto', 'Nombre accesible del área de edición.']] as const
const code = '<AppEditor v-model="content" label="Descripción del producto" placeholder="Describe tu producto…" />'
</script>
<template>
  <DocsPageHeader eyebrow="Formularios / Editor" title="Editor de texto" description="Tiptap con barra de herramientas de estilo clásico, iconos Lucide y controles en español." />
  <section class="component-section"><div class="section-heading"><div><span>01</span><h2>Edición visual</h2></div><div class="editor-demo-actions"><label><input v-model="disabled" type="checkbox" /> Solo lectura</label><button type="button" class="dashboard-action" @click="content = initial">Restablecer ejemplo</button></div></div><AppEditor v-model="content" :disabled="disabled" label="Contenido de ejemplo" /></section>
  <section class="component-section"><div class="section-heading"><div><span>02</span><h2>Contenido HTML</h2></div><p>El modelo se actualiza mientras escribes.</p></div><DocsCodeBlock :code="content" /></section>
  <DocsCodeBlock :code="code" /><DocsApiReference component-name="AppEditor" :rows="rows" note="Los enlaces aceptan http, https y mailto. Al guardar y mostrar HTML fuera del editor, sanitízalo en el servidor según las reglas de tu aplicación." />
</template>
