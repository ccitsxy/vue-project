<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { shallowRef, watchEffect } from 'vue'
import { useTimeoutFn } from '@vueuse/core'
import SpinIcon from '../icon/IconSpin.vue'

export type Size = 'small' | 'medium' | 'large'

interface Props {
  spin?: boolean
  size?: Size
  delay?: number
  tip?: string
  childStyle?: CSSProperties
}

const props = withDefaults(defineProps<Props>(), {
  spin: true,
  size: 'medium',
  delay: 0
})

const spin = shallowRef(false)
watchEffect(() => {
  if (props.spin) {
    if (props.delay > 0)
      useTimeoutFn(() => {
        spin.value = props.spin
      }, props.delay)
    else {
      spin.value = props.spin
    }
  }
})
</script>

<template>
  <div :class="['c-spin', `c-spin-${size}`, { 'c-spin-hidden': !spin }]">
    <div v-if="spin" class="c-spin-wrapper">
      <div v-if="$slots.indicator" class="c-spin-indicator">
        <slot name="indicator" />
      </div>
      <SpinIcon v-else />
      <div v-if="tip || $slots.tip">
        {{ tip }}
        <slot name="tip" />
      </div>
    </div>
    <div class="c-spin-child" :style="childStyle">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
@use './spin.scss';
</style>
