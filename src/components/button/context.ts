import type { ComputedRef, InjectionKey } from 'vue'
import type { Size, Type, Shape, Theme } from './Button.vue'

interface buttonGroupContext {
  size: ComputedRef<Size>
  type: ComputedRef<Type>
  shape: ComputedRef<Shape>
  theme: ComputedRef<Theme>
  disabled: ComputedRef<boolean>
}

export const buttonGroupContextKey = Symbol() as InjectionKey<buttonGroupContext>
