import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch, type CSSProperties, type Ref } from 'vue'

export function useFloatingPanel(anchor: Ref<HTMLElement | undefined>, open: Ref<boolean>, gap = 6) {
  const panel = ref<HTMLElement>()
  const placement = ref<'top' | 'bottom'>('bottom')
  const positioned = ref(false)
  const coordinates = ref({ top: 0, left: 0, width: 0, maxHeight: 260 })
  let frame = 0

  const style = computed<CSSProperties>(() => ({
    position: 'fixed',
    top: `${coordinates.value.top}px`,
    left: `${coordinates.value.left}px`,
    width: `${coordinates.value.width}px`,
    maxHeight: `${coordinates.value.maxHeight}px`,
    visibility: positioned.value ? 'visible' : 'hidden',
  }))

  function update() {
    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(() => {
      if (!open.value || !anchor.value) return
      const rect = anchor.value.getBoundingClientRect()
      const viewportPadding = 12
      const availableBelow = window.innerHeight - rect.bottom - viewportPadding - gap
      const availableAbove = rect.top - viewportPadding - gap
      const expectedHeight = Math.min(panel.value?.scrollHeight ?? 260, 320)
      const opensAbove = availableBelow < Math.min(expectedHeight, 180) && availableAbove > availableBelow
      placement.value = opensAbove ? 'top' : 'bottom'
      const maxHeight = Math.max(120, Math.min(320, opensAbove ? availableAbove : availableBelow))
      const panelHeight = Math.min(panel.value?.offsetHeight ?? expectedHeight, maxHeight)
      const width = Math.min(rect.width, window.innerWidth - viewportPadding * 2)
      const left = Math.max(viewportPadding, Math.min(rect.left, window.innerWidth - width - viewportPadding))
      coordinates.value = {
        top: opensAbove ? Math.max(viewportPadding, rect.top - panelHeight - gap) : rect.bottom + gap,
        left,
        width,
        maxHeight,
      }
      positioned.value = true
    })
  }

  watch(open, async (value) => {
    positioned.value = false
    if (!value) return
    await nextTick()
    update()
    await nextTick()
    update()
  })

  onMounted(() => {
    window.addEventListener('resize', update)
    window.addEventListener('scroll', update, true)
  })
  onBeforeUnmount(() => {
    cancelAnimationFrame(frame)
    window.removeEventListener('resize', update)
    window.removeEventListener('scroll', update, true)
  })

  return { panel, panelStyle: style, placement, update }
}
