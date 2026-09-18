<script setup lang="ts">
import { computed, watch } from 'vue'
import { ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight } from '@lucide/vue'

type PaginationToken = number | 'ellipsis-left' | 'ellipsis-right'

const props = withDefaults(
  defineProps<{
    totalItems: number
    pageSize?: number
    siblingCount?: number
    showEdges?: boolean
    disabled?: boolean
    label?: string
  }>(),
  {
    pageSize: 10,
    siblingCount: 1,
    showEdges: true,
    disabled: false,
    label: 'Paginación',
  },
)

const model = defineModel<number>({ default: 1 })
const emit = defineEmits<{ change: [page: number] }>()

const totalPages = computed(() => Math.max(1, Math.ceil(props.totalItems / Math.max(1, props.pageSize))))

const tokens = computed<PaginationToken[]>(() => {
  const total = totalPages.value
  const current = Math.min(total, Math.max(1, model.value))
  const sibling = Math.max(0, props.siblingCount)

  if (total <= sibling * 2 + 5) {
    return Array.from({ length: total }, (_, index) => index + 1)
  }

  const result: PaginationToken[] = [1]
  const left = Math.max(2, current - sibling)
  const right = Math.min(total - 1, current + sibling)

  if (left > 2) result.push('ellipsis-left')
  for (let page = left; page <= right; page += 1) result.push(page)
  if (right < total - 1) result.push('ellipsis-right')
  result.push(total)

  return result
})

watch(totalPages, (total) => {
  if (model.value > total) model.value = total
  else if (model.value < 1) model.value = 1
})

function goTo(page: number) {
  if (props.disabled) return

  const nextPage = Math.min(totalPages.value, Math.max(1, page))
  if (nextPage === model.value) return

  model.value = nextPage
  emit('change', nextPage)
}
</script>

<template>
  <nav class="app-pagination" :aria-label="label">
    <button v-if="showEdges" type="button" class="app-pagination__button app-pagination__button--icon"
      :disabled="disabled || model <= 1" aria-label="Primera página" @click="goTo(1)">
      <ChevronsLeft :size="17" aria-hidden="true" />
    </button>
    <button type="button" class="app-pagination__button app-pagination__button--icon"
      :disabled="disabled || model <= 1" aria-label="Página anterior" @click="goTo(model - 1)">
      <ChevronLeft :size="17" aria-hidden="true" />
    </button>

    <template v-for="token in tokens" :key="token">
      <span v-if="typeof token !== 'number'" class="app-pagination__ellipsis" aria-hidden="true">…</span>
      <button v-else type="button" class="app-pagination__button"
        :class="{ 'app-pagination__button--active': token === model }"
        :aria-current="token === model ? 'page' : undefined"
        :aria-label="'Página ' + token"
        :disabled="disabled" @click="goTo(token)">
        {{ token }}
      </button>
    </template>

    <button type="button" class="app-pagination__button app-pagination__button--icon"
      :disabled="disabled || model >= totalPages" aria-label="Página siguiente" @click="goTo(model + 1)">
      <ChevronRight :size="17" aria-hidden="true" />
    </button>
    <button v-if="showEdges" type="button" class="app-pagination__button app-pagination__button--icon"
      :disabled="disabled || model >= totalPages" aria-label="Última página" @click="goTo(totalPages)">
      <ChevronsRight :size="17" aria-hidden="true" />
    </button>
  </nav>
</template>
