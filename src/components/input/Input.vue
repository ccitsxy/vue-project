<script setup lang="ts">
import { computed } from 'vue'
import { createReusableTemplate } from '@vueuse/core'

export type Size = 'small' | 'medium' | 'large'

export interface Props {
  modelValue?: string | number
  defaultValue?: string | number
  placeholder?: string
  size?: Size
  password?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  defaultValue: '',
  size: 'medium',
  password: false,
  disabled: false
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
const InputWrapper = createReusableTemplate()
</script>

<template>
  <InputWrapper.define>
    <div
      :class="[
        'c-input-wrapper',
        `c-input-wrapper-${size}`,
        { 'c-input-wrapper-disabled': disabled }
      ]"
    >
      <div v-if="$slots.suffix" class="c-input-suffix">
        <slot name="suffix" />
      </div>
      <input
        v-model="value"
        :type="password ? 'password' : 'text'"
        :placeholder="placeholder"
        :disabled="disabled"
        class="c-input"
      />
      <div v-if="$slots.suffix" class="c-input-suffix">
        <slot name="suffix" />
      </div>
    </div>
  </InputWrapper.define>

  <div v-if="$slots.prepend || $slots.append" class="c-input-outer">
    <div v-if="$slots.prepend" class="c-input-prefix">
      <slot name="prepend" />
    </div>
    <InputWrapper.reuse />
    <div v-if="$slots.append" class="c-input-suffix">
      <slot name="append" />
    </div>
  </div>

  <InputWrapper.reuse v-else />
</template>

<style lang="scss">
@use './input.scss';
</style>
