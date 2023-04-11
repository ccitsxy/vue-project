<script setup lang="ts">
import { computed } from 'vue'
import { Spin } from '../spin'

export type Size = 'small' | 'medium' | 'large'

export interface Props {
  ariaLabel?: string
  ariaLabelledby?: string
  checked?: boolean
  defaultChecked?: boolean
  checkedText?: string
  uncheckedText?: string
  disabled?: boolean
  loading?: boolean
  size?: Size
}

const props = withDefaults(defineProps<Props>(), {
  ariaLabel: undefined,
  ariaLabelledby: undefined,
  checked: false,
  defaultChecked: false,
  checkedText: undefined,
  uncheckedText: undefined,
  disabled: false,
  loading: false,
  size: 'medium'
})

const emit = defineEmits<{
  (e: 'update:checked', value: boolean): void
  (e: 'mouse-enter', event: MouseEvent): void
  (e: 'mouse-leave', event: MouseEvent): void
}>()

const checked = computed({
  get() {
    return props.defaultChecked || props.checked
  },
  set(value: boolean) {
    emit('update:checked', value)
  }
})

const handleClick = () => {
  checked.value = !checked.value
}

const handleMouseEnter = (e: MouseEvent) => {
  emit('mouse-enter', e)
}

const handleMouseLeave = (e: MouseEvent) => {
  emit('mouse-leave', e)
}
</script>

<template>
  <button
    ref="wrapper"
    :aria-checked="checked"
    :aria-disabled="disabled"
    :aria-label="ariaLabel"
    :aria-labelledby="ariaLabelledby"
    :class="[
      'c-switch',
      `c-switch-${size}`,
      { 'c-switch-checked': checked },
      { 'c-switch-loading': loading && !disabled },
      { 'c-switch-disabled': disabled }
    ]"
    :disabled="disabled"
    role="switch"
    type="button"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <spin
      v-if="loading"
      :class="['c-switch-loading-spin', `c-switch-loading-spin-${size}`]"
      :size="size"
    />
    <div v-else :class="['c-switch-knob', `c-switch-knob-${size}`]" aria-hidden="true" />
    <template v-if="size !== 'small'">
      <div v-if="checked && (checkedText || $slots.checkedText)" class="c-switch-checked-text">
        {{ checkedText }}
        <slot name="checkedText" />
      </div>
      <div
        v-if="!checked && (uncheckedText || $slots.uncheckedText)"
        class="c-switch-unchecked-text"
      >
        {{ uncheckedText }}
        <slot name="uncheckedText" />
      </div>
    </template>
  </button>
</template>

<style lang="scss">
@import './switch.scss';
</style>
