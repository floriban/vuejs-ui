<script setup lang="ts">
import AppState from '../components/ui/AppState.vue'
function reloadPage() { window.location.reload() }
</script>

<template>
  <div class="route-state-page">
    <AppState state="error" title="No pudimos abrir esta página" description="El módulo no se cargó correctamente. Recarga la aplicación para intentarlo otra vez." action-label="Recargar" @action="reloadPage" />
  </div>
</template>