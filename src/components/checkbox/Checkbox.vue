<script setup lang="ts">
import { computed, inject, shallowRef } from 'vue'
import { Icon, IconCheckbox } from '@/components/icon'
import { nanoid } from 'nanoid'
import { checkboxGroupContextKey } from './context'

export interface Props {
  ariaLabel?: string
  value?: string | number
  checked?: boolean
  defaultChecked?: boolean
  label?: string
  labelId?: string
  describe?: string
  describeId?: string
}

const props = withDefaults(defineProps<Props>(), {
  ariaLabel: undefined,
  value: undefined,
  checked: undefined,
  defaultChecked: false,
  label: undefined,
  labelId: `c-checkbox-label-${nanoid()}`,
  describe: undefined,
  describeId: `c-checkbox-extra-${nanoid()}`
})

const emit = defineEmits<{
  (e: 'update:checked', value: boolean): void
}>()


const checkboxState = shallowRef(false)

const checked = computed({
  get() {
    if (modelValue?.value !== undefined) {
      return modelValue.value.includes(props.value as never)
    } else if (props.checked !== undefined) {
      return props.checked
    } else {
      return checkboxState.value
    }
  },
  set(value: boolean) {
    emit('update:checked', value)
  }
})

const { modelValue, add, remove } = inject(checkboxGroupContextKey, {
  modelValue: undefined,
  add: () => {},
  remove: () => {}
})

const handleInput = () => {
  if (modelValue?.value !== undefined && props.value !== undefined) {
    if (modelValue.value.includes(props.value as never)) {
      remove(props.value)
    } else {
      add(props.value)
    }
  } else if (props.checked !== undefined) {
    checked.value = !checked.value
  } else {
    checkboxState.value = !checkboxState.value
  }
}
</script>

<template>
  <label class="c-checkbox">
    <input
      :aria-label="ariaLabel"
      :aria-labelledby="labelId"
      :aria-describedby="describeId"
      :aria-checked="checked"
      :value="value"
      type="checkbox"
      :class="['c-checkbox-input', { 'c-checkbox-input-checked': checked }]"
    />
    <span aria-hidden="true" class="c-checkbox-inner">
      <icon v-if="checked" :component="IconCheckbox" />
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
