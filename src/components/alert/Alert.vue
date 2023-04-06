<script setup lang="ts">
import type { Component } from 'vue'
import { shallowRef, computed } from 'vue'

import { Icon, IconInfo, IconWarning, IconDanger, IconSuccess, IconClose } from '../icon'
import { Button } from '../button'

export type Status = 'info' | 'success' | 'warning' | 'danger'

export interface Props {
  status?: Status
  showIcon?: boolean
  title?: string
  description?: string
  icon?: string | Component
  closeIcon?: string | Component
  bordered?: boolean
  banner?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  status: 'info',
  showIcon: true,
  title: undefined,
  description: undefined,
  icon: undefined,
  closeIcon: undefined,
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
  switch (props.status) {
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
      { [`c-alert-${status}`]: status },
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
        class="c-alert-close"
        :icon="IconClose"
        theme="borderless"
        size="small"
        status="tertiary"
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
