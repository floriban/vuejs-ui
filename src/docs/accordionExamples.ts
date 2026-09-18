export const accordionExamples = {
  basic: '<AppAccordion v-model="openItem" :items="items">\n  <template #default="{ item }">\n    <p>Contenido de {{ item.title }}</p>\n  </template>\n</AppAccordion>',
  multiple: '<AppAccordion v-model="openItems" :items="items" multiple>\n  <template #default="{ item }">...</template>\n</AppAccordion>',
  separated: '<AppAccordion v-model="openItem" :items="items" variant="separated">...</AppAccordion>',
  required: '<AppAccordion v-model="openItem" :items="items" :collapsible="false">...</AppAccordion>',
  interactive: '<AppAccordion v-model="open" :items="items" :multiple="multiple" :collapsible="collapsible" :variant="variant">...</AppAccordion>',
} as const
