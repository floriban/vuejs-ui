<script setup lang="ts">
import AppCard from '../ui/AppCard.vue'
import AppTable from '../ui/AppTable.vue'

const dropdownProperties = [
  ['v-model', 'boolean', 'false', 'Controla si el menú está abierto.'],
  ['label', 'string', 'requerido', 'Texto del botón o nombre accesible cuando solo contiene un icono.'],
  ['menuLabel', 'string', 'undefined', 'Nombre accesible alternativo del menú.'],
  ['align', "'start' | 'end'", "'start'", 'Alinea el borde del menú respecto del disparador.'],
  ['side', "'top' | 'bottom'", "'bottom'", 'Lado preferido; cambia automáticamente si falta espacio.'],
  ['offset', 'number', '8', 'Separación en píxeles entre botón y menú.'],
  ['disabled', 'boolean', 'false', 'Deshabilita el disparador.'],
  ['closeOnSelect', 'boolean', 'true', 'Cierra después de seleccionar una opción.'],
  ['triggerVariant', 'AppButton variant', "'outline'", 'Variante visual del disparador.'],
  ['triggerColor', 'AppButton color', "'neutral'", 'Color visual del disparador.'],
  ['triggerSize', "'sm' | 'md' | 'lg'", "'md'", 'Tamaño del disparador.'],
  ['iconOnly', 'boolean', 'false', 'Crea un disparador cuadrado y usa label como nombre accesible.'],
]

const itemProperties = [
  ['icon', 'Component', 'undefined', 'Icono Lucide opcional.'],
  ['description', 'string', 'undefined', 'Texto secundario debajo de la etiqueta.'],
  ['shortcut', 'string', 'undefined', 'Atajo visual mostrado a la derecha.'],
  ['disabled', 'boolean', 'false', 'Impide ejecutar la acción.'],
  ['danger', 'boolean', 'false', 'Aplica el estilo de acción destructiva.'],
  ['checked', 'boolean', 'undefined', 'Convierte el elemento en menuitemcheckbox.'],
]
</script>

<template>
  <section class="component-section">
    <div class="section-heading">
      <div><span>06</span><h2>Referencia de Dropdown</h2></div>
      <p>Propiedades, slots, eventos y comportamiento accesible.</p>
    </div>

    <AppCard title="API del componente">
      <div class="docs-reference">
        <h3>AppDropdown</h3>
        <AppTable label="Propiedades de AppDropdown" compact>
          <thead><tr><th scope="col">Propiedad</th><th scope="col">Tipo</th><th scope="col">Por defecto</th><th scope="col">Descripción</th></tr></thead>
          <tbody><tr v-for="property in dropdownProperties" :key="property[0]">
            <td><code>{{ property[0] }}</code></td><td><code>{{ property[1] }}</code></td>
            <td><code>{{ property[2] }}</code></td><td>{{ property[3] }}</td>
          </tr></tbody>
        </AppTable>

        <h3>AppDropdownItem</h3>
        <AppTable label="Propiedades de AppDropdownItem" compact>
          <thead><tr><th scope="col">Propiedad</th><th scope="col">Tipo</th><th scope="col">Por defecto</th><th scope="col">Descripción</th></tr></thead>
          <tbody><tr v-for="property in itemProperties" :key="property[0]">
            <td><code>{{ property[0] }}</code></td><td><code>{{ property[1] }}</code></td>
            <td><code>{{ property[2] }}</code></td><td>{{ property[3] }}</td>
          </tr></tbody>
        </AppTable>

        <h3>Slots y eventos</h3>
        <p><code>trigger</code> personaliza el contenido del botón y el slot por defecto recibe elementos, etiquetas y separadores. AppDropdown emite <code>open</code> y <code>close</code>; AppDropdownItem emite <code>select</code>.</p>

        <h3>Accesibilidad</h3>
        <p>El disparador expone <code>aria-haspopup</code> y <code>aria-expanded</code>. Flechas, Inicio y Fin recorren las acciones; Escape cierra y devuelve el foco. El menú también se cierra al pulsar fuera y cambia de lado cuando no tiene espacio.</p>
      </div>
    </AppCard>
  </section>
</template>
