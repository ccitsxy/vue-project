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
  <li class="c-breadcrumb-item">
    <span class="c-breadcrumb-item-content">
      <slot />
    </span>
    <span class="c-breadcrumb-item-separator">
      {{ separator }}
      <slot name="separator" />
    </span>
  </li>
</template>
