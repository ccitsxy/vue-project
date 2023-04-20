import type { WritableComputedRef, InjectionKey } from 'vue'

interface checkboxGroupContext {
  modelValue: WritableComputedRef<(string | number)[] | undefined> | undefined
  add: (value: string | number) => void
  remove: (value: string | number) => void
}

export const checkboxGroupContextKey = Symbol() as InjectionKey<checkboxGroupContext>
