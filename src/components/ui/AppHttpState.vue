<script setup lang="ts">
import { computed } from 'vue'
import { ArrowLeft, ArrowRight } from '@lucide/vue'
import { getHttpPage, type HttpPageCode } from '../../config/httpPages'
import HttpScene from './HttpScene.vue'
const props = defineProps<{ code: HttpPageCode }>()
const page = computed(() => getHttpPage(props.code))
defineEmits<{ back: [] }>()
</script>
<template>
  <section class="http-story" :class="'http-story--' + page.scene" :aria-label="page.title">
    <div class="http-story__copy">
      <span class="http-story__eyebrow">{{ page.scene === 'landscape' ? 'UN NUEVO CAMINO' : page.scene === 'door' ? 'CADA ESPACIO, SU LLAVE' : page.scene === 'paper' ? 'UN PEQUEÑO AJUSTE' : 'UN MOMENTO PARA CONTINUAR' }}</span>
      <h1>{{ page.title }}</h1>
      <h2>{{ page.subtitle }}</h2>
      <p>{{ page.description }}</p>
      <div class="http-story__actions">
        <RouterLink :to="{ name: 'dashboard' }" class="http-story__home">Volver al inicio<ArrowRight :size="18" aria-hidden="true" /></RouterLink>
        <button type="button" class="http-story__back" @click="$emit('back')"><ArrowLeft :size="16" aria-hidden="true" />Ir atrás</button>
      </div>
      <span class="http-story__note">Siempre hay una forma de continuar.</span>
    </div>
    <HttpScene class="http-story__art" :scene="page.scene" />
  </section>
</template>
<style scoped>
.http-story { --story-bg: #f2f5fb; --story-ink: #293d5b; --story-muted: #566781; --story-accent: #35577f; position: relative; isolation: isolate; display: grid; grid-template-columns: 1fr 1.05fr; align-items: center; overflow: hidden; min-height: min(700px, calc(100svh - 160px)); border-radius: 20px; background: var(--story-bg); color: var(--story-ink); padding: clamp(28px, 5vw, 76px); gap: 12px; }
.http-story--landscape { --story-bg: #e3f3ef; --story-ink: #234d48; --story-muted: #476e67; --story-accent: #286859; }
.http-story--clock { --story-bg: #eff6f4; --story-ink: #315359; --story-muted: #526e73; --story-accent: #366b6e; }
.http-story--paper, .http-story--repair { --story-bg: #faf4e9; --story-ink: #534936; --story-muted: #75674e; --story-accent: #766039; }
.http-story__copy { position: relative; z-index: 1; max-width: 490px; }
.http-story__eyebrow { display: block; font-size: 10px; font-weight: 600; letter-spacing: .18em; margin-bottom: 25px; }
.http-story h1 { font-size: clamp(32px, 3.6vw, 58px); line-height: 1.12; letter-spacing: -.045em; font-weight: 600; margin: 0 0 25px; text-wrap: balance; }
.http-story h2 { font-size: clamp(15px, 1.4vw, 19px); font-weight: 500; line-height: 1.6; margin: 0 0 12px; }
.http-story__copy > p { color: var(--story-muted); font-size: 13px; line-height: 1.9; margin: 0; max-width: 410px; }
.http-story__actions { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 22px; margin-top: 30px; }
.http-story__home, .http-story__back { display: inline-flex; align-items: center; justify-content: center; gap: 12px; min-height: 46px; border-radius: 8px; font-size: 12px; font-weight: 500; text-decoration: none; }
.http-story__home { background: var(--story-accent); color: white; padding: 13px 20px; }
.http-story__back { border: 0; background: transparent; color: var(--story-ink); cursor: pointer; padding: 10px 0; }
.http-story__home:hover { filter: brightness(1.12); }
.http-story__back:hover { text-decoration: underline; }
.http-story__actions :focus-visible { outline: 3px solid var(--story-accent); outline-offset: 4px; }
.http-story__note { display: block; margin-top: 36px; font-size: 10px; color: var(--story-muted); }
.http-story__art { width: 115%; max-width: none; margin-left: -5%; color: var(--story-accent); }

:global([data-theme='dark']) .http-story { --story-bg: #202e3d; --story-ink: #edf3fb; --story-muted: #b5c6d7; --story-accent: #a7c8ec; }
:global([data-theme='dark']) .http-story--landscape, :global([data-theme='dark']) .http-story--clock { --story-bg: #203b37; --story-accent: #abdacf; }
:global([data-theme='dark']) .http-story--paper, :global([data-theme='dark']) .http-story--repair { --story-bg: #373126; --story-accent: #ead1a6; }
:global([data-theme='dark']) .http-story__home { color: #202e3d; }
@media (max-width: 760px) { .http-story { grid-template-columns: 1fr; padding: 34px 26px 12px; gap: 10px; min-height: auto; } .http-story__copy { max-width: 100%; } .http-story h1 { max-width: 430px; } .http-story__art { width: min(100%, 420px); margin: 0 auto; } .http-story__note { margin-top: 24px; } }
</style>
