<script setup lang="ts">
import { computed, inject, shallowRef } from 'vue'
import { Icon, IconRadio } from '@/components/icon'
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

const props = withDefaults(defineProps<Props>(), {
  defaultChecked: false
})

const emit = defineEmits<{
  (e: 'update:checked', value?: boolean): void
}>()

const _checked = shallowRef(props.defaultChecked)

const checked = computed({
  get() {
    if (modelValue?.value !== undefined) {
      return modelValue.value === props.value
    } else if (props.checked !== undefined) {
      return props.checked
    } else {
      return _checked.value
    }
  },
  set(value?: boolean) {
    emit('update:checked', value)
  }
})

const { modelValue, update } = inject(radioGroupContextKey, {
  modelValue: undefined,
  update: () => {}
})

const handleInput = () => {
  if (modelValue?.value !== undefined && props.value !== undefined) {
    update(props.value)
  } else if (props.checked !== undefined && props.checked === false) {
    checked.value = true
  } else {
    _checked.value = true
  }
}
</script>

<template>
  <label class="c-radio">
    <input
      :aria-label="ariaLabel"
      :aria-labelledby="labelId"
      :aria-describedby="describeId"
      :aria-checked="checked"
      :value="value"
      type="radio"
      name="radio-group"
      :class="['c-radio-input', { 'c-radio-input-checked': checked }]"
      @click="handleInput()"
    />
    <span aria-hidden="true" class="c-radio-inner">
      <icon v-if="checked" :component="IconRadio" />
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
