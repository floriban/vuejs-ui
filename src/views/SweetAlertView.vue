<script setup lang="ts">
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import { CircleCheck, CircleHelp, MessageSquareText } from '@lucide/vue'
import DocsCodeBlock from '../components/docs/DocsCodeBlock.vue'
import DocsPageHeader from '../components/docs/DocsPageHeader.vue'
import AppButton from '../components/ui/AppButton.vue'
import AppCard from '../components/ui/AppCard.vue'

const base = { buttonsStyling: false, customClass: { popup: 'app-swal', confirmButton: 'app-button app-button--solid app-button--primary app-button--md', cancelButton: 'app-button app-button--outline app-button--neutral app-button--md', actions: 'app-swal__actions' } }
function success() { return Swal.fire({ ...base, icon: 'success', title: 'Cambios guardados', text: 'La configuración se actualizó correctamente.', confirmButtonText: 'Entendido' }) }
async function confirmDelete() { const result = await Swal.fire({ ...base, icon: 'warning', title: '¿Eliminar registro?', text: 'Esta acción quitará el elemento de la lista.', showCancelButton: true, confirmButtonText: 'Sí, eliminar', cancelButtonText: 'Cancelar', reverseButtons: true }); if (result.isConfirmed) await Swal.fire({ ...base, icon: 'success', title: 'Registro eliminado', timer: 1400, showConfirmButton: false }) }
function promptName() { return Swal.fire({ ...base, title: 'Nombre del proyecto', input: 'text', inputPlaceholder: 'Escribe un nombre', showCancelButton: true, confirmButtonText: 'Guardar', cancelButtonText: 'Cancelar', inputValidator: (value) => value ? undefined : 'El nombre es obligatorio' }) }
function toast() { return Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Notificación enviada', showConfirmButton: false, timer: 2200, timerProgressBar: true }) }
const code = `import Swal from 'sweetalert2'\nimport 'sweetalert2/dist/sweetalert2.min.css'\n\nSwal.fire({ icon: 'success', title: 'Cambios guardados' })`
</script>
<template>
  <DocsPageHeader eyebrow="Integraciones / SweetAlert2" title="SweetAlert2" description="Alertas modales, confirmaciones, entradas y notificaciones listas para usar." />
  <section class="component-section"><div class="section-heading"><div><span>01</span><h2>Variantes</h2></div><p>La librería está instalada y adaptada al sistema visual.</p></div><div class="card-grid"><AppCard title="Resultado" subtitle="Confirma que una operación terminó" :icon="CircleCheck" icon-color="success"><AppButton color="success" @click="success">Mostrar éxito</AppButton></AppCard><AppCard title="Confirmación" subtitle="Solicita una decisión irreversible" :icon="CircleHelp" icon-color="warning"><AppButton color="danger" variant="outline" @click="confirmDelete">Confirmar eliminación</AppButton></AppCard><AppCard title="Entrada de texto" subtitle="Recoge un valor dentro del modal" :icon="MessageSquareText" icon-color="info"><AppButton color="info" variant="soft" @click="promptName">Solicitar nombre</AppButton></AppCard><AppCard title="Toast" subtitle="Mensaje temporal en la esquina"><AppButton variant="outline" @click="toast">Mostrar toast</AppButton></AppCard></div><DocsCodeBlock :code="code" /></section>
</template>