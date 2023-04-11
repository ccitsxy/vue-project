<script setup lang="ts">
import { computed, provide } from 'vue'
import { checkboxGroupContextKey } from './context'

export interface Props {
  ariaLabel?: string
  modelValue?: string[] | number[],
  disabled?:boolean
}

const props = withDefaults(defineProps<Props>(), {
  ariaLabel: undefined,
  modelValue: () => [],
  disabled: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[] | number[]): void
}>()

const modelValue = computed({
  get() {
    return props.modelValue
  },
  set(value: string[] | number[]) {
    emit('update:modelValue', value)
  }
})

provide(checkboxGroupContextKey, { modelValue })
</script>

<template>
  <div :aria-disabled="disabled" :aria-label="ariaLabel" class="c-checkbox-group" role="group">
    <slot />
  </div>
</template>
