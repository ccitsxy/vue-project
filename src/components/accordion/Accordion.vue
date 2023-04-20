<script setup lang="ts">
import { computed, provide, shallowRef } from 'vue'
import { accordionContextKey } from './context'

export interface Props {
  collapsible?: boolean
  defaultValue?: string | string[]
  disabled?: boolean
  multiple?: boolean
  orientation?: 'horizontal' | 'vertical'
  modelValue?: string | string[]
}
const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | string[] | null | undefined): void
}>()

const _value = shallowRef(props.defaultValue)

const modelValue = computed({
  get() {
    return props.modelValue || _value.value
  },
  set(value: string | string[] | null | undefined) {
    emit('update:modelValue', value)
  }
})

const disabled = computed(()=> props.disabled)

provide(accordionContextKey,{
  modelValue, disabled
})
</script>

<template>
  <div class="c-accordion">
    <slot />
  </div>
</template>
