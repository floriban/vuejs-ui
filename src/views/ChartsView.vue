<script setup lang="ts">
import { computed, ref } from 'vue'
import type { EChartsOption } from 'echarts'
import AppChart from '../components/ui/AppChart.vue'
import AppCard from '../components/ui/AppCard.vue'
import DocsPageHeader from '../components/docs/DocsPageHeader.vue'
import DocsCodeBlock from '../components/docs/DocsCodeBlock.vue'
import DocsApiReference from '../components/docs/DocsApiReference.vue'
const period = ref('week')
const categories = computed(() => period.value === 'week' ? ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'] : ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'])
const values = computed(() => period.value === 'week' ? [120, 190, 150, 240, 210, 320, 280] : [1200, 1900, 1600, 2400, 2100, 3200, 2800])
const bar = computed<EChartsOption>(() => ({ tooltip: { trigger: 'axis' }, grid: { left: 55, right: 20, bottom: 35, top: 30 }, xAxis: { type: 'category', data: categories.value }, yAxis: { type: 'value' }, series: [{ name: 'Ventas (S/)', type: 'bar', data: values.value, barMaxWidth: 38, itemStyle: { borderRadius: [5, 5, 0, 0] } }] }))
const line = computed<EChartsOption>(() => ({ ...bar.value, series: [{ name: 'Ingresos (S/)', type: 'line', smooth: true, data: values.value, areaStyle: { opacity: 0.12 } }] }))
const distribution = [{ name: 'Salón', value: 45 }, { name: 'Delivery', value: 35 }, { name: 'Para llevar', value: 20 }]
const pie: EChartsOption = { tooltip: { trigger: 'item' }, legend: { bottom: 0 }, series: [{ name: 'Pedidos', type: 'pie', radius: '62%', center: ['50%', '45%'], data: distribution, label: { formatter: '{b}: {d}%' } }] }
const donut: EChartsOption = { ...pie, series: [{ name: 'Pedidos', type: 'pie', radius: ['40%', '64%'], center: ['50%', '45%'], data: distribution, label: { show: false }, emphasis: { label: { show: true, formatter: '{b}\n{d}%', fontSize: 16 } } }] }
const rows = [['option', 'EChartsOption', '—', 'Configuración ECharts. Se registran barras, líneas y tortas; añade otros tipos al componente cuando los necesites.'], ['label', 'string', '—', 'Descripción accesible del gráfico.'], ['height', 'number', '320', 'Altura en píxeles.'], ['loading', 'boolean', 'false', 'Muestra el indicador de carga.']] as const
const code = '<AppChart :option="chartOptions" label="Ventas por día" :height="320" />'
</script>
<template>
  <DocsPageHeader eyebrow="Integraciones / Apache ECharts" title="Gráficos" description="Visualizaciones interactivas con Apache ECharts. Los ejemplos usan datos de muestra y se adaptan al tema del dashboard." />
  <section class="component-section">
    <div class="section-heading"><div><span>01</span><h2>Ventas e ingresos</h2></div><label>Período <select v-model="period" class="app-control"><option value="week">Esta semana</option><option value="year">Por mes</option></select></label></div>
    <div class="charts-grid"><AppCard title="Ventas por período"><AppChart :option="bar" label="Ventas en soles por período" /></AppCard><AppCard title="Evolución de ingresos"><AppChart :option="line" label="Evolución de ingresos en soles" /></AppCard></div>
  </section>
  <section class="component-section"><div class="section-heading"><div><span>02</span><h2>Distribución de pedidos</h2></div><p>Selecciona una categoría en la leyenda para ocultarla.</p></div><div class="charts-grid"><AppCard title="Gráfico de torta"><AppChart :option="pie" label="Pedidos: salón 45%, delivery 35%, para llevar 20%" /></AppCard><AppCard title="Gráfico de dona"><AppChart :option="donut" label="Pedidos por canal: salón 45%, delivery 35%, para llevar 20%" /></AppCard></div></section>
  <DocsCodeBlock :code="code" /><DocsApiReference component-name="AppChart" :rows="rows" note="El tema y el tamaño del contenedor se sincronizan automáticamente. Las opciones propias permiten personalizar colores y series." />
</template>
