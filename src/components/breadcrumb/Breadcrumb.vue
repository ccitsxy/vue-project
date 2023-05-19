<script setup lang="ts">
import type { Component } from 'vue'

interface Props {
  separator?: string | Component
}

withDefaults(defineProps<Props>(), {
  separator: '/'
})
</script>

<template>
  <nav class="c-breadcrumb">
    <ol>
      <slot />
    </ol>
  </nav>
</template>

<style lang="scss">
@use './breadcrumb.scss';
</style>
