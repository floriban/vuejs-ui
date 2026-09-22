<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import Sortable, { type Options, type SortableEvent } from 'sortablejs'

const props = withDefaults(
  defineProps<{
    itemKey: string
    tag?: string
    group?: Options['group']
    handle?: string
    animation?: number
    disabled?: boolean
    ariaLabel?: string
  }>(),
  {
    tag: 'div',
    group: undefined,
    handle: undefined,
    animation: 180,
    disabled: false,
    ariaLabel: 'Lista ordenable',
  },
)

const model = defineModel<any[]>({ required: true })
const emit = defineEmits<{
  change: [payload: { item: unknown; oldIndex: number; newIndex: number }]
}>()

const root = ref<HTMLElement>()
const announcement = ref('')
let sortable: Sortable | undefined

function keyFor(item: any, index: number) {
  return item?.[props.itemKey] ?? index
}

function move(oldIndex: number, newIndex: number) {
  if (props.disabled || oldIndex === newIndex || newIndex < 0 || newIndex >= model.value.length) return
  const next = [...model.value]
  const [item] = next.splice(oldIndex, 1)
  next.splice(newIndex, 0, item)
  model.value = next
  announcement.value = `Elemento movido de la posición ${oldIndex + 1} a la ${newIndex + 1}.`
  emit('change', { item, oldIndex, newIndex })
}

function handleEnd(event: SortableEvent) {
  if (event.oldIndex === undefined || event.newIndex === undefined) return
  move(event.oldIndex, event.newIndex)
}

function handleKeydown(event: KeyboardEvent, index: number) {
  if (!event.altKey || !['ArrowUp', 'ArrowDown'].includes(event.key)) return
  event.preventDefault()
  const nextIndex = index + (event.key === 'ArrowUp' ? -1 : 1)
  move(index, nextIndex)
  void nextTick(() => root.value?.children[nextIndex]?.querySelector<HTMLElement>('[data-sortable-focus]')?.focus())
}

function createSortable() {
  if (!root.value) return
  sortable?.destroy()
  sortable = Sortable.create(root.value, {
    animation: props.animation,
    disabled: props.disabled,
    group: props.group,
    handle: props.handle,
    draggable: '.app-sortable__item',
    ghostClass: 'app-sortable__item--ghost',
    chosenClass: 'app-sortable__item--chosen',
    dragClass: 'app-sortable__item--dragging',
    onEnd: handleEnd,
  })
}

onMounted(createSortable)
watch(() => [props.disabled, props.animation, props.handle, props.group], createSortable, { deep: true })
onBeforeUnmount(() => sortable?.destroy())
</script>

<template>
  <component :is="tag" ref="root" class="app-sortable" role="list" :aria-label="ariaLabel">
    <div
      v-for="(item, index) in model"
      :key="keyFor(item, index)"
      class="app-sortable__item"
      role="listitem"
      :aria-label="`Elemento ${index + 1} de ${model.length}`"
      @keydown="handleKeydown($event, index)"
    >
      <slot
        name="item"
        :item="item"
        :index="index"
        :move-up="() => move(index, index - 1)"
        :move-down="() => move(index, index + 1)"
        :first="index === 0"
        :last="index === model.length - 1"
      />
    </div>
  </component>
  <p class="sr-only" aria-live="polite">{{ announcement }}</p>
</template>
