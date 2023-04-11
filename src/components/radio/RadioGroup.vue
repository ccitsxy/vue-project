<script setup lang="ts">
import { computed, provide } from 'vue'
import { radioGroupContextKey } from './context'

export interface Props {
  ariaLabel?: string
  modelValue?: string | number
}

const props = withDefaults(defineProps<Props>(), {
  ariaLabel: undefined,
  modelValue: ''
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const modelValue = computed({
  get() {
    return props.modelValue
  },
  set(value: string | number) {
    emit('update:modelValue', value)
  }
})

provide(radioGroupContextKey, { modelValue })
</script>

<template>
  <div :aria-label="ariaLabel" class="c-radio-group" role="group">
    <slot />
  </div>
</template>
