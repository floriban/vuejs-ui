<script setup lang="ts">
import AppCard from '../ui/AppCard.vue'
import AppTable from '../ui/AppTable.vue'

defineProps<{
  componentName: string
  rows: ReadonlyArray<readonly [string, string, string, string]>
  note?: string
  index?: string
}>()
</script>

<template>
  <section class="component-section">
    <div class="section-heading"><div><span>{{ index ?? '03' }}</span><h2>Referencia de {{ componentName }}</h2></div><p>Propiedades y comportamiento del componente.</p></div>
    <AppCard title="API del componente">
      <AppTable :label="`Propiedades de ${componentName}`" compact>
        <thead><tr><th>Propiedad</th><th>Tipo</th><th>Por defecto</th><th>Descripción</th></tr></thead>
        <tbody><tr v-for="item in rows" :key="item[0]"><td><code>{{ item[0] }}</code></td><td><code>{{ item[1] }}</code></td><td><code>{{ item[2] }}</code></td><td>{{ item[3] }}</td></tr></tbody>
      </AppTable>
      <p v-if="note" class="docs-reference-note">{{ note }}</p>
    </AppCard>
  </section>
</template>
