<script setup lang="ts">
import { computed, provide } from 'vue'
import { radioGroupContextKey } from './context'

interface Props {
  modelValue?: string | number | null
  ariaLabel?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number | null | undefined]
}>()

const modelValue = computed({
  get() {
    return props.modelValue
  },
  set(value: string | number | null | undefined) {
    emit('update:modelValue', value)
  }
})

const update = (value: string | number) => {
  modelValue.value = value
}

provide(radioGroupContextKey, { modelValue, update })
</script>

<template>
  <div :aria-disabled="disabled" :aria-label="ariaLabel" role="group" class="c-radio-group">
    <slot />
  </div>
</template>
