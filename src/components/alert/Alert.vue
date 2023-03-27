<script setup lang="ts">
export type Status = 'info' | 'success' | 'warning' | 'danger'

export interface Props {
  status?: Status
  title?: string
  description?: string
}

const emit = defineEmits<{
  (e: 'close', event: MouseEvent): void
}>()

const handleClick = (e: MouseEvent) => {
  emit('close', e)
}
</script>

<template>
  <div>
    <slot name="title" />
    <slot />
  </div>
</template>

<style lang="scss">
@use './alert.scss';
</style>
