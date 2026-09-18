export const tooltipExamples = {
  basic: '<AppTooltip label="Ayuda" text="Información adicional sobre esta acción.">Ayuda</AppTooltip>',
  placements: '<AppTooltip placement="top" label="Arriba" text="Tooltip superior">Arriba</AppTooltip>\n<AppTooltip placement="right" label="Derecha" text="Tooltip derecho">Derecha</AppTooltip>\n<AppTooltip placement="bottom" label="Abajo" text="Tooltip inferior">Abajo</AppTooltip>\n<AppTooltip placement="left" label="Izquierda" text="Tooltip izquierdo">Izquierda</AppTooltip>',
  icons: '<AppTooltip icon-only label="Copiar enlace" text="Copiar enlace al portapapeles">\n  <Copy :size="18" />\n</AppTooltip>',
  interactive: '<AppTooltip :placement="placement" :delay="delay" :disabled="disabled" label="Probar tooltip" text="Vista previa del tooltip">Probar tooltip</AppTooltip>',
} as const
