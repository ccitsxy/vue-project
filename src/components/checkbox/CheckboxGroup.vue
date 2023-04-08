<script setup lang="ts">
export interface Props {
  ariaLabel?: string
  direction?: 'horizontal' | 'vertical'
}

withDefaults(defineProps<Props>(), {
  ariaLabel: undefined,
  direction: 'horizontal'
})
</script>

<template>
  <div :aria-label="ariaLabel" :class="['c-checkbox-group', `c-checkbox-${direction}`]" role="list">
    <slot />
  </div>
</template>
