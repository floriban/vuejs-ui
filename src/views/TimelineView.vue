<script setup lang="ts">
import { ref } from 'vue'
import { Check, CircleDollarSign, PackageCheck, Send } from '@lucide/vue'
import DocsCodeBlock from '../components/docs/DocsCodeBlock.vue'
import DocsPageHeader from '../components/docs/DocsPageHeader.vue'
import AppCard from '../components/ui/AppCard.vue'
import AppCheckbox from '../components/ui/AppCheckbox.vue'
import AppTimeline, { type TimelineItem } from '../components/ui/AppTimeline.vue'

const compact = ref(false)
const alternate = ref(false)
const items: TimelineItem[] = [
  { id: 1, time: '08:30', title: 'Pedido recibido', description: 'La solicitud fue registrada correctamente.', color: 'primary', icon: Send },
  { id: 2, time: '09:15', title: 'Pago confirmado', description: 'Se validó el pago con tarjeta.', color: 'success', icon: CircleDollarSign },
  { id: 3, time: '11:40', title: 'Preparando envío', description: 'El equipo está empacando los productos.', color: 'warning', icon: PackageCheck },
  { id: 4, time: '14:20', title: 'Pedido completado', description: 'La entrega fue confirmada por el cliente.', color: 'info', icon: Check },
]
const basicCode = `<AppTimeline :items="events" />`
const interactiveCode = `<AppTimeline :items="events" :compact="compact" :align="alternate ? 'alternate' : 'left'" />`
</script>

<template>
  <DocsPageHeader eyebrow="Componentes / Timeline" title="Timeline" description="Representa procesos, actividad y eventos ordenados con estados semánticos." />
  <section class="component-section"><div class="section-heading"><div><span>01</span><h2>Vertical</h2></div><p>Secuencia clara para actividad reciente.</p></div><AppCard title="Estado del pedido"><AppTimeline :items="items" /></AppCard><DocsCodeBlock :code="basicCode" /></section>
  <section class="component-section"><div class="section-heading"><div><span>02</span><h2>Prueba interactiva</h2></div><p>Cambia densidad y alineación.</p></div><div class="showcase-panel"><div class="component-row"><AppCheckbox v-model="compact" label="Compacto" /><AppCheckbox v-model="alternate" label="Alternado" /></div><AppTimeline :items="items" :compact="compact" :align="alternate ? 'alternate' : 'left'" /></div><DocsCodeBlock :code="interactiveCode" /></section>
</template>