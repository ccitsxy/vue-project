<script setup lang="ts">
import type { Component } from 'vue'
import { shallowRef, computed } from 'vue'

import { Icon, IconInfo, IconWarning, IconDanger, IconSuccess, IconClose } from '../icon'
import { Button } from '../button'

export type Type = 'info' | 'success' | 'warning' | 'danger'

export interface Props {
  type?: Type
  title?: string
  description?: string
  icon?: string | Component
  closeIcon?: string | Component
  showIcon?: boolean
  closable?: boolean
  bordered?: boolean
  banner?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  showIcon: true,
  closable: false,
  bordered: false,
  banner: false
})

const emit = defineEmits<{
  (e: 'close', event: MouseEvent): void
}>()

const visible = shallowRef(true)
const handleCloseClick = (e: MouseEvent) => {
  emit('close', e)
  visible.value = !visible.value
}

const alertIcon = computed(() => {
  switch (props.type) {
    case 'info':
      return IconInfo
    case 'warning':
      return IconWarning
    case 'danger':
      return IconDanger
    case 'success':
      return IconSuccess
    default:
      return undefined
  }
})
</script>

<template>
  <div
    v-if="visible"
    :class="[
      'c-alert',
      `c-alert-${type}`,
      { 'c-alert-bordered': bordered },
      { 'c-alert-banner': banner }
    ]"
    role="alert"
  >
    <div class="c-alert-content-wrapper">
      <div v-if="showIcon" class="c-alert-icon">
        <Icon :component="alertIcon" size="extra-large" />
      </div>
      <div class="c-alert-content">
        <div class="c-alert-content-body">
          <div v-if="title || $slots.title" class="c-alert-title">
            {{ title }}
            <slot name="title" />
          </div>
          <div v-if="description || $slots.description" class="c-alert-description">
            {{ description }}
            <slot name="description" />
          </div>
        </div>
      </div>
      <Button
        v-if="closable"
        class="c-alert-close"
        :icon="IconClose"
        theme="borderless"
        size="small"
        type="tertiary"
        aria-label="Close"
        @click="handleCloseClick"
      />
    </div>
    <div v-if="$slots.default" class="c-alert-extra">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
@use './alert.scss';
</style>
