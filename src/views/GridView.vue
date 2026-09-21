<script setup lang="ts">
import AppCard from '../components/ui/AppCard.vue'
import DocsPageHeader from '../components/docs/DocsPageHeader.vue'
import DocsCodeBlock from '../components/docs/DocsCodeBlock.vue'
const layouts = [
 { title: 'Indicadores: 1 → 2 → 4 columnas', description: 'Ideal para ventas, pedidos, clientes y ticket promedio.', grid: 'grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4', spans: ['', '', '', ''], labels: ['Ventas', 'Pedidos', 'Clientes', 'Ticket promedio'] },
 { title: 'Comparación: 1 → 2 columnas', description: 'Dos gráficos o formularios con el mismo protagonismo.', grid: 'grid grid-cols-1 gap-6 lg:grid-cols-2', spans: ['', ''], labels: ['Ingresos', 'Gastos'] },
 { title: 'Catálogo: 1 → 2 → 3 columnas', description: 'Productos, planes y tarjetas de contenido.', grid: 'grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3', spans: ['', '', ''], labels: ['Producto A', 'Producto B', 'Producto C'] },
 { title: 'Principal + resumen: 8 / 4', description: 'Un gráfico amplio acompañado de indicadores.', grid: 'grid grid-cols-1 gap-6 lg:grid-cols-12', spans: ['lg:col-span-8', 'lg:col-span-4'], labels: ['Gráfico de ventas · 8 columnas', 'Resumen · 4 columnas'] },
 { title: 'Filtros + contenido: 3 / 9', description: 'Filtros a la izquierda y resultados a la derecha.', grid: 'grid grid-cols-1 gap-6 lg:grid-cols-12', spans: ['lg:col-span-3', 'lg:col-span-9'], labels: ['Filtros · 3 columnas', 'Resultados · 9 columnas'] },
 { title: 'Formulario + ayuda: 7 / 5', description: 'Edición de información con una guía contextual.', grid: 'grid grid-cols-1 gap-6 lg:grid-cols-12', spans: ['lg:col-span-7', 'lg:col-span-5'], labels: ['Formulario · 7 columnas', 'Ayuda · 5 columnas'] },
]
function code(layout: typeof layouts[number]) { return `<div class="${layout.grid}">\n${layout.labels.map((label, index) => `  <AppCard class="${layout.spans[index]}" title="${label}" />`).join('\n')}\n</div>` }
</script>
<template>
  <DocsPageHeader eyebrow="Utilidades / Distribución" title="Distribuciones responsive" description="Patrones de cuadrícula para tarjetas. Reduce el ancho de la ventana para ver cómo se apilan; gap-6 mantiene una separación de 24 px." />
  <section v-for="(layout, index) in layouts" :key="layout.title" class="component-section"><div class="section-heading"><div><span>0{{ index + 1 }}</span><h2>{{ layout.title }}</h2></div><p>{{ layout.description }}</p></div><div :class="layout.grid"><AppCard v-for="(label, item) in layout.labels" :key="label" :class="layout.spans[item]" :title="label"><div class="grid-demo-block">{{ layout.spans[item] || 'Ancho compartido' }}</div></AppCard></div><DocsCodeBlock :code="code(layout)" /></section>
</template>
