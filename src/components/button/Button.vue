<script setup lang="ts">
import type { Component } from 'vue'
import { useSlots, h, computed, inject } from 'vue'
import { buttonGroupContextKey } from './context'
import { Icon, IconSpin } from '../icon'

export type HtmlType = 'button' | 'reset' | 'submit'
export type Size = 'small' | 'medium' | 'large'
export type Type = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger'
export type Shape = 'square' | 'circle' | 'round'
export type Theme = 'solid' | 'borderless' | 'light'

export interface Props {
  ariaLabel?: string
  size?: Size
  type?: Type
  shape?: Shape
  theme?: Theme
  htmlType?: HtmlType
  block?: boolean
  disabled?: boolean
  loading?: boolean
  icon?: string | Component
  iconPlacement?: 'start' | 'end'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  type: 'primary',
  shape: 'square',
  theme: 'light',
  htmlType: 'button',
  block: false,
  disabled: false,
  loading: false,
  iconPlacement: 'start'
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
  (e: 'mousedown', event: MouseEvent): void
  (e: 'mouseenter', event: MouseEvent): void
  (e: 'mouseleave', event: MouseEvent): void
}>()

const handleClick = (e: MouseEvent) => {
  if (!props.loading && !props.disabled) emit('click', e)
}

const handleMouseDown = (e: MouseEvent) => {
  if (!props.loading && !props.disabled) emit('mousedown', e)
}

const handleMouseEnter = (e: MouseEvent) => {
  if (!props.loading && !props.disabled) emit('mouseenter', e)
}

const handleMouseLeave = (e: MouseEvent) => {
  if (!props.loading && !props.disabled) emit('mouseleave', e)
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

const {
  size: _size,
  type: _type,
  shape: _shape,
  theme: _theme,
  disabled: _disabled
} = inject(buttonGroupContextKey, {
  size: computed(() => props.size),
  type: computed(() => props.type),
  shape: computed(() => props.shape),
  theme: computed(() => props.theme),
  disabled: computed(() => props.disabled)
})

const size = computed(() => _size.value || props.size)
const type = computed(() => _type.value || props.type)
const shape = computed(() => _shape.value || props.shape)
const theme = computed(() => _theme.value || props.theme)
const disabled = computed(() => _disabled.value || props.disabled)
</script>

<template>
  <button
    :aria-disabled="disabled"
    :aria-label="ariaLabel"
    :class="[
      'c-button',
      `c-button-${theme}`,
      `c-button-${type}`,
      `c-button-${shape}`,
      `c-button-${size}`,
      { 'c-button-disabled': disabled },
      { 'c-button-block': block },
      { 'c-button-loading': loading && !disabled },
      { 'c-button-with-icon': loading || icon || $slots.icon },
      { 'c-button-with-icon-only': !$slots.default && (loading || icon || $slots.icon) }
    ]"
    :disabled="disabled"
    :type="htmlType"
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
        <template v-if="iconPlacement === 'start'">
          <button-icon />
          <span class="c-button-content-end">
            <slot />
          </span>
        </template>
        <template v-else-if="iconPlacement === 'end'">
          <span class="c-button-content-start">
            <slot />
          </span>
          <button-icon />
        </template>
      </template>
    </span>
  </button>
</template>

<style lang="scss">
@use './button.scss';
</style>
