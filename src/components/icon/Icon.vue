<script setup lang="ts">
import type { PropType, HTMLAttributes, Component } from 'vue'

export type IconSize = 'inherit' | 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large'

defineProps({
  ariaLabel: {
    type: String as PropType<HTMLAttributes['aria-label']>,
    default: undefined
  },
  component: {
    type: [String, Function, Object] as PropType<string | Component>,
    default: undefined
  },
  size: {
    type: String as PropType<IconSize>,
    default: 'medium'
  },
  spin: {
    type: Boolean,
    default: false
  },
  rotate: {
    type: Number,
    default: undefined
  }
})
</script>

<template>
  <span
    role="img"
    :class="['icon', `icon-${size}`, { 'icon-spin': spin }]"
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
.icon {
  display: inline-block;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  text-rendering: optimizeLegibility;
  fill: currentColor;
}

.icon-extra-small {
  font-size: var(--icon-extra-small);
}

.icon-small {
  font-size: var(--icon-small);
}

.icon-medium {
  font-size: var(--icon-medium);
}

.icon-large {
  font-size: var(--icon-large);
}

.icon-extra-large {
  font-size: var(--icon-extra-large);
}

.icon-spin {
  animation: var(--icon-spin-animation-duration) linear infinite animation-spin;
  animation-fill-mode: forwards;
}
</style>
