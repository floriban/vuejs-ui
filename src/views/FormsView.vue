<script setup lang="ts">
import { computed, nextTick, reactive, ref, watch } from 'vue'
import DocsPageHeader from '../components/docs/DocsPageHeader.vue'
import DocsCodeBlock from '../components/docs/DocsCodeBlock.vue'
import DocsFormReference from '../components/docs/DocsFormReference.vue'
import AppButton from '../components/ui/AppButton.vue'
import AppField from '../components/ui/AppField.vue'
import AppInput from '../components/ui/AppInput.vue'
import AppSelect from '../components/ui/AppSelect.vue'
import AppTextarea from '../components/ui/AppTextarea.vue'
import AppCheckbox from '../components/ui/AppCheckbox.vue'
import AppRadioGroup from '../components/ui/AppRadioGroup.vue'
import AppSwitch from '../components/ui/AppSwitch.vue'
const sizes = ['sm', 'md', 'lg'] as const
const types = [
 { type: 'text', label: 'Texto', placeholder: 'Nombre completo' },
 { type: 'email', label: 'Correo electrónico', placeholder: 'nombre@empresa.com' },
 { type: 'password', label: 'Contraseña', placeholder: 'Al menos 8 caracteres' },
 { type: 'number', label: 'Número', placeholder: 'Cantidad' },
 { type: 'search', label: 'Búsqueda', placeholder: 'Buscar productos…' },
 { type: 'tel', label: 'Teléfono', placeholder: '+51 999 123 456' },
 { type: 'url', label: 'Dirección web', placeholder: 'https://ejemplo.com' },
] as const
const roleOptions = [{ value: 'admin', label: 'Administrador' }, { value: 'editor', label: 'Editor' }, { value: 'viewer', label: 'Consulta' }]
const selectDemo = ref('')
const notesDemo = ref('')
const checks = reactive({ sm: false, md: true, lg: false })
const switches = reactive({ sm: false, md: true, lg: false })
const radios = reactive({ sm: '', md: 'editor', lg: '' })
const initial = () => ({ text: '', email: '', password: '', number: '' as string | number, search: '', tel: '', url: '', role: '', notes: '', access: '', terms: false, notifications: false })
const form = reactive(initial())
const submitted = ref(false)
const saved = ref(false)
const formElement = ref<HTMLFormElement>()
const errors = computed<Record<string, string>>(() => {
 const result: Record<string, string> = {}
 if (form.text.trim().length < 3) result.text = 'Escribe al menos 3 caracteres.'
 if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) result.email = 'Escribe un correo válido.'
 if (form.password.length < 8) result.password = 'Usa al menos 8 caracteres.'
 if (form.number === '' || !Number.isInteger(Number(form.number)) || Number(form.number) < 1 || Number(form.number) > 100) result.number = 'Ingresa una cantidad entera entre 1 y 100.'
 if (form.search.trim().length > 0 && form.search.trim().length < 2) result.search = 'Escribe al menos 2 caracteres para buscar.'
 if (!/^\+?[\d\s()-]{7,20}$/.test(form.tel) || form.tel.replace(/\D/g, '').length < 7) result.tel = 'Ingresa un teléfono válido (mínimo 7 dígitos).'
 if (form.url) { try { const url = new URL(form.url); if (!['http:', 'https:'].includes(url.protocol)) result.url = 'Usa una dirección http:// o https://.' } catch { result.url = 'Escribe una URL completa, por ejemplo https://ejemplo.com.' } }
 if (!form.role) result.role = 'Selecciona un rol.'
 if (form.notes.trim().length < 10) result.notes = 'Escribe una descripción de al menos 10 caracteres.'
 if (!form.access) result.access = 'Selecciona un nivel de acceso.'
 if (!form.terms) result.terms = 'Debes aceptar las condiciones de la demostración.'
 return result
})
function inputCode(type: string) { return `<AppInput v-model="value" type="${type}" size="md" />` }
function error(key: string) { return submitted.value ? errors.value[key] : undefined }
watch(form, () => { saved.value = false })
async function submit() {
 submitted.value = true
 saved.value = Object.keys(errors.value).length === 0
 if (!saved.value) { await nextTick(); const invalid = formElement.value?.querySelector<HTMLElement>('[aria-invalid="true"]'); if (invalid?.matches('fieldset')) invalid.querySelector<HTMLInputElement>('input')?.focus(); else invalid?.focus() }
}
function reset() { Object.assign(form, initial()); submitted.value = false; saved.value = false }
const validationCode = `<AppField label="Correo" for-id="email" :error="error" v-slot="{ invalid, describedBy }">\n  <AppInput id="email" v-model="email" type="email"\n    :invalid="invalid" :aria-describedby="describedBy" />\n</AppField>`
</script>
<template>
 <DocsPageHeader eyebrow="Formularios / Controles base" title="Controles base" description="Cada control con sus tamaños y estados. Al final encontrarás las reglas de validación y un formulario completo para probarlas." />
 <section v-for="(input, index) in types" :key="input.type" class="component-section">
  <div class="section-heading"><div><span>0{{ index + 1 }}</span><h2>{{ input.label }}</h2></div><p>Tipo {{ input.type }} · pequeño, mediano y grande.</p></div>
  <div class="showcase-panel space-y-6">
   <div class="grid grid-cols-1 md:grid-cols-3 gap-6"><AppField v-for="size in sizes" :key="size" :label="`Tamaño ${size}`" :for-id="`${input.type}-${size}`"><AppInput :id="`${input.type}-${size}`" :type="input.type" :size="size" :placeholder="input.placeholder" /></AppField></div>
   <div class="grid grid-cols-1 md:grid-cols-3 gap-6"><AppField label="Solo lectura" :for-id="`${input.type}-readonly`"><AppInput :id="`${input.type}-readonly`" :type="input.type" :model-value="input.type === 'number' ? 25 : 'Ejemplo'" readonly /></AppField><AppField label="Deshabilitado" :for-id="`${input.type}-disabled`"><AppInput :id="`${input.type}-disabled`" :type="input.type" :placeholder="input.placeholder" disabled /></AppField><AppField label="Con error" :for-id="`${input.type}-invalid`" error="Revisa el valor ingresado." v-slot="{ invalid, describedBy }"><AppInput :id="`${input.type}-invalid`" :type="input.type" :placeholder="input.placeholder" :invalid="invalid" :aria-describedby="describedBy" /></AppField></div>
  </div><DocsCodeBlock :code="inputCode(input.type)" />
 </section>
 <section class="component-section"><div class="section-heading"><div><span>08</span><h2>Select</h2></div><p>Selección única con placeholder y opciones.</p></div><div class="showcase-panel grid grid-cols-1 md:grid-cols-3 gap-6"><AppField v-for="size in sizes" :key="size" :label="`Tamaño ${size}`" :for-id="`select-${size}`"><AppSelect :id="`select-${size}`" v-model="selectDemo" :size="size" :options="roleOptions" placeholder="Selecciona un rol" /></AppField><AppField label="Deshabilitado" for-id="select-disabled"><AppSelect id="select-disabled" :options="roleOptions" model-value="editor" disabled /></AppField><AppField label="Con error" for-id="select-invalid" error="Selecciona una opción." v-slot="{ invalid, describedBy }"><AppSelect id="select-invalid" :options="roleOptions" placeholder="Selecciona" :invalid="invalid" :aria-describedby="describedBy" /></AppField><AppField label="Opción deshabilitada" for-id="select-option"><AppSelect id="select-option" :options="[...roleOptions, { label: 'Próximamente', value: 'future', disabled: true }]" placeholder="Selecciona" /></AppField></div><DocsCodeBlock code='<AppSelect v-model="role" :options="options" size="md" placeholder="Selecciona" />' /></section>
 <section class="component-section"><div class="section-heading"><div><span>09</span><h2>Textarea</h2></div><p>Texto multilínea con altura y tamaño configurables.</p></div><div class="showcase-panel grid grid-cols-1 md:grid-cols-3 gap-6"><AppField v-for="size in sizes" :key="size" :label="`Tamaño ${size}`" :for-id="`textarea-${size}`"><AppTextarea :id="`textarea-${size}`" v-model="notesDemo" :size="size" :rows="3" placeholder="Escribe una descripción" /></AppField><AppField label="Solo lectura" for-id="textarea-readonly"><AppTextarea id="textarea-readonly" model-value="Contenido de referencia" readonly /></AppField><AppField label="Deshabilitado" for-id="textarea-disabled"><AppTextarea id="textarea-disabled" disabled placeholder="No disponible" /></AppField><AppField label="Con error" for-id="textarea-invalid" error="Completa la descripción." v-slot="{ invalid, describedBy }"><AppTextarea id="textarea-invalid" :invalid="invalid" :aria-describedby="describedBy" /></AppField></div><DocsCodeBlock code='<AppTextarea v-model="notes" :rows="4" size="md" />' /></section>
 <section class="component-section"><div class="section-heading"><div><span>10</span><h2>Checkbox</h2></div><p>Selección independiente con estados marcado, deshabilitado y error.</p></div><div class="showcase-panel grid grid-cols-1 md:grid-cols-3 gap-6"><AppCheckbox v-for="size in sizes" :key="size" v-model="checks[size]" :size="size" :label="`Tamaño ${size}`" /><AppCheckbox label="Deshabilitado" disabled /><AppCheckbox label="Marcado y deshabilitado" :model-value="true" disabled /><div><AppCheckbox label="Aceptación requerida" invalid described-by="checkbox-error" /><p id="checkbox-error" class="app-field__message--error">Debes aceptar para continuar.</p></div></div><DocsCodeBlock code='<AppCheckbox v-model="accepted" label="Acepto las condiciones" size="md" />' /></section>
 <section class="component-section"><div class="section-heading"><div><span>11</span><h2>Radio group</h2></div><p>Selección exclusiva en disposición vertical u horizontal.</p></div><div class="showcase-panel grid grid-cols-1 md:grid-cols-3 gap-6"><AppRadioGroup v-for="size in sizes" :key="size" v-model="radios[size]" :size="size" :legend="`Tamaño ${size}`" :options="roleOptions" /><AppRadioGroup legend="Horizontal" orientation="horizontal" :options="roleOptions" /><AppRadioGroup legend="Deshabilitado" model-value="editor" :options="roleOptions" disabled /><div><AppRadioGroup legend="Con error" :options="roleOptions" invalid described-by="radio-error" /><p id="radio-error" class="app-field__message--error">Selecciona un rol.</p></div></div><DocsCodeBlock code='<AppRadioGroup v-model="role" legend="Rol" :options="options" orientation="horizontal" />' /></section>
 <section class="component-section"><div class="section-heading"><div><span>12</span><h2>Switch</h2></div><p>Activación inmediata de preferencias.</p></div><div class="showcase-panel grid grid-cols-1 md:grid-cols-3 gap-6"><AppSwitch v-for="size in sizes" :key="size" v-model="switches[size]" :size="size" :label="`Tamaño ${size}`" /><AppSwitch label="Deshabilitado" disabled /><AppSwitch label="Activo y deshabilitado" :model-value="true" disabled /><AppSwitch label="Estado inválido" invalid /></div><DocsCodeBlock code='<AppSwitch v-model="notifications" label="Recibir notificaciones" size="md" />' /></section>
 <DocsFormReference />
 <section class="component-section"><div class="section-heading"><div><span>13</span><h2>Validación</h2></div><p>Etiqueta, mensaje asociado y estado inválido trabajan juntos.</p></div><div class="showcase-panel grid grid-cols-1 md:grid-cols-3 gap-6"><AppField label="Antes de enviar" for-id="validation-help" help="Usa tu correo de trabajo." v-slot="{ describedBy }"><AppInput id="validation-help" placeholder="nombre@empresa.com" :aria-describedby="describedBy" /></AppField><AppField label="Con error" for-id="validation-error" error="El correo no es válido." v-slot="{ invalid, describedBy }"><AppInput id="validation-error" model-value="correo-incompleto" :invalid="invalid" :aria-describedby="describedBy" /></AppField><AppField label="Corregido" for-id="validation-ok" help="Formato de correo válido." v-slot="{ describedBy }"><AppInput id="validation-ok" model-value="ana@empresa.com" :aria-describedby="describedBy" /></AppField></div><DocsCodeBlock :code="validationCode" /></section>
 <section class="component-section"><div class="section-heading"><div><span>14</span><h2>Formulario interactivo</h2></div><p>Envía vacío para ver los errores. Esta demo no envía ni guarda datos en un servidor.</p></div><form ref="formElement" class="showcase-panel space-y-6" novalidate @submit.prevent="submit" @reset.prevent="reset"><div v-if="submitted && Object.keys(errors).length" class="form-demo-error" role="alert">Hay {{ Object.keys(errors).length }} campos por corregir. Revisa los mensajes junto a cada control.</div><div v-if="saved" class="form-demo-success" role="status">Validación correcta. El formulario está listo para enviarse.</div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><AppField v-for="input in types" :key="input.type" :label="input.label" :for-id="`demo-${input.type}`" :required="!['search', 'url'].includes(input.type)" :error="error(input.type)" :help="input.type === 'search' || input.type === 'url' ? 'Opcional.' : input.type === 'number' ? 'Cantidad entre 1 y 100.' : undefined" v-slot="{ invalid, describedBy }"><AppInput size="sm" :id="`demo-${input.type}`" v-model="form[input.type]" :type="input.type" :placeholder="input.placeholder" :invalid="invalid" :aria-describedby="describedBy" :required="!['search', 'url'].includes(input.type)" /></AppField><AppField label="Rol" for-id="demo-role" required :error="error('role')" v-slot="{ invalid, describedBy }"><AppSelect size="sm" id="demo-role" v-model="form.role" :options="roleOptions" placeholder="Selecciona un rol" required :invalid="invalid" :aria-describedby="describedBy" /></AppField><AppField class="md:col-span-2" label="Descripción" for-id="demo-notes" required :error="error('notes')" v-slot="{ invalid, describedBy }"><AppTextarea size="sm" id="demo-notes" v-model="form.notes" required :invalid="invalid" :aria-describedby="describedBy" placeholder="Escribe al menos 10 caracteres" /></AppField><div><AppRadioGroup size="sm" v-model="form.access" legend="Nivel de acceso (obligatorio)" :options="roleOptions" :invalid="Boolean(error('access'))" :described-by="error('access') ? 'demo-access-error' : undefined" /><p v-if="error('access')" id="demo-access-error" class="app-field__message--error">{{ error('access') }}</p></div><AppSwitch size="sm" v-model="form.notifications" label="Recibir notificaciones (opcional)" /></div><div><AppCheckbox size="sm" v-model="form.terms" label="Acepto las condiciones de esta demostración" :invalid="Boolean(error('terms'))" :described-by="error('terms') ? 'demo-terms-error' : undefined" /><p v-if="error('terms')" id="demo-terms-error" class="app-field__message--error">{{ error('terms') }}</p></div><div class="flex flex-wrap gap-3"><AppButton type="submit">Validar formulario</AppButton><AppButton type="reset" variant="outline" color="neutral">Limpiar</AppButton></div></form></section>
</template>
