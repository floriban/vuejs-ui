<script setup lang="ts">
import AppCard from '../ui/AppCard.vue'
import AppTable from '../ui/AppTable.vue'

const properties = [
  ['AppField', 'label', 'string', '—', 'Etiqueta visual del campo.'],
  ['AppField', 'forId', 'string', 'undefined', 'Id del control asociado; usa for-id en el template.'],
  ['AppField', 'help / error', 'string', 'undefined', 'Mensaje descriptivo o error; error tiene prioridad.'],
  ['AppField', 'required', 'boolean', 'false', 'Muestra el asterisco visual; el control debe recibir required.'],
  ['AppInput', 'type', "'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url'", "'text'", 'Tipo del input nativo.'],
  ['AppInput', 'size', "'sm' | 'md' | 'lg'", "'md'", 'Altura y espaciado.'],
  ['AppInput', 'disabled / readonly / required / invalid', 'boolean', 'false', 'Estados nativos y visual de error.'],
  ['AppTextarea', 'rows', 'number', '4', 'Número inicial de filas.'],
  ['AppTextarea', 'size / disabled / readonly / required / invalid', 'varios', '—', 'Comparte los estados de AppInput.'],
  ['AppSelect', 'options', 'SelectOption[]', '—', 'Opciones con label, value y disabled opcional.'],
  ['AppSelect', 'placeholder', 'string', 'undefined', 'Opción inicial deshabilitada con valor vacío.'],
  ['AppCheckbox', 'label / disabled / describedBy / invalid', 'varios', '—', 'Casilla binaria con id automático y estado accesible.'],
  ['AppSwitch', 'label / disabled / describedBy / invalid', 'varios', '—', 'Interruptor con role switch, id automático y estado accesible.'],
  ['AppRadioGroup', 'options', 'RadioOption[]', '—', 'Opciones con label, value, description y disabled.'],
  ['AppRadioGroup', 'orientation', "'horizontal' | 'vertical'", "'vertical'", 'Distribución visual de las opciones.'],
  ['AppRadioGroup', 'legend / name / disabled / describedBy / invalid', 'varios', '—', 'Nombre del grupo, name compartido, bloqueo y estado accesible.'],
]
</script>

<template>
  <section class="component-section">
    <div class="section-heading">
      <div><span>06</span><h2>Referencia de formularios</h2></div>
      <p>Propiedades, v-model y asociaciones accesibles.</p>
    </div>
    <AppCard title="API de controles">
      <div class="docs-reference">
        <AppTable label="Propiedades de los componentes de formulario" compact>
          <caption class="sr-only">Propiedades, tipos y valores por defecto de los controles de formulario</caption>
          <thead><tr><th scope="col">Componente</th><th scope="col">Propiedad</th><th scope="col">Tipo</th><th scope="col">Por defecto</th><th scope="col">Descripción</th></tr></thead>
          <tbody><tr v-for="property in properties" :key="property.join(':')">
            <td><code>{{ property[0] }}</code></td><td><code>{{ property[1] }}</code></td>
            <td><code>{{ property[2] }}</code></td><td><code>{{ property[3] }}</code></td><td>{{ property[4] }}</td>
          </tr></tbody>
        </AppTable>
        <h3>v-model y eventos</h3>
        <p>AppInput acepta <code>string | number</code>; AppTextarea, AppSelect y AppRadioGroup usan <code>string</code>; AppCheckbox y AppSwitch usan <code>boolean</code>. Todos emiten <code>update:modelValue</code>. Los eventos nativos y atributos no declarados se heredan en el control raíz.</p>
        <h3>AppField y mensajes</h3>
        <p>El slot por defecto expone <code>describedBy</code> e <code>invalid</code>. Pásalos al control para enlazar la ayuda o el error mediante <code>aria-describedby</code> y reflejar <code>aria-invalid</code>. El asterisco de <code>required</code> es visual: añade también <code>required</code> al input, textarea o select.</p>
        <h3>Accesibilidad</h3>
        <ul>
          <li>Cada control debe tener una etiqueta visible; usa <code>for-id</code> e <code>id</code> con el mismo valor.</li>
          <li>Los checkbox y switches generan un id cuando se omite; sus etiquetas siguen asociadas.</li>
          <li>Usa <code>fieldset</code> y <code>legend</code> mediante AppRadioGroup para opciones relacionadas.</li>
          <li>No uses placeholder como sustituto de la etiqueta.</li>
          <li>Después de enviar, muestra errores concretos y conserva el foco en un lugar predecible.</li>
        </ul>
      </div>
    </AppCard>
  </section>
</template>
