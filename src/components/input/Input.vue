<script setup lang="ts">
import { computed } from 'vue'

export type Size = 'small' | 'medium' | 'large'

export interface Props {
  modelValue?: string | number
  defaultValue?: string | number
  placeholder?: string
  size?: Size
  password?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  defaultValue: '',
  size: 'medium',
  password: false
})
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | undefined): void
}>()

const value = computed({
  get() {
    return props.modelValue
  },
  set(value: string | number | undefined) {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <div :class="['c-input-wrapper', `c-input-wrapper-${size}`]">
    <div v-if="$slots.prefix" class="c-input-prefix">
      <slot name="prefix" />
    </div>
    <input
      v-model="value"
      :type="password ? 'password' : 'text'"
      :placeholder="placeholder"
      class="c-input"
    />
    <div v-if="$slots.suffix" class="c-input-suffix">
      <slot name="suffix" />
    </div>
  </div>
</template>

<style lang="scss">
@use './input.scss';
</style>
