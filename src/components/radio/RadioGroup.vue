<script setup lang="ts">
export interface Props {
  ariaLabel?: string
  direction?: 'horizontal' | 'vertical'
}

const props = withDefaults(defineProps<Props>(), {
  ariaLabel: undefined,
  direction: 'horizontal'
})
</script>

<template>
  <div :aria-label="ariaLabel" class="c-checkbox-group" role="list"></div>
</template>

<style></style>
