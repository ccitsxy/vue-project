<script setup lang="ts">
import { computed, provide } from 'vue'
import { radioGroupContextKey } from './context'

export interface Props {
  ariaLabel?: string
  modelValue?: string | number | null
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  ariaLabel: undefined,
  modelValue: undefined,
  disabled: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value?: string | number | null): void
}>()

const modelValue = computed({
  get() {
    return props.modelValue
  },
  set(value?: string | number | null) {
    emit('update:modelValue', value)
  }
})

const update = (value: string | number) => {
  modelValue.value = value
}

provide(radioGroupContextKey, { modelValue, update })
</script>

<template>
  <div
    :aria-disabled="disabled"
    :aria-label="ariaLabel"
    role="group"
    class="c-radio-group"
  >
    <slot />
  </div>
</template>
