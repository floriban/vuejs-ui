<script setup lang="ts">
import AppCard from '../ui/AppCard.vue'
import AppTable from '../ui/AppTable.vue'

const properties = [
  ['v-model', 'string', "''", 'Valor de la pestaña activa.'],
  ['tabs', 'TabItem[]', 'requerido', 'Lista con value, label, description, icon, badge y disabled.'],
  ['label', 'string', 'requerido', 'Nombre accesible del grupo de pestañas.'],
  ['variant', "'line' | 'pill' | 'boxed'", "'line'", 'Presentación visual de la navegación.'],
  ['orientation', "'horizontal' | 'vertical'", "'horizontal'", 'Dirección visual y teclas de navegación.'],
  ['fitted', 'boolean', 'false', 'Distribuye las pestañas usando todo el ancho disponible.'],
]
</script>

<template>
  <section class="component-section">
    <div class="section-heading">
      <div><span>06</span><h2>Referencia de AppTabs</h2></div>
      <p>Propiedades, datos, slot y navegación accesible.</p>
    </div>
    <AppCard title="API del componente">
      <div class="docs-reference">
        <AppTable label="Propiedades de AppTabs" compact>
          <thead><tr><th scope="col">Propiedad</th><th scope="col">Tipo</th><th scope="col">Por defecto</th><th scope="col">Descripción</th></tr></thead>
          <tbody><tr v-for="property in properties" :key="property[0]">
            <td><code>{{ property[0] }}</code></td><td><code>{{ property[1] }}</code></td>
            <td><code>{{ property[2] }}</code></td><td>{{ property[3] }}</td>
          </tr></tbody>
        </AppTable>
        <h3>Slot por defecto</h3>
        <p>Recibe <code>activeTab</code> con la configuración completa de la pestaña activa. El panel conserva automáticamente sus relaciones <code>aria-controls</code> y <code>aria-labelledby</code>.</p>
        <h3>Accesibilidad</h3>
        <p>Usa los roles <code>tablist</code>, <code>tab</code> y <code>tabpanel</code>. Las flechas cambian la selección automáticamente, Inicio y Fin saltan a los extremos, y las pestañas deshabilitadas se omiten.</p>
      </div>
    </AppCard>
  </section>
</template>
