<script setup lang="ts">
import { computed, inject } from 'vue'
import type { ColSize } from './interface'
import { useRowSize, calColSizeClass, calcGutterStyle } from './interface'
import { rowContextKey } from './context'

export interface Props {
  span?: number
  order?: number
  offset?: number
  pull?: number
  push?: number
  xxl?: ColSize
  xl?: ColSize
  lg?: ColSize
  sm?: ColSize
  xs?: ColSize
}

const props = withDefaults(defineProps<Props>(), {
  span: 0,
  order: 0,
  offset: 0,
  pull: 0,
  push: 0,
  xxl: undefined,
  xl: undefined,
  lg: undefined,
  sm: undefined,
  xs: undefined
})

const colSizeClass = computed(() =>
  calColSizeClass([props.xxl, props.xl, props.lg, props.sm, props.xs])
)

const { gutter } = inject(rowContextKey, { gutter: computed(() => 0) })

const size = useRowSize()
const colStyle = computed(() => calcGutterStyle(gutter.value, size.value, 'col'))
</script>

<template>
  <div
    :class="[
      'c-col',
      { [`c-col-${span}`]: span },
      { [`c-col-order-${order}`]: order },
      { [`c-col-offset-${offset}`]: offset },
      { [`c-col-push-${push}`]: push },
      { [`c-col-push-${pull}`]: pull },
      colSizeClass
    ]"
    :style="colStyle"
  >
    <slot />
  </div>
</template>
