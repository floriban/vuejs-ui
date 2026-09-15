<script setup lang="ts">
import AppCard from '../ui/AppCard.vue'
import AppTable from '../ui/AppTable.vue'

const properties = [
  ['striped', 'boolean', 'false', 'Alterna el fondo de las filas pares de tbody.'],
  ['hoverable', 'boolean', 'true', 'Resalta visualmente la fila bajo el cursor; no añade selección ni eventos.'],
  ['compact', 'boolean', 'false', 'Reduce el espaciado vertical de encabezados y celdas.'],
  ['label', 'string', "'Tabla de datos'", 'Nombre accesible de la región que contiene la tabla.'],
]
</script>

<template>
  <section class="component-section">
    <div class="section-heading">
      <div><span>05</span><h2>Referencia de AppTable</h2></div>
      <p>Propiedades, estructura y composición.</p>
    </div>
    <AppCard>
      <template #header><h3>API del componente</h3></template>
      <div class="docs-reference">
        <AppTable label="Propiedades de AppTable" compact>
          <caption class="sr-only">Propiedades, tipos y valores por defecto de AppTable</caption>
          <thead><tr><th scope="col">Propiedad</th><th scope="col">Tipo</th><th scope="col">Por defecto</th><th scope="col">Descripción</th></tr></thead>
          <tbody>
            <tr v-for="property in properties" :key="property[0]">
              <td><code>{{ property[0] }}</code></td><td><code>{{ property[1] }}</code></td>
              <td><code>{{ property[2] }}</code></td><td>{{ property[3] }}</td>
            </tr>
          </tbody>
        </AppTable>
        <h3>Dentro de una tarjeta</h3>
        <p>AppCard aporta el contenedor, encabezado, espaciado y pie. AppTable se coloca en su slot por defecto, dentro del cuerpo. La tabla conserva su estructura y su desplazamiento horizontal independientes.</p>
        <h3>Slot por defecto</h3>
        <p>Recibe los elementos nativos <code>caption</code>, <code>thead</code>, <code>tbody</code> y, si hace falta, <code>tfoot</code>. El padre define filas y columnas. No hay slots con nombre ni propiedades de slot.</p>
        <h3>Eventos y atributos</h3>
        <p>No declara eventos personalizados. Los atributos y listeners heredados se aplican al <code>div</code> exterior, no al elemento <code>table</code>. Para acciones por fila, coloca botones con sus propios listeners dentro de una celda.</p>
        <h3>Datos y estados</h3>
        <p>AppTable no recibe una propiedad de datos: las filas se renderizan en el slot con <code>v-for</code>. La búsqueda, paginación, ordenamiento, carga y selección se implementan en el padre cuando se necesiten. Para un estado vacío, usa una fila con <code>colspan</code> igual al número de columnas.</p>
        <h3>Uso accesible</h3>
        <ul>
          <li>Asigna un <code>label</code> específico a la región y un <code>caption</code> a la tabla; el encabezado de la tarjeta aporta el contexto visual.</li>
          <li>Usa <code>th scope="col"</code> para identificar los encabezados de las columnas.</li>
          <li>La región tiene <code>tabindex="0"</code> y foco visible para acceder al desplazamiento horizontal con teclado.</li>
          <li>Da a cada acción un nombre que identifique el registro, por ejemplo «Ver Portal de clientes».</li>
          <li>El hover es solo un efecto visual; una fila no se convierte en botón al activarlo.</li>
        </ul>
      </div>
      <template #footer><span>AppCard + AppTable</span></template>
    </AppCard>
  </section>
</template>
