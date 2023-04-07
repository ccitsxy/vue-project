<script setup lang="ts">
import { computed, provide } from 'vue'
import type { Gutter } from './interface'
import { useGutterStyle, useRowSize } from './interface'
import { rowContextKey } from './context'

export interface Props {
  align?: 'start' | 'center' | 'end'
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between'
  gutter?: Gutter | [Gutter, Gutter]
}

const props = withDefaults(defineProps<Props>(), {
  align: 'center',
  justify: 'start',
  gutter: undefined
})

const gutter = computed(() => props.gutter)
provide(rowContextKey, { gutter })

const size = useRowSize()
const rowStyle = computed(() => useGutterStyle(props.gutter, size.value, 'row'))
</script>

<template>
  <div :class="['c-row', `c-row-align-${align}`, `c-row-justify-${justify}`]" :style="rowStyle">
    <slot />
  </div>
</template>

<style lang="scss">
@use './grid.scss';
</style>
