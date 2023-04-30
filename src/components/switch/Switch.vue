<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import { Spin } from '../spin'

export type Size = 'small' | 'medium' | 'large'

export interface Props {
  modelValue?: boolean
  ariaLabel?: string
  ariaLabelledby?: string
  defaultChecked?: boolean
  checkedText?: string
  uncheckedText?: string
  disabled?: boolean
  loading?: boolean
  size?: Size
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  defaultChecked: false,
  disabled: false,
  loading: false,
  size: 'medium'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'mouse-enter', event: MouseEvent): void
  (e: 'mouse-leave', event: MouseEvent): void
}>()

const _checked = shallowRef(props.defaultChecked)

const checked = computed({
  get() {
    if (props.modelValue !== undefined) {
      return props.modelValue
    } else {
      return _checked.value
    }
  },
  set(value: boolean) {
    emit('update:modelValue', value)
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
    :aria-label="ariaLabel"
    :aria-labelledby="ariaLabelledby"
    :aria-checked="checked"
    :aria-disabled="disabled"
    :disabled="disabled"
    :class="[
      'c-switch',
      `c-switch-${size}`,
      { 'c-switch-checked': checked },
      { 'c-switch-loading': loading && !disabled },
      { 'c-switch-disabled': disabled }
    ]"
    role="switch"
    type="button"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <spin v-if="loading" :size="size" />
    <div v-else class="c-switch-knob" aria-hidden="true" />
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
