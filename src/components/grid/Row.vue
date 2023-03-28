<script setup lang="ts">
import { computed, provide } from 'vue'
import type { Gutter } from './interface'
import { calcGutterStyle, useRowSize } from './interface'
import { rowContextKey } from './context'

export interface Props {
  align?: 'top' | 'middle' | 'bottom'
  gutter?: Gutter | [Gutter, Gutter]
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between'
  type?: 'flex'
}

const props = withDefaults(defineProps<Props>(), {
  align: undefined,
  gutter: undefined,
  justify: 'start',
  type: undefined
})

const gutter = computed(() => props.gutter)
provide(rowContextKey, { gutter })

const size = useRowSize()
const rowStyle = computed(() => calcGutterStyle(props.gutter, size.value, 'row'))
</script>

<template>
  <div
    :class="[
      type === 'flex' ? `c-row-${type} ` : 'c-row',
      { [`c-row-${type}-${justify}`]: type && justify },
      { [`c-row-${type}-${align}`]: type && align }
    ]"
    :style="rowStyle"
  >
    <slot />
  </div>
</template>

<!-- <style lang="scss">
@use './grid.scss';
</style> -->
