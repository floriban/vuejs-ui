<script setup lang="ts">
import AppTable from '../ui/AppTable.vue'

const properties = [
  ['status', "'info' | 'success' | 'warning' | 'danger' | 'error'", "'info'", 'Selecciona el color y el icono. error comparte la apariencia de danger.'],
  ['variant', "'soft' | 'solid' | 'outline'", "'soft'", 'Fondo suave, fondo sólido o borde.'],
  ['title', 'string', 'undefined', 'Encabezado opcional. Si se omite, solo se muestra el contenido del slot.'],
  ['closable', 'boolean', 'false', 'Muestra el botón que oculta esta instancia de la alerta.'],
]
</script>

<template>
  <section class="component-section">
    <div class="section-heading">
      <div><span>06</span><h2>Referencia de AppAlert</h2></div>
      <p>Propiedades, cierre y contenido.</p>
    </div>
    <div class="showcase-panel docs-reference">
      <AppTable label="Propiedades de AppAlert" compact>
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
      <h3>Eventos y atributos</h3>
      <p>AppAlert no declara eventos personalizados: no emite <code>close</code> ni <code>update:modelValue</code>. Los atributos y listeners heredados se aplican al contenedor visible. Un <code>@click</code> en el contenedor no equivale a un evento de cierre.</p>
      <h3>Cierre y visibilidad</h3>
      <p>La visibilidad se guarda dentro de cada instancia. El botón «Cerrar alerta» la oculta y retira su contenido del DOM. Cambiar <code>status</code>, <code>variant</code> o <code>closable</code> no la vuelve a abrir. Para mostrarla de nuevo, el padre puede recrearla con una nueva <code>key</code> o desmontarla y montarla con <code>v-if</code>. No tiene temporizador ni cierre automático.</p>
      <h3>Slot por defecto</h3>
      <p>Acepta texto, HTML o componentes para el cuerpo del mensaje. No expone propiedades de slot ni slots con nombre. <code>title</code> es texto; los iconos de estado son internos y proceden de Lucide.</p>
      <h3>Uso accesible</h3>
      <ul>
        <li>El contenedor usa <code>role="alert"</code>. Para avisos no urgentes puede pasarse <code>role="status"</code> como atributo.</li>
        <li>Explica el estado con texto: no dependas únicamente del color o del icono.</li>
        <li>Los iconos decorativos están ocultos a lectores de pantalla. El botón de cierre tiene la etiqueta «Cerrar alerta» y admite Enter y Espacio.</li>
        <li>Si el usuario cierra una alerta con teclado, el componente padre debe gestionar el destino del foco cuando el flujo lo requiera; AppAlert no lo restaura.</li>
        <li>Las demostraciones usan <code>role="status"</code> para que los cambios del selector sean avisos no urgentes.</li>
      </ul>
    </div>
  </section>
</template>
