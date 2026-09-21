<script setup lang="ts">
import { ChevronRight } from '@lucide/vue'
import { dashboardItem, navigationGroups } from '../../config/navigation'
defineProps<{ id: string; activeGroup?: string }>()
const openGroup = defineModel<string>({ default: '' })
</script>
<template>
      <nav :id="id" class="docs-nav" aria-label="Catálogo de componentes">
        <RouterLink class="docs-nav__entry docs-nav__dashboard" :to="{ name: dashboardItem.name }" :aria-label="dashboardItem.label">
          <component :is="dashboardItem.icon" :size="19" :stroke-width="1.8" />
          <span>{{ dashboardItem.label }}</span>
        </RouterLink>

        <div v-for="group in navigationGroups" :key="group.id" class="docs-nav__group" :class="{ 'is-open': openGroup === group.id, 'is-active': activeGroup === group.id }">
          <button class="docs-nav__entry docs-nav__group-toggle" type="button" :aria-expanded="openGroup === group.id" :aria-controls="`${id}-${group.id}`" @click="openGroup = openGroup === group.id ? '' : group.id">
            <component :is="group.icon" :size="19" :stroke-width="1.8" />
            <span>{{ group.label }}</span>
            <ChevronRight class="docs-nav__group-arrow" :size="15" aria-hidden="true" />
          </button>
          <div class="docs-nav__submenu-wrap" :inert="openGroup !== group.id">
            <div :id="`${id}-${group.id}`" class="docs-nav__submenu">
              <RouterLink v-for="item in group.items" :key="item.name" :to="{ name: item.name }">
                <i aria-hidden="true"></i><span>{{ item.label }}</span>
              </RouterLink>
            </div>
          </div>
        </div>
      </nav>
</template>
