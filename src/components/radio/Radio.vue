<script setup lang="ts">
import { computed, inject } from 'vue'
import { Icon, IconRadio } from '@/components/icon'
import { nanoid } from 'nanoid'
import { radioGroupContextKey } from './context'

export interface Props {
  ariaLabel?: string
  name?: string
  value?: string | number
  checked?: boolean
  defaultChecked?: boolean
  label?: string
  labelId?: string
  describe?: string
  describeId?: string
}

withDefaults(defineProps<Props>(), {
  ariaLabel: undefined,
  name: `c-radio-${nanoid()}`,
  value: undefined,
  checked: false,
  defaultChecked: false,
  label: undefined,
  labelId: `c-radio-label-${nanoid()}`,
  describe: undefined,
  describeId: `c-radio-extra-${nanoid()}`
})

const { modelValue } = inject(radioGroupContextKey, {
  modelValue: computed(() => '')
})
</script>

<template>
  <label class="c-radio">
    <input
      v-if="value"
      v-model="modelValue"
      :aria-describedby="describeId"
      :aria-label="ariaLabel"
      :aria-labelledby="labelId"
      :checked="value === modelValue"
      :name="name"
      :value="value"
      class="c-radio-input"
      type="radio"
    />
    <input
      v-if="value"
      :aria-describedby="describeId"
      :aria-label="ariaLabel"
      :aria-labelledby="labelId"
      :checked="checked"
      :name="name"
      :value="value"
      class="c-radio-input"
      type="radio"
    />
    <span aria-hidden="true" class="c-radio-inner">
      <icon v-if="(checked && value) || value === modelValue" :component="IconRadio" />
    </span>
    <span v-if="$slots.default || $slots.describe" class="c-radio-content">
      <div v-if="$slots.default" :id="labelId" class="c-radio-content-label">
        {{ label }}
        <slot />
      </div>
      <div v-if="$slots.describe" :id="describeId" class="c-radio-content-describe">
        {{ describe }}
        <slot name="describe" />
      </div>
    </span>
  </label>
</template>

<style lang="scss">
@use './radio.scss';
</style>
