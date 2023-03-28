<script setup lang="ts">
import type { Component } from 'vue'
import { useSlots, h } from 'vue'
import { Icon, IconSpin } from '../icon'

export type HtmlType = 'button' | 'reset' | 'submit'
export type Size = 'default' | 'small' | 'large'
export type Status = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger'
export type Theme = 'solid' | 'borderless' | 'light'

export interface Props {
  ariaLabel?: string
  size?: Size
  status?: Status
  theme?: Theme
  type?: HtmlType
  block?: boolean
  disabled?: boolean
  loading?: boolean
  icon?: string | Component
  iconPlacement?: 'left' | 'right'
}

const props = withDefaults(defineProps<Props>(), {
  ariaLabel: '',
  size: 'default',
  status: 'primary',
  theme: 'light',
  type: 'button',
  block: false,
  disabled: false,
  loading: false,
  icon: undefined,
  iconPlacement: 'left'
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
  (e: 'mousedown', event: MouseEvent): void
  (e: 'mouseenter', event: MouseEvent): void
  (e: 'mouseleave', event: MouseEvent): void
}>()

const handleClick = (e: MouseEvent) => {
  emit('click', e)
}

const handleMouseDown = (e: MouseEvent) => {
  emit('mousedown', e)
}

const handleMouseEnter = (e: MouseEvent) => {
  emit('mouseenter', e)
}

const handleMouseLeave = (e: MouseEvent) => {
  emit('mouseleave', e)
}

const slots = useSlots()
const ButtonIcon = () => {
  if (props.loading && !props.disabled) {
    return h(IconSpin)
  } else if (props.icon) {
    return h(Icon, { component: props.icon })
  } else if (slots.icon) {
    return slots.icon()
  }
}
</script>

<template>
  <button
    :class="[
      'c-button',
      `c-button-${theme}`,
      `c-button-${status}`,
      {[`c-button-${size}`]: size !== 'default'},
      { 'c-button-disabled': disabled },
      { 'c-button-block': block },
      { 'c-button-loading': loading && !disabled },
      { 'c-button-with-icon': loading || icon || $slots.icon },
      { 'c-button-with-icon-only': !$slots.default && (loading || icon || $slots.icon) }
    ]"
    :type="type"
    :disabled="disabled"
    :aria-disabled="disabled"
    :aria-label="ariaLabel"
    @click="handleClick"
    @mousedown="handleMouseDown"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <span class="c-button-content">
      <template v-if="!$slots.default && (loading || icon || $slots.icon)">
        <button-icon />
      </template>
      <template v-else-if="!loading && !$slots.icon && !icon">
        <slot />
      </template>
      <template v-else-if="$slots.default && (loading || icon || $slots.icon)">
        <template v-if="iconPlacement === 'left'">
          <button-icon />
          <span class="c-button-content-right">
            <slot />
          </span>
        </template>
        <template v-else-if="iconPlacement === 'right'">
          <span class="c-button-content-left">
            <slot />
          </span>
          <button-icon />
        </template>
      </template>
    </span>
  </button>
</template>

<style lang="scss">
@use 'button.scss';
</style>
