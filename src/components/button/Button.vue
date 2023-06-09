<script setup lang="ts">
import type { Component } from 'vue'
import { computed, inject } from 'vue'
import { createReusableTemplate } from '@vueuse/core'
import { buttonGroupContextKey } from './context'
import { Icon, IconSpin } from '../icon'

export type HtmlType = 'button' | 'reset' | 'submit'
export type Size = 'small' | 'medium' | 'large'
export type Status = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger'
export type Shape = 'square' | 'circle' | 'round'
export type Theme = 'solid' | 'borderless' | 'light'

interface Props {
  ariaLabel?: string
  size?: Size
  status?: Status
  shape?: Shape
  theme?: Theme
  type?: HtmlType
  block?: boolean
  disabled?: boolean
  loading?: boolean
  icon?: string | Component
  iconPlacement?: 'start' | 'end'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  status: 'primary',
  shape: 'square',
  theme: 'light',
  htmlType: 'button',
  block: false,
  disabled: false,
  loading: false,
  iconPlacement: 'start'
})

const emit = defineEmits<{
  click: [event: MouseEvent]
  mousedown: [event: MouseEvent]
  mouseenter: [event: MouseEvent]
  mouseleave: [event: MouseEvent]
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

const {
  size: _size,
  status: _status,
  shape: _shape,
  theme: _theme,
  disabled: _disabled
} = inject(buttonGroupContextKey, {
  size: computed(() => props.size),
  status: computed(() => props.status),
  shape: computed(() => props.shape),
  theme: computed(() => props.theme),
  disabled: computed(() => props.disabled)
})

const size = computed(() => _size.value || props.size)
const status = computed(() => _status.value || props.status)
const shape = computed(() => _shape.value || props.shape)
const theme = computed(() => _theme.value || props.theme)
const disabled = computed(() => _disabled.value || props.disabled)

const ButtonIcon = createReusableTemplate()
</script>

<template>
  <ButtonIcon.define>
    <Icon v-if="loading && !disabled" :component="IconSpin" />
    <Icon v-else-if="icon" :component="icon" />
    <slot v-else-if="$slots.icon" name="icon" />
  </ButtonIcon.define>

  <button
    :aria-disabled="disabled"
    :aria-label="ariaLabel"
    :class="[
      'c-button',
      `c-button-${theme}`,
      `c-button-${status}`,
      `c-button-${shape}`,
      `c-button-${size}`,
      { 'c-button-disabled': disabled },
      { 'c-button-block': block },
      { 'c-button-loading': loading && !disabled },
      { 'c-button-with-icon': loading || icon || $slots.icon },
      { 'c-button-with-icon-only': !$slots.default && (loading || icon || $slots.icon) }
    ]"
    :disabled="disabled"
    :type="type"
    @click="handleClick"
    @mousedown="handleMouseDown"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <span class="c-button-content">
      <template v-if="!$slots.default && (loading || icon || $slots.icon)">
        <ButtonIcon.reuse />
      </template>
      <template v-else-if="!loading && !$slots.icon && !icon">
        <slot />
      </template>
      <template v-else-if="$slots.default && (loading || icon || $slots.icon)">
        <template v-if="iconPlacement === 'start'">
          <ButtonIcon.reuse />
          <span class="c-button-content-end">
            <slot />
          </span>
        </template>
        <template v-else-if="iconPlacement === 'end'">
          <span class="c-button-content-start">
            <slot />
          </span>
          <ButtonIcon.reuse />
        </template>
      </template>
    </span>
  </button>
</template>

<style lang="scss">
@use './button.scss';
</style>
