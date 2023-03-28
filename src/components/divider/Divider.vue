<script setup lang="ts">
export interface Props {
  direction?: 'horizontal' | 'vertical'
  align?: 'left' | 'right' | 'center'
  dashed?: boolean
  margin?: string
}

withDefaults(defineProps<Props>(), {
  direction: 'horizontal',
  align: 'center',
  dashed: false,
  margin: ''
})
</script>

<template>
  <div
    :class="[
      'c-divider',
      `c-divider-${direction}`,
      { 'c-divider-dashed': dashed },
      { [`c-divider-with-text c-divider-with-text-${align}`]: $slots.default }
    ]"
    :style="{
      marginLeft: direction === 'vertical' ? margin : '',
      marginRight: direction === 'vertical' ? margin : '',
      marginTop: direction === 'horizontal' ? margin : '',
      marginBottom: direction === 'horizontal' ? margin : ''
    }"
  >
    <span v-if="$slots.default" class="c-divider-text">
      <slot />
    </span>
  </div>
</template>

<style lang="scss">
@use './divider.scss';
</style>
