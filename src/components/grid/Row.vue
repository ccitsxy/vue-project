<script setup lang="ts">
import { computed, provide } from 'vue'
import type { Gutter } from './interface'
import { calGutterStyle, useRowSize } from './interface'
import { rowContextKey } from './context'

export interface Props {
  align?: 'top' | 'middle' | 'bottom'
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between'
  gutter?: Gutter | [Gutter, Gutter]
}

const props = withDefaults(defineProps<Props>(), {
  align: 'middle',
  justify: 'start',
  gutter: undefined
})

const gutter = computed(() => props.gutter)
provide(rowContextKey, { gutter })

const size = useRowSize()
const rowStyle = computed(() => calGutterStyle(props.gutter, size.value, 'row'))
</script>

<template>
  <div :class="['c-row', `c-row-${justify}`, `c-row-${align}`]" :style="rowStyle">
    <slot />
  </div>
</template>

<style lang="scss">
@use './grid.scss';
</style>
