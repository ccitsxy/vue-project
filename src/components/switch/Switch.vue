<script setup lang="ts">
import { computed } from 'vue'
import { Spin } from '../spin'

export type Size = 'large' | 'default' | 'small'

export interface Props {
  ariaLabel?: string
  ariaLabelledby?: string
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  loading?: boolean
  size?: Size
}

const props = withDefaults(defineProps<Props>(), {
  ariaLabel: '',
  ariaLabelledby: '',
  checked: false,
  defaultChecked: false,
  disabled: false,
  loading: false,
  size: 'default'
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
    :class="[
      'c-switch',
      `c-switch-${size}`,
      checked ? 'c-switch-checked' : '',
      loading ? 'c-switch-loading' : ''
    ]"
    role="switch"
    :aria-checked="props.checked"
    :aria-disabled="props.disabled"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <spin
      v-if="loading"
      wrapper-class-name="c-switch-loading-spin"
      :size="size === 'default' ? 'middle' : size"
    />
    <div v-else class="c-switch-knob" aria-hidden="true" />
    <template v-if="checked && size !== 'small'">
      <div v-if="$slots.checkedText" class="c-switch-checked-text">
        <slot name="checkedText" />
      </div>
      <div v-if="$slots.uncheckedText" class="c-switch-unchecked-text">
        <slot name="uncheckedText" />
      </div>
    </template>
    <div class="c-switch-native-control" />
  </button>
</template>

<style lang="scss">
@import './switch.scss';
</style>
