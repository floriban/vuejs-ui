<script setup lang="ts">
import DocsPageHeader from '../components/docs/DocsPageHeader.vue'
import AppButton from '../components/ui/AppButton.vue'
import AppCard from '../components/ui/AppCard.vue'
</script>

<template>
  <DocsPageHeader eyebrow="Componentes / Tarjetas" title="Tarjetas"
    description="Contenedores flexibles para agrupar contenido, indicadores y acciones relacionadas." />

  <section class="component-section">
    <div class="section-heading">
      <div><span>01</span>
        <h2>Variantes</h2>
      </div>
      <p>Tarjetas con borde o elevación.</p>
    </div>
    <div class="card-grid">
      <AppCard>
        <template #header>
          <div><span class="card-kicker">Cuenta</span>
            <h3>Perfil de usuario</h3>
          </div><span class="status-badge">Activo</span>
        </template>
        <p>Administra la información visible y las preferencias generales de la cuenta.</p>
        <template #footer>
          <AppButton size="sm" variant="outline">Editar perfil</AppButton>
        </template>
      </AppCard>

      <AppCard variant="elevated">
        <template #header>
          <div>
            <span class="card-kicker">Actividad</span>
            <h3>Proyectos recientes</h3>
          </div>
        </template>
        <div class="metric"><strong>12</strong><span>proyectos actualizados esta semana</span></div>
        <template #footer>
          <AppButton size="sm">Ver proyectos</AppButton>
        </template>
      </AppCard>
    </div>
  </section>
</template>
