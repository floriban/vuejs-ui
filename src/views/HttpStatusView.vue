<script setup lang="ts">
import { useRouter } from 'vue-router'
import AppHttpState from '../components/ui/AppHttpState.vue'
import type { HttpPageCode } from '../config/httpPages'
defineProps<{ code: HttpPageCode }>()
const router = useRouter()
function goBack() {
  if (window.history.state?.back) router.back()
  else void router.push({ name: 'http-pages' })
}
</script>
<template>
  <div class="route-state-page"><AppHttpState :code="code" @back="goBack" /></div>
</template>
