<script setup lang="ts">
import { Check, Copy, ExternalLink, PackagePlus } from '@lucide/vue'
import { onBeforeUnmount, ref } from 'vue'
import type { InstallDocumentation } from '../../config/installDocs'

const props = defineProps<{
  installation: InstallDocumentation
}>()

const copied = ref(false)
const copyError = ref(false)
let resetTimer: ReturnType<typeof setTimeout> | undefined

async function copyCommand() {
  copyError.value = false
  try {
    await navigator.clipboard.writeText(props.installation.command)
    copied.value = true
    clearTimeout(resetTimer)
    resetTimer = setTimeout(() => { copied.value = false }, 2000)
  } catch {
    copyError.value = true
  }
}

onBeforeUnmount(() => clearTimeout(resetTimer))
</script>

<template>
  <aside class="install-card" aria-labelledby="install-card-title">
    <div class="install-card__intro">
      <span class="install-card__icon" aria-hidden="true"><PackagePlus :size="20" /></span>
      <div>
        <p class="install-card__eyebrow">Instalación</p>
        <h2 id="install-card-title">Agrégalo a tu proyecto</h2>
        <p>{{ installation.description }}</p>
        <a
          v-if="installation.officialDocumentation"
          class="install-card__official"
          :href="installation.officialDocumentation.url"
          target="_blank"
          rel="noopener noreferrer"
        >
          Documentación oficial de {{ installation.officialDocumentation.name }}
          <ExternalLink :size="14" aria-hidden="true" />
        </a>
      </div>
    </div>

    <div class="install-card__command">
      <code>{{ installation.command }}</code>
      <button type="button" :aria-label="copied ? 'Comando copiado' : 'Copiar comando de instalación'" @click="copyCommand">
        <component :is="copied ? Check : Copy" :size="16" aria-hidden="true" />
        <span>{{ copied ? 'Copiado' : 'Copiar' }}</span>
      </button>
    </div>

    <div class="install-card__details">
      <div v-if="installation.components.length">
        <span>Componentes que agrega</span>
        <ul aria-label="Componentes que agrega">
          <li v-for="component in installation.components" :key="component">{{ component }}</li>
        </ul>
      </div>
      <div v-if="installation.dependencies.length">
        <span>Dependencias requeridas</span>
        <ul aria-label="Dependencias requeridas">
          <li v-for="dependency in installation.dependencies" :key="dependency">{{ dependency }}</li>
        </ul>
      </div>
    </div>

    <p v-if="copyError" class="install-card__status" role="alert">
      No pudimos copiarlo. Selecciona el comando y cópialo manualmente.
    </p>
    <p v-else class="sr-only" role="status">{{ copied ? 'Comando copiado al portapapeles.' : '' }}</p>
  </aside>
</template>

