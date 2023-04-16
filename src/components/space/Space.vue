<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed } from 'vue'

export type Align = 'start' | 'center' | 'end' | 'baseline'
export type Gap = 'loose' | 'medium' | 'tight' | number

export interface Props {
  direction?: 'horizontal' | 'vertical'
  wrap?: boolean
  align?: Align
  gap?: Gap | [Gap, Gap]
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'horizontal',
  wrap: false,
  align: 'center',
  gap: 'medium'
})
const useGapStyleAndClass = (gap: Gap | [Gap, Gap]) => {
  const gapStyle: CSSProperties = {}
  const gapClass: string[] = []

  if (typeof gap === 'number') {
    gapStyle.rowGap = `${gap}px`
    gapStyle.columnGap = `${gap}px`
  } else if (Array.isArray(gap)) {
    if (typeof gap[0] === 'string') {
      gapClass.push(`c-space-${gap[0]}-horizontal`)
    } else if (typeof gap[0] === 'number') {
      gapStyle.columnGap = `${gap[0]}px;`
    }
    if (typeof gap[1] === 'string') {
      gapClass.push(`c-space-${gap[1]}-vertical`)
    } else if (typeof gap[1] === 'number') {
      gapStyle.rowGap = `${gap[1]}px`
    }
  } else if (typeof gap === 'string') {
    gapClass.push(`c-space-${gap}-horizontal`)
    gapClass.push(`c-space-${gap}-vertical`)
  }

  return { gapStyle, gapClass }
}

const gapStyleAndClass = computed(() => useGapStyleAndClass(props.gap))
</script>

<template>
  <div
    :class="[
      'c-space',
      `c-space-align-${align}`,
      `c-space-${direction}`,
      { 'c-space-wrap': wrap },
      gapStyleAndClass.gapClass
    ]"
    :style="gapStyleAndClass.gapStyle"
  >
    <slot />
  </div>
</template>

<style lang="scss">
@use './space.scss';
</style>
