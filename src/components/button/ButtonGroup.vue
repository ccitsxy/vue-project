<script setup lang="ts">
import { computed, provide } from 'vue'
import type { Size, Status, Shape, Theme } from './Button.vue'
import { buttonGroupContextKey } from './context'

interface Props {
  ariaLabel?: string
  size?: Size
  status?: Status
  shape?: Shape
  theme?: Theme
  disabled?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  disabled: false
})

const size = computed(() => props.size)
const status = computed(() => props.status)
const shape = computed(() => props.shape)
const theme = computed(() => props.theme)
const disabled = computed(() => props.disabled)

provide(buttonGroupContextKey, { size, status, shape, theme, disabled })
</script>

<template>
  <div class="c-button-group" role="group">
    <slot />
  </div>
</template>
