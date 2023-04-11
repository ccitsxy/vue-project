import type { ComputedRef, InjectionKey } from 'vue'

interface checkboxGroupContext {
  modelValue: ComputedRef<string[] | number[]>
}

export const checkboxGroupContextKey = Symbol() as InjectionKey<checkboxGroupContext>
