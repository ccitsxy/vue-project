import type { ComputedRef, InjectionKey } from 'vue'
import type { Size, Status, Shape, Theme } from './Button.vue'

interface buttonGroupContext {
  size: ComputedRef<Size>
  status: ComputedRef<Status>
  shape: ComputedRef<Shape>
  theme: ComputedRef<Theme>
  disabled: ComputedRef<boolean>
}

export const buttonGroupContextKey = Symbol() as InjectionKey<buttonGroupContext>
