<script setup lang="ts">
import { computed, inject } from 'vue'
import type { ColSize } from './interface'
import { useRowSize, useColSizeClass, useGutterStyle } from './interface'
import { rowContextKey } from './context'

interface Props {
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
  push: 0
})

const colSizeClass = computed(() =>
  useColSizeClass([props.xxl, props.xl, props.lg, props.sm, props.xs])
)

const { gutter } = inject(rowContextKey, { gutter: computed(() => 0) })

const size = useRowSize()
const colStyle = computed(() => useGutterStyle(gutter.value, size.value, 'col'))
</script>

<template>
  <div
    :class="[
      'c-col',
      `c-col-${span}`,
      { [`c-col-order-${order}`]: order },
      { [`c-col-offset-${offset}`]: offset },
      { [`c-col-push-${push}`]: push },
      { [`c-col-pull-${pull}`]: pull },
      colSizeClass
    ]"
    :style="colStyle"
  >
    <slot />
  </div>
</template>
