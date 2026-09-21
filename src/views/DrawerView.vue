<script setup lang="ts">
import { ref } from 'vue'
import AppDrawer from '../components/ui/AppDrawer.vue'
import AppButton from '../components/ui/AppButton.vue'
import AppInput from '../components/ui/AppInput.vue'
import AppField from '../components/ui/AppField.vue'
import DocsPageHeader from '../components/docs/DocsPageHeader.vue'
import DocsCodeBlock from '../components/docs/DocsCodeBlock.vue'
import DocsApiReference from '../components/docs/DocsApiReference.vue'
const open = ref(false)
const placement = ref<'left' | 'right' | 'top' | 'bottom'>('right')
const size = ref<'sm' | 'md' | 'lg'>('md')
const backdrop = ref(true)
const escape = ref(true)
const name = ref('')
const saved = ref('')
const sides = [{ value: 'left', label: 'Izquierda' }, { value: 'right', label: 'Derecha' }, { value: 'top', label: 'Arriba' }, { value: 'bottom', label: 'Abajo' }] as const
const rows = [['v-model', 'boolean', 'false', 'Abre o cierra el panel.'], ['placement', 'left | right | top | bottom', 'right', 'Borde de aparición.'], ['size', 'sm | md | lg', 'md', 'Ancho lateral o altura vertical.'], ['title / description', 'string', '—', 'Nombre accesible y descripción del panel.'], ['closeOnBackdrop / closeOnEscape', 'boolean', 'true', 'Permite configurar el cierre.']] as const
const code = '<AppDrawer v-model="open" title="Editar cliente" placement="right" size="md">\n  <AppInput v-model="name" aria-label="Nombre" />\n</AppDrawer>'
</script>
<template>
  <DocsPageHeader eyebrow="Feedback y capas / Drawer" title="Drawer" description="Paneles laterales para detalles, filtros o edición sin perder el contexto de la página." />
  <section class="component-section"><div class="section-heading"><div><span>01</span><h2>Posiciones y tamaños</h2></div><p>El foco permanece dentro del panel y regresa al control que lo abrió.</p></div><div class="showcase-panel space-y-6"><div class="flex flex-wrap gap-3"><AppButton v-for="side in sides" :key="side.value" @click="placement = side.value; open = true">{{ side.label }}</AppButton></div><label class="app-field">Tamaño<select v-model="size" class="app-control app-control--md"><option value="sm">Pequeño</option><option value="md">Mediano</option><option value="lg">Grande</option></select></label><div class="flex flex-wrap gap-6"><label><input v-model="backdrop" type="checkbox" /> Cerrar al pulsar fuera</label><label><input v-model="escape" type="checkbox" /> Cerrar con Escape</label></div><p v-if="saved" role="status">Nombre guardado en esta demo: {{ saved }}</p></div></section>
  <DocsCodeBlock :code="code" /><DocsApiReference component-name="AppDrawer" :rows="rows" note="Slots: contenido y footer. Eventos: open y close(reason). El diálogo modal nativo bloquea la interacción con el fondo." />
  <AppDrawer v-model="open" title="Editar cliente" description="Prueba un formulario dentro del panel." :placement="placement" :size="size" :close-on-backdrop="backdrop" :close-on-escape="escape"><AppField label="Nombre del cliente" for-id="drawer-name"><AppInput id="drawer-name" v-model="name" placeholder="Ej. Ana Torres" /></AppField><p class="mt-6">El contenido tiene desplazamiento independiente cuando supera el espacio disponible.</p><template #footer><AppButton variant="ghost" @click="open = false">Cancelar</AppButton><AppButton :disabled="!name.trim()" @click="saved = name; open = false">Guardar</AppButton></template></AppDrawer>
</template>
