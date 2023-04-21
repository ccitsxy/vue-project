<script setup lang="ts">
import { computed, provide } from 'vue'
import { checkboxGroupContextKey } from './context'

export interface Props {
  modelValue?: (boolean | string | number)[]
  ariaLabel?: string
  disabled?: boolean
  name?: string
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: (boolean | string | number)[] | undefined): void
}>()

const modelValue = computed({
  get() {
    return props.modelValue
  },
  set(value: (boolean | string | number)[] | undefined) {
    emit('update:modelValue', value)
  }
})

const add = (value: boolean | string | number) => {
  if (modelValue.value !== undefined) {
    const _modelValue = modelValue.value.slice()
    _modelValue.push(value)
    modelValue.value = _modelValue
  }
}

const remove = (value: boolean | string | number) => {
  if (modelValue.value !== undefined) {
    const _modelValue = modelValue.value.slice()
    _modelValue.splice(modelValue.value.indexOf(value as never), 1)
    modelValue.value = _modelValue
  }
}

provide(checkboxGroupContextKey, { modelValue, add, remove })
</script>

<template>
  <div :aria-disabled="disabled" :aria-label="ariaLabel" role="group" class="c-checkbox-group">
    <slot />
  </div>
</template>
