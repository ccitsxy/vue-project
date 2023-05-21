<script setup lang="ts">
import { computed, inject, shallowRef } from 'vue'
import { Icon, IconRadio } from '@/components/icon'
import { radioGroupContextKey } from './context'

interface Props {
  modelValue?: boolean
  ariaLabel?: string
  name?: string
  value?: string | number
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
  'update:modelValue': [value: boolean | undefined]
}>()

const _checked = shallowRef(props.defaultChecked)

const checked = computed({
  get() {
    if (groupValue?.value !== undefined) {
      return groupValue.value === props.value
    } else if (props.modelValue !== undefined) {
      return props.modelValue
    } else {
      return _checked.value
    }
  },
  set(value?: boolean) {
    emit('update:modelValue', value)
  }
})

const { modelValue: groupValue, update } = inject(radioGroupContextKey, {
  modelValue: undefined,
  update: () => {}
})

const handleInput = () => {
  if (
    groupValue?.value !== undefined &&
    props.value !== undefined &&
    groupValue.value !== props.value
  ) {
    update(props.value)
  } else if (props.modelValue !== undefined && props.modelValue === false) {
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
