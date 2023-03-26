<script setup lang="ts">
import type { CSSProperties, PropType } from 'vue'
import SpinIcon from './SpinIcon.vue'

export type SpinSize = 'small' | 'middle' | 'large'

defineProps({
  spin: {
    type: Boolean,
    default: true
  },
  size: {
    type: String as PropType<SpinSize>,
    default: 'middle'
  },
  delay: {
    type: Number,
    default: 0
  },
  wrapperClassName: {
    type: String,
    default: undefined
  },
  childStyle: {
    type: Object as PropType<CSSProperties>,
    default: undefined
  }
})
</script>

<template>
  <div :class="['spin', `spin-${size}`, wrapperClassName]">
    <div v-if="spin" class="semi-spin-wrapper">
      <div v-if="$slots.indicator" class="semi-spin-indicator">
        <slot name="indicator" />
      </div>
      <SpinIcon v-else />
      <slot name="tip" />
      <div class="spin-child" :style="childStyle">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.spin {
  position: relative;
  display: inline-block;

  width: var(--spin-middle);
  height: var(--spin-middle);

  &-wrapper {
    text-align: center;
    position: absolute;
    width: 100%;
    transform: translateY(-50%);
    top: 50%;
    color: var(--spin-bg-color);

    & > svg {
      animation: var(--spin-wrapper-animation-duration) linear infinite animation-spin;
      animation-fill-mode: forwards;

      width: var(--spin-middle);
      height: var(--spin-middle);
    }
  }

  &-indicator {
    display: inline-flex;
    animation: var(--spin-indicator-animation-duration) linear infinite animation-spin;
    animation-fill-mode: forwards;
  }

  &-child {
    opacity: $opacity-spin_children;
    user-select: none;
  }

  &-block {
    display: block;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    .spin-wrapper {
      display: block;
    }

    &.spin {
      height: auto;
      width: auto;
    }
  }

  &-hidden {
    &::after {
      content: none;
    }

    & > .spin-child {
      opacity: 1;
      user-select: auto;
    }
  }
}

.spin-small {
  width: var(--spin-small);
  height: var(--spin-small);

  & > .spin-wrapper svg {
    width: var(--spin-small);
    height: var(--spin-small);
  }
}

.spin-middle {
  width: var(--spin-middle);
  height: var(--spin-middle);

  & > .spin-wrapper svg {
    width: var(--spin-middle);
    height: var(--spin-middle);
  }
}

.spin-large {
  width: var(--spin-large);
  height: var(--spin-large);

  & > .spin-wrapper svg {
    width: var(--spin-large);
    height: var(--spin-large);
  }
}
</style>
