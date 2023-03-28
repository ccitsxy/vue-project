<script setup lang="ts">
import type { Component } from 'vue'

export type IconSize = 'inherit' | 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large'

export interface Props {
  ariaLabel?: string
  component?: string | Component
  rotate?: number
  size?: IconSize
  spin?: boolean
}

withDefaults(defineProps<Props>(), {
  ariaLabel: '',
  component: undefined,
  rotate: undefined,
  size: 'medium',
  spin: false
})
</script>

<template>
  <span
    role="img"
    :class="['c-icon', `c-icon-${size}`, { 'c-icon-spin': spin }]"
    :style="{
      transform: `rotate(${rotate}deg)`
    }"
    :aria-label="ariaLabel"
  >
    <component :is="component" v-if="component" />
    <slot v-else-if="$slots.default" />
  </span>
</template>

<style lang="scss">
@use './icon.scss';
</style>
