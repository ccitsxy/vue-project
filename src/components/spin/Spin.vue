<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { shallowRef, watchEffect } from 'vue'
import { useTimeoutFn } from '@vueuse/core'
import SpinIcon from './SpinIcon.vue'

export type SpinSize = 'small' | 'middle' | 'large'

export interface Props {
  spin?: boolean
  size?: SpinSize
  delay?: number
  tip?: string
  wrapperClassName?: string
  childStyle?: CSSProperties
}

const props = withDefaults(defineProps<Props>(), {
  spin: true,
  size: 'middle',
  delay: 0,
  tip: undefined,
  wrapperClassName: undefined,
  childStyle: undefined
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
  <div :class="['spin', `spin-${size}`, { 'spin-hidden': !spin }, wrapperClassName]">
    <div v-if="spin" class="spin-wrapper">
      <div v-if="$slots.indicator" class="spin-indicator">
        <slot name="indicator" />
      </div>
      <SpinIcon v-else />
      <div v-if="tip || $slots.tip">
        {{ tip }}
        <slot name="tip" />
      </div>
    </div>
    <div class="spin-child" :style="childStyle">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
@use './spin.scss';
</style>
