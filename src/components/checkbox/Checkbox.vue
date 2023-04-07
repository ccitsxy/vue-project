<script setup lang="ts">
import { computed } from 'vue'
import { Icon, IconCheckbox } from '@/components/icon'
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
  id: `c-checkbox-${nanoid()}`,
  ariaLabel: undefined,
  checked: false,
  defaultChecked: false,
  label: undefined,
  labelId: `c-checkbox-label-${nanoid()}`,
  describe: undefined,
  describeId: `c-checkbox-extra-${nanoid()}`
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
  <label :for="id" class="c-checkbox">
    <input
      :id="id"
      v-model="checked"
      :aria-label="ariaLabel"
      :aria-labelledby="labelId"
      :aria-describedby="describeId"
      :checked="checked"
      class="c-checkbox-input"
      type="checkbox"
    />
    <span aria-hidden="true" class="c-checkbox-inner">
      <icon v-if="checked" :component="IconCheckbox" />
    </span>
    <span v-if="$slots.default || $slots.describe" :id="labelId" class="c-checkbox-content">
      <div v-if="$slots.default" :id="labelId" class="c-checkbox-content-label">
        {{ label }}
        <slot />
      </div>
      <div v-if="$slots.describe" :id="describeId" class="c-checkbox-content-describe">
        {{ describe }}
        <slot name="describe" />
      </div>
    </span>
  </label>
</template>

<style lang="scss">
@use './checkbox.scss';
</style>
