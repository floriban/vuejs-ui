<script setup lang="ts">
import { ref } from 'vue'
import DocsCodeBlock from '../components/docs/DocsCodeBlock.vue'
import DocsPageHeader from '../components/docs/DocsPageHeader.vue'
import DocsApiReference from '../components/docs/DocsApiReference.vue'
import AppAutocomplete, { type AutocompleteOption } from '../components/ui/AppAutocomplete.vue'
import AppCard from '../components/ui/AppCard.vue'
import AppField from '../components/ui/AppField.vue'
const countries: AutocompleteOption[] = [
  { label: 'Lima, Perú', value: 'lim', description: 'Aeropuerto Jorge Chávez' }, { label: 'Cusco, Perú', value: 'cuz', description: 'Aeropuerto Alejandro Velasco Astete' }, { label: 'Arequipa, Perú', value: 'aqp', description: 'Aeropuerto Rodríguez Ballón' }, { label: 'Bogotá, Colombia', value: 'bog', description: 'Aeropuerto El Dorado' }, { label: 'Santiago, Chile', value: 'scl', description: 'Aeropuerto Arturo Merino Benítez' }, { label: 'Buenos Aires, Argentina', value: 'bue', description: 'Todos los aeropuertos' },
]
const query = ref(''); const selected = ref<AutocompleteOption>(); const minChars = ref(0)
const code = `<AppAutocomplete v-model="city" :options="cities" placeholder="Busca una ciudad" @select="onSelect" />`
const properties = [
  ['v-model', 'string', "''", 'Texto escrito o etiqueta seleccionada.'],
  ['options', 'AutocompleteOption[]', 'requerido', 'Sugerencias disponibles.'],
  ['placeholder', 'string', '—', 'Ayuda dentro del campo.'],
  ['minChars', 'number', '0', 'Caracteres necesarios para mostrar resultados.'],
  ['size', 'sm | md | lg', 'md', 'Tamaño del control.'],
  ['disabled', 'boolean', 'false', 'Deshabilita la entrada.'],
  ['invalid', 'boolean', 'false', 'Expone el estado inválido.'],
  ['noResultsText', 'string', 'Sin resultados', 'Mensaje cuando no hay coincidencias.'],
] as const
</script>
<template>
  <DocsPageHeader eyebrow="Formularios / Autocomplete" title="Input Autocomplete" description="Entrada con sugerencias filtradas, navegación por teclado y selección accesible." />
  <section class="component-section"><div class="section-heading"><div><span>01</span><h2>Sugerencias</h2></div><p>Filtra por nombre y descripción.</p></div><AppCard title="Buscar destino"><div class="narrow-showcase"><AppField label="Destino" for-id="autocomplete-basic"><AppAutocomplete id="autocomplete-basic" v-model="query" :options="countries" placeholder="Escribe una ciudad" @select="selected = $event" /></AppField><div class="docs-value-preview">Selección: <strong>{{ selected?.label ?? 'Ninguna' }}</strong></div></div></AppCard><DocsCodeBlock :code="code" /></section>
  <section class="component-section"><div class="section-heading"><div><span>02</span><h2>Prueba interactiva</h2></div><p>Controla el mínimo de caracteres.</p></div><div class="showcase-panel form-showcase"><AppField label="Buscar" for-id="autocomplete-demo"><AppAutocomplete id="autocomplete-demo" v-model="query" :options="countries" :min-chars="minChars" placeholder="Ciudad o aeropuerto" @select="selected = $event" /></AppField><AppField label="Mínimo de caracteres"><select v-model.number="minChars" class="app-control app-control--md"><option :value="0">Mostrar al enfocar</option><option :value="1">1 carácter</option><option :value="2">2 caracteres</option><option :value="3">3 caracteres</option></select></AppField></div></section>
  <DocsApiReference component-name="AppAutocomplete" :rows="properties" note="Emite select con la opción completa y permite navegar con flechas, Enter y Escape." />
</template>
