<script setup lang="ts">
import { computed, provide, shallowRef, readonly } from 'vue'
import { checkboxGroupContextKey } from './context'

export interface Props {
  ariaLabel?: string
  modelValue?: string[] | number[]
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  ariaLabel: undefined,
  modelValue: undefined,
  disabled: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value?: string[] | number[] | undefined): void
}>()

const modelValue = computed({
  get() {
    return props.modelValue
  },
  set(value?: string[] | number[] | undefined) {
    emit('update:modelValue', value)
  }
})

const checkboxGroupKey = shallowRef(0)

const add = (value: string | number) => {
  modelValue.value?.push(value as never)
  checkboxGroupKey.value++
}

const remove = (value: string | number) => {
  modelValue.value?.splice(modelValue.value.indexOf(value as never), 1)
  checkboxGroupKey.value++
}

provide(checkboxGroupContextKey, { modelValue, add, remove })
</script>

<template>
  <div
    :aria-disabled="disabled"
    :aria-label="ariaLabel"
    :key="checkboxGroupKey"
    role="group"
    class="c-checkbox-group"
  >
    <slot />
  </div>
</template>
