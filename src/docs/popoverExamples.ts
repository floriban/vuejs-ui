export const popoverExamples = {
  basic: '<AppPopover v-model="open" label="Ver información" title="Información del registro" description="Resumen contextual.">\n  <p>Contenido más amplio que un tooltip.</p>\n</AppPopover>',
  actions: '<AppPopover v-model="open" label="Compartir" title="Compartir proyecto">\n  <p>Selecciona cómo compartir este recurso.</p>\n  <template #footer="{ close }">\n    <AppButton variant="ghost" color="neutral" @click="close()">Cancelar</AppButton>\n    <AppButton @click="share">Compartir</AppButton>\n  </template>\n</AppPopover>',
  placements: '<AppPopover placement="top" align="start" ... />\n<AppPopover placement="right" align="center" ... />\n<AppPopover placement="bottom" align="end" ... />',
  interactive: '<AppPopover v-model="open" :placement="placement" :align="align" :width="width" :show-close="showClose" :disabled="disabled" label="Probar popover" title="Vista previa">...</AppPopover>',
} as const
