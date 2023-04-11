<script setup lang="ts">
import { computed, inject } from 'vue'
import { Icon, IconCheckbox } from '@/components/icon'
import { nanoid } from 'nanoid'
import { checkboxGroupContextKey } from './context'

export type Size = 'small' | 'medium' | 'large'

export interface Props {
  ariaLabel?: string
  value?: string | number
  checked?: boolean
  defaultChecked?: boolean
  label?: string
  labelId?: string
  describe?: string
  describeId?: string
  disabled?: boolean
  indeterminate?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  ariaLabel: undefined,
  value: undefined,
  checked: undefined,
  defaultChecked: false,
  label: undefined,
  labelId: `c-checkbox-label-${nanoid()}`,
  describe: undefined,
  describeId: `c-checkbox-extra-${nanoid()}`,
  disabled: false,
  indeterminate: false,
})

const emit = defineEmits<{
  (e: 'update:checked', value: boolean): void
}>()

const { modelValue } = inject(checkboxGroupContextKey, {
  modelValue: computed(() => [])
})

const checked = computed({
  get() {
    return props.checked || props.defaultChecked
  },
  set(value: boolean) {
    if (modelValue.value.includes(value as never)) {
      emit('update:checked', true)
    } else {
      emit('update:checked', value)
    }
  }
})
</script>

<template>
  <label class="c-checkbox">
    <input
      v-if="value"
      v-model="modelValue"
      :aria-describedby="describeId"
      :aria-label="ariaLabel"
      :aria-labelledby="labelId"
      :checked="modelValue.includes(value as never)"
      :disabled="disabled"
      :value="value"
      class="c-checkbox-input"
      type="checkbox"
    />
    <input
      v-else
      v-model="checked"
      :aria-describedby="describeId"
      :aria-label="ariaLabel"
      :aria-labelledby="labelId"
      :checked="checked"
      :disabled="disabled"
      class="c-checkbox-input"
      type="checkbox"
    />
    <span aria-hidden="true" class="c-checkbox-inner">
      <icon v-if="(checked && !value) || modelValue.includes(value as never)" :component="IconCheckbox" />
    </span>
    <span v-if="$slots.default || $slots.describe" class="c-checkbox-content">
      <div v-if="$slots.default" :id="labelId" class="c-checkbox-content-label">
        {{ label }}
        <slot />
      </div>
      <div v-if="$slots.describe" :id="describeId" class="c-checkbox-content-describe">
        {{ describe }}
        <slot name="describe" />
      </div>
    </span>
  </label>
</template>

<style lang="scss">
@use './checkbox.scss';
</style>
