<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getInstallDocumentation } from '../../config/installDocs'
import DocsInstallCard from './DocsInstallCard.vue'

defineProps<{
  eyebrow: string
  title: string
  description: string
}>()

const route = useRoute()
const installation = computed(() => getInstallDocumentation(route.name))
</script>

<template>
  <header class="page-header">
    <div>
      <p class="eyebrow">{{ eyebrow }}</p>
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
    </div>
    <span class="framework-pill"><i></i> Vue 3 + TypeScript</span>
  </header>
  <DocsInstallCard v-if="installation" :installation="installation" />
</template>
