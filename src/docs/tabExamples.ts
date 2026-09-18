export const tabExamples = {
  basic: '<AppTabs v-model="active" :tabs="tabs" label="Configuración de cuenta">\n  <template #default="{ activeTab }">\n    <p>Contenido de {{ activeTab.label }}</p>\n  </template>\n</AppTabs>',
  variants: '<AppTabs v-model="active" :tabs="tabs" label="Secciones" variant="line" />\n<AppTabs v-model="active" :tabs="tabs" label="Secciones" variant="pill" />\n<AppTabs v-model="active" :tabs="tabs" label="Secciones" variant="boxed" />',
  rich: "const tabs = [\n  { value: 'profile', label: 'Perfil', icon: UserRound },\n  { value: 'security', label: 'Seguridad', icon: Shield, badge: 2 },\n  { value: 'billing', label: 'Facturación', icon: CreditCard, disabled: true },\n]",
  vertical: '<AppTabs v-model="active" :tabs="tabs" label="Preferencias" orientation="vertical">\n  <template #default="{ activeTab }">...</template>\n</AppTabs>',
  interactive: '<AppTabs v-model="active" :tabs="tabs" label="Vista previa" :variant="variant" :orientation="orientation" :fitted="fitted">...</AppTabs>',
} as const
