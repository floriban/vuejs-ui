export const toastExamples = {
  basic: "const toast = useToast()\n\ntoast.info('Hay una actualización disponible.', { title: 'Información' })\ntoast.success('Los cambios se guardaron.', { title: 'Operación completada' })\ntoast.warning('La sesión vencerá pronto.', { title: 'Atención' })\ntoast.danger('No se pudo conectar.', { title: 'Error de conexión' })",
  action: "toast.info('Hay una versión nueva disponible.', {\n  title: 'Actualización disponible',\n  duration: 0,\n  action: {\n    label: 'Actualizar ahora',\n    onClick: () => installUpdate(),\n  },\n})",
  position: '<AppToastViewport position="top-right" />\n<AppToastViewport position="bottom-center" />',
  stack: "toast.success('Archivo cargado.')\ntoast.info('Procesando contenido...')\ntoast.warning('Revisa los campos pendientes.')\n\n// El viewport muestra hasta cinco elementos.\ntoast.clear()",
  setup: "<script setup lang=\"ts\">\nimport AppToastViewport from '@/components/ui/AppToastViewport.vue'\nimport { useToast } from '@/composables/useToast'\n\nconst toast = useToast()\n</script>\n\n<template>\n  <AppToastViewport position=\"top-right\" />\n  <AppButton @click=\"toast.success('Cambios guardados')\">Guardar</AppButton>\n</template>",
} as const
