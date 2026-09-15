<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import DocsHeader from '../components/docs/DocsHeader.vue'
import { BellRing, ChevronsLeft, CreditCard, FormInput, MousePointerClick, TableProperties } from '@lucide/vue'

const route = useRoute()
const collapsed = ref(true)
const currentTitle = computed(() => sections.find((section) => section.name === route.name)?.label ?? 'Componentes')
const sections = [
  { name: 'buttons', label: 'Botones', icon: MousePointerClick },
  { name: 'forms', label: 'Formularios', icon: FormInput },
  { name: 'alerts', label: 'Alertas', icon: BellRing },
  { name: 'cards', label: 'Tarjetas', icon: CreditCard },
  { name: 'tables', label: 'Tablas', icon: TableProperties },
]
</script>

<template>
  <div class="docs-layout" :class="{ 'docs-layout--collapsed': collapsed }">
    <aside class="docs-sidebar">
      <div class="sidebar-header">
        <RouterLink class="brand" :to="{ name: 'buttons' }" aria-label="App UI, inicio">
          <span class="brand__mark shrink-0 select-none">A</span>
          <span class="brand__text"><strong>App UI</strong><small>Componentes Vue</small></span>
        </RouterLink>
        <button class="sidebar-toggle" type="button" :aria-label="collapsed ? 'Fijar menú expandido' : 'Plegar menú'"
          :aria-expanded="!collapsed" aria-controls="main-navigation"
          :title="collapsed ? 'Fijar menú expandido' : 'Plegar menú'" @click="collapsed = !collapsed">
          <ChevronsLeft :size="20" aria-hidden="true" />
        </button>
      </div>

      <nav id="main-navigation" class="docs-nav" aria-label="Componentes iniciales">
        <p class="docs-nav__label">Primera colección</p>
        <RouterLink v-for="section in sections" :key="section.name" :to="{ name: section.name }"
          :aria-label="section.label">
          <component :is="section.icon" :size="19" :stroke-width="1.8" />
          <span>{{ section.label }}</span>
        </RouterLink>
      </nav>

      <div class="sidebar-note">
        <span>v0.1</span>
        <p>Base visual para proyectos propios con Vue y TypeScript.</p>
      </div>
    </aside>
    <main class="docs-main min-w-0">
      <DocsHeader :title="currentTitle" />
      <div class="docs-content">
        <RouterView />
      </div>
    </main>
  </div>
</template>
