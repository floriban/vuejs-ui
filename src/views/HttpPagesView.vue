<script setup lang="ts">
import { ArrowUpRight } from '@lucide/vue'
import DocsPageHeader from '../components/docs/DocsPageHeader.vue'
import DocsCodeBlock from '../components/docs/DocsCodeBlock.vue'
import { httpPages } from '../config/httpPages'
const code = '<AppHttpState :code="403" @back="router.back()" />'
</script>
<template>
  <DocsPageHeader eyebrow="Páginas HTTP / Vista general" title="Páginas HTTP" description="Páginas de error con mensajes claros y acciones para continuar navegando." />
  <section v-for="group in [{ prefix: 4, title: 'Solicitud y acceso', detail: 'Sesión, permisos y solicitudes que necesitan atención.' }, { prefix: 5, title: 'Servidor y disponibilidad', detail: 'Problemas temporales del servidor y sus servicios.' }]" :key="group.prefix" class="component-section">
    <div class="section-heading"><div><span>{{ group.prefix }}xx</span><h2>{{ group.title }}</h2></div><p>{{ group.detail }}</p></div>
    <div class="http-pages-grid">
      <RouterLink v-for="page in httpPages.filter(item => Math.floor(item.code / 100) === group.prefix)" :key="page.code" :to="{ name: 'http-' + page.code }" class="http-page-card">
        <div class="http-page-card__top"><span>{{ page.code }}</span><ArrowUpRight :size="20" aria-hidden="true" /></div>
        <h3>{{ page.title }}</h3><p>{{ page.description }}</p><span class="http-page-card__link">Ver página</span>
      </RouterLink>
    </div>
  </section>
  <p class="docs-value-preview">419 es una convención usada para sesiones caducadas, no un código HTTP estándar. Estas vistas son ejemplos visuales; el servidor y la autenticación deben gestionar las respuestas y el inicio de sesión.</p>
  <DocsCodeBlock :code="code" />
</template>
<style scoped>
.http-pages-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr)); gap: 20px; }
.http-page-card { display: flex; flex-direction: column; padding: 26px; border: 1px solid var(--color-border); border-radius: var(--radius-md); background: var(--color-surface); color: var(--color-dark); text-decoration: none; transition: border-color .2s; }
.http-page-card:hover { border-color: var(--color-primary); }
.http-page-card:focus-visible { outline: 2px solid var(--color-primary); outline-offset: 4px; }
.http-page-card__top { display: flex; justify-content: space-between; align-items: center; color: var(--color-primary); }
.http-page-card__top span { font-size: 34px; font-weight: 600; letter-spacing: -.04em; }
.http-page-card h3 { margin: 18px 0 8px; font-size: .95rem; }
.http-page-card p { margin: 0 0 22px; color: var(--color-muted); font-size: .8rem; line-height: 1.8; }
.http-page-card__link { margin-top: auto; color: var(--color-primary); font-size: .78rem; font-weight: 500; }
</style>
