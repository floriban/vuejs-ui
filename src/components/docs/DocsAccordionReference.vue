<script setup lang="ts">
import AppCard from '../ui/AppCard.vue'
import AppTable from '../ui/AppTable.vue'

const properties = [
  ['v-model', 'string | string[]', "''", 'Elemento abierto o lista de elementos cuando multiple está activo.'],
  ['items', 'AccordionItem[]', 'requerido', 'Lista con value, title, description, icon y disabled.'],
  ['multiple', 'boolean', 'false', 'Permite mantener varios paneles abiertos.'],
  ['collapsible', 'boolean', 'true', 'Permite cerrar el único panel activo.'],
  ['variant', "'default' | 'separated'", "'default'", 'Agrupa los elementos o los presenta como tarjetas separadas.'],
  ['headingLevel', '2 | 3 | 4 | 5 | 6', '3', 'Nivel semántico de los encabezados internos.'],
]
</script>

<template>
  <section class="component-section">
    <div class="section-heading">
      <div><span>06</span><h2>Referencia de AppAccordion</h2></div>
      <p>Propiedades, estructura y navegación accesible.</p>
    </div>
    <AppCard title="API del componente">
      <div class="docs-reference">
        <AppTable label="Propiedades de AppAccordion" compact>
          <thead><tr><th scope="col">Propiedad</th><th scope="col">Tipo</th><th scope="col">Por defecto</th><th scope="col">Descripción</th></tr></thead>
          <tbody><tr v-for="property in properties" :key="property[0]">
            <td><code>{{ property[0] }}</code></td><td><code>{{ property[1] }}</code></td>
            <td><code>{{ property[2] }}</code></td><td>{{ property[3] }}</td>
          </tr></tbody>
        </AppTable>
        <h3>Slots</h3>
        <p>El slot por defecto recibe <code>item</code> y <code>open</code>. El slot <code>title</code> permite reemplazar el encabezado visible conservando el botón accesible.</p>
        <h3>Accesibilidad</h3>
        <p>Cada encabezado contiene un botón con <code>aria-expanded</code> y <code>aria-controls</code>. Flecha arriba y abajo recorren los encabezados; Inicio y Fin saltan a los extremos. Los elementos deshabilitados se omiten.</p>
      </div>
    </AppCard>
  </section>
</template>
