<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ChevronRight, ChevronsLeft } from '@lucide/vue'
import DocsHeader from '../components/docs/DocsHeader.vue'
import { dashboardItem, findNavigationItem, navigationGroups } from '../config/navigation'

const route = useRoute()
const collapsed = ref(true)
const openGroup = ref('')
const currentTitle = computed(() => findNavigationItem(route.name)?.label ?? 'Componentes')
const activeGroup = computed(() => navigationGroups.find((group) => group.items.some((item) => item.name === route.name)))

watch(() => route.name, () => {
  if (activeGroup.value) openGroup.value = activeGroup.value.id
}, { immediate: true })

function toggleGroup(id: string) {
  openGroup.value = openGroup.value === id ? '' : id
}
</script>

<template>
  <div class="docs-layout" :class="{ 'docs-layout--collapsed': collapsed }">
    <aside class="docs-sidebar">
      <div class="sidebar-header">
        <RouterLink class="brand" :to="{ name: dashboardItem.name }" aria-label="App UI, Dashboard">
          <span class="brand__mark shrink-0 select-none">A</span>
          <span class="brand__text"><strong>App UI</strong><small>Componentes Vue</small></span>
        </RouterLink>
        <button class="sidebar-toggle" type="button" :aria-label="collapsed ? 'Fijar menú expandido' : 'Plegar menú'" :aria-expanded="!collapsed" aria-controls="main-navigation" :title="collapsed ? 'Fijar menú expandido' : 'Plegar menú'" @click="collapsed = !collapsed">
          <ChevronsLeft :size="20" aria-hidden="true" />
        </button>
      </div>

      <nav id="main-navigation" class="docs-nav" aria-label="Catálogo de componentes">
        <RouterLink class="docs-nav__entry docs-nav__dashboard" :to="{ name: dashboardItem.name }" :aria-label="dashboardItem.label">
          <component :is="dashboardItem.icon" :size="19" :stroke-width="1.8" />
          <span>{{ dashboardItem.label }}</span>
        </RouterLink>

        <div v-for="group in navigationGroups" :key="group.id" class="docs-nav__group" :class="{ 'is-open': openGroup === group.id, 'is-active': activeGroup?.id === group.id }">
          <button class="docs-nav__entry docs-nav__group-toggle" type="button" :aria-expanded="openGroup === group.id" :aria-controls="`nav-group-${group.id}`" @click="toggleGroup(group.id)">
            <component :is="group.icon" :size="19" :stroke-width="1.8" />
            <span>{{ group.label }}</span>
            <ChevronRight class="docs-nav__group-arrow" :size="15" aria-hidden="true" />
          </button>
          <div class="docs-nav__submenu-wrap">
            <div :id="`nav-group-${group.id}`" class="docs-nav__submenu">
              <RouterLink v-for="item in group.items" :key="item.name" :to="{ name: item.name }">
                <i aria-hidden="true"></i><span>{{ item.label }}</span>
              </RouterLink>
            </div>
          </div>
        </div>
      </nav>

      <div class="sidebar-note">
        <span>v0.1</span>
        <p>Base visual para proyectos propios con Vue y TypeScript.</p>
      </div>
    </aside>
    <main class="docs-main min-w-0">
      <DocsHeader :title="currentTitle" />
      <div class="docs-content"><RouterView /></div>
    </main>
  </div>
</template>
