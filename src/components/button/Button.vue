<script setup lang="ts">
import type { PropType, HTMLAttributes, ButtonHTMLAttributes, Component } from 'vue'
import { useSlots, h } from 'vue'
import { Icon } from '../icon'
import { SpinIcon } from '../spin'

export type HtmlType = 'button' | 'reset' | 'submit'
export type Size = 'default' | 'small' | 'large'
export type Status = 'primary' | 'secondary' | 'tertiary'| 'success' | 'warning' | 'danger'
export type Theme = 'solid' | 'borderless' | 'light'

const props = defineProps({
  ariaLabel: {
    type: String as PropType<HTMLAttributes['aria-label']>,
    default: undefined
  },
  icon: {
    type: [String, Function, Object] as PropType<string | Component>,
    default: undefined
  },
  size: {
    type: String as PropType<Size>,
    default: 'default'
  },
  status: {
    type: String as PropType<Status>,
    default: 'primary'
  },
  theme: {
    type: String as PropType<Theme>,
    default: 'light'
  },
  type: {
    type: String as PropType<ButtonHTMLAttributes['type']>,
    default: 'button'
  },
  block: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  iconPlacement: {
    type: String as PropType<'left' | 'right'>,
    default: 'left'
  }
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
  (e: 'mouse-down', event: MouseEvent): void
  (e: 'mouse-enter', event: MouseEvent): void
  (e: 'mouse-leave', event: MouseEvent): void
}>()

const handleClick = (e: MouseEvent) => {
  emit('click', e)
}

const handleMouseDown = (e: MouseEvent) => {
  emit('click', e)
}

const handleMouseEnter = (e: MouseEvent) => {
  emit('mouse-enter', e)
}

const handleMouseLeave = (e: MouseEvent) => {
  emit('mouse-leave', e)
}

const slots = useSlots()
const ButtonIcon = () => {
  if (props.loading && !props.disabled) {
    return h(SpinIcon)
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
      'button',
      `button-${theme}`,
      `button-${size}`,
      disabled ? 'button-disabled' : `button-${status}`,
      { 'button-block': block },
      { 'button-loading': loading && !disabled },
      { 'button-with-icon': loading || icon || $slots.icon },
      { 'button-with-icon-only': !$slots.default && (loading || icon || $slots.icon) }
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
    <span class="button-content">
      <template v-if="!$slots.default && (loading || icon || $slots.icon)">
        <button-icon />
      </template>
      <template v-else-if="!loading && !$slots.icon && !icon">
        <slot />
      </template>
      <template v-else-if="$slots.default && (loading || icon || $slots.icon)">
        <template v-if="iconPlacement === 'left'">
          <button-icon />
          <span class="button-content-right">
            <slot />
          </span>
        </template>
        <template v-else-if="iconPlacement === 'right'">
          <span class="button-content-left">
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
