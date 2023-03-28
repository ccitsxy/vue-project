/* c8 ignore */
<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed } from 'vue'
import { isString, isNumber, isArray } from '@/utils'

export type Align = 'start' | 'center' | 'end' | 'baseline'
export type Gutter = 'loose' | 'medium' | 'tight' | number

export interface Props {
  direction?: 'horizontal' | 'vertical'
  wrap?: boolean
  align?: Align
  gutter?: Gutter | [Gutter, Gutter]
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'horizontal',
  wrap: false,
  align: 'center',
  gutter: 'tight'
})
const calGutterStyleAndClass = (gutter: Gutter | [Gutter, Gutter]) => {
  const gutterStyle: CSSProperties = {}
  const gutterClass: string[] = []

  if (isNumber(gutter)) {
    gutterStyle.rowGap = `${gutter}px`
    gutterStyle.columnGap = `${gutter}px`
  } else if (isArray(gutter)) {
    if (isString(gutter[0])) {
      gutterClass.push(`c-space-${gutter[0]}-horizontal`)
    } else if (isNumber(gutter[0])) {
      gutterStyle.columnGap = `${gutter[0]}px;`
    }
    if (isString(gutter[1])) {
      gutterClass.push(`c-space-${gutter[1]}-vertical`)
    } else if (isNumber(gutter[1])) {
      gutterStyle.rowGap = `${gutter[1]}px`
    }
  } else if (isString(gutter)) {
    gutterClass.push(`c-space-${gutter}-horizontal`)
    gutterClass.push(`c-space-${gutter}-vertical`)
  }

  return { gutterStyle, gutterClass }
}

const gutterStyleAndClass = computed(() => calGutterStyleAndClass(props.gutter))
</script>

<template>
  <div
    :class="[
      'c-space',
      `c-space-align-${align}`,
      `c-space-${direction}`,
      { 'c-space-wrap': wrap },
      gutterStyleAndClass.gutterClass
    ]"
    :style="gutterStyleAndClass.gutterStyle"
  >
    <slot />
  </div>
</template>
<style lang="scss">
@use './space.scss';
</style>
