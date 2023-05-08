import type { ComputedRef, InjectionKey } from 'vue'
import type { Size, Status, Shape, Theme } from './Button.vue'

interface buttonGroupContext {
  size: ComputedRef<Size | undefined>
  status: ComputedRef<Status | undefined>
  shape: ComputedRef<Shape | undefined>
  theme: ComputedRef<Theme | undefined>
  disabled: ComputedRef<boolean | undefined>
}

export const buttonGroupContextKey = Symbol() as InjectionKey<buttonGroupContext>
