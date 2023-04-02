<script setup lang="ts">
import { watch, shallowRef } from 'vue'
import { useElementSize } from '@vueuse/core'

export interface Props {
  collapsedHeight?: number
  duration?: number
  fade?: boolean
  isOpen?: boolean
  keepDOM?: boolean
  motion?: boolean
  reCalcKey?: number | string
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  collapsedHeight: 0,
  duration: 250,
  fade: false,
  isOpen: false,
  keepDOM: false,
  motion: true,
  reCalcKey: undefined,
  id: undefined
})

const emit = defineEmits<{
  (e: 'motion-end', event: TransitionEvent): void
}>()

const isTransitioning = shallowRef(false)

watch(
  () => props.isOpen,
  () => {
    isTransitioning.value = true
  }
)

const handleTransitionEnd = (e: TransitionEvent) => {
  emit('motion-end', e)
  isTransitioning.value = false
}

const children = shallowRef<HTMLElement | null>()
const { height: childHeight } = useElementSize(children)
</script>

<template>
  <div
    :id="id"
    :class="['c-collapsible', { 'c-collapsible-transition': motion && isTransitioning }]"
    :style="{
      overflow: 'hidden',
      height: isOpen ? `${childHeight}px` : `${collapsedHeight}px`,
      opacity: isOpen || !fade || collapsedHeight !== 0 ? 1 : 0,
      transitionDuration: `${motion && isTransitioning ? duration : 0}ms`
    }"
    @transitionend="handleTransitionEnd"
  >
    <div ref="children" :key="reCalcKey" style="overflow: hidden">
      <slot v-if="(keepDOM || collapsedHeight !== 0 || isOpen) && $slots.default" />
    </div>
  </div>
</template>

<style lang="scss">
@use './collapsible.scss';
</style>
