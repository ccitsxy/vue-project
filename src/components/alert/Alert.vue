<script setup lang="ts">
import type { Component } from 'vue'
import { shallowRef } from 'vue'

export type Status = 'info' | 'success' | 'warning' | 'danger'

export interface Props {
  status?: Status
  className?: string
  fullMode?: boolean
  title?: string
  description?: string
  icon?: string | Component
  closeIcon?: string | Component
  bordered?: boolean
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{
  (e: 'close', event: MouseEvent): void
}>()

const handleClick = (e: MouseEvent) => {
  emit('close', e)
}

const visible = shallowRef(true)
</script>

<template>
  <div
    v-if="visible"
    :class="[
      { [`alert-${status}`]: status },
      { 'alert-bordered': !fullMode && bordered },
      fullMode ? 'alert-full' : 'alert-in-container'
    ]"
    role="alert"
  ><div class="alert-content-wrapper">
    <div class="alert-content">
      <div class="alert-content-body">
        <slot name="title" />
        <slot name="description"/>
      </div>
    </div>
  </div>

    <slot />
  </div>
</template>

<style lang="scss">
@use './alert.scss';
</style>
