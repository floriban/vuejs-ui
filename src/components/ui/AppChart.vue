<script setup lang="ts">
import { computed } from 'vue'
import { use } from 'echarts/core'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent, AriaComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { EChartsOption } from 'echarts'
import VChart from 'vue-echarts'
import { useTheme } from '../../composables/useTheme'
use([BarChart, LineChart, PieChart, GridComponent, TooltipComponent, LegendComponent, AriaComponent, CanvasRenderer])
const props = withDefaults(defineProps<{ option: EChartsOption; label: string; height?: number; loading?: boolean }>(), { height: 320, loading: false })
const { theme } = useTheme()
const options = computed<EChartsOption>(() => {
  const dark = theme.value === 'dark'
  return {
    color: ['#3699ff', '#1bc5bd', '#a78bfa', '#ffa800', '#f64e60'],
    backgroundColor: 'transparent',
    textStyle: { fontFamily: 'Poppins, sans-serif', color: dark ? '#eeeeee' : '#3f4254' },
    aria: { enabled: true, description: props.label },
    ...props.option,
  }
})
</script>
<template>
  <VChart class="app-chart" :style="{ height: `${height}px` }" :option="options" :theme="theme === 'dark' ? 'dark' : undefined" :loading="loading" :update-options="{ notMerge: true }" autoresize :aria-label="label" />
</template>
