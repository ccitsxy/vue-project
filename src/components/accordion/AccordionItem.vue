<script setup lang="ts">
import { computed, inject } from 'vue'
import { nanoid } from 'nanoid'
import { accordionContextKey } from './context'

export interface Props {
  disabled?: boolean
  value?: string
}
const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  value: undefined
})

const triggerId = `accordion-trigger-${nanoid(7)}`
const panelId = `accordion-panel-${nanoid(7)}`

const expended = computed(() => {
  return (
    (typeof modelValue?.value === 'string' && props.value === modelValue.value) ||
    (Array.isArray(modelValue?.value) &&
      props.value !== undefined &&
      modelValue?.value.includes(props.value))
  )
})

const { modelValue, disabled } = inject(accordionContextKey, {
  modelValue: undefined,
  disabled: undefined
})

const handleClick = () => {}
</script>

<template>
  <div class="c-accordion-item">
    <button
      :id="triggerId"
      :aria-controls="panelId"
      :aria-disabled="disabled"
      :aria-expanded="expended"
      type="button"
      class="c-accordion-trigger"
      @click="handleClick()"
    >
      <span>
        <slot name="header" />
        <span>
          <slot name="icon" />
        </span>
      </span>
    </button>
    <div :id="panelId" :aria-labelledby="triggerId" role="region" class="c-accordion-panel">
      <slot />
    </div>
  </div>
</template>
