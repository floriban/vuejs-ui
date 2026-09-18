<script setup lang="ts">
import { Bell, FilePlus2, LayoutGrid, Search } from '@lucide/vue'

defineProps<{ title: string }>()
</script>

<template>
  <header class="dashboard-header">
    <div class="dashboard-topbar">
      <nav class="dashboard-topbar__nav" aria-label="Navegación superior">
        <RouterLink :to="{ name: 'dashboard' }" class="dashboard-topbar__link">Dashboard</RouterLink>
        <RouterLink :to="{ name: 'buttons' }" class="dashboard-topbar__link">Componentes</RouterLink>
        <RouterLink :to="{ name: 'forms' }" class="dashboard-topbar__link">Formularios</RouterLink>
        <RouterLink :to="{ name: 'tables' }" class="dashboard-topbar__link">Tablas</RouterLink>
      </nav>
      <div class="dashboard-topbar__tools">
        <button type="button" class="dashboard-icon-button" aria-label="Buscar" title="Buscar"><Search :size="21" aria-hidden="true" /></button>
        <button type="button" class="dashboard-icon-button" aria-label="Notificaciones" title="Notificaciones"><Bell :size="21" aria-hidden="true" /><span class="dashboard-notification-dot" aria-hidden="true"></span></button>
        <button type="button" class="dashboard-icon-button dashboard-topbar__apps" aria-label="Aplicaciones" title="Aplicaciones"><LayoutGrid :size="21" aria-hidden="true" /></button>
        <div class="dashboard-user"><span class="dashboard-user__greeting">Hola, <strong>Deddy</strong></span><span class="dashboard-user__avatar" aria-hidden="true">D</span></div>
      </div>
    </div>

    <div class="dashboard-subheader">
      <div class="dashboard-subheader__heading">
        <h2>{{ title }}</h2>
        <nav aria-label="Ruta de navegación">
          <ol class="dashboard-breadcrumb">
            <li v-if="title !== 'Dashboard'"><RouterLink :to="{ name: 'dashboard' }">Dashboard</RouterLink></li>
            <li aria-current="page">{{ title }}</li>
          </ol>
        </nav>
      </div>
      <div class="dashboard-subheader__actions">
        <button type="button" class="dashboard-action">Acciones</button>
        <button type="button" class="dashboard-icon-button dashboard-icon-button--success" aria-label="Nuevo registro" title="Nuevo registro"><FilePlus2 :size="23" aria-hidden="true" /></button>
      </div>
    </div>
  </header>
</template>
