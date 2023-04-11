<script setup lang="ts">
import { Button } from '../button'
import { shallowRef, onMounted, computed, watch } from 'vue'
import { useScroll, useTransition, TransitionPresets, useWindowScroll } from '@vueuse/core'
import { IconArrowUp } from '../icon'

export interface Props {
  duration?: number
  target?: string
  visibilityHeight?: number
}
const props = withDefaults(defineProps<Props>(), {
  duration: 450,
  target: 'window',
  visibilityHeight: 400
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const handleClick = (e: MouseEvent) => {
  emit('click', e)
  handleTransition()
}

const element = shallowRef<HTMLElement | null>(null)
onMounted(() => {
  element.value = document.querySelector(props.target) as HTMLElement
})
const { y: windowY } = useWindowScroll()
const { y: elementY } = useScroll(element)
const visible = computed(
  () => (props.target === 'window' ? windowY.value : elementY.value) > props.visibilityHeight
)

const handleTransition = () => {
  const source = shallowRef(0)
  source.value = props.target === 'window' ? windowY.value : elementY.value
  const output = useTransition(source, {
    duration: props.duration,
    transition: TransitionPresets.easeInOutCubic
  })
  source.value = 0
  watch(
    () => output.value,
    (newVal) => {
      props.target === 'window'
        ? window.scrollTo({
            top: newVal
          })
        : element.value?.scrollTo({
            top: newVal
          })
    }
  )
}
</script>

<template>
  <div v-if="visible" class="c-back-top" @click="handleClick">
    <slot v-if="$slots.default" />
    <Button v-else :icon="IconArrowUp" shape="circle" size="large" theme="light"/>
  </div>
</template>

<style lang="scss">
@use './backTop.scss';
</style>
