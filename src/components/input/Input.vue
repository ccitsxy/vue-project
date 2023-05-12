<script setup lang="ts">
import type { Component, InputHTMLAttributes } from 'vue'
import { computed, shallowRef, nextTick } from 'vue'
import { createReusableTemplate } from '@vueuse/core'
import { Icon, IconClear, IconEye, IconEyeInvisible } from '../icon'

export type Size = 'small' | 'medium' | 'large'
export type Type = 'text' | 'password' | 'textarea'

interface Props {
  modelValue?: string | number
  defaultValue?: string | number
  type?: Type
  placeholder?: string
  size?: Size
  disabled?: boolean
  maxlength?: number
  minlength?: number
  clearable?: boolean
  clearIcon?: string | Component
  rows?: number
  autoSize?: boolean
  inputProps?: InputHTMLAttributes
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  defaultValue: '',
  type: 'text',
  size: 'medium',
  disabled: false,
  clearable: false,
  rows: 3,
  autoSize: false
})
const emit = defineEmits<{
  'update:modelValue': [value: string | number | undefined]
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

const inputRef = shallowRef<HTMLInputElement | null>(null)

const handleClear = () => {
  value.value = ''
  inputRef.value?.focus()
}

const visible = shallowRef(false)
const handleVisible = () => {
  visible.value = !visible.value
  nextTick(() => {
    inputRef.value?.focus()
    const length = inputRef.value?.value.length
    if (length) inputRef.value?.setSelectionRange(length, length)
  })
}
</script>

<template>
  <InputWrapper.define>
    <div
      :class="[
        'c-input-wrapper',
        `c-input-wrapper-${size}`,
        { 'c-input-wrapper-disabled': disabled },
        { 'c-input-textarea-wrapper': type === 'textarea' }
      ]"
    >
      <span v-if="$slots.prefix" class="c-input-prefix">
        <slot name="prefix" />
      </span>
      <textarea
        v-if="type === 'textarea'"
        ref="inputRef"
        v-model="value"
        :placeholder="placeholder"
        :disabled="disabled"
        :rows="rows"
        :maxlength="maxlength"
        :minlength="minlength"
        class="c-input c-input-textarea"
      />
      <input
        v-else
        ref="inputRef"
        v-model="value"
        :type="visible ? 'text' : type"
        :placeholder="placeholder"
        :disabled="disabled"
        :maxlength="maxlength"
        :minlength="minlength"
        v-bind="inputProps"
        class="c-input"
      />
      <button v-if="clearable && value" tabindex="-1" class="c-input-clear" @click="handleClear()">
        <Icon v-if="clearIcon" :component="clearIcon" />
        <slot v-else-if="$slots.clearIcon" name="clearIcon" />
        <Icon v-else :component="IconClear" />
      </button>
      <button
        v-if="type === 'password'"
        tabindex="-1"
        class="c-input-visible"
        @click="handleVisible()"
      >
        <Icon v-if="visible" :component="IconEye" />
        <Icon v-else :component="IconEyeInvisible" />
      </button>
      <span v-if="$slots.suffix" class="c-input-suffix">
        <slot name="suffix" />
      </span>
    </div>
  </InputWrapper.define>

  <div
    v-if="$slots.prepend || $slots.append"
    :class="[
      'c-input-outer',
      `c-input-outer-${size}`,
      { 'c-input-outer-disabled': disabled },
      { 'c-input-textarea-outer': type === 'textarea' }
    ]"
  >
    <span v-if="$slots.prepend" class="c-input-prepend">
      <slot name="prepend" />
    </span>
    <InputWrapper.reuse />
    <span v-if="$slots.append" class="c-input-append">
      <slot name="append" />
    </span>
  </div>

  <InputWrapper.reuse v-else />
</template>

<style lang="scss">
@use './input.scss';
</style>
