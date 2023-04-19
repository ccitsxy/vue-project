<script setup lang="ts">
import { computed, provide } from 'vue'
import { checkboxGroupContextKey } from './context'

export interface Props {
  ariaLabel?: string
  modelValue?: string[] | number[]
  disabled?: boolean
  name?: string
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value?: string[] | number[]): void
}>()

const modelValue = computed({
  get() {
    return props.modelValue
  },
  set(value?: string[] | number[]) {
    emit('update:modelValue', value)
  }
})

const add = (value: string | number) => {
  if (modelValue.value !== undefined) {
    const values = modelValue.value.slice()
    values.push(value as never)
    modelValue.value = values
  }
}

const remove = (value: string | number) => {
  if (modelValue.value !== undefined) {
    const values = modelValue.value.slice()
    values.splice(modelValue.value.indexOf(value as never), 1)
    modelValue.value = values
  }
}

provide(checkboxGroupContextKey, { modelValue, add, remove })
</script>

<template>
  <div :aria-disabled="disabled" :aria-label="ariaLabel" role="group" class="c-checkbox-group">
    <slot />
  </div>
</template>
