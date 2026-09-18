export const badgeExamples = {
  colors: '<AppBadge color="primary">Primary</AppBadge>\n<AppBadge color="success">Activo</AppBadge>\n<AppBadge color="warning">Pendiente</AppBadge>\n<AppBadge color="danger">Bloqueado</AppBadge>',
  variants: '<AppBadge variant="soft">Soft</AppBadge>\n<AppBadge variant="solid">Solid</AppBadge>\n<AppBadge variant="outline">Outline</AppBadge>',
  content: '<AppBadge dot color="success">En línea</AppBadge>\n<AppBadge :icon="Star">Favorito</AppBadge>\n<AppBadge closable @close="handleClose">Filtro activo</AppBadge>',
  interactive: '<AppBadge :color="color" :variant="variant" :size="size" :rounded="rounded" :dot="dot">Vista previa</AppBadge>',
} as const
