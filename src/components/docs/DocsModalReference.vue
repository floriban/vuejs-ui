<script setup lang="ts">
import AppCard from '../ui/AppCard.vue'
import AppTable from '../ui/AppTable.vue'

const properties = [
  ['v-model', 'boolean', 'false', 'Controla si el diálogo está abierto.'],
  ['title', 'string', 'requerido', 'Nombre visible y accesible del diálogo.'],
  ['description', 'string', 'undefined', 'Texto secundario enlazado con aria-describedby.'],
  ['size', "'sm' | 'md' | 'lg' | 'xl'", "'md'", 'Ancho máximo del panel.'],
  ['centered', 'boolean', 'true', 'Centra el panel o lo alinea hacia la parte superior.'],
  ['scrollable', 'boolean', 'false', 'Fija la altura y desplaza solamente el cuerpo.'],
  ['closeOnBackdrop', 'boolean', 'true', 'Permite cerrar al pulsar el fondo.'],
  ['closeOnEscape', 'boolean', 'true', 'Permite cerrar con la tecla Escape.'],
  ['showClose', 'boolean', 'true', 'Muestra el botón de cierre del encabezado.'],
  ['initialFocus', 'string', 'undefined', 'Selector CSS del control que recibe el foco inicial.'],
  ['icon', 'Component', 'undefined', 'Icono opcional del encabezado.'],
  ['tone', "'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger'", "'default'", 'Color semántico del icono.'],
]
</script>

<template>
  <section class="component-section">
    <div class="section-heading">
      <div><span>07</span><h2>Referencia de AppModal</h2></div>
      <p>Propiedades, eventos, slots y comportamiento accesible.</p>
    </div>

    <AppCard title="API del componente">
      <div class="docs-reference">
        <AppTable label="Propiedades de AppModal" compact>
          <caption class="sr-only">Propiedades, tipos y valores por defecto de AppModal</caption>
          <thead><tr><th scope="col">Propiedad</th><th scope="col">Tipo</th><th scope="col">Por defecto</th><th scope="col">Descripción</th></tr></thead>
          <tbody>
            <tr v-for="property in properties" :key="property[0]">
              <td><code>{{ property[0] }}</code></td>
              <td><code>{{ property[1] }}</code></td>
              <td><code>{{ property[2] }}</code></td>
              <td>{{ property[3] }}</td>
            </tr>
          </tbody>
        </AppTable>

        <h3>Slots</h3>
        <ul>
          <li><code>default</code>: contenido principal del diálogo.</li>
          <li><code>title</code>: reemplaza el texto del título conservando su relación accesible.</li>
          <li><code>icon</code>: reemplaza el icono recibido por propiedad.</li>
          <li><code>footer</code>: acciones alineadas al final del panel.</li>
        </ul>

        <h3>Eventos</h3>
        <p><code>open</code> se emite al abrir. <code>close</code> informa el motivo: <code>close-button</code>, <code>backdrop</code> o <code>escape</code>. Los cierres realizados por el padre se controlan mediante <code>v-model</code>.</p>

        <h3>Accesibilidad</h3>
        <p>El diálogo usa <code>role="dialog"</code>, bloquea el desplazamiento de la página, mantiene el foco dentro del panel y devuelve el foco al control que lo abrió. Escape y el fondo se pueden desactivar para procesos que requieren una decisión explícita.</p>
      </div>
    </AppCard>
  </section>
</template>
