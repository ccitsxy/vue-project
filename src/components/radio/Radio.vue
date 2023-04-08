<script setup lang="ts">
import { computed } from 'vue'
import { Icon, IconRadio } from '@/components/icon'
import { nanoid } from 'nanoid'

export interface Props {
  id?: string
  ariaLabel?: string
  checked?: boolean
  defaultChecked?: boolean
  label?: string
  labelId?: string
  describe?: string
  describeId?: string
}

const props = withDefaults(defineProps<Props>(), {
  id: `c-radio-${nanoid()}`,
  ariaLabel: undefined,
  checked: false,
  defaultChecked: false,
  label: undefined,
  labelId: `c-radio-label-${nanoid()}`,
  describe: undefined,
  describeId: `c-radio-extra-${nanoid()}`
})

const emit = defineEmits<{
  (e: 'update:checked', value: boolean): void
}>()

const checked = computed({
  get() {
    return props.defaultChecked || props.checked
  },
  set(value: boolean) {
    emit('update:checked', value)
  }
})
</script>

<template>
  <label :for="id" class="c-radio">
    <input
      :id="id"
      v-model="checked"
      :aria-label="ariaLabel"
      :aria-labelledby="labelId"
      :aria-describedby="describeId"
      :checked="checked"
      class="c-radio-input"
      type="radio"
    />
    <span aria-hidden="true" class="c-radio-inner">
      <icon v-if="checked" :component="IconRadio" />
    </span>
    <span v-if="$slots.default || $slots.describe" :id="labelId" class="c-radio-content">
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
