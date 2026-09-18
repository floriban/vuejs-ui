export const avatarExamples = {
  sizes: '<AppAvatar name="Ana Torres" size="xs" />\n<AppAvatar name="Ana Torres" size="md" />\n<AppAvatar name="Ana Torres" size="xl" />',
  status: '<AppAvatar name="Ana Torres" status="online" />\n<AppAvatar name="Luis Vega" status="away" />\n<AppAvatar name="María Paz" status="busy" />',
  group: '<AppAvatarGroup label="Equipo del proyecto">\n  <AppAvatar name="Ana Torres" />\n  <AppAvatar name="Luis Vega" color="info" />\n  <AppAvatar name="María Paz" color="success" />\n</AppAvatarGroup>',
  interactive: '<AppAvatar name="Ana Torres" :size="size" :shape="shape" :color="color" :status="status" />',
} as const
