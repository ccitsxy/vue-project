<script setup lang="ts">
import { computed, provide } from 'vue'
import type { Size, Type, Shape, Theme } from './Button.vue'
import { buttonGroupContextKey } from './context'

export interface Props {
  ariaLabel?: string
  size?: Size
  type?: Type
  shape?: Shape
  theme?: Theme
  disabled?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  disabled: false
})

const size = computed(() => props.size)
const type = computed(() => props.type)
const shape = computed(() => props.shape)
const theme = computed(() => props.theme)
const disabled = computed(() => props.disabled)

provide(buttonGroupContextKey, { size, type, shape, theme, disabled })
</script>

<template>
  <div class="c-button-group" role="group">
    <slot />
  </div>
</template>
