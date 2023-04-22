<script setup lang="ts">
import { computed, inject, shallowRef } from 'vue'
import { Icon, IconCheckbox } from '@/components/icon'
import { checkboxGroupContextKey } from './context'

export interface Props {
  modelValue?: boolean
  ariaLabel?: string
  value?: boolean | string | number
  defaultChecked?: boolean
  label?: string
  labelId?: string
  describe?: string
  describeId?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  defaultChecked: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const _checked = shallowRef(props.defaultChecked)

const checked = computed({
  get() {
    if (groupValue?.value !== undefined && props.value !== undefined) {
      return groupValue.value.includes(props.value)
    } else if (props.modelValue !== undefined) {
      return props.modelValue
    } else {
      return _checked.value
    }
  },
  set(value: boolean) {
    emit('update:modelValue', value)
  }
})

const {
  modelValue: groupValue,
  add,
  remove
} = inject(checkboxGroupContextKey, {
  modelValue: undefined,
  add: () => {},
  remove: () => {}
})

const handleClick = () => {
  if (groupValue?.value !== undefined && props.value !== undefined) {
    if (groupValue.value.includes(props.value)) {
      remove(props.value)
    } else {
      add(props.value)
    }
  } else if (props.modelValue !== undefined) {
    checked.value = !checked.value
  } else {
    _checked.value = !_checked.value
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
      type="checkbox"
      :class="['c-checkbox-input', { 'c-checkbox-input-checked': checked }]"
      @click="handleClick()"
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
